import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { SlidersHorizontal, Search, Star, Award, ShieldCheck, X, RefreshCw } from 'lucide-react';

export default function IDListings() {
  const { listings } = useStore();

  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(30000);
  const [minLevel, setMinLevel] = useState(50);
  const [selectedRank, setSelectedRank] = useState('All');
  const [loginMethod, setLoginMethod] = useState('All');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Available Ranks for filter dropdown
  const ranks = ['All', 'Grandmaster', 'Master', 'Heroic', 'Diamond IV', 'Diamond'];

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setMaxPrice(30000);
    setMinLevel(50);
    setSelectedRank('All');
    setLoginMethod('All');
    setOnlyVerified(false);
    setSortBy('popular');
  };

  // Filter and Sort logic
  const filteredListings = useMemo(() => {
    return listings
      .filter(item => item.status === 'approved')
      .filter(item => {
        const matchesSearch = 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.rareItems.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesPrice = item.price <= maxPrice;
        const matchesLevel = item.level >= minLevel;
        const matchesRank = selectedRank === 'All' || item.rank === selectedRank;
        const matchesLogin = loginMethod === 'All' || item.loginMethod === loginMethod;
        const matchesVerified = !onlyVerified || item.verified;

        return matchesSearch && matchesPrice && matchesLevel && matchesRank && matchesLogin && matchesVerified;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'level') return b.level - a.level;
        // fallback to popular / default ordering
        return b.skinsCount - a.skinsCount;
      });
  }, [listings, searchQuery, maxPrice, minLevel, selectedRank, loginMethod, onlyVerified, sortBy]);

  return (
    <div className="min-h-screen px-4 md:px-8 py-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-black uppercase tracking-wider text-white">
            🎮 Free Fire Account Catalog
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Browse verified, high-level gaming accounts with secure escrow transactions.
          </p>
        </div>
        <div className="text-xs font-bold text-gray-400 bg-gaming-card border border-gaming-border px-3.5 py-1.5 rounded-xl uppercase">
          Found: <span className="text-gaming-cyan">{filteredListings.length} Accounts</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* FILTERS PANEL (Desktop sidebar) */}
        <aside className="hidden lg:block w-72 shrink-0 glass-panel border border-gaming-border p-6 rounded-2xl space-y-6 h-fit sticky top-24">
          <div className="flex items-center justify-between border-b border-gaming-border pb-4">
            <h3 className="font-display text-xs font-black tracking-widest text-white uppercase flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gaming-red" />
              Search Filters
            </h3>
            <button 
              onClick={handleResetFilters}
              className="text-[10px] text-gray-400 hover:text-gaming-red font-black uppercase flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Search bar */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Keywords</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Evo gun, Hip hop..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-2.5 pl-9 rounded-xl focus:outline-none focus:border-gaming-red text-white"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
            </div>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-gray-400">
              <span>Max Price</span>
              <span className="text-gaming-cyan">₹{maxPrice}</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="30000" 
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-gaming-cyan"
            />
            <div className="flex justify-between text-[9px] font-bold text-gray-600">
              <span>₹500</span>
              <span>₹30,000+</span>
            </div>
          </div>

          {/* Min Level Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-gray-400">
              <span>Min Level</span>
              <span className="text-gaming-red">Lvl {minLevel}</span>
            </div>
            <input 
              type="range" 
              min="40" 
              max="90" 
              step="1"
              value={minLevel}
              onChange={(e) => setMinLevel(Number(e.target.value))}
              className="w-full accent-gaming-red"
            />
            <div className="flex justify-between text-[9px] font-bold text-gray-600">
              <span>Lvl 40</span>
              <span>Lvl 90</span>
            </div>
          </div>

          {/* Rank Dropdown */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Rank Level</label>
            <select 
              value={selectedRank}
              onChange={(e) => setSelectedRank(e.target.value)}
              className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl text-white focus:outline-none focus:border-gaming-red"
            >
              {ranks.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* Login Binding method */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Account Login Bind</label>
            <select 
              value={loginMethod}
              onChange={(e) => setLoginMethod(e.target.value)}
              className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl text-white focus:outline-none focus:border-gaming-red"
            >
              <option value="All">All Methods</option>
              <option value="Facebook">Facebook Only</option>
              <option value="Google">Google Only</option>
              <option value="VK">VK Only</option>
            </select>
          </div>

          {/* Verified toggle */}
          <label className="flex items-center gap-3 bg-gaming-dark p-3 rounded-xl border border-gaming-border cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={onlyVerified}
              onChange={(e) => setOnlyVerified(e.target.checked)}
              className="accent-gaming-cyan w-4 h-4 rounded"
            />
            <div>
              <span className="text-[10px] font-black text-white uppercase tracking-wider block">Verified Only</span>
              <span className="text-[9px] text-gray-500">Show catalog verified IDs only</span>
            </div>
          </label>
        </aside>

        {/* MAIN ID LISTINGS PANEL */}
        <div className="flex-1 space-y-6">
          
          {/* SEARCH, SORT & MOBILE FILTER TOGGLE */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between bg-gaming-card border border-gaming-border p-4 rounded-2xl">
            <div className="flex items-center gap-2">
              {/* Sort selector */}
              <label className="text-xs text-gray-400 font-bold uppercase tracking-wider shrink-0">Sort By:</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs bg-gaming-dark border border-gaming-border px-3 py-1.5 rounded-lg text-white focus:outline-none focus:border-gaming-cyan"
              >
                <option value="popular">Popularity / Skins</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="level">Level: High to Low</option>
              </select>
            </div>

            {/* Mobile Filter Button */}
            <button 
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center justify-center gap-2 bg-gaming-border text-white text-xs font-black uppercase py-2.5 px-4 rounded-xl border border-white/5 active:bg-gaming-dark"
            >
              <SlidersHorizontal className="w-4 h-4 text-gaming-red" />
              Configure Filters
            </button>
          </div>

          {/* CATALOG GRID */}
          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredListings.map((item) => (
                <div 
                  key={item.id}
                  className="glass-panel rounded-2xl border border-gaming-border overflow-hidden hover:border-gaming-red/50 hover:scale-[1.02] transition-all duration-300 flex flex-col group"
                >
                  {/* Card Thumbnail */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gaming-dark border-b border-gaming-border">
                    <img 
                      src={item.screenshots[0]} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    <div className="absolute top-3 left-3 bg-black/85 px-2.5 py-1 rounded-lg border border-white/10 text-[9px] font-black uppercase text-gaming-cyan flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-gaming-cyan" />
                      {item.rank}
                    </div>

                    <span className="absolute top-3 right-3 bg-gaming-red text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg">
                      LVL {item.level}
                    </span>

                    {item.verified && (
                      <span className="absolute bottom-3 left-3 bg-[#25D366]/20 border border-[#25D366]/40 px-2 py-0.5 rounded text-[8px] font-black text-[#25D366] uppercase tracking-widest">
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-semibold text-sm text-white line-clamp-1 group-hover:text-gaming-cyan transition-colors">
                        {item.title}
                      </h3>

                      {/* Details row */}
                      <div className="grid grid-cols-2 gap-2 mt-3 bg-black/45 p-2 rounded-xl text-[9px] text-gray-400 font-bold uppercase">
                        <div>Vault: <span className="text-white font-black">{item.vault || 0}</span></div>
                        <div>Skins: <span className="text-white font-black">{item.gunSkin || item.skins || 0}</span></div>
                        <div>Evo Guns: <span className="text-white font-black">{item.evoGunsCount || 0}</span></div>
                        <div>Login: <span className="text-white font-black">{item.loginMethod}</span></div>
                      </div>

                      {/* Items Tags */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {item.rareItems.slice(0, 3).map((ri, rIdx) => (
                          <span key={rIdx} className="bg-gaming-border text-gray-300 text-[8px] font-semibold px-2 py-0.5 rounded">
                            {ri}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Section */}
                    <div className="flex items-center justify-between pt-3 border-t border-gaming-border mt-2">
                      <div>
                        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Price</span>
                        <span className="text-sm font-black text-white">₹{item.price}</span>
                      </div>
                      <Link 
                        to={`/listings/${item.id}`}
                        className="bg-gaming-card hover:bg-gaming-red text-white text-xs font-black uppercase px-3.5 py-2 rounded-xl border border-gaming-border hover:border-transparent transition-all"
                      >
                        View Account
                      </Link>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-3xl border border-gaming-border p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-gaming-red/10 border border-gaming-red/30 rounded-2xl flex items-center justify-center text-gaming-red mx-auto">
                <X className="w-8 h-8" />
              </div>
              <h3 className="font-display text-lg font-bold text-white uppercase">No ID Found</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                We couldn't find any account matches with your active filters. Try adjusting price bounds or query tags.
              </p>
              <button 
                onClick={handleResetFilters}
                className="bg-gaming-red text-white text-xs font-black uppercase py-2.5 px-6 rounded-xl shadow-lg hover:brightness-115 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}

        </div>

      </div>

      {/* MOBILE FILTERS SHEET MODAL */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-end animate-fadeIn">
          <div className="w-80 bg-gaming-dark h-full border-l border-gaming-border p-6 flex flex-col justify-between animate-slideLeft">
            
            <div className="space-y-6 overflow-y-auto pr-1 no-scrollbar flex-1">
              <div className="flex items-center justify-between border-b border-gaming-border pb-4">
                <h3 className="font-display text-xs font-black tracking-widest text-white uppercase flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-gaming-red" />
                  Account Filters
                </h3>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Keywords */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Search Query</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search skins..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs bg-gaming-card border border-gaming-border px-3.5 py-2.5 pl-9 rounded-xl focus:outline-none focus:border-gaming-red text-white"
                  />
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                </div>
              </div>

              {/* Max Price */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-black uppercase text-gray-400">
                  <span>Max Price</span>
                  <span className="text-gaming-cyan">₹{maxPrice}</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="30000" 
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-gaming-cyan"
                />
              </div>

              {/* Min Level */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-black uppercase text-gray-400">
                  <span>Min Level</span>
                  <span className="text-gaming-red">Lvl {minLevel}</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="90" 
                  step="1"
                  value={minLevel}
                  onChange={(e) => setMinLevel(Number(e.target.value))}
                  className="w-full accent-gaming-red"
                />
              </div>

              {/* Rank */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Rank Category</label>
                <select 
                  value={selectedRank}
                  onChange={(e) => setSelectedRank(e.target.value)}
                  className="w-full text-xs bg-gaming-card border border-gaming-border px-3.5 py-2.5 rounded-xl text-white focus:outline-none focus:border-gaming-red"
                >
                  {ranks.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              {/* Login Method */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Login Binder</label>
                <select 
                  value={loginMethod}
                  onChange={(e) => setLoginMethod(e.target.value)}
                  className="w-full text-xs bg-gaming-card border border-gaming-border px-3.5 py-2.5 rounded-xl text-white focus:outline-none focus:border-gaming-red"
                >
                  <option value="All">All Methods</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Google">Google</option>
                  <option value="VK">VK</option>
                </select>
              </div>

              {/* Verified Only */}
              <label className="flex items-center gap-3 bg-gaming-card p-3 rounded-xl border border-gaming-border cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={onlyVerified}
                  onChange={(e) => setOnlyVerified(e.target.checked)}
                  className="accent-gaming-cyan w-4 h-4"
                />
                <span className="text-[10px] font-black text-white uppercase tracking-wider">Verified Only</span>
              </label>
            </div>

            <div className="pt-6 border-t border-gaming-border flex gap-3">
              <button 
                onClick={handleResetFilters}
                className="flex-1 bg-gaming-border text-white text-xs font-black uppercase py-3 rounded-xl"
              >
                Clear
              </button>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 bg-gaming-red text-white text-xs font-black uppercase py-3 rounded-xl"
              >
                Apply
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
