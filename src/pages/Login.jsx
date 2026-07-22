import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Shield, Eye, EyeOff, AlertTriangle, Gamepad2 } from 'lucide-react';

// Admin credentials
const ADMIN_CREDENTIALS = {
  username: 'axradmin',
  password: 'axrffstore@2026'
};

export default function Login() {
  const { loginAsAdmin } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (
        form.username === ADMIN_CREDENTIALS.username &&
        form.password === ADMIN_CREDENTIALS.password
      ) {
        loginAsAdmin();
        navigate('/admin');
      } else {
        setError('Invalid credentials. Access denied.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gaming-dark relative overflow-hidden">
      
      {/* Background ambient glow orbs */}
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-gaming-red/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-gaming-cyan/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10 space-y-6">
        
        {/* Logo + Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-gaming-red shadow-lg neon-glow-red">
              <img
                src="/logo.JPG"
                alt="AXR Logo"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gaming-dark flex items-center justify-center text-gaming-red">
                <Gamepad2 className="w-8 h-8" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-display text-2xl font-black uppercase tracking-widest text-white">
              AXR <span className="text-gaming-red">FF STORE</span>
            </h1>
            <p className="text-[10px] uppercase font-bold tracking-widest text-gaming-cyan mt-0.5">
              Moderator Access Portal
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="glass-panel border border-gaming-border rounded-2xl p-7 space-y-5">
          
          <div className="flex items-center gap-2.5 pb-4 border-b border-gaming-border">
            <Shield className="w-5 h-5 text-gaming-red" />
            <span className="font-display text-xs font-black uppercase tracking-widest text-white">Admin Login</span>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-gaming-red/10 border border-gaming-red/30 p-3 rounded-xl text-xs font-bold text-gaming-red">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                autoComplete="username"
                placeholder="Enter admin username"
                className="w-full bg-gaming-dark border border-gaming-border px-4 py-3 rounded-xl focus:outline-none focus:border-gaming-red text-white text-sm transition-colors"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  placeholder="Enter admin password"
                  className="w-full bg-gaming-dark border border-gaming-border px-4 py-3 pr-11 rounded-xl focus:outline-none focus:border-gaming-red text-white text-sm transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-500 hover:text-gaming-cyan transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-1 bg-gradient-to-r from-gaming-red to-gaming-orange text-white font-display font-black text-sm uppercase tracking-widest rounded-xl hover:brightness-110 transition-all shadow-lg neon-glow-red active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" /> Login to Admin Panel
                </>
              )}
            </button>

          </form>

          <p className="text-center text-[10px] text-gray-600 font-medium">
            Unauthorized access is strictly prohibited.
          </p>
        </div>

        {/* Back link */}
        <p className="text-center text-xs text-gray-500">
          <a href="/" className="hover:text-gaming-cyan transition-colors font-semibold">← Return to Store</a>
        </p>

      </div>
    </div>
  );
}
