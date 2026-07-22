import React, { useState } from 'react';
import { MessageSquare, ShieldCheck, Mail, Globe, HelpCircle, ChevronDown, CheckCircle } from 'lucide-react';

export default function StaticPages() {
  const [activeTab, setActiveTab] = useState('faq'); // faq, refund, contact, about
  const [openFaq, setOpenFaq] = useState(null);

  // FAQ mock data
  const faqs = [
    {
      q: "How does the secure escrow protection work?",
      a: "When you buy an ID, your money is securely locked in our bank vault. We notify the seller to submit credentials. You receive the credentials, check the account items (skins, rank, level) in game, change password and link details. Once you confirm that everything is correct and press 'Release Funds', we pay the seller. This ensures you never get scammed."
    },
    {
      q: "How long does account delivery take?",
      a: "Our average transfer completion time is 15 to 30 minutes. Once payment goes through, the credentials are automatically released to your dashboard. If any security binding check is required, our admin team acts as an intermediary via WhatsApp to coordinate safe bind changes."
    },
    {
      q: "Can the seller reclaim/recover the account later?",
      a: "All sellers are required to link accounts to verified emails, and we register their national ID documents. We provide a 7-day reclaim refund guarantee. If an account is reclaimed due to seller recover protocols, we issue a full refund to the buyer and ban the seller permanently."
    },
    {
      q: "What payment methods are supported?",
      a: "We support all major payment networks in India: UPI (Google Pay, PhonePe, Paytm), NetBanking (SBI, HDFC, ICICI, etc.), and Credit/Debit Cards. Transactions are powered by secure payment gateways."
    },
    {
      q: "How can I list my account for sale?",
      a: "Go to the 'Sell Your ID' tab in the navbar, enter stats (level, rank, weapons maxed), expected price, bind type, and submit. An admin moderator will verify details in 1-2 hours and list it live in the shop catalog."
    }
  ];

  // Contact Form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', msg: '' });
  const [formSent, setFormSent] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setContactForm({ name: '', email: '', msg: '' });
    }, 2500);
  };

  return (
    <div className="min-h-screen px-4 md:px-8 py-8 max-w-5xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-black uppercase tracking-wider text-white">
          🛡️ Support Hub & Information
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Read FAQs, submit general inquiries, review refund eligibility, and learn about AXR safety protocols.
        </p>
      </div>

      {/* Tabs Menu */}
      <div className="flex flex-wrap gap-2.5 pb-2 border-b border-gaming-border">
        {['faq', 'refund', 'contact', 'about'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl font-display text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === tab 
                ? 'bg-gaming-red text-white neon-glow-red' 
                : 'bg-gaming-card border border-gaming-border text-gray-400 hover:text-white'
            }`}
          >
            {tab === 'faq' && 'FAQs'}
            {tab === 'refund' && 'Refund Policy'}
            {tab === 'contact' && 'Contact Us'}
            {tab === 'about' && 'About Us'}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="pt-4">
        
        {/* PANEL: FAQ Accordions */}
        {activeTab === 'faq' && (
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-2">
              Frequently Asked Questions (FAQ)
            </h3>
            
            <div className="space-y-3.5">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div 
                    key={index} 
                    className="glass-panel rounded-2xl border border-gaming-border overflow-hidden transition-all duration-200"
                  >
                    <div
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="p-5 flex justify-between items-center cursor-pointer hover:bg-gaming-border/15 select-none"
                    >
                      <h4 className="text-xs font-bold text-white uppercase tracking-wide">{faq.q}</h4>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-gaming-red' : ''}`} />
                    </div>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-gray-400 leading-relaxed border-t border-gaming-border/30 bg-gaming-dark/20 animate-fadeIn">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PANEL: REFUND POLICY */}
        {activeTab === 'refund' && (
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-gaming-border space-y-6 animate-fadeIn">
            <h3 className="font-display text-base font-bold text-white uppercase tracking-wider border-b border-gaming-border pb-3">
              Refund & Dispute Resolution Policy
            </h3>
            
            <div className="space-y-4 text-xs text-gray-400 leading-relaxed">
              
              <div className="space-y-2">
                <span className="font-black text-white uppercase tracking-wide block">1. Escrow Cancellation</span>
                <p>
                  Before you click "Release Funds" on your dashboard, you can request a cancellation if the account stats, weapon skins level, or login bind does not match the catalog description. Upon admin review, the order will be cancelled, and a full refund will be processed to your source payment account in 1-2 business days.
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-black text-white uppercase tracking-wide block">2. Reclaim Protection (7 Days)</span>
                <p>
                  If the seller reclaims the account (initiates Google/Facebook password recovery) within 7 days of purchase, please immediately open a dispute ticket under the Dashboard Support section. Submit recovery emails and lobby profile screenshots as evidence. Our moderators will verify the logs, recover the funds from the seller's escrow payout balance, and refund your money.
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-black text-white uppercase tracking-wide block">3. Non-Eligible Scenarios</span>
                <p>
                  Refunds are NOT issued if:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mt-1.5">
                  <li>You shared credentials with external friends or 3rd party tournament coordinators.</li>
                  <li>The account got banned due to the use of cheat engines, headshot hacks, or config files after purchase.</li>
                  <li>You changed your mind or no longer want the account (escrow is not a rental service).</li>
                </ul>
              </div>

            </div>
          </div>
        )}

        {/* PANEL: CONTACT US */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-fadeIn">
            
            {/* Form: 7 Cols */}
            <form 
              onSubmit={handleContactSubmit}
              className="md:col-span-7 glass-panel p-6 rounded-3xl border border-gaming-border space-y-4.5"
            >
              <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-gaming-border">
                Send Support Query
              </h3>

              {formSent ? (
                <div className="py-8 text-center space-y-3.5">
                  <CheckCircle className="w-12 h-12 text-[#25D366] mx-auto animate-pulse" />
                  <h4 className="text-sm font-bold text-white uppercase">Message Dispatched!</h4>
                  <p className="text-[10px] text-gray-400">Our customer team will write back on your email shortly.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase text-gray-400">Name</label>
                    <input 
                      type="text" 
                      required 
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl text-white focus:outline-none focus:border-gaming-red"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase text-gray-400">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl text-white focus:outline-none focus:border-gaming-red"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase text-gray-400">Message Description</label>
                    <textarea 
                      rows="3" 
                      required 
                      value={contactForm.msg}
                      onChange={(e) => setContactForm({ ...contactForm, msg: e.target.value })}
                      placeholder="Ask about partnership, bulk buying or listing problems..."
                      className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl text-white focus:outline-none focus:border-gaming-red resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-3 bg-gradient-to-r from-gaming-red to-gaming-orange text-white font-display font-black text-xs uppercase tracking-widest rounded-xl hover:brightness-110 transition-all"
                  >
                    Submit Query
                  </button>
                </>
              )}

            </form>

            {/* Support info: 5 Cols */}
            <div className="md:col-span-5 space-y-6">
              
              <div className="glass-panel p-5 rounded-3xl border border-gaming-border space-y-4 text-left">
                <h4 className="font-display text-xs font-black uppercase tracking-wider text-white">Direct Handles</h4>
                
                <div className="space-y-3.5 text-xs text-gray-400">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-gaming-cyan" />
                    <div>
                      <span className="font-black text-white block uppercase text-[10px]">WhatsApp Support</span>
                      <a href="https://wa.me/916387486383" target="_blank" rel="noreferrer" className="hover:text-gaming-cyan text-[11px]">+91 63874 86383</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gaming-orange" />
                    <div>
                      <span className="font-black text-white block uppercase text-[10px]">Telegram Channel</span>
                      <a href="https://t.me/axr_ff_store" target="_blank" rel="noreferrer" className="hover:text-gaming-orange text-[11px]">@axr_ff_store</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gaming-red" />
                    <div>
                      <span className="font-black text-white block uppercase text-[10px]">Official Mail</span>
                      <a href="mailto:axrffstore8178@gmail.com" className="hover:text-gaming-red text-[11px]">axrffstore8178@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* PANEL: ABOUT US */}
        {activeTab === 'about' && (
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-gaming-border space-y-6 animate-fadeIn text-left">
            <h3 className="font-display text-base font-bold text-white uppercase tracking-wider border-b border-gaming-border pb-3">
              About AXR FF STORE
            </h3>

            <div className="space-y-4 text-xs text-gray-400 leading-relaxed">
              <p>
                <b>AXR FF Store</b> was founded in 2026 by gaming veterans who noticed the huge security gaps in high-tier account trading. Peer-to-peer deals on Telegram channels and Discord servers were plagued by fraud.
              </p>
              <p>
                Our mission is to establish a 100% secure, professional marketplace. Using verified moderation processes and secure escrow protection, we act as a trusted intermediary, protecting buyers and sellers alike.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-gaming-dark p-4 rounded-xl border border-gaming-border space-y-1">
                  <span className="text-[10px] text-gaming-cyan font-black uppercase tracking-wider block">Security Pledge</span>
                  <p className="text-[10px] leading-relaxed">We double check every listing details before releasing it live on the catalog, preventing fake stat items.</p>
                </div>
                <div className="bg-gaming-dark p-4 rounded-xl border border-gaming-border space-y-1">
                  <span className="text-[10px] text-gaming-red font-black uppercase tracking-wider block">Our Community</span>
                  <p className="text-[10px] leading-relaxed">Trusted by 10,000+ gamers across India, completing secure transactions worth lakhs monthly.</p>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
