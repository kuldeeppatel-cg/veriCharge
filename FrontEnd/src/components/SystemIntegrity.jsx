import React from 'react';

export default function SystemIntegrity() {
  return (
    <div className="bg-[#161616] border border-[#222] rounded-2xl p-8 flex flex-col items-center text-center h-full relative">
      <h3 className="text-[10px] font-bold tracking-[0.15em] text-neutral-400 uppercase mb-8">SYSTEM INTEGRITY</h3>
      
      {/* Circle Chart */}
      <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#222" strokeWidth="8" />
          <circle 
            cx="50" cy="50" r="40" fill="none" stroke="#cce600" strokeWidth="8" 
            strokeDasharray="251.2" strokeDashoffset="5.024" // 98%
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-bold text-volt-green tracking-tighter">98%</span>
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">RELIABLE</span>
        </div>
      </div>

      <p className="text-xs text-[#888] mb-8 max-w-[200px] leading-relaxed">
        *VeriScore* calculated from 2.4k verified sessions this week.
      </p>

      <button className="w-full mt-auto bg-volt-green text-black font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#b3cc00] transition-colors">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Confirm Status
      </button>
    </div>
  );
}
