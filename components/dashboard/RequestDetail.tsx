import React from 'react';
import { 
  ChevronLeft, 
  Phone, 
  MapPin, 
  Calendar, 
  Activity, 
  Clock, 
  User, 
  ShieldCheck,
  AlertTriangle,
  Share2,
  Navigation
} from 'lucide-react';
import { EmergencyRequest } from '../../types';

interface RequestDetailProps {
  request: EmergencyRequest;
  onBack: () => void;
}

const RequestDetail: React.FC<RequestDetailProps> = ({ request, onBack }) => {
  const handleContact = () => {
    window.open(`tel:${request.contactNumber}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Urgent Blood Request: ${request.bloodGroup}`,
        text: `${request.unitsNeeded} units of ${request.bloodGroup} needed at ${request.hospital}. Urgency: ${request.urgency}.`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header Navigation */}
      <div className="flex justify-between items-center">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-600 hover:text-red-600 transition-colors text-sm font-medium group"
        >
          <div className="p-1 rounded-full group-hover:bg-red-50 transition-colors mr-1">
            <ChevronLeft className="w-5 h-5" />
          </div>
          Back to Requests
        </button>
        <div className="text-xs text-slate-400 font-mono">ID: {request.id}</div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Urgent Header Strip */}
        <div className={`px-6 py-4 flex justify-between items-center ${
          request.urgency === 'Critical' 
            ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white' 
            : request.urgency === 'High' 
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
              : 'bg-slate-100 text-slate-800'
        }`}>
           <div className="flex items-center gap-2">
             <Activity className="w-5 h-5 animate-pulse" />
             <span className="font-bold tracking-wide uppercase text-sm">
               {request.urgency} Priority Request
             </span>
           </div>
           <div className="flex items-center gap-1 text-xs font-medium opacity-90">
             <Clock className="w-4 h-4" />
             Posted {request.timestamp}
           </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Left Column: Key Visuals */}
            <div className="flex-shrink-0 flex flex-col items-center space-y-4">
               <div className="relative">
                 <div className="w-32 h-32 rounded-full border-4 border-red-100 flex items-center justify-center bg-red-50 text-red-600 shadow-inner">
                    <span className="text-4xl font-black">{request.bloodGroup}</span>
                 </div>
                 <div className="absolute bottom-0 right-0 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                   {request.unitsNeeded} Units
                 </div>
               </div>
               
               <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                 request.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                 request.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                 'bg-green-50 text-green-700 border-green-200'
               }`}>
                 Status: {request.status}
               </div>
            </div>

            {/* Right Column: Details */}
            <div className="flex-1 space-y-6">
              
              {/* Hospital Info */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">{request.hospital}</h2>
                <div className="flex items-center text-slate-500 text-sm gap-4">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Distance: 2.4 km</span>
                  <button className="text-blue-600 hover:underline flex items-center gap-1">
                    <Navigation className="w-3 h-3" /> Get Directions
                  </button>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Patient & Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xs text-slate-400 uppercase font-semibold mb-2 flex items-center gap-1">
                    <User className="w-3 h-3" /> Patient Details
                  </div>
                  <div className="font-semibold text-slate-800">{request.patientName}</div>
                  <div className="text-xs text-slate-500 mt-1">Patient ID: #PT-{request.id.split('-')[1] || '8832'}</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xs text-slate-400 uppercase font-semibold mb-2 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verification
                  </div>
                  <div className="font-semibold text-green-700 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Verified Case
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Hospital Admin Approved</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button 
                  onClick={handleContact}
                  className="flex-1 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
                >
                  <Phone className="w-5 h-5" /> Contact Requester
                </button>
                <button 
                  onClick={handleShare}
                  className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" /> Share
                </button>
              </div>

              {/* Alert Box */}
              <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-red-800">AI Recommendation</p>
                  <p className="text-red-700 mt-1">
                    3 donors with blood group <span className="font-bold">{request.bloodGroup}</span> are within 5km radius and have high response scores. The system has sent automated alerts.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;