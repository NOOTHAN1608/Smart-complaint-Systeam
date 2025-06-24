// src/components/ComplaintTracking.js
import React, { useState } from 'react';
const ComplaintTracking = () => {
    const [complaintId, setComplaintId] = useState('');
    const [complaintDetails, setComplaintDetails] = useState(null);
    const [message, setMessage] = useState('');
    const fetchComplaintDetails = async () => {
        if (!complaintId) {
            alert("Please enter a complaint ID.");
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/get-complaint-details/${complaintId}`);
            const data = await response.json();
            if (response.ok) {
                setComplaintDetails(data);
                setMessage(''); // Clear any previous messages
            } else {
                setComplaintDetails(null);
                setMessage(data.message);
            }
        } catch (error) {
            console.error("Error fetching complaint details:", error);
            setMessage("Error fetching complaint details.");
        }
    };
    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <h2 style={styles.header}>Complaint Tracking</h2>
                <input 
                    type="text" 
                    placeholder="Enter Complaint ID" 
                    value={complaintId} 
                    onChange={(e) => setComplaintId(e.target.value)} 
                    style={styles.input}
                />
                <button onClick={fetchComplaintDetails} style={styles.button}>Track Complaint</button>
                {message && <p style={styles.errorMessage}>{message}</p>}
                {complaintDetails && (
                    <div style={styles.detailsContainer}>
                        <h3 style={styles.detailsHeader}>Complaint Details:</h3>
                        
                        <p>Technician ID: {complaintDetails.technicianId}</p>
                     
                        
                        
                        <p style={{ color: 'red' }}>Comments: {complaintDetails.comments || 'We solve issues efficiently and in a timely manner.'}</p>
                        <p style={{ color: 'yellow' }}>Estimated Days: {complaintDetails.days}</p>
                        <p style={{ color: 'yellow' }}>Estimated Hours: {complaintDetails.hours}</p>
                        <p style={{ color: 'green' }}>Cost: (rs) {complaintDetails.cost}</p>
                        <p style={{ color: 'blue' }}>Including New Items: {complaintDetails.includingNewItems ? 'Yes' : 'No'}</p>
                        <p style={{ color: 'pink' }}>Technician {complaintDetails.technicianId}can be assigned to this complaint.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(https://thumbs.dreamstime.com/z/word-complaint-wooden-circles-blue-table-beautiful-background-copy-space-business-concept-word-complaint-wooden-195278923.jpg)', // Background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
    },
    innerContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background for content
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 4px 20px rgba(0, 255, 0, 1)',
        textAlign: 'center',
        width: '100%',
        maxWidth: '500px',
    },
    header: {
        color: '#F37254',
        marginBottom: '20px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        marginBottom: '20px',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        color: 'white',
        backgroundColor: '#F37254',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    detailsContainer: {
        marginTop: '20px',
        textAlign: 'left',
        color:'white'
    },
    detailsHeader: {
        color: '#fff',
    },
    errorMessage: {
        color: 'red',
    },
};
export default ComplaintTracking;