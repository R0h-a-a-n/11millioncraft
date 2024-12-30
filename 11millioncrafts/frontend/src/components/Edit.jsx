import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Edit = () => {
    const { skuCode } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productName: '',
        productNumber: '',
        vendorName: '',
        vendorNumber: '',
        cityCode: '',
        photo: '',
        vendorprice: ''
    });

    useEffect(() => {
        const fetchSkuData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/sku/${skuCode}`);
                setFormData(response.data); 
            } catch (error) {
                console.error('Error fetching SKU data:', error);
            }
        };
        fetchSkuData();
    }, [skuCode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedData = { ...formData }; 
            delete updatedData.skuCode; 
            const token = localStorage.getItem('token');
            if(token)
            {
                const response = await axios.put(`http://localhost:5000/edit/${skuCode}`, updatedData);
                toast.success('SKU updated successfully!');
            }
            setTimeout(()=>{
                navigate(`/sku/${skuCode}`); 
            },5000);
        } catch (error) {
            console.error('Error updating SKU:', error);
            toast.error('SKU update error');
        }
    };

    return (
        <div className="min-h-screen flex items-center mt-[50vh]  justify-center p-4 bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-[90vh] p-50 rounded-lg shadow-md w-full max-w-lg space-y-4"
            >
                <h1 className="text-2xl font-semibold text-gray-700">Edit SKU</h1>

                <div>
                    <label className="block text-sm font-medium text-gray-600">Product Name</label>
                    <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-lg p-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">Product Number</label>
                    <input
                        type="number"
                        name="productNumber"
                        value={formData.productNumber}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-lg p-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">Vendor Name</label>
                    <input
                        type="text"
                        name="vendorName"
                        value={formData.vendorName}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-lg p-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">Vendor Number</label>
                    <input
                        type="number"
                        name="vendorNumber"
                        value={formData.vendorNumber}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-lg p-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">City Code</label>
                    <input
                        type="number"
                        name="cityCode"
                        value={formData.cityCode}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-lg p-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">Photo URL</label>
                    <input
                        type="text"
                        name="photo"
                        value={formData.photo}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-lg p-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">Vendor Price</label>
                    <input
                        type="text"
                        name="vendorprice"
                        value={formData.vendorprice}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-lg p-2"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default Edit;
