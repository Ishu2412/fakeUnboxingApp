import React, { useState } from "react";
import logo from "../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
const Dashboard = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img width={30} height={30} src={logo} alt="" />
          <h1 className="text-white text-2xl">Validify</h1>
        </div>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 text-blue-100 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 mt-2"
        >
          Log Out
        </button>
      </div>
      <div className="flex justify-center gap-96 mb-4 px-6">
        <div>
          <div className="flex flex-col items-center gap-2">
            <FaUserCircle color="gray" size={150} />
          </div>
        </div>
      </div>
      <ProductForm setResponse={setResponse} response={response} />
      {response && <Image qrLink={response?.data} />}
      {/* {response && <Button qrLink={response?.data} />} */}
    </div>
  );
};

async function downloadImage(qrLink) {
  try {
    const response = await fetch(qrLink);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "qr_code.png";
    link.click();

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading image:", error);
  }
}

function Image({ qrLink }) {
  return (
    <div>
      <img src={qrLink} alt="qr" />
      <button
        className="px-6 py-2 text-blue-100 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 mt-2"
        onClick={() => downloadImage(qrLink)}
      >
        Download QR Code
      </button>
    </div>
  );
}

export default Dashboard;
