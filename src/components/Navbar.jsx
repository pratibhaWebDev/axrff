import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Gamepad2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logoutAdmin } = useStore();
  const navigate = useNavigate();

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const isAdmin = currentUser?.role === 'admin';

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  return (
    <nav className="glass-panel sticky top-0 z-50 border-b border-gaming-border px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-gaming-red group-hover:border-gaming-cyan transition-colors duration-300">
            <img 
              src="/logo.JPG" 
              alt="AXR Logo" 
              className="w-full h-full object-cover relative z-10"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            {/* Fallback Icon if logo fails to render */}
            <div className="absolute inset-0 bg-gaming-dark flex items-center justify-center text-gaming-red group-hover:text-gaming-cyan transition-colors duration-300 z-0">
              <Gamepad2 className="w-6 h-6" />
            </div>
          </div>
          <div>
            <span className="font-display text-lg font-black tracking-wider text-white block group-hover:text-gaming-red transition-colors duration-300">
              AXR <span className="text-gaming-red group-hover:text-white">FF STORE</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gaming-cyan block -mt-1">
              Verified Marketplace
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link to="/" className="text-sm font-semibold hover:text-gaming-red transition-colors">Home</Link>
          <Link to="/listings" className="text-sm font-semibold hover:text-gaming-red transition-colors">Browse IDs</Link>
          <Link to="/static" className="text-sm font-semibold hover:text-gaming-red transition-colors">FAQ & Support</Link>
        </div>

        {/* Action Area */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/listings" 
            className="bg-gradient-to-r from-gaming-red to-gaming-orange text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl hover:brightness-110 transition-all duration-300 shadow-lg neon-glow-red"
          >
            Explore Catalog
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-gaming-card border border-gaming-border rounded-lg text-gray-300"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gaming-border flex flex-col gap-4 animate-fadeIn">
          <Link to="/" onClick={handleNavClick} className="text-base font-semibold py-1 hover:text-gaming-red transition-colors">Home</Link>
          <Link to="/listings" onClick={handleNavClick} className="text-base font-semibold py-1 hover:text-gaming-red transition-colors">Browse IDs</Link>
          <Link to="/static" onClick={handleNavClick} className="text-base font-semibold py-1 hover:text-gaming-red transition-colors">FAQ & Support</Link>
        </div>
      )}
    </nav>
  );
}
