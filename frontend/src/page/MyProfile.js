import React, { useState } from "react";
const FeedbackPage = () => {
  const [feedback, setFeedback] = useState({
    technicianId: "",
    technicianName: "",
    rating: 0,
    comments: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };
  const handleStarClick = (value) => {
    setFeedback({ ...feedback, rating: value });
  };
  const handleStarMouseEnter = (value) => {
    setHoveredStar(value);
  };
  const handleStarMouseLeave = () => {
    setHoveredStar(0);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.technicianId || !feedback.technicianName || !feedback.rating || !feedback.comments) {
      alert("Please fill in all fields.");
      return;
    }
    setSubmitted(true);
    console.log("Feedback submitted:", feedback);
  };
  const starColors = {
    1: "#90ee90",
    2: "#32cd32",
    3: "#228b22",
    4: "#006400",
    5: "#004d00",
  };
  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "100vh",
      padding: "20px",
      backgroundImage: "url('https://cdn.pixabay.com/photo/2019/07/14/15/43/bridge-4337422_1280.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    leftContent: {
      flex: "0 0 45%",
      padding: "20px",
      color: "white",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    formWrapper: {
      flex: "0 0 45%",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 250, 0.5)",
      color: "white",
      transition: "transform 0.3s",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "bold",
      color: "#ffcc00",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
    },
    description: {
      textAlign: "center",
      marginBottom: "20px",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      textTransform: "uppercase",
      background: "linear-gradient(45deg, #ff6b6b, #f7b733)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
      color: "white",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      color: "black",
      transition: "border-color 0.3s",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "16px",
      minHeight: "100px",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      color: "black",
      transition: "border-color 0.3s",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      transition: "background-color 0.3s, transform 0.2s",
    },
    successMessage: {
      textAlign: "center",
      color: "#28a745",
      fontWeight: "bold",
      marginTop: "20px",
    },
    star: {
      cursor: "pointer",
      fontSize: "24px",
      transition: "color 0.3s, transform 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
      transform: "scale(1.05)",
    },
    formWrapperHover: {
      transform: "scale(1.02)",
    },
  };
  return (
    <div style={styles.container}>
      <div style={styles.leftContent}>
        <h2>Your Feedback Matters!</h2>
        <p style={styles.description}>
          Providing feedback helps us improve our services and ensures that our technicians deliver the best possible experience.
        </p>
        <p style={styles.description}>
          Your insights are crucial for our continuous improvement and help us serve you better. Please share your thoughts and experiences!
        </p>
      </div>
      <div
        style={styles.formWrapper}
        onMouseEnter={(e) => (e.currentTarget.style.transform = styles.formWrapperHover.transform)}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <h1 style={styles.header}>Technician Feedback</h1>
        {submitted ? (
          <p style={styles.successMessage}>Thank you for your feedback!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="technicianId">
                Technician ID:
              </label>
              <input
                type="text"
                id="technicianId"
                name="technicianId"
                value={feedback.technicianId}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter technician's ID"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Rating:</label>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      ...styles.star,
                      color: feedback.rating >= star ? starColors[star] : "lightgray",
                      transform: hoveredStar === star ? "scale(1.2)" : "scale(1)",
                    }}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarMouseEnter(star)}
                    onMouseLeave={handleStarMouseLeave}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p>Your Rating: {feedback.rating}</p>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="comments">
                Comments:
              </label>
              <textarea
                id="comments"
                name="comments"
                value={feedback.comments}
                onChange={handleInputChange}
                style={styles.textarea}
                placeholder="Write your feedback here..."
              ></textarea>
            </div>
            <button
              type="submit"
              style={styles.button}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
                e.target.style.transform = styles.buttonHover.transform;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#007bff";
                e.target.style.transform = "scale(1)";
              }}
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default FeedbackPage;