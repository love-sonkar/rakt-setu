import React, { useState } from 'react';
import { Partner } from '../../types';

const PartnerForm: React.FC<{ onSave: (partner: Partial<Partner>) => void, onCancel: () => void }> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Partner>>({
    name: '',
    type: 'Hospital',
    location: '',
    contact: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Organization Name</label>
          <input name="name" onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-200" placeholder="e.g. City Hospital" />
        </div>
        <div>
           <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
           <select name="type" onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-200">
             <option value="Hospital">Hospital</option>
             <option value="Blood Bank">Blood Bank</option>
           </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
          <input name="location" onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-200" placeholder="e.g. Bhilai" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Contact Phone</label>
          <input name="contact" onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-200" placeholder="+91..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input name="email" onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-200" placeholder="admin@hospital.com" />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <button onClick={onCancel} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Cancel</button>
        <button onClick={() => onSave(formData)} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md shadow-blue-200">Register Partner</button>
      </div>
    </div>
  );
};

export default PartnerForm;