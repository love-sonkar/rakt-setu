import React, { useState } from 'react';
import {
  LayoutDashboard,
  Activity,
  Users,
  Bell,
  Search,
  LogOut,
  Menu,
  Building2,
  MessageSquare,
  Package,
  ListChecks
} from 'lucide-react';
import { BloodStock, Donor, EmergencyRequest, Partner, SMSMessage } from '../types';

// Import extracted components
import HeartLogo from './dashboard/HeartLogo';
import NavItem from './dashboard/NavItem';
import SMSGateway from './dashboard/SMSGateway';
import InventoryManager from './dashboard/InventoryManager';
import Overview from './dashboard/Overview';
import RequestsList from './dashboard/RequestsList';
import DonorNetwork from './dashboard/DonorNetwork';
import PartnerNetwork from './dashboard/PartnerNetwork';
import RequestTracking from './dashboard/RequestTracking';
import RequestDetail from './dashboard/RequestDetail';
import { NavLink } from 'react-router-dom';

// Mock Blood Stock (Kept in Dashboard for shared state initialization)
const bloodStock: BloodStock[] = [
  { group: 'A+', units: 45, status: 'Adequate' },
  { group: 'A-', units: 12, status: 'Low' },
  { group: 'B+', units: 50, status: 'Surplus' },
  { group: 'B-', units: 8, status: 'Critical' },
  { group: 'O+', units: 30, status: 'Adequate' },
  { group: 'O-', units: 5, status: 'Critical' },
  { group: 'AB+', units: 15, status: 'Low' },
  { group: 'AB-', units: 4, status: 'Critical' },
];

const initialPartners: Partner[] = [
  {
    id: 'p1',
    name: 'City General Hospital',
    type: 'Hospital',
    location: 'Raipur',
    contact: '+919876543210',
    email: 'contact@citygeneral.com',
    stock: bloodStock
  },
  {
    id: 'p2',
    name: 'Red Cross Blood Bank',
    type: 'Blood Bank',
    location: 'Bhilai',
    contact: '+919988776655',
    email: 'info@redcrossbhilai.org',
    stock: [
      { group: 'A+', units: 120, status: 'Surplus' },
      { group: 'O+', units: 80, status: 'Adequate' },
      { group: 'AB-', units: 2, status: 'Critical' },
      { group: 'B-', units: 0, status: 'Critical' },
      { group: 'A-', units: 5, status: 'Low' },
      { group: 'B+', units: 65, status: 'Surplus' },
      { group: 'AB+', units: 10, status: 'Low' },
      { group: 'O-', units: 1, status: 'Critical' },
    ]
  },
  {
    id: 'p3',
    name: 'District Hospital Bastar',
    type: 'Hospital',
    location: 'Bastar',
    contact: '+919900000000',
    email: 'dh.bastar@cg.gov.in',
    stock: [
      { group: 'A+', units: 2, status: 'Critical' },
      { group: 'O+', units: 5, status: 'Critical' },
      { group: 'B+', units: 10, status: 'Low' },
      { group: 'AB+', units: 1, status: 'Critical' },
      { group: 'A-', units: 0, status: 'Critical' },
      { group: 'B-', units: 1, status: 'Critical' },
      { group: 'O-', units: 0, status: 'Critical' },
      { group: 'AB-', units: 0, status: 'Critical' },
    ]
  }
];

const initialDonors: Donor[] = [
  {
    id: 'd1',
    name: 'Vikram Singh',
    bloodGroup: 'O+',
    lastDonation: '2023-10-15',
    points: 1250,
    badge: 'Life Saver',
    location: 'Raipur',
    email: 'vikram.singh@example.com',
    phone: '+919827155555',
    totalDonations: 12,
    nextEligibleDate: '2024-01-15',
    notificationsEnabled: true,
    history: [
      { id: 'h1', date: '2023-10-15', location: 'District Hospital Raipur', campaign: 'Annual Mega Drive', units: 1, type: 'Whole Blood' },
      { id: 'h2', date: '2023-07-12', location: 'Raipur AIIMS', campaign: 'Emergency Response', units: 1, type: 'Whole Blood' },
      { id: 'h3', date: '2023-04-05', location: 'Red Cross Camp', campaign: 'Youth Red Cross', units: 1, type: 'Whole Blood' },
    ]
  },
  {
    id: 'd2',
    name: 'Priya Sharma',
    bloodGroup: 'A+',
    lastDonation: '2023-11-01',
    points: 980,
    badge: 'Guardian',
    location: 'Bhilai',
    email: 'priya.s@example.com',
    phone: '+919425244444',
    totalDonations: 8,
    nextEligibleDate: '2024-02-01',
    notificationsEnabled: true,
    history: [
      { id: 'h4', date: '2023-11-01', location: 'Bhilai Steel Plant Hospital', campaign: 'Corporate CSR', units: 1, type: 'Whole Blood' },
      { id: 'h5', date: '2023-08-01', location: 'Durg District Hospital', units: 1, type: 'Whole Blood' },
    ]
  },
  {
    id: 'd3',
    name: 'Rahul Verma',
    bloodGroup: 'B-',
    lastDonation: '2023-09-20',
    points: 850,
    badge: 'Hero',
    location: 'Bilaspur',
    email: 'rahul.v@example.com',
    phone: '+919999933333',
    totalDonations: 6,
    nextEligibleDate: '2023-12-20',
    notificationsEnabled: false,
    history: [
      { id: 'h6', date: '2023-09-20', location: 'CIMS Bilaspur', campaign: 'University Camp', units: 1, type: 'Whole Blood' },
    ]
  },
];


const initialRequests: EmergencyRequest[] = [
  { id: '1', hospital: 'District Hospital Bastar', patientName: 'Ramesh K.', contactNumber: '+919800000000', bloodGroup: 'O+', unitsNeeded: 3, urgency: 'Critical', status: 'Pending', timestamp: '10m ago' },
  { id: '2', hospital: 'CHC Dantewada', patientName: 'Anita S.', contactNumber: '+919900000000', bloodGroup: 'AB-', unitsNeeded: 1, urgency: 'High', status: 'In Progress', timestamp: '45m ago' },
  { id: '3', hospital: 'Raipur AIIMS', patientName: 'Unknown', contactNumber: '+919700000000', bloodGroup: 'A-', unitsNeeded: 2, urgency: 'Critical', status: 'Pending', timestamp: '1h ago' },
];


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'tracking' | 'donors' | 'partners' | 'sms' | 'inventory'>('requests');
  const [donors, setDonors] = useState<Donor[]>(initialDonors);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [requests, setRequests] = useState<EmergencyRequest[]>(initialRequests);
  const [smsMessages, setSmsMessages] = useState<SMSMessage[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<EmergencyRequest | null>(null);

  // Sync prop requests with local state if needed, but primarily use props for display if controlled
  // For this implementation we'll treat `initialRequestsProp` as live data source passed from App
  const liveRequests = initialRequests;

  // SMS Gateway Logic
  const handleSimulateSMS = (content: string, sender: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const incomingId = `sms-${Date.now()}`;

    // Add Incoming Message
    const incomingMsg: SMSMessage = {
      id: incomingId,
      sender,
      content,
      timestamp,
      type: 'Incoming',
      status: 'Received'
    };

    setSmsMessages(prev => [...prev, incomingMsg]);
    // Process logic
    setTimeout(() => {
      let replyContent = '';
      const upperContent = content.toUpperCase();
      let isProcessed = false;

      if (upperContent.startsWith('NEED') || upperContent.startsWith('REQUIRE')) {
        // Logic handled in App.tsx via onNewRequest usually, but simulating local feedback here
        replyContent = `[System] Request registered. Searching nearby donors.`;
        isProcessed = true;
      }
      else if (upperContent.startsWith('YES') || upperContent.startsWith('AVAILABLE')) {
        replyContent = `[System] Thank you. You have been matched. Please proceed to the nearest center.`;
        isProcessed = true;
      }
      else if (upperContent.startsWith('STATUS')) {
        replyContent = `[System] No active tickets found for this number.`;
        isProcessed = true;
      }
      else {
        replyContent = `[System] Invalid Command. Use format: NEED [GROUP] [LOCATION]`;
      }

      // Update incoming message status if processed
      if (isProcessed) {
        setSmsMessages(prev => prev.map(msg =>
          msg.id === incomingId ? { ...msg, status: 'Processed' } : msg
        ));
      }

      // Add Outgoing Reply
      const outgoingMsg: SMSMessage = {
        id: `sms-reply-${Date.now()}`,
        sender: 'System',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString(),
        type: 'Outgoing',
        status: 'Sent'
      };
      setSmsMessages(prev => [...prev, outgoingMsg]);
    }, 800);
  };

  const handlePartnerStockUpdate = (partnerId: string, group: string, newUnits: number) => {
    setPartners(prevPartners => prevPartners?.map(p => {
      if (p.id !== partnerId) return p;
      const updatedStock = p.stock?.map(s => {
        if (s.group !== group) return s;
        let status: 'Critical' | 'Low' | 'Adequate' | 'Surplus' = 'Adequate';
        if (newUnits < 5) status = 'Critical';
        else if (newUnits < 15) status = 'Low';
        else if (newUnits > 50) status = 'Surplus';
        return { ...s, units: newUnits, status };
      });
      return { ...p, stock: updatedStock };
    }));
  };

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
    setSelectedRequest(null);
  }


  const onUpdateRequestStatus =
    (id, status) => {
      setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
    }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <NavLink to="/" className="h-16 flex items-center px-6 border-b border-slate-100">
            <HeartLogo />
            <span className="ml-3 font-bold text-lg text-slate-900">RaktSetu</span>
          </NavLink>

          <nav className="flex-1 px-4 py-6 space-y-1">
            {/* <NavItem 
              icon={<LayoutDashboard />} 
              label="Intelligent Flow" 
              active={activeTab === 'overview'} 
              onClick={() => handleTabChange('overview')} 
            /> */}
            <NavItem
              icon={<Activity />}
              label="Emergency Requests"
              active={activeTab === 'requests'}
              count={liveRequests?.filter(r => r.status === 'Pending').length}
              onClick={() => handleTabChange('requests')}
            />
            <NavItem
              icon={<ListChecks />}
              label="Request Tracking"
              active={activeTab === 'tracking'}
              onClick={() => handleTabChange('tracking')}
            />
            <NavItem
              icon={<Users />}
              label="Donor Network"
              active={activeTab === 'donors'}
              onClick={() => handleTabChange('donors')}
            />
            <NavItem
              icon={<Building2 />}
              label="Network Partners"
              active={activeTab === 'partners'}
              onClick={() => handleTabChange('partners')}
            />
            <NavItem
              icon={<Package />}
              label="Global Inventory"
              active={activeTab === 'inventory'}
              onClick={() => handleTabChange('inventory')}
            />
            <NavItem
              icon={<MessageSquare />}
              label="SMS Gateway"
              active={activeTab === 'sms'}
              onClick={() => handleTabChange('sms')}
            />
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-xl p-4 text-white">
              <p className="text-xs font-medium text-red-100 uppercase tracking-wider mb-1">Impact Tracker</p>
              <div className="text-2xl font-bold">124 Lives</div>
              <p className="text-xs text-red-100 mt-1">Saved this month</p>
            </div>
          </div>

          <div className="p-4">
            <NavLink to='/' className="flex items-center w-full px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md">
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 max-w-xl mx-auto hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search blood banks, donors, or requests..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-200 rounded-lg text-sm transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold text-xs border border-red-200">
                AI
              </div>
              <span className="ml-2 text-sm font-medium text-slate-700 hidden sm:block">Admin</span>
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">

          {/* Tab: Overview */}
          {activeTab === 'overview' && (
            <Overview
              requests={liveRequests}
              donors={donors}
              bloodStock={bloodStock}
            />
          )}

          {/* Tab: Emergency Requests */}
          {activeTab === 'requests' && (
            selectedRequest ? (
              <RequestDetail
                request={selectedRequest}
                onBack={() => setSelectedRequest(null)}
              />
            ) : (
              <RequestsList
                requests={liveRequests}
                onSelectRequest={setSelectedRequest}
              />
            )
          )}

          {/* Tab: Request Tracking (Kanban) */}
          {activeTab === 'tracking' && (
            selectedRequest ? (
              <RequestDetail
                request={selectedRequest}
                onBack={() => setSelectedRequest(null)}
              />
            ) : (
              <RequestTracking
                requests={liveRequests}
                onUpdateRequestStatus={onUpdateRequestStatus}
                onSelectRequest={setSelectedRequest}
              />
            )
          )}

          {/* Tab: Donor Network */}
          {activeTab === 'donors' && (
            <DonorNetwork
              donors={donors}
              onUpdateDonors={setDonors}
            />
          )}

          {/* Tab: Partner Network */}
          {activeTab === 'partners' && (
            <PartnerNetwork
              partners={partners}
              setPartners={setPartners}
            />
          )}

          {/* Tab: Global Inventory */}
          {activeTab === 'inventory' && (
            <InventoryManager
              partners={partners}
              onUpdateStock={handlePartnerStockUpdate}
            />
          )}

          {/* Tab: SMS Gateway Console */}
          {activeTab === 'sms' && (
            <SMSGateway
              messages={smsMessages}
              onSimulateSMS={handleSimulateSMS}
            />
          )}

        </main>
      </div>
    </div>
  );
};

export default Dashboard;