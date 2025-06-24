import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const handelShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout=()=>{
   dispatch(logoutRedux()) 
  }

  return (
    <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
      <header className="fixed shadow-md w-full h-15 px-2 md:px-4 z-50 bg-black">
        
        <div className="flex items-center h-full justify-between">
          <Link to={""}>
            <div className="h-16">
              <img
                src={
                  "https://cdn.pixabay.com/photo/2015/05/19/07/44/browser-773215_1280.png"
                }
                className="h-full"
                alt="Logo"
              ></img>
            </div>
          </Link>
          <div className="flex items-center gap-4 md:gap-7">
            <nav className="flex gap-4 md:gap-6 text-white md:text-lg">
              <Link to={""}>HOME</Link>
              <Link to={"service"}>SERVICES</Link>
              <Link to={"about"}>ABOUT</Link>
              <Link to={"contact"}>CONTACT</Link>
              <Link to={"payment"}>PAYMENT</Link>
            </nav>
            <div className="text-4xl text-slate-600 relative">
              <IoIosNotifications />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-5  w-5 rounded-full m-0 p-0 text-sm text-center">
                0
              </div>
            </div>
            <div
              className="text-xl text-slate-600"
              onClick={handelShowMenu}
              style={{ position: "relative" }}
            >
              <div className="border-2 border-solid border-slate-600 p-2 rounded-full cursor-pointer">
              <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow">
                { userData.image ?<img src={userData.image} className="h-full w-full"/> : <FaUser />}
              </div>
              {showMenu && (
                <div
                  className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col justify-center"
                  style={{ zIndex: 10 }}
                >
                  {
                    userData.image ?<p className ="cursor-pointer text-white bg-red-500 px-2" onClick={handleLogout}>Logout</p>:<Link to={"AdminLogin"} className="whitespace-nowrap cursor-pointer">
                    AdminLogin
                  </Link>
                  }
                  
                   <Link to={"UserLogin"} className="whitespace-nowrap cursor-pointer">
                    UserLogin
                  </Link>
                  
                 
                  <Link to={"TechnicianLogin"} className="whitespace-nowrap cursor-pointer">
                    TechnicianLogin
                  </Link>
                </div>

              )}
            </div>
          </div>
        </div>
        </div>

        {/* Mobile */}
      </header>
    
    </div>
  
  );
};

export default Header;

