import React, { useState, useEffect } from 'react';
const pageContainerStyle = {
  width: '100vw',
  height: '100vh',
  overflowY: 'auto',
  padding: '20px',
  backgroundColor: '#121212',
  color: '#ffffff',
  boxSizing: 'border-box',
  position: 'relative',
  backgroundImage: 'url("https://cdn.pixabay.com/photo/2016/11/10/05/09/bitcoin-1813503_1280.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};
const pageStyles = {
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for better readability
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    margin: 'auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: '48px',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #ff7e5f, #feb47b)', // Gradient background
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '10px',
    padding: '20px',
    margin: '20px 0',
    transition: 'transform 0.3s, box-shadow 0.3s',
    position: 'relative',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  cardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 255, 250, 0.4)',
  },
  subtitle: {
    marginTop: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#00BFFF', // Light blue for subtitles
  },
  paragraph: {
    lineHeight: '1.6',
    fontSize: '18px',
    color: '#FFFFFF', // White for general paragraphs
  },
  importantText: {
    color: '#FFD700', // Gold for important information
    fontWeight: 'bold',
  },
  list: {
    margin: '20px 0',
  },
  listItem: {
    marginBottom: '10px',
    color: '#FFFFFF', // White for list items
  },
  scrollToTopButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  },
};
const PaymentPage = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      if (scrollTop + windowHeight >= fullHeight - 100) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div style={pageContainerStyle}>
      <div style={pageStyles.overlay}></div>
      <div style={pageStyles.content}>
        <header style={pageStyles.header}>
          <h1>Welcome to Our Payment Portal</h1>
        </header>
        <div
          style={pageStyles.card}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = pageStyles.cardHover.transform;
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 255, 250, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
          }}
        >
          <h2 style={pageStyles.subtitle}>Payment Information</h2>
          <p style={pageStyles.paragraph}>
            - Users can pay directly to the admin for the services rendered by our technicians.
          </p>
          <p style={pageStyles.paragraph}>
            - If you make a payment and the work is not submitted, you are eligible for a refund within <span style={pageStyles.importantText}>0-7 days</span>.
          </p>
          <p style={pageStyles.paragraph}>
            - Please note that technicians charge a minimum fee of <span style={pageStyles.importantText}>100 Rs</span>. There are no platform fees applied for transactions above this amount.
          </p>
        </div>
        <div
          style={pageStyles.card}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = pageStyles.cardHover.transform;
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 255, 250, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
          }}
        >
          <h2 style={pageStyles.subtitle}>Payment Methods</h2>
          <p style={pageStyles.paragraph}>
            You can make payments using various methods including credit/debit cards, UPI, and net banking through Razorpay. The process is transparent and easy to follow.
          </p>
        </div>
        <div
          style={pageStyles.card}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = pageStyles.cardHover.transform;
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 255, 250, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
          }}
        >
          <h2 style={pageStyles.subtitle}>How to Pay</h2>
          <ol style={pageStyles.list}>
            <li style={pageStyles.listItem}>Select the service you wish to pay for.</li>
            <li style={pageStyles.listItem}>Enter the amount to be paid.</li>
            <li style={pageStyles.listItem}>Choose your preferred payment method.</li>
            <li style={pageStyles.listItem}>Complete the transaction securely through Razorpay.</li>
          </ol>
        </div>
      </div>
      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button onClick={scrollToTop} style={pageStyles.scrollToTopButton}>
          ↑ Top
        </button>
      )}
    </div>
  );
};
export default PaymentPage;