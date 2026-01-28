import { ChevronLeft, Heart } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const PageNav = () => {
    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <NavLink to='/' className="flex items-center gap-2 cursor-pointer" >
                        <div className="bg-red-600 p-2 rounded-lg">
                            <Heart className="w-5 h-5 text-white fill-current" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">RaktSetu<span className="text-red-600">Community</span></span>
                    </NavLink>
                    <NavLink to='/'
                        className="md:block hidden text-slate-600 hover:text-red-600 font-medium flex items-center gap-1 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" /> Back to Home
                    </NavLink>
                    <NavLink to='/'
                        className="text-slate-600 hover:text-red-600 font-medium flex items-center gap-1 transition-colors">
                        <ChevronLeft className="w-6 h-6" />
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default PageNav