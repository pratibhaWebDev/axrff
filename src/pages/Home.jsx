import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Zap, UserCheck, Flame, ChevronRight, Award, Trophy, Compass } from 'lucide-react';

export default function Home() {
  const { listings } = useStore();

  
  // Show only approved & marked featured or first 3 listings as trending
  const featuredListings = listings
    .filter(item => item.status === 'approved')
    .slice(0, 4);

  return (
    <div className="min-h-screen pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 px-6 md:px-12 border-b border-gaming-border bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gaming-red/10 via-transparent to-transparent">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gaming-red/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] rounded-full bg-gaming-cyan/5 blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-gaming-red/10 border border-gaming-red/35 px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-gaming-red uppercase animate-pulse">
            <Flame className="w-3.5 h-3.5" /> Season 2026 Live Drops
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.05]">
            BUY & SELL <br/>
            <span className="bg-gradient-to-r from-gaming-red via-gaming-orange to-gaming-cyan bg-clip-text text-transparent neon-text-red">
              PREMIUM FREE FIRE
            </span> <br/>
            GAMING ACCOUNTS
          </h1>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-400 font-medium">
            India's most trusted marketplace for rare Free Fire IDs. High stats, evo gun levels, rare bundles, and instant credentials delivery protected by Escrow.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link 
              to="/listings" 
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gaming-red to-gaming-orange text-white font-display font-black text-sm uppercase tracking-wider rounded-xl hover:brightness-110 transition-all hover:scale-105 active:scale-95 duration-200 shadow-lg neon-glow-red"
            >
              Browse Shop
            </Link>
            <Link 
              to="/sell" 
              className="w-full sm:w-auto px-8 py-4 bg-gaming-card hover:bg-gaming-border text-white border border-gaming-border font-display font-black text-sm uppercase tracking-wider rounded-xl transition-all hover:scale-105 active:scale-95 duration-200"
            >
              Sell Your ID
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl flex items-center gap-5 border border-gaming-border hover:border-gaming-red/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gaming-red/10 flex items-center justify-center text-gaming-red border border-gaming-red/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wide">Safe Deals (Escrow)</h3>
              <p className="text-xs text-gray-400 mt-1">Sellers are only paid after you verify credentials.</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex items-center gap-5 border border-gaming-border hover:border-gaming-cyan/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gaming-cyan/10 flex items-center justify-center text-gaming-cyan border border-gaming-cyan/20">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wide">Fast Delivery</h3>
              <p className="text-xs text-gray-400 mt-1">Credentials transferred within 15-30 minutes of payment.</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex items-center gap-5 border border-gaming-border hover:border-gaming-orange/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gaming-orange/10 flex items-center justify-center text-gaming-orange border border-gaming-orange/20">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wide">Verified Sellers</h3>
              <p className="text-xs text-gray-400 mt-1">100% ID and phone-number verification on listing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured / Trending Carousel Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl md:text-2xl font-black uppercase tracking-wider text-white">
              🔥 Trending Drops
            </h2>
            <p className="text-xs text-gray-400 mt-1">High-demand gaming IDs loaded with rare bundles and items</p>
          </div>
          <Link 
            to="/listings" 
            className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-gaming-cyan hover:text-white transition-colors"
          >
            View All Listings <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Carousel / Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredListings.map((item) => (
            <div 
              key={item.id}
              className="glass-panel rounded-2xl border border-gaming-border overflow-hidden hover:scale-[1.03] hover:border-gaming-red/50 transition-all duration-300 flex flex-col group"
            >
              
              {/* Card Image Thumbnail */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gaming-dark">
                <img 
                  src={item.screenshots[0]} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay Tags */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-gaming-cyan">
                  <Trophy className="w-3.5 h-3.5 text-gaming-cyan" />
                  {item.rank}
                </div>

                <div className="absolute top-3 right-3 bg-gaming-red text-white px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider">
                  LVL {item.level}
                </div>

                {item.verified && (
                  <div className="absolute bottom-3 left-3 bg-[#25D366]/20 backdrop-blur-md border border-[#25D366]/40 px-2 py-0.5 rounded-md text-[9px] font-black text-[#25D366] uppercase tracking-wider">
                    Verified ID
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-gaming-red transition-colors text-white">
                    {item.title}
                  </h3>
                  
                  {/* Stats list */}
                  <div className="grid grid-cols-2 gap-2 mt-3 bg-black/35 p-2.5 rounded-xl border border-gaming-border text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                    <div>
                      Skins: <span className="text-white font-black">{item.skinsCount}+</span>
                    </div>
                    <div>
                      Evo Guns: <span className="text-white font-black">{item.evoGunsCount}</span>
                    </div>
                    <div>
                      Diamonds: <span className="text-white font-black">💎 {item.diamonds}</span>
                    </div>
                    <div>
                      Login: <span className="text-white font-black">{item.loginMethod}</span>
                    </div>
                  </div>

                  {/* Rare items badges */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {item.rareItems.slice(0, 2).map((ritem, rIdx) => (
                      <span key={rIdx} className="bg-gaming-border text-gray-300 border border-white/5 text-[9px] font-semibold px-2 py-0.5 rounded">
                        {ritem}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & Link */}
                <div className="flex items-center justify-between pt-3 border-t border-gaming-border mt-4">
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Price</span>
                    <span className="text-base font-black text-white">₹{item.price}</span>
                  </div>
                  <Link 
                    to={`/listings/${item.id}`}
                    className="bg-gaming-card hover:bg-gaming-red text-white text-xs font-black uppercase tracking-wider px-3.5 py-2 rounded-xl border border-gaming-border hover:border-transparent transition-all"
                  >
                    View details
                  </Link>
                </div>

              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 px-6 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-display text-xl md:text-2xl font-black uppercase tracking-wider text-white">
            🛡️ WHY CHOOSE AXR
          </h2>
          <p className="text-xs text-gray-400 mt-1">We address security, credentials verification, and support to protect your trades.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-6 rounded-2xl border border-gaming-border hover:border-gaming-red/20 transition-all flex flex-col gap-4">
            <div className="w-12 h-12 bg-gaming-red/10 border border-gaming-red/25 rounded-xl flex items-center justify-center text-gaming-red">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">Escrow Trade Security</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We hold the buyer's funds in escrow. We only release payments to the seller after the buyer logs in, confirms account stats match, and successfully binds their own email/phone.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-gaming-border hover:border-gaming-cyan/20 transition-all flex flex-col gap-4">
            <div className="w-12 h-12 bg-gaming-cyan/10 border border-gaming-cyan/25 rounded-xl flex items-center justify-center text-gaming-cyan">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">Authenticity Checks</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every seller must upload screen captures showing lobby profiles, outfits, and weapon collections. Our moderators double check to filter fake accounts and spam.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-gaming-border hover:border-gaming-orange/20 transition-all flex flex-col gap-4">
            <div className="w-12 h-12 bg-gaming-orange/10 border border-gaming-orange/25 rounded-xl flex items-center justify-center text-gaming-orange">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">No-Reclaim Guarantee</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Our accounts include documentation verification rules. If an account is reclaimed due to seller negligence or security bugs within 7 days, we issue a full refund.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Testimonials / Reviews */}
      <section className="py-12 px-6 max-w-7xl mx-auto space-y-8 bg-gradient-to-b from-transparent to-gaming-card/30 rounded-3xl border border-gaming-border/40">
        <div className="text-center">
          <h2 className="font-display text-xl md:text-2xl font-black uppercase tracking-wider text-white">
            ⭐ Gamer Feedback
          </h2>
          <p className="text-xs text-gray-400 mt-1">Read reviews from verified buyers and sellers in the marketplace</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gaming-card border border-gaming-border p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-1.5 text-gaming-orange">
              {"★".repeat(5)}
            </div>
            <p className="text-xs text-gray-300 italic">
              "Bought a Grandmaster rank ID with Cobalt MP40 max. Transfer took only 20 minutes on Discord/WhatsApp support. Fully secure! Highly recommended."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[10px] font-black text-white uppercase tracking-wider">Aman_FF</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span className="text-[9px] text-[#25D366] font-bold uppercase">Verified Buyer</span>
            </div>
          </div>

          <div className="bg-gaming-card border border-gaming-border p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-1.5 text-gaming-orange">
              {"★".repeat(5)}
            </div>
            <p className="text-xs text-gray-300 italic">
              "Listed my level 73 ID and expected ₹3,000. It got approved and bought within 2 hours. Escrow release took only a day after buyer verification. Amazing place!"
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[10px] font-black text-white uppercase tracking-wider">Rohan Gamer</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span className="text-[9px] text-gaming-cyan font-bold uppercase">Verified Seller</span>
            </div>
          </div>

          <div className="bg-gaming-card border border-gaming-border p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-1.5 text-gaming-orange">
              {"★".repeat(5)}
            </div>
            <p className="text-xs text-gray-300 italic">
              "Customer support is exceptionally friendly. They helped me bind my Facebook account securely and held the cash until everything was double-checked. Best platform."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[10px] font-black text-white uppercase tracking-wider">Karan_Yt</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span className="text-[9px] text-[#25D366] font-bold uppercase">Verified Buyer</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
