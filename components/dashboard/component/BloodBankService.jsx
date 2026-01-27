import React, { useState } from 'react';
import { ChevronLeft, MapPin, Navigation, Droplet, Search, AlertCircle, UserPlus, X } from 'lucide-react';
import PageNav from '@/components/common/PageNav';
import Footer from '@/components/common/Footer';


const BloodBankService = () => {
    const [formData, setFormData] = useState({
        bloodGroup: 'All',
        component: 'Whole Blood',
        useCurrentLocation: false,
        state: '',
        district: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        setFormData(prev => ({ ...prev, useCurrentLocation: e.target.checked }));
        if (e.target.checked) {
            // Simulate geolocation fill
            setFormData(prev => ({ ...prev, state: 'Chhattisgarh', district: 'Raipur', useCurrentLocation: true }));
        } else {
            setFormData(prev => ({ ...prev, state: '', district: '', useCurrentLocation: false }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Searching for ${formData.component} (${formData.bloodGroup}) in ${formData.district}, ${formData.state}...`);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
            {/* Header */}
            <PageNav />

            <div className="flex-1 p-6 max-w-lg mx-auto w-full">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="h-2 bg-red-600"></div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">

                        {/* Blood Group */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Blood Group</label>
                            <div className="relative">
                                <select
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                    className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-red-500 focus:border-red-500 block w-full p-3 font-medium outline-none"
                                >
                                    <option value="All">All</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                                <Droplet className="absolute right-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" />
                            </div>
                            <div className="h-[1px] bg-slate-200 mt-2"></div>
                        </div>

                        {/* Blood Component */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Blood Component</label>
                            <div className="relative">
                                <select
                                    name="component"
                                    value={formData.component}
                                    onChange={handleChange}
                                    className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-red-500 focus:border-red-500 block w-full p-3 font-medium outline-none"
                                >
                                    <option value="Whole Blood">Whole Blood</option>
                                    <option value="Single Donor Platelet">Single Donor Platelet</option>
                                    <option value="Single Donor Plasma">Single Donor Plasma</option>
                                    <option value="Packed Red Blood Cells">Packed Red Blood Cells</option>
                                </select>
                                <Search className="absolute right-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" />
                            </div>
                            <div className="h-[1px] bg-slate-200 mt-2"></div>
                        </div>

                        {/* Location Checkbox */}
                        <div className="flex items-center">
                            <input
                                id="current-location"
                                type="checkbox"
                                checked={formData.useCurrentLocation}
                                onChange={handleCheckboxChange}
                                className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                            />
                            <label htmlFor="current-location" className="ml-3 text-sm font-medium text-slate-700 cursor-pointer select-none">
                                Use My Current Location
                            </label>
                        </div>

                        {/* State */}
                        <div className="space-y-2 relative">
                            <label className="text-sm font-semibold text-slate-700">State</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="Select State"
                                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-red-500 focus:border-red-500 block p-3 outline-none"
                            />
                            <MapPin className="absolute right-3 bottom-3 w-5 h-5 text-slate-400" />
                            <div className="h-[1px] bg-slate-200 absolute -bottom-3 left-0 right-0"></div>
                        </div>

                        {/* District */}
                        <div className="space-y-2 relative pt-2">
                            <label className="text-sm font-semibold text-slate-700">District</label>
                            <input
                                type="text"
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                placeholder="Select District"
                                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-red-500 focus:border-red-500 block p-3 outline-none"
                            />
                            <MapPin className="absolute right-3 bottom-3 w-5 h-5 text-slate-400" />
                            <div className="h-[1px] bg-slate-200 absolute -bottom-3 left-0 right-0"></div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full bg-red-800 hover:bg-red-900 text-white font-bold py-3.5 px-4 rounded-full shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>

                {/* Info Text */}
                <p className="text-center text-xs text-slate-400 mt-6">
                    Access real-time inventory from 50+ connected blood banks.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default BloodBankService;