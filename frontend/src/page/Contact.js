
import React, { useState } from 'react';

const LandingPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focus, setFocus] = useState('');

  const styles = {
    landingPage: {
      color: 'white',
      backgroundColor: 'black',
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    },
    bigContainer: {
      maxWidth: '1320px',
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    leftOne: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'left',
      padding: '20px',
    },
    rightOne: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      padding: '20px',
    },
    contentBox: { maxWidth: '450px' },
    sectionHead: {
      fontSize: '40px',
      lineHeight: '55px',
      fontWeight: 800,
      marginBottom: '15px',
      color: '#1e3a8a',
    },
    sectionSubhead: {
      fontSize: '18px',
      color: '#b6b6b6',
      marginBottom: '50px',
      lineHeight: '1.6',
    },
    contactDetailsContainer: { marginBottom: '20px' },
    contactDetail: { marginBottom: '10px' },
    contactLink: { color: '#1e3a8a', textDecoration: 'none' },
    formBox: {
      backgroundColor: '#f1f1f1',
      padding: '35px',
      maxWidth: '506px',
      color: '#333',
      borderRadius: '8px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
    },
    inputTextareaButton: {
      width: '100%',
      border: 'none',
      borderRadius: '5px',
      fontSize: '18px',
      padding: '12px',
      marginBottom: '20px',
      transition: 'background-color 0.3s',
    },
    inputTextarea: {
      backgroundColor: '#f1f1f1',
      color: '#333',
      border: '2px solid #ccc',
    },
    button: {
      backgroundColor: '#1e3a8a',
      fontWeight: 600,
      cursor: 'pointer',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '5px',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#2563eb',
    },
    successMessage: {
      color: 'green',
      fontSize: '20px',
      marginTop: '20px',
      textAlign: 'center',
    },
    focusedInput: {
      backgroundColor: '#e3f2fd',
      borderColor: '#42a5f5',
    },
    backButton: {
      marginTop: '20px',
      padding: '10px 20px',
      backgroundColor: '#1e3a8a',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      textDecoration: 'none',
    },
  };

  const pageContainerStyle = {
    width: '100vw',
    height: '100vh',
    overflowY: 'auto',
    padding: '20px',
    backgroundColor: '#121212',
    color: '#ffffff',
    boxSizing: 'border-box',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    window.scrollTo(0, 0);
    const formData = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      message: e.target.message.value,
    };
    try {
      const response = await fetch('http://localhost:8080/submitContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  const handleFocus = (e) => {
    setFocus(e.target.name);
  };

  const handleBlur = () => {
    setFocus('');
  };

  const navigateToHome = () => {
    window.location.href = '/'; // Adjust this path if your home page URL is different
  };

  return (
    <div style={pageContainerStyle}>
      <div style={styles.landingPage}>
        <div style={styles.bigContainer}>
          <div style={styles.leftOne}>
            <div style={styles.contentBox}>
              <p style={styles.sectionHead}>Contact Us</p>
              <p style={styles.sectionSubhead}>
                Have a question? We are here to help! Get in touch with us and we will respond promptly.
              </p>
              <div style={styles.contactDetailsContainer}>
                <p style={styles.contactDetail}>
                  📞 Phone: <a href="tel:+91 8073935297" style={styles.contactLink}>+91-8073935297</a>
                </p>
                <p style={styles.contactDetail}>
                  📧 Email: <a href="mailto:smartcomplaintsportal@outlook.com" style={styles.contactLink}>smartcomplaintsportal@outlook.com</a>
                </p>
              </div>
            </div>
          </div>
          <div style={styles.rightOne}>
            {!isSubmitted ? (
              <form style={styles.formBox} onSubmit={handleSubmit}>
                <p style={styles.sectionHead}>Get In Touch</p>
                <p style={styles.sectionSubhead}>
                  We will get back to you within 24 hours. Please fill out the form below.
                </p>
                <input
                  style={{
                    ...styles.inputTextareaButton,
                    ...styles.inputTextarea,
                    ...(focus === 'fullName' ? styles.focusedInput : {}),
                  }}
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  required
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <input
                  style={{
                    ...styles.inputTextareaButton,
                    ...styles.inputTextarea,
                    ...(focus === 'email' ? styles.focusedInput : {}),
                  }}
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <input
                  style={{
                    ...styles.inputTextareaButton,
                    ...styles.inputTextarea,
                    ...(focus === 'phone' ? styles.focusedInput : {}),
                  }}
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  required
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <input
                  style={{
                    ...styles.inputTextareaButton,
                    ...styles.inputTextarea,
                    ...(focus === 'address' ? styles.focusedInput : {}),
                  }}
                  name="address"
                  type="text"
                  placeholder="Address"
                  required
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <textarea
                  style={{
                    ...styles.inputTextareaButton,
                    ...styles.inputTextarea,
                    ...(focus === 'message' ? styles.focusedInput : {}),
                  }}
                  name="message"
                  placeholder="Your Message"
                  required
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                ></textarea>
                <button
                  style={{ ...styles.inputTextareaButton, ...styles.button }}
                  type="submit"
                  onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                  onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                  Submit Message
                </button>
              </form>
            ) : (
              <div>
                <p style={styles.successMessage}>
                  Thank you for reaching out! We will get back to you as soon as possible.
                </p>
                <button style={styles.backButton} onClick={navigateToHome}>
                  Back to Home
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;