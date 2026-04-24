import React from 'react';

export default function LiveQueue() {
  return (
    <div className="bg-[#161616] border border-[#222] rounded-2xl p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-bold text-white">Live Queue Timeline</h3>
        <span className="bg-[#1c2c00] text-volt-green px-2 py-0.5 rounded text-[9px] font-bold tracking-widest flex items-center gap-1.5 uppercase border border-[#2c4000]">
          <span className="w-1.5 h-1.5 bg-volt-green rounded-full animate-pulse"></span>
          LIVE DATA
        </span>
      </div>

      <div className="flex flex-col gap-6 mb-8">
        {/* Charger 1 */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#1c2c00] border border-[#2c4000] flex items-center justify-center text-volt-green shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-end mb-2">
              <span className="text-white font-semibold text-sm">Charger 1</span>
              <span className="text-volt-green text-[10px] font-bold tracking-widest uppercase">AVAILABLE</span>
            </div>
            <div className="h-1.5 w-full bg-[#222] rounded-full overflow-hidden">
              <div className="h-full bg-volt-green w-full"></div>
            </div>
          </div>
        </div>

        {/* Charger 2 */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#1c1c1c] border border-[#333] flex items-center justify-center text-white shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-end mb-2">
              <span className="text-white font-semibold text-sm">Charger 2</span>
              <span className="text-white text-[10px] font-bold tracking-widest uppercase">12 MINS LEFT</span>
            </div>
            <div className="h-1.5 w-full bg-[#222] rounded-full overflow-hidden">
              <div className="h-full bg-white w-[70%]"></div>
            </div>
          </div>
        </div>

        {/* Charger 3 */}
        <div className="flex items-center gap-4 opacity-50">
          <div className="w-10 h-10 rounded-lg bg-[#111] border border-[#222] flex items-center justify-center text-[#666] shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-end mb-2">
              <span className="text-white font-semibold text-sm">Charger 3</span>
              <span className="text-[#666] text-[10px] font-bold tracking-widest uppercase">OCCUPIED</span>
            </div>
            <div className="h-1.5 w-full bg-[#222] rounded-full overflow-hidden">
              <div className="h-full bg-[#444] w-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Forecast Chart */}
      <div className="mt-auto bg-[#111] border border-[#222] rounded-xl p-4">
        <h4 className="text-[9px] font-bold text-neutral-500 tracking-widest uppercase mb-4">TRAFFIC FORECAST</h4>
        <div className="flex items-end justify-between h-12 gap-1 mb-2">
          {/* Dummy bars */}
          <div className="w-full bg-[#333] h-[30%] rounded-sm hover:bg-volt-green transition-colors"></div>
          <div className="w-full bg-[#333] h-[40%] rounded-sm hover:bg-volt-green transition-colors"></div>
          <div className="w-full bg-[#333] h-[35%] rounded-sm hover:bg-volt-green transition-colors"></div>
          <div className="w-full bg-volt-green/80 h-[50%] rounded-sm hover:bg-volt-green transition-colors"></div>
          <div className="w-full bg-volt-green h-[80%] rounded-sm transition-colors relative">
             <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-full h-[120%] bg-volt-green/20 blur-md pointer-events-none"></div>
          </div>
          <div className="w-full bg-volt-green/60 h-[45%] rounded-sm hover:bg-volt-green transition-colors"></div>
          <div className="w-full bg-[#333] h-[30%] rounded-sm hover:bg-volt-green transition-colors"></div>
          <div className="w-full bg-[#333] h-[25%] rounded-sm hover:bg-volt-green transition-colors"></div>
        </div>
        <div className="flex justify-between text-[#666] text-[9px] font-bold">
          <span>12 PM</span>
          <span>2 PM</span>
          <span>4 PM</span>
          <span>6 PM</span>
        </div>
      </div>
    </div>
  );
}
