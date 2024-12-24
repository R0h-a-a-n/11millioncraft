import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../index.css';

function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const role = localStorage.getItem('role');
    setIsAdmin(role === 'Admin'); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); 
    navigate('/'); 
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>11millioncraft</h1>
      </div>
      <nav className="header-right">
        <ul>
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/about">About Us</NavLink></li>
          <li><NavLink to="/contact">Contact Us</NavLink></li>
          <li><NavLink to="/services">Services</NavLink></li>
          <li><NavLink to="/products">Products</NavLink></li>
          <li><NavLink to="/skugen">SkuGen</NavLink></li>
          {isAdmin && <li><NavLink to="/form">Form</NavLink></li>}
        </ul>
      </nav>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </header>
  );
}

export default Header;
