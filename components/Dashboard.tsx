import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Users, 
  Bell, 
  Search, 
  LogOut, 
  MapPin, 
  Phone, 
  Calendar,
  AlertCircle,
  Droplet,
  Menu,
  Trophy,
  TrendingUp,
  Share2,
  Building2,
  Stethoscope,
  ShieldCheck,
  Plus,
  CheckCircle2,
  BarChart2,
  ChevronLeft,
  MessageSquare,
  Package,
  Map,
  List
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  ReferenceArea
} from 'recharts';
import { BloodStock, Donor, EmergencyRequest, PredictionData, Partner, SMSMessage } from '../types';

// Import extracted components
import HeartLogo from './dashboard/HeartLogo';
import NavItem from './dashboard/NavItem';
import StatCard from './dashboard/StatCard';
import DonorForm from './dashboard/DonorForm';
import PartnerForm from './dashboard/PartnerForm';
import PartnerDetail from './dashboard/PartnerDetail';
import DonorProfileModal from './dashboard/DonorProfileModal';
import RequestDetail from './dashboard/RequestDetail';
import SMSGateway from './dashboard/SMSGateway';
import InventoryManager from './dashboard/InventoryManager';
import MapView from './common/MapView';

// --- MOCK DATA ---
const predictionData: PredictionData[] = [
  { month: 'Jan', demand: 120, supply: 110 },
  { month: 'Feb', demand: 132, supply: 125 },
  { month: 'Mar', demand: 145, supply: 130 },
  { month: 'Apr', demand: 160, supply: 120 }, // Gap starts
  { month: 'May', demand: 180, supply: 125 }, // High Gap
  { month: 'Jun', demand: 170, supply: 140 },
];

const wastageData = [
  { name: 'RBC', used: 450, wasted: 20 },
  { name: 'Plasma', used: 320, wasted: 45 },
  { name: 'Platelets', used: 150, wasted: 12 },
];

const activityFeed = [
  { id: 1, type: 'match', message: 'Donor Vikram S. matched with Request #402', time: '10 mins ago' },
  { id: 2, type: 'alert', message: 'Critical Shortage: B- in Bastar District', time: '25 mins ago' },
  { id: 3, type: 'stock', message: '150 Units added by Raipur Mega Drive', time: '1 hour ago' },
  { id: 4, type: 'request', message: 'New Emergency Request from CHC Dantewada', time: '2 hours ago' },
];

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
    stock: bloodStock // Reusing mock stock for example
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
  }
];

interface DashboardProps {
  requests: EmergencyRequest[];
  donors: Donor[];
  onUpdateDonors: (donors: Donor[]) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ requests: initialRequestsProp, donors, onUpdateDonors, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'donors' | 'partners' | 'sms' | 'inventory'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [requests, setRequests] = useState<EmergencyRequest[]>(initialRequestsProp);
  const [smsMessages, setSmsMessages] = useState<SMSMessage[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list'); // New view mode for donors
  
  // View States
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [isAddingDonor, setIsAddingDonor] = useState(false);
  
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isAddingPartner, setIsAddingPartner] = useState(false);
  
  const [selectedRequest, setSelectedRequest] = useState<EmergencyRequest | null>(null);

  // Helper for status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'Low': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Adequate': return 'bg-green-100 text-green-700 border-green-200';
      case 'Surplus': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const handleAddDonor = (newDonor: Partial<Donor>) => {
    const donor: Donor = {
      id: `d${Date.now()}`,
      name: newDonor.name || 'New Donor',
      bloodGroup: newDonor.bloodGroup || 'O+',
      location: newDonor.location || 'Unknown',
      phone: newDonor.phone || '',
      email: newDonor.email || '',
      lastDonation: 'Never',
      points: 0,
      badge: 'Newbie',
      totalDonations: 0,
      nextEligibleDate: 'Today',
      notificationsEnabled: true,
      history: []
    };
    onUpdateDonors([donor, ...donors]);
    setIsAddingDonor(false);
  };

  const handleUpdateDonor = (updatedDonor: Donor) => {
    const updatedList = donors.map(d => d.id === updatedDonor.id ? updatedDonor : d);
    onUpdateDonors(updatedList);
    // If the currently selected donor is the one being updated, refresh the selection
    if (selectedDonor && selectedDonor.id === updatedDonor.id) {
        setSelectedDonor(updatedDonor);
    }
  };

  const handleAddPartner = (newPartner: Partial<Partner>) => {
    const partner: Partner = {
      id: `p${Date.now()}`,
      name: newPartner.name || 'New Partner',
      type: newPartner.type || 'Hospital',
      location: newPartner.location || 'Unknown',
      contact: newPartner.contact || '',
      email: newPartner.email || '',
      stock: [
        { group: 'A+', units: 0, status: 'Critical' },
        { group: 'A-', units: 0, status: 'Critical' },
        { group: 'B+', units: 0, status: 'Critical' },
        { group: 'B-', units: 0, status: 'Critical' },
        { group: 'O+', units: 0, status: 'Critical' },
        { group: 'O-', units: 0, status: 'Critical' },
        { group: 'AB+', units: 0, status: 'Critical' },
        { group: 'AB-', units: 0, status: 'Critical' },
      ]
    };
    setPartners([...partners, partner]);
    setIsAddingPartner(false);
  };

  const handlePartnerStockUpdate = (partnerId: string, group: string, newUnits: number) => {
    setPartners(prevPartners => prevPartners.map(p => {
      if (p.id !== partnerId) return p;
      const updatedStock = p.stock.map(s => {
        if (s.group !== group) return s;
        let status: 'Critical' | 'Low' | 'Adequate' | 'Surplus' = 'Adequate';
        if (newUnits < 5) status = 'Critical';
        else if (newUnits < 15) status = 'Low';
        else if (newUnits > 50) status = 'Surplus';
        return { ...s, units: newUnits, status };
      });
      return { ...p, stock: updatedStock };
    }));
    // Also update selected partner view if open
    if (selectedPartner && selectedPartner.id === partnerId) {
      setSelectedPartner(prev => prev ? ({
        ...prev,
        stock: prev.stock.map(s => {
           if (s.group !== group) return s;
           let status: 'Critical' | 'Low' | 'Adequate' | 'Surplus' = 'Adequate';
           if (newUnits < 5) status = 'Critical';
           else if (newUnits < 15) status = 'Low';
           else if (newUnits > 50) status = 'Surplus';
           return { ...s, units: newUnits, status };
        })
      }) : null);
    }
  };

  const handleDonorClick = (donor: Donor) => {
    setSelectedDonor(donor);
  };

  const handleBackToDonors = () => {
    setSelectedDonor(null);
  };

  // SMS Gateway Logic
  const handleSimulateSMS = (content: string, sender: string) => {
    const timestamp = new Date().toLocaleTimeString();
    
    // Add Incoming Message
    const incomingMsg: SMSMessage = {
      id: `sms-${Date.now()}`,
      sender,
      content,
      timestamp,
      type: 'Incoming',
      status: 'Received'
    };
    
    setSmsMessages(prev => [...prev, incomingMsg]);

    // Process logic
    setTimeout(() => {
      let replyContent = '';
      const upperContent = content.toUpperCase();

      // 1. Parsing Emergency Request: "NEED O+ BASTAR"
      if (upperContent.startsWith('NEED') || upperContent.startsWith('REQUIRE')) {
        const parts = upperContent.split(' ');
        const bloodGroup = parts.find(p => ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].includes(p)) || 'Unknown';
        const locationIndex = parts.indexOf(bloodGroup) + 1;
        const location = parts.slice(locationIndex).filter(p => p !== 'URGENT').join(' ') || 'Remote Area';
        
        const newRequest: EmergencyRequest = {
          id: `sms-${Date.now().toString().slice(-4)}`,
          hospital: `SMS Req: ${location}`,
          patientName: `SMS User (${sender.slice(-4)})`,
          contactNumber: sender,
          bloodGroup: bloodGroup,
          unitsNeeded: 1,
          urgency: upperContent.includes('URGENT') ? 'Critical' : 'High',
          status: 'Pending',
          timestamp: 'Just now'
        };

        setRequests(prev => [newRequest, ...prev]);
        setSmsMessages(prev => prev.map(m => m.id === incomingMsg.id ? { ...m, status: 'Processed' } : m));
        replyContent = `[System] Request registered ID #${newRequest.id}. Searching nearby donors for ${bloodGroup} in ${location}.`;
      } 
      // 2. Parsing Response: "YES [ID]"
      else if (upperContent.startsWith('YES') || upperContent.startsWith('AVAILABLE')) {
        replyContent = `[System] Thank you. You have been matched. Please proceed to the nearest center.`;
        setSmsMessages(prev => prev.map(m => m.id === incomingMsg.id ? { ...m, status: 'Processed' } : m));
      }
      else {
        replyContent = `[System] Invalid Command. Use format: NEED [GROUP] [LOCATION]`;
      }

      // Add Outgoing Reply
      const outgoingMsg: SMSMessage = {
        id: `sms-reply-${Date.now()}`,
        sender: 'System',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString(),
        type: 'Outgoing',
        status: 'Sent'
      };
      setSmsMessages(prev => [...prev, outgoingMsg]);
    }, 800);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <HeartLogo />
            <span className="ml-3 font-bold text-lg text-slate-900">RaktSetu</span>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            <NavItem 
              icon={<LayoutDashboard />} 
              label="Intelligent Flow" 
              active={activeTab === 'overview'} 
              onClick={() => { setActiveTab('overview'); setSelectedDonor(null); setSelectedPartner(null); setSelectedRequest(null); setSidebarOpen(false); }} 
            />
            <NavItem 
              icon={<Activity />} 
              label="Emergency Requests" 
              active={activeTab === 'requests'} 
              count={requests.length}
              onClick={() => { setActiveTab('requests'); setSelectedDonor(null); setSelectedPartner(null); setSelectedRequest(null); setSidebarOpen(false); }} 
            />
            <NavItem 
              icon={<Users />} 
              label="Donor Network" 
              active={activeTab === 'donors'} 
              onClick={() => { setActiveTab('donors'); setSelectedPartner(null); setSelectedRequest(null); setSidebarOpen(false); }} 
            />
             <NavItem 
              icon={<Building2 />} 
              label="Network Partners" 
              active={activeTab === 'partners'} 
              onClick={() => { setActiveTab('partners'); setSelectedDonor(null); setSelectedRequest(null); setSidebarOpen(false); }} 
            />
             <NavItem 
              icon={<Package />} 
              label="Global Inventory" 
              active={activeTab === 'inventory'} 
              onClick={() => { setActiveTab('inventory'); setSelectedDonor(null); setSelectedPartner(null); setSelectedRequest(null); setSidebarOpen(false); }} 
            />
            {
                /*
                <NavItem 
                icon={<MessageSquare />} 
                label="SMS Gateway" 
                active={activeTab === 'sms'} 
                onClick={() => { setActiveTab('sms'); setSelectedDonor(null); setSelectedPartner(null); setSelectedRequest(null); setSidebarOpen(false); }} 
                />
                */
            }
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-xl p-4 text-white">
              <p className="text-xs font-medium text-red-100 uppercase tracking-wider mb-1">Impact Tracker</p>
              <div className="text-2xl font-bold">124 Lives</div>
              <p className="text-xs text-red-100 mt-1">Saved this month</p>
            </div>
          </div>
          
          <div className="p-4">
             <button onClick={onLogout} className="flex items-center w-full px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
               <LogOut className="w-5 h-5 mr-3" />
               Sign Out
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md">
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex-1 max-w-xl mx-auto hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search blood banks, donors, or requests..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-200 rounded-lg text-sm transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold text-xs border border-red-200">
                AI
              </div>
              <span className="ml-2 text-sm font-medium text-slate-700 hidden sm:block">Admin</span>
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
          
          {/* Tab: Overview / Intelligent Flow */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Intelligent Blood Flow</h1>
                  <p className="text-slate-500">Real-time predictive analytics, activity, and utilization metrics.</p>
                </div>
                <div className="hidden sm:flex space-x-2">
                   <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Demand High in May
                   </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                  title="Total Units Available" 
                  value="1,248" 
                  trend="+12%" 
                  trendUp={true}
                  icon={<Droplet className="w-6 h-6 text-red-600" />} 
                />
                <StatCard 
                  title="Pending Requests" 
                  value={`${requests.length}`}
                  trend={requests.length > 5 ? "+12%" : "-5%"} 
                  trendUp={false}
                  icon={<Activity className="w-6 h-6 text-orange-600" />} 
                />
                <StatCard 
                  title="Active Donors" 
                  value={`${donors.length}`}
                  trend="+24%" 
                  trendUp={true}
                  icon={<Users className="w-6 h-6 text-blue-600" />} 
                />
                 <StatCard 
                  title="Matches Made" 
                  value="128" 
                  trend="+8%" 
                  trendUp={true}
                  icon={<Share2 className="w-6 h-6 text-green-600" />} 
                />
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Chart: Supply vs Demand */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-slate-400" />
                    Predictive Supply vs. Demand
                  </h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={predictionData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                        />
                        <Legend />
                        <ReferenceArea 
                          x1="Apr" 
                          x2="Jun" 
                          stroke="none" 
                          fill="#fee2e2" 
                          fillOpacity={0.5} 
                          label={{ value: 'Projected Shortage', position: 'insideTopRight', fill: '#ef4444', fontSize: 12, fontWeight: 600 }} 
                        />
                        <Line type="monotone" dataKey="demand" name="Predicted Demand" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="supply" name="Current Trend" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-red-900">AI Insight: May Shortage Alert</h4>
                      <p className="text-sm text-red-700 mt-1">
                        Historical data predicts a 45% spike in demand during May due to seasonal factors in Bastar. Recommended action: Initiate targeted donor drives in Bhilai surplus zones now.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Secondary Chart: Wastage/Usage */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-slate-400" />
                    Utilization & Wastage
                  </h3>
                  <div className="flex-1 w-full min-h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={wastageData}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                         <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                         <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px' }} />
                         <Legend wrapperStyle={{ fontSize: '12px' }} />
                         <Bar dataKey="used" name="Units Used" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                         <Bar dataKey="wasted" name="Wasted" fill="#ef4444" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 text-xs text-slate-500">
                    <p>Current wastage rate is <span className="font-bold text-green-600">4.2%</span> (Target: &lt;5%). Platelet shelf-life remains the primary challenge.</p>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Activity Feed & Quick Actions */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                   <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
                     <span>Recent System Activity</span>
                     <button className="text-xs text-blue-600 font-medium hover:underline">View All</button>
                   </h3>
                   <div className="space-y-4">
                     {activityFeed.map((activity) => (
                       <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                         <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                           ${activity.type === 'match' ? 'bg-green-100 text-green-600' : 
                             activity.type === 'alert' ? 'bg-red-100 text-red-600' :
                             activity.type === 'stock' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}
                         `}>
                           {activity.type === 'match' ? <CheckCircle2 size={16} /> :
                            activity.type === 'alert' ? <AlertCircle size={16} /> :
                            activity.type === 'stock' ? <Plus size={16} /> : <Activity size={16} />}
                         </div>
                         <div className="flex-1">
                           <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                           <p className="text-xs text-slate-500">{activity.time}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Stock Levels (Existing) */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-y-auto max-h-[400px]">
                   <h3 className="text-lg font-bold text-slate-900 mb-4">Real-time Stock</h3>
                   <div className="space-y-3">
                     {bloodStock.map((stock) => (
                       <div key={stock.group} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors">
                         <div className="flex items-center gap-3">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-slate-700 bg-white shadow-sm border border-slate-200`}>
                             {stock.group}
                           </div>
                           <span className="text-sm font-medium text-slate-600">{stock.units} Units</span>
                         </div>
                         <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${getStatusColor(stock.status)}`}>
                           {stock.status}
                         </span>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Emergency Requests */}
          {activeTab === 'requests' && (
             <div className="space-y-6">
              {selectedRequest ? (
                <RequestDetail 
                  request={selectedRequest} 
                  onBack={() => setSelectedRequest(null)} 
                />
              ) : (
               <>
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Emergency Response</h1>
                  <p className="text-slate-500">Live requests prioritized by medical urgency.</p>
                </div>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-200">
                  <Activity className="w-4 h-4" /> Broadcast Urgent Request
                </button>
              </div>

              <div className="grid gap-4">
                {requests.map((req) => (
                  <div key={req.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${req.urgency === 'Critical' ? 'bg-red-600' : 'bg-orange-500'}`}></div>
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div className="flex items-start gap-4">
                         <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold border border-red-200 flex-shrink-0">
                           {req.bloodGroup}
                         </div>
                         <div>
                           <div className="flex items-center gap-2 mb-1">
                             <h3 className="font-bold text-slate-900">{req.hospital}</h3>
                             <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${req.urgency === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                               {req.urgency}
                             </span>
                           </div>
                           <div className="space-y-1">
                              <p className="text-sm text-slate-600"><span className="font-semibold">Patient:</span> {req.patientName}</p>
                              {req.contactNumber && (
                                <p className="text-sm text-slate-600 flex items-center gap-1">
                                  <Phone className="w-3 h-3" /> <span className="font-semibold">Contact:</span> {req.contactNumber}
                                </p>
                              )}
                              <p className="text-sm text-slate-600"><span className="font-semibold">Needs:</span> {req.unitsNeeded} Units</p>
                           </div>
                           <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {req.hospital.includes('(') ? req.hospital.split('(')[1].replace(')', '') : 'Local District'}</span>
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {req.timestamp}</span>
                           </div>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                         <button 
                            onClick={() => setSelectedRequest(req)}
                            className="flex-1 md:flex-none px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm transition-colors"
                         >
                           Details
                         </button>
                         <button className="flex-1 md:flex-none px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm shadow-md shadow-red-200 transition-colors">
                           Match Donor
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
                {requests.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
                    <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                      <ShieldCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">No Pending Requests</h3>
                    <p className="text-slate-500">All emergency requests have been fulfilled.</p>
                  </div>
                )}
              </div>
              
              {/* SMS Simulation for Zero-Cost Access */}
              <div className="mt-8 bg-slate-900 rounded-xl p-6 text-slate-300 border border-slate-800">
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="w-5 h-5 text-green-400" />
                  <h3 className="font-bold text-white">Live SMS Gateway (Rural Interface)</h3>
                </div>
                <div className="font-mono text-sm space-y-2 max-h-48 overflow-y-auto">
                   <div className="border-l-2 border-green-500 pl-3 py-1">
                     <span className="text-green-500">[IN 98271xxxxx]</span> NEED O+ BASTAR URGENT
                   </div>
                   <div className="border-l-2 border-blue-500 pl-3 py-1">
                     <span className="text-blue-500">[SYS]</span> Matches Found: 3. Alerting registered volunteers in 5km radius via SMS...
                   </div>
                   <div className="border-l-2 border-green-500 pl-3 py-1">
                     <span className="text-green-500">[IN 94252xxxxx]</span> YES AVAILABLE
                   </div>
                   <div className="border-l-2 border-blue-500 pl-3 py-1">
                     <span className="text-blue-500">[SYS]</span> Connecting Donor 94252xxxxx with CHC Bastar. Ticket #402.
                   </div>
                </div>
              </div>
              </>
              )}
             </div>
          )}

          {/* Tab: Donor Network / Gamification */}
          {activeTab === 'donors' && (
            <div className="space-y-6">
              {isAddingDonor ? (
                <div className="max-w-2xl mx-auto">
                   <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                      <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                        <h2 className="text-xl font-bold text-slate-900">Register New Donor</h2>
                        <button onClick={() => setIsAddingDonor(false)} className="text-slate-400 hover:text-slate-600"><ChevronLeft className="w-5 h-5" /></button>
                      </div>
                      <DonorForm onSave={handleAddDonor} onCancel={() => setIsAddingDonor(false)} />
                   </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900">Community Heroes</h1>
                      <div className="flex items-center gap-2 text-slate-500 mt-1">
                        <span>Gamified engagement system</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-slate-700 font-semibold">{donors.length} Total Donors</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                        <button 
                          onClick={() => setViewMode('list')}
                          className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                          title="List View"
                        >
                          <List className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setViewMode('map')}
                          className={`p-1.5 rounded-md transition-all ${viewMode === 'map' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                          title="Map View"
                        >
                          <Map className="w-4 h-4" />
                        </button>
                      </div>
                      <button 
                        onClick={() => setIsAddingDonor(true)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-200"
                      >
                        <Plus className="w-4 h-4" /> Add New Donor
                      </button>
                    </div>
                  </div>

                  {viewMode === 'map' ? (
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                      <MapView 
                        interactive={true}
                        height="h-[600px]"
                        markers={donors.map((d, i) => ({
                          id: d.id,
                          type: 'donor',
                          // Simulate positions based on ID/Index to keep it consistent
                          lat: 20 + ((i * 17) % 60), 
                          lng: 20 + ((i * 23) % 60),
                          label: d.name,
                          subLabel: `${d.bloodGroup} • ${d.location}`,
                          color: 'bg-red-500 text-white'
                        }))}
                      />
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Leaderboard */}
                      <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                          <h3 className="font-bold text-slate-900 flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-500" /> Top Contributors
                          </h3>
                          <div className="relative">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                            <input type="text" placeholder="Search donors..." className="pl-7 pr-3 py-1 text-xs border border-slate-200 rounded-lg outline-none focus:border-red-300" />
                          </div>
                        </div>
                        <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                          {donors.map((donor, index) => (
                            <div 
                              key={donor.id} 
                              onClick={() => handleDonorClick(donor)}
                              className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-sm
                                  ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-slate-300' : index === 2 ? 'bg-orange-300' : 'bg-slate-200 text-slate-500'}
                                `}>
                                  {index + 1}
                                </div>
                                <div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-red-600 transition-colors">{donor.name}</h4>
                                  <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <MapPin className="w-3 h-3" /> {donor.location} • <span className="font-semibold text-red-600">{donor.bloodGroup}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-red-600 font-bold">{donor.points} Pts</div>
                                <div className="text-xs px-2 py-0.5 bg-slate-100 rounded-full inline-block mt-1 text-slate-600 border border-slate-200">
                                  {donor.badge}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Engagement Card */}
                      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white relative overflow-hidden">
                        <div className="relative z-10">
                          <h3 className="font-bold text-lg mb-2">Upcoming Drive</h3>
                          <p className="text-slate-300 text-sm mb-6">
                            RaktSetu Camp @ Raipur University. Double points for O- donors!
                          </p>
                          <div className="flex items-center gap-3 mb-6">
                            <div className="bg-white/10 px-3 py-2 rounded-lg text-center backdrop-blur-sm">
                              <div className="text-xl font-bold">12</div>
                              <div className="text-[10px] uppercase text-slate-400">Days</div>
                            </div>
                            <div className="bg-white/10 px-3 py-2 rounded-lg text-center backdrop-blur-sm">
                              <div className="text-xl font-bold">04</div>
                              <div className="text-[10px] uppercase text-slate-400">Hours</div>
                            </div>
                          </div>
                          <button className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors shadow-lg shadow-red-900/50">
                            Register Organization
                          </button>
                        </div>
                        {/* Decorative */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                      </div>
                    </div>
                  )}

                  {/* Donor Details Modal */}
                  {selectedDonor && (
                    <DonorProfileModal 
                      donor={selectedDonor} 
                      onClose={handleBackToDonors}
                      onUpdate={(updatedDonor) => handleUpdateDonor(updatedDonor)}
                    />
                  )}
                </>
              )}
            </div>
          )}

           {/* Tab: Partner Network (Hospitals & Blood Banks) */}
           {activeTab === 'partners' && (
            <div className="space-y-6">
              {isAddingPartner ? (
                <div className="max-w-2xl mx-auto">
                   <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                      <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                        <h2 className="text-xl font-bold text-slate-900">Register Network Partner</h2>
                        <button onClick={() => setIsAddingPartner(false)} className="text-slate-400 hover:text-slate-600"><ChevronLeft className="w-5 h-5" /></button>
                      </div>
                      <PartnerForm onSave={handleAddPartner} onCancel={() => setIsAddingPartner(false)} />
                   </div>
                </div>
              ) : !selectedPartner ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900">Network Partners</h1>
                      <div className="flex items-center gap-2 text-slate-500 mt-1">
                        <span>Hospitals & Blood Banks Collaboration</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsAddingPartner(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-200"
                    >
                      <Plus className="w-4 h-4" /> Add Partner
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {partners.map((partner) => (
                      <div key={partner.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                        <div className="p-6">
                           <div className="flex justify-between items-start mb-4">
                             <div className={`p-3 rounded-lg ${partner.type === 'Hospital' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                               {partner.type === 'Hospital' ? <Stethoscope className="w-6 h-6" /> : <Droplet className="w-6 h-6" />}
                             </div>
                             <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-500">{partner.type}</span>
                           </div>
                           <h3 className="text-lg font-bold text-slate-900 mb-1">{partner.name}</h3>
                           <p className="text-slate-500 text-sm mb-4 flex items-center gap-1"><MapPin className="w-3 h-3" /> {partner.location}</p>
                           
                           <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                              <div className="bg-slate-50 p-2 rounded">
                                <span className="block text-xs text-slate-400">Inventory</span>
                                <span className="font-semibold text-slate-700">{partner.stock.reduce((acc, curr) => acc + curr.units, 0)} Units</span>
                              </div>
                              <div className="bg-slate-50 p-2 rounded">
                                <span className="block text-xs text-slate-400">Critical</span>
                                <span className="font-semibold text-red-600">{partner.stock.filter(s => s.status === 'Critical').length} Grps</span>
                              </div>
                           </div>

                           <button 
                            onClick={() => setSelectedPartner(partner)}
                            className="w-full py-2 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
                           >
                             Manage Inventory
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <PartnerDetail 
                  partner={selectedPartner} 
                  onBack={() => setSelectedPartner(null)} 
                  onUpdateStock={handlePartnerStockUpdate}
                />
              )}
            </div>
           )}

           {/* Tab: Global Inventory */}
           {activeTab === 'inventory' && (
             <InventoryManager partners={partners} />
           )}

           {/* Tab: SMS Gateway Console */}
           {activeTab === 'sms' && (
             <SMSGateway 
                messages={smsMessages} 
                onSimulateSMS={handleSimulateSMS} 
             />
           )}

        </main>
      </div>
    </div>
  );
};

export default Dashboard;