import React from 'react';

export default function StationOverview() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-volt-green text-black px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase">SUPERCHARGER</span>
          <span className="text-[#888] text-[11px] font-medium flex items-center gap-1">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Palo Alto Innovation Center
          </span>
        </div>
        <h1 className="text-3xl lg:text-[2.5rem] font-bold text-white mb-2 tracking-tight">Silicon Valley Hub - V3</h1>
        <p className="text-[#999] text-[15px] max-w-[600px] leading-relaxed">
          Advanced 250kW charging node with integrated lounge and renewable backup systems.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="bg-white text-black font-bold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Route Now
        </button>
        <button className="w-12 h-12 flex items-center justify-center bg-[#1c1c1c] border border-[#333] rounded-lg text-neutral-400 hover:text-white hover:border-[#555] transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
