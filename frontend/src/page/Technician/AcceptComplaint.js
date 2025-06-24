import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AcceptComplaint = () => {
  const [technicianId, setTechnicianId] = useState('');
  const [technicianType, setTechnicianType] = useState('');
  const [complaint, setComplaint] = useState('');
  const [complaintId, setComplaintId] = useState(''); // New state for complaint ID
  const [days, setDays] = useState('');
  const [hours, setHours] = useState('');
  const [cost, setCost] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [includingNewItems, setIncludingNewItems] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleTechnicianIdChange = async (e) => {
    const id = e.target.value;
    setTechnicianId(id);
    if (id) {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/get-technician-type?technicianId=${id}`);
        const data = await response.json();
        if (data.type) {
          setTechnicianType(data.type);
        } else {
          setTechnicianType('');
        }
      } catch (error) {
        console.error("Error fetching technician type:", error);
        setTechnicianType('');
      }
    } else {
      setTechnicianType('');
    }
  };
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Validate all required fields
    if (!technicianId || !technicianType || !complaint || !complaintId || days <= 0 || hours <= 0 || cost <= 0) {
      alert("Please fill all required fields (Technician ID, Technician Type, Complaint, Complaint ID, Days, Hours, and Cost) with positive values.");
      return;
    }
    // Validate complaint ID format
    const complaintIdPattern = /^SMART-PERSONAL-\w+$/; // Adjust the pattern as needed
    if (!complaintIdPattern.test(complaintId)) {
      alert("Complaint ID must start with 'SMART-PERSONAL-' followed by alphanumeric characters.");
      return;
    }
    if (!termsAccepted) {
      setShowTerms(true);
      return;
    }
    const complaintDetails = {
      technicianId,
      technicianType,
      complaint,
      complaintId, // Include complaint ID in the request
      days,
      hours,
      cost,
      includingNewItems,
      status: 'accepted', // Mark complaint status as accepted
    };
    
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/accept-complaint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(complaintDetails),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => {
          navigate('../technician/technicianDashboard');
        }, 2000);
      } else {
        // Display the error message from the server
        alert(data.message);
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Error submitting complaint. Please try again.");
    }
  };
  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setShowTerms(false);
    handleSubmit();
  };
  const handleDeclineTerms = () => {
    setTermsAccepted(false);
    setShowTerms(false);
    setMessage('Complaint not accepted. Redirecting...');
    setTimeout(() => {
      navigate('/AcceptComplaint');
    }, 2000);
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Technician Complaint Estimation</h1>
      {message && <div style={styles.message}>{message}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Technician ID:</label>
          <input
            type="text"
            style={styles.input}
            value={technicianId}
            onChange={handleTechnicianIdChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Technician Type:</label>
          <input
            type="text"
            style={styles.input}
            value={technicianType}
            readOnly
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Complaint Description:</label>
          <textarea
            style={styles.textarea}
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Complaint ID:</label>
          <input
            type="text"
            style={styles.input}
            value={complaintId}
            onChange={(e) => setComplaintId(e.target.value)}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Estimated Days to Complete:</label>
          <input
            type="number"
            min="0"
            max="5"
            style={styles.input}
            value={days}
            onChange={(e) => setDays(e.target.value)}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Estimated Hours to Complete:</label>
          <input
            type="number"
            min="0"
            max="24"
            style={styles.input}
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Including Items:</label>
          <input
            type="checkbox"
            checked={includingNewItems}
            onChange={(e) => setIncludingNewItems(e.target.checked)}
            style={styles.checkbox}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}> Cost (RS):</label>
          <input
            type="number"
            min="200"
            style={styles.input}
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Accept Complaint</button>
      </form>
      {/* Terms and Conditions Modal */}
      {showTerms && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Terms and Conditions</h2>
            <p>Please read and accept the terms and conditions to proceed.</p>
            <p>1. You agree to provide accurate information.</p>
            <p>2. You understand that the estimated days and cost may vary.</p>
            <p>3. You agree to the service terms.</p>
            <div style={styles.modalButtons}>
              <button onClick={handleAcceptTerms} style={styles.modalButton}>Accept</button>
              <button onClick={handleDeclineTerms} style={styles.modalButton}>Decline</button>
            </div>
          </div>
        </div>
      )}
      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100vh',
    maxHeight: '100vh',
    overflowY: 'auto',
    backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/04/05/11/50/industry-3292625_1280.jpg)',
    backgroundSize: 'cover',
    padding: '20px',
    color: 'white',
  },
  header: {
    marginBottom: '20px',
    fontSize: '2rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
    textAlign: 'center',
  },
  form: {
    backgroundColor: 'rgba(26, 1, 1, 0.4)',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(16, 238, 27, 0.87)',
    width: '100%',
    maxWidth: '600px',
    transition: 'transform 0.2s',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    height: '100px',
    borderRadius: '8px',
    padding: '10px',
    border: '1px solid #ccc',
    transition: 'border 0.3s',
    resize: 'none',
    color: "black",
  },
  input: {
    width: '100%',
    height: '40px',
    borderRadius: '8px',
    padding: '10px',
    border: '1px solid #ccc',
    transition: 'border 0.3s',
    color: 'black',
  },
  button: {
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  footer: {
    marginTop: '20px',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '8px',
    width: '100%',
  },
  footerText: {
    margin: 0,
    fontSize: '1rem',
    color: 'black',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    width: '80%',
    maxWidth: '500px',
  },
  modalButtons: {
    marginTop: '20px',
  },
  modalButton: {
    margin: '0 10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 15px',
    cursor: 'pointer',
  },
  message: {
    marginBottom: '20px',
    color: 'yellow',
    fontSize: '1.2rem',
    textAlign: 'center',
  },
};
export default AcceptComplaint;