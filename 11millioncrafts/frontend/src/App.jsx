import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/Landingpage';
import Signup from './components/signup';
import Login from './components/login';
import Home from './components/Home';
import Products from './components/Products';
import Header from './components/Header';
import Form from './components/Form';
import SkuManager from './components/Skumanager';
import SkuDetail from './components/SkuDetail';
import Edit from './components/Edit';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Superadmin from './components/superadmin';

function App() {
  // Track login state and persist it
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('isLoggedIn') === 'true' 
  );

  useEffect(() => {

    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/home" />;
  };

  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />


        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Header />
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Header />
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/form"
          element={
            <ProtectedRoute>
              <Header />
              <Form />

            </ProtectedRoute>
          }
        />
        <Route
          path="/skugen"
          element={
            <ProtectedRoute>
              <Header/>
              <SkuManager/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sku/:skuCode"
          element={
            <ProtectedRoute>
              <Header/>
              <SkuDetail/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/edit/:skuCode"
          element={
            <ProtectedRoute>
              <Header/>
              <Edit/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/supe"
          element={
            <ProtectedRoute>
              <Header/>
              <Superadmin/>
            </ProtectedRoute>
          }
        />
        </Routes>
        
    </Router>
  );
}

export default App;
