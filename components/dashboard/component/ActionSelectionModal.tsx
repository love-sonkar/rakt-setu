import React from 'react';
import { X, AlertCircle, UserPlus, Heart } from 'lucide-react';
import { NavLink } from 'react-router-dom';


const ActionSelectionModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

        <div className="bg-red-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-current" />
            <span className="font-bold text-lg">Quick Actions</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-500 mb-2">Please select an option to proceed:</p>

          <NavLink to="/emergency"

            className="w-full flex items-center gap-4 p-4 rounded-xl border border-red-100 bg-red-50 hover:bg-red-100 transition-colors group text-left"
          >
            <div className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center text-red-700 group-hover:scale-110 transition-transform">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Emergency Request</div>
              <div className="text-xs text-slate-500">Need blood urgently?</div>
            </div>
          </NavLink>

          <NavLink
            to="/donersignup"
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors group text-left shadow-sm"
          >
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-110 transition-transform">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Register as Donor</div>
              <div className="text-xs text-slate-500">Join the community</div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ActionSelectionModal;