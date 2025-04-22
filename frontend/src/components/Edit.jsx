import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Edit = () => {
  const { skuCode } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    productNumber: "",
    vendorName: "",
    vendorNumber: "",
    cityCode: "",
    photo: "",
    vendorprice: "",
  });

  useEffect(() => {
    const fetchSkuData = async () => {
      try {
        const response = await axios.get(
          `https://one1millioncraft-backend.onrender.com/sku/${skuCode}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching SKU data:", error);
        toast.error("Failed to fetch SKU data");
      }
    };
    fetchSkuData();
  }, [skuCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...formData };
      delete updatedData.skuCode;
      const token = localStorage.getItem("token");
      if (token) {
        await axios.put(
          `https://one1millioncraft-backend.onrender.com/edit/${skuCode}`,
          updatedData
        );
        toast.success("SKU updated successfully!");
      }
      setTimeout(() => {
        navigate(`/products`);
      }, 5000);
    } catch (error) {
      console.error("Error updating SKU:", error);
      toast.error("Failed to update SKU");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-400">
        <div className="rounded-2xl  overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 text-center">
                Edit SKU Details
              </h1>
              <p className="mt-2 text-center text-gray-600">
                Update the information for SKU: {skuCode}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Product Number
                  </label>
                  <input
                    type="number"
                    name="productNumber"
                    value={formData.productNumber}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Vendor Name
                  </label>
                  <input
                    type="text"
                    name="vendorName"
                    value={formData.vendorName}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Vendor Number
                  </label>
                  <input
                    type="number"
                    name="vendorNumber"
                    value={formData.vendorNumber}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    City Code
                  </label>
                  <input
                    type="number"
                    name="cityCode"
                    value={formData.cityCode}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Vendor Price
                  </label>
                  <input
                    type="text"
                    name="vendorprice"
                    value={formData.vendorprice}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Edit;
