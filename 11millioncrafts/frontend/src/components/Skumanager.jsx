import React, { useEffect, useState } from 'react';
import { Search, Plus, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SkuManager = () => {
    const [formData, setFormData] = useState({
        productName: '',
        productNumber: '',
        vendorName: '',
        vendorNumber: '',
        cityCode: '',
        photo: '',
    });
    const [skus, setSkus] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSkus, setFilteredSkus] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataObj = new FormData();
        formDataObj.append('productName', formData.productName);
        formDataObj.append('productNumber', formData.productNumber);
        formDataObj.append('vendorName', formData.vendorName);
        formDataObj.append('vendorNumber', formData.vendorNumber);
        formDataObj.append('cityCode', formData.cityCode);
        formDataObj.append('photo', formData.photo); // File input
    
        try {
            const response = await fetch('http://localhost:5000/api/skus', {
                method: 'POST',
                body: formDataObj,
            });
    
            const data = await response.json();
            setSkus((prevSkus) => [...prevSkus, data]);
            setFilteredSkus((prevSkus) => [...prevSkus, data]);
            setFormData({
                productName: '',
                productNumber: '',
                vendorName: '',
                vendorNumber: '',
                cityCode: '',
                photo: '',
            });
        } catch (error) {
            console.error('Error adding SKU:', error.message);
        }
    };
    

    useEffect(() => {
        const fetchSkus = async () => {
            try {
                const response = await fetch('http://localhost:5000/getsku');
                const data = await response.json();
                setSkus(data);
                setFilteredSkus(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchSkus();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setFilteredSkus(skus);
        } else {
            const results = skus.filter(
                (sku) =>
                    sku.skuCode.toLowerCase().includes(query.toLowerCase()) ||
                    sku.productName.toLowerCase().includes(query.toLowerCase()) ||
                    sku.vendorName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredSkus(results);
        }
    };

    return (
        <div className="min-h-screen mt-[40vh] bg-gradient-to-br from-blue-100 to-purple-200 p-4">
            <div className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-3">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-blue-600 flex items-center gap-2 mb-6">
                        <Plus className="w-6 h-6" />
                        Add SKU
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={formData.productName}
                            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Product Number"
                            value={formData.productNumber}
                            onChange={(e) => setFormData({ ...formData, productNumber: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Vendor Name"
                            value={formData.vendorName}
                            onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Vendor Number"
                            value={formData.vendorNumber}
                            onChange={(e) => setFormData({ ...formData, vendorNumber: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="number"
                            placeholder="City Code"
                            value={formData.cityCode}
                            onChange={(e) => setFormData({ ...formData, cityCode: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="file"
                            onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                        >
                            Generate SKU
                        </button>
                    </form>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-purple-600 flex items-center gap-2 mb-6">
                        <Package className="w-6 h-6" />
                        Added SKUs
                    </h2>
                    <div className="max-h-[60vh] overflow-y-auto">
                        {filteredSkus.length > 0 ? (
                            <div className="space-y-4">
                                {filteredSkus.map((sku, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition duration-200"
                                    >
                                        <span className="font-medium text-blue-600 cursor-pointer">
                                            <h1 onClick={() => navigate(`/sku/${sku.skuCode}`)}>{sku.skuCode}</h1>
                                        </span>
                                        <p className="text-gray-600 mt-1">
                                            Product: {sku.productName} | Vendor: {sku.vendorName}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No SKUs found</p>
                        )}
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-green-600 flex items-center gap-2 mb-6">
                        <Search className="w-6 h-6" />
                        Search SKU
                    </h2>
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Enter SKU Code, Product Name, or Vendor Name"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkuManager;
