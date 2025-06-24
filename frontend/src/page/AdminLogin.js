import React, { useState, useEffect } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const userData = useSelector((state) => state);
  const dispatch = useDispatch();

  const backgroundImages = [
    "https://cdn.pixabay.com/photo/2022/10/16/12/23/tram-7524963_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/12/05/05/50/san-francisco-4674350_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/04/04/19/48/houses-7900142_1280.jpg",
  ];

  // Slideshow effect for background
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = data;

    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const fetchData = await fetch(
            `${process.env.REACT_APP_SERVER_DOMIN}/AdminLogin`,
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
              navigate("/admin/admindashboard");

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

  return (
    <div className="min-h-screen flex relative">
      {/* Background Slideshow */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${backgroundImages[backgroundIndex]})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Left Content */}
      <div className="w-1/2 flex items-center justify-center relative z-10 animate-slide-down">
        <div className="flex flex-col items-center text-center text-white px-6 bg-gray-800 bg-opacity-50 rounded-lg p-8 shadow-xl">
          <h1 className="text-4xl font-bold mb-4 text-white-400 drop-shadow-lg">
            Welcome Back!
          </h1>
          <p className="text-lg mb-4 text-white-300 drop-shadow-md">
            access your administrative tools and enhance
            your overall experience.
          </p>
          <ul className="list-disc list-inside text-left text-white-300">
            <li> Manage accounts with ease</li>
            <li> Track and monitor activity</li>
            <li> Customize settings for efficiency</li>
          </ul>
        </div>
      </div>

      {/* Login Form */}
      <div className="w-1/2 flex items-center justify-center relative z-10 animate-slide-up">
        <div className="w-full max-w-sm bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-2xl">
          <h2 className="text-center text-3xl text-white mb-6 drop-shadow-lg">
            Admin Login
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
            <label
              htmlFor="confirmPassword"
              className="text-white font-medium"
            >
              Confirm Password
            </label>
            <div className="flex items-center bg-gray-700 rounded mt-1 mb-2">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="w-full bg-gray-700 border-none outline-none text-white px-3 py-2"
                value={data.confirmPassword}
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
            <button className="w-full bg-red-500 hover:bg-red-600 text-white text-xl font-medium text-center py-2 rounded-full mt-4 transform hover:scale-105 transition duration-200">
              Login
            </button>
          </form>
          <p className="text-left text-sm mt-2 text-white">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-red-500 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Animation Styles */}
      <style>
        {`
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
          @keyframes slideUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .animate-slide-down {
            animation: slideDown 2s ease-out;
          }
          .animate-slide-up {
            animation: slideUp 5s ease-out;
          }
        `}
      </style>
    </div>
  );
}

export default Login;
