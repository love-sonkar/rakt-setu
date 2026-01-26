import { ArrowRight, Heart } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <NavLink to="/" className="flex items-center gap-2">
                        <div className="bg-red-600 p-2 rounded-lg">
                            <Heart className="w-6 h-6 text-white fill-current" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">RaktSetu<span className="text-red-600">Connect</span></span>
                    </NavLink>
                    <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
                        <NavLink to="/" className="hover:text-red-600 transition-colors">Mission</NavLink>
                        <NavLink to="/crisis" className="hover:text-red-600 transition-colors">The Crisis</NavLink>
                        <NavLink to="/solution" className="hover:text-red-600 transition-colors">Solution</NavLink>
                        <NavLink to="/impact" className="hover:text-red-600 transition-colors">Impact</NavLink>
                    </div>
                    <div className="flex items-center gap-3">
                        <NavLink to="/userrequest"
                            className="hidden sm:flex bg-white text-red-600 border border-red-200 px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-50 transition-all flex items-center gap-2"
                        >
                            Need Blood?
                        </NavLink>
                        <NavLink to="/dashboard"
                            className="bg-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition-all shadow-lg shadow-red-200 flex items-center gap-2"
                        >
                            Admin Dashboard <ArrowRight className="w-4 h-4" />
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default NavBar;