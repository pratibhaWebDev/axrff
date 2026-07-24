import { Vault } from 'lucide-react';
import React, { createContext, useState, useEffect, useContext } from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};


// Mock Initial Free Fire Listings
const INITIAL_LISTINGS = [
  {
    id: "ff-premium-74",
    title: "Premium LVL 74 Account - Phantom & Green Criminal",
    price: 10000,
    level: 74,
    rank: "Heroic",
    vault: 400,
    gunSkin: 420,
    evoGunsCount: 7,
    diamonds: 31,
    loginMethod: "Google",
    verified: true,
    status: "approved",
    sellerName: "Verified Owner",
    badgesCount: 20524,
    emotesCount: 82,
    accountUid: "1764914117",
    description: "Insane Level 74 Free Fire account with 20K+ likes. Features the extremely rare Phantom Bundle, Red Scarf, Green Criminal, top jerseys, Prime 7, Rose & Heart emotes, very old collection emotes, and 3 MAXED EVOLUTION weapons!",
    rareItems: ["Phantom Bundle", "Red Scarf", "Green Criminal", "Best Jerseys", "Prime 7", "Rose Emote", "Heart Emote", "3 Max Evos"],
    screenshots: [
      "/image/id1/idmain1.jpeg",
      "/image/id1/10kid.jpeg",
      "/image/id1/image.png",
      "/image/id1/image copy.png",
      "/image/id1/image copy 2.png",
      "/image/id1/image copy 3.png",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.36 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 10.58.07 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 10.58.08 PM (1).jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 10.58.07 PM (1).jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 10.58.08 PM (2).jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 10.58.08 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 10.58.09 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.08 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.09 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.10 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.11 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.12 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.13 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.14 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.15 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.16 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.17 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.18 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.19 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.20 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.21 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.22 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.23 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.24 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.27 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.28 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.29 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.30 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.31 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.32 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.33 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.34 PM.jpeg",
      "/image/id1/WhatsApp Image 2026-07-22 at 9.40.35 PM.jpeg",
      
    ],
    featured: true
  },
  // {
  //   id: "ff-premium-71",
  //   title: "Premium LVL 71 Account - Red & Purple Criminal, Samurai Bundle",
  //   price: 16000,
  //   level: 71,
  //   rank: "Heroic",
  //   vault: 380,
  //   skins: 490,
  //   evoGunsCount: 12,
  //   diamonds: 0,
  //   loginMethod: "Google",
  //   verified: true,
  //   status: "approved",
  //   sellerName: "Verified Owner",
  //   badgesCount: 15400,
  //   emotesCount: 100,
  //   accountUid: "1909016280",
  //   description: "Insane Level 71 Free Fire account. Features Red Criminal, Samurai Bundle, Purple Criminal, Bunny Bundle, Red Angelic, Doctor Bundle, 100+ old emotes, 12+ animation items, 1 look changer, and Prime 8. Includes 3 MAXED EVOS and 1 semi-maxed evo weapon!",
  //   rareItems: ["Red Criminal", "Samurai Bundle", "Purple Criminal", "Bunny Bundle", "Red Angelic", "Doctor Bundle", "100+ Old Emotes", "3 Max Evos"],
  //   screenshots: [
  //     "/image/id2/mainid2.jpeg",
  //     "/image/id2/image.png",
  //     "/image/id2/image copy.png",
  //     "/image/id2/image copy 2.png",
  //     "/image/id2/image copy 3.png",
  //     "/image/id2/image copy 4.png",
  //     "/image/id2/image copy 5.png",
  //     "/image/id2/image copy 6.png",
  //     "/image/id2/image copy 7.png",
  //     "/image/id2/image copy 8.png",
  //     "/image/id2/image copy 9.png",
  //     "/image/id2/image copy 10.png",
  //     "/image/id2/image copy 11.png",
  //     "/image/id2/image copy 12.png",
  //     "/image/id2/image copy 13.png",
  //     "/image/id2/image copy 14.png",
  //     "/image/id2/image copy 15.png",
  //     "/image/id2/image copy 16.png",
  //     "/image/id2/image copy 17.png",
  //     "/image/id2/image copy 18.png",
  //     "/image/id2/image copy 19.png",
  //     "/image/id2/WhatsApp Image 2026-07-22 at 9.40.57 PM.jpeg",
  //     "/image/id2/WhatsApp Image 2026-07-22 at 9.40.57 PM (2).jpeg",
  //     "/image/id2/WhatsApp Image 2026-07-22 at 9.40.58 PM.jpeg",
  //     "/image/id2/WhatsApp Image 2026-07-22 at 9.40.58 PM (1).jpeg",
  //     "/image/id2/WhatsApp Image 2026-07-22 at 9.40.58 PM (2).jpeg",
  //     "/image/id2/WhatsApp Image 2026-07-22 at 9.40.59 PM.jpeg"
  //   ],
  //   featured: true
  // }
];

export const StoreProvider = ({ children }) => {
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [listingsLoading, setListingsLoading] = useState(false);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('axr_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('axr_user');
    return saved ? JSON.parse(saved) : {
      username: "ProGamer99",
      email: "progamer@axrstore.com",
      role: "user", // "user" or "admin"
      balance: 15000,
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=150&auto=format&fit=crop"
    };
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('axr_orders');
    return saved ? JSON.parse(saved) : [
      {
        orderId: "ORD-92837",
        date: "2026-07-15",
        itemsCount: 1,
        total: 2499,
        status: "Completed",
        loginDetails: { method: "Google", account: "alphakiler@gmail.com", pass: "********" },
        accountDetails: "Rare Criminal & Evo Cobra MP40 Account",
        deliveryStatus: "delivered"
      }
    ];
  });

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('axr_tickets');
    return saved ? JSON.parse(saved) : [
      {
        id: "TCK-872",
        subject: "How does the escrow work?",
        status: "Resolved",
        date: "2026-07-16",
        messages: [
          { sender: "user", text: "Hi, I want to purchase but want to confirm how escrow holds the money?", time: "10:30 AM" },
          { sender: "support", text: "Hello! When you pay, the money is held in our secure escrow. It is only released to the seller after you verify the gaming credentials and change the login details. This guarantees 100% safety.", time: "10:45 AM" }
        ]
      }
    ];
  });

  // Sync to LocalStorage
  useEffect(() => {
    if (listings && listings.length > 0) {
      localStorage.setItem('axr_listings', JSON.stringify(listings));
    }
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('axr_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('axr_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('axr_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('axr_tickets', JSON.stringify(tickets));
  }, [tickets]);

  // Cart operations
  const addToCart = (item) => {
    if (cart.find(c => c.id === item.id || c._id === item._id)) return;
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId && item._id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Submit Listing (Seller form)
  const submitListing = async (formData) => {
    const newListing = {
      ...formData,
      id: `ff-user-${Date.now()}`,
      verified: false,
      status: "pending",
      sellerName: currentUser.username,
      featured: false,
      screenshots: formData.screenshots && formData.screenshots.length > 0
        ? formData.screenshots
        : ["https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop"]
    };
    setListings(prev => [newListing, ...prev]);
  };

  // Direct Admin Listing Upload (Mocked with Base64 / Local URLs)
  const addAdminListing = async (formData, imageFiles = [], onProgress) => {
    const urls = [];
    const total = imageFiles.length;
    let completed = 0;

    for (const file of imageFiles) {
      await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          urls.push(reader.result);
          completed++;
          if (onProgress) onProgress(Math.round((completed / total) * 100));
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }

    const localListing = {
      ...formData,
      id: `ff-admin-${Date.now()}`,
      status: 'approved',
      sellerName: 'Admin',
      featured: true,
      screenshots: urls.length > 0 ? urls : ["https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop"]
    };
    setListings(prev => [localListing, ...prev]);
    return localListing;
  };

  // Admin approval flows
  const approveListing = (id) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, status: "approved" } : l));
  };

  const rejectListing = (id) => {
    setListings(prev => prev.filter(l => l.id !== id));
  };

  // Switch role between User & Admin
  // Admin login / logout
  const loginAsAdmin = () => {
    setCurrentUser(prev => ({ ...prev, role: 'admin' }));
  };

  const logoutAdmin = () => {
    setCurrentUser(prev => ({ ...prev, role: 'user' }));
  };

  // Keep for internal use (testing)
  const toggleUserRole = () => {
    setCurrentUser(prev => ({
      ...prev,
      role: prev.role === 'admin' ? 'user' : 'admin'
    }));
  };

  // Place Order / Buy Now
  const checkoutCart = (paymentDetails) => {
    const newOrders = cart.map(item => ({
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      itemsCount: 1,
      total: item.price,
      status: "Processing",
      loginDetails: { method: item.loginMethod, account: paymentDetails.accountName || "buyer_account@gmail.com", pass: "********" },
      accountDetails: item.title,
      deliveryStatus: "checking_credentials" // phases: checking_credentials -> transferring -> delivered
    }));

    setOrders([...newOrders, ...orders]);
    
    // Remove purchased accounts from main listings
    const purchasedIds = cart.map(c => c.id);
    setListings(listings.filter(l => !purchasedIds.includes(l.id)));
    clearCart();
  };

  // Create ticket
  const createSupportTicket = (subject, firstMsg) => {
    const newTicket = {
      id: `TCK-${Math.floor(100 + Math.random() * 900)}`,
      subject: subject,
      status: "Open",
      date: new Date().toISOString().split('T')[0],
      messages: [
        { sender: "user", text: firstMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]
    };
    setTickets([newTicket, ...tickets]);
  };

  // Reply to ticket
  const replyToTicket = (ticketId, text, sender = "user") => {
    setTickets(tickets.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: sender === "support" ? "Resolved" : "Open",
          messages: [
            ...t.messages,
            {
              sender,
              text,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      }
      return t;
    }));
  };

  return (
    <StoreContext.Provider value={{
      listings,
      listingsLoading,
      cart,
      currentUser,
      orders,
      tickets,
      addToCart,
      removeFromCart,
      clearCart,
      submitListing,
      addAdminListing,
      approveListing,
      rejectListing,
      toggleUserRole,
      loginAsAdmin,
      logoutAdmin,
      checkoutCart,
      createSupportTicket,
      replyToTicket
    }}>
      {children}
    </StoreContext.Provider>
  );
};
