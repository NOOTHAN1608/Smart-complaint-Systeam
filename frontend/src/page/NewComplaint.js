import React, { useState } from "react";
import { ImagetoBase64 } from "../utility/ImagetoBase64"; // Ensure this utility is correctly implemented
import { toast } from "react-hot-toast";
const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    maxWidth: "1200px",
    margin: "auto",
    color: "#fff",
  },
  content: {
    width: "45%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0,250,0,1)",
    animation: "slideDown 10s ease",
  },
  formContainer: {
    width: "45%",
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    color: "#fff",
    animation: "slideDown 2s ease",
  },
  marquee: {
    backgroundColor: "yellow",
    color: "red",
    height: "40px",
    padding: "10px",
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "20px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "15px",
  },
  header: {
    color: "#fff",
    fontSize: "30px",
  },
  subHeader: {
    color: "#fff",
    fontSize: "24px",
  },
  instruction: {
    color: "#ffcc00",
    fontSize: "18px",
    marginBottom: "10px",
  },
  buttonContainer: {
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  personalButton: {
    backgroundColor: "#007bff",
  },
  publicButton: {
    backgroundColor: "#28a745",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 250, 0, 1)",
    color: "#fff",
  },
  formGroup: {
    marginBottom: "15px",
    width: "100%",
    textAlign: "left",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "red",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    color: "green",
    backgroundColor: "transparent",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    color: "white",
    backgroundColor: "transparent",
    resize: "vertical",
  },
  fileInput: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    color: "white",
    backgroundColor: "transparent",
    border: "1px solid #ccc",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    color: "#fff",
    marginTop: "30px",
    borderRadius: "8px",
  },
};
const ComplaintForm = () => {
  const [activeForm, setActiveForm] = useState("personal");
  const [personalComplaint, setPersonalComplaint] = useState({
    title: "",
    description: "",
    houseNumber: "",
    houseName: "",
    streetName: "",
    city: "",
    pinCode: "",
    photo: "",
    type: "",
  });
  const [publicComplaint, setPublicComplaint] = useState({
    title: "",
    description: "",
    streetNumber: "",
    streetName: "",
    city: "",
    pinCode: "",
    photo: "",
    type: "",
  });
  const handleChange = async (event, type) => {
    const { name, value, files } = event.target;
    const file = files ? files[0] : null;
    if (file) {
      const base64Image = await ImagetoBase64(file);
      if (type === "personal") {
        setPersonalComplaint((prevState) => ({
          ...prevState,
          [name]: base64Image,
        }));
      } else if (type === "public") {
        setPublicComplaint((prevState) => ({
          ...prevState,
          [name]: base64Image,
        }));
      }
    } else {
      if (type === "personal") {
        setPersonalComplaint((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      } else if (type === "public") {
        setPublicComplaint((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };
  const validateForm = (complaintData) => {
    if (!complaintData.photo) {
      toast.error("Please upload a photo.");
      return false;
    }
    return (
      complaintData.title.trim() !== "" &&
      complaintData.description.trim() !== "" &&
      (activeForm === "personal"
        ? complaintData.houseNumber.trim() !== "" &&
          complaintData.houseName.trim() !== "" &&
          complaintData.streetName.trim() !== "" &&
          complaintData.city.trim() !== "" &&
          complaintData.pinCode.trim() !== ""
        : complaintData.streetNumber.trim() !== "" &&
          complaintData.streetName.trim() !== "" &&
          complaintData.city.trim() !== "" &&
          complaintData.pinCode.trim() !== "") &&
      complaintData.type.trim() !== ""
    );
  };
  //999
  function base64ToBlob(base64Data, contentType = 'image/jpeg') {
    const byteCharacters = atob(base64Data.split(',')[1]);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }
  //999
  const submitComplaint = async (event, type) => {
    event.preventDefault();
    const complaintData = type === "personal" ? personalComplaint : publicComplaint;
    if (!validateForm(complaintData)) {
      toast.error("Please fill all required fields correctly. Ensure correct information!");
      return;
    }
    const formData = new FormData();
    //999
    formData.append('complaintType', type);
    formData.append('complaintData', JSON.stringify(complaintData));
    formData.append('photo', complaintData.photo); // Ensure the photo is appended correctly
    //999
    // const blob = base64ToBlob(complaintData.photo); // complaintData is JSON stringified
    // const file = new File([blob], 'complaint.jpg', { type: 'image/jpeg' });
    // formData.append('photo', file);
    // formData.append('complaintData', JSON.stringify({ ...complaintData, photo: undefined }));
    // formData.append('complaintType', type);
    
    //999
    try {
      const response = await fetch("http://localhost:8080/submitComplaint", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Complaint submitted successfully!");
        resetForm(type);
      } else {
        toast.error(result.message || "Failed to submit complaint");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error("Error submitting complaint. Please try again later.");
    }
  };
  const resetForm = (type) => {
    if (type === "personal") {
      setPersonalComplaint({
        title: "",
        description: "",
        houseNumber: "",
        houseName: "",
        streetName: "",
        city: "",
        pinCode: "",
        photo: "",
        type: "",
      });
    } else if (type === "public") {
      setPublicComplaint({
        title: "",
        description: "",
        streetNumber: "",
        streetName: "",
        city: "",
        pinCode: "",
        photo: "",
        type: "",
      });
    }
  };
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All information will be cleared.")) {
      resetForm(activeForm);
    }
  };
  const renderForm = (type) => {
    const complaintData = type === "personal" ? personalComplaint : publicComplaint;
    const submitButtonColor = type === "personal" ? "#007bff" : "#28a745";
    return (
      <form onSubmit={(e) => submitComplaint(e, type)} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor={`${type}-type`} style={styles.label}>Type of Complaint:</label>
          <select
            id={`${type}-type`}
            name="type"
            value={complaintData.type}
            onChange={(e) => handleChange(e, type)}
            required
            style={styles.input}
          >
            <option value="">Select Type</option>
            <option value="Electrical Problem">Electrical Problem</option>
            <option value="Water Problem">Water Problem</option>
            <option value="Drainage Problem">Drainage Problem</option>
            <option value="Road Problems">Road Damage Problem</option>
            <option value="Others">Others...</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor={`${type}-title`} style={styles.label}>Title of the Complaint:</label>
          <input
            type="text"
            id={`${type}-title`}
            name="title"
            value={complaintData.title}
            onChange={(e) => handleChange(e, type)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor={`${type}-description`} style={styles.label}>Description:</label>
          <textarea
            id={`${type}-description`}
            name="description"
            value={complaintData.description}
            onChange={(e) => handleChange(e, type)}
            required
            style={styles.textarea}
          />
        </div>
        {type === "personal" ? (
          <>
            <div style={styles.formGroup}>
              <label htmlFor="houseNumber" style={styles.label}>House Number:</label>
              <input
                type="text"
                id="houseNumber"
                name="houseNumber"
                value={complaintData.houseNumber}
                onChange={(e) => handleChange(e, type)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="houseName" style={styles.label}>House Name:</label>
              <input
                type="text"
                id="houseName"
                name="houseName"
                value={complaintData.houseName}
                onChange={(e) => handleChange(e, type)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="streetName" style={styles.label}>Street Name:</label>
              <input
                type="text"
                id="streetName"
                name="streetName"
                value={complaintData.streetName}
                onChange={(e) => handleChange(e, type)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="city" style={styles.label}>City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={complaintData.city}
                onChange={(e) => handleChange(e, type)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="pinCode" style={styles.label}>Pin Code:</label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                value={complaintData.pinCode}
                onChange={(e) => handleChange(e, type)}
                required
                style={styles.input}
              />
            </div>
          </>
        ) : (
          <>
            <div style={styles.formGroup}>
              <label htmlFor="streetNumber" style={styles.label}>Street Number:</label>
              <input
                type="text"
                id="streetNumber"
                name="streetNumber"
                value={complaintData.streetNumber}
                onChange={(e) => handleChange(e, type)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="streetName" style={styles.label}>Street Name:</label>
              <input
                type="text"
                id="streetName"
                name="streetName"
                value={complaintData.streetName}
                onChange={(e) => handleChange(e, type)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="city" style={styles.label}>City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={complaintData.city}
                onChange={(e) => handleChange(e, type)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="pinCode" style={styles.label}>Pin Code:</label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                value={complaintData.pinCode}
                onChange={(e) => handleChange(e, type)}
                required
                style={styles.input}
              />
            </div>
          </>
        )}
        <div style={styles.formGroup}>
          <label htmlFor={`${type}-photo`} style={styles.label}>Upload Photo:</label>
          <input
            type="file"
            id={`${type}-photo`}
            name="photo"
            onChange={(e) => handleChange(e, type)}
            accept="image/*"
            required
            style={styles.fileInput}
          />
        </div>
        <div style={styles.buttonGroup}>
          <button type="submit" style={{ ...styles.button, backgroundColor: submitButtonColor }}>
            {type === "personal" ? "Personal Submit" : "Public Submit"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={{ ...styles.button, backgroundColor: "#dc3545" }}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };
  const pageContainerStyle = {
    width: "100vw",
    height: "100vh",
    overflowY: "auto",
    padding: "20px",
    backgroundImage: "url('https://cdn.pixabay.com/photo/2018/05/18/22/33/fountain-3412242_1280.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "#ffffff",
    boxSizing: "border-box",
  };
  return (
    <div style={pageContainerStyle}>
      <marquee style={styles.marquee}>
        Warning: Please ensure all information is accurate before submitting your complaint!
      </marquee>
      <div style={styles.container}>
        <div style={styles.content}>
          <h2 style={styles.header}>How to Apply</h2>
          <p>To fill out the complaint form correctly, please follow these instructions:</p>
          <ul style={{ color: "#ffcc00", fontSize: "18px" }}>
            <li>1. Ensure all fields are filled in accurately.</li>
            <li>2. Provide a clear and concise title for your complaint.</li>
            <li>3. Describe your complaint in detail in the description box.</li>
            <li>4. Upload any relevant photos to support your complaint.</li>
          </ul>
          <p style={styles.header}>
            <strong>Tips for Personal Complaints:</strong>
          </p>
          <ul style={{ color: "#ffcc00", fontSize: "18px" }}>
            <li>1. Clearly state the nature of your complaint in the title.</li>
            <li>2. In the description, provide a detailed account of the issue, including dates, times, and any conversations that may have occurred related to the complaint.</li>
            <li>3. Attach any relevant documents or images that support your complaint.</li>
          </ul>
          <p style={styles.header}>
            <strong>Tips for Public Complaints:</strong>
          </p>
          <ul style={{ color: "#ffcc00", fontSize: "18px" }}>
            <li>1. Specify the exact location of the issue, including street names, landmarks, or GPS coordinates if possible.</li>
            <li>2. Describe the problem in detail, including how it affects the community and any immediate dangers it may pose.</li>
            <li>3. Mention any previous reports or complaints made about the same issue, including any reference numbers or responses received.</li>
            <li>4. Encourage community members to report similar issues, as collective feedback can expedite action.</li>
          </ul>
        </div>
        <div style={styles.formContainer}>
          <h1 style={styles.header}>NEW COMPLAINTS</h1>
          <div style={styles.buttonContainer}>
            <button
              onClick={() => setActiveForm("personal")}
              style={{ ...styles.button, ...styles.personalButton, marginRight: "10px" }}
            >
              Personal Complaints
            </button>
            <button
              onClick={() => setActiveForm("public")}
              style={{ ...styles.button, ...styles.publicButton }}
            >
              Public Complaints
            </button>
          </div>
          {activeForm && (
            <div>
              <h2 style={styles.subHeader}>
                {activeForm === "personal" ? "Personal Complaint" : "Public Complaint"}
              </h2>
              {renderForm(activeForm)}
            </div>
          )}
        </div>
      </div>
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};
const slideDownAnimation = `
@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = slideDownAnimation;
document.head.appendChild(styleSheet);
export default ComplaintForm;