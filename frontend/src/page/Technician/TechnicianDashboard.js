import React, { useEffect, useState } from "react";
import {
  FaSignOutAlt,
  FaClipboardList,
  FaHome,
  FaServicestack,
  FaCreditCard,
  FaPhone,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
const TechnicianDashboard = () => {
  const [personalComplaints, setPersonalComplaints] = useState([]);
  const [publicComplaints, setPublicComplaints] = useState([]);
  const [acceptedComplaints, setAcceptedComplaints] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State to hold selected image for zoom
  const [activeWidget, setActiveWidget] = useState(null); // State to track active widget
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPersonalComplaints = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/personal-complaints`);
        const data = await response.json();
        setPersonalComplaints(data.personalComplaints);
      } catch (err) {
        console.error("Error fetching personal complaints:", err);
      }
    };
    const fetchPublicComplaints = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/public-complaints`);
        const data = await response.json();
        setPublicComplaints(data.publicComplaints);
      } catch (err) {
        console.error("Error fetching public complaints:", err);
      }
    };
    const fetchAcceptedComplaints = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/accepted-complaints`);
        const data = await response.json();
        setAcceptedComplaints(data.acceptedComplaints);
      } catch (err) {
        console.error("Error fetching accepted complaints:", err);
      }
    };
    fetchPersonalComplaints();
    fetchPublicComplaints();
    fetchAcceptedComplaints();
  }, []);
  const handleLogout = () => {
    navigate("/"); // Redirect to the home page
  };
  const handleImageClick = (image) => {
    setSelectedImage(image); // Set the clicked image to state
  };
  const closeModal = () => {
    setSelectedImage(null); // Clear the selected image
  };
  const handleWidgetClick = (widget) => {
    setActiveWidget(activeWidget === widget ? null : widget); // Toggle the active widget
  };
  // Function to handle accepting complaints
  const handleAcceptComplaint = (complaintId) => {
    // Navigate to the Accept Complaint page with the complaintId
    navigate("/AcceptComplaint", { state: { complaintId } });
  };
  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className="w-64 text-white flex flex-col"
        style={{
          backgroundImage: 'url("https://cdn.pixabay.com/photo/2013/12/31/17/06/light-bulb-236936_1280.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-4 text-center bg-gray-900 bg-opacity-75">
          <h1 className="text-2xl font-bold">Technician Dashboard</h1>
        </div>
        <nav className="flex-1">
          <ul>
            <li className="hover:bg-gray-700 transform transition-transform duration-300 hover:scale-105">
              <Link to="/" className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-white">
                <FaHome />
                Home
              </Link>
            </li>
            <li className="hover:bg-gray-700 transform transition-transform duration-300 hover:scale-105">
              <Link to="/service" className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-white">
                <FaServicestack />
                Services
              </Link>
            </li>
            <li className="hover:bg-gray-700 transform transition-transform duration-300 hover:scale-105">
              <Link to="/TechnicianPayment" className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-white">
                <FaCreditCard />
                Payment
              </Link>
            </li>
            <li className="hover:bg-gray-700 transform transition-transform duration-300 hover:scale-105">
              <Link to="/contact" className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-white">
                <FaPhone />
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <footer className="p-4 bg-gray-900 bg-opacity-75">
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 w-full bg-red-500 text-white rounded">
            <FaSignOutAlt />
            Logout
          </button>
        </footer>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main
          className="p-6 flex-1 overflow-y-auto"
          style={{
            backgroundImage: 'url("https://cdn.pixabay.com/photo/2019/10/20/11/51/mountains-4563464_1280.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Accepted Complaints Widget */}
            <div className="bg-black bg-opacity-50 rounded shadow p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-gray-700 hover:shadow-lg duration-300 ease-in-out cursor-pointer" onClick={() => handleWidgetClick("accepted")}>
              <FaClipboardList className="text-4xl text-green-500 mb-4" />
              <h3 className="text-lg font-bold text-white">Accepted Complaints</h3>
              <p className="text-2xl font-bold text-white">{acceptedComplaints.length}</p>
            </div>
            {/* Personal Complaints Widget */}
            <div className="bg-black bg-opacity-50 rounded shadow p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-gray-700 hover:shadow-lg duration-300 ease-in-out cursor-pointer" onClick={() => handleWidgetClick("personal")}>
              <FaClipboardList className="text-4xl text-purple-500 mb-4" />
              <h3 className="text-lg font-bold text-white">Personal Complaints</h3>
              <p className="text-2xl font-bold text-white">{personalComplaints.length}</p>
            </div>
            {/* Public Complaints Widget */}
            <div className="bg-black bg-opacity-50 rounded shadow p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-gray-700 hover:shadow-lg duration-300 ease-in-out cursor-pointer" onClick={() => handleWidgetClick("public")}>
              <FaClipboardList className="text-4xl text-red-500 mb-4" />
              <h3 className="text-lg font-bold text-white">Public Complaints</h3>
              <p className="text-2xl font-bold text-white">{publicComplaints.length}</p>
            </div>
          </div>
          {/* Conditional Rendering of Content */}
          {activeWidget === "accepted" && (
            <>
              <h3 className="text-xl font-bold mt-8 mb-4">Accepted Complaints</h3>
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="px-6 py-3 text-left text-lg font-medium text-yellow-300">Technician ID</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-yellow-300">Complaint Id</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-yellow-300">Days</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-yellow-300">Hours</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-yellow-300">Cost(rs)</th>
                  </tr>
                </thead>
                <tbody>
                  {acceptedComplaints.map((complaint) => (
                    <tr key={complaint._id} className="hover:bg-gray-700">
                      <td className="px-6 py-3 text-md text-green-100">{complaint.technicianId}</td>
                      <td className="px-6 py-3 text-md text-blue-500">{complaint.complaintId}</td>
                      <td className="px-6 py-3 text-md text-green-300">{complaint.days}</td>
                      <td className="px-6 py-3 text-md text-green-400">{complaint.hours}</td>
                      <td className="px-6 py-3 text-md text-green-500">{complaint.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {activeWidget === "personal" && (
            <>
              <h3 className="text-xl font-bold mt-8 mb-4">Personal Complaints</h3>
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="px-6 py-3 text-left text-lg font-medium text-yellow-300">Complaint Type</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-yellow-300">Complaint ID</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-yellow-300">Title</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-yellow-300">Description</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-yellow-300">Location</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-yellow-300">Image</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-yellow-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {personalComplaints.map((complaint) => (
                    <tr key={complaint._id} className="hover:bg-gray-700">
                      <td className="px-6 py-3 text-md text-red-300">{complaint.type}</td>
                      <td className="px-6 py-3 text-md text-green-500">{complaint.complaintId}</td>
                      <td className="px-6 py-3 text-md text-red-500">{complaint.title}</td>
                      <td className="px-6 py-3 text-md text-white">{complaint.description}</td>
                      <td className="px-6 py-3 text-md text-white">{`${complaint.houseNumber}, ${complaint.houseName}, ${complaint.streetName}, ${complaint.city}, ${complaint.pinCode}`}</td>
                      <td className="px-6 py-3 text-md">
                        {complaint.photo && (
                          <img
                            src={complaint.photo}
                            alt={complaint.title}
                            className="w-16 h-16 cursor-pointer"
                            onClick={() => handleImageClick(complaint.photo)} // Handle image click
                          />
                        )}
                      </td>
                      <td className="px-6 py-3 text-md">
                        <button className="text-yellow-100 hover:text-green-800" onClick={() => handleAcceptComplaint(complaint._id)}>
                          Accept Complaint
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {activeWidget === "public" && (
            <>
              <h3 className="text-xl font-bold mt-8 mb-4">Public Complaints</h3>
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="px-6 py-3 text-left text-lg font-medium text-yellow-300">Complaint Type</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-yellow-300">Title</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-yellow-300">Description</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-yellow-300">Location</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-yellow-300">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {publicComplaints.map((complaint) => (
                    <tr key={complaint._id} className="hover:bg-gray-700">
                      <td className="px-6 py-3 text-md text-white">{complaint.type}</td>
                      <td className="px-6 py-3 text-md text-white">{complaint.title}</td>
                      <td className="px-6 py-3 text-md text-white">{complaint.description}</td>
                      <td className="px-6 py-3 text-md text-white">{`${complaint.streetNumber}, ${complaint.streetName}, ${complaint.city}, ${complaint.pinCode}`}</td>
                      <td className="px-6 py-3 text-md">
                        {complaint.photo && (
                          <img
                            src={complaint.photo}
                            alt={complaint.title}
                            className="w-16 h-16 cursor-pointer"
                            onClick={() => handleImageClick(complaint.photo)} // Handle image click
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </main>
      </div>
      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={closeModal}>
          <img src={selectedImage} alt="Zoomed" className="max-w-full max-h-full" />
        </div>
      )}
    </div>
  );
};
export default TechnicianDashboard;