import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import UserRequestForm from './components/UserRequestForm';
import { EmergencyRequest, Donor } from './types';
import { useLocation } from 'react-router-dom';

// Mock Data for Donors
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

// Mock Data for Requests
const initialRequests: EmergencyRequest[] = [
  { id: '1', hospital: 'District Hospital Bastar', patientName: 'Ramesh K.', contactNumber: '+919800000000', bloodGroup: 'O+', unitsNeeded: 3, urgency: 'Critical', status: 'Pending', timestamp: '10m ago' },
  { id: '2', hospital: 'CHC Dantewada', patientName: 'Anita S.', contactNumber: '+919900000000', bloodGroup: 'AB-', unitsNeeded: 1, urgency: 'High', status: 'In Progress', timestamp: '45m ago' },
  { id: '3', hospital: 'Raipur AIIMS', patientName: 'Unknown', contactNumber: '+919700000000', bloodGroup: 'A-', unitsNeeded: 2, urgency: 'Critical', status: 'Pending', timestamp: '1h ago' },
];

const App: React.FC = () => {
  const location = useLocation();
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'userRequest'>('landing');
  const [requests, setRequests] = useState<EmergencyRequest[]>(initialRequests);
  const [donors, setDonors] = useState<Donor[]>(initialDonors);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const triggerNotification = (request: EmergencyRequest) => {
    // 1. Filter donors who match blood group and have notifications enabled
    const matchingDonors = donors.filter(
      d => d.bloodGroup === request.bloodGroup && d.notificationsEnabled
    );

    const matchCount = matchingDonors.length;

    // 2. Logic to "Send" notifications
    if (matchCount > 0) {
      const message = `Critical Alert: ${request.unitsNeeded} units of ${request.bloodGroup} needed at ${request.hospital.split('(')[0]}.`;

      // Browser Notification API
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('RaktSetu Alert', {
          body: message,
          icon: 'https://cdn-icons-png.flaticon.com/512/535/535234.png' // Generic blood icon URL
        });
      }

      alert(`[Simulation] Push Notification sent to ${matchCount} matching donors nearby:\n\n"${message}"`);
    } else {
      alert(`Request Submitted. No matching donors with notifications enabled found nearby, but admin has been notified.`);
    }
  };

  const handleNewRequest = (request: EmergencyRequest) => {
    setRequests([request, ...requests]);
    setCurrentView('landing');

    // Trigger notification logic if urgency is high/critical
    if (request.urgency === 'Critical' || request.urgency === 'High') {
      setTimeout(() => triggerNotification(request), 500);
    } else {
      alert("Request Submitted Successfully! Our admins have been notified.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <LandingPage />

    </div>
  );
};

export default App;