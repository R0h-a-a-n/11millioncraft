import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/Landingpage';
import Signup from './components/signup';
import Login from './components/login';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Services from './components/Services';
import Products from './components/Products';
import Header from './components/Header';
import Form from './components/Form';
import SkuManager from './components/Skumanager';
import SkuDetail from './components/SkuDetail';
import Edit from './components/Edit';

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
          path="/about"
          element={
            <ProtectedRoute>
              <Header />
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Header />
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Header />
              <Services />
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
          path="/edit"
          element={
            <ProtectedRoute>
              <Header/>
              <Edit/>
            </ProtectedRoute>
          }
        />
        </Routes>
    </Router>
  );
}

export default App;
