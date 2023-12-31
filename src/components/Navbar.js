import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img width={30} height={30} src={logo} alt="" />
        <h1 className="text-white text-2xl">Validify</h1>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 text-blue-100 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 mt-2"
        >
          LogIn
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-2 text-blue-100 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 mt-2"
        >
          SignUp
        </button>
      </div>
    </div>
  );
};

export default Navbar;
