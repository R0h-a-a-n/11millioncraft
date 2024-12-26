import React, { useEffect, useState } from 'react';
import { ArrowLeft, Package, MapPin, Truck, Building, Tag, Calendar } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const SkuDetail = () => {
    const [skuDetail, setSkuDetail] = useState(null);
    const [vendorproducts, setVendorproducts] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const { skuCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSkuDetail = async () => {
            try {
                const response = await fetch(`http://localhost:5000/sku/${skuCode}`);
                const data = await response.json();
                setSkuDetail(data);

                if (data.vendorName) {
                    const response = await fetch(`http://localhost:5000/vendor/${data.vendorName}/products`);
                    const vendorData = await response.json();
                    setVendorproducts(vendorData);
                }
            } catch (err) {
                console.error('Error fetching SKU details:', err);
            }
        };
        fetchSkuDetail();
    }, [skuCode]);

    if (!skuDetail) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen mt-[90vh] p-4">
            <div className="max-w-4xl mx-auto rounded-lg p-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to SKU List
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <Package className="w-8 h-8 text-purple-600" />
                    <h1 className="text-3xl font-semibold text-purple-600">{skuDetail.skuCode}</h1>
                </div>

                <div className="cursor-pointer" onClick={()=>{navigate(`/edit/${skuCode}`)}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>

                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h2 className="font-medium text-gray-700">Product Details</h2>
                            <p className="text-gray-600">Name: {skuDetail.productName}</p>
                            <p className="text-gray-600">Number: {skuDetail.productNumber}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h2 className="font-medium text-gray-700">Vendor Details</h2>
                            <p className="text-gray-600">Name: {skuDetail.vendorName}</p>
                            <p className="text-gray-600">Number: {skuDetail.vendorNumber}</p>
                            {skuDetail.vendorprice && (
                                <p className="text-gray-600">Vendor Price: ₹{skuDetail.vendorprice}</p>
                            )}
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h2 className="font-medium text-gray-700">Location</h2>
                            <p className="text-gray-600">City Code: {skuDetail.cityCode}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h2 className="font-medium text-gray-700 mb-3">Product Image</h2>
                        {skuDetail.photo && (
                            <img
                                src={`http://localhost:5000/${skuDetail.photo}`}
                                alt={skuDetail.productName}
                                className="w-full h-auto rounded-lg shadow-sm"
                                onError={(e) => {
                                    e.target.src = '/api/placeholder/400/300';
                                    console.error('Error loading image');
                                }}
                            />
                        )}
                    </div>
                </div>
            
                <div>
                    <div className="mt-10">
                        {vendorproducts.length > 0 && (
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-semibold text-purple-600">
                                        Other Products from {skuDetail.vendorName}
                                    </h2>
                                    <button 
                                        onClick={() => setIsVisible(!isVisible)}
                                        className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        {isVisible ? 'Hide Products' : 'Show Products'}
                                    </button>
                                </div>
                                <div className={`grid gap-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                                    {vendorproducts
                                        .filter((SKU) => SKU.skuCode !== skuCode)
                                        .map((SKU) => (
                                            <div
                                                key={SKU.skuCode}
                                                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                            >
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <Tag className="w-5 h-5 text-purple-600" />
                                                            <h3 className="text-lg font-medium text-gray-800">
                                                                {SKU.productName}
                                                            </h3>
                                                        </div>
                                                        
                                                        <div className="space-y-2">
                                                            <p className="text-gray-600 flex items-center gap-2">
                                                                <Package className="w-4 h-4" />
                                                                SKU Code: {SKU.skuCode}
                                                            </p>
                                                            <p className="text-gray-600">
                                                                Product Number: {SKU.productNumber}
                                                            </p>
                                                            {SKU.vendorprice && (
                                                                <p className="text-gray-600">
                                                                    Vendor Price: ₹{SKU.vendorprice}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <Building className="w-4 h-4 text-gray-600" />
                                                                <p className="text-gray-600">
                                                                    Vendor: {SKU.vendorName} (#{SKU.vendorNumber})
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="w-4 h-4 text-gray-600" />
                                                                <p className="text-gray-600">
                                                                    Location: {SKU.cityCode}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {SKU.photo && (
                                                            <img
                                                                src={`http://localhost:5000/${SKU.photo}`}
                                                                alt={SKU.productName}
                                                                className="w-full h-48 object-cover rounded-lg shadow-sm"
                                                                onError={(e) => {
                                                                    e.target.src = '/api/placeholder/400/300';
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkuDetail;