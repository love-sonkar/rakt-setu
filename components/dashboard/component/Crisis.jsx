import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import { AlertTriangle, ShieldCheck, TrendingUp, Users } from "lucide-react";


export default function Crisis() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <NavBar />
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
            <Footer />
        </div>

    );

}