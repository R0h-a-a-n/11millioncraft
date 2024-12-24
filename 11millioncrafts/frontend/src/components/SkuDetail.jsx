import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SkuDetail = () => {
    const { skuCode } = useParams();
    const [sku, setSku] = useState({
        productName: '',
        productNumber: '',
        vendorName: '',
        vendorNumber: '',
        cityCode: '',
        photo:'',
    });

    useEffect(() => {
        const collectdata = async () => {
            const response = await axios.get(`http://localhost:5000/sku/${skuCode}`);
            setSku(response.data);
        }
        if (skuCode) {
            collectdata();
        }
    }, [skuCode]);

    return (
        <div className="min-h-screen ml-[100vh] mt-[50vh] bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="px-8 py-6 bg-indigo-600">
                    <h1 className="text-2xl font-bold text-white">Product Details</h1>
                </div>
                
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Product Details</div>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <div className="text-xs text-gray-500">Product Name</div>
                                    <div className="text-lg font-semibold text-gray-800">{sku.productName || 'N/A'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500">SKU Code</div>
                                    <div className="text-lg font-semibold text-gray-800">{sku.skuCode || 'N/A'}</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Vendor Information</div>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <div className="text-xs text-gray-500">Vendor Name</div>
                                    <div className="text-lg font-semibold text-gray-800">{sku.vendorName || 'N/A'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500">City Code</div>
                                    <div className="text-lg font-semibold text-gray-800">{sku.cityCode || 'N/A'}</div>
                                </div>
                                <div className=""><img src="${sku.photo}" alt="" /></div>
                            </div>
                        </div>
                
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkuDetail;