import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";
const slideDownStyle = {
  animation: "slideDown 1.5s ease forwards",
};
const styles = `
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
`;
function TechnicianSignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    technicianId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
    type: "",
  });
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
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
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_DOMIN}/techniciansignup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const dataRes = await response.json();
        toast(dataRes.message);
        if (dataRes.alert) {
          navigate("/TechnicianLogin");
        }
      } else {
        alert("Password and confirm password do not match");
      }
    } else {
      alert("Please enter the required fields");
    }
  };
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'url("https://cdn.pixabay.com/photo/2021/06/06/09/04/bridge-6314795_1280.jpg")',
      }}
    >
      <style>{styles}</style>
      <div className="flex flex-col justify-center items-center min-h-screen bg-black bg-opacity-50 overflow-y-auto" style={{ maxHeight: '100vh' }}>
        <div
          className="w-full max-w-sm bg-black bg-opacity-75 text-white m-auto flex flex-col p-4 rounded-lg shadow-lg"
          style={slideDownStyle}
        >
          <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
            <img
              src={
                data.image
                  ? data.image
                  : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
              }
              className="w-full h-full"
              alt="Profile"
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
          <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="technicianId">Technician ID</label>
            <input
              type="text"
              id="technicianId"
              name="technicianId"
              className="mt-1 mb-2 w-full bg-slate-800 px-2 py-1 rounded focus:outline-blue-300"
              value="contact to admin"
              readOnly
            />
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="mt-1 mb-2 w-full bg-slate-800 px-2 py-1 rounded focus:outline-blue-300"
              value={data.firstName}
              onChange={handleOnChange}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="mt-1 mb-2 w-full bg-slate-800 px-2 py-1 rounded focus:outline-blue-300"
              value={data.lastName}
              onChange={handleOnChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 mb-2 w-full bg-slate-800 px-2 py-1 rounded focus:outline-blue-300"
              value={data.email}
              onChange={handleOnChange}
            />
            <label htmlFor="type">Technician Type</label>
            <select
              id="type"
              name="type"
              className="mt-1 mb-2 w-full bg-slate-800 px-2 py-1 rounded focus:outline-blue-300"
              value={data.type}
              onChange={handleOnChange}
              required
            >
              <option value="">Select type</option>
              <option value="Electrical Problem">Electrical Service</option>
              <option value="Water Problem">Waterpipe Service</option>
              <option value="Drainage Problem">Drainage Service</option>
              <option value="Road Problems">Road Damage Service</option>
              <option value="Others">Others...</option>
            </select>
            <label htmlFor="password">Password</label>
            <div className="flex px-2 py-1 bg-slate-800 rounded mt-1 mb-2 focus:outline-blue-300">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full bg-slate-800 border-none outline-none"
                value={data.password}
                onChange={handleOnChange}
              />
              <span
                className="flex text-xl cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="flex px-2 py-1 bg-slate-800 rounded mt-1 mb-2 focus:outline-blue-300">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="w-full bg-slate-800 border-none outline-none"
                value={data.confirmPassword}
                onChange={handleOnChange}
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
            <Link to="/TechnicianLogin" className="text-red-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default TechnicianSignUp;