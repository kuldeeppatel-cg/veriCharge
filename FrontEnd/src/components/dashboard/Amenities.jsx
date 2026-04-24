import React from 'react';
import evChargingImg from '../../assets/ev_charging.png';

export default function Amenities() {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Street View Image */}
      <div className="relative h-[160px] rounded-2xl overflow-hidden border border-[#222] shrink-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${evChargingImg})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-white text-[10px] font-bold">Street View (Updated 2h ago)</span>
        </div>
      </div>

      {/* Amenities Grid */}
      <div className="bg-[#161616] border border-[#222] rounded-2xl p-6 flex-1">
        <h4 className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase mb-4">NEARBY AMENITIES</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1c1c1c] border border-[#2c2c2c] rounded-xl p-3 flex items-center gap-3">
            <svg className="w-4 h-4 text-volt-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-[#bbb] text-xs font-semibold">Cafe</span>
          </div>
          <div className="bg-[#1c1c1c] border border-[#2c2c2c] rounded-xl p-3 flex items-center gap-3">
            <svg className="w-4 h-4 text-volt-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.906 14.142-.001M2.385 8.169c5.308-5.308 13.922-5.308 19.23 0" />
            </svg>
            <span className="text-[#bbb] text-xs font-semibold leading-tight">Free<br/>Wi-Fi</span>
          </div>
          <div className="bg-[#1c1c1c] border border-[#2c2c2c] rounded-xl p-3 flex items-center gap-3">
            <svg className="w-4 h-4 text-volt-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-[#bbb] text-xs font-semibold">Grocery</span>
          </div>
          <div className="bg-[#1c1c1c] border border-[#2c2c2c] rounded-xl p-3 flex items-center gap-3">
            <svg className="w-4 h-4 text-volt-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-[#bbb] text-xs font-semibold">Restroom</span>
          </div>
        </div>
      </div>

      {/* Mini Map */}
      <div className="h-[100px] bg-[#326765] rounded-2xl overflow-hidden border border-[#222] relative shrink-0">
        <div className="absolute inset-0 opacity-50 mix-blend-overlay bg-noise"></div>
        {/* Fake Map Elements */}
        <div className="absolute top-4 left-8 w-16 h-8 bg-[#448c88] rounded-full blur-md"></div>
        <div className="absolute bottom-2 right-12 w-24 h-12 bg-[#448c88] rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-volt-green/30 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-volt-green rounded-full flex items-center justify-center shadow-lg border-[3px] border-[#326765]">
          <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
