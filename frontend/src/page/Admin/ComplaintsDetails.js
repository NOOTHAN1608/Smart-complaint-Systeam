// import React from 'react';

// const ComplaintDetails = () => {
//   return (
//     <div>
//       <h1>Complaint Details</h1>
//       {/* Add your component logic here */}
//     </div>
//   );
// };

// export default ComplaintDetails;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const ComplaintDetails = () => {
//   const { complaintId } = useParams();
//   const [complaint, setComplaint] = useState(null);

//   useEffect(() => {
//     // Assuming you have a function to fetch the complaint details by ID
//     fetchComplaintDetails(complaintId);
//   }, [complaintId]);

//   const fetchComplaintDetails = async (id) => {
//     // Replace with your API call to fetch the detailed complaint data
//     const response = await fetch(`/api/complaints/${id}`);
//     const data = await response.json();
//     setComplaint(data);
//   };

//   if (!complaint) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>{complaint.title}</h1>
//       <p>{complaint.description}</p>
//       <p>{`${complaint.houseNumber}- ${complaint.houseName}-${complaint.streetName}-${complaint.city}-${complaint.pinCode}`}</p>
//       {/* Add buttons to hold/assign */}
//       <button>Assign</button>
//       <button>Hold</button>
//     </div>
//   );
// };

// export default ComplaintDetails;
