import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, MessageSquare, User, Key, Lock, ChevronDown, CheckCircle, Ticket, PlusCircle, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { orders, tickets, currentUser, createSupportTicket, replyToTicket } = useStore();

  
  const [activeTab, setActiveTab] = useState('orders'); // orders, tickets
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [expandedTicket, setExpandedTicket] = useState(null);

  // New ticket state
  const [newSubject, setNewSubject] = useState('');
  const [newMsg, setNewMsg] = useState('');
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);

  // Ticket reply message state
  const [replyText, setReplyText] = useState('');

  const handleCreateTicketSubmit = (e) => {
    e.preventDefault();
    if (!newSubject.trim() || !newMsg.trim()) return;

    createSupportTicket(newSubject, newMsg);
    setNewSubject('');
    setNewMsg('');
    setShowNewTicketForm(false);
    setActiveTab('tickets');
  };

  const handleTicketReplySubmit = (e, ticketId) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    replyToTicket(ticketId, replyText, "user");
    setReplyText('');

    // Simulate auto bot support reply inside ticket after 1.5 seconds
    setTimeout(() => {
      replyToTicket(ticketId, "Thanks for updating. Our senior moderator has been assigned to look into your ticket and will verify details shortly.", "support");
    }, 1500);
  };

  // Mock Escrow release action
  const [releasedOrders, setReleasedOrders] = useState([]);
  const handleReleaseEscrow = (orderId) => {
    setReleasedOrders([...releasedOrders, orderId]);
  };

  return (
    <div className="min-h-screen px-4 md:px-8 py-8 max-w-6xl mx-auto space-y-8">
      
      {/* USER HEADER DETAILS PANEL */}
      <div className="glass-panel p-6 rounded-3xl border border-gaming-border flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-4 text-left">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.username} 
            className="w-16 h-16 rounded-2xl object-cover border-2 border-gaming-cyan neon-glow-cyan"
          />
          <div>
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">{currentUser.username}</h2>
            <p className="text-xs text-gray-400">{currentUser.email}</p>
            <div className="inline-flex items-center gap-1 bg-gaming-border px-2 py-0.5 rounded text-[9px] font-black uppercase text-gray-300 mt-2">
              Role: <span className="text-gaming-cyan">{currentUser.role}</span>
            </div>
          </div>
        </div>

        {/* Stats card */}
        <div className="grid grid-cols-3 gap-6 text-center w-full md:w-auto">
          <div className="bg-gaming-dark/60 p-4 rounded-2xl border border-gaming-border min-w-28">
            <span className="text-[10px] text-gray-500 font-bold uppercase block">Balance</span>
            <span className="text-sm font-black text-gaming-cyan">₹{currentUser.balance}</span>
          </div>

          <div className="bg-gaming-dark/60 p-4 rounded-2xl border border-gaming-border min-w-28">
            <span className="text-[10px] text-gray-500 font-bold uppercase block">Purchased</span>
            <span className="text-sm font-black text-white">{orders.length} Accounts</span>
          </div>

          <div className="bg-gaming-dark/60 p-4 rounded-2xl border border-gaming-border min-w-28">
            <span className="text-[10px] text-gray-500 font-bold uppercase block">Tickets</span>
            <span className="text-sm font-black text-gaming-red">{tickets.length} Active</span>
          </div>
        </div>

      </div>

      {/* DASHBOARD ROUTING TABS */}
      <div className="flex gap-4 border-b border-gaming-border pb-1">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 font-display text-xs font-black uppercase tracking-widest transition-colors ${
            activeTab === 'orders' ? 'text-gaming-cyan border-b-2 border-gaming-cyan' : 'text-gray-400 hover:text-white'
          }`}
        >
          My Purchased IDs
        </button>
        <button
          onClick={() => setActiveTab('tickets')}
          className={`pb-3 font-display text-xs font-black uppercase tracking-widest transition-colors ${
            activeTab === 'tickets' ? 'text-gaming-red border-b-2 border-gaming-red' : 'text-gray-400 hover:text-white'
          }`}
        >
          Support Tickets
        </button>
      </div>

      {/* ACTIVE TAB VIEWS */}
      <div>
        
        {/* TAB 1: PURCHASED ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="glass-panel p-10 rounded-2xl border border-gaming-border text-center text-xs text-gray-400">
                You haven't bought any accounts yet.
              </div>
            ) : (
              orders.map((order) => {
                const isExpanded = expandedOrder === order.orderId;
                const isReleased = releasedOrders.includes(order.orderId) || order.status === 'Completed';

                return (
                  <div 
                    key={order.orderId}
                    className="glass-panel rounded-2xl border border-gaming-border overflow-hidden transition-all duration-300"
                  >
                    
                    {/* Header bar summary */}
                    <div 
                      onClick={() => setExpandedOrder(isExpanded ? null : order.orderId)}
                      className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-gaming-border/20 transition-all select-none"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{order.orderId}</span>
                          <span className="text-[10px] text-gray-500 font-bold">•</span>
                          <span className="text-[10px] text-gray-500 font-bold uppercase">{order.date}</span>
                        </div>
                        <h4 className="text-xs font-black text-white mt-1 uppercase tracking-wide">{order.accountDetails}</h4>
                      </div>

                      <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between">
                        <div className="text-right">
                          <span className="text-[10px] text-gray-500 font-bold block">Amount Paid</span>
                          <span className="text-xs font-black text-gaming-cyan">₹{order.total}</span>
                        </div>
                        
                        <div className={`text-[10px] font-black uppercase px-3 py-1 rounded-md border ${
                          isReleased
                            ? 'bg-[#25D366]/10 border-[#25D366] text-[#25D366]' 
                            : 'bg-gaming-orange/10 border-gaming-orange text-gaming-orange animate-pulse'
                        }`}>
                          {isReleased ? 'Completed' : 'Transferring'}
                        </div>

                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {/* Expandable Order Details Panel */}
                    {isExpanded && (
                      <div className="p-5 border-t border-gaming-border bg-gaming-dark/40 space-y-6 animate-fadeIn">
                        
                        {/* 4-Phase Delivery tracker UI */}
                        <div className="space-y-4">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Credentials Delivery Phase</span>
                          
                          <div className="grid grid-cols-4 gap-2 relative">
                            {/* Line backgrounds */}
                            <div className="absolute top-2.5 left-0 right-0 h-1 bg-gaming-border -z-10 rounded"></div>
                            <div className={`absolute top-2.5 left-0 h-1 bg-gaming-cyan -z-10 rounded transition-all`} style={{
                              width: isReleased ? '100%' : '66%'
                            }}></div>

                            <div className="text-center">
                              <div className="w-6 h-6 rounded-full bg-gaming-cyan flex items-center justify-center text-[10px] font-black text-gaming-dark mx-auto">1</div>
                              <span className="text-[8px] md:text-[9px] font-bold text-gaming-cyan uppercase tracking-wider block mt-1.5">Payment Secure</span>
                            </div>

                            <div className="text-center">
                              <div className="w-6 h-6 rounded-full bg-gaming-cyan flex items-center justify-center text-[10px] font-black text-gaming-dark mx-auto">2</div>
                              <span className="text-[8px] md:text-[9px] font-bold text-gaming-cyan uppercase tracking-wider block mt-1.5">Admin Verified</span>
                            </div>

                            <div className="text-center">
                              <div className="w-6 h-6 rounded-full bg-gaming-cyan flex items-center justify-center text-[10px] font-black text-gaming-dark mx-auto">3</div>
                              <span className="text-[8px] md:text-[9px] font-bold text-gaming-cyan uppercase tracking-wider block mt-1.5">Details Released</span>
                            </div>

                            <div className="text-center">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black mx-auto ${
                                isReleased ? 'bg-gaming-cyan text-gaming-dark' : 'bg-gaming-border text-gray-500'
                              }`}>4</div>
                              <span className={`text-[8px] md:text-[9px] font-bold uppercase tracking-wider block mt-1.5 ${
                                isReleased ? 'text-gaming-cyan' : 'text-gray-500'
                              }`}>Trade Finished</span>
                            </div>
                          </div>
                        </div>

                        {/* Credentials Reveal box */}
                        <div className="bg-gaming-card p-4 border border-gaming-border rounded-xl space-y-3.5">
                          <div className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-wider">
                            <Key className="w-4 h-4 text-gaming-red" />
                            Game Login Credentials
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-gray-400">
                            <div>
                              <span>Login Type:</span>
                              <span className="text-white block mt-0.5">{order.loginDetails.method} Link</span>
                            </div>
                            <div>
                              <span>Username / Email:</span>
                              <span className="text-white block mt-0.5">{order.loginDetails.account}</span>
                            </div>
                            <div>
                              <span>Account Password:</span>
                              <span className="text-[#25D366] block mt-0.5 font-mono select-all">axrPass7781!!</span>
                            </div>
                          </div>

                          <div className="bg-gaming-red/5 p-3 rounded-lg border border-gaming-red/10 text-[10px] text-gray-400 leading-relaxed">
                            ⚠️ IMPORTANT: Please log in immediately, check if skins and level match descriptions, then change credentials email bind, and password to prevent seller claims.
                          </div>
                        </div>

                        {/* Escrow Release Button */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gaming-card p-4 border border-gaming-border rounded-xl">
                          <div className="flex gap-3 items-start text-left">
                            <Lock className="w-5.5 h-5.5 text-gaming-cyan mt-0.5 shrink-0" />
                            <div>
                              <h5 className="text-xs font-black text-white uppercase tracking-wider">AXR Escrow Holding Security</h5>
                              <p className="text-[10px] text-gray-400 max-w-md">
                                Funds are currently locked. If details match descriptions, please release funds so the seller receives payouts.
                              </p>
                            </div>
                          </div>

                          <button 
                            disabled={isReleased}
                            onClick={() => handleReleaseEscrow(order.orderId)}
                            className={`w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                              isReleased 
                                ? 'bg-gaming-border text-gray-500 border border-white/5 cursor-not-allowed' 
                                : 'bg-gaming-cyan text-gaming-dark hover:scale-105 hover:brightness-110'
                            }`}
                          >
                            {isReleased ? 'Funds Released' : 'Release Funds to Seller'}
                          </button>
                        </div>

                      </div>
                    )}

                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 2: SUPPORT TICKETS LIST */}
        {activeTab === 'tickets' && (
          <div className="space-y-6">
            
            {/* Create new ticket toggle */}
            <div className="flex justify-between items-center bg-gaming-card border border-gaming-border p-4 rounded-xl">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Trouble with account transfer?</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">Open a secure dispute ticket with moderator.</p>
              </div>
              <button 
                onClick={() => setShowNewTicketForm(!showNewTicketForm)}
                className="flex items-center gap-1.5 bg-gaming-red text-white text-xs font-black uppercase px-4 py-2.5 rounded-xl border border-transparent hover:brightness-110 transition-all shrink-0"
              >
                <PlusCircle className="w-4.5 h-4.5" />
                {showNewTicketForm ? 'Cancel' : 'New Ticket'}
              </button>
            </div>

            {/* Create Ticket Form */}
            {showNewTicketForm && (
              <form 
                onSubmit={handleCreateTicketSubmit}
                className="glass-panel border border-gaming-red/30 p-5 rounded-2xl space-y-4 animate-fadeIn"
              >
                <h4 className="font-display text-xs font-black text-white uppercase tracking-wider">Create Dispute Support Ticket</h4>
                
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase text-gray-400">Issue Subject</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Account credentials password not working"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl text-white focus:outline-none focus:border-gaming-red"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase text-gray-400">Explain Problem Details</label>
                  <textarea 
                    rows="3" 
                    required
                    placeholder="Provide screenshot links or error message details..."
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    className="w-full text-xs bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl text-white focus:outline-none focus:border-gaming-red resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="bg-gaming-red text-white text-xs font-black uppercase px-6 py-2.5 rounded-xl"
                >
                  Create Ticket
                </button>
              </form>
            )}

            {/* Tickets lists */}
            <div className="space-y-4">
              {tickets.length === 0 ? (
                <div className="glass-panel p-8 rounded-xl text-center text-xs text-gray-400 border border-gaming-border">
                  No support tickets found.
                </div>
              ) : (
                tickets.map((tck) => {
                  const isExpanded = expandedTicket === tck.id;

                  return (
                    <div 
                      key={tck.id}
                      className="glass-panel rounded-2xl border border-gaming-border overflow-hidden transition-all duration-300"
                    >
                      {/* Ticket Summary header */}
                      <div 
                        onClick={() => setExpandedTicket(isExpanded ? null : tck.id)}
                        className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer hover:bg-gaming-border/20 select-none"
                      >
                        <div className="flex gap-3 items-center">
                          <Ticket className="w-5 h-5 text-gaming-red shrink-0" />
                          <div>
                            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">{tck.id} • {tck.date}</span>
                            <h4 className="text-xs font-black text-white uppercase tracking-wider">{tck.subject}</h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between">
                          <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded border ${
                            tck.status === 'Resolved' 
                              ? 'bg-[#25D366]/10 border-[#25D366] text-[#25D366]' 
                              : 'bg-gaming-red/10 border-gaming-red text-gaming-red'
                          }`}>
                            {tck.status}
                          </span>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      </div>

                      {/* Expandable chat log inside ticket */}
                      {isExpanded && (
                        <div className="p-4 border-t border-gaming-border bg-gaming-dark/35 space-y-4 animate-fadeIn">
                          
                          {/* Messages log */}
                          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 no-scrollbar">
                            {tck.messages.map((msg, mIdx) => (
                              <div 
                                key={mIdx}
                                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                              >
                                <div className={`max-w-[80%] rounded-xl p-3 text-xs leading-relaxed ${
                                  msg.sender === 'user'
                                    ? 'bg-gaming-red text-white rounded-tr-none'
                                    : 'bg-gaming-border border border-white/5 text-gray-200 rounded-tl-none'
                                }`}>
                                  {msg.text}
                                </div>
                                <span className="text-[9px] text-gray-500 font-bold uppercase mt-1 px-1">{msg.time}</span>
                              </div>
                            ))}
                          </div>

                          {/* Reply box */}
                          <form 
                            onSubmit={(e) => handleTicketReplySubmit(e, tck.id)}
                            className="flex gap-2 pt-2 border-t border-gaming-border/50"
                          >
                            <input 
                              type="text" 
                              required 
                              placeholder="Write a message to support..." 
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="flex-1 text-xs bg-gaming-dark border border-gaming-border px-3.5 py-2.5 rounded-xl text-white focus:outline-none focus:border-gaming-red"
                            />
                            <button 
                              type="submit" 
                              className="bg-gaming-cyan hover:bg-gaming-cyan/90 text-gaming-dark text-xs font-black uppercase px-4 py-2 rounded-xl transition-all"
                            >
                              Send Message
                            </button>
                          </form>

                        </div>
                      )}

                    </div>
                  );
                })
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
