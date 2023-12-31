// src/components/ProductForm.js
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function ProductForm({ setResponse, response }) {
  const [formData, setFormData] = useState({
    productName: "",
    serialNumber: "",
    manufacturingDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiResponse = await axios.post(
        "http://localhost:3000/dashboard",
        formData
      );
      setResponse(apiResponse);

      console.log(apiResponse);
      if (apiResponse.status === 200) {
        toast.success("New Product Added Successfully");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went Wrong!");
    }
  };

  return (
    <form className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <div className="mb-4">
        <label
          htmlFor="productName"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Mobile Model
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          placeholder="Enter Mobile Model"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="serialNumber"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          IMEI Number
        </label>
        <input
          type="text"
          id="serialNumber"
          name="serialNumber"
          placeholder="Enter IMEI number"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="manufacturingDate"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Date Of Manufacturing
        </label>
        <input
          type="date"
          id="manufacturingDate"
          name="manufacturingDate"
          placeholder="Select date"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleSubmit}
        >
          Add Product
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
