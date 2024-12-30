import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const token = localStorage.getItem('token');

  return (
    <header className="fixed h-[5vh] py-[8vh] top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <h1 
            className="text-xl sm:text-2xl font-bold text-white cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => navigate('/home')}
          >
            11millioncraft 
          </h1>

          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <nav className={`absolute sm:relative top-full left-0 right-0 bg-black/30 backdrop-blur-md sm:backdrop-blur-none sm:bg-transparent ${isMenuOpen ? 'block' : 'hidden'} sm:block mt-0 sm:mt-0`}>
            <ul className="flex flex-col sm:flex-row items-center gap-2 p-3 sm:p-0">
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `block px-3 py-1.5 text-sm text-white hover:text-purple-200 transition-colors duration-200 font-medium ${
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
                    `block px-3 py-1.5 text-sm text-white hover:text-purple-200 transition-colors duration-200 font-medium ${
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
                    `block px-3 py-1.5 text-sm text-white hover:text-purple-200 transition-colors duration-200 font-medium ${
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
                      `block px-3 py-1.5 text-sm text-white hover:text-purple-200 transition-colors duration-200 font-medium ${
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

          {token && (
            <button
              onClick={handleLogout}
              className="hidden sm:block px-4 py-1.5 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Logout
            </button>
          )}
        </div>

        {token && isMenuOpen && (
          <div className="sm:hidden p-3 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-1.5 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;