import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MessageSquare, Flame, HelpCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gaming-dark border-t border-gaming-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.JPG" 
                alt="AXR Logo" 
                className="w-9 h-9 rounded-lg object-cover border border-gaming-red"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <span className="font-display text-lg font-bold text-white tracking-widest">
                AXR <span className="text-gaming-red">FF STORE</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              India's premier high-tier Free Fire account marketplace. Buy and sell with 100% security through our proprietary Escrow protection protocol.
            </p>
            <div className="flex items-center gap-3 text-xs text-gaming-cyan font-black tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4 text-gaming-cyan animate-pulse" />
              Escrow Secure Certified
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-bold tracking-wider text-white uppercase mb-4">Marketplace</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/listings" className="text-gray-400 hover:text-gaming-red transition-colors">Browse Gaming IDs</Link>
              </li>
              <li>
                <Link to="/sell" className="text-gray-400 hover:text-gaming-red transition-colors">List Your Account</Link>
              </li>
              <li>
                <Link to="/static" className="text-gray-400 hover:text-gaming-red transition-colors">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-gaming-red transition-colors">My Purchases</Link>
              </li>
            </ul>
          </div>

          {/* Legal / Policy links */}
          <div>
            <h4 className="font-display text-sm font-bold tracking-wider text-white uppercase mb-4">Trust & Safety</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/static" className="text-gray-400 hover:text-gaming-red transition-colors">Escrow Protection Info</Link>
              </li>
              <li>
                <Link to="/static" className="text-gray-400 hover:text-gaming-red transition-colors">Refund & Return Policy</Link>
              </li>
              <li>
                <Link to="/static" className="text-gray-400 hover:text-gaming-red transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/static" className="text-gray-400 hover:text-gaming-red transition-colors">Anti-Scam Guide</Link>
              </li>
            </ul>
          </div>

          {/* Contact Support */}
          <div>
            <h4 className="font-display text-sm font-bold tracking-wider text-white uppercase mb-4">Official Channels</h4>
            <p className="text-xs text-gray-400 mb-4">
              Need instant support? Message us on our 24/7 official handles.
            </p>
            <div className="flex flex-col gap-2.5">
              <a 
                href="https://wa.me/916387486383" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-white py-2 rounded-lg text-xs font-black tracking-wide transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp Live Help
              </a>
              <a 
                href="https://t.me/axr_ff_store" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[#0088cc] hover:bg-[#0077b5] text-white py-2 rounded-lg text-xs font-black tracking-wide transition-all"
              >
                <Flame className="w-3.5 h-3.5" />
                Telegram Channels
              </a>
            </div>
          </div>

        </div>

        <div className="h-[1px] bg-gaming-border my-8"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          <div>
            &copy; {new Date().getFullYear()} AXR FF Store. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Powered by SecuShield Tech</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gaming-cyan inline-block"></span>
            <span>100% Non-Affiliated with Garena FF</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
