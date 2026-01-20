import React, { useState } from 'react';
import { ChevronLeft, Stethoscope, Droplet, MapPin, Phone, Activity, TrendingUp, AlertTriangle, ArrowRightLeft, Package, Lock, Unlock, Save } from 'lucide-react';
import { Partner } from '../../types';

const PartnerDetail: React.FC<{ 
  partner: Partner, 
  onBack: () => void, 
  onUpdateStock: (id: string, group: string, units: number) => void 
}> = ({ partner, onBack, onUpdateStock }) => {
  
  const [isEditing, setIsEditing] = useState(false);

  // Helper to calculate stock health
  const getStockColor = (units: number) => {
    if (units === 0) return 'bg-red-500';
    if (units < 10) return 'bg-orange-500';
    if (units > 50) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStockWidth = (units: number) => {
    return Math.min(100, (units / 100) * 100) + '%';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Partners
        </button>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
             <ArrowRightLeft className="w-4 h-4" /> Transfer Request
           </button>
           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm flex items-center gap-2">
             <Package className="w-4 h-4" /> Bulk Update
           </button>
        </div>
      </div>

      {/* Partner Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
             <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg ${partner.type === 'Hospital' ? 'bg-blue-600' : 'bg-red-600'}`}>
                {partner.type === 'Hospital' ? <Stethoscope className="w-8 h-8" /> : <Droplet className="w-8 h-8" />}
             </div>
             <div>
                <h2 className="text-2xl font-bold text-slate-900">{partner.name}</h2>
                <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {partner.location}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {partner.contact}</span>
                </div>
             </div>
          </div>
          <div className="flex items-center gap-8">
             <div className="text-right">
                <div className="text-sm text-slate-500 mb-1">Total Inventory</div>
                <div className="text-3xl font-bold text-slate-900">{partner.stock.reduce((a, b) => a + b.units, 0)} <span className="text-sm font-normal text-slate-400">Units</span></div>
             </div>
             <div className="text-right hidden md:block">
                <div className="text-sm text-slate-500 mb-1">Critical Groups</div>
                <div className="text-3xl font-bold text-red-600">{partner.stock.filter(s => s.status === 'Critical').length}</div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Inventory List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
             <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-slate-400" /> Live Inventory
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                    {isEditing ? 'Editing Mode Enabled. Click +/- to adjust.' : 'Read-only Mode. Unlock to adjust stock.'}
                </p>
             </div>
             
             {/* Safe Edit Mode Toggle */}
             <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm
                    ${isEditing 
                        ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200' 
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
             >
                {isEditing ? (
                    <>
                        <Save className="w-4 h-4" /> Save Changes
                    </>
                ) : (
                    <>
                        <Lock className="w-4 h-4" /> Unlock Inventory
                    </>
                )}
             </button>
          </div>
          
          <div className="divide-y divide-slate-100">
             {partner.stock.map((stock) => (
               <div key={stock.group} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-4 w-1/3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-700 border border-slate-200">
                      {stock.group}
                    </div>
                    <div>
                       <div className="font-semibold text-slate-900">{stock.group} Blood</div>
                       <div className="text-xs text-slate-500">Whole Blood / RBC</div>
                    </div>
                  </div>
                  
                  <div className="flex-1 px-4">
                     <div className="flex justify-between text-xs mb-1">
                       <span className="font-medium text-slate-600">{stock.units} Units Available</span>
                       <span className={`${stock.status === 'Critical' ? 'text-red-600 font-bold' : 'text-slate-400'}`}>{stock.status}</span>
                     </div>
                     <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${getStockColor(stock.units)}`} 
                          style={{ width: getStockWidth(stock.units) }}
                        ></div>
                     </div>
                  </div>

                  <div className="flex items-center gap-2 pl-4 min-w-[140px] justify-end">
                    {isEditing ? (
                        <>
                            <button 
                            onClick={() => onUpdateStock(partner.id, stock.group, Math.max(0, stock.units - 1))}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-all active:scale-95"
                            >
                            -
                            </button>
                            <input 
                            type="number" 
                            value={stock.units} 
                            readOnly 
                            className="w-12 text-center font-bold text-slate-900 bg-white border border-slate-200 rounded py-1 mx-1"
                            />
                            <button 
                            onClick={() => onUpdateStock(partner.id, stock.group, stock.units + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-50 border border-green-200 text-green-600 hover:bg-green-100 transition-all active:scale-95"
                            >
                            +
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-2 text-slate-400 select-none">
                            <Lock className="w-4 h-4 opacity-50" />
                            <span className="font-bold text-slate-700 text-lg w-12 text-center">{stock.units}</span>
                        </div>
                    )}
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Predictive Analytics & Insights */}
        <div className="space-y-6">
           <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-xl p-6 shadow-lg">
             <div className="flex items-center gap-2 mb-4 text-indigo-200">
                <TrendingUp className="w-5 h-5" />
                <h3 className="font-bold">AI Predictive Reorder</h3>
             </div>
             <p className="text-sm text-indigo-100 mb-6 leading-relaxed">
               Based on historical usage in {partner.location}, we predict a surge in <strong className="text-white">B+</strong> and <strong className="text-white">O+</strong> demand within 7 days.
             </p>
             <div className="space-y-3">
               <div className="bg-white/10 rounded-lg p-3 flex justify-between items-center border border-white/5">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center font-bold text-sm">B+</div>
                   <div className="text-sm">
                     <div className="font-medium">Recommended</div>
                     <div className="text-xs text-indigo-300">+15 Units</div>
                   </div>
                 </div>
                 <button 
                   onClick={() => isEditing && onUpdateStock(partner.id, 'B+', (partner.stock.find(s=>s.group==='B+')?.units || 0) + 15)}
                   disabled={!isEditing}
                   className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${isEditing ? 'bg-indigo-500 hover:bg-indigo-400' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}
                 >
                   {isEditing ? 'Restock' : 'Unlock to Add'}
                 </button>
               </div>
               <div className="bg-white/10 rounded-lg p-3 flex justify-between items-center border border-white/5">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center font-bold text-sm">O+</div>
                   <div className="text-sm">
                     <div className="font-medium">Recommended</div>
                     <div className="text-xs text-indigo-300">+20 Units</div>
                   </div>
                 </div>
                 <button 
                    onClick={() => isEditing && onUpdateStock(partner.id, 'O+', (partner.stock.find(s=>s.group==='O+')?.units || 0) + 20)}
                    disabled={!isEditing}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${isEditing ? 'bg-indigo-500 hover:bg-indigo-400' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}
                  >
                   {isEditing ? 'Restock' : 'Unlock to Add'}
                 </button>
               </div>
             </div>
           </div>

           <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
             <div className="flex items-start gap-3">
               <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
               <div>
                 <h4 className="text-sm font-bold text-orange-800 mb-1">Expiration Risk Alert</h4>
                 <p className="text-xs text-orange-700">
                   3 units of AB- Platelets are nearing expiration (24h remaining). Consider prioritizing transfer to City Trauma Center.
                 </p>
                 <button className="mt-3 text-xs font-bold text-orange-800 underline">Initiate Transfer</button>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetail;