/* eslint-disable react-hooks/set-state-in-effect */


import { useState, useEffect } from 'react';

export default function Header({ title, children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch { console.error('Parse error'); }
    }
  }, []);

  return (
    <header className="h-[72px] border-b border-[#222] flex items-center justify-between px-4 md:px-8 bg-[#0e0e0e] shrink-0">
      
      {/* Title / Children */}
      <div className="flex-1 flex items-center min-w-0 pr-2">
        {title && <h2 className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase mr-2 md:mr-4 truncate">{title}</h2>}
        {children}
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-3 md:gap-5 shrink-0">
        <button className="text-neutral-400 hover:text-white transition-colors relative hidden sm:block">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        </button>
        <button className="text-neutral-400 hover:text-white transition-colors relative">
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-volt-green rounded-full"></span>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <button className="text-neutral-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        
        {/* Dynamic User Profile */}
        <div className="flex items-center gap-2 md:gap-3 ml-1 md:ml-2 border-l border-[#333] pl-3 md:pl-5">
          <div className="flex flex-col items-end justify-center hidden sm:flex">
            <span className="text-white text-[13px] font-bold">{user?.fullName || 'Guest User'}</span>
            <span className="text-volt-green text-[9px] font-bold tracking-widest uppercase">{user?.vehicleModel || 'No Vehicle'}</span>
          </div>
          <div className="w-9 h-9 rounded-full border border-volt-green/30 bg-[#161616] flex items-center justify-center text-volt-green font-bold shadow-[0_0_10px_rgba(204,230,0,0.1)]">
            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'G'}
          </div>
        </div>
      </div>
    </header>
  );
}

