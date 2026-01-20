import React from 'react';
import { Heart, Activity, Users, ArrowRight, ShieldCheck, TrendingUp, AlertTriangle, Smartphone, Droplet } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
  onRequestBlood: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, onRequestBlood }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-red-600 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">RaktSetu<span className="text-red-600">Connect</span></span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
              <a href="#mission" className="hover:text-red-600 transition-colors">Mission</a>
              <a href="#problem" className="hover:text-red-600 transition-colors">The Crisis</a>
              <a href="#solution" className="hover:text-red-600 transition-colors">Solution</a>
              <a href="#impact" className="hover:text-red-600 transition-colors">Impact</a>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onRequestBlood}
                className="hidden sm:flex bg-white text-red-600 border border-red-200 px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-50 transition-all flex items-center gap-2"
              >
                Need Blood?
              </button>
              <button
                onClick={onEnterApp}
                className="bg-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition-all shadow-lg shadow-red-200 flex items-center gap-2"
              >
                Admin Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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
              Where Every Drop <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">Finds Its Way.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Transforming Chhattisgarh's blood transfusion system from a fragmented network into a proactive, intelligent ecosystem. No life should be lost for want of blood.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onRequestBlood}
                className="w-full sm:w-auto px-8 py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-200 flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                Request Blood Now <Droplet className="w-5 h-5 fill-current" />
              </button>
              <button 
                onClick={onEnterApp}
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                Admin Login <Activity className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Decoration */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[800px] h-[800px] bg-red-100/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-rose-100/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">The Blood Crisis in Chhattisgarh</h2>
            <p className="mt-4 text-lg text-slate-600">Critical challenges creating a 15-20% annual deficit.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Supply Imbalance</h3>
              <p className="text-slate-600 text-sm">Urban surplus coexists with critical shortages in tribal districts like Bastar and Dantewada.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Weak Donor Base</h3>
              <p className="text-slate-600 text-sm">Only 55% voluntary donations vs 70% national average. Retention rates below 20%.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Inequitable Access</h3>
              <p className="text-slate-600 text-sm">Rural areas face 3-5 hour emergency response delays. Poor PHC/CHC linkage.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">System Limits</h3>
              <p className="text-slate-600 text-sm">Fragmented operations, reactive social appeals, and lack of proactive forecasting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 font-medium text-sm mb-6">
                The RaktSetu Solution
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">An Intelligent Digital Ecosystem</h2>
              <p className="text-slate-400 text-lg mb-8">
                Moving from reactive emergency responses to proactive shortage prediction using AI and community power.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Predictive Analytics</h4>
                    <p className="text-slate-400">Analysis of historical data to forecast shortages and automate seasonal demand alerts.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Zero-Cost Access</h4>
                    <p className="text-slate-400">SMS-based interfaces for rural connectivity and a multi-language mobile app.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Gamified Community</h4>
                    <p className="text-slate-400">Recognition systems to boost donor retention from 20% to 60%.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Abstract Visual representation of the app */}
              <div className="relative z-10 bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-2xl">
                <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
                  <div className="space-y-1">
                    <div className="h-2 w-24 bg-slate-600 rounded"></div>
                    <div className="h-2 w-16 bg-slate-700 rounded"></div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-red-500"></div>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-red-300 font-medium">Critical Shortage Alert</span>
                      <span className="text-xs text-slate-400">Just now</span>
                    </div>
                    <p className="text-sm text-slate-300">Bastar District requires 15 units of O+ immediately.</p>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-green-300 font-medium">Donor Match Found</span>
                      <span className="text-xs text-slate-400">2 mins ago</span>
                    </div>
                    <p className="text-sm text-slate-300">3 volunteers located within 5km radius.</p>
                  </div>
                  <div className="h-32 bg-slate-700/30 rounded-xl flex items-end justify-between px-4 pb-4 gap-2">
                    <div className="w-full bg-red-900/40 h-1/3 rounded-t"></div>
                    <div className="w-full bg-red-800/60 h-1/2 rounded-t"></div>
                    <div className="w-full bg-red-600 h-3/4 rounded-t relative group">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Optimal</div>
                    </div>
                    <div className="w-full bg-red-800/60 h-2/3 rounded-t"></div>
                    <div className="w-full bg-red-900/40 h-1/4 rounded-t"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-16">First Year Targets</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">40%</div>
              <p className="text-red-100 text-sm">Reduced Response Time in Rural Areas</p>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">25%</div>
              <p className="text-red-100 text-sm">Decrease in Blood Wastage</p>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">60%</div>
              <p className="text-red-100 text-sm">Target Donor Retention Rate</p>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">10k+</div>
              <p className="text-red-100 text-sm">Successful Donor-Patient Matches</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
             <Heart className="w-5 h-5 text-red-600 fill-current" />
             <span className="font-bold text-white">RaktSetu Connect</span>
          </div>
          <div className="text-sm">
            © 2024 RaktSetu Initiative. Built for public good.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;