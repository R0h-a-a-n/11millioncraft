import React, { useEffect, useState } from 'react';
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
            const response = await fetch('http://localhost:5000/api/skus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setSkus((prevSkus) => [...prevSkus, data]);
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

    useEffect(() => {
        const fetchSkus = async () => {
            try {
                const response = await fetch('http://localhost:5000/getsku');
                const data = await response.json();
                setSkus(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchSkus();
    }, []);

    const handleSearch = async (skuCode) => {
        try {
            const response = await fetch(`http://localhost:5000/api/skus/${skuCode}`);
            const data = await response.json();
            setSearchResult(data);
        } catch (error) {
            console.error('Error searching SKU:', error.message);
        }
    };

    return (
        <div className="min-h-screen mt-[40vh] bg-gradient-to-br from-blue-100 to-purple-200 p-4">
            <div className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-3">
                {/* Add SKU Form */}
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
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                        >
                            Generate SKU
                        </button>
                    </form>
                </div>

                {/* Added SKUs */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-purple-600 flex items-center gap-2 mb-6">
                        <Package className="w-6 h-6" />
                        Added SKUs
                    </h2>
                    <div className="max-h-[60vh] overflow-y-auto">
                        {skus.length > 0 ? (
                            <div className="space-y-4">
                                {skus.map((sku, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition duration-200"
                                    >
                                        <span className="font-medium text-blue-600">{sku.skuCode}</span>
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

                {/* Search SKU */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-green-600 flex items-center gap-2 mb-6">
                        <Search className="w-6 h-6" />
                        Search SKU
                    </h2>
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Enter SKU Code"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSearch(e.target.value);
                            }}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    {searchResult && (
                        <div className="p-4 bg-green-50 border rounded-lg">
                            <h4 className="text-lg font-medium text-green-700">Search Result:</h4>
                            <p className="text-green-800">Product: {searchResult.productName}</p>
                            <p className="text-green-800">Vendor: {searchResult.vendorName}</p>
                            <p className="text-green-800">SKU: {searchResult.skuCode}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SkuManager;