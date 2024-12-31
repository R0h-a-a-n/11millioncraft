import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/inventory');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (skuCode) => {
    navigate(`/sku/${skuCode}`);
  };

  return (
    <div className="min-h-screen w-screen mt-[90vh] bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 text-white flex flex-col">
      <div className="flex flex-col items-center justify-center flex-grow p-8">
        <h2 className="mb-8 text-4xl sm:text-5xl font-bold text-center text-blue-300">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl px-6">
          {products.map((product) => (
            <div
              className="bg-gray-700 hover:bg-gray-600 transition-all duration-300 rounded-lg shadow-lg p-4 cursor-pointer"
              key={product._id}
              onClick={() => handleProductClick(product.skuCode)}
            >
              {product.photo && (
                <img
                  src={`http://localhost:5000/${product.photo}`}
                  alt={product.productName}
                  className="w-full h-[50vh] rounded-t-lg shadow-sm"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/400/300';
                    console.error('Error loading image');
                  }}
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-bold text-blue-300 mb-2">
                  {product.productName}
                </h3>
                <p className="text-sm text-gray-400">SKU: {product.skuCode}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
