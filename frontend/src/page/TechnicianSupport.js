// src/components/TechnicianList.js
import React, { useEffect, useState } from 'react';
const TechnicianList = () => {
    const [technicians, setTechnicians] = useState([]);
    const [message, setMessage] = useState('');
    useEffect(() => {
        const fetchTechnicians = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/get-all-technicians`);
                const data = await response.json();
                if (response.ok) {
                    setTechnicians(data);
                    setMessage('');
                } else {
                    setTechnicians([]);
                    setMessage(data.message);
                }
            } catch (error) {
                console.error("Error fetching technician details:", error);
                setMessage("Error fetching technician details.");
            }
        };
        // Fetch technicians when the component mounts
        fetchTechnicians();
    }, []);
    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <h2 style={styles.header}>Technician Support List</h2>
                {message && <p style={styles.errorMessage}>{message}</p>}
                <div style={styles.cardContainer}>
                    {technicians.length > 0 ? (
                        technicians.map((technician, index) => (
                            <div key={index} style={styles.card}>
                                <h3 style={styles.cardHeader}>Technician ID: {technician.technicianId}</h3>
                                <p>First Name: {technician.firstName}</p>
                                <p>Last Name: {technician.lastName}</p>
                                <p>
                                    Email: 
                                    <a href={`mailto:${technician.email}`} style={styles.email}>
                                        {technician.email}
                                    </a>
                                </p>
                                <p>Type: {technician.type}</p>
                            </div>
                        ))
                    ) : (
                        <p>No technicians found.</p>
                    )}
                </div>
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
        backgroundImage: 'url(https://tse1.mm.bing.net/th?id=OIP.tPKRfgljTx7O7YDfzaGOMwHaFj&pid=Api&P=0&h=180)', // Background image
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
        maxWidth: '800px', // Adjusted to fit multiple cards
        maxHeight: '80vh', // Set a max height for the inner container
        overflowY: 'auto', // Enable vertical scrolling
    },
    header: {
        color: '#F37254',
        marginBottom: '20px',
    },
    cardContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)', // One column layout
        gap: '20px', // Space between cards
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        textAlign: 'left',
    },
    cardHeader: {
        color: '#F37254',
        marginBottom: '10px',
    },
    errorMessage: {
        color: 'red',
    },
    email: {
        color: '#F37254', // Style for the email link
        textDecoration: 'none',
    },
};
export default TechnicianList;