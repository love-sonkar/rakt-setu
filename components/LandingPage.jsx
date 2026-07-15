import React, { useState } from 'react';
import { Users, ShieldCheck, Droplet, HeartPulse, UserCheck, HouseIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import NavBar from './common/NavBar';
import Footer from './common/Footer';
import ActionSelectionModal from './dashboard/component/ActionSelectionModal';


const LandingPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <NavBar />
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-br from-slate-50 to-red-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white border border-red-100 px-4 py-1.5 rounded-full text-red-600 text-sm font-medium mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Digital Health & Public Health Innovation
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
              Where Every Drop <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">Finds Its Way.</span>
            </h1>
            <p className=" text-base md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Transforming Chhattisgarh's blood transfusion system from a fragmented network into a proactive, intelligent ecosystem. No life should be lost for want of blood.
            </p>
            <div className="flex w-full flex-col sm:flex-row gap-4 justify-center items-center">
              <NavLink to='/userrequest'
                className="w-full sm:w-auto px-16 py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-200 flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                Request Blood Now <Droplet className="w-5 h-5 fill-current" />
              </NavLink>
            </div>
            <div className="mt-4 text-sm text-slate-400">
              <div className="mb-2 flex sm:flex-row flex-col gap-3 justify-center">

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold md:text-lg text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  Donate

                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-red-600 group-hover:bg-red-100">
                    <HeartPulse className="w-5 h-5 fill-current" />
                  </span>
                </button>
                <NavLink to='/bloodbankservice'

                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold md:text-lg text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  Blood Center Service
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-red-600 group-hover:bg-red-100">
                    <HouseIcon className="w-5 h-5 fill-current" />
                  </span>
                </NavLink>
              </div>
              <div className="mb-2 flex sm:flex-row flex-col gap-3 justify-center">

                <NavLink to='/donersignup'
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold md:text-lg text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  Blood Doners New
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 text-rose-600 group-hover:bg-rose-100">
                    <Users className="w-5 h-5" />
                  </span>
                </NavLink>
                <NavLink to='/testimonial'
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold md:text-lg text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  Benificiery
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 text-rose-600 group-hover:bg-rose-100">

                    <UserCheck className="w-5 h-5" />
                  </span>
                </NavLink >
                <NavLink to='/dashboard'
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold md:text-lg text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  Admin
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 text-rose-600 group-hover:bg-rose-100">

                    <ShieldCheck className="w-5 h-5" />
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* Abstract Background Decoration */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[800px] h-[800px] bg-red-100/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-rose-100/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      </section>

      {isModalOpen && (
        <ActionSelectionModal
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;