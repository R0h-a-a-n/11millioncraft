import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

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
    <header className="bg-gradient-to-r from-purple-400/90 to-blue-500/50 backdrop-blur-sm h-[10vh] px-6 py-2 h-[15vh] shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-full">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold cursor-pointer text-white tracking-wide hover:scale-105 transition-transform duration-200" onClick={()=>navigate('/home')}>
            11millioncraft
          </h1>
        </div>

        <nav className="flex-grow md:mx-6">
          <ul className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            <li>
              <NavLink 
                to="/home" 
                className={({ isActive }) => 
                  `text-white hover:text-purple-200 transition-colors duration-200 font-medium ${
                    isActive ? 'border-b-2 border-white' : ''
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/products"
                className={({ isActive }) => 
                  `text-white hover:text-purple-200 transition-colors duration-200 font-medium ${
                    isActive ? 'border-b-2 border-white' : ''
                  }`
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/skugen"
                className={({ isActive }) => 
                  `text-white hover:text-purple-200 transition-colors duration-200 font-medium ${
                    isActive ? 'border-b-2 border-white' : ''
                  }`
                }
              >
                SkuGen
              </NavLink>
            </li>
            {isAdmin && (
              <li>
                <NavLink 
                  to="/products/form"
                  className={({ isActive }) => 
                    `text-white hover:text-purple-200 transition-colors duration-200 font-medium ${
                      isActive ? 'border-b-2 border-white' : ''
                    }`
                  }
                >
                  Form
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <button 
          onClick={handleLogout}
          className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;