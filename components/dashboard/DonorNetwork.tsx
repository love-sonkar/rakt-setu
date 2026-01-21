import React, { useState } from 'react';
import { Plus, Search, Trophy, MapPin, List, Map, ChevronLeft } from 'lucide-react';
import { Donor } from '../../types';
import DonorForm from './DonorForm';
import DonorProfileModal from './DonorProfileModal';
import MapView from '../common/MapView';

interface DonorNetworkProps {
  donors: Donor[];
  onUpdateDonors: (donors: Donor[]) => void;
}

const DonorNetwork: React.FC<DonorNetworkProps> = ({ donors, onUpdateDonors }) => {
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [isAddingDonor, setIsAddingDonor] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

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
    if (selectedDonor && selectedDonor.id === updatedDonor.id) {
        setSelectedDonor(updatedDonor);
    }
  };

  if (isAddingDonor) {
    return (
        <div className="max-w-2xl mx-auto animate-in fade-in duration-300">
           <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold text-slate-900">Register New Donor</h2>
                <button onClick={() => setIsAddingDonor(false)} className="text-slate-400 hover:text-slate-600"><ChevronLeft className="w-5 h-5" /></button>
              </div>
              <DonorForm onSave={handleAddDonor} onCancel={() => setIsAddingDonor(false)} />
           </div>
        </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
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
                  onClick={() => setSelectedDonor(donor)}
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
          onClose={() => setSelectedDonor(null)}
          onUpdate={handleUpdateDonor}
        />
      )}
    </div>
  );
};

export default DonorNetwork;