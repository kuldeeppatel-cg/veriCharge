import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function LiveMap() {
  return (
    <div className="flex h-screen w-screen bg-[#0a0f0d] font-inter text-white overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar activePage="map" />

      {/* Main Area */}
      <div className="flex flex-col flex-1 h-screen relative">
        <Header />

        {/* Map Container */}
        <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-[#1b2b23] via-[#3a5848] to-[#18261e]">
          
          {/* Subtle grid/texture over the map */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#ffffff33_1px,transparent_1px),linear-gradient(90deg,#ffffff33_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          {/* Map Pins */}
          
          {/* Pin 1: Available */}
          <Link to="/station" className="absolute top-[25%] left-[20%] flex flex-col items-center group cursor-pointer hover:-translate-y-1 transition-transform">
            <div className="w-8 h-8 bg-volt-green rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(204,230,0,0.4)] mb-1">
              <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div className="bg-[#111] border border-volt-green text-volt-green text-[9px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
              350kW • 4 FREE
            </div>
          </Link>

          {/* Pin 2: Occupied */}
          <div className="absolute top-[40%] right-[35%] flex flex-col items-center group cursor-not-allowed opacity-60">
            <div className="w-8 h-8 bg-transparent border-2 border-neutral-500 rounded-full flex items-center justify-center mb-1">
              <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.93 4.93l14.14 14.14" />
              </svg>
            </div>
            <div className="bg-[#111] border border-[#333] text-neutral-500 text-[9px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
              150kW • FULL
            </div>
          </div>

          {/* Pin 3: Free Soon */}
          <Link to="/station" className="absolute bottom-[20%] right-[40%] flex flex-col items-center group cursor-pointer hover:-translate-y-1 transition-transform">
            <div className="w-8 h-8 bg-[#326765] border-2 border-volt-green rounded-full flex items-center justify-center mb-1">
              <span className="text-volt-green text-[10px] font-bold">8m</span>
            </div>
            <div className="bg-[#111] border border-[#326765] text-[#448c88] text-[9px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
              250kW • FREE SOON
            </div>
          </Link>

          {/* Right Floating Panel (Nearby Stations & Range) */}
          <div className="absolute top-6 right-6 w-[360px] flex flex-col gap-4 z-20">
            
            {/* Nearby Stations List */}
            <div className="bg-[#161616]/95 backdrop-blur-xl border border-[#2c2c2c] rounded-2xl p-5 shadow-2xl">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-white font-semibold">Nearby Stations</h3>
                <span className="text-neutral-500 text-[10px] font-bold tracking-widest uppercase">34 STATIONS FOUND</span>
              </div>

              <div className="flex flex-col gap-3">
                {/* Station Card 1 */}
                <Link to="/station" className="bg-[#1c2c20] border border-[#2a4530] rounded-xl p-4 hover:border-volt-green/50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-white text-sm font-bold group-hover:text-volt-green transition-colors">Supervolt Mission District</h4>
                    <span className="bg-volt-green text-black px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                      AVAILABLE
                    </span>
                  </div>
                  <p className="text-neutral-400 text-[11px] mb-3">0.8 miles away • 350kW DC</p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-volt-green"></div>
                      <div className="w-3 h-3 rounded-full bg-volt-green"></div>
                      <div className="w-3 h-3 rounded-full bg-[#222]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#222]"></div>
                    </div>
                    <span className="text-neutral-500 text-[10px]">2 of 4 charging units free</span>
                  </div>
                </Link>

                {/* Station Card 2 */}
                <div className="bg-[#1c1c1c] border border-[#2c2c2c] rounded-xl p-4 cursor-pointer hover:border-[#444] transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-white text-sm font-bold">GridRunner SoMa Hub</h4>
                    <span className="bg-transparent border border-volt-green text-volt-green px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-volt-green rounded-full"></span>
                      OCCUPIED
                    </span>
                  </div>
                  <p className="text-neutral-400 text-[11px] mb-2">1.2 miles away • 250kW DC</p>
                  <p className="text-[#888] text-[10px]">Wait time: <span className="text-volt-green font-semibold">Available in 8 mins</span></p>
                </div>

                {/* Station Card 3 */}
                <div className="bg-[#1c1c1c] border border-[#2c2c2c] opacity-60 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-white text-sm font-bold">Electra Charge Market St</h4>
                    <span className="bg-[#333] text-neutral-400 px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase">
                      FULL
                    </span>
                  </div>
                  <p className="text-neutral-400 text-[11px] mb-2">1.5 miles away • 150kW DC</p>
                  <p className="text-[#666] text-[10px] flex items-center gap-1">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    Peak hour • Expected wait 25m+
                  </p>
                </div>
              </div>
            </div>

            {/* Estimated Range Panel */}
            <div className="bg-[#161616]/95 backdrop-blur-xl border border-[#2c2c2c] rounded-2xl p-5 shadow-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90 absolute" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#222" strokeWidth="12" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#cce600" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="60" strokeLinecap="round" />
                  </svg>
                  <span className="text-[10px] font-bold text-white z-10">76%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-neutral-500 text-[9px] font-bold tracking-widest uppercase mb-0.5">ESTIMATED RANGE</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white leading-none">242</span>
                    <span className="text-xs font-semibold text-neutral-400">MILES</span>
                  </div>
                </div>
              </div>
              <button className="w-10 h-10 rounded-xl bg-[#222] hover:bg-[#333] flex items-center justify-center text-neutral-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </button>
            </div>

          </div>

          {/* Bottom Filter Pills */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center bg-[#161616]/90 backdrop-blur-md rounded-full p-1 border border-[#2c2c2c] z-20">
            <button className="bg-volt-green text-black px-6 py-3 rounded-full text-[11px] font-bold tracking-wide shadow-lg">
              VERIFIED ONLY
            </button>
            <button className="text-neutral-400 hover:text-white px-6 py-3 rounded-full text-[11px] font-bold tracking-wide transition-colors">
              FAST CHARGE (350kW+)
            </button>
            <button className="text-neutral-400 hover:text-white px-6 py-3 rounded-full text-[11px] font-bold tracking-wide transition-colors">
              AMENITY FILTERS
            </button>
            <div className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center mr-1 text-neutral-400 hover:text-white hover:bg-[#222] cursor-pointer transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-8 right-6 flex flex-col gap-3 z-20">
            <button className="w-12 h-12 bg-[#161616]/90 backdrop-blur-md border border-[#2c2c2c] rounded-xl flex items-center justify-center text-white hover:bg-[#222] transition-colors shadow-lg">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
            </button>
            <button className="w-12 h-12 bg-[#161616]/90 backdrop-blur-md border border-[#2c2c2c] rounded-xl flex items-center justify-center text-white hover:bg-[#222] transition-colors shadow-lg">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4"/></svg>
            </button>
            <button className="w-12 h-12 bg-[#161616]/90 backdrop-blur-md border border-[#2c2c2c] rounded-xl flex items-center justify-center text-white hover:bg-[#222] mt-2 transition-colors shadow-lg">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
