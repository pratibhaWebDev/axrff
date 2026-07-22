import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SupportWidgets from './components/SupportWidgets';

// Pages imports
import Home from './pages/Home';
import IDListings from './pages/IDListings';
import IDDetails from './pages/IDDetails';
import SellYourID from './pages/SellYourID';
import CartCheckout from './pages/CartCheckout';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import StaticPages from './pages/StaticPages';
import Login from './pages/Login';

import './App.css';

function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gaming-dark text-gray-200 selection:bg-gaming-red selection:text-white">
          {/* Main Navigation */}
          <Navbar />

          {/* Main Page Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<IDListings />} />
              <Route path="/listings/:id" element={<IDDetails />} />
              <Route path="/sell" element={<SellYourID />} />
              <Route path="/cart" element={<CartCheckout />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/static" element={<StaticPages />} />
            </Routes>
          </main>

          {/* Floating quick contacts & live support */}
          <SupportWidgets />

          {/* Footer branding */}
          <Footer />
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
