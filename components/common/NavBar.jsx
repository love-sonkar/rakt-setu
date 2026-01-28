import { ArrowRight, Heart, Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    const [open, setOpen] = useState(false)

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center gap-2">
                        <div className="bg-red-600 p-2 rounded-lg">
                            <Heart className="w-6 h-6 text-white fill-current" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">
                            RaktSetu<span className="text-red-600">Connect</span>
                        </span>
                    </NavLink>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
                        <NavLink to="/" className="hover:text-red-600">Mission</NavLink>
                        <NavLink to="/crisis" className="hover:text-red-600">The Crisis</NavLink>
                        <NavLink to="/solution" className="hover:text-red-600">Solution</NavLink>
                        <NavLink to="/impact" className="hover:text-red-600">Impact</NavLink>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <NavLink
                            to="/userrequest"
                            className="bg-white text-red-600 border border-red-200 px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-50"
                        >
                            Need Blood?
                        </NavLink>
                        <NavLink
                            to="/dashboard"
                            className="bg-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-700 shadow-lg shadow-red-200 flex items-center gap-2"
                        >
                            Admin Dashboard <ArrowRight className="w-4 h-4" />
                        </NavLink>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {open && (
                <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-4">
                    <NavLink onClick={() => setOpen(false)} to="/" className="block text-slate-700 hover:text-red-600">
                        Mission
                    </NavLink>
                    <NavLink onClick={() => setOpen(false)} to="/crisis" className="block text-slate-700 hover:text-red-600">
                        The Crisis
                    </NavLink>
                    <NavLink onClick={() => setOpen(false)} to="/solution" className="block text-slate-700 hover:text-red-600">
                        Solution
                    </NavLink>
                    <NavLink onClick={() => setOpen(false)} to="/impact" className="block text-slate-700 hover:text-red-600">
                        Impact
                    </NavLink>

                    <NavLink
                        onClick={() => setOpen(false)}
                        to="/userrequest"
                        className="block text-center bg-red-50 text-red-600 px-4 py-2 rounded-full font-semibold"
                    >
                        Need Blood?
                    </NavLink>

                    <NavLink
                        onClick={() => setOpen(false)}
                        to="/dashboard"
                        className="block text-center bg-red-600 text-white px-4 py-2 rounded-full font-semibold"
                    >
                        Admin Dashboard
                    </NavLink>
                </div>
            )}
        </nav>
    )
}

export default NavBar
