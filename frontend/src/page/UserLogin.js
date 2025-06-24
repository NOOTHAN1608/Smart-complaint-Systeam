import React, { useState, useEffect } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

function UserLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Added state for confirm password visibility
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const userData = useSelector((state) => state);
  const dispatch = useDispatch();

  const generateCaptcha = () => {
    const randomCaptcha = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCaptcha(randomCaptcha);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev); // Function to toggle confirm password visibility
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCaptchaInputChange = (e) => {
    setCaptchaInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = data;

    if (captchaInput !== captcha) {
      toast.error("Captcha does not match. Please try again.");
      generateCaptcha(); // Refresh CAPTCHA on incorrect input
      return;
    }

    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const fetchData = await fetch(
            `${process.env.REACT_APP_SERVER_DOMIN}/UserLogin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );

          if (!fetchData.ok) {
            const errorData = await fetchData.json();
            toast.error(errorData.message || "An error occurred");
            return;
          }

          const dataRes = await fetchData.json();
          toast(dataRes.message);

          if (userData.user + dataRes.alert) {
            dispatch(loginRedux(dataRes));
            setTimeout(() => {
              navigate("/UserDashboard");
            }, 1000);
          }
        } catch (error) {
          toast.error("An error occurred while logging in.");
        }
      } else {
        toast.error("Password and confirm password do not match");
      }
    } else {
      toast.error("Please fill in all fields");
    }
  };

  const refreshCaptcha = () => {
    generateCaptcha(); // Call the function to generate a new CAPTCHA
    setCaptchaInput(""); // Clear the previous input
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflowY: "auto",
        padding: "20px",
        backgroundColor: "#121212",
        color: "#ffffff",
        boxSizing: "border-box",
      }}
    >
      <div className="min-h-screen flex relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2013/03/02/02/41/alley-89197_1280.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="w-1/2 flex items-center justify-center relative z-10">
          <div className="w-full max-w-sm bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-2xl">
            <h2 className="text-center text-3xl text-white mb-6 drop-shadow-lg">
              User Login!!
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label htmlFor="name" className="text-white font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 mb-2 w-full bg-gray-700 px-3 py-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.name}
                onChange={handleOnChange}
                required
              />
              <label htmlFor="email" className="text-white font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 mb-2 w-full bg-gray-700 px-3 py-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.email}
                onChange={handleOnChange}
                required
              />
              <label htmlFor="password" className="text-white font-medium">
                Password
              </label>
              <div className="flex items-center bg-gray-700 rounded mt-1 mb-2">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full bg-gray-700 border-none outline-none text-white px-3 py-2"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                />
                <span
                  className="flex text-xl cursor-pointer text-white p-2"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <BiShow /> : <BiHide />}
                </span>
              </div>
              <label htmlFor="confirmPassword" className="text-white font-medium">
                Confirm Password
              </label>
              <div className="flex items-center bg-gray-700 rounded mt-1 mb-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full bg-gray-700 border-none outline-none text-white px-3 py-2"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                />
                <span
                  className="flex text-xl cursor-pointer text-white p-2"
                  onClick={handleShowConfirmPassword}
                >
                  {showConfirmPassword ? <BiShow /> : <BiHide />}
                </span>
              </div>
              <label htmlFor="captcha" className="text-white font-medium">
                CAPTCHA: <span className="text-red-500">{captcha}</span>
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="captcha"
                  name="captcha"
                  className="mt-1 mb-2 w-full bg-gray-700 px-3 py-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={captchaInput}
                  onChange={handleCaptchaInputChange}
                  required
                />
                <button
                  type="button"
                  className="ml-2 p-2 bg-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={refreshCaptcha}
                  title="Refresh CAPTCHA"
                >
                  <FontAwesomeIcon icon={faArrowsRotate} className="h-5 w-5" />
                </button>
              </div>
              <button className="w-full bg-red-500 hover:bg-red-600 text-white text-xl font-medium text-center py-2 rounded-full mt-4 transform hover:scale-105 transition duration-200">
                Login
              </button>
            </form>
            <p className="text-left text-sm mt-2 text-white">
              Don't have an account?{" "}
              <Link to={"/usersignup"} className="text-red-500 underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        {/* Right Content for Complaints */}
        <div
          className="w-1/2 flex items-center justify-center relative z-10"
          style={{
            animation: "slideDown 1.5s ease forwards", // Animation applied here
            animationName: "slideDown", // Inline style for animation
          }}
        >
          <div className="w-full max-w-md bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-2xl text-white">
            <h2 className="text-center text-2xl font-bold mb-4">Welcome to Our Platform!</h2>
            <p className="mb-4">Let’s get started on your journey with us!</p>
            <ul className="list-disc list-inside mb-4">
              <li>✔️ Clearly describe your issue.</li>
              <li>✔️ If you have any questions, our support team is always here to help.</li>
              <li>✔️ Include your contact information for follow-up.</li>
            </ul>
            <p className="text-center">
              You can reach our support team via the "Contact Us" section on our website.
            </p>
          </div>
        </div>
      </div>
      <style>
        {`
          /* CSS Animation for Slide Down Effect */
          @keyframes slideDown {
            from {
              transform: translateY(-100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}

export default UserLogin;