import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const decoded = token ? jwtDecode(token) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
    window.location.reload();
  };

  const navigation = [
    { name: 'Home', href: '/home', current: false },
    { name: 'Products', href: '/products', current: false },
    { name: 'SkuGen', href: '/skugen', current: false },
    decoded?.issuperadmin && { name: 'SuperAdmin', href: '/superadmin', current: false },
  ].filter(Boolean);

  return (
    <Disclosure as="nav" className="bg-gray-800 mb-[90vh] fixed w-full top-0 left-0 z-50 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8" id="height">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <DisclosureButton
              className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">

            <div className="flex shrink-0 items-center">
              <h1
                className="text-xl mr-80 sm:text-2xl font-bold text-white cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => navigate('/home')}
              >
                11millioncraft
              </h1>
            </div>

            <div className="hidden sm:block ml-40">
              <div className="flex space-x-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `px-6 py-2 text-lg text-white hover:text-purple-200 transition-colors duration-200 font-medium ${isActive ? 'border-b-2 border-white' : ''}`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

              {token && (<button
                  onClick={handleLogout}
                  className="ml-auto px-4 py-2  bg-gray-500 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                >
                  Logout
                </button>)}
                
              </div>
            </div>
          </div>
        </div>
      </div>

  
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-purple-600"
            >
              {item.name}
            </DisclosureButton>
          ))}
         {token && (
          <DisclosureButton
          onClick={handleLogout}
          className="block rounded-md px-3 py-2 text-base font-medium text-white bg-gray-500 hover:bg-red-700"
        >
          Logout
        </DisclosureButton>
      
         )}
          </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export default Header;
