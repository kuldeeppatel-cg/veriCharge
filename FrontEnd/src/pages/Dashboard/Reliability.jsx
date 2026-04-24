import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function Reliability() {
  return (
    <div className="flex h-screen w-screen bg-[#0a0f0d] font-inter text-white overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar activePage="reliability" />

      {/* Main Area */}
      <div className="flex flex-col flex-1 h-screen relative">
        <Header />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-10 relative">
          <div className="max-w-[1200px] mx-auto">
            
            {/* Top Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
              
              {/* Main Score Card */}
              <div className="md:col-span-8 bg-[#161616] border border-[#222] rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase mb-4">CURRENT NETWORK HEALTH</h3>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-xl font-bold text-white">VeriScore</span>
                    <span className="text-5xl font-bold text-volt-green tracking-tighter">98.4</span>
                  </div>
                  
                  <div className="h-1.5 w-full bg-[#222] rounded-full overflow-hidden mb-6">
                    <div className="h-full bg-volt-green w-[98.4%] rounded-full shadow-[0_0_10px_#cce600]"></div>
                  </div>
                  
                  <p className="text-[#888] text-sm max-w-[400px]">
                    Reliability increased by 1.2% this week across all fast-charging nodes.
                  </p>
                </div>
                {/* Background glow */}
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-volt-green/5 rounded-full blur-[80px]"></div>
              </div>

              {/* Uptime Card */}
              <div className="md:col-span-2 bg-[#161616] border border-[#222] rounded-2xl p-6 flex flex-col justify-center">
                <h3 className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase mb-3">AVG UPTIME</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-2xl font-bold text-white">99.9</span>
                  <span className="text-sm font-semibold text-neutral-400">%</span>
                </div>
                <div className="flex items-start gap-1.5 text-volt-green">
                  <svg className="w-3.5 h-3.5 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
                  <span className="text-[10px] font-bold leading-tight uppercase">Near optimal<br/>performance</span>
                </div>
              </div>

              {/* Latency Card */}
              <div className="md:col-span-2 bg-[#161616] border border-[#222] rounded-2xl p-6 flex flex-col justify-center">
                <h3 className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase mb-3">AUTH LATENCY</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-2xl font-bold text-white">0.82</span>
                  <span className="text-sm font-semibold text-neutral-400">S</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-500">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/></svg>
                  <span className="text-[10px] font-semibold">Verified 10ms ago</span>
                </div>
              </div>

            </div>

            {/* Middle Section: Map + Side Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              
              {/* Live Network Map */}
              <div className="lg:col-span-2 bg-[#111] border border-[#222] rounded-2xl h-[400px] relative overflow-hidden">
                {/* Map Grid / Texture Background */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0f0d] via-transparent to-[#0a0f0d]/50 pointer-events-none"></div>

                {/* Map Header Tag */}
                <div className="absolute top-5 left-5 bg-black/60 backdrop-blur border border-[#333] px-3 py-1.5 rounded-full flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-volt-green rounded-full animate-pulse"></div>
                  <span className="text-[9px] font-bold text-neutral-300 tracking-widest uppercase">Live Network Feed</span>
                </div>

                {/* Pins */}
                {/* Broken Pin */}
                <div className="absolute top-[35%] left-[55%] flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#ff8a8a] rounded-t-full rounded-bl-full transform rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(255,138,138,0.4)] relative">
                    <svg className="w-4 h-4 text-black transform -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01"/></svg>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#ff8a8a] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                </div>

                {/* Verified Health Pin */}
                <div className="absolute top-[50%] left-[35%] flex flex-col items-center">
                  <div className="w-10 h-10 bg-volt-green rounded-t-full rounded-bl-full transform rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(204,230,0,0.4)] relative">
                    <svg className="w-4 h-4 text-black transform -rotate-45" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-volt-green rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                </div>

                {/* In Use Pin */}
                <div className="absolute bottom-[40%] right-[25%] flex flex-col items-center">
                  <div className="w-10 h-10 border-2 border-volt-green bg-transparent rounded-t-full rounded-bl-full transform rotate-45 flex items-center justify-center relative">
                    <div className="w-2 h-2 bg-volt-green rounded-full transform -rotate-45"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-2 border-volt-green rounded-full transform -translate-x-1/2 -translate-y-1/2 bg-[#111]"></div>
                  </div>
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-5 left-5 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-volt-green rounded-full shadow-[0_0_5px_#cce600]"></div>
                    <span className="text-[10px] font-bold text-neutral-400">Verified Health</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 border-2 border-volt-green rounded-full"></div>
                    <span className="text-[10px] font-bold text-neutral-400">In Use / Normal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-[#ff8a8a] rounded-full shadow-[0_0_5px_#ff8a8a]"></div>
                    <span className="text-[10px] font-bold text-neutral-400">Reported Broken</span>
                  </div>
                </div>
              </div>

              {/* Right Side Panels */}
              <div className="flex flex-col gap-6">
                
                {/* Reliable Hubs */}
                <div className="bg-[#161616] border border-[#222] rounded-2xl p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white text-sm font-bold">Reliable Hubs</h3>
                    <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
                  </div>
                  
                  <div className="flex flex-col gap-4 mb-6">
                    {/* Item 1 */}
                    <div className="flex items-center gap-4">
                      <span className="text-neutral-500 font-bold text-xs">01</span>
                      <div className="flex-1">
                        <h4 className="text-white text-sm font-bold mb-0.5">SOMA Superhub</h4>
                        <p className="text-[9px] text-neutral-500 tracking-widest uppercase">SAN FRANCISCO, CA</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-volt-green text-xs font-bold mb-1">99.8%</span>
                        <div className="flex gap-0.5">
                          <div className="w-1 h-3 bg-volt-green rounded-sm"></div>
                          <div className="w-1 h-3 bg-volt-green rounded-sm"></div>
                          <div className="w-1 h-3 bg-volt-green rounded-sm"></div>
                        </div>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center gap-4 border-t border-[#222] pt-4">
                      <span className="text-neutral-500 font-bold text-xs">02</span>
                      <div className="flex-1">
                        <h4 className="text-white text-sm font-bold mb-0.5">Mission District V3</h4>
                        <p className="text-[9px] text-neutral-500 tracking-widest uppercase">SAN FRANCISCO, CA</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-volt-green text-xs font-bold mb-1">99.6%</span>
                        <div className="flex gap-0.5">
                          <div className="w-1 h-3 bg-volt-green rounded-sm"></div>
                          <div className="w-1 h-3 bg-volt-green rounded-sm"></div>
                          <div className="w-1 h-3 bg-volt-green rounded-sm"></div>
                        </div>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-center gap-4 border-t border-[#222] pt-4">
                      <span className="text-neutral-500 font-bold text-xs">03</span>
                      <div className="flex-1">
                        <h4 className="text-white text-sm font-bold mb-0.5">Oakland Transit</h4>
                        <p className="text-[9px] text-neutral-500 tracking-widest uppercase">OAKLAND, CA</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-volt-green text-xs font-bold mb-1">99.2%</span>
                        <div className="flex gap-0.5">
                          <div className="w-1 h-3 bg-volt-green rounded-sm"></div>
                          <div className="w-1 h-3 bg-volt-green rounded-sm"></div>
                          <div className="w-1 h-3 bg-volt-green opacity-30 rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-auto bg-[#1c1c1c] border border-[#2c2c2c] hover:bg-[#222] text-neutral-300 rounded-lg py-3 text-[11px] font-bold tracking-wide transition-colors">
                    View Full Rankings
                  </button>
                </div>

                {/* Help the Network Box */}
                <div className="bg-volt-green rounded-2xl p-6 text-black flex flex-col justify-between shadow-[0_10px_30px_rgba(204,230,0,0.15)] relative overflow-hidden">
                  <div className="flex justify-between items-start mb-3 relative z-10">
                    <h3 className="font-bold text-sm w-[60%] leading-tight">Help the Network</h3>
                    <svg className="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>
                  </div>
                  <p className="text-[11px] font-semibold opacity-80 mb-5 relative z-10 leading-relaxed">
                    Report a broken charger to earn 50 VeriPoints and maintain community trust.
                  </p>
                  <button className="w-full bg-[#111] hover:bg-black text-white rounded-lg py-3 text-[11px] font-bold tracking-wide transition-colors relative z-10">
                    Report Issue
                  </button>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-[40px] rounded-full pointer-events-none"></div>
                </div>

              </div>
            </div>

            {/* Bottom Section (4 Small Cards) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Network Load */}
              <div className="bg-[#161616] border border-[#222] rounded-2xl p-5 flex flex-col">
                <h3 className="text-[9px] font-bold text-neutral-500 tracking-widest uppercase mb-4">NETWORK LOAD</h3>
                <div className="flex items-end gap-1 h-10 mb-3">
                  <div className="w-full bg-[#2c2c2c] h-[30%] rounded-sm"></div>
                  <div className="w-full bg-[#2c2c2c] h-[50%] rounded-sm"></div>
                  <div className="w-full bg-[#2c2c2c] h-[40%] rounded-sm"></div>
                  <div className="w-full bg-volt-green h-[84%] rounded-sm"></div>
                  <div className="w-full bg-[#2c2c2c] h-[60%] rounded-sm"></div>
                  <div className="w-full bg-[#2c2c2c] h-[40%] rounded-sm"></div>
                </div>
                <p className="text-[#666] text-[9px] font-semibold mt-auto">Peak usage: 84% at 17:00</p>
              </div>

              {/* Fault Detection */}
              <div className="bg-[#161616] border border-[#222] rounded-2xl p-5 flex flex-col justify-center">
                <h3 className="text-[9px] font-bold text-neutral-500 tracking-widest uppercase mb-4">FAULT DETECTION</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1c2c20] border border-[#2a4530] flex items-center justify-center text-volt-green shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Active</div>
                    <div className="text-volt-green text-[8px] font-bold tracking-widest uppercase mt-0.5">SYSTEM NORMAL</div>
                  </div>
                </div>
              </div>

              {/* Avg Charge Time */}
              <div className="bg-[#161616] border border-[#222] rounded-2xl p-5 flex flex-col justify-center">
                <h3 className="text-[9px] font-bold text-neutral-500 tracking-widest uppercase mb-3">AVG CHARGE TIME</h3>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white">24.5</span>
                    <span className="text-xs font-semibold text-neutral-400">MINS</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-[#ff8a8a] text-xs font-bold">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                    3%
                  </div>
                </div>
              </div>

              {/* Verified Users */}
              <div className="bg-[#161616] border border-[#222] rounded-2xl p-5 flex flex-col justify-center">
                <h3 className="text-[9px] font-bold text-neutral-500 tracking-widest uppercase mb-3">VERIFIED USERS</h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-[#161616] object-cover" src="https://i.pravatar.cc/100?img=33" alt="" />
                    <img className="w-8 h-8 rounded-full border-2 border-[#161616] object-cover" src="https://i.pravatar.cc/100?img=47" alt="" />
                    <img className="w-8 h-8 rounded-full border-2 border-[#161616] object-cover" src="https://i.pravatar.cc/100?img=12" alt="" />
                  </div>
                  <div className="bg-[#2c2c2c] text-white text-[9px] font-bold px-2 py-1 rounded-full">+12k</div>
                </div>
                <p className="text-[#666] text-[9px] font-semibold mt-auto">Active daily verifiers</p>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
