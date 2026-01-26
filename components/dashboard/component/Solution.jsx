import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import { Activity, Smartphone, Users } from "lucide-react";

export default function Solution() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <NavBar />
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


            <Footer />
        </div>
    );
}