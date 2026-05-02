/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Support() {
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
    <div className="flex h-screen w-screen bg-[#111111] font-inter text-white overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar activePage="support" />

      {/* Main Area */}
      <div className="flex flex-col flex-1 h-screen relative">
        <Header title="SUPPORT CENTER" />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto relative flex flex-col">
          <div className="max-w-[1000px] w-full mx-auto p-8 lg:p-12 flex-1">
            
            {/* Hero Section */}
            <div className="text-center mb-12 mt-6">
              <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">{user?.fullName ? `How can we help you today, ${user.fullName.split(' ')[0]}?` : 'How can we help you today?'}</h1>
              <p className="text-[#888] text-[13px] max-w-lg mx-auto leading-relaxed mb-8">
                Search our knowledge base for instant answers or reach out to our dedicated technical team for high-voltage assistance.
              </p>
              
              <div className="relative max-w-2xl mx-auto">
                <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search for FAQs, error codes, or charging tips..." 
                  className="w-full bg-[#161616] border border-[#222] rounded-2xl text-white text-[15px] py-5 pl-14 pr-6 focus:outline-none focus:border-volt-green/50 transition-colors placeholder:text-neutral-600 shadow-xl"
                />
              </div>
            </div>

            {/* Quick Links Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              
              {/* Card 1 */}
              <div className="bg-[#161616] border border-[#222] rounded-2xl p-6 hover:border-volt-green/30 transition-colors cursor-pointer group">
                <div className="w-8 h-8 rounded-lg bg-[#1c2c20] flex items-center justify-center text-volt-green mb-4">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <h3 className="text-white font-bold text-[15px] mb-2 group-hover:text-volt-green transition-colors">Hardware Help</h3>
                <p className="text-[#666] text-[11px] leading-relaxed">
                  Troubleshoot connectors, cable issues, and physical station malfunctions.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#161616] border border-[#222] rounded-2xl p-6 hover:border-volt-green/30 transition-colors cursor-pointer group">
                <div className="w-8 h-8 rounded-lg bg-[#1c2c20] flex items-center justify-center text-volt-green mb-4">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"/><path d="M2 10h20"/></svg>
                </div>
                <h3 className="text-white font-bold text-[15px] mb-2 group-hover:text-volt-green transition-colors">Payment Issues</h3>
                <p className="text-[#666] text-[11px] leading-relaxed">
                  Billing inquiries, wallet top-ups, and transaction history disputes.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#161616] border border-[#222] rounded-2xl p-6 hover:border-volt-green/30 transition-colors cursor-pointer group">
                <div className="w-8 h-8 rounded-lg bg-[#1c2c20] flex items-center justify-center text-volt-green mb-4">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <h3 className="text-white font-bold text-[15px] mb-2 group-hover:text-volt-green transition-colors">Station Reporting</h3>
                <p className="text-[#666] text-[11px] leading-relaxed">
                  Report offline stations or suggest new charging locations in your area.
                </p>
              </div>

            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              
              {/* Left Column: Trending Topics */}
              <div className="md:col-span-3">
                <h3 className="text-volt-green text-[10px] font-bold tracking-widest uppercase mb-4">Trending Topics</h3>
                
                <div className="flex flex-col gap-3">
                  {/* Topic 1 */}
                  <div className="bg-[#161616] border border-[#222] rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-[#1a1a1a] transition-colors">
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
                      <span className="text-neutral-300 text-[13px] font-medium">Resetting your charging session via the app</span>
                    </div>
                    <svg className="w-4 h-4 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                  
                  {/* Topic 2 */}
                  <div className="bg-[#161616] border border-[#222] rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-[#1a1a1a] transition-colors">
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
                      <span className="text-neutral-300 text-[13px] font-medium">How to handle "Connection Lost" errors</span>
                    </div>
                    <svg className="w-4 h-4 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  </div>

                  {/* Topic 3 */}
                  <div className="bg-[#161616] border border-[#222] rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-[#1a1a1a] transition-colors">
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
                      <span className="text-neutral-300 text-[13px] font-medium">VeriCharge Premium: Membership benefits</span>
                    </div>
                    <svg className="w-4 h-4 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  </div>

                  {/* Topic 4 */}
                  <div className="bg-[#161616] border border-[#222] rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-[#1a1a1a] transition-colors">
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
                      <span className="text-neutral-300 text-[13px] font-medium">Optimizing battery health during fast charging</span>
                    </div>
                    <svg className="w-4 h-4 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="md:col-span-2">
                <div className="bg-[#161616] border border-[#222] rounded-2xl p-6">
                  <div className="mb-6 border-b border-[#222] pb-6">
                    <h3 className="text-white text-[15px] font-bold mb-1">Contact Support</h3>
                    <p className="text-neutral-500 text-[9px] font-bold tracking-widest uppercase">AVERAGE RESPONSE TIME: {'<'} 5 MINS</p>
                  </div>

                  {/* Live Chat Action */}
                  <div className="bg-[#1a2b1e] border border-[#26402d] rounded-xl p-4 flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-volt-green flex items-center justify-center text-black">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                      </div>
                      <div>
                        <div className="text-white text-xs font-bold mb-0.5">Live Chat</div>
                        <div className="text-[#6bbd79] text-[9px]">Speak with an agent now</div>
                      </div>
                    </div>
                    <button className="bg-volt-green hover:bg-[#cce600] text-black px-4 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-colors">
                      START
                    </button>
                  </div>

                  {/* Ticket Form */}
                  <div>
                    <h4 className="text-neutral-500 text-[9px] font-bold tracking-widest uppercase mb-4">OR SUBMIT A TICKET</h4>
                    
                    <div className="mb-4">
                      <label className="block text-[9px] font-bold text-neutral-500 tracking-widest uppercase mb-2">SUBJECT</label>
                      <input 
                        type="text" 
                        placeholder="Short description of the issue"
                        className="w-full bg-[#111] border border-[#333] rounded-lg text-white text-xs py-3 px-3 focus:outline-none focus:border-volt-green/50 transition-colors placeholder:text-neutral-600"
                      />
                    </div>

                    <div className="mb-5">
                      <label className="block text-[9px] font-bold text-neutral-500 tracking-widest uppercase mb-2">DETAILS</label>
                      <textarea 
                        rows="4"
                        placeholder="Provide as much info as possible..."
                        className="w-full bg-[#111] border border-[#333] rounded-lg text-white text-xs py-3 px-3 focus:outline-none focus:border-volt-green/50 transition-colors placeholder:text-neutral-600 resize-none"
                      ></textarea>
                    </div>

                    <button className="w-full bg-[#222] hover:bg-[#333] border border-[#333] text-white rounded-lg py-3 text-[11px] font-bold transition-colors mb-6">
                      Submit Ticket
                    </button>

                    <div className="text-center">
                      <span className="text-neutral-500 text-[9px] font-bold tracking-widest uppercase">
                        EMAIL US • CALL: 0880-VERI
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>

          {/* Footer Area */}
          <footer className="border-t border-[#222] bg-[#0a0f0d] px-8 lg:px-12 py-6 mt-auto flex justify-between items-center shrink-0">
            <div className="flex gap-4">
              <span className="text-neutral-600 text-[9px] font-bold tracking-widest uppercase">© 2024 VERICHARGE NETWORK INC.</span>
              <a href="#" className="text-neutral-400 hover:text-white text-[9px] font-bold tracking-widest uppercase transition-colors">TERMS</a>
              <a href="#" className="text-neutral-400 hover:text-white text-[9px] font-bold tracking-widest uppercase transition-colors">PRIVACY</a>
              <a href="#" className="text-neutral-400 hover:text-white text-[9px] font-bold tracking-widest uppercase transition-colors">STATUS</a>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-volt-green rounded-full"></div>
              <span className="text-volt-green text-[9px] font-bold tracking-widest uppercase">GLOBAL OPS: NORMAL</span>
            </div>
          </footer>

        </main>
      </div>
    </div>
  );
}

