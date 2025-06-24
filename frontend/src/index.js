import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/index";
// Import Pages
import About from "./page/About";
import Contact from "./page/Contact";
import Home from "./page/Home";
import NewComplaint from "./page/NewComplaint";
import AdminLogin from "./page/AdminLogin";
import Signup from "./page/signup";
import Payment from "./page/Payment";
import UserLogin from "./page/UserLogin";
import TechnicianLogin from "./page/TechnicianLogin";
import UserSignUp from "./page/usersignup";
import ErrorPage from "./page/ErrorPage"; 
import UserDashboard from "./page/UserDashboard";
import Service from "./page/Service";
import MyProfile from "./page/MyProfile";
import AdminDashboard from "./page/Admin/AdminDashboard";
import TechnicianSignup from "./page/TechnicianSignup";
import TechnicianSupport from "./page/TechnicianSupport";
import TechnicianDashboard from "./page/Technician/TechnicianDashboard";
import FAQPage from "./page/FAQPage";
import IssueResolutionFeedback from "./page/IssueResolutionFeedback";
import AcceptComplaint from "./page/Technician//AcceptComplaint";
import AdminPayment from "./page/Admin/AdminPayment";
import TechnicianPayment from "./page/Technician/TechnicianPayment";
import UserPayment from "./page/UserPayment";
import ComplaintTracking from "./page/ComplaintTracking";
import UserPaymentHistory from "./page/UserPaymentHistory";
import Complaint from "./page/Complaint";






// Configure Routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} errorElement={<ErrorPage />}> 
        <Route index element={<Home />} />
        <Route path="service" element={<Service />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="newcomplaint" element={<NewComplaint />} />
        <Route path="adminlogin" element={<AdminLogin />} />
        <Route path="userlogin" element={<UserLogin />} />
        <Route path="technicianlogin" element={<TechnicianLogin />} />
       <Route path="technicianSignup" element={<TechnicianSignup/>}/>
        <Route path="signup" element={<Signup />} />
        <Route path="usersignup" element={<UserSignUp />} />
        <Route path="AcceptComplaint" element={<AcceptComplaint />} />
        <Route path="ComplaintTracking" element={<ComplaintTracking />} />
        <Route path="UserPaymentHistory" element={<UserPaymentHistory />} />
        <Route path="TechnicianSupport" element={<TechnicianSupport />} />
        <Route path="myprofile" element={<MyProfile />} />
        <Route path="payment" element={<Payment />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="IssueResolutionFeedback" element={<IssueResolutionFeedback />} />
        <Route path="AdminPayment" element={<AdminPayment />} />
        <Route path="TechnicianPayment" element={<TechnicianPayment/>} />
        <Route path="UserPayment" element={<UserPayment/>} />
       <Route path="Complaint" element={<Complaint/>} />


        <Route path="*" element={<ErrorPage />} /> 
      </Route>
      <Route path="userdashboard" element={<UserDashboard />} />
      <Route path="/admin/admindashboard" element={<AdminDashboard />} />
      <Route path="/technician/technicianDashboard" element={<TechnicianDashboard/>}/>
    </>
  )
);

// Render the App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// Performance Measurement
reportWebVitals();