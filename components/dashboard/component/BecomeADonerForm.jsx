import { Calendar, Mail, MapPin, Phone, Star, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom';

const BecomeADonerForm = () => {

    // Registration Form State
    const [regForm, setRegForm] = useState({
        name: '',
        bloodGroup: 'O+',
        phone: '',
        email: '',
        location: '',
    });
    const [isRegistered, setIsRegistered] = useState(false);


    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        console.log('Registering Donor:', regForm);
        setIsRegistered(true);
        setRegForm({ name: '', bloodGroup: 'O+', phone: '', email: '', location: '' });
    };


    return (
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
                <div className="bg-red-600 p-8 text-center text-white">
                    <UserPlus className="w-12 h-12 mx-auto mb-4 bg-red-500 p-2 rounded-xl" />
                    <h2 className="text-3xl font-bold">Become a Doner</h2>
                    <p className="text-red-100 mt-2">Register as a voluntary donor and save lives in your district.</p>
                </div>

                <div className="p-8 md:p-10">
                    {isRegistered ? (
                        <div className="text-center py-10">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Star className="w-10 h-10 text-green-600 fill-current animate-pulse" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Welcome to the Family!</h3>
                            <p className="text-slate-600 mb-8 max-w-md mx-auto">
                                You have successfully registered. Your digital donor card has been generated.
                                You will receive SMS alerts for urgent needs in <strong>{regForm.location || 'your area'}</strong>.
                            </p>
                            <NavLink
                                to="/testimonial"
                                className="text-red-600 font-bold hover:underline"
                            >
                                Browse Community Stories
                            </NavLink>
                        </div>
                    ) : (
                        <form onSubmit={handleRegisterSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={regForm.name}
                                        onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all"
                                        placeholder="As per ID proof"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Blood Group</label>
                                    <select
                                        value={regForm.bloodGroup}
                                        onChange={(e) => setRegForm({ ...regForm, bloodGroup: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none bg-white"
                                    >
                                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                                            <option key={bg} value={bg}>{bg}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-1">
                                        <MapPin className="w-4 h-4 text-slate-400" /> Location / District
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={regForm.location}
                                        onChange={(e) => setRegForm({ ...regForm, location: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all"
                                        placeholder="e.g. Raipur"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-1">
                                        <Phone className="w-4 h-4 text-slate-400" /> Mobile Number
                                    </label>
                                    <input
                                        required
                                        type="tel"
                                        value={regForm.phone}
                                        onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all"
                                        placeholder="+91..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-1">
                                        <Mail className="w-4 h-4 text-slate-400" /> Email Address
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        value={regForm.email}
                                        onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-1">
                                    <Calendar className="w-4 h-4 text-slate-400" /> Last Donation Date
                                </label>
                                <input
                                    required
                                    type="date"
                                    value={regForm.lastDonationDate}
                                    onChange={(e) => setRegForm({ ...regForm, lastDonationDate: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl text-sm text-blue-800">
                                <input type="checkbox" required className="mt-1" />
                                <p className="ml-2 text-1xl">I confirm voluntary non-renemouresat blood donation & <br></br> Consent to contact as per NBIC/NACO Guidlines.</p>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
                            >
                                Register Now
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BecomeADonerForm