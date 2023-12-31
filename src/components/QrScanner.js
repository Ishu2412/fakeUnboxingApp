import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import QrCode from "qrcode-reader";
import upload from "../assets/upload.png";
import axios from "axios";
import toast from "react-hot-toast";
import { Html5QrcodeScanner } from "html5-qrcode";
const QrScanner = ({
  onDecode,
  verified,
  setVerified,
  authenticated,
  setAuthenticated,
}) => {
  const [qrData, setQrData] = useState(null);
  const [serialNumber, setSerialNumber] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 500,
        height: 500,
        color: "white",
      },
      fps: 20,
    });

    scanner.render(success, error);

    function success(result) {
      document.getElementById("result").innerHTML = `
        <h2>Success!</h2>
        <p>${result}</p>
      `;

      scanner.clear();
      document.getElementById("reader").remove();
    }

    function error(err) {
      // console.error(err);
    }
  }, []);

  function changeHandler(e) {
    setSerialNumber(e.target.value);
    console.log(serialNumber);
  }

  const handleVerify = async (e) => {
    try {
      const data = {
        qrData,
        serialNumber,
      };

      const response = await axios.post(
        "http://localhost:3000/dashboard",
        data
      );
      setVerified(true);
      response.data === "true"
        ? setAuthenticated(true)
        : setAuthenticated(false);
    } catch (error) {
      console.log("Some error occured during verification");
      toast.error("Some error occured during verification");
    }
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = async () => {
          const qr = new QrCode();
          qr.callback = (err, result) => {
            if (err) {
              console.error(err);
              return;
            }

            setQrData(result && result.result);
            onDecode(result && result.result);
          };

          qr.decode(reader.result);
        };

        reader.readAsDataURL(file);
      }
    },
    [onDecode]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="px-6 py-4 ">
      <div className="flex flex-col gap-2 items-center">
        {/* <div
          {...getRootProps()}
          className="dropzone w-[120px] h-[120px] bg-white rounded-full flex justify-center items-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <img width={100} height={100} src={upload} alt="" />
        </div>
        <div className="text-2xl underline cursor-pointer text-white">
          Upload QR
        </div> */}
        <div id="reader"></div>
        <div id="result"></div>
        <div>
          <input
            type="text"
            name="serialNumber"
            value={serialNumber}
            onChange={(e) => changeHandler(e)}
            placeholder="Enter serial number"
            className="w-full mt-4 rounded-lg p-1"
          />
        </div>
        <button
          className="px-6 py-2 text-blue-100 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 mt-2"
          onClick={handleVerify}
        >
          Check
        </button>
        {qrData && (
          <p className="text-white flex flex-col">QR Code Data: {qrData}</p>
        )}
      </div>
    </div>
  );
};

export default QrScanner;
