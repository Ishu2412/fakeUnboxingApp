import Navbar from "./Navbar";
import QrScanner from "./QrScanner";
import React, { useState } from "react";
import landimg from "../assets/landingimage.png";

const LandingPage = () => {
  const [uploadedData, setUploadedData] = useState(null);
  const [verified, setVerified] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleUploadDecode = (data) => {
    setUploadedData(data);
  };
  return (
    <div className="max-w-[1200px] mx-auto w-full h-full">
      <div>
        <Navbar />
      </div>
      <div className="flex justify-center items-center gap-96 mt-6">
        {verified ? (
          <Result authenticated={authenticated} />
        ) : (
          <QrScanner
            onDecode={handleUploadDecode}
            verified={verified}
            setVerified={setVerified}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        )}
        <img width={500} height={500} src={landimg} alt="" />
      </div>
    </div>
  );
};

function Result({ authenticated }) {
  return (
    <p>
      {authenticated
        ? "Your Mobile is Original !"
        : "Some one is trying to fool you !"}
    </p>
  );
}

export default LandingPage;
