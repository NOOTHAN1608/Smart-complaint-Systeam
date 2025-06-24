import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const handleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProfileImage = async (e) => {
    const imageData = await ImagetoBase64(e.target.files[0]);
    setData((prev) => ({
      ...prev,
      image: imageData,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;

    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMIN}/signup`,
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
          }
        );

        const dataRes = await fetchData.json();
        toast(dataRes.message);
        if (dataRes.alert) {
          navigate("/Adminlogin");
        }
      } else {
        toast.error("Password and confirm password do not match");
      }
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'url("https://cdn.pixabay.com/photo/2016/11/13/12/52/kuala-lumpur-1820944_1280.jpg")',
      }}
    >
      <div className="p-3 md:p-4 bg-black bg-opacity-50 h-full flex justify-center items-center">
        {/* Animated Signup Form */}
        <div className="w-full max-w-sm text-white m-auto flex flex-col p-4 rounded-lg shadow-lg animate-slide-down"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Transparent background
            backdropFilter: "blur(10px)", // Optional: Blurs the background
          }}
        >
          {/* Profile Image */}
          <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
            <img
              src={
                data.image ||
                "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
              }
              alt="Profile"
              className="w-full h-full"
            />
            <label htmlFor="profileImage">
              <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
                <p className="text-sm p-1 text-white">Upload</p>
              </div>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="hidden"
                onChange={handleUploadProfileImage}
              />
            </label>
          </div>

          {/* Form */}
          <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="mt-1 mb-2 w-full bg-slate-800 bg-opacity-50 px-2 py-1 rounded focus:outline-blue-300"
              value={data.firstName}
              onChange={handleOnChange}
              required
            />

            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="mt-1 mb-2 w-full bg-slate-800 bg-opacity-50 px-2 py-1 rounded focus:outline-blue-300"
              value={data.lastName}
              onChange={handleOnChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 mb-2 w-full bg-slate-800 bg-opacity-50 px-2 py-1 rounded focus:outline-blue-300"
              value={data.email}
              onChange={handleOnChange}
              required
            />

            <label htmlFor="password">Password</label>
            <div className="flex px-2 py-1 bg-slate-800 bg-opacity-50 rounded mt-1 mb-2">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full bg-transparent border-none outline-none"
                value={data.password}
                onChange={handleOnChange}
                required
              />
              <span
                className="flex text-xl cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>

            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="flex px-2 py-1 bg-slate-800 bg-opacity-50 rounded mt-1 mb-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="w-full bg-transparent border-none outline-none"
                value={data.confirmPassword}
                onChange={handleOnChange}
                required
              />
              <span
                className="flex text-xl cursor-pointer"
                onClick={handleShowConfirmPassword}
              >
                {showConfirmPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>

            <button className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
              Sign Up
            </button>
          </form>
          <p className="text-left text-sm mt-2">
            Already have an account?{" "}
            <Link to={"/AdminLogin"} className="text-red-500 underline">
              Login
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
          .animate-slide-down {
            animation: slideDown 2s ease-out;
          }
        `}
      </style>
    </div>
  );
}

export default Signup;
