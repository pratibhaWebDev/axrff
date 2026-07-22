import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Trash2, ShieldCheck, Lock, CreditCard, Send, CheckCircle, RefreshCw } from 'lucide-react';

export default function CartCheckout() {
  const { cart, removeFromCart, checkoutCart, currentUser } = useStore();
  const navigate = useNavigate();


  // Form states
  const [buyerAccount, setBuyerAccount] = useState('');
  const [phone, setPhone] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi, card, netbanking
  
  // Payment Overlay simulator
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [processStep, setProcessStep] = useState('');

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) return;

    setProcessing(true);
    setProcessStep('Initializing Payment Secure Gateway...');

    setTimeout(() => {
      setProcessStep('Verifying Funds & Escrow Hold... (Razorpay SECURE)');
      
      setTimeout(() => {
        setProcessStep('Authenticating 3D-Secure credentials OTP...');
        
        setTimeout(() => {
          setProcessStep('Transaction Approved! Generating Order Ticket...');
          
          setTimeout(() => {
            // execute store context checkout
            checkoutCart({ accountName: buyerAccount });
            setSuccess(true);
            setProcessing(false);
            
            setTimeout(() => {
              navigate('/dashboard');
            }, 1500);
          }, 1000);
        }, 1000);
      }, 1200);
    }, 1000);
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 text-center animate-fadeIn">
        <div className="glass-panel p-8 rounded-3xl max-w-sm border border-gaming-cyan/35 space-y-4">
          <div className="w-16 h-16 bg-gaming-cyan/15 rounded-full flex items-center justify-center text-gaming-cyan mx-auto">
            <CheckCircle className="w-9 h-9" />
          </div>
          <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider">Payment Received!</h2>
          <p className="text-xs text-gray-400">
            ₹{cartTotal} holds in Escrow. Check your Dashboard for account credentials and delivery state.
          </p>
          <span className="text-[10px] text-gaming-cyan uppercase tracking-widest font-black block animate-pulse">
            Redirecting to dashboard...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-8 py-8 max-w-6xl mx-auto space-y-8 relative">
      
      {/* PROCESSING MODAL OVERLAY */}
      {processing && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-panel border border-gaming-red/40 p-8 rounded-3xl max-w-sm text-center space-y-5">
            <div className="w-14 h-14 border-4 border-gaming-red border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-widest">Securing Payment</h4>
            <p className="text-xs text-gray-400 font-bold tracking-wide animate-pulse">
              {processStep}
            </p>
            <div className="pt-2 flex items-center justify-center gap-1.5 text-[9px] text-gaming-cyan font-black uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-gaming-cyan" /> Escrow Protocol V2 Enabled
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-black uppercase tracking-wider text-white">
          🛒 Checkout & Order Placement
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Review items, choose UPI/Card, and authorize secure escrow payments.
        </p>
      </div>

      {cart.length === 0 ? (
        /* EMPTY CART STATE */
        <div className="glass-panel p-12 rounded-3xl border border-gaming-border text-center space-y-4">
          <span className="text-4xl">🛒</span>
          <h3 className="font-display text-lg font-bold text-white uppercase">Your Cart is Empty</h3>
          <p className="text-xs text-gray-400">Add premium Free Fire accounts from our catalog to get started.</p>
          <Link to="/listings" className="inline-block bg-gaming-red text-white text-xs font-black uppercase tracking-wider py-3 px-6 rounded-xl">
            Browse IDs
          </Link>
        </div>
      ) : (
        /* CART & CHECKOUT FORM GRID */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Cart Items & Details Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Cart Items list */}
            <div className="glass-panel p-5 rounded-2xl border border-gaming-border space-y-4">
              <h3 className="font-display text-xs font-black uppercase tracking-wider text-white border-b border-gaming-border pb-3">
                Shopping Cart Items ({cart.length})
              </h3>
              
              <div className="divide-y divide-gaming-border">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0 items-center justify-between">
                    <div className="flex gap-3.5 items-center">
                      <div className="w-16 h-12 bg-gaming-dark border border-gaming-border rounded-lg overflow-hidden shrink-0">
                        <img src={item.screenshots[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                        <div className="flex items-center gap-1.5 text-[9px] text-gray-400 font-bold uppercase mt-1">
                          <span>Lvl {item.level}</span>
                          <span>•</span>
                          <span>{item.rank}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-white">₹{item.price}</span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-500 hover:text-gaming-red p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Details Form */}
            <div className="glass-panel p-5 rounded-2xl border border-gaming-border space-y-4">
              <h3 className="font-display text-xs font-black uppercase tracking-wider text-white border-b border-gaming-border pb-3">
                Contact & Delivery Bind Info
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-gray-400">Contact Email</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="name@gmail.com"
                    value={buyerAccount}
                    onChange={(e) => setBuyerAccount(e.target.value)}
                    className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl text-white focus:outline-none focus:border-gaming-red"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-gray-400">Mobile Number (WhatsApp Support)</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 99999 99999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl text-white focus:outline-none focus:border-gaming-red"
                  />
                </div>
              </div>

              <div className="bg-gaming-dark/60 p-3.5 rounded-xl border border-gaming-border text-[10px] text-gray-400 leading-relaxed">
                Note: Verify email/phone format. Credential logins and OTP verification handles will be coordinates through these contact details.
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Payment Method & Order Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Payment Method Selector */}
            <div className="glass-panel p-5 rounded-2xl border border-gaming-border space-y-4">
              <h3 className="font-display text-xs font-black uppercase tracking-wider text-white border-b border-gaming-border pb-3">
                Select Payment Channel
              </h3>

              {/* Grid selectors */}
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'upi'
                      ? 'border-gaming-cyan bg-gaming-cyan/5 text-gaming-cyan'
                      : 'border-gaming-border bg-gaming-card text-gray-400 hover:text-white'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span className="text-[9px] font-black uppercase tracking-wider">UPI / GPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'border-gaming-cyan bg-gaming-cyan/5 text-gaming-cyan'
                      : 'border-gaming-border bg-gaming-card text-gray-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="text-[9px] font-black uppercase tracking-wider">Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'netbanking'
                      ? 'border-gaming-cyan bg-gaming-cyan/5 text-gaming-cyan'
                      : 'border-gaming-border bg-gaming-card text-gray-400 hover:text-white'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-[9px] font-black uppercase tracking-wider">NetBanking</span>
                </button>
              </div>

              {/* UPI fields */}
              {paymentMethod === 'upi' && (
                <div className="space-y-2 animate-fadeIn bg-gaming-dark p-3.5 rounded-xl border border-gaming-border">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block">UPI Address / Phone</span>
                  <input 
                    type="text" 
                    placeholder="e.g. mobile@ybl or upi-id" 
                    className="w-full text-xs bg-gaming-card border border-gaming-border px-3 py-2 rounded-lg focus:outline-none focus:border-gaming-cyan text-white"
                  />
                  <div className="text-[9px] text-gray-500 font-medium">Accept payment notification request on GPay/PhonePe application.</div>
                </div>
              )}

              {/* Card fields */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 animate-fadeIn bg-gaming-dark p-3.5 rounded-xl border border-gaming-border">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-gray-500 uppercase block">Card Number</span>
                    <input 
                      type="text" 
                      placeholder="XXXX XXXX XXXX XXXX" 
                      className="w-full text-xs bg-gaming-card border border-gaming-border px-3 py-2 rounded-lg focus:outline-none focus:border-gaming-cyan text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-gray-500 uppercase block">Expiry Date</span>
                      <input type="text" placeholder="MM/YY" className="w-full text-xs bg-gaming-card border border-gaming-border px-3 py-2 rounded-lg focus:outline-none focus:border-gaming-cyan text-white" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-gray-500 uppercase block">CVV</span>
                      <input type="password" placeholder="***" className="w-full text-xs bg-gaming-card border border-gaming-border px-3 py-2 rounded-lg focus:outline-none focus:border-gaming-cyan text-white" />
                    </div>
                  </div>
                </div>
              )}

              {/* NetBanking fields */}
              {paymentMethod === 'netbanking' && (
                <div className="animate-fadeIn bg-gaming-dark p-3.5 rounded-xl border border-gaming-border">
                  <select className="w-full text-xs bg-gaming-card border border-gaming-border px-3 py-2.5 rounded-lg focus:outline-none focus:border-gaming-cyan text-white">
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                  </select>
                </div>
              )}

            </div>

            {/* Order Summary & Pay Button */}
            <div className="glass-panel p-5 rounded-2xl border border-gaming-border space-y-4">
              <h3 className="font-display text-xs font-black uppercase tracking-wider text-white border-b border-gaming-border pb-3">
                Order Billing Summary
              </h3>

              <div className="space-y-2 text-xs font-bold text-gray-400">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="text-white">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Escrow Safe Fee</span>
                  <span className="text-[#25D366]">FREE</span>
                </div>
                <div className="flex justify-between border-t border-gaming-border pt-2 text-sm">
                  <span className="text-white uppercase tracking-wider">Total Payable</span>
                  <span className="text-gaming-cyan font-black text-base">₹{cartTotal}</span>
                </div>
              </div>

              {/* Terms checkbox */}
              <label className="flex items-start gap-2.5 bg-gaming-dark/50 p-3.5 border border-gaming-border rounded-xl cursor-pointer select-none">
                <input 
                  type="checkbox"
                  required
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="accent-gaming-cyan mt-1 w-4 h-4 rounded shrink-0"
                />
                <span className="text-[10px] text-gray-400 leading-relaxed font-semibold">
                  I accept the AXR Escrow Policy. I understand that payment will be locked safely and only released when I approve the account transfer.
                </span>
              </label>

              {/* Pay Now Button */}
              <button
                onClick={handleCheckoutSubmit}
                disabled={!termsAccepted || !buyerAccount || !phone}
                className={`w-full py-4 rounded-xl font-display font-black text-xs uppercase tracking-widest transition-all ${
                  termsAccepted && buyerAccount && phone
                    ? 'bg-gradient-to-r from-gaming-red to-gaming-orange text-white hover:brightness-110 neon-glow-red active:scale-[0.98]'
                    : 'bg-gaming-border text-gray-600 cursor-not-allowed border border-white/5'
                }`}
              >
                Pay & Secure Account
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[9px] text-gray-500 font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 text-gray-500" /> 256-bit Bank Grade SSL Encryption
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
