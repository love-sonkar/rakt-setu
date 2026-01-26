import { Heart } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
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
    )
}

export default Footer