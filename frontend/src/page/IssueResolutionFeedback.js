import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.7)", 
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 250, 0, 0.5)",
    color: "#fff",
    position: "relative", 
    zIndex: 1, 
    opacity: 0,
    transform: "translateY(-20px)", 
    transition: "opacity 0.5s ease, transform 0.5s ease", 
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
    color: "green",
  },
  formGroup: {
    marginBottom: "15px",
    width: "100%",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    color: "#000",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    color: "#000",
    resize: "vertical",
  },
  button: {
    padding: "10px 20px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    backgroundColor: "#007bff",
  },
  ratingContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    marginTop: "30px",
    color: "#fff",
  },
  background: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "url('https://cdn.pixabay.com/photo/2019/03/04/14/35/sydney-4034244_1280.jpg')", // Background image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 0,
  },
};
const IssueResolutionFeedback = () => {
  const [name, setName] = useState("");
  const [complaintType, setComplaintType] = useState("personal");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [isVisible, setIsVisible] = useState(false);  
  useEffect(() => {
    // Set the form to be visible after the component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800); // Delay for the animation to take effect
    return () => clearTimeout(timer);
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || rating === 0) {
      toast.error("Please fill out all fields.");
      return;
    }
    const feedbackData = {
      name,
      complaintType,
      rating,
      comments,
    };
    console.log("Feedback Submitted:", feedbackData);
    toast.success("Feedback submitted successfully!");
    setName("");
    setComplaintType("personal");
    setRating(0);
    setComments("");
  };
  return (
    <div>
      <div style={styles.background}></div>
      <div style={{ ...styles.container, opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(-20px)" }}>
        <h1 style={styles.header}>ISSUE RESOLUTION FEEDBACK</h1>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="complaintId" style={styles.label}>complaintId</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Complaint Type:</label>
            <select
              value={complaintType}
              onChange={(e) => setComplaintType(e.target.value)}
              style={styles.input}
            >
              <option value="personal">Personal Complaint</option>
              <option value="public">Public Complaint</option>
            </select>
          </div>
          <div style={styles.ratingContainer}>
            <label style={styles.label}>Rating of Issue Resolution:</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              style={styles.input}
            >
              <option value="0">Select Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="comments" style={styles.label}>Comments:</label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows="4"
              style={styles.textarea}
            />
          </div>
          <button type="submit" style={styles.button}>Submit Feedback</button>
        </form>
        <footer style={styles.footer}>
        <p>Give your feedback to help us improve! Thank You...</p>
         
        </footer>
      </div>
    </div>
  );
};
export default IssueResolutionFeedback;