import React, { useMemo, useState } from 'react';
import { BloodStock, Partner } from '../../types';
import {
  AlertTriangle,
  Search,
  Filter,
  Download,
  Droplet,
  Building2,
  MapPin,
  Package,
  ArrowRight,
  Ticket,
  Truck,
  CheckCircle2,
  RefreshCw,
  Heart
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { NavLink } from 'react-router-dom';

const bloodStock: BloodStock[] = [
  { group: 'A+', units: 45, status: 'Adequate' },
  { group: 'A-', units: 12, status: 'Low' },
  { group: 'B+', units: 50, status: 'Surplus' },
  { group: 'B-', units: 8, status: 'Critical' },
  { group: 'O+', units: 30, status: 'Adequate' },
  { group: 'O-', units: 5, status: 'Critical' },
  { group: 'AB+', units: 15, status: 'Low' },
  { group: 'AB-', units: 4, status: 'Critical' },
];

const initialPartners: Partner[] = [
  {
    id: 'p1',
    name: 'City General Hospital',
    type: 'Hospital',
    location: 'Raipur',
    contact: '+919876543210',
    email: 'contact@citygeneral.com',
    stock: bloodStock
  },
  {
    id: 'p2',
    name: 'Red Cross Blood Bank',
    type: 'Blood Bank',
    location: 'Bhilai',
    contact: '+919988776655',
    email: 'info@redcrossbhilai.org',
    stock: [
      { group: 'A+', units: 120, status: 'Surplus' },
      { group: 'O+', units: 80, status: 'Adequate' },
      { group: 'AB-', units: 2, status: 'Critical' },
      { group: 'B-', units: 0, status: 'Critical' },
      { group: 'A-', units: 5, status: 'Low' },
      { group: 'B+', units: 65, status: 'Surplus' },
      { group: 'AB+', units: 10, status: 'Low' },
      { group: 'O-', units: 1, status: 'Critical' },
    ]
  },
  {
    id: 'p3',
    name: 'District Hospital Bastar',
    type: 'Hospital',
    location: 'Bastar',
    contact: '+919900000000',
    email: 'dh.bastar@cg.gov.in',
    stock: [
      { group: 'A+', units: 2, status: 'Critical' },
      { group: 'O+', units: 5, status: 'Critical' },
      { group: 'B+', units: 10, status: 'Low' },
      { group: 'AB+', units: 1, status: 'Critical' },
      { group: 'A-', units: 0, status: 'Critical' },
      { group: 'B-', units: 1, status: 'Critical' },
      { group: 'O-', units: 0, status: 'Critical' },
      { group: 'AB-', units: 0, status: 'Critical' },
    ]
  }
];

interface InventoryManagerProps {
  partners: Partner[];
  onUpdateStock: (partnerId: string, group: string, newUnits: number) => void;
}

interface TransferRecommendation {
  sourceId: string;
  sourceName: string;
  sourceLocation: string;
  targetId: string;
  targetName: string;
  targetLocation: string;
  group: string;
  suggestedAmount: number;
}

interface TransferTicket extends TransferRecommendation {
  id: string;
  status: 'In Transit' | 'Completed';
  timestamp: string;
}

const InventoryManager: React.FC<InventoryManagerProps> = ({ onUpdateStock }) => {
  const [activeTickets, setActiveTickets] = useState<TransferTicket[]>([]);
  const [partners, setPartners] = useState<Partner[]>(initialPartners);

  // Aggregate calculations
  const stats = useMemo(() => {
    const totalUnits = partners.reduce((acc, p) => acc + p.stock.reduce((s, item) => s + item.units, 0), 0);

    const groupTotals: Record<string, number> = {};
    const lowStockAlerts: { partner: string; group: string; units: number; location: string }[] = [];

    partners.forEach(p => {
      p.stock.forEach(s => {
        // Sum totals
        groupTotals[s.group] = (groupTotals[s.group] || 0) + s.units;

        // Check alerts
        if (s.status === 'Critical' || s.status === 'Low') {
          lowStockAlerts.push({
            partner: p.name,
            group: s.group,
            units: s.units,
            location: p.location
          });
        }
      });
    });

    // Format for chart
    const chartData = Object.keys(groupTotals).map(group => ({
      name: group,
      units: groupTotals[group]
    }));

    return { totalUnits, chartData, lowStockAlerts };
  }, [partners]);

  // Redistribution Logic
  const recommendations = useMemo(() => {
    const recs: TransferRecommendation[] = [];
    const SURPLUS_THRESHOLD = 15;
    const SHORTAGE_THRESHOLD = 10; // Or if status is Critical

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

    bloodGroups.forEach(group => {
      // Find surplus partners for this group
      const surplusPartners = partners.filter(p => {
        const stock = p.stock.find(s => s.group === group);
        return stock && stock.units > SURPLUS_THRESHOLD;
      });

      // Find shortage partners for this group
      const shortagePartners = partners.filter(p => {
        const stock = p.stock.find(s => s.group === group);
        return stock && (stock.units < SHORTAGE_THRESHOLD || stock.status === 'Critical' || stock.status === 'Low');
      });

      // Simple matching algorithm (can be enhanced with distance logic)
      surplusPartners.forEach(source => {
        shortagePartners.forEach(target => {
          if (source.id === target.id) return; // Can't transfer to self

          const sourceStock = source.stock.find(s => s.group === group)?.units || 0;
          const targetStock = target.stock.find(s => s.group === group)?.units || 0;

          // Calculate transfer amount (bring source down to threshold, or target up to threshold, whichever is smaller)
          const availableSurplus = sourceStock - SURPLUS_THRESHOLD;
          const needed = 15 - targetStock; // Try to bring target to 15

          const amount = Math.min(availableSurplus, needed);

          if (amount > 0) {
            // Check if there is already an active ticket for this
            const active = activeTickets.find(t =>
              t.sourceId === source.id &&
              t.targetId === target.id &&
              t.group === group &&
              t.status === 'In Transit'
            );

            if (!active) {
              recs.push({
                sourceId: source.id,
                sourceName: source.name,
                sourceLocation: source.location,
                targetId: target.id,
                targetName: target.name,
                targetLocation: target.location,
                group: group,
                suggestedAmount: amount
              });
            }
          }
        });
      });
    });

    return recs;
  }, [partners, activeTickets]);

  const handleRaiseTicket = (rec: TransferRecommendation) => {
    const newTicket: TransferTicket = {
      ...rec,
      id: `tkt-${Date.now()}`,
      status: 'In Transit',
      timestamp: new Date().toLocaleTimeString()
    };
    setActiveTickets(prev => [newTicket, ...prev]);
  };

  const handleCompleteTicket = (ticket: TransferTicket) => {
    // 1. Deduct from Source
    const source = partners.find(p => p.id === ticket.sourceId);
    if (source) {
      const sourceCurrent = source.stock.find(s => s.group === ticket.group)?.units || 0;
      onUpdateStock(ticket.sourceId, ticket.group, Math.max(0, sourceCurrent - ticket.suggestedAmount));
    }

    // 2. Add to Target
    const target = partners.find(p => p.id === ticket.targetId);
    if (target) {
      const targetCurrent = target.stock.find(s => s.group === ticket.group)?.units || 0;
      onUpdateStock(ticket.targetId, ticket.group, targetCurrent + ticket.suggestedAmount);
    }

    // 3. Mark Ticket as Completed (remove from active view or move to history)
    setActiveTickets(prev => prev.filter(t => t.id !== ticket.id));

    // Optional: Add to a history log (simulated alert)
    alert(`Transfer Completed! \n${ticket.suggestedAmount} units of ${ticket.group} moved from ${ticket.sourceName} to ${ticket.targetName}.`);
  };

  const getStockStatusColor = (units: number) => {
    if (units < 5) return 'bg-red-100 text-red-700 font-bold';
    if (units < 15) return 'bg-orange-100 text-orange-700';
    if (units > 50) return 'bg-blue-100 text-blue-700';
    return 'bg-green-50 text-green-700';
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-6 h-6 text-slate-600" /> Network Inventory
          </h1>
          <p className="text-slate-500">Centralized stock monitoring across {partners.length} connected facilities.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium">
            <Download className="w-4 h-4" /> Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-sm font-medium">
            <Filter className="w-4 h-4" /> Filter View
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Total Stock Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-700">Network Total</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Droplet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-4xl font-bold text-slate-900">{stats.totalUnits}</div>
          <div className="text-sm text-slate-500 mt-1">Units available across all partners</div>
        </div>

        {/* Critical Alerts Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm md:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-slate-700 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" /> Active Shortages
            </h3>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-bold">
              {stats.lowStockAlerts.length} Critical
            </span>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[100px] pr-2 space-y-2">
            {stats.lowStockAlerts.length === 0 ? (
              <div className="text-sm text-slate-400 italic">No critical shortages reported.</div>
            ) : (
              stats.lowStockAlerts.map((alert, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm p-2 bg-red-50 rounded-lg border border-red-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-red-700 w-8">{alert.group}</span>
                    <span className="text-slate-700">{alert.partner}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-500 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {alert.location}
                    </span>
                    <span className="font-bold text-red-600">{alert.units} Units</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* --- SMART REDISTRIBUTION SECTION --- */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-blue-400" /> Smart Redistribution Hub
            </h2>
            <p className="text-slate-400 text-sm mt-1">AI-powered stock balancing to minimize wastage and shortages.</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{recommendations.length}</div>
            <div className="text-xs text-slate-400">Potential Matches</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Suggested Transfers */}
          <div className="bg-white/5 rounded-xl border border-white/10 p-4">
            <h3 className="font-semibold text-sm text-slate-300 mb-3 flex items-center gap-2">
              <Ticket className="w-4 h-4" /> Recommended Transfers
            </h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {recommendations.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm">All inventories balanced.</div>
              ) : (
                recommendations.map((rec, i) => (
                  <div key={i} className="bg-slate-800 p-3 rounded-lg border border-slate-700 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-white bg-red-600 px-2 rounded">{rec.group}</span>
                        <span className="text-sm font-medium text-slate-300">{rec.suggestedAmount} Units</span>
                      </div>
                      <button
                        onClick={() => handleRaiseTicket(rec)}
                        className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-md font-medium transition-colors"
                      >
                        Raise Ticket
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-green-400">{rec.sourceName}</span>
                      <ArrowRight className="w-3 h-3" />
                      <span className="text-red-400">{rec.targetName}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Active Tickets */}
          <div className="bg-white/5 rounded-xl border border-white/10 p-4">
            <h3 className="font-semibold text-sm text-slate-300 mb-3 flex items-center gap-2">
              <Truck className="w-4 h-4" /> Active Transfers (In Transit)
            </h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {activeTickets.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm">No active transfer tickets.</div>
              ) : (
                activeTickets.map((ticket) => (
                  <div key={ticket.id} className="bg-slate-800 p-3 rounded-lg border border-blue-900/50 flex flex-col gap-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1 bg-blue-500/20 rounded-bl-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-slate-500 font-mono">{ticket.id}</div>
                      <div className="text-xs text-slate-400">{ticket.timestamp}</div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white">{ticket.group}</span>
                        <span className="text-sm text-slate-300">{ticket.suggestedAmount} Units</span>
                      </div>
                      <button
                        onClick={() => handleCompleteTicket(ticket)}
                        className="text-xs bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" /> Mark Done
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <span>{ticket.sourceName}</span>
                      <ArrowRight className="w-3 h-3" />
                      <span>{ticket.targetName}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Aggregate Chart */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Distribution by Group</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} stroke="#64748b" />
                <YAxis axisLine={false} tickLine={false} fontSize={12} stroke="#64748b" />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="units" radius={[4, 4, 0, 0]}>
                  {stats.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.units < 20 ? '#ef4444' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Stock Matrix</h3>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search partners..."
                className="w-full pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-200 outline-none"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 font-medium">Partner Facility</th>
                  {bloodGroups.map(bg => (
                    <th key={bg} className="px-2 py-3 text-center font-medium">{bg}</th>
                  ))}
                  <th className="px-4 py-3 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {partners.map(partner => {
                  const partnerTotal = partner.stock.reduce((sum, s) => sum + s.units, 0);
                  return (
                    <tr key={partner.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-900">{partner.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          {partner.type === 'Hospital' ? <Building2 className="w-3 h-3" /> : <Droplet className="w-3 h-3" />}
                          {partner.type} • {partner.location}
                        </div>
                      </td>
                      {bloodGroups.map(bg => {
                        const stockItem = partner.stock.find(s => s.group === bg);
                        const units = stockItem?.units || 0;
                        return (
                          <td key={bg} className="px-2 py-3 text-center">
                            <span className={`inline-block w-8 py-1 rounded text-xs ${getStockStatusColor(units)}`}>
                              {units}
                            </span>
                          </td>
                        );
                      })}
                      <td className="px-4 py-3 text-right font-bold text-slate-700">
                        {partnerTotal}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryManager;