import React, { useState } from 'react';
import { 
  X, Award, MapPin, Save, Edit2, Users, Mail, Phone, MessageCircle, Bell, Activity, Clock, Plus, Trash2, Trophy 
} from 'lucide-react';
import { Donor, DonationRecord } from '../../types';

const DonorProfileModal: React.FC<{ 
  donor: Donor; 
  onClose: () => void;
  onUpdate: (donor: Donor) => void;
}> = ({ donor, onClose, onUpdate }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    name: donor.name,
    email: donor.email,
    phone: donor.phone,
    location: donor.location
  });

  // History CRUD State
  const [isHistoryFormOpen, setIsHistoryFormOpen] = useState(false);
  const [historyFormData, setHistoryFormData] = useState<Partial<DonationRecord>>({});

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    onUpdate({
      ...donor,
      ...profileFormData
    });
    setIsEditingProfile(false);
  };

  const toggleNotifications = () => {
    onUpdate({
      ...donor,
      notificationsEnabled: !donor.notificationsEnabled
    });
  };

  const handleAddHistoryClick = () => {
    setHistoryFormData({
      date: new Date().toISOString().split('T')[0],
      location: '',
      campaign: '',
      type: 'Whole Blood',
      units: 1
    });
    setIsHistoryFormOpen(true);
  };

  const handleEditHistoryClick = (record: DonationRecord) => {
    setHistoryFormData({ ...record });
    setIsHistoryFormOpen(true);
  };

  const handleDeleteHistory = (recordId: string) => {
    if (window.confirm('Are you sure you want to delete this donation record? This action cannot be undone.')) {
        const updatedHistory = donor.history.filter(record => record.id !== recordId);
        const newTotal = updatedHistory.reduce((acc, curr) => acc + curr.units, 0);
        onUpdate({ ...donor, history: updatedHistory, totalDonations: newTotal });
    }
  };

  const handleSaveHistory = () => {
    if (!historyFormData.date || !historyFormData.location || !historyFormData.units) {
      alert("Please fill in all required fields");
      return; 
    }

    let updatedHistory = [...donor.history];
    
    if (historyFormData.id) {
      // Update existing record
      updatedHistory = updatedHistory.map(item => 
        item.id === historyFormData.id ? { ...item, ...historyFormData } as DonationRecord : item
      );
    } else {
      // Create new record
      const newRecord: DonationRecord = {
        id: `h-${Date.now()}`,
        date: historyFormData.date || '',
        location: historyFormData.location || '',
        campaign: historyFormData.campaign,
        type: historyFormData.type as any || 'Whole Blood',
        units: Number(historyFormData.units) || 1
      };
      updatedHistory = [newRecord, ...updatedHistory];
    }

    const newTotalDonations = updatedHistory.length; 
    
    onUpdate({ 
      ...donor, 
      history: updatedHistory,
      totalDonations: newTotalDonations
    });
    setIsHistoryFormOpen(false);
  };

  const handleHistoryInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHistoryFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsApp = () => {
    if (!profileFormData.phone) return;
    const cleanNumber = profileFormData.phone.replace(/[^0-9]/g, '');
    const message = `Hello ${profileFormData.name}, this is RaktSetu Connect. We have an urgent need for ${donor.bloodGroup} blood in your area. Can you help?`;
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl bg-slate-50 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 z-10">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            Donor Profile
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-normal border border-slate-200">#{donor.id}</span>
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Top Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-2xl border-2 border-slate-200">
                  {profileFormData.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    {profileFormData.name}
                    {isEditingProfile && <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Editing</span>}
                  </h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full border border-yellow-200 flex items-center gap-1">
                      <Award className="w-3 h-3" /> {donor.badge}
                    </span>
                    <span className="text-slate-500 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {profileFormData.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right mr-4">
                    <div className="text-sm text-slate-500">Total Impact</div>
                    <div className="text-2xl font-bold text-red-600">{donor.points} <span className="text-sm font-normal text-slate-400">Pts</span></div>
                </div>
                {isEditingProfile ? (
                  <button 
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                  >
                    <Save className="w-4 h-4" /> Save
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsEditingProfile(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" /> Edit Profile
                  </button>
                )}
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-red-50 rounded-full blur-3xl opacity-60"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Column 1: Personal & Contact */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-400" /> Contact Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Email Address</label>
                    {isEditingProfile ? (
                      <input 
                        type="email" 
                        name="email" 
                        value={profileFormData.email} 
                        onChange={handleProfileInputChange} 
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-200 outline-none"
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-slate-700">
                        <Mail className="w-4 h-4 text-slate-400" /> {profileFormData.email}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Phone Number</label>
                    {isEditingProfile ? (
                      <input 
                        type="tel" 
                        name="phone" 
                        value={profileFormData.phone} 
                        onChange={handleProfileInputChange} 
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-200 outline-none"
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-slate-700">
                        <Phone className="w-4 h-4 text-slate-400" /> {profileFormData.phone}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Location</label>
                    {isEditingProfile ? (
                      <input 
                        type="text" 
                        name="location" 
                        value={profileFormData.location} 
                        onChange={handleProfileInputChange} 
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-200 outline-none"
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-slate-700">
                        <MapPin className="w-4 h-4 text-slate-400" /> {profileFormData.location}
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={handleWhatsApp}
                    className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-lg shadow-green-100 font-medium"
                  >
                    <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                  </button>
                </div>
              </div>

              {/* Preferences Card */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-slate-400" /> Preferences
                </h3>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div>
                    <div className="text-sm font-semibold text-slate-800">Emergency Alerts</div>
                    <div className="text-xs text-slate-500">Receive notifications for critical shortages nearby.</div>
                  </div>
                  <button 
                    onClick={toggleNotifications}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${donor.notificationsEnabled ? 'bg-red-600' : 'bg-slate-200'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${donor.notificationsEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-slate-400" /> Medical Profile
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-100 text-center">
                    <div className="text-xs text-red-600 font-medium uppercase">Blood Group</div>
                    <div className="text-2xl font-bold text-red-800">{donor.bloodGroup}</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
                    <div className="text-xs text-slate-500 font-medium uppercase">Total Donations</div>
                    <div className="text-2xl font-bold text-slate-800">{donor.totalDonations}</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">Last Donation</span>
                    <span className="text-sm font-medium text-slate-900">{donor.lastDonation}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Next Eligible</span>
                    <span className="text-sm font-medium text-green-600">{donor.nextEligibleDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2 & 3: History */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-slate-400" /> Donation History
                  </h3>
                  {!isHistoryFormOpen && (
                    <button 
                      onClick={handleAddHistoryClick}
                      className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 font-medium transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Record
                    </button>
                  )}
                </div>
                
                {isHistoryFormOpen ? (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 animate-in fade-in slide-in-from-top-2">
                     <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
                        <h4 className="font-semibold text-slate-800">{historyFormData.id ? 'Edit Donation Record' : 'Add New Donation'}</h4>
                        <button onClick={() => setIsHistoryFormOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Date</label>
                          <input 
                            type="date"
                            name="date"
                            value={historyFormData.date || ''}
                            onChange={handleHistoryInputChange}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Type</label>
                          <select 
                            name="type"
                            value={historyFormData.type || 'Whole Blood'}
                            onChange={handleHistoryInputChange}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-200 outline-none"
                          >
                             <option value="Whole Blood">Whole Blood</option>
                             <option value="Platelets">Platelets</option>
                             <option value="Plasma">Plasma</option>
                          </select>
                        </div>
                        <div>
                           <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Location / Blood Bank</label>
                           <input 
                            type="text"
                            name="location"
                            placeholder="e.g. District Hospital"
                            value={historyFormData.location || ''}
                            onChange={handleHistoryInputChange}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-200 outline-none"
                          />
                        </div>
                        <div>
                           <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Campaign (Optional)</label>
                           <input 
                            type="text"
                            name="campaign"
                            placeholder="e.g. Annual Drive"
                            value={historyFormData.campaign || ''}
                            onChange={handleHistoryInputChange}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-200 outline-none"
                          />
                        </div>
                        <div>
                           <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Units</label>
                           <input 
                            type="number"
                            name="units"
                            min="1"
                            value={historyFormData.units || 1}
                            onChange={handleHistoryInputChange}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-200 outline-none"
                          />
                        </div>
                     </div>
                     <div className="flex justify-end gap-2 mt-4">
                        <button onClick={() => setIsHistoryFormOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg text-sm">Cancel</button>
                        <button onClick={handleSaveHistory} className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm shadow-sm">Save Record</button>
                     </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                        <tr>
                          <th className="px-4 py-3 rounded-l-lg">Date</th>
                          <th className="px-4 py-3">Location / Blood Bank</th>
                          <th className="px-4 py-3">Campaign</th>
                          <th className="px-4 py-3">Type</th>
                          <th className="px-4 py-3 text-right">Units</th>
                          <th className="px-4 py-3 rounded-r-lg w-24 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {donor.history.map((record) => (
                          <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 font-medium text-slate-900">{record.date}</td>
                            <td className="px-4 py-3 text-slate-600">{record.location}</td>
                            <td className="px-4 py-3 text-slate-600">
                              {record.campaign ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                                  {record.campaign}
                                </span>
                              ) : (
                                <span className="text-slate-400">-</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-slate-600">
                              <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium border border-slate-200">
                                {record.type}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right font-medium text-slate-900">{record.units}</td>
                            <td className="px-4 py-3 text-right flex justify-end gap-1">
                              <button 
                                onClick={() => handleEditHistoryClick(record)}
                                className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 p-1.5 rounded transition-colors"
                                title="Edit Record"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteHistory(record.id)}
                                className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors"
                                title="Delete Record"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {donor.history.length === 0 && (
                          <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-slate-400 italic">
                              No donation history found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              
              {/* Gamification Stats */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-400" /> Badges & Achievements
                    </h3>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded text-slate-300">View All</span>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {/* Current Badge */}
                  <div className="min-w-[100px] bg-white/10 rounded-lg p-3 border border-white/10 flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 mb-2">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-bold">{donor.badge}</div>
                    <div className="text-[10px] text-slate-400 mt-1">Current Status</div>
                  </div>
                  
                  {/* Locked Badge */}
                  <div className="min-w-[100px] bg-white/5 rounded-lg p-3 border border-white/5 flex flex-col items-center text-center opacity-60 grayscale">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-500 mb-2">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-bold">Champion</div>
                    <div className="text-[10px] text-slate-400 mt-1">1500 Pts</div>
                  </div>
                  
                    {/* Locked Badge */}
                  <div className="min-w-[100px] bg-white/5 rounded-lg p-3 border border-white/5 flex flex-col items-center text-center opacity-60 grayscale">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-500 mb-2">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-bold">Community</div>
                    <div className="text-[10px] text-slate-400 mt-1">5 Referrals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DonorProfileModal;