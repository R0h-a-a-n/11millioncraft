import React, { useEffect, useState } from 'react';
import './Product.css';//product page
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
  return (
    <div className="product-container">
      <div className="product-row">
        {products.map((product) => {
          const imageUrl = product.image ? product.image.replace(/\\/g, '/') : ''; 

          return (
            <div className="product-card" key={product._id}>
                {product.photo && (
                            <img
                                src={`http://localhost:5000/${product.photo}`}
                                alt={product.productName}
                                className="w-full h-auto rounded-lg shadow-sm"
                                onError={(e) => {
                                    e.target.src = '/api/placeholder/400/300';
                                    console.error('Error loading image');
                                }}/>)}
              <h3 onClick={()=>{navigate('/superadmin')}} >{product.productName}</h3>
              <p>
                {product.skuCode}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Product;
