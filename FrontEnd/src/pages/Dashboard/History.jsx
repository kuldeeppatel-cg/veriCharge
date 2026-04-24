import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function History() {
  return (
    <div className="flex h-screen w-screen bg-[#0a0f0d] font-inter text-white overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar activePage="history" />

      {/* Main Area */}
      <div className="flex flex-col flex-1 h-screen relative">
        <Header />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-10 relative">
          <div className="max-w-[1200px] mx-auto">
            
            {/* Page Header & Top Navigation */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 border-b border-[#222] pb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Charging History</h1>
                <p className="text-[#999] text-[15px]">
                  Detailed record of your network utilization and energy footprint.
                </p>
              </div>
              
              {/* Summary Metrics */}
              <div className="flex gap-4">
                <div className="bg-[#161616] border border-[#222] rounded-xl p-4 min-w-[120px]">
                  <p className="text-[9px] font-bold text-neutral-500 tracking-widest uppercase mb-1">TOTAL ENERGY</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-volt-green">1,248.5</span>
                    <span className="text-xs text-neutral-400">kWh</span>
                  </div>
                </div>
                <div className="bg-[#161616] border border-[#222] rounded-xl p-4 min-w-[120px]">
                  <p className="text-[9px] font-bold text-neutral-500 tracking-widest uppercase mb-1">CARBON OFFSET</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-volt-green">842</span>
                    <span className="text-xs text-neutral-400">kg</span>
                  </div>
                </div>
                <div className="bg-[#161616] border border-[#222] rounded-xl p-4 min-w-[120px]">
                  <p className="text-[9px] font-bold text-neutral-500 tracking-widest uppercase mb-1">LIFETIME COST</p>
                  <span className="text-2xl font-bold text-white">$412.30</span>
                </div>
                <div className="bg-[#161616] border border-[#222] rounded-xl p-4 min-w-[120px]">
                  <p className="text-[9px] font-bold text-neutral-500 tracking-widest uppercase mb-1">EFFICIENCY</p>
                  <span className="text-2xl font-bold text-white">98.2%</span>
                </div>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-3">
                <button className="bg-[#161616] border border-[#2c2c2c] rounded-lg px-4 py-2.5 text-sm text-neutral-300 flex items-center gap-2 hover:bg-[#222] transition-colors">
                  <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                  Last 30 Days
                  <svg className="w-3 h-3 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <button className="bg-[#161616] border border-[#2c2c2c] rounded-lg px-4 py-2.5 text-sm text-neutral-300 flex items-center gap-2 hover:bg-[#222] transition-colors">
                  <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  All Station Types
                  <svg className="w-3 h-3 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <button className="bg-[#161616] border border-[#2c2c2c] rounded-lg px-4 py-2.5 text-sm text-neutral-300 flex items-center gap-2 hover:bg-[#222] transition-colors">
                  <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/></svg>
                  Date: Newest First
                  <svg className="w-3 h-3 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </button>
              </div>
              <button className="bg-transparent border border-volt-green text-volt-green rounded-lg px-4 py-2.5 text-[11px] font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-volt-green/10 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                EXPORT CSV
              </button>
            </div>

            {/* Data Table */}
            <div className="bg-[#161616] border border-[#222] rounded-2xl overflow-hidden mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#2c2c2c]">
                    <th className="py-5 px-6 text-[10px] font-bold text-neutral-500 tracking-widest uppercase">DATE & TIME</th>
                    <th className="py-5 px-6 text-[10px] font-bold text-neutral-500 tracking-widest uppercase">STATION NAME</th>
                    <th className="py-5 px-6 text-[10px] font-bold text-neutral-500 tracking-widest uppercase">ENERGY</th>
                    <th className="py-5 px-6 text-[10px] font-bold text-neutral-500 tracking-widest uppercase">TOTAL COST</th>
                    <th className="py-5 px-6 text-[10px] font-bold text-neutral-500 tracking-widest uppercase">CARBON SAVED</th>
                    <th className="py-5 px-6 text-[10px] font-bold text-neutral-500 tracking-widest uppercase">STATUS</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  
                  {/* Row 1 */}
                  <tr className="border-b border-[#2c2c2c] hover:bg-[#1c1c1c] transition-colors">
                    <td className="py-5 px-6">
                      <div className="font-bold text-white">Oct 24, 2023</div>
                      <div className="text-neutral-500 text-xs">14:22 PM</div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-[#1c2c20] border border-[#2a4530] flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-volt-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        </div>
                        <div>
                          <div className="font-bold text-white mb-0.5">Superhub DTLA #04</div>
                          <span className="bg-[#2c2c2c] text-neutral-300 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase">DC FAST</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-baseline gap-1">
                        <span className="font-bold text-white">42.8</span>
                        <span className="text-xs text-neutral-500">kWh</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 font-bold text-white">$18.40</td>
                    <td className="py-5 px-6 font-bold text-volt-green flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
                      12.4 kg
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center justify-between">
                        <span className="bg-volt-green/10 text-volt-green border border-volt-green/20 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase">
                          COMPLETED
                        </span>
                        <button className="text-neutral-500 hover:text-white transition-colors">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="border-b border-[#2c2c2c] hover:bg-[#1c1c1c] transition-colors">
                    <td className="py-5 px-6">
                      <div className="font-bold text-white">Oct 22, 2023</div>
                      <div className="text-neutral-500 text-xs">08:15 AM</div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-[#222] border border-[#333] flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        </div>
                        <div>
                          <div className="font-bold text-white mb-0.5">Residential Wallbox</div>
                          <span className="bg-[#2c2c2c] text-neutral-300 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase">LEVEL 2</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-baseline gap-1">
                        <span className="font-bold text-white">18.2</span>
                        <span className="text-xs text-neutral-500">kWh</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 font-bold text-white">$2.54</td>
                    <td className="py-5 px-6 font-bold text-volt-green flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
                      5.3 kg
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center justify-between">
                        <span className="bg-volt-green/10 text-volt-green border border-volt-green/20 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase">
                          COMPLETED
                        </span>
                        <button className="text-neutral-500 hover:text-white transition-colors">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="border-b border-[#2c2c2c] hover:bg-[#1c1c1c] transition-colors">
                    <td className="py-5 px-6">
                      <div className="font-bold text-white">Oct 20, 2023</div>
                      <div className="text-neutral-500 text-xs">19:45 PM</div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-[#1c2c20] border border-[#2a4530] flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-volt-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        </div>
                        <div>
                          <div className="font-bold text-white mb-0.5">Electrify Mall West</div>
                          <span className="bg-[#2c2c2c] text-neutral-300 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase">DC FAST</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-baseline gap-1">
                        <span className="font-bold text-white">64.5</span>
                        <span className="text-xs text-neutral-500">kWh</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 font-bold text-white">$24.12</td>
                    <td className="py-5 px-6 font-bold text-volt-green flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
                      18.7 kg
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center justify-between">
                        <span className="bg-volt-green/10 text-volt-green border border-volt-green/20 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase">
                          COMPLETED
                        </span>
                        <button className="text-neutral-500 hover:text-white transition-colors">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
              
              {/* Pagination */}
              <div className="flex justify-between items-center p-5 border-t border-[#2c2c2c]">
                <span className="text-[#888] text-xs">Showing 1 to 10 of 42 sessions</span>
                <div className="flex gap-2">
                  <button className="bg-[#222] border border-[#333] text-neutral-400 rounded-md px-3 py-1.5 text-[10px] font-bold hover:bg-[#333] hover:text-white transition-colors">PREV</button>
                  <button className="bg-volt-green text-black rounded-md px-3 py-1.5 text-[10px] font-bold">1</button>
                  <button className="bg-[#222] border border-[#333] text-neutral-400 rounded-md px-3 py-1.5 text-[10px] font-bold hover:bg-[#333] hover:text-white transition-colors">2</button>
                  <button className="bg-[#222] border border-[#333] text-neutral-400 rounded-md px-3 py-1.5 text-[10px] font-bold hover:bg-[#333] hover:text-white transition-colors">3</button>
                  <button className="bg-[#222] border border-[#333] text-neutral-400 rounded-md px-3 py-1.5 text-[10px] font-bold hover:bg-[#333] hover:text-white transition-colors">NEXT</button>
                </div>
              </div>
            </div>

            {/* Bottom Insight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-[#161616] border border-[#222] rounded-2xl p-6">
                <h3 className="text-white font-bold text-lg mb-2">Sustainable Impact</h3>
                <p className="text-[#888] text-sm mb-6 leading-relaxed">
                  You've saved the equivalent of planting 42 trees this year by choosing electric mobility.
                </p>
                <div className="mt-auto">
                  <div className="flex justify-between items-end mb-2">
                    <div className="h-1.5 w-full bg-[#222] rounded-full overflow-hidden">
                      <div className="h-full bg-volt-green w-[75%]"></div>
                    </div>
                    <span className="text-volt-green text-[10px] font-bold tracking-widest ml-4 whitespace-nowrap uppercase">75% OF GOAL</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#161616] border border-[#222] rounded-2xl p-6 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-white font-bold text-lg mb-2">Favorite Station</h3>
                  <p className="text-[#888] text-sm mb-6 leading-relaxed">
                    Superhub DTLA #04 is your most visited charging point with 15 sessions.
                  </p>
                  <button className="text-volt-green text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 hover:underline">
                    VIEW STATION DETAILS
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
                <svg className="absolute -bottom-4 -right-4 w-32 h-32 text-[#222] z-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>

              <div className="bg-[#1c2c20] border border-[#2a4530] rounded-2xl p-6 relative">
                <div className="absolute top-6 right-6 bg-volt-green/20 text-volt-green border border-volt-green/30 px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase">NEW INSIGHT</div>
                <div className="w-10 h-10 rounded-lg bg-volt-green flex items-center justify-center text-black mb-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Energy Tip</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Charging during off-peak hours (11 PM - 6 AM) could save you an average of $3.20 per session.
                </p>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
