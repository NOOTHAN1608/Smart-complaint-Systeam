import React, { useState, useEffect } from 'react';
const AdminPayment = () => {
    const [amount, setAmount] = useState('');
    const [complaintId, setComplaintId] = useState('');
    const [technicianId, setTechnicianId] = useState('');
    const [cost, setCost] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);
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
            document.body.removeChild(script);
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
        if (id) {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/get-cost?complaintId=${id}`);
                const data = await response.json();
                if (data.cost) {
                    setCost(data.cost);
                    setAmount(data.cost);
                    setFinalAmount(data.cost); // Initially set finalAmount to cost
                } else {
                    setCost(0);
                    setAmount('');
                    setFinalAmount(0);
                }
                // Fetch technicianId based on complaintId
                const technicianResponse = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/get-technician-id?complaintId=${id}`);
                const technicianData = await technicianResponse.json();
                if (technicianData.technicianId) {
                    setTechnicianId(technicianData.technicianId);
                    // Calculate final amount after deduction
                    const deduction = data.cost * 0.20; // Calculate 20% deduction
                    setFinalAmount(data.cost - deduction); // Set final amount after deduction
                } else {
                    setTechnicianId('');
                    setFinalAmount(data.cost); // Reset final amount if no technician found
                }
            } catch (error) {
                console.error("Error fetching cost or technician ID:", error);
                setCost(0);
                setAmount('');
                setFinalAmount(0);
                setTechnicianId('');
            }
        } else {
            setCost(0);
            setAmount('');
            setFinalAmount(0);
            setTechnicianId('');
        }
    };
    const handleTechnicianIdChange = (e) => {
        const id = e.target.value;
        setTechnicianId(id);
        if (cost > 0 && id) {
            const deduction = cost * 0.20; // Calculate 20% deduction
            setFinalAmount(cost - deduction); // Update final amount after deduction
        } else {
            setFinalAmount(0);
        }
    };
    const handlePaymentToTechnician = async () => {
        if (!finalAmount || finalAmount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }
        if (!razorpayLoaded) {
            alert("Razorpay SDK is not loaded yet.");
            return;
        }
        const options = {
            key: '*********************',
            amount: finalAmount * 100,
            currency: 'INR',
            name: 'Smart Compliant',
            description: 'Payment to Technician',
            handler: async function (response) {
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                // Send payment details to the backend
                const paymentData = {
                    complaintId,
                    technicianId,
                    finalAmount,
                    paymentStatus: 'successful',
                    paymentId: response.razorpay_payment_id,
                    timestamp: new Date().toISOString()
                };
                try {
                    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/save-admin-payment`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(paymentData),
                    });
                    const data = await res.json();
                    console.log("Payment data saved:", data);
                } catch (error) {
                    console.error("Error saving payment data:", error);
                }
            },
            prefill: {
                name: 'NOOTHAN K P',
                email: '****************',
                contact: '*********',
            },
            theme: {
                color: '#F37254',
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
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
            onMouseLeave={handleMouseUp}
        >
            <div
                style={{
                    ...styles.card,
                    transform: `translate(${cardPosition.x}px, ${cardPosition.y}px)`,
                }}
                onMouseDown={handleMouseDown}
            >
                <h2 style={styles.header}>Admin Payment Module</h2>
                <input 
                    type="text" 
                    placeholder="Complaint ID" 
                    value={complaintId} 
                    onChange={handleComplaintIdChange} 
                    style={styles.input}
                />
                <input 
                    type="number" 
                    placeholder="Cost" 
                    value={cost} 
                    readOnly 
                    style={styles.input}
                />
                <input 
                    type="text" 
                    placeholder="Technician ID" 
                    value={technicianId} 
                    onChange={handleTechnicianIdChange} 
                    style={styles.input}
                />
                <input 
                    type="number" 
                    placeholder="Final Amount (after 20% deduction)" 
                    value={finalAmount} 
                    readOnly 
                    style={styles.input}
                />
                <button onClick={handlePaymentToTechnician} style={styles.button}>Pay to Technician</button>
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
        backgroundImage: 'url(https://wallpaperaccess.com/full/8245208.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px',
        position: 'absolute',
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
export default AdminPayment;