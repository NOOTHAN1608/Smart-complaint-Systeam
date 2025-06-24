// Compliant_id.js
import React, { useState } from 'react';
import axios from 'axios';
const CompliantId = () => {
  const [formData, setFormData] = useState({
    houseNumber: '',
    houseName: '',
    streetName: '',
    city: '',
    pinCode: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/findComplaintId', formData);
      alert(`Complaint ID: ${response.data.complaintId}`); // Show the complaint ID in an alert
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert(error.response.data.message); // Show a message if no matching complaint is found
      } else {
        alert('An error occurred while fetching the complaint ID. Please try again.');
      }
    }
    // Optionally reset the form after submission
    setFormData({
      houseNumber: '',
      houseName: '',
      streetName: '',
      city: '',
      pinCode: '',
    });
  };
  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.header}>Fetch Complaint ID</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              House Number:
              <input
                type="text"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </label>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              House Name:
              <input
                type="text"
                name="houseName"
                value={formData.houseName}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </label>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Street Name:
              <input
                type="text"
                name="streetName"
                value={formData.streetName}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </label>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              City:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </label>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Pin Code:
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </label>
          </div>
          <button type="submit" style={styles.button}>Fetch Complaint ID</button>
        </form>
      </div>
    </div>
  );
};
const styles = {
  body: {
    margin: 0,
    padding: 0,
    height: '100vh',
    backgroundImage: 'url(https://cdn.pixabay.com/photo/2022/01/06/08/39/lights-6918938_1280.jpg)',
    backgroundSize: 'cover', // Cover the entire viewport
    backgroundPosition: 'center', // Center the background image
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    maxWidth: '600px',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Slightly transparent white for readability
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    color: 'white',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%',
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};
export default CompliantId;