import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, Copy, Check, Shield, MessageCircle, Maximize2, ChevronLeft, ChevronRight, Award } from 'lucide-react';

export default function IDDetails() {
  const { id } = useParams();
  const { listings } = useStore();

  // Find ID from state
  const account = listings.find(item => item.id === id);

  // States
  const [activeImg, setActiveImg] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!account) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="glass-panel p-8 rounded-2xl max-w-sm space-y-4">
          <Award className="w-12 h-12 text-gaming-red mx-auto" />
          <h2 className="font-display text-lg font-bold text-white uppercase">ID Not Found</h2>
          <p className="text-xs text-gray-400">The account details you are trying to view do not exist or have been purchased.</p>
          <Link to="/listings" className="inline-block bg-gaming-red text-white text-xs font-black uppercase py-2.5 px-6 rounded-xl">
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  // Fallbacks for listings without the new screenshot/details fields
  const screenshots = account.screenshots && account.screenshots.length > 0
    ? account.screenshots
    : ["https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop"];
  
  const accountUid = account.accountUid || "1909016280";
  const idNo = account.idNo || account.id?.replace(/\D/g, '') || "75";
  const primeLevel = account.primeLevel || "8";
  const bundles = account.bundles || "390";
  const description = account.description || "HONEST OWNS !!";
  const priceFormatted = account.price ? account.price.toLocaleString('en-IN') : "16,999";
  const rareItemsList = account.rareItems || ["LEVEL 63", "PRIME8", "4 max 1 semi", "10 m18 skins", "Op vault", "80+ emotes", "Rai arrival"];

  const handleCopyUid = () => {
    navigator.clipboard.writeText(accountUid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBuyOnWhatsApp = () => {
    const text = `Hello AXR Store, I want to purchase this Free Fire ID:\n\n` +
                 `• ID No: ${idNo}\n` +
                 `• Account UID: ${accountUid}\n` +
                 `• Price: ₹${account.price}\n` +
                 `• Level: ${account.level}\n` +
                 `• Prime Level: ${primeLevel}\n` +
                 `• Bundles: ${bundles}\n\n` +
                 `Please let me know how to proceed!`;
    const whatsappUrl = `https://wa.me/916387486383?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePrevImg = () => {
    setActiveImg((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const handleNextImg = () => {
    setActiveImg((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-gaming-dark text-gray-200 px-4 md:px-8 py-6 max-w-7xl mx-auto space-y-6">
      
      {/* Top Header Row */}
      <div className="flex justify-between items-center">
        <Link 
          to="/listings" 
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-gaming-cyan" /> BACK
        </Link>
        <span className="bg-[#a855f7]/20 border border-[#a855f7]/40 text-[#c084fc] text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
          Premium
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Image Gallery & UID (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Screenshot Container */}
          <div className="relative aspect-[16/10] bg-gaming-card border border-gaming-border rounded-2xl overflow-hidden group">
            <img 
              src={screenshots[activeImg]} 
              alt={account.title} 
              className="w-full h-full object-cover"
            />
            
            {/* Expand / Maximize Button */}
            <button className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 text-white rounded-lg transition-all border border-white/10">
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Navigation Arrows */}
            {screenshots.length > 1 && (
              <>
                <button 
                  onClick={handlePrevImg}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-all border border-white/10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleNextImg}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-all border border-white/10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Page Count Badge */}
            <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-bold text-gray-300">
              {activeImg + 1} / {screenshots.length}
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {screenshots.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {screenshots.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImg(index)}
                  className={`relative shrink-0 w-20 aspect-[16/10] bg-gaming-card rounded-lg overflow-hidden border-2 transition-all ${
                    activeImg === index ? 'border-gaming-cyan neon-glow-cyan' : 'border-gaming-border hover:border-gray-500'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Account UID Card */}
          <div className="bg-[#111115] border border-gaming-border p-4.5 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Account UID</span>
              <span className="font-display text-lg font-black tracking-widest text-gaming-cyan">{accountUid}</span>
            </div>
            <button 
              onClick={handleCopyUid}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#17171e] hover:bg-gaming-border text-white text-xs font-black uppercase tracking-wider rounded-lg border border-gaming-border transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#25D366]" /> COPIED
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> COPY
                </>
              )}
            </button>
          </div>

        </div>

        {/* Right Column: Pricing, Stats, Badge, WA Checkout, Rare Items & Description (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Top Row: Price & ID No Cards */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Price Card */}
            <div className="bg-[#111115] border border-gaming-border p-4.5 rounded-xl">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">Price</span>
              <span className="font-display text-2xl font-black text-gaming-cyan">₹{priceFormatted}</span>
            </div>

            {/* ID No Card */}
            <div className="bg-[#111115] border border-gaming-border p-4.5 rounded-xl">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">ID No</span>
              <span className="font-display text-2xl font-black text-gaming-cyan">{idNo}</span>
            </div>

          </div>

          {/* Middle Row: Level, Prime Level, Bundles Cards */}
          <div className="grid grid-cols-3 gap-3">
            
            {/* Level Card */}
            <div className="bg-[#111115] border border-gaming-border p-4 rounded-xl">
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block mb-1">Level</span>
              <span className="font-display text-lg font-black text-gaming-cyan">{account.level}</span>
            </div>

            {/* Prime Level Card */}
            <div className="bg-[#111115] border border-gaming-border p-4 rounded-xl">
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block mb-1">Prime Level</span>
              <span className="font-display text-lg font-black text-gaming-cyan">{primeLevel}</span>
            </div>

            {/* Bundles Card */}
            <div className="bg-[#111115] border border-gaming-border p-4 rounded-xl">
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block mb-1">Bundles</span>
              <span className="font-display text-lg font-black text-gaming-cyan">{bundles}</span>
            </div>

          </div>

          {/* Verified & Secure Badge */}
          <div className="bg-[#052e16]/30 border border-[#22c55e]/30 px-4 py-3 rounded-xl flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-[#22c55e]" />
            <span className="text-[11px] font-bold text-[#22c55e] uppercase tracking-wider">
              Verified & Secure Transaction
            </span>
          </div>

          {/* BUY NOW WhatsApp Button */}
          <button 
            onClick={handleBuyOnWhatsApp}
            className="w-full py-4 bg-[#22c55e] hover:bg-[#1a9f4c] text-white font-display font-black text-sm uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5 fill-white" /> BUY NOW
          </button>

          {/* Rare Items Card */}
          <div className="bg-[#111115] border border-gaming-border p-5 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-gaming-cyan" /> Rare Items Included
            </div>
            <div className="flex flex-wrap gap-2">
              {rareItemsList.map((item, idx) => (
                <span 
                  key={idx} 
                  className="bg-transparent border border-gaming-cyan/35 text-gaming-cyan text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-[#111115] border border-gaming-border p-5 rounded-xl space-y-2">
            <div className="font-display text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
              <span className="text-gaming-cyan">#</span> Description
            </div>
            <p className="text-xs text-gray-400 font-medium">
              {description}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
