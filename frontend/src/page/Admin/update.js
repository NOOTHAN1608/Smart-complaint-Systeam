
// AdminUpdate.js
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const AdminUpdate = () => {
  const [updateData, setUpdateData] = useState({
    image: "",
    text: "",
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUpdateData((prevState) => ({ ...prevState, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleTextChange = (e) => {
    setUpdateData((prevState) => ({ ...prevState, text: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/updateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Update successful!");
      } else {
        toast.error(result.message || "Failed to update content");
      }
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("Error updating content. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Admin Update</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image: </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div>
          <label>Thoughts: </label>
          <textarea value={updateData.text} onChange={handleTextChange} />
        </div>
        <button type="submit">Submit Update</button>
      </form>
    </div>
  );
};

export default AdminUpdate;