import React from 'react';
import { Activity, Phone, MapPin, Calendar, ShieldCheck } from 'lucide-react';
import { EmergencyRequest } from '../../types';

interface RequestsListProps {
  requests: EmergencyRequest[];
  onSelectRequest: (request: EmergencyRequest) => void;
}

const RequestsList: React.FC<RequestsListProps> = ({ requests, onSelectRequest }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
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
                     <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${
                         req.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                         req.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                         'bg-green-50 text-green-700 border-green-200'
                     }`}>
                        {req.status}
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
                    onClick={() => onSelectRequest(req)}
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
    </div>
  );
};

export default RequestsList;