import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Check, X, AlertTriangle, HelpCircle, UserCheck, Flame, DollarSign, Upload, Plus, Trash2 } from 'lucide-react';

export default function AdminPanel() {
  const { listings, addAdminListing, approveListing, rejectListing, orders, tickets, currentUser } = useStore();
  const navigate = useNavigate();

  // States
  const [activeTab, setActiveTab] = useState('listings'); // listings, orders, users, upload

  // Upload Form State
  const [form, setForm] = useState({
    title: '',
    price: '',
    idNo: '',
    level: '',
    primeLevel: '',
    bundles: '',
    accountUid: '',
    rank: 'Grandmaster',
    skinsCount: '',
    evoGunsCount: '',
    diamonds: '',
    loginMethod: 'Facebook',
    verified: true,
    rareItems: '',
    description: '',
  });

  const [imageFiles, setImageFiles] = useState([]);       // File objects
  const [imagePreviews, setImagePreviews] = useState([]); // Preview URLs
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [formSuccess, setFormSuccess] = useState(false);

  // Calculations
  const pendingListings = listings.filter(l => l.status === 'pending');
  const activeListingsCount = listings.filter(l => l.status === 'approved').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  // Users mock list
  const [userList, setUserList] = useState([
    { id: "usr-01", username: "ProGamer99", email: "progamer@axrstore.com", role: "admin", status: "active" },
    { id: "usr-02", username: "GamerPro_FF", email: "gamerpro@gmail.com", role: "user", status: "active" },
    { id: "usr-03", username: "AlphaKiler", email: "alphakiler@gmail.com", role: "user", status: "active" },
    { id: "usr-04", username: "NoobMaster99", email: "noobmaster@yhoo.com", role: "user", status: "suspended" }
  ]);

  const handleToggleUserStatus = (userId) => {
    setUserList(userList.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          status: u.status === 'active' ? 'suspended' : 'active'
        };
      }
      return u;
    }));
  };

  const handleToggleUserRole = (userId) => {
    setUserList(userList.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          role: u.role === 'admin' ? 'user' : 'admin'
        };
      }
      return u;
    }));
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 50) {
      alert('Maximum 50 images allowed per listing.');
      return;
    }
    setImageFiles(files);
    // Generate preview URLs
    const previews = files.map(f => URL.createObjectURL(f));
    setImagePreviews(previews);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress(0);

    const rareItemsArray = form.rareItems
      ? form.rareItems.split(',').map(item => item.trim()).filter(Boolean)
      : ["LEVEL " + form.level, "PRIME " + form.primeLevel];

    const submissionData = {
      title: form.title || `Free Fire ID No. ${form.idNo || '75'}`,
      price: Number(form.price) || 16999,
      idNo: form.idNo || '75',
      level: Number(form.level) || 63,
      primeLevel: Number(form.primeLevel) || 8,
      bundles: Number(form.bundles) || 390,
      accountUid: form.accountUid || '1909016280',
      rank: form.rank,
      skinsCount: Number(form.skinsCount) || 150,
      evoGunsCount: Number(form.evoGunsCount) || 4,
      diamonds: Number(form.diamonds) || 150,
      loginMethod: form.loginMethod,
      verified: form.verified,
      rareItems: rareItemsArray,
      description: form.description || "HONEST OWNS !!",
    };

    // Pass imageFiles for Firebase Storage upload
    await addAdminListing(submissionData, imageFiles, (pct) => setUploadProgress(pct));

    setIsUploading(false);
    setUploadProgress(100);
    setFormSuccess(true);

    // Reset form
    setForm({
      title: '', price: '', idNo: '', level: '', primeLevel: '',
      bundles: '', accountUid: '', rank: 'Grandmaster',
      skinsCount: '', evoGunsCount: '', diamonds: '',
      loginMethod: 'Facebook', verified: true, rareItems: '', description: '',
    });
    setImageFiles([]);
    setImagePreviews([]);
    setUploadProgress(0);

    setTimeout(() => {
      setFormSuccess(false);
      setActiveTab('listings');
    }, 2000);
  };

  if (currentUser.role !== 'admin') {
    navigate('/login', { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen px-4 md:px-8 py-8 max-w-6xl mx-auto space-y-8">

      {/* Admin Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-black uppercase tracking-wider text-white">
            🛡️ Moderator Control Panel
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Review seller listings, moderate order transfers, and manage user access tokens.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('upload')}
          className="px-5 py-3 bg-gradient-to-r from-gaming-cyan to-[#00b0ff] text-gaming-dark font-display font-black text-xs uppercase tracking-widest rounded-xl hover:brightness-110 transition-all flex items-center gap-2 active:scale-95 shadow-lg neon-glow-cyan"
        >
          <Plus className="w-4 h-4 text-gaming-dark" /> Upload New ID
        </button>
      </div>

      {/* Stats Counter Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="bg-gaming-card border border-gaming-border p-4.5 rounded-2xl">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Pending Queue</span>
          <span className="text-lg font-black text-gaming-red">{pendingListings.length} Listings</span>
        </div>

        <div className="bg-gaming-card border border-gaming-border p-4.5 rounded-2xl">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Active Catalog</span>
          <span className="text-lg font-black text-white">{activeListingsCount} IDs Live</span>
        </div>

        <div className="bg-gaming-card border border-gaming-border p-4.5 rounded-2xl">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Total Sales Volume</span>
          <span className="text-lg font-black text-gaming-cyan">₹{totalRevenue}</span>
        </div>

        <div className="bg-gaming-card border border-gaming-border p-4.5 rounded-2xl">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Dispute Tickets</span>
          <span className="text-lg font-black text-[#ff6b00]">{tickets.length} Tickets</span>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gaming-border pb-1">
        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 font-display text-xs font-black uppercase tracking-widest transition-colors ${activeTab === 'listings' ? 'text-gaming-red border-b-2 border-gaming-red' : 'text-gray-400 hover:text-white'
            }`}
        >
          Listing Approvals ({pendingListings.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 font-display text-xs font-black uppercase tracking-widest transition-colors ${activeTab === 'orders' ? 'text-gaming-cyan border-b-2 border-gaming-cyan' : 'text-gray-400 hover:text-white'
            }`}
        >
          Transactions Logs ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 font-display text-xs font-black uppercase tracking-widest transition-colors ${activeTab === 'users' ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white'
            }`}
        >
          User Accounts
        </button>

        <button
          onClick={() => setActiveTab('upload')}
          className={`pb-3 font-display text-xs font-black uppercase tracking-widest transition-colors ${activeTab === 'upload' ? 'text-gaming-cyan border-b-2 border-gaming-cyan' : 'text-gray-400 hover:text-white'
            }`}
        >
          Direct ID Uploader
        </button>
      </div>

      {/* Tab Panels */}
      <div>

        {/* PANEL 1: LISTING APPROVALS */}
        {activeTab === 'listings' && (
          <div className="space-y-4">
            {pendingListings.length === 0 ? (
              <div className="glass-panel p-10 rounded-2xl border border-gaming-border text-center text-xs text-gray-400">
                No listings pending moderator approval. All submitted accounts are processed!
              </div>
            ) : (
              pendingListings.map((item) => (
                <div
                  key={item.id}
                  className="bg-gaming-card border border-gaming-border p-5 rounded-2xl flex flex-col md:flex-row gap-5 items-start md:items-center justify-between"
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-12 bg-gaming-dark rounded-lg overflow-hidden shrink-0 border border-gaming-border">
                      <img src={item.screenshots[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-gaming-red/10 text-gaming-red border border-gaming-red/20 text-[8px] font-black uppercase px-2 py-0.5 rounded">
                          Lvl {item.level}
                        </span>
                        <span className="bg-gaming-cyan/10 text-gaming-cyan border border-gaming-cyan/20 text-[8px] font-black uppercase px-2 py-0.5 rounded">
                          {item.rank}
                        </span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase">Seller: {item.sellerName}</span>
                      </div>
                      <h4 className="text-xs font-black text-white mt-1.5 uppercase tracking-wide">{item.title}</h4>
                      <p className="text-[10px] text-gray-400 mt-1 line-clamp-1 max-w-xl">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between border-t border-gaming-border md:border-transparent pt-3 md:pt-0">
                    <div className="text-right">
                      <span className="text-[9px] text-gray-500 font-bold uppercase block">Asking Price</span>
                      <span className="text-xs font-black text-white">₹{item.price}</span>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => approveListing(item.id)}
                        className="bg-[#25D366] hover:bg-[#20ba56] text-white p-2 rounded-lg transition-all"
                        title="Approve Listing"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => rejectListing(item.id)}
                        className="bg-gaming-red hover:bg-gaming-red/90 text-white p-2 rounded-lg transition-all"
                        title="Reject Listing"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        )}

        {/* PANEL 2: TRANSACTIONS LOGS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="glass-panel p-10 rounded-2xl border border-gaming-border text-center text-xs text-gray-400">
                No orders registered on platform yet.
              </div>
            ) : (
              <div className="bg-gaming-card border border-gaming-border rounded-2xl overflow-hidden overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gaming-dark border-b border-gaming-border font-bold uppercase text-[9px] tracking-widest text-gray-400">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Account</th>
                      <th className="p-4">Buyer Bind Info</th>
                      <th className="p-4 text-right">Value</th>
                      <th className="p-4 text-right">Escrow Payout</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gaming-border font-medium text-gray-300">
                    {orders.map((o) => (
                      <tr key={o.orderId} className="hover:bg-gaming-border/10">
                        <td className="p-4 font-bold text-white">{o.orderId}</td>
                        <td className="p-4">{o.date}</td>
                        <td className="p-4 max-w-64 truncate uppercase font-bold text-gray-400">{o.accountDetails}</td>
                        <td className="p-4">{o.loginDetails.account} ({o.loginDetails.method})</td>
                        <td className="p-4 text-right font-black text-gaming-cyan">₹{o.total}</td>
                        <td className="p-4 text-right">
                          <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase ${o.status === 'Completed'
                              ? 'bg-[#25D366]/10 text-[#25D366]'
                              : 'bg-gaming-orange/10 text-gaming-orange'
                            }`}>
                            {o.status === 'Completed' ? 'Released' : 'Locked'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* PANEL 3: USER ACCOUNTS */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="bg-gaming-card border border-gaming-border rounded-2xl overflow-hidden overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gaming-dark border-b border-gaming-border font-bold uppercase text-[9px] tracking-widest text-gray-400">
                    <th className="p-4">User Details</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role Permission</th>
                    <th className="p-4">Account State</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gaming-border font-medium text-gray-300">
                  {userList.map((u) => (
                    <tr key={u.id} className="hover:bg-gaming-border/10">
                      <td className="p-4 font-bold text-white">{u.username}</td>
                      <td className="p-4">{u.email}</td>
                      <td className="p-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase ${u.role === 'admin' ? 'bg-gaming-red/10 text-gaming-red border border-gaming-red/20' : 'bg-gaming-border text-gray-400'
                          }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase ${u.status === 'active' ? 'bg-[#25D366]/15 text-[#25D366]' : 'bg-gaming-red/15 text-gaming-red'
                          }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleToggleUserRole(u.id)}
                          className="bg-gaming-border hover:bg-gaming-border/80 border border-white/5 text-[9px] font-black uppercase px-2.5 py-1.5 rounded transition-all text-gray-300"
                        >
                          Change Role
                        </button>
                        <button
                          onClick={() => handleToggleUserStatus(u.id)}
                          className={`text-[9px] font-black uppercase px-2.5 py-1.5 rounded transition-all ${u.status === 'active'
                              ? 'bg-gaming-red/10 hover:bg-gaming-red/20 text-gaming-red'
                              : 'bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366]'
                            }`}
                        >
                          {u.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PANEL 4: DIRECT ID UPLOADER */}
        {activeTab === 'upload' && (
          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-gaming-border max-w-3xl mx-auto space-y-6">

            {/* Header info */}
            <div className="flex items-center gap-3 pb-4 border-b border-gaming-border">
              <div className="w-10 h-10 bg-gaming-cyan/10 border border-gaming-cyan/25 rounded-xl flex items-center justify-center text-gaming-cyan">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-sm font-black uppercase tracking-wider text-white">Direct Upload to Detail</h3>
                <p className="text-[10px] text-gray-400">Fill in exactly the fields required to construct a premium verified catalog item.</p>
              </div>
            </div>

            {formSuccess && (
              <div className="bg-[#25D366]/10 border border-[#25D366]/30 p-4 rounded-xl text-center text-xs font-bold text-[#25D366]">
                ⚡ Listing Uploaded Successfully! Redirecting to Approved Queue...
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-5 text-xs text-gray-300">

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* ID No */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">ID No *</label>
                  <input
                    type="text"
                    name="idNo"
                    value={form.idNo}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g. 75"
                    className="w-full bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-gaming-cyan text-white"
                  />
                </div>

                {/* Account UID */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Account UID *</label>
                  <input
                    type="text"
                    name="accountUid"
                    value={form.accountUid}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g. 1909016280"
                    className="w-full bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-gaming-cyan text-white"
                  />
                </div>

                {/* Price */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g. 16999"
                    className="w-full bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-gaming-cyan text-white"
                  />
                </div>

                {/* Level */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Level *</label>
                  <input
                    type="number"
                    name="level"
                    value={form.level}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g. 63"
                    className="w-full bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-gaming-cyan text-white"
                  />
                </div>

                {/* Prime Level */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Prime Level *</label>
                  <input
                    type="number"
                    name="primeLevel"
                    value={form.primeLevel}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g. 8"
                    className="w-full bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-gaming-cyan text-white"
                  />
                </div>

                {/* Bundles */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Bundles Count *</label>
                  <input
                    type="number"
                    name="bundles"
                    value={form.bundles}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g. 390"
                    className="w-full bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-gaming-cyan text-white"
                  />
                </div>

                {/* Rank Selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Rank *</label>
                  <select
                    name="rank"
                    value={form.rank}
                    onChange={handleFormChange}
                    className="w-full bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-gaming-cyan text-white"
                  >
                    <option value="Grandmaster">Grandmaster</option>
                    <option value="Master">Master</option>
                    <option value="Heroic">Heroic</option>
                    <option value="Diamond IV">Diamond IV</option>
                    <option value="Diamond">Diamond</option>
                  </select>
                </div>

                {/* Login Method */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Login Bind *</label>
                  <select
                    name="loginMethod"
                    value={form.loginMethod}
                    onChange={handleFormChange}
                    className="w-full bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-gaming-cyan text-white"
                  >
                    <option value="Facebook">Facebook</option>
                    <option value="Google">Google</option>
                    <option value="VK">VK</option>
                    <option value="Twitter">Twitter</option>
                  </select>
                </div>

                {/* Title */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Listing Display Title (Optional)</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleFormChange}
                    placeholder="e.g. Level 63 Max Account with 8 Prime Levels"
                    className="w-full bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-gaming-cyan text-white"
                  />
                </div>

                {/* Rare Items (comma separated) */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Rare Items Included (Comma-separated)</label>
                  <textarea
                    name="rareItems"
                    value={form.rareItems}
                    onChange={handleFormChange}
                    placeholder="LEVEL 63, PRIME8, 4 max 1 semi, 10 m18 skins, Op vault, 80+ emotes, Rai arrival"
                    rows="2"
                    className="w-full bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-gaming-cyan text-white resize-none"
                  />
                </div>

                {/* Image Upload (File Picker) */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                    Screenshots / Images (up to 50 images)
                  </label>
                  <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gaming-border hover:border-gaming-cyan rounded-xl p-5 cursor-pointer bg-gaming-dark transition-colors group">
                    <Upload className="w-7 h-7 text-gray-500 group-hover:text-gaming-cyan mb-1.5 transition-colors" />
                    <span className="text-xs text-gray-400 group-hover:text-gaming-cyan transition-colors font-semibold">
                      Click to select images
                    </span>
                    <span className="text-[10px] text-gray-600 mt-0.5">JPG, PNG, WEBP — max 50 files</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageSelect}
                    />
                  </label>

                  {/* Image count badge */}
                  {imageFiles.length > 0 && (
                    <p className="text-[10px] text-gaming-cyan font-bold">
                      ✓ {imageFiles.length} image{imageFiles.length > 1 ? 's' : ''} selected
                    </p>
                  )}

                  {/* Preview Grid */}
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 max-h-40 overflow-y-auto pr-1">
                      {imagePreviews.map((src, i) => (
                        <div key={i} className="aspect-square rounded-lg overflow-hidden border border-gaming-border bg-gaming-card">
                          <img src={src} alt={`preview-${i}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-gray-400">
                        <span>Uploading to Firebase Storage...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gaming-border rounded-full h-1.5">
                        <div
                          className="bg-gaming-cyan h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleFormChange}
                    placeholder="HONEST OWNS !!"
                    rows="3"
                    className="w-full bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-gaming-cyan text-white resize-none"
                  />
                </div>

                {/* Verified Toggle */}
                <div className="flex items-center gap-3 pt-2 md:col-span-2">
                  <input
                    type="checkbox"
                    name="verified"
                    id="verified"
                    checked={form.verified}
                    onChange={handleFormChange}
                    className="w-4 h-4 accent-gaming-cyan rounded"
                  />
                  <label htmlFor="verified" className="text-[10px] font-black uppercase tracking-wider text-gray-300 select-none cursor-pointer">
                    Verified & Secure Transaction Badge Active
                  </label>
                </div>

              </div>

              <div className="pt-4 border-t border-gaming-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('listings')}
                  disabled={isUploading}
                  className="px-5 py-3 bg-gaming-card hover:bg-gaming-border border border-gaming-border text-white font-display font-black text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-8 py-3 bg-gradient-to-r from-gaming-cyan to-[#00b0ff] text-gaming-dark font-display font-black text-xs uppercase tracking-widest rounded-xl hover:brightness-110 transition-all shadow-lg neon-glow-cyan disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isUploading ? (
                    <><span className="w-3.5 h-3.5 border-2 border-gaming-dark/30 border-t-gaming-dark rounded-full animate-spin" /> Uploading {uploadProgress}%</>
                  ) : 'Publish Listing'}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>

    </div>
  );
}
