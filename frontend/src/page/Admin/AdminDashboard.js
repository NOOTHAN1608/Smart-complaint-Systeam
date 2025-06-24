import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaChartPie,
  FaSignOutAlt,
  FaUsers,
  FaClipboardList,
  FaTrashAlt,
  FaCreditCard,
  FaBell,
  FaMoneyBillWave,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPersonalComplaints, setTotalPersonalComplaints] = useState(0);
  const [totalPublicComplaints, setTotalPublicComplaints] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [personalComplaints, setPersonalComplaints] = useState([]);
  const [publicComplaints, setPublicComplaints] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedWidget, setSelectedWidget] = useState("recentActivities");
  const navigate = useNavigate();
  const slideContent = [
    { title: "Public Content", description: "Manage and view public content here." },
    { title: "Private Content", description: "Manage and view private content here." },
    { title: "Contact", description: "Contact details and support." },
    { title: "Payment", description: "Payment and billing information." },
    { title: "Updates", description: "Manage system updates and notifications." },
  ];
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/total-users`);
        const data = await response.json();
        setTotalUsers(data.totalUsers);
      } catch (err) {
        console.error("Error fetching total users:", err);
      }
    };
    const fetchTotalPersonalComplaints = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/total-personal-complaints`);
        const data = await response.json();
        setTotalPersonalComplaints(data.totalPersonalComplaints);
      } catch (err) {
        console.error("Error fetching total personal complaints:", err);
      }
    };
    const fetchTotalPublicComplaints = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/total-public-complaints`);
        const data = await response.json();
        setTotalPublicComplaints(data.totalPublicComplaints);
      } catch (err) {
        console.error("Error fetching total public complaints:", err);
      }
    };
    const fetchPayments = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/payments`);
        const data = await response.json();
        console.log("Payments fetched:", data); // Log the fetched data
        setPayments(data.payments);
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };
    const fetchRecentActivities = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/user-signup-activities`);
        const data = await response.json();
        setRecentActivities(data);
      } catch (err) {
        console.error("Error fetching recent activities:", err);
      }
    };
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
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/contacts`);
        const data = await response.json();
        setContacts(data.contacts);
        setTotalContacts(data.contacts.length);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };
    fetchTotalUsers();
    fetchTotalPersonalComplaints();
    fetchTotalPublicComplaints();
    fetchRecentActivities();
    fetchPersonalComplaints();
    fetchPublicComplaints();
    fetchContacts();
    fetchPayments(); // Fetch payments on component mount
  }, []);
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slideContent.length - 1 : prev - 1));
  };
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slideContent.length - 1 ? 0 : prev + 1));
  };
  const handleDeleteActivity = async (activityId) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/delete-activity/${activityId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setRecentActivities(recentActivities.filter((activity) => activity._id !== activityId));
        } else {
          console.error("Error deleting activity");
        }
      } catch (err) {
        console.error("Error deleting activity:", err);
      }
    }
  };
  const handleAssignComplaint = async (complaintId) => {
    console.log(`Assigning complaint with ID: ${complaintId}`);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/assign-complaint/${complaintId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ /* Add any necessary data here */ }),
      });
      if (response.ok) {
        console.log('Complaint assigned successfully');
      } else {
        console.error('Error assigning complaint');
      }
    } catch (err) {
      console.error('Error during assignment:', err);
    }
  };
  const handleLogout = () => {
    navigate("/"); // Redirect to the home page
  };
  const handleWidgetClick = (widget) => {
    setSelectedWidget(widget); // Update selected widget
    if (widget === "payment") {
      // Fetch payments when the payment widget is clicked
    }
  };
  const handleReply = (contact) => {
    const email = contact.email || contact.gmail; // Adjust based on your actual data structure
    if (!email) {
      console.error("No email address provided for contact.");
      return;
    }
    const subject = "Reply from Smart Complaints System - Welcome to my portal";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=Hi ${contact.fullName},%0D%0A%0D%0A`; // Customize as needed
  };
  // Calculate total payments
  const calculateTotalPayments = () => {
    return payments.reduce((total, payment) => total + payment.cost, 0).toFixed(2);
  };
  return (
    <div className="h-screen flex bg-gray-100">
      <aside
        className="w-64 text-white flex flex-col"
        style={{
          backgroundImage: 'url("https://cdn.pixabay.com/photo/2018/10/07/21/03/lantern-3731337_1280.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-4 text-center bg-gray-1000 bg-opacity-75">
          <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
        </div>
        <nav className="flex-1">
          <ul>
            <li className="hover:bg-gray-700 transform transition-transform duration-300 hover:scale-105">
              <Link to="/technician/technicianDashboard" className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-black">
                <FaChartPie />
                Technicians
              </Link>
            </li>
            <li className="hover:bg-gray-700 transform transition-transform duration-300 hover:scale-105">
              <Link to="/UserDashboard" className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-black">
                <FaUsers />
                Users
              </Link>
            </li>
            <li className="hover:bg-gray-700 transform transition-transform duration-300 hover:scale-105">
              <Link to="/AdminPayment" className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-black">
                <FaMoneyBillWave />
                Payment
              </Link>
            </li>
          </ul>
        </nav>
        <footer className="p-4 bg-gray-1000">
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 w-full bg-red-500 text-white rounded">
            <FaSignOutAlt />
            Logout
          </button>
        </footer>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-black bg-opacity-60 shadow px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Welcome, Admin......</h2>
          <div className="flex items-center gap-4">
            <FaUserCircle className="text-2xl text-gray-700" />
            <button className="text-gray-700 hover:text-gray-900">
              <FaBell className="text-2xl" />
            </button>
          </div>
        </header>
        {/* Dashboard Content */}
        <main
          className="p-6 flex-1 overflow-y-auto"
          style={{
            backgroundImage: 'url("https://cdn.pixabay.com/photo/2020/12/02/10/30/hike-5796976_1280.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Widgets */}
            <div className="bg-black bg-opacity-50 rounded shadow p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-gray-700 hover:shadow-lg duration-300 ease-in-out">
              <FaUsers className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-lg font-bold text-white">Total Users</h3>
              <p className="text-2xl font-bold text-white">{totalUsers}</p>
            </div>
            <div
              onClick={() => handleWidgetClick("personalComplaints")}
              className="bg-black bg-opacity-50 rounded shadow p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-gray-700 hover:shadow-lg duration-300 ease-in-out"
            >
              <FaClipboardList className="text-4xl text-purple-500 mb-4" />
              <h3 className="text-lg font-bold text-white">Personal Complaints</h3>
              <p className="text-2xl font-bold text-white">{totalPersonalComplaints}</p>
            </div>
            <div
              onClick={() => handleWidgetClick("publicComplaints")}
              className="bg-black bg-opacity-50 rounded shadow p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-gray-700 hover:shadow-lg duration-300 ease-in-out"
            >
              <FaClipboardList className="text-4xl text-red-500 mb-4" />
              <h3 className="text-lg font-bold text-white">Public Complaints</h3>
              <p className="text-2xl font-bold text-white">{totalPublicComplaints}</p>
            </div>
            <div
              onClick={() => handleWidgetClick("contact")}
              className="bg-black bg-opacity-50 rounded shadow p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-gray-700 hover:shadow-lg duration-300 ease-in-out"
            >
              <FaUserCircle className="text-4xl text-green-500 mb-4" />
              <h3 className="text-lg font-bold text-white">Contact Us</h3>
              <p className="text-2xl font-bold text-white">{totalContacts}</p>
            </div>
            <div
              onClick={() => handleWidgetClick("payment")}
              className="bg-black bg-opacity-50 rounded shadow p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-gray-700 hover:shadow-lg duration-300 ease-in-out"
            >
              <FaCreditCard className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-lg font-bold text-white">Payment</h3>
              <p className="text-2xl font-bold text-white">${calculateTotalPayments()}</p>
              <p className="text-sm text-gray-400">Credit total Amount</p>
            </div>
            <div
              onClick={() => handleWidgetClick("newComplaints")}
              className="bg-black bg-opacity-50 rounded shadow p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-gray-700 hover:shadow-lg duration-300 ease-in-out"
            >
              <FaClipboardList className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-lg font-bold text-white">New Complaints</h3>
              <p className="text-2xl font-bold text-white">{0}</p>
            </div>
          </div>
          <div className="mt-8 bg-black bg-opacity-50 rounded shadow transition-transform transform hover:scale-105 duration-300 ease-in-out">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-bold text-white">
                {slideContent[currentSlide].title}
              </h3>
            </div>
            <div className="px-6 py-4">
              <p className="text-white">
                {slideContent[currentSlide].description}
              </p>
            </div>
            <div className="flex justify-between px-6 py-4">
              <button
                onClick={handlePrevSlide}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Previous
              </button>
              <button
                onClick={handleNextSlide}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </div>
          {/* Widget Content Section */}
          <div className="mt-8 bg-black bg-opacity-50 rounded shadow">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-bold text-white">
                {selectedWidget === "personalComplaints"
                  ? "Personal Complaints Details"
                  : selectedWidget === "publicComplaints"
                  ? "Public Complaints Details"
                  : selectedWidget === "contact"
                  ? "Contact Details"
                  : selectedWidget === "payment"
                  ? "Payment Information"
                  : selectedWidget === "updates"
                  ? "Updates"
                  : "Recent Activity"}
              </h3>
            </div>
            <div className="px-6 py-4">
              {selectedWidget === "personalComplaints" && (
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Complaint Type</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Title</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Description</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Location</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Image</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Assign to Tech</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personalComplaints.map((complaint) => (
                      <tr key={complaint._id} className="hover:bg-gray-700">
                        <td className="px-6 py-3 text-md text-green-500">{complaint.type}</td>
                        <td className="px-6 py-3 text-md text-red-500">{complaint.title}</td>
                        <td className="px-6 py-3 text-md text-white">{complaint.description}</td>
                        <td className="px-6 py-3 text-md text-white">{`${complaint.houseNumber}-${complaint.houseName}-${complaint.streetName}-${complaint.city}-${complaint.pinCode}`}</td>
                        <td className="px-6 py-3 text-md">
                          {complaint.photo && <img src={complaint.image} alt={complaint.title} className="w-16 h-16" />}
                        </td>
                        <td className="px-6 py-3 text-sm">
                          <button onClick={() => handleAssignComplaint(complaint._id)} className="text-green-600 hover:text-red-800 text-lg font-bold">Assign</button>
                        </td>
                        <td className="px-6 py-3 text-sm">
                          <button onClick={() => handleAssignComplaint(complaint._id)} className="text-red-600 hover:text-green-800 text-lg font-bold">Hold</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {selectedWidget === "publicComplaints" && (
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Complaint Type</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Title</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Description</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Location</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Image</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Assign to Tech</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {publicComplaints.map((complaint) => (
                      <tr key={complaint._id} className="hover:bg-gray-700">
                        <td className="px-6 py-3 text-md text-green-500">{complaint.type}</td>
                        <td className="px-6 py-3 text-md text-green-500">{complaint.title}</td>
                        <td className="px-6 py-3 text-md text-white">{complaint.description}</td>
                        <td className="px-6 py-3 text-md text-white">{`${complaint.streetNumber}, ${complaint.streetName}, ${complaint.city},${complaint.pinCode}`}</td>
                        <td className="px-6 py-3 text-md">
                          {complaint.image && <img src={complaint.image} alt={complaint.title} className="w-16 h-16" />}
                        </td>
                        <td className="px-6 py-3 text-md">
                          <button onClick={() => handleAssignComplaint(complaint._id)} className="text-red-600 hover:text-green-600 text-lg font-bold">Assign</button>
                        </td>
                        <td className="px-6 py-3 text-md">
                          <button onClick={() => handleAssignComplaint(complaint._id)} className="text-green-600 hover:text-red-300 text-lg font-bold">Hold</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {selectedWidget === "contact" && (
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Full Name</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Email</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Phone</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Address</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Message</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact._id} className="hover:bg-gray-700">
                        <td className="px-6 py-3 text-md text-green-500 font-bold">{contact.fullName}</td>
                        <td className="px-6 py-3 text-md text-white">{contact.email}</td>
                        <td className="px-6 py-3 text-md text-white">{contact.phone}</td>
                        <td className="px-6 py-3 text-md text-white">{contact.address}</td>
                        <td className="px-6 py-3 text-md text-white">{contact.message}</td>
                        <td className="px-6 py-3 text-md text-white">
                          <button className="mr-2 text-blue-500 hover:text-blue-700" onClick={() => handleReply(contact)}>Reply</button>
                          <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteActivity(contact._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {selectedWidget === "payment" && (
                <div className="px-6 py-4">
                  <h3 className="text-lg font-bold text-white">Payment Details</h3>
                  <table className="min-w-full table-auto mt-4">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Complaint ID</th>
                        <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Cost(RS)</th>
                        <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Payment ID</th>
                        <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Status</th>
                        <th className="px-6 py-3 text-left text-lg font-medium text-yellow-500">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.length > 0 ? (
                        payments.map((payment) => (
                          <tr key={payment._id} className="hover:bg-gray-700">
                            <td className="px-6 py-3 text-md text-red-300">{payment.complaintId}</td>
                            <td className="px-6 py-3 text-md text-red-500">{payment.cost}</td>
                            <td className="px-6 py-3 text-md text-blue-500">{payment.paymentId}</td>
                            <td className="px-6 py-3 text-md text-green-500">{payment.status}</td>
                            <td className="px-6 py-3 text-md text-white">{new Date(payment.timestamp).toLocaleString()}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-3 text-md text-white text-center">No payment information available.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              {selectedWidget === "update" && (
                <p className="text-white">Updates are displayed here.</p>
              )}
              {selectedWidget === "recentActivities" && (
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">User</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Activity</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Time</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivities.map((activity) => (
                      <tr key={activity._id} className="hover:bg-gray-700">
                        <td className="px-6 py-3 text-sm text-white">
                          {activity.userId
                            ? `${activity.userId.firstName} ${activity.userId.lastName}`
                            : "Admin"}
                        </td>
                        <td className="px-6 py-3 text-sm text-white">{activity.action}</td>
                        <td className="px-6 py-3 text-sm text-white">
                          {new Date(activity.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-3 text-sm">
                          <button
                            onClick={() => handleDeleteActivity(activity._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default AdminDashboard;