import React, { useState } from 'react';
import { Heart, Send, ChevronLeft, MapPin, Phone, User, Building2, AlertCircle, Navigation } from 'lucide-react';
import { EmergencyRequest } from '../types';
import MapView from './common/MapView';

interface UserRequestFormProps {
  onSubmit: (request: EmergencyRequest) => void;
  onCancel: () => void;
}

const UserRequestForm: React.FC<UserRequestFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    contactNumber: '',
    hospital: '',
    bloodGroup: 'O+',
    unitsNeeded: 1,
    urgency: 'High' as 'High' | 'Critical' | 'Moderate',
    location: ''
  });

  const [isLocating, setIsLocating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: EmergencyRequest = {
      id: `req-${Date.now()}`,
      patientName: formData.patientName,
      contactNumber: formData.contactNumber,
      hospital: formData.hospital + (formData.location ? ` (${formData.location})` : ''),
      bloodGroup: formData.bloodGroup,
      unitsNeeded: Number(formData.unitsNeeded),
      urgency: formData.urgency,
      status: 'Pending',
      timestamp: 'Just now'
    };
    onSubmit(newRequest);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGeolocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulate reverse geocoding
          setTimeout(() => {
            setFormData(prev => ({ ...prev, location: 'Near Civil Lines, Raipur' }));
            setIsLocating(false);
          }, 1000);
        },
        (error) => {
          console.error("Error obtaining location", error);
          alert("Could not access location. Please enter manually.");
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
      setIsLocating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-red-600 p-6 text-center relative">
          <button 
            onClick={onCancel}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-red-700/50 hover:bg-red-700 rounded-full text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <Heart className="w-6 h-6 text-white fill-current" />
          </div>
          <h2 className="text-2xl font-bold text-white">Request Blood</h2>
          <p className="text-red-100 text-sm mt-1">We will connect you with nearby donors immediately.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          <div className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                 <User className="w-4 h-4 text-slate-400" /> Patient Name
               </label>
               <input 
                 required
                 name="patientName"
                 value={formData.patientName}
                 onChange={handleChange}
                 type="text" 
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all"
                 placeholder="Who needs blood?"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                 <Phone className="w-4 h-4 text-slate-400" /> Contact Number
               </label>
               <input 
                 required
                 name="contactNumber"
                 value={formData.contactNumber}
                 onChange={handleChange}
                 type="tel" 
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all"
                 placeholder="+91..."
               />
             </div>

             <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Blood Group</label>
                  <select 
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none font-bold text-slate-700"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Units Needed</label>
                  <input 
                    required
                    name="unitsNeeded"
                    value={formData.unitsNeeded}
                    onChange={handleChange}
                    type="number" 
                    min="1"
                    max="10"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none"
                  />
               </div>
             </div>

             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                 <Building2 className="w-4 h-4 text-slate-400" /> Hospital Name
               </label>
               <input 
                 required
                 name="hospital"
                 value={formData.hospital}
                 onChange={handleChange}
                 type="text" 
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all"
                 placeholder="Where is the patient admitted?"
               />
             </div>

             <div>
               <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" /> Location
                  </label>
                  <button 
                    type="button"
                    onClick={handleGeolocation}
                    className="text-xs flex items-center gap-1 text-blue-600 font-medium hover:underline"
                  >
                    {isLocating ? 'Locating...' : <><Navigation className="w-3 h-3" /> Use Current Location</>}
                  </button>
               </div>
               
               {/* Map View Integration */}
               <div className="mb-3">
                 <MapView 
                    height="h-32" 
                    interactive={true} 
                    centerLabel={formData.location || "Select Location"}
                 />
               </div>

               <input 
                 required
                 name="location"
                 value={formData.location}
                 onChange={handleChange}
                 type="text" 
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all"
                 placeholder="e.g. Raipur, Bastar"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                 <AlertCircle className="w-4 h-4 text-slate-400" /> Urgency Level
               </label>
               <div className="grid grid-cols-3 gap-2">
                  {['Moderate', 'High', 'Critical'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData({...formData, urgency: level as any})}
                      className={`py-2 px-1 rounded-lg text-sm font-medium border transition-all
                        ${formData.urgency === level 
                          ? level === 'Critical' ? 'bg-red-600 text-white border-red-600' : 'bg-slate-800 text-white border-slate-800'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }
                      `}
                    >
                      {level}
                    </button>
                  ))}
               </div>
             </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2 mt-2"
          >
            <Send className="w-5 h-5" /> Submit Request
          </button>
          
          <p className="text-center text-xs text-slate-400 mt-4">
            By submitting, you agree to share these details with our donor network.
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserRequestForm;