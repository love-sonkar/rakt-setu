import React from 'react';
import { TrendingUp, Droplet, Activity, Users, Share2, CheckCircle2, AlertCircle, Plus, BarChart2 } from 'lucide-react';
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
import StatCard from './StatCard';
import { EmergencyRequest, Donor, PredictionData, BloodStock } from '../../types';

interface OverviewProps {
  requests: EmergencyRequest[];
  donors: Donor[];
  bloodStock: BloodStock[];
}

// Mock Data local to Overview
const predictionData: PredictionData[] = [
  { month: 'Jan', demand: 120, supply: 110 },
  { month: 'Feb', demand: 132, supply: 125 },
  { month: 'Mar', demand: 145, supply: 130 },
  { month: 'Apr', demand: 160, supply: 120 }, 
  { month: 'May', demand: 180, supply: 125 }, 
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

const Overview: React.FC<OverviewProps> = ({ requests, donors, bloodStock }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'Low': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Adequate': return 'bg-green-100 text-green-700 border-green-200';
      case 'Surplus': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
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
          value={`${requests.filter(r => r.status === 'Pending').length}`}
          trend={requests.filter(r => r.status === 'Pending').length > 5 ? "+12%" : "-5%"} 
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
  );
};

export default Overview;