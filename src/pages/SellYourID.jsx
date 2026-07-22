import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Info, UploadCloud, CheckCircle2, ChevronRight } from 'lucide-react';

export default function SellYourID() {
  const { submitListing, currentUser } = useStore();
  const navigate = useNavigate();

  if (currentUser?.role !== 'admin') {
    navigate('/login', { replace: true });
    return null;
  }


  // Form State
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    level: '',
    rank: 'Heroic',
    skinsCount: '',
    evoGunsCount: '',
    diamonds: '',
    loginMethod: 'Google',
    description: '',
    rareItemsInput: '',
    screenshotUrlInput: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Parse rare items
    const rareItems = formData.rareItemsInput
      ? formData.rareItemsInput.split(',').map(item => item.trim()).filter(Boolean)
      : ["Cobra MP40", "Heroic Badge", "Criminal Outfit"];

    // Setup format to submit
    const submission = {
      title: formData.title,
      price: Number(formData.price) || 999,
      level: Number(formData.level) || 50,
      rank: formData.rank,
      skinsCount: Number(formData.skinsCount) || 20,
      evoGunsCount: Number(formData.evoGunsCount) || 0,
      diamonds: Number(formData.diamonds) || 0,
      loginMethod: formData.loginMethod,
      description: formData.description || "Excellent Free Fire ID, safe bind details.",
      rareItems: rareItems,
      screenshots: formData.screenshotUrlInput 
        ? [formData.screenshotUrlInput]
        : ["https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop"]
    };

    submitListing(submission);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen px-4 md:px-8 py-8 max-w-4xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-black uppercase tracking-wider text-white">
          🚀 Sell Your Free Fire Account
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Cash out your gaming hard work. Submit details, pass verification, and get paid securely.
        </p>
      </div>

      {submitted ? (
        /* SUCCESS SCREEN */
        <div className="glass-panel border-gaming-cyan/35 border p-8 md:p-12 rounded-3xl text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 bg-gaming-cyan/10 border border-gaming-cyan/30 rounded-2xl flex items-center justify-center text-gaming-cyan mx-auto animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider">Listing Submitted Successfully!</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              Your account details have been queued for moderator review. We check KD stats, bind validity, and verify details to prevent fake uploads.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-gaming-dark/60 p-4 rounded-xl border border-gaming-border text-[11px] text-left text-gray-400 space-y-2">
            <span className="font-black uppercase text-gaming-orange block">What happens next?</span>
            <div className="flex gap-2.5 items-center">
              <span className="w-5 h-5 rounded-full bg-gaming-border flex items-center justify-center text-[10px] font-black text-white shrink-0">1</span>
              <span>Moderators verify ID existence and items level in 1-2 hours.</span>
            </div>
            <div className="flex gap-2.5 items-center">
              <span className="w-5 h-5 rounded-full bg-gaming-border flex items-center justify-center text-[10px] font-black text-white shrink-0">2</span>
              <span>ID status switches from <b className="text-gaming-orange">Pending</b> to <b className="text-gaming-cyan">Approved</b>.</span>
            </div>
            <div className="flex gap-2.5 items-center">
              <span className="w-5 h-5 rounded-full bg-gaming-border flex items-center justify-center text-[10px] font-black text-white shrink-0">3</span>
              <span>Approved account displays live in the listings store.</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <button 
              onClick={() => navigate('/listings')} 
              className="bg-gaming-cyan hover:bg-gaming-cyan/90 text-gaming-dark text-xs font-black uppercase tracking-wider py-3 px-6 rounded-xl transition-all"
            >
              Browse Catalog
            </button>
            <button 
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  title: '',
                  price: '',
                  level: '',
                  rank: 'Heroic',
                  skinsCount: '',
                  evoGunsCount: '',
                  diamonds: '',
                  loginMethod: 'Google',
                  description: '',
                  rareItemsInput: '',
                  screenshotUrlInput: ''
                });
              }}
              className="bg-gaming-border text-white text-xs font-black uppercase tracking-wider py-3 px-6 rounded-xl transition-all"
            >
              List Another ID
            </button>
          </div>
        </div>
      ) : (
        /* SUBMISSION FORM */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form container: 8 Cols */}
          <form 
            onSubmit={handleSubmit}
            className="lg:col-span-8 glass-panel p-6 md:p-8 rounded-3xl border border-gaming-border space-y-6"
          >
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white pb-3 border-b border-gaming-border">
              Account Registration Details
            </h3>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Account Listing Title</label>
              <input 
                type="text"
                name="title"
                required
                placeholder="e.g., VVIP Account - 6 Evo Weapons Max Level + Cobra Bundle"
                value={formData.title}
                onChange={handleChange}
                className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-3 rounded-xl focus:outline-none focus:border-gaming-red text-white"
              />
            </div>

            {/* Level, Price, Rank row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Expected Price (INR)</label>
                <input 
                  type="number"
                  name="price"
                  required
                  placeholder="₹ Expected Price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-3 rounded-xl focus:outline-none focus:border-gaming-red text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Account Level</label>
                <input 
                  type="number"
                  name="level"
                  required
                  placeholder="Level e.g., 72"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-3 rounded-xl focus:outline-none focus:border-gaming-red text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Rank Achieved</label>
                <select 
                  name="rank"
                  value={formData.rank}
                  onChange={handleChange}
                  className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-3 rounded-xl focus:outline-none focus:border-gaming-red text-white"
                >
                  <option value="Grandmaster">Grandmaster</option>
                  <option value="Master">Master</option>
                  <option value="Heroic">Heroic</option>
                  <option value="Diamond IV">Diamond IV</option>
                  <option value="Diamond">Diamond</option>
                </select>
              </div>

            </div>

            {/* Skins, Evo guns, diamonds, login binds */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Skins Count</label>
                <input 
                  type="number"
                  name="skinsCount"
                  required
                  placeholder="e.g., 120"
                  value={formData.skinsCount}
                  onChange={handleChange}
                  className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-3 rounded-xl focus:outline-none focus:border-gaming-red text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Evo Weapons Count</label>
                <input 
                  type="number"
                  name="evoGunsCount"
                  placeholder="e.g., 4"
                  value={formData.evoGunsCount}
                  onChange={handleChange}
                  className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-3 rounded-xl focus:outline-none focus:border-gaming-red text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Diamonds Available</label>
                <input 
                  type="number"
                  name="diamonds"
                  placeholder="e.g., 250"
                  value={formData.diamonds}
                  onChange={handleChange}
                  className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-3 rounded-xl focus:outline-none focus:border-gaming-red text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Login Bind Method</label>
                <select 
                  name="loginMethod"
                  value={formData.loginMethod}
                  onChange={handleChange}
                  className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-3 rounded-xl focus:outline-none focus:border-gaming-red text-white"
                >
                  <option value="Google">Google Link</option>
                  <option value="Facebook">Facebook Link</option>
                  <option value="VK">VK Link</option>
                </select>
              </div>

            </div>

            {/* Rare items checklist comma separated */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                Rare Outfits / Weapons List (Comma Separated)
              </label>
              <input 
                type="text"
                name="rareItemsInput"
                placeholder="e.g., Sakura Bundle, Hip Hop, Cobra MP40 Max, Green Flame Draco"
                value={formData.rareItemsInput}
                onChange={handleChange}
                className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-3 rounded-xl focus:outline-none focus:border-gaming-red text-white"
              />
            </div>

            {/* Screenshots Input link */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                Lobby/Weapons Screenshot URL (Optional)
              </label>
              <input 
                type="text"
                name="screenshotUrlInput"
                placeholder="e.g., https://images.unsplash.com/... (If left empty, we auto-fill a cool placeholder)"
                value={formData.screenshotUrlInput}
                onChange={handleChange}
                className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-3 rounded-xl focus:outline-none focus:border-gaming-red text-white"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Full Description</label>
              <textarea 
                name="description"
                rows="4"
                placeholder="Provide a brief account description. Mention item details, KD ratios, elite passes completed, etc."
                value={formData.description}
                onChange={handleChange}
                className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-3 rounded-xl focus:outline-none focus:border-gaming-red text-white resize-none"
              />
            </div>

            {/* Submit CTA */}
            <button 
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-gaming-red to-gaming-orange text-white font-display font-black text-xs uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-[0.98] transition-all"
            >
              Submit ID For Moderator Approval
            </button>

          </form>

          {/* Guidelines Sidebar: 4 Cols */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Guide Card */}
            <div className="glass-panel p-6 rounded-3xl border border-gaming-border space-y-4">
              <h4 className="font-display text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gaming-cyan" />
                Moderation Rules
              </h4>
              
              <ul className="space-y-3.5 text-xs text-gray-400">
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 bg-gaming-cyan rounded-full mt-1.5 shrink-0"></span>
                  <span>All bindings must be completely unlinked from personal numbers.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 bg-gaming-cyan rounded-full mt-1.5 shrink-0"></span>
                  <span>Fake listings or listing incorrect stats will result in immediate seller ban.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 bg-gaming-cyan rounded-full mt-1.5 shrink-0"></span>
                  <span>Listing price should be realistic. Exaggerated prices will be rejected.</span>
                </li>
              </ul>
            </div>

            {/* How it works Card */}
            <div className="glass-panel p-6 rounded-3xl border border-gaming-border space-y-4">
              <h4 className="font-display text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-gaming-orange" />
                How Sales Work
              </h4>
              
              <div className="space-y-3 text-xs text-gray-400">
                <p>
                  1. Once listed, buyers can checkout and make payment.
                </p>
                <p>
                  2. Funds are securely locked in AXR Escrow.
                </p>
                <p>
                  3. You will receive a dashboard ticket to provide login credentials.
                </p>
                <p>
                  4. After buyer binds the account, the balance is released.
                </p>
              </div>
            </div>

          </aside>

        </div>
      )}

    </div>
  );
}
