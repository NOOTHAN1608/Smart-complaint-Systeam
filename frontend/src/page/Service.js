
import React, { useState, useEffect } from "react";

const pageContainerStyle = {
  width: "100vw",
  height: "100vh",
  overflowY: "auto",
  padding: "20px",
  backgroundColor: "#121212",
  color: "#ffffff",
  boxSizing: "border-box",
  position: "relative",
  backgroundImage:
    'url("https://cdn.pixabay.com/photo/2016/11/29/07/50/brick-wall-1868217_1280.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const pageStyles = {
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0)",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2,
    maxWidth: "1200px",
    margin: "auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "48px", // Larger header text
    fontWeight: "bold", // Make it bold
    color: "#fff", // Ensure the text is white
  },
  exploreSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    padding: "20px", // Padding for better spacing
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
    borderRadius: "10px", // Rounded corners
  },
  exploreText: {
    flex: 1,
    color: "#fff", // Ensure the text is white
    fontSize: "20px", // Medium-sized text
  },
  exploreList: {
    flex: 1,
    listStyle: "none",
    padding: "0",
  },
  listItem: {
    marginBottom: "15px",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    transition: "background-color 0.3s",
    color: "#fff",
    fontSize: "20px",
  },
  listItemHover: {
    backgroundColor: "rgba(0, 0, 255, 0.4)",
  },
  image: {
    flex: 1,
    maxWidth: "200px",
    height: "200px",
    borderRadius: "10px",
    objectFit: "cover",
  },
  services: {
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  },
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    width: "100%",
    textAlign: "center",
    transition: "transform 0.3s, box-shadow 0.3s",
    color: "#ffffff", // White text for card content
    position: "relative",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(0, 255, 250, 0.4)",
  },
  footer: {
    backgroundColor: "#000",
    color: "#fff",
    padding: "60px 20px",
    textAlign: "center",
    
  },
  footerContent: {
    maxWidth: "1200px",
    margin: "auto",
  },
  footerHeader: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  footerText: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  footerLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  footerLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    transition: "color 0.3s",
  },
  footerLinkHover: {
    color: "#007BFF",
  },
  scrollToTopButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "white",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
    zIndex: 1000,
  },
};

const ServiceCard = ({ icon, title, description, extraInfo }) => {
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div
      style={pageStyles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = pageStyles.cardHover.transform;
        e.currentTarget.style.boxShadow = pageStyles.cardHover.boxShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      }}
    >
      <div
        style={{ fontSize: "50px", color: "#007BFF", marginBottom: "15px" }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "10px",
          color: "#fff",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "18px", marginBottom: "20px", color: "#fff" }}>
        {description}
      </p>
      {/* Toggle More Info */}
      {showMore && (
        <div style={{ fontSize: "18px", color: "#fff", marginBottom: "20px" }}>
          {extraInfo}
        </div>
      )}
      <button
        style={{
          backgroundColor: "#007BFF",
          color: "#ffffff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "background-color 0.3s",
        }}
        onClick={toggleShowMore}
      >
        {showMore ? "Show Less" : "Learn More"}
      </button>
    </div>
  );
};

const ServicesPage = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Show the button when the user is near the bottom of the page
      if (scrollTop + windowHeight >= fullHeight - 100) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const services = [
    {
      icon: "📋",
      title: "Public Complaints",
      description: "Report public issues affecting communities.",
      extraInfo:
        "Public complaints are issues that affect the broader community. These can include problems like broken streetlights, potholes, or traffic signals.",
    },
    {
      icon: "🏠",
      title: "Personal Complaints",
      description: "Submit complaints regarding personal utilities.",
      extraInfo:
        "Personal complaints involve issues related to household services like water leakage, drainage blockages, or electricity outages.",
    },
    {
      icon: "👷",
      title: "Technician Support",
      description: "Connect with skilled technicians for help.",
      extraInfo:
        "Technician support allows users to request professional assistance for various household issues.",
    },
    {
      icon: "💳",
      title: "Payment Gateway",
      description: "Simplify payments for complaints and services.",
      extraInfo:
        "Our payment gateway allows users to pay for services and track payments securely.",
    },
  ];

  const handleServiceClick = (index) => {
    const element = document.getElementById(`service-${index}`);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={pageContainerStyle}>
      <div style={pageStyles.overlay}></div>
      <div style={pageStyles.content}>
        <header style={pageStyles.header}>
          <h1>Our Services</h1>
        </header>
        {/* Explore Our Services Section with Transparent Background */}
        <div style={pageStyles.exploreSection}>
          <div style={pageStyles.exploreText}>
            <h2 style={{ fontSize: "36px", fontWeight: "bold" }}>
              Explore Our Services
            </h2>{" "}
            {/* Larger text */}
            <p>Click on a service to navigate to its details.</p>
          </div>
          <ul style={pageStyles.exploreList}>
            {services.map((service, index) => (
              <li
                key={index}
                style={pageStyles.listItem}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    pageStyles.listItemHover.backgroundColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    pageStyles.listItem.backgroundColor)
                }
                onClick={() => handleServiceClick(index)}
              >
                {service.icon} {service.title}
              </li>
            ))}
          </ul>
          <img
            src="https://cdn.pixabay.com/photo/2015/11/03/08/56/service-1019821_1280.jpg"
            alt="Service Visual"
            style={{
              flex: 1,
              maxWidth: "200px", // Set a max width
              height: "auto", // Maintain aspect ratio
              borderRadius: "10px", // Rounded corners
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow for depth
              objectFit: "cover", // Cover the area without distortion
            }}
          />
        </div>
        {/* Services Section */}
        <div style={pageStyles.services}>
          {services.map((service, index) => (
            <div id={`service-${index}`} key={index}>
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      {/* Footer Section */}
      <footer style={pageStyles.footer}>
        <div style={pageStyles.footerContent}>
          <p style={pageStyles.footerText}>
            © 2025 Smart Complaints System. All Rights Reserved.
          </p>
          {/* Contact Information */}
          <div style={{ marginBottom: "20px" }}>
            <h4 style={pageStyles.footerHeader}>Contact Us</h4>
            <p>Email: smartcomplaintsportal@outlook.com</p>
            <p>Phone: +91 8073935297</p>
            <p>For Complaints: +91 8073935297</p>
            <p>For Technical Support: +91 8073935297</p>
            <p>Email Support: smartcomplaintsportal@outlook.com</p>
          </div>
          {/* Quick Links */}
          <div>
            <h4 style={pageStyles.footerHeader}>Quick Links</h4>
            <div style={pageStyles.footerLinks}>
              <a href="/about" style={pageStyles.footerLink}>
                About Us
              </a>
              <a href="/contact" style={pageStyles.footerLink}>
                Contact
              </a>
              <a href="/UserLogin" style={pageStyles.footerLink}>
                User Login
              </a>
              <a href="/AdminLogin" style={pageStyles.footerLink}>
                Admin Login
              </a>
              <a href="/TechnicianLogin" style={pageStyles.footerLink}>
                Technician Login
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          style={pageStyles.scrollToTopButton}
        >
          ↑ Top
        </button>
      )}
    </div>
  );
};

export default ServicesPage;