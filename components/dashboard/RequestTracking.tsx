import React from 'react';
import { EmergencyRequest } from '../../types';
import { CheckCircle2, Clock, Truck, MoreHorizontal, ArrowLeftRight } from 'lucide-react';

interface RequestTrackingProps {
  requests: EmergencyRequest[];
  onUpdateRequestStatus: (id: string, status: 'Pending' | 'In Progress' | 'Completed') => void;
  onSelectRequest: (req: EmergencyRequest) => void;
}

const RequestTracking: React.FC<RequestTrackingProps> = ({ requests, onUpdateRequestStatus, onSelectRequest }) => {
  const columns = [
    { id: 'Pending', label: 'Pending', color: 'bg-yellow-50 border-yellow-100', icon: Clock, iconColor: 'text-yellow-600' },
    { id: 'In Progress', label: 'In Progress', color: 'bg-blue-50 border-blue-100', icon: Truck, iconColor: 'text-blue-600' },
    { id: 'Completed', label: 'Completed', color: 'bg-green-50 border-green-100', icon: CheckCircle2, iconColor: 'text-green-600' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Request Tracking</h1>
          <p className="text-slate-500">Monitor request lifecycle from initiation to fulfillment.</p>
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden min-h-[500px]">
        {columns.map(col => (
          <div key={col.id} className={`flex flex-col h-full rounded-xl border ${col.color}`}>
            {/* Column Header */}
            <div className="p-4 border-b border-slate-200/50 flex items-center justify-between bg-white/50">
              <h3 className={`font-bold text-lg flex items-center gap-2 ${col.iconColor}`}>
                <col.icon className="w-5 h-5" /> {col.label}
              </h3>
              <span className="bg-white px-2.5 py-1 rounded-full text-xs font-bold text-slate-600 shadow-sm border border-slate-200">
                {requests.filter(r => r.status === col.id).length}
              </span>
            </div>
            
            {/* Column Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {requests.filter(r => r.status === col.id).map(req => (
                <div key={req.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group relative">
                   <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-xs">
                           {req.bloodGroup}
                         </div>
                         <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider ${
                           req.urgency === 'Critical' ? 'bg-red-100 text-red-700' : 
                           req.urgency === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'
                         }`}>{req.urgency}</span>
                      </div>
                   </div>
                   
                   <div onClick={() => onSelectRequest(req)} className="cursor-pointer">
                     <h4 className="text-sm font-bold text-slate-800 mb-1 hover:text-blue-600 transition-colors">{req.patientName}</h4>
                     <p className="text-xs text-slate-500 mb-2 truncate">{req.hospital}</p>
                     <p className="text-xs font-mono text-slate-400">{req.timestamp}</p>
                   </div>
                   
                   {/* Actions Overlay */}
                   <div className="flex gap-2 mt-3 pt-3 border-t border-slate-50">
                     {col.id !== 'Pending' && (
                        <button 
                          onClick={() => onUpdateRequestStatus(req.id, col.id === 'Completed' ? 'In Progress' : 'Pending')}
                          className="flex-1 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          &larr; Move Back
                        </button>
                     )}
                     {col.id !== 'Completed' && (
                        <button 
                          onClick={() => onUpdateRequestStatus(req.id, col.id === 'Pending' ? 'In Progress' : 'Completed')}
                          className="flex-1 py-1.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          Move Next &rarr;
                        </button>
                     )}
                   </div>
                </div>
              ))}
              
              {requests.filter(r => r.status === col.id).length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm italic border-2 border-dashed border-slate-200 rounded-lg">
                  No requests
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestTracking;