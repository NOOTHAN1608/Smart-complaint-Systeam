// src/components/TechnicianPayment.js
import React, { useState, useEffect } from 'react';
const TechnicianPayment = () => {
    const [technicianId, setTechnicianId] = useState('');
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [innerBgColor, setInnerBgColor] = useState('rgba(0, 0, 0, 0.8)');
    const colors = [
        'rgba(255, 0, 0, 0.8)', // Red
        'rgba(0, 255, 0, 0.8)', // Green
        'rgba(0, 0, 255, 0.8)', // Blue
        'rgba(255, 255, 0, 0.8)', // Yellow
        'rgba(255, 165, 0, 0.8)', // Orange
        'rgba(75, 0, 130, 0.8)', // Indigo
        'rgba(238, 130, 238, 0.8)' // Violet
    ];
    // Change background color every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            setInnerBgColor(randomColor);
        }, 2000);
        return () => clearInterval(interval);
    }, []);
    const handleFetchPaymentDetails = async () => {
        if (!technicianId) {
            alert("Please enter a technician ID.");
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/get-payment-details/${technicianId}`);
            const data = await response.json();
            if (response.ok) {
                setPaymentDetails(data);
                // Clear payment details after 30 seconds
                setTimeout(() => {
                    setPaymentDetails([]);
                }, 30000); // 30000 milliseconds = 30 seconds
            } else {
                alert(data.message);
                setPaymentDetails([]);
            }
        } catch (error) {
            console.error("Error fetching payment details:", error);
            alert("Error fetching payment details.");
        }
    };
    return (
        <div style={styles.container}>
            <div style={{ ...styles.innerContainer, backgroundColor: innerBgColor }}>
                <h2 style={styles.header}>Technician Payment Module</h2>
                <input 
                    type="text" 
                    placeholder="Enter Technician ID" 
                    value={technicianId} 
                    onChange={(e) => setTechnicianId(e.target.value)} 
                    style={styles.input}
                />
                <button onClick={handleFetchPaymentDetails} style={styles.button}>Fetch Payment Details</button>
                {paymentDetails.length > 0 && (
                    <div style={styles.detailsContainer}>
                        <h3 style={styles.detailsHeader}>Payment Details:</h3>
                        <ul style={styles.detailsList}>
                            {paymentDetails.map((payment, index) => (
                                <li key={index} style={styles.detailsItem}>
                                    <p>Complaint ID: {payment.complaintId}</p>
                                    <p style={{ color: 'red' }}>Final Amount: {payment.finalAmount}</p>
                                    <p style={{ color: 'green' }}>Payment Status: {payment.paymentStatus}</p>
                                    <p style={{ color: 'blue' }}>Payment ID: {payment.paymentId}</p>
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
        justifyContent: 'flex-start', // Aligns the inner container to the right
        minHeight: '100vh',
        backgroundImage: 'url(https://i0.wp.com/vpurshan.wpcomstaging.com/wp-content/uploads/2023/01/Electronic-Payment-System.jpg?w=1200&ssl=1)', // Background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
    },
    innerContainer: {
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
        color: '#333',
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
};
export default TechnicianPayment;