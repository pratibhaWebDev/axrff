import React, { useState } from 'react';
import { MessageSquare, Send, X, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';


export default function SupportWidgets() {
  const [isOpen, setIsOpen] = useState(false);
  const [msgInput, setMsgInput] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'bot', text: 'Welcome to AXR Support! 🎮 How can we assist you today?', time: 'Just now' }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!msgInput.trim()) return;

    const userMessage = { sender: 'user', text: msgInput, time: 'Just now' };
    const newLog = [...chatLog, userMessage];
    setChatLog(newLog);
    const tempInput = msgInput.toLowerCase();
    setMsgInput('');

    // Simulated auto bot responses
    setTimeout(() => {
      let botReplyText = "Thanks for messaging! Our team will get back to you in a few minutes. You can also reach us directly via WhatsApp for instant approval/transfer.";
      
      if (tempInput.includes('buy') || tempInput.includes('purchase')) {
        botReplyText = "To buy an ID, simply click 'Buy Now' or add it to your Cart and checkout. Our automated system generates credentials, and our admin handles the secure trade escrow.";
      } else if (tempInput.includes('sell') || tempInput.includes('listing')) {
        botReplyText = "To sell your Free Fire ID, go to the 'Sell Your ID' tab, fill the form, and upload stats screenshots. Admins verify authenticity and list it within 1-2 hours!";
      } else if (tempInput.includes('escrow') || tempInput.includes('safe') || tempInput.includes('trust')) {
        botReplyText = "We use escrow protection! When you buy, your payment stays in our vault. The seller only gets paid after you verify the account's details and bind it to your credentials.";
      } else if (tempInput.includes('pay') || tempInput.includes('payment') || tempInput.includes('razorpay')) {
        botReplyText = "We support UPI, NetBanking, Credit/Debit cards, and wallet transfers. Payments are verified instantly.";
      }

      setChatLog(prev => [...prev, { sender: 'bot', text: botReplyText, time: 'Just now' }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Buttons Group - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        
        {/* Telegram floating link */}
        <a 
          href="https://t.me/axr_ff_store" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0088cc] hover:bg-[#0077b5] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 duration-200 neon-glow-cyan"
          title="Join Telegram Channel"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.6.15-.15 2.72-2.5 2.77-2.7.01-.03.01-.15-.06-.21-.07-.06-.17-.04-.25-.02-.11.02-1.87 1.18-5.28 3.48-.5.35-.95.52-1.35.5-.44-.01-1.29-.25-1.92-.45-.77-.25-1.39-.39-1.34-.83.03-.23.35-.46.96-.69 3.76-1.64 6.27-2.72 7.54-3.25 3.58-1.5 4.32-1.76 4.81-1.77.11 0 .35.03.5.15.13.1.17.24.18.35-.01.07-.01.14-.02.21z"/>
          </svg>
        </a>

        {/* WhatsApp floating link */}
        <a 
          href="https://wa.me/916387486383" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba56] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 duration-200 neon-glow-orange"
          title="Chat on WhatsApp"
        >
          <Phone className="w-5 h-5 fill-current" />
        </a>

        {/* Live Chat Widget Trigger */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gaming-red hover:bg-gaming-red/90 text-white shadow-lg transition-transform hover:scale-110 active:scale-95 duration-200 neon-glow-red"
          aria-label="Toggle Live Chat"
        >
          {isOpen ? <X className="w-5.5 h-5.5" /> : <MessageCircle className="w-5.5 h-5.5" />}
        </button>
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-22 right-6 w-[340px] md:w-[360px] h-[480px] rounded-2xl glass-panel border border-gaming-border z-50 flex flex-col overflow-hidden shadow-2xl animate-slideUp">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-gaming-red to-gaming-orange p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-black/40 flex items-center justify-center border border-white/20">
                <img 
                  src="/logo.JPG" 
                  alt="AXR" 
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span className="font-display font-black text-xs text-gaming-cyan">AXR</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">Live Support Agent</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block animate-pulse"></span>
                  <span className="text-[10px] text-white/80 uppercase font-black tracking-wider">Online & Safe</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
            {chatLog.map((chat, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${chat.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                    chat.sender === 'user' 
                      ? 'bg-gaming-red text-white rounded-tr-none' 
                      : 'bg-gaming-border border border-white/5 text-gray-200 rounded-tl-none'
                  }`}
                >
                  {chat.text}
                </div>
                <span className="text-[9px] text-gray-500 font-bold uppercase mt-1 px-1">{chat.time}</span>
              </div>
            ))}
          </div>

          {/* Send Input */}
          <form 
            onSubmit={handleSendMessage}
            className="p-3 border-t border-gaming-border bg-gaming-dark/65 flex gap-2"
          >
            <input 
              type="text" 
              placeholder="Ask about buying, selling, or escrow..." 
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
              className="flex-1 bg-gaming-card border border-gaming-border text-xs rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-gaming-cyan transition-colors"
            />
            <button 
              type="submit" 
              className="bg-gaming-cyan hover:bg-gaming-cyan/90 text-gaming-dark p-2 rounded-xl transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
