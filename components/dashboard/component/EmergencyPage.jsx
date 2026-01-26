import React, { useState } from 'react'
import RequestsList from '../RequestsList'
import RequestDetail from '../RequestDetail';
import NavBar from '@/components/common/NavBar';
import Footer from '@/components/common/Footer';

const initialRequests = [
    { id: '1', hospital: 'District Hospital Bastar', patientName: 'Ramesh K.', contactNumber: '+919800000000', bloodGroup: 'O+', unitsNeeded: 3, urgency: 'Critical', status: 'Pending', timestamp: '10m ago' },
    { id: '2', hospital: 'CHC Dantewada', patientName: 'Anita S.', contactNumber: '+919900000000', bloodGroup: 'AB-', unitsNeeded: 1, urgency: 'High', status: 'In Progress', timestamp: '45m ago' },
    { id: '3', hospital: 'Raipur AIIMS', patientName: 'Unknown', contactNumber: '+919700000000', bloodGroup: 'A-', unitsNeeded: 2, urgency: 'Critical', status: 'Pending', timestamp: '1h ago' },
];
const EmergencyPage = () => {

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [requests, setRequests] = React.useState(initialRequests);
    const [activeTab, setActiveTab] = React.useState('requests');
    const liveRequests = requests;
    return (
        <div>
            <NavBar />
            <div className="mt-16 mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
            </div>
            <Footer />
        </div>
    )
}

export default EmergencyPage