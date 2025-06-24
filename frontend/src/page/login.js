import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
        toast("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Password and confirm password do not match");
      }
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2023/07/19/06/19/ai-generated-8136172_960_720.png')", // Add your image URL here
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="w-1/2 flex items-center justify-center relative z-10">
        <div className="flex flex-col items-center text-center text-white px-6">
          


          <h1 className="text-4xl font-bold mb-4 text-white-400 drop-shadow-lg">
            Welcome Back!
          </h1>
          <p className="text-lg mb-2 text-white-300 drop-shadow-md">
            We're excited to have you back! Log in to access all your features
            and manage your account with ease.
          </p>
          <p className="text-sm text-gray-300 font-medium p-4 ">
  <b>
    If you’re having trouble logging in, don’t hesitate to reach out to our support team. We're here to help!
  </b>
</p>
 </div>
      </div>

      <div className="w-1/2 flex items-center justify-center relative z-10">
        <div className="w-full max-w-sm bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-2xl">
          <h2 className="text-center text-3xl text-white mb-6 drop-shadow-lg">
            Login
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
    </div>
  );
}

export default Login;
