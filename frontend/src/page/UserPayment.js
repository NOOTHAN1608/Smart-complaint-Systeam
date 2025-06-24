import React, { useState, useEffect } from 'react';
const UserPayment = () => {
    const [amount, setAmount] = useState('');
    const [complaintId, setComplaintId] = useState(''); // New state for complaint ID
    const [cost, setCost] = useState(0); // New state for cost
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
    const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => setRazorpayLoaded(true);
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script); // Clean up the script tag
        };
    }, []);
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setInitialPosition({ x: e.clientX - cardPosition.x, y: e.clientY - cardPosition.y });
    };
    const handleMouseMove = (e) => {
        if (isDragging) {
            setCardPosition({
                x: e.clientX - initialPosition.x,
                y: e.clientY - initialPosition.y,
            });
        }
    };
    const handleMouseUp = () => {
        setIsDragging(false);
    };
    const handleComplaintIdChange = async (e) => {
        const id = e.target.value;
        setComplaintId(id);
        // Fetch cost based on complaint ID
        if (id) {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/get-cost?complaintId=${id}`);
                const data = await response.json();
                if (data.cost) {
                    setCost(data.cost);
                    setAmount(data.cost); // Automatically set the amount to the fetched cost
                } else {
                    setCost(0);
                    setAmount(''); // Clear amount if no cost is returned
                }
            } catch (error) {
                console.error("Error fetching cost:", error);
                setCost(0);
                setAmount(''); // Clear amount on error
            }
        } else {
            setCost(0);
            setAmount(''); // Clear amount if complaint ID is empty
        }
    };
    const handlePayment = async () => {
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }
        if (!razorpayLoaded) {
            alert("Razorpay SDK is not loaded yet.");
            return;
        }
        const options = {
            key: '******************', // Replace with your Razorpay Key ID
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            name: 'Smart Compliant',
            description: 'Payment to Admin',
            handler: async function (response) {
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                // Send payment details to the server
                await savePaymentDetails(response.razorpay_payment_id, complaintId, cost, 'success');
            },
            prefill: {
                name: 'Noothan',
                email: 'noothankp1608@gmail.com',
                contact: '8073935297',
            },
            theme: {
                color: '#F37254',
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };
    const savePaymentDetails = async (paymentId, complaintId, cost, status) => {
        const paymentData = {
            paymentId,
            complaintId,
            cost,
            status,
            timestamp: new Date().toISOString(),
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/save-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });
            if (!response.ok) {
                throw new Error('Failed to save payment details');
            }
            console.log('Payment details saved successfully');
        } catch (error) {
            console.error("Error saving payment details:", error);
        }
    };
    return (
        <div
            style={{
                ...styles.container,
                cursor: isDragging ? 'grabbing' : 'grab',
                position: 'relative',
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // Stop dragging when mouse leaves the container
        >
            <div
                style={{
                    ...styles.card,
                    transform: `translate(${cardPosition.x}px, ${cardPosition.y}px)`, // Move the card based on its position
                }}
                onMouseDown={handleMouseDown}
            >
                <h2 style={styles.header}>User Payment Module</h2>
                <input 
                    type="text" 
                    placeholder="Complaint ID" 
                    value={complaintId} 
                    onChange={handleComplaintIdChange} 
                    style={styles.input}
                />
                <input 
                    type="number" 
                    placeholder="Enter amount" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    style={styles.input}
                />
                <button onClick={handlePayment} style={styles.button}>Click to Pay</button>
            </div>
        </div>
    );
};
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        minHeight: '100vh',
        backgroundImage: 'url(https://cashfreelogo.cashfree.com/cf-og.png)', // Background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    card: {
        backgroundColor: 'rgba(0, 255, 132, 0.91)',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px',
        animation: 'colorChange 10s infinite', // Add animation here
        position: 'absolute', // Make sure the card can be positioned absolutely
    },
    header: {
        marginBottom: '20px',
        color: '#333',
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
};
// Keyframes for color change animation
const keyframes = `
@keyframes colorChange {
    0% { background-color: rgba(0, 255, 132, 0.91); }
    20% { background-color: rgba(255, 0, 0, 0.91); }
    40% { background-color: rgba(0, 0, 255, 0.91); }
    60% { background-color: rgba(255, 255, 0, 0.91); }
    80% { background-color: rgba(0, 255, 255, 0.91); }
    100% { background-color: rgba(0, 255, 132, 0.91); }
}
`;
// Create a style element in the head for the keyframes
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);
export default UserPayment;