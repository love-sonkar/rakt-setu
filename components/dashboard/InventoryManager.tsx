import React, { useMemo } from 'react';
import { Partner } from '../../types';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  Download, 
  Droplet, 
  Building2, 
  MapPin,
  Package
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

interface InventoryManagerProps {
  partners: Partner[];
}

const InventoryManager: React.FC<InventoryManagerProps> = ({ partners }) => {
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
                     cursor={{fill: '#f8fafc'}}
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