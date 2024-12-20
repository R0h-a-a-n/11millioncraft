import React, { useState } from 'react';
import axios from 'axios';
import './skumanager.css'; 

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
        <div className="sku-manager">
            <div className="sku-form">
                <h3>Add SKU</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={formData.productName}
                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Product Number"
                        value={formData.productNumber}
                        onChange={(e) => setFormData({ ...formData, productNumber: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Vendor Name"
                        value={formData.vendorName}
                        onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Vendor Number"
                        value={formData.vendorNumber}
                        onChange={(e) => setFormData({ ...formData, vendorNumber: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="City Code"
                        value={formData.cityCode}
                        onChange={(e) => setFormData({ ...formData, cityCode: e.target.value })}
                    />
                    <button type="submit">Generate SKU</button>
                </form>
            </div>

          
            <div className="sku-list">
                <h3>Added SKUs</h3>
                <ul>
                    {skus.map((sku) => (
                        <li key={sku.skuCode}>
                            <strong>{sku.skuCode}</strong>: {sku.productName} by {sku.vendorName}
                        </li>
                    ))}
                </ul>
            </div>

       
            <div className="sku-search">
                <h3>Search SKU</h3>
                <input
                    type="text"
                    placeholder="Enter SKU Code"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch(e.target.value);
                    }}
                />
                {searchResult && (
                    <div className="search-result">
                        <h4>Search Result:</h4>
                        <p>
                            <strong>Product:</strong> {searchResult.productName} <br />
                            <strong>Vendor:</strong> {searchResult.vendorName} <br />
                            <strong>SKU:</strong> {searchResult.skuCode}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SkuManager;
