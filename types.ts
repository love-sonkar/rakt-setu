export interface DonationRecord {
  id: string;
  date: string;
  location: string;
  campaign?: string; // New field for associated campaign
  units: number;
  type: 'Whole Blood' | 'Platelets' | 'Plasma';
}

export interface BloodStock {
  group: string;
  units: number;
  status: 'Critical' | 'Low' | 'Adequate' | 'Surplus';
}

export interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  lastDonation: string;
  points: number;
  badge: string;
  location: string;
  email: string;
  phone: string;
  totalDonations: number;
  nextEligibleDate: string;
  notificationsEnabled: boolean;
  history: DonationRecord[];
}

export interface Partner {
  id: string;
  name: string;
  type: 'Hospital' | 'Blood Bank';
  location: string;
  contact: string;
  email: string;
  stock: BloodStock[];
}

export interface EmergencyRequest {
  id: string;
  hospital: string;
  patientName: string;
  contactNumber: string;
  bloodGroup: string;
  unitsNeeded: number;
  urgency: 'High' | 'Critical' | 'Moderate';
  status: 'Pending' | 'In Progress' | 'Completed';
  timestamp: string;
}

export interface PredictionData {
  month: string;
  demand: number;
  supply: number;
}

export interface SMSMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'Incoming' | 'Outgoing';
  status: 'Received' | 'Processed' | 'Sent' | 'Failed';
}