import React from "react";
import { useState } from "react";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";
import signup from "../assets/signup-image.png";
// import { FaRegCircle } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { BiLogoTwitter } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  // const [clicked, setclicked] = useState("false");
  const [formData, setFormData] = useState({
    name: "",
    emailId: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSignup = async () => {
    // You can perform signup logic here
    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        formData
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Account Successfully Created");
        navigate("/login");
      } else {
        toast.error("An error occured while creating account");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Some error occured please try again");
    }
  };

  return (
    <div className="flex justify-around">
      <div className="flex flex-col max-w-[50%] items-center mt-8">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-white font-semibold text-2xl">Signup to </h1>
          <div className="flex items-center gap-2">
            <img width={30} height={30} src={logo} alt="" />
            <h1 className="text-white text-2xl">Validify</h1>
          </div>
        </div>
        <div className="w-[530px] h-[530px] bg-[#0C2541] opacity-0.1 shadow-lg rounded-lg">
          <div className="flex flex-col max-w-[60%] mx-auto mt-12">
            <p className="mx-auto text-white text-sm">
              To connect with us please signup
            </p>
            <p className="mx-auto text-white text-sm">
              {" "}
              with your personal info
            </p>
            <div className="mt-8">
              <form>
                <div className="flex flex-col gap-4">
                  <input
                    className="text-white bg-[#091C33] rounded-3xl h-12 p-4 placeholder-slate-300 placeholder:text-sm placeholder:my-auto"
                    placeholder="Name"
                    name="name"
                    type="tel"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <input
                    className="text-white bg-[#091C33] rounded-3xl h-12 p-4 placeholder-slate-300 placeholder:text-sm placeholder:my-auto"
                    placeholder="Email"
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                  />
                  <input
                    className="text-white bg-[#091C33] rounded-3xl h-12 p-4 placeholder-slate-300 placeholder:text-sm placeholder:my-auto"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {/* <div className="flex justify-between items-center mt-1 px-1">
                    <div className="flex gap-1 items-center text-gray-300  cursor-pointer">
                      <FaRegCircle />
                      <p className="text-sm">Remember Me</p>
                    </div>
                    <div className="text-gray-300 text-sm cursor-pointer">
                      Forgot Password?
                    </div>
                  </div> */}
                  <button
                    type="button"
                    onClick={handleSignup}
                    className="px-6 py-2 text-blue-100 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-400 mt-2"
                  >
                    Sign Up
                  </button>
                  <div className="flex items-center gap-2 justify-center mt-4">
                    <div className="h-[1px] w-[90px] bg-gray-500"></div>
                    <p className="text-gray-300">or Sign In with</p>
                    <div className="h-[1px] w-[90px] bg-gray-500"></div>
                  </div>
                </div>
                <div className="flex justify-center gap-6 mt-6">
                  <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center cursor-pointer">
                    <FcGoogle size={20} />
                  </div>
                  <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center cursor-pointer">
                    <TiSocialFacebook size={20} />
                  </div>
                  <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center cursor-pointer">
                    <BiLogoTwitter size={20} />
                  </div>
                  <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center cursor-pointer">
                    <TiSocialLinkedin size={20} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <p className="text-gray-400">Already have an account?</p>
          <div
            className="cursor-pointer underline text-gray-300 font-semibold"
            onClick={() => navigate("/login")}
          >
            Login
          </div>
        </div>
      </div>
      <div className="max-w-[50%] flex justify-center items-center ">
        <img width={500} height={500} src={signup} alt="" />
      </div>
    </div>
  );
};

export default SignUp;
