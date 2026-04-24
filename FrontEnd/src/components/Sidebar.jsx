import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ activePage }) {
  return (
    <aside className="w-[260px] h-screen bg-[#0e0e0e] border-r border-[#222] flex flex-col justify-between hidden lg:flex shrink-0">
      <div>
        {/* Logo */}
        <div className="p-8 pb-6">
          <h1 className="text-volt-green text-xl font-bold tracking-tight mb-1 uppercase">VERICHARGE PRO</h1>
          <p className="text-[9px] text-neutral-500 font-bold tracking-[0.2em] uppercase">Network Active</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col mt-4">
          <Link to="/dashboard" className={`flex items-center gap-4 px-8 py-4 border-l-4 transition-colors ${activePage === 'map' ? 'border-volt-green bg-volt-green/5 text-volt-green' : 'border-transparent text-neutral-400 hover:text-white hover:bg-[#161616]'}`}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span className="text-[11px] font-bold tracking-widest uppercase">Live Map</span>
          </Link>
          
          <Link to="/station" className={`flex items-center gap-4 px-8 py-4 border-l-4 transition-colors ${activePage === 'station' ? 'border-volt-green bg-volt-green/5 text-volt-green' : 'border-transparent text-neutral-400 hover:text-white hover:bg-[#161616]'}`}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-[11px] font-bold tracking-widest uppercase">Stations</span>
          </Link>

          <Link to="/reliability" className={`flex items-center gap-4 px-8 py-4 border-l-4 transition-colors ${activePage === 'reliability' ? 'border-volt-green bg-volt-green/5 text-volt-green' : 'border-transparent text-neutral-400 hover:text-white hover:bg-[#161616]'}`}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[11px] font-bold tracking-widest uppercase">Reliability</span>
          </Link>

          <Link to="/history" className={`flex items-center gap-4 px-8 py-4 border-l-4 transition-colors ${activePage === 'history' ? 'border-volt-green bg-volt-green/5 text-volt-green' : 'border-transparent text-neutral-400 hover:text-white hover:bg-[#161616]'}`}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[11px] font-bold tracking-widest uppercase">History</span>
          </Link>

          <Link to="#" className="flex items-center gap-4 px-8 py-4 border-l-4 border-transparent text-neutral-400 hover:text-white hover:bg-[#161616] transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[11px] font-bold tracking-widest uppercase">Support</span>
          </Link>
        </nav>
      </div>

      {/* Upgrade / Start Charge Button */}
      <div className="p-8 pb-10">
        <button className="w-full bg-volt-green hover:bg-[#cce600] text-black rounded-lg py-3.5 text-[12px] font-bold tracking-wide transition-colors flex items-center justify-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          Start Charge
        </button>
      </div>
    </aside>
  );
}
