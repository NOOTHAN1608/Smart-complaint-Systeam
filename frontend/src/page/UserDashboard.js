import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const pageContainerStyle = {
  width: "100vw",
  height: "100vh",
  overflowY: "auto",
  padding: "20px",
  color: "#ffffff",
  boxSizing: "border-box",
};
function UserDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const backgroundImages = [
    "https://cdn.pixabay.com/photo/2019/07/21/15/07/sunset-4352934_1280.jpg",
  ];
  const cards = [
    {
      title: "Complaint Status",
      description: "Track and manage your complaints with ease.",
      img: "https://img.freepik.com/free-vector/seo-analytics-concept-illustration_114360-9862.jpg",
      link: "/ComplaintTracking",
    },
    {
      title: "Payment History",
      description: "View and download your payment history.",
      img: "https://img.freepik.com/free-vector/mobile-payments-concept-illustration_114360-2513.jpg",
      link: "/UserPaymentHistory",
    },
    {
      title: "Fetch Complaint id",
      description: "Stay updated with the latest notifications.",
      img: "https://img.freepik.com/free-vector/push-notifications-concept-illustration_114360-7195.jpg",
      link:"/Complaint",
    },
    {
      title: "Feedback",
      description: "Provide feedback to improve our offerings.",
      img: "https://img.freepik.com/free-vector/feedback-loop-concept-illustration_114360-15497.jpg",
      link: "/Myprofile",
    },
    {
      title: "Upcoming Events",
      description: "Check out upcoming community events and activities.",
      img: "https://img.freepik.com/free-vector/cannceled-events-announcement_23-2148571975.jpg",
      link: "/",
    },
    {
      title: "FAQs",
      description: "Find answers to frequently asked questions.",
      img: "https://img.freepik.com/free-vector/faq-concept_23-2148147003.jpg",
      link: "/faq", 
    },
    {
      title: "Issue Resolution Feedback",
      description: "Resolve complaints faster with automated escalation.",
      img: "https://img.freepik.com/free-vector/illustrated-man-booking-appointment-smartphone_23-2148562857.jpg",
      link:"/IssueResolutionFeedback"
    },
    {
      title: "Contact Support",
      description: "Reach out to our support team for assistance.",
      img: "https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg",
      link: "/contact",
    },
    {
      title: "Personal Complaints",
      description: "Submit and track your personal complaints directly.",
      img: "https://img.freepik.com/free-vector/complaint-concept-illustration_114360-1283.jpg",
      link: "/NewComplaint",
    },
    {
      title: "Public Complaints",
      description: "View and engage with public complaints in your area.",
      img: "https://img.freepik.com/free-vector/city-complaints-concept-illustration_114360-1284.jpg",
      link: "/NewComplaint",
    },
    {
      title: "Technician Support",
      description: "Get technical assistance for your complaints.",
      img: "https://img.freepik.com/free-vector/technical-support-concept-illustration_114360-1285.jpg",
      link: "/TechnicianSupport",
    },
    {
      title: "Technician Review Feedback",
      description: "Provide feedback on technician performance.",
      img: "https://img.freepik.com/free-vector/review-feedback-concept-illustration_114360-1286.jpg",
      link: "/Myprofile",
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 8000); 
    return () => clearInterval(interval);
  }, [backgroundImages.length]);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const handleLogout = () => navigate("/"); 
  return (
    <div
      className="dashboard-container"
      style={{
        ...pageContainerStyle,
        backgroundImage: `url(${backgroundImages[currentBackgroundIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {isSidebarOpen && (
        <div className="sidebar">
          <button className="menu-button" onClick={toggleSidebar}>
            ✖ Close
          </button>
          <div className="menu">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/Service">Services</a></li>
              <li><a href="/NewComplaint">Complaints</a></li>
              <li><a href="/UserPayment">Payment</a></li>
              <li><a href="/Myprofile">Feedback</a></li>
              <li>
                <button className="faq-button" onClick={() => navigate("/faq")}>
                  FAQs
                </button>
              </li>
              <li>
                <button className="logout-button" onClick={handleLogout}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      <button
        className={`menu-button-open ${isSidebarOpen ? "hidden" : ""}`}
        onClick={toggleSidebar}
      >
        ☰ Menu
      </button>
      <div className="content">
        <header>
          <div className="header-banner">
            <h1>Welcome to User Dashboard!</h1>
            <p>
              Quickly report and monitor your complaints with our smart system.
              We ensure timely resolutions to keep your community functioning smoothly.
            </p>
          </div>
        </header>
        <div className="main-content">
          {cards.map((card, index) => (
            <div
              className={`card card-${index}`}
              key={index}
              onClick={() => card.link && navigate(card.link)} 
              style={{ cursor: card.link ? 'pointer' : 'default' }} 
            >
              <img src={card.img} alt={card.title} />
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          font-family: "Arial", sans-serif;
          color: #ffffff;
          position: relative;
        }
        .sidebar {
          width: 250px;
          color: #ffffff;
          padding: 20px;
          background: rgba(0, 0, 0, 0.7);
          transition: transform 0.3s ease;
          z-index: 2;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
        .menu-button {
          background-color: #ff5722;
          border: none;
          color: white;
          font-size: 16px;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .logout-button {
          background-color: #d32f2f;
          border: none;
          color: white;
          font-size: 16px;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-top: 15px;
        }
        .faq-button {
          background-color: #2196F3;
          border: none;
          color: white;
          font-size: 16px;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-top: 15px;
        }
        .faq-button:hover {
          background-color: #1976D2;
        }
        .logout-button:hover {
          background-color: #b71c1c;
        }
        .menu ul {
          list-style: none;
          padding: 0;
        }
        .menu ul li {
          margin: 15px 0;
        }
        .menu ul li a {
          color: #ffffff;
          text-decoration: none;
          font-size: 16px;
          padding: 10px;
          display: block;
          border-radius: 5px;
          transition: background 0.3s;
        }
        .menu ul li a:hover {
          background-color: #555;
        }
        .menu-button-open {
          position: fixed;
          top: 20px;
          left: 20px;
          background-color: #4caf50;
          color: white;
          font-size: 18px;
          padding: 12px 20px;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0px 4px 10px rgba(0, 0, 250, 0.7);
          transition: background-color 0.3s, transform 0.2s;
          z-index: 1000;
        }
        .menu-button-open.hidden {
          display: none;
        }
        .menu-button-open:hover {
          background-color: #45a049;
          transform: scale(1.1);
        }
        .content {
          flex-grow: 1;
          padding: 20px;
          border-radius: 10px;
          margin: 20px;
          position: relative;
          z-index: 2;
          background: rgba(0, 0, 0, 0.6);
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
        }
        .header-banner {
          text-align: center;
          padding: 40px;
          background: linear-gradient(45deg, rgba(0, 0, 250, 0.5), rgba(0, 0, 0, 0.5));
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        }
        .header-banner h1 {
          font-size: 2.5rem;
          margin: 0;
        }
        .header-banner p {
          font-size: 1.2rem;
          margin-top: 10px;
        }
        .main-content {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .card {
          background: rgba(250, 250, 250, 0.1);
          padding: 10px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 250, 0, 0.5);
        }
        .card img {
          width: 100%;
          height: auto;
          border-radius: 5px;
          margin-bottom: 10px; 
        }
        .card h2 {
          font-size: 1.5rem;
          margin: 0;
          color: #ffcc00;
        }
        .card p {
          margin-top: 5px; 
          font-size: 0.9rem; 
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
export default UserDashboard;