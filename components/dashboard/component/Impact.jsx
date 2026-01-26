import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import { AlertTriangle, ArrowRight, Heart, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Impact() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <NavBar />
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
      <Footer />
    </div>

  );
}
