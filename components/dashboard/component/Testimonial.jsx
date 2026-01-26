import React, { useState } from 'react';
import {
    Play,
    Quote,
    Star,
    UserPlus,
    Heart,
    MapPin,
    Phone,
    Mail,
    Send,
    Video,
    MessageCircle,
    BookOpen,
    Camera,
    Calendar,
    ArrowRight
} from 'lucide-react';
import Footer from '@/components/common/Footer';
import PageNav from '@/components/common/PageNav';

const blogPosts = [
    {
        id: 1,
        title: "Understanding Rare Blood Types: Why Every Drop Matters",
        category: "Medical Science",
        date: "Oct 12, 2023",
        excerpt: "Did you know that less than 1% of the Indian population has AB- blood? Learn about the Bombay Blood Group and other rare types that keep our hematologists awake at night.",
        image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Nutrition Guide: What to Eat Before & After Donation",
        category: "Health & Wellness",
        date: "Sep 28, 2023",
        excerpt: "Iron-rich foods are your best friends. Here is a simple diet plan including spinach, jaggery, and dates to ensure you recover your energy levels within hours of donating.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Youth for Change: How Colleges are Leading the Way",
        category: "Community Spotlight",
        date: "Aug 15, 2023",
        excerpt: "We spotlight the NSS unit of Bilaspur University, which broke the state record by collecting 1,200 units in a single day. Read their inspiring organizing strategy.",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];


const Testimonial = () => {

    // Feedback Form State
    const [feedback, setFeedback] = useState('');
    const [feedbackSent, setFeedbackSent] = useState(false);


    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        setFeedbackSent(true);
        setFeedback('');
        setTimeout(() => setFeedbackSent(false), 3000);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Navigation Header */}
            <PageNav />

            {/* Hero Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* === STORIES TAB === */}

                <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* Video Section */}
                    <section>
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-slate-900">Voices of Life</h2>
                            <p className="mt-2 text-slate-600">Real stories from real heroes and survivors in Chhattisgarh.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Video Card 1 */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 group cursor-pointer">
                                <div className="relative h-64 bg-slate-800 flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                                    {/* Placeholder for video thumbnail */}
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-700"></div>
                                    <div className="relative z-20 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
                                        <Play className="w-6 h-6 text-white ml-1 fill-current" />
                                    </div>
                                    <span className="absolute bottom-4 right-4 z-20 bg-black/70 text-white text-xs px-2 py-1 rounded">03:45</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Ramesh's Fight in Bastar</h3>
                                    <p className="text-slate-600 text-sm line-clamp-2">
                                        How the RaktSetu network coordinated a rare AB- blood delivery to a remote village in Bastar within 2 hours.
                                    </p>
                                </div>
                            </div>

                            {/* Video Card 2 */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 group cursor-pointer">
                                <div className="relative h-64 bg-slate-800 flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-700"></div>
                                    <div className="relative z-20 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
                                        <Play className="w-6 h-6 text-white ml-1 fill-current" />
                                    </div>
                                    <span className="absolute bottom-4 right-4 z-20 bg-black/70 text-white text-xs px-2 py-1 rounded">02:15</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">The 100th Donation</h3>
                                    <p className="text-slate-600 text-sm line-clamp-2">
                                        Meet Priya, a college student from Raipur who just completed her milestone 10th donation camp organization.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Gallery Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-red-100 p-2 rounded-lg">
                                <Camera className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">Moments of Hope</h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-auto md:h-96">
                            {/* Feature Image */}
                            <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group">
                                <img
                                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                    alt="Mega Camp"
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                                    <p className="text-white font-bold text-lg">Mega Camp at Raipur Stadium</p>
                                    <p className="text-white/80 text-sm">Over 500 volunteers participated.</p>
                                </div>
                            </div>

                            {/* Grid Images */}
                            <div className="relative rounded-2xl overflow-hidden group h-40 md:h-auto">
                                <img src="https://images.pexels.com/photos/12193090/pexels-photo-12193090.jpeg" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" alt="Blood Bags" />
                            </div>
                            <div className="relative rounded-2xl overflow-hidden group h-40 md:h-auto">
                                <img src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" alt="Laboratory" />
                            </div>
                            <div className="relative rounded-2xl overflow-hidden group h-40 md:h-auto">
                                <img src="https://images.pexels.com/photos/4680300/pexels-photo-4680300.jpeg" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" alt="Mobile Van" />
                            </div>
                            <div className="relative rounded-2xl overflow-hidden group h-40 md:h-auto">
                                <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-white p-4 text-center group-hover:bg-red-600 transition-colors cursor-pointer">
                                    <Camera className="w-8 h-8 mb-2" />
                                    <span className="font-bold">View Full Gallery</span>
                                    <span className="text-xs opacity-75 mt-1">120+ Photos</span>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* Knowledge Hub */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">Knowledge Hub</h3>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {blogPosts.map((post) => (
                                <div key={post.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all group cursor-pointer flex flex-col h-full">
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                                            {post.category}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                                            <Calendar className="w-3 h-3" /> {post.date}
                                        </div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                                            {post.title}
                                        </h4>
                                        <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-1">
                                            {post.excerpt}
                                        </p>
                                        <button className="text-blue-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                                            Read Article <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>


                    {/* Testimonials Grid */}
                    <section>
                        <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                            <MessageCircle className="w-6 h-6 text-red-500" /> Wall of Gratitude
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { name: "Dr. A. Gupta", role: "CMO, District Hospital", text: "The predictive alerts help us stock up before critical weekends. A lifesaver." },
                                { name: "Suman Verma", role: "Patient's Mother", text: "I requested O+ blood at 2 AM. Within 15 minutes, I had 3 donor contacts. Bless this app." },
                                { name: "Rahul K.", role: "Donor", text: "The points system makes donation fun. I compete with my friends to see who helps more!" },
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <Quote className="w-8 h-8 text-red-100 mb-4 fill-current" />
                                    <p className="text-slate-600 italic mb-6">"{item.text}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
                                            {item.name[0]}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">{item.name}</div>
                                            <div className="text-xs text-slate-500">{item.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>


                    {/* Feedback Submission */}
                    <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-white mb-4">Share Your Story</h2>
                            <p className="text-slate-300 mb-8">Did RaktSetu help you? Or do you have suggestions to improve? We are listening.</p>

                            {feedbackSent ? (
                                <div className="bg-green-500/20 border border-green-500/50 text-green-200 p-4 rounded-xl flex items-center justify-center gap-2">
                                    <Star className="w-5 h-5 fill-current" /> Thank you for sharing your thoughts!
                                </div>
                            ) : (
                                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                                    <textarea
                                        required
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Type your experience here..."
                                        className="w-full h-32 bg-slate-800 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-red-500 outline-none resize-none"
                                    />
                                    <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-900/50 flex items-center justify-center gap-2 mx-auto">
                                        <Send className="w-4 h-4" /> Submit Feedback
                                    </button>
                                </form>
                            )}
                        </div>
                        {/* Decorative blobs */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                    </section>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Testimonial;