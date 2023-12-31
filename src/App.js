import { Route, Routes } from "react-router-dom";
import Login from "./forms/Login";
import SignUp from "./forms/SignUp";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  return (
    <div className="bg-[#061526] w-[100vw] h-[100vh]">
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedin} />}
        />
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={<Dashboard setIsLoggedIn={setIsLoggedin} />}
        />
      </Routes>
    </div>
  );
}

export default App;
