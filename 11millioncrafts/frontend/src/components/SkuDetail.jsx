import React, { useEffect, useState } from 'react';
import { ArrowLeft, Package } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const SkuDetail = () => {
    const [skuDetail, setSkuDetail] = useState(null);
    const { skuCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSkuDetail = async () => {
            try {
                const response = await fetch(`http://localhost:5000/sku/${skuCode}`);
                const data = await response.json();
                setSkuDetail(data);
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
        <div className="min-h-screen mt-[60vh]  p-4">
            <div className="max-w-3xl mx-auto rounded-lg  p-6">
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
            </div>
        </div>
    );
};

export default SkuDetail;
