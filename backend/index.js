const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();
const multer = require("multer");
const Razorpay = require('razorpay');
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '1024mb', extended: true }));
// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// MongoDB Connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/complaintsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
// Multer File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
  },
});
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit to 2 MB
});
const razorpay = new Razorpay({
  key_id: 'rzp_test_gsZsGfG6lOmwhv',
  key_secret: 'BE823Sigao9uBXdVLdAlIVzK',
});
// User Schema for Admin Authentication
const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /\S+@\S+\.\S+/,
  },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  image: { type: String },
});
const userModel = mongoose.model("admin", userSchema);
// Users Signup Schema
const usersignupSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /\S+@\S+\.\S+/,
  },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  image: { type: String },
});
const usersignupModel = mongoose.model("usersignup", usersignupSchema);
// Technician Signup Schema
const technicianSignupSchema = mongoose.Schema({
  technicianId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /\S+@\S+\.\S+/,
  },
  type: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  image: { type: String },
});

const TechnicianSignupModel = mongoose.model("TechnicianSignup", technicianSignupSchema);
// Contact Schema for Contact Page
const AcceptedComplaintSchema = new mongoose.Schema({
  technicianId: { type: String, required: true },
  technicianType: { type: String, required: true },
  complaint: { type: String, required: true },
  complaintId: { type: String, required: true }, // Ensure this field exists
  days: { type: Number, required: true },
  hours: { type: Number, required: true },
  cost: { type: Number, required: true },
  includingNewItems: { type: Boolean, default: false },
  status: { type: String, default: 'pending' },
}, { timestamps: true });
const AcceptedComplaint = mongoose.model('AcceptedComplaint', AcceptedComplaintSchema);
module.exports = AcceptedComplaint;
// Payment Schema
const paymentSchema = new mongoose.Schema({
  paymentId: String,
  complaintId: String,
  cost: Number,
  status: String,
  timestamp: { type: Date, default: Date.now },
});
const Payment = mongoose.model('Payment', paymentSchema);
const contactSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String, required: true },
  message: { type: String, required: true },
});
const ContactModel = mongoose.model("contact", contactSchema);
// Complaint Schemas for Personal and Public Complaints
const personalComplaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  houseNumber: { type: String, required: true },
  houseName: { type: String, required: true },
  streetName: { type: String, required: true },
  city: { type: String, required: true },
  pinCode: { type: String, required: true },
  type: { type: String, required: true },
  photo: { type:String,  },
  complaintId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const publicComplaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  streetNumber: { type: String, required: true },
  streetName: { type: String, required: true },
  city: { type: String, required: true },
  pinCode: { type: String, required: true },
  type: { type: String, required: true },
  photo: { type: String, required: true },
  complaintId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const PersonalComplaint = mongoose.model('PersonalComplaint', personalComplaintSchema);
const PublicComplaint = mongoose.model('PublicComplaint', publicComplaintSchema);
// Activity Log Schema
const activityLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'usersignup', required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});
// Admin Payment Schema
const adminPaymentSchema = new mongoose.Schema({
  complaintId: String,
  technicianId: String,
  finalAmount: Number,
  paymentStatus: String,
  paymentId: String,
  timestamp: { type: Date, default: Date.now }
});
const AdminPayment = mongoose.model('AdminPayment', adminPaymentSchema);
const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
// Root Route
app.get("/", (req, res) => {
  res.send("Server is running");
});
// Signup Route
app.post("/signup", async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).send({ message: "Passwords do not match", alert: false });
  }
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email is already registered", alert: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ ...req.body, password: hashedPassword, confirmPassword: hashedPassword });
    await newUser.save();
    res.status(201).send({ message: "Successfully signed up", alert: true });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});
// Users Signup Route
app.post("/usersignup", async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).send({ message: "Passwords do not match", alert: false });
  }
  try {
    const existingUser = await usersignupModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email is already registered", alert: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUsersignup = new usersignupModel({ ...req.body, password: hashedPassword, confirmPassword: hashedPassword });
    await newUsersignup.save();
    res.status(201).send({ message: "Successfully signed up", alert: true });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});
// Technician Signup Route
app.post("/techniciansignup", async (req, res) => {
  const { firstName, lastName, email, type, password, confirmPassword, image } = req.body;
  if (!firstName || !lastName || !email || !type || !password || !confirmPassword) {
    return res.status(400).json({ message: "Please fill in all fields.", alert: false });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match.", alert: false });
  }
  try {
    const existingTechnician = await TechnicianSignupModel.findOne({ email });
    if (existingTechnician) {
      return res.status(400).json({ message: "Email is already registered.", alert: false });
    }
    let technicianId;
    let isUnique = false;
    while (!isUnique) {
      const technicianCount = await TechnicianSignupModel.countDocuments();
      technicianId = `SMART-TECH-${String(technicianCount + 1).padStart(3, '0')}`;
      const existingId = await TechnicianSignupModel.findOne({ technicianId });
      if (!existingId) {
        isUnique = true;
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newTechnician = new TechnicianSignupModel({
      technicianId,
      firstName,
      lastName,
      email,
      type,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      image,
    });
    await newTechnician.save();
    res.status(201).json({ message: "Technician signed up successfully!", alert: true });
  } catch (error) {
    console.error("Error in technician signup:", error);
    res.status(500).json({ message: "Internal server error", alert: false });
  }
});

// Technician Login Route
// Technician Login Route
app.post("/TechnicianLogin", async (req, res) => {
  const { technicianId, type, email, password } = req.body;
  try {
    // Create an array of conditions to check
    const conditions = [
      { field: technicianId, query: { technicianId } },
      { field: type, query: { type } },
      { field: email, query: { email } },
    ];
    // Find the first technician that matches any of the conditions
    const technician = await TechnicianSignupModel.findOne(
      conditions.find(cond => cond.field) ? conditions.find(cond => cond.field).query : {}
    );
    // Validate technician and password
    if (technician && await bcrypt.compare(password, technician.password)) {
      const datasend = {
        _id: technician._id,
        firstName: technician.firstName,
        lastName: technician.lastName,
        email: technician.email,
        image: technician.image,
      };
      res.send({ message: "Login successfully", alert: true, data: datasend });
    } else {
      res.status(404).send({ message: "Invalid email or password", alert: false });
    }
  } catch (err) {
    console.error("Error during TechnicianLogin:", err);
    res.status(500).send({ message: "Internal server error", alert: false });
  }
});

app.post("/AdminLogin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await userModel.findOne({ email });
    if (result && await bcrypt.compare(password, result.password)) {
      const datasend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      const activity = new ActivityLog({
        userId: result._id,
        action: 'login'
      });
      await activity.save();
      res.send({ message: "Login successfully", alert: true, data: datasend });
    } else {
      res.status(404).send({ message: "Invalid email or password", alert: false });
    }
  } catch (err) {
    console.error("Error during AdminLogin:", err);
    res.status(500).send({ message: "Internal server error", alert: false });
  }
});
// User Login Route
app.post("/UserLogin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await usersignupModel.findOne({ email });
    if (result && await bcrypt.compare(password, result.password)) {
      const datasend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      const activity = new ActivityLog({
        userId: result._id,
        action: 'login'
      });
      await activity.save();
      res.send({ message: "Login successfully", alert: true, data: datasend });
    } else {
      res.status(404).send({ message: "Invalid email or password", alert: false });
    }
  } catch (err) {
    console.error("Error during UserLogin:", err);
    res.status(500).send({ message: "Internal server error", alert: false });
  }
});
// Technician Login Route

// Submit Complaint Route

app.post('/submitComplaint', upload.single('photo'), async (req, res) => {
  // app.post('/submitComplaint',  async (req, res) => {
    
  try {
    console.log(req);
    console.log(req.body);
    const { complaintType, complaintData } = req.body;
   
    
    let complaintId;
    if (complaintType === 'personal') {
      const count = await PersonalComplaint.countDocuments();
      complaintId = `SMART-PERSONAL-${String(count + 1).padStart(2, '0')}`;
      const newComplaint = new PersonalComplaint({
        ...JSON.parse(complaintData),
        // photo: photo,
        complaintId,
      });
      await newComplaint.save();
      res.status(201).json({ message: 'Personal complaint submitted successfully!', complaintId });
    } else if (complaintType === 'public') {
      const count = await PublicComplaint.countDocuments();
      complaintId = `SMART-PUBLIC-${String(count + 1).padStart(2, '0')}`;
      const newComplaint = new PublicComplaint({
        ...JSON.parse(complaintData),
        // photo: photo,
        complaintId,
      });
      await newComplaint.save();
      res.status(201).json({ message: 'Public complaint submitted successfully!', complaintId });
    } else {
      res.status(400).json({ message: 'Invalid complaint type' });
    }
  } catch (error) {
    console.error('Error while submitting complaint:', error);
    res.status(500).json({ message: 'Error submitting complaint. Please try again.' });
  }
});
app.post("/submitContact", async (req, res) => {
  const { fullName, email, phone, address, message } = req.body;
  if (!fullName || !email || !phone || !address || !message) {
    return res.status(400).json({ message: "All fields are required.", alert: false });
  }
  try {
    const newContact = new ContactModel({
      fullName,
      email,
      phone,
      address,
      message,
    });
    await newContact.save();
    res.status(201).send({
      message: "Your message has been successfully submitted.",
      alert: true,
    });
  } catch (error) {
    console.error("Error during contact form submission:", error);
    res.status(500).send({
      message: "An error occurred while submitting your message. Please try again later.",
      alert: false,
    });
  }
});
// Route to fetch all complaints (for debugging purposes)
app.get('/complaints', async (req, res) => {
  try {
    const personalComplaints = await PersonalComplaint.find();
    const publicComplaints = await PublicComplaint.find();
    res.status(200).json({ personalComplaints, publicComplaints });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ message: 'Error fetching complaints. Please try again.' });
  }
});
// API to get total number of users
app.get("/api/total-users", async (req, res) => {
  try {
    const totalUsers = await usersignupModel.countDocuments();
    res.json({ totalUsers });
  } catch (err) {
    console.error("Error fetching total users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
});
// API to get total number of personal complaints
app.get("/api/total-personal-complaints", async (req, res) => {
  try {
    const totalPersonalComplaints = await PersonalComplaint.countDocuments();
    res.json({ totalPersonalComplaints });
  } catch (err) {
    console.error("Error fetching total personal complaints:", err);
    res.status(500).json({ message: "Error fetching personal complaints" });
  }
});
// API to get total number of public complaints
app.get("/api/total-public-complaints", async (req, res) => {
  try {
    const totalPublicComplaints = await PublicComplaint.countDocuments();
    res.json({ totalPublicComplaints });
  } catch (err) {
    console.error("Error fetching total public complaints:", err);
    res.status(500).json({ message: "Error fetching public complaints" });
  }
});
// API to fetch recent activities
app.get("/api/recent-activities", async (req, res) => {
  try {
    const activities = await ActivityLog.find()
      .populate('userId', 'firstName lastName')
      .sort({ timestamp: -1 })
      .limit(10);
    res.json(activities);
  } catch (err) {
    console.error("Error fetching recent activities:", err);
    res.status(500).json({ message: "Error fetching recent activities" });
  }
});
// API to fetch all personal complaints
app.get("/api/personal-complaints", async (req, res) => {
  try {
    const personalComplaints = await PersonalComplaint.find();
    res.status(200).json({ personalComplaints });
  } catch (error) {
    console.error('Error fetching personal complaints:', error);
    res.status(500).json({ message: 'Error fetching personal complaints. Please try again.' });
  }
});
// API to fetch all public complaints
app.get("/api/public-complaints", async (req, res) => {
  try {
    const publicComplaints = await PublicComplaint.find();
    res.status(200).json({ publicComplaints });
  } catch (error) {
    console.error('Error fetching public complaints:', error);
    res.status(500).json({ message: 'Error fetching public complaints. Please try again.' });
  }
});
// Delete Activity Route
app.delete('/api/delete-activity/:id', async (req, res) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid activity ID" });
  }
  try {
    const deletedActivity = await ActivityLog.findByIdAndDelete(id);
    if (!deletedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (err) {
    console.error('Error deleting activity:', err);
    res.status(500).json({ message: "Error deleting activity" });
  }
});
// API to fetch all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await ContactModel.find();
    res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Error fetching contacts. Please try again." });
  }
});
// API to get technician type by technician ID
app.get("/api/get-technician-type", async (req, res) => {
  const technicianId = req.query.technicianId; // Get technicianId from query parameters
  try {
    const technician = await TechnicianSignupModel.findOne({ technicianId });
    if (!technician) {
      return res.status(404).json({ message: "Technician not found" });
    }
    res.json({ type: technician.type }); // Respond with the technician's type
  } catch (error) {
    console.error('Error fetching technician type:', error);
    res.status(500).json({ message: 'Error fetching technician type' });
  }
});
app.post('/api/accept-complaint', async (req, res) => {
  const { technicianId, technicianType, complaint, complaintId, days, hours, cost, includingNewItems } = req.body;
  // Validate input
  if (!technicianId || !technicianType || !complaint || !complaintId || days <= 0 || hours <= 0 || cost <= 0) {
    return res.status(400).json({ message: "All fields are required and must have positive values." });
  }
  try {
    // Check if the complaint ID already exists
    const existingComplaint = await AcceptedComplaint.findOne({ complaintId });
    if (existingComplaint) {
      return res.status(400).json({ message: "This complaint ID has already been accepted." });
    }
    // Create a new complaint
    const newComplaint = new AcceptedComplaint({
      technicianId,
      technicianType,
      complaint,
      complaintId, // Store the complaint ID
      days,
      hours,
      cost,
      includingNewItems
    });
    await newComplaint.save(); // Save the new complaint in the database
    res.status(201).json({ message: "Complaint accepted successfully!", complaintId: newComplaint._id });
  } catch (error) {
    console.error("Error accepting complaint:", error);
    res.status(500).json({ message: "Error accepting complaint. Please try again." });
  }
});
app.get("/api/accepted-complaints", async (req, res) => {
  try {
    const acceptedComplaints = await AcceptedComplaint.find();
    res.status(200).json({ acceptedComplaints });
  } catch (error) {
    console.error('Error fetching accepted complaints:', error);
    res.status(500).json({ message: 'Error fetching accepted complaints. Please try again.' });
  }
});
app.post('/api/save-payment', async (req, res) => {
  const { paymentId, complaintId, cost, status, timestamp } = req.body;
  try {
      const payment = new Payment({ paymentId, complaintId, cost, status, timestamp });
      await payment.save();
      res.status(201).send({ message: 'Payment details saved successfully' });
  } catch (error) {
      console.error("Error saving payment details:", error);
      res.status(500).send({ message: 'Error saving payment details' });
  }
});
// Start the server
app.post('/create-order', async (req, res) => {
  const options = {
      amount: req.body.amount, // amount in smallest currency unit
      currency: 'INR',
  };
  try {
      const order = await razorpay.orders.create(options);
      res.json(order);
  } catch (error) {
      res.status(500).send(error);
  }
});
app.get('/api/get-cost', async (req, res) => {
  const { complaintId } = req.query;
  try {
      // Replace with your logic to find the cost based on the complaint ID
      const complaint = await AcceptedComplaint.findOne({ complaintId });
      if (!complaint) {
          return res.status(404).json({ message: "Complaint not found." });
      }
      res.json({ cost: complaint.cost }); // Assuming cost is a field in the complaint
  } catch (error) {
      console.error("Error fetching cost:", error);
      res.status(500).json({ message: "Error fetching cost. Please try again." });
  }
});
// Assuming you have already set up your Express server and connected to MongoDB
app.get('/api/payments', async (req, res) => {
  try {
      const payments = await Payment.find(); // Fetch all payments from the database
      res.status(200).json({ payments });
  } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ message: 'Error fetching payments' });
  }
});
app.post('/api/save-admin-payment', async (req, res) => {
  const { complaintId, technicianId, finalAmount, paymentStatus, paymentId, timestamp } = req.body;
  const adminPayment = new AdminPayment({
      complaintId,
      technicianId,
      finalAmount,
      paymentStatus,
      paymentId,
      timestamp
  });
  try {
      await adminPayment.save();
      res.status(201).json({ message: "Admin payment details saved successfully." });
  } catch (error) {
      console.error("Error saving admin payment details:", error);
      res.status(500).json({ message: "Error saving admin payment details." });
  }
});
app.get('/api/get-payment-details/:technicianId', async (req, res) => {
  const { technicianId } = req.params;
  try {
      const payments = await AdminPayment.find({ technicianId });
      if (payments.length > 0) {
          res.status(200).json(payments);
      } else {
          res.status(404).json({ message: "No payment details found for this technician." });
      }
  } catch (error) {
      console.error("Error fetching payment details:", error);
      res.status(500).json({ message: "Error fetching payment details." });
  }
});
app.get('/api/get-complaint-details/:complaintId', async (req, res) => {
  const { complaintId } = req.params;
  try {
      const complaint = await AcceptedComplaint.findOne({ complaintId });
      if (!complaint) {
          return res.status(404).json({ message: "Complaint is under disscussion plese give some time to Accept !." });
      }
      res.status(200).json(complaint);
  } catch (error) {
      console.error("Error fetching complaint:", error);
      res.status(500).json({ message: "Error fetching complaint details." });
  }
});
app.get('/api/get-payment-history/:complaintId', async (req, res) => {
  const { complaintId } = req.params;
  try {
      const payments = await Payment.find({ complaintId });
      if (payments.length === 0) {
          return res.status(404).json({ message: "No payment history found for this complaint ID." });
      }
      res.status(200).json(payments);
  } catch (error) {
      console.error("Error fetching payment history:", error);
      res.status(500).json({ message: "Error fetching payment history." });
  }
});
app.get('/api/get-all-technicians', async (req, res) => {
  try {
      const technicians = await TechnicianSignupModel.find(); // Fetch all technicians
      res.status(200).json(technicians);
  } catch (error) {
      console.error("Error fetching technicians:", error);
      res.status(500).json({ message: "Error fetching technicians." });
  }
});
// Add this endpoint in your existing backend code
app.post('/findComplaintId', async (req, res) => {
  const { houseNumber, houseName, streetName, city, pinCode } = req.body;
  try {
    // Find complaints matching the provided address details
    const complaints = await PersonalComplaint.find({
      houseNumber,
      houseName,
      streetName,
      city,
      pinCode,
    }).sort({ createdAt: -1 }); // Sort by createdAt in descending order
    if (complaints.length > 0) {
      // If complaints exist, return the most recent one
      return res.status(200).json({ complaintId: complaints[0].complaintId });
    } else {
      return res.status(404).json({ message: 'For this address No matching complaint found!!.' });
    }
  } catch (error) {
    console.error('Error fetching complaint:', error);
    return res.status(500).json({ message: 'Error fetching complaint. Please try again.' });
  }
});
app.get("/api/accepted-complaints", async (req, res) => {
  try {
    const acceptedComplaints = await AcceptedComplaint.find();
    res.status(200).json({ acceptedComplaints });
  } catch (error) {
    console.error('Error fetching accepted complaints:', error);
    res.status(500).json({ message: 'Error fetching accepted complaints. Please try again.' });
  }
});
app.get("/api/get-technician-id", async (req, res) => {
  const { complaintId } = req.query;
  try {
    const acceptedComplaint = await AcceptedComplaint.findOne({ complaintId });
    if (!acceptedComplaint) {
      return res.status(404).json({ message: "Accepted complaint not found." });
    }
    res.json({ technicianId: acceptedComplaint.technicianId }); // Respond with the technician's ID
  } catch (error) {
    console.error('Error fetching technician ID:', error);
    res.status(500).json({ message: 'Error fetching technician ID' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});