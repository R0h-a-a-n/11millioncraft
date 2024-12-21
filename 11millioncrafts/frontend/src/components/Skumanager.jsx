import React, { useState } from 'react';
import axios from 'axios';
import { Search, Plus, Package } from 'lucide-react';

const SkuManager = () => {
    const [formData, setFormData] = useState({
        productName: '',
        productNumber: '',
        vendorName: '',
        vendorNumber: '',
        cityCode: '',
    });
    const [skus, setSkus] = useState([]);
    const [searchResult, setSearchResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/skus', formData);
            setSkus((prevSkus) => [...prevSkus, response.data]);
            setFormData({
                productName: '',
                productNumber: '',
                vendorName: '',
                vendorNumber: '',
                cityCode: '',
            });
        } catch (error) {
            console.error('Error adding SKU:', error.message);
        }
    };

    const handleSearch = async (skuCode) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/skus/${skuCode}`);
            setSearchResult(response.data);
        } catch (error) {
            console.error('Error searching SKU:', error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br  from-blue-50 to-purple-50 p-8">
            <div className="flex flex-row justify-between mt-[40vh] items-start gap-[40vh] mt-8">
                <div className="flex-1 rounded-lg p-3">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Plus className="h-[-30vh] p-9 w-5 flex" />
                            Add SKU 
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit} className='w-[70vh] mt-[-20vh]'>
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
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="number"
                            placeholder="City Code"
                            value={formData.cityCode}
                            onChange={(e) => setFormData({ ...formData, cityCode: e.target.value })}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200" 
                        >
                            Generate SKU
                        </button>
                    </form>
                </div>
                <div className="flex-1 bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Package className="h-[5vh] w-[5vh]" />
                            Added SKUs
                        </h2>
                    </div>
                    <div className="space-y-2">
                        {skus.map((sku) => (
                            <div
                                key={sku.skuCode}
                                className="p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-200"
                            >
                                <span className="font-medium text-blue-600">{sku.skuCode}</span>
                                <p className="text-gray-600 mt-1">
                                   Product: {sku.productName} vendor: {sku.vendorName}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-5 bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Search className="h-90 w-45" />
                            Search SKU
                        </h2>
                    </div>
                    <div className="space-y-9 w-[30vh]">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter SKU Code"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSearch(e.target.value);
                                }}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {searchResult && (
                            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                                <h4 className="font-medium text-blue-900 mb-2">Search Result:</h4>
                                <div className="space-y-2">
                                    <p className="text-blue-800">
                                        <span className="font-medium">Product:</span> {searchResult.productName}
                                    </p>
                                    <p className="text-blue-800">
                                        <span className="font-medium">Vendor:</span> {searchResult.vendorName}
                                    </p>
                                    <p className="text-blue-800">
                                        <span className="font-medium">SKU:</span> {searchResult.skuCode}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkuManager;