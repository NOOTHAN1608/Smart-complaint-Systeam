import React, { useState } from "react";
const FAQPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  // Expanded predefined answers
  const predefinedAnswers = {
    "service": "We provide a platform for managing complaints and feedback.",
    "track complaint": "You can track your complaint status in the 'Complaint Status' section.",
    "make payment": "Payments can be made in the 'Payment' section.",
    "more questions": "You can contact support for further assistance.",
    "provide feedback": "Please use the 'Feedback' section to share your thoughts.",
    "give complaints": "To give a complaint, navigate to the 'New Complaint' section and fill out the form.",
    "how to pay": "To make a payment, go to the 'Payment' section and follow the instructions provided.",
    "login": "You can log in by entering your credentials on the login page. If you don't have an account, please register first.",
    "contact technician": "To contact a technician, please reach out through the 'Contact Support' section, and our team will assist you.",
    "personal complaints": "You can submit personal complaints through the 'New Complaint' section, ensuring you provide all necessary details.",
    "public complaints": "Public complaints can be submitted in the same way as personal complaints. Please specify if it's a public issue.",
    "technician portal": "The technician portal allows technicians to view and manage complaints assigned to them. You can log in with your technician credentials.",
    "complaint status": "You can check the status of your complaint in the 'Complaint Status' section. Enter your complaint ID for more details.",
    "how to escalate": "If your complaint is not resolved, you can escalate it through the 'Escalate Complaint' option in your complaint details.",
    "how to update complaint": "To update your complaint, go to the 'My Complaints' section and select the complaint you wish to update.",
    "how to close complaint": "If your issue has been resolved, you can close your complaint in the 'My Complaints' section.",
    "technical support": "For technical support, please contact our support team via the 'Contact Support' section.",
    "how to register": "To register, click on the 'Register' button on the login page and fill in the required details.",
  };
  const handleSend = () => {
    if (input.trim() !== "") {
      const userInput = input.toLowerCase();
      const response = getResponse(userInput);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", text: input },
        { type: "bot", text: response },
      ]);
      setInput("");
    }
  };
  const getResponse = (input) => {
    for (const key in predefinedAnswers) {
      if (input.includes(key)) {
        return predefinedAnswers[key];
      }
    }
    return (
      <span>
        It's not a part of frequently asked questions. Let me send your question to the related team, or you can go to the Contact section{" "}
        <a
          href="http://localhost:3000/contact"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#ffffff", // Text color
            backgroundColor: "#FF5722", // Background color
            padding: "5px 10px", // Padding for the button effect
            borderRadius: "5px", // Rounded corners
            textDecoration: "none", // Remove underline
            transition: "background-color 0.3s", // Transition effect
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#E64A19")} // Hover effect
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF5722")} // Revert on mouse leave
        >
          Click me
        </a>
        .
      </span>
    );
  };
  return (
    <div className="faq-page">
      <div className="faq-container">
        <h1>FAQ Chat</h1>
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your question..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
      <style jsx>{`
        .faq-page {
          display: flex; /* Use flexbox for layout */
          width: 100vw; /* Full width */
          height: 100vh; /* Full height */
          background-color: black; /* Background color for the entire page */
          justify-content: center; /* Center the content */
          align-items: center; /* Center the content vertically */
        }
        .faq-container {
          padding: 20px;
          background: rgba(255, 255, 255, 0.1); /* Background color for the FAQ section */
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
          color: #ffffff;
          max-width: 600px; /* Set a maximum width for the container */
          width: 95%; /* Set width to 95% of the viewport */
        }
        .chat-box {
          max-height: 400px;
          overflow-y: auto;
          margin-bottom: 10px;
          padding: 10px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 5px;
        }
        .message {
          margin: 5px 0;
          padding: 10px;
          border-radius: 5px;
          color: black; /* Set message text color to black */
        }
        .user {
          background: #2196F3;
          color: black; /* Set user message text color to black */
          align-self: flex-end;
        }
        .bot {
          background: #4CAF50;
          color: black; /* Set bot message text color to black */
        }
        input {
          padding: 10px;
          border-radius: 5px;
          border: none;
          width: 80%;
          margin-right: 10px;
          color: black; /* Set input text color to black */
          background: rgba(255, 255, 255, 0.2); /* Optional: Set input background color */
        }
        button {
          padding: 10px;
          border-radius: 5px;
          border: none;
          background: #FF5722;
          color: white;
          cursor: pointer;
        }
        button:hover {
          background: #E64A19;
        }
      `}</style>
    </div>
  );
};
export default FAQPage;