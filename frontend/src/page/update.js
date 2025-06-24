
// UserUpdate.js
import React, { useEffect, useState } from "react";

const UserUpdate = () => {
  const [updateData, setUpdateData] = useState({ image: "", text: "" });

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch("http://localhost:8080/getLatestUpdate");
        const data = await response.json();
        if (response.ok) {
          setUpdateData(data);
        } else {
          console.error("Failed to fetch updates");
        }
      } catch (error) {
        console.error("Error fetching updates:", error);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <div>
      <h1>User Updates</h1>
      <div>
        {updateData.image && (
          <img src={updateData.image} alt="Update" style={{ width: "300px" }} />
        )}
        <p>{updateData.text}</p>
      </div>
    </div>
  );
};

export default UserUpdate;