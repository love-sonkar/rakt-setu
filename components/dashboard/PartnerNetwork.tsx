import React, { useState } from 'react';
import { Plus, ChevronLeft, Stethoscope, Droplet, MapPin } from 'lucide-react';
import { Partner } from '../../types';
import PartnerForm from './PartnerForm';
import PartnerDetail from './PartnerDetail';

interface PartnerNetworkProps {
  partners: Partner[];
  setPartners: React.Dispatch<React.SetStateAction<Partner[]>>;
}

const PartnerNetwork: React.FC<PartnerNetworkProps> = ({ partners, setPartners }) => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isAddingPartner, setIsAddingPartner] = useState(false);

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

  if (isAddingPartner) {
    return (
        <div className="max-w-2xl mx-auto animate-in fade-in duration-300">
           <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold text-slate-900">Register Network Partner</h2>
                <button onClick={() => setIsAddingPartner(false)} className="text-slate-400 hover:text-slate-600"><ChevronLeft className="w-5 h-5" /></button>
              </div>
              <PartnerForm onSave={handleAddPartner} onCancel={() => setIsAddingPartner(false)} />
           </div>
        </div>
    );
  }

  if (selectedPartner) {
    return (
        <PartnerDetail 
          partner={selectedPartner} 
          onBack={() => setSelectedPartner(null)} 
          onUpdateStock={handlePartnerStockUpdate}
        />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
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
    </div>
  );
};

export default PartnerNetwork;