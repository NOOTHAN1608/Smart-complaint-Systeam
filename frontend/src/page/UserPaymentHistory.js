// src/components/UserPaymentHistory.js
import React, { useState } from 'react';
const UserPaymentHistory = () => {
    const [complaintId, setComplaintId] = useState('');
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [message, setMessage] = useState('');
    const fetchPaymentHistory = async () => {
        if (!complaintId) {
            alert("Please enter a complaint ID.");
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/get-payment-history/${complaintId}`);
            const data = await response.json();
            if (response.ok) {
                setPaymentHistory(data);
                setMessage(''); // Clear any previous messages
            } else {
                setPaymentHistory([]);
                setMessage(data.message);
            }
        } catch (error) {
            console.error("Error fetching payment history:", error);
            setMessage("Error fetching payment history.");
        }
    };
    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <h2 style={styles.header}>User Payment History</h2>
                <input 
                    type="text" 
                    placeholder="Enter Complaint ID" 
                    value={complaintId} 
                    onChange={(e) => setComplaintId(e.target.value)} 
                    style={styles.input}
                />
                <button onClick={fetchPaymentHistory} style={styles.button}>Fetch Payment History</button>
                {message && <p style={styles.errorMessage}>{message}</p>}
                {paymentHistory.length > 0 && (
                    <div style={styles.detailsContainer}>
                        <h3 style={styles.detailsHeader}>Payment History:</h3>
                        <ul style={styles.detailsList}>
                            {paymentHistory.map((payment, index) => (
                                <li key={index} style={styles.detailsItem}>
                                    <p>Payment ID: {payment.paymentId}</p>
                                    <p>Cost: (rs) <span style={{ color: 'green' }}>{payment.cost}</span></p>
                                    <p>Status: {payment.status}</p>
                                    <p>Timestamp: {new Date(payment.timestamp).toLocaleString()}</p>
                                    <hr />
                                </li>
                            ))}
                        </ul>
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
        backgroundImage: 'url(https://cdn.pixabay.com/photo/2020/01/13/14/44/checkout-4762569_1280.jpg)', // Background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
    },
    innerContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background for content
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
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
        color: '#fff',
        backgroundColor: '#F37254',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    detailsContainer: {
        marginTop: '20px',
        textAlign: 'left',
    },
    detailsHeader: {
        color: '#fff',
    },
    detailsList: {
        listStyleType: 'none',
        padding: 0,
    },
    detailsItem: {
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '4px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    errorMessage: {
        color: 'red',
    },
};
export default UserPaymentHistory;