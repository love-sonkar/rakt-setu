import { Outlet } from "react-router-dom";

export default function Wrapper() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
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
                            <NavLink to="/crisis" className="hover:text-red-600 transition-colors">The Crisis</NavLink>
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
            <Outlet />
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
}