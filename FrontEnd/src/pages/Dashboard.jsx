/* eslint-disable react-hooks/set-state-in-effect */

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StationOverview from '../components/StationOverview';
import SystemIntegrity from '../components/SystemIntegrity';
import LiveQueue from '../components/LiveQueue';
import Amenities from '../components/Amenities';
import TechnicalSpecs from '../components/TechnicalSpecs';
import CommunityReports from '../components/CommunityReports';

import { useState, useEffect } from 'react';

export default function Dashboard() {
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
    <div className="flex h-screen w-screen bg-[#121212] font-inter text-white overflow-hidden">
      
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Layout Area */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        
        {/* Fixed Header */}
        <Header />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 pb-[120px] relative">
          <div className="max-w-[1200px] mx-auto">
            
            <StationOverview />

            {/* 3-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-1">
                <SystemIntegrity />
              </div>
              <div className="lg:col-span-1">
                <LiveQueue />
              </div>
              <div className="lg:col-span-1">
                <Amenities />
              </div>
            </div>

            {/* Bottom 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TechnicalSpecs />
              <CommunityReports />
            </div>

          </div>
        </main>
      </div>

      {/* Floating Action Bar */}
      <div className="absolute bottom-8 left-1/2 lg:left-[calc(50%+130px)] -translate-x-1/2 bg-[#1c1c1c] border border-[#333] rounded-full p-2 pr-2 pl-6 flex items-center gap-6 shadow-2xl z-50 whitespace-nowrap">
        <span className="text-white text-sm font-bold">Hub V3 - 1 Stall Available {user?.vehicleModel ? `For Your ${user.vehicleModel}` : ''}</span>
        <button 
          onClick={() => {
            if (!user) return alert("Please log in first!");
            const historyKey = `history_${user.email}`;
            const existingHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
            const newSession = {
              id: Date.now(),
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              station: "Silicon Valley Hub - V3",
              type: "DC FAST",
              isFast: true,
              energy: parseFloat((Math.random() * (70 - 20) + 20).toFixed(1)),
              cost: parseFloat((Math.random() * (30 - 10) + 10).toFixed(2)),
              carbon: parseFloat((Math.random() * (20 - 5) + 5).toFixed(1)),
              status: "COMPLETED"
            };
            localStorage.setItem(historyKey, JSON.stringify([newSession, ...existingHistory]));
            alert(`Charge session completed! Logged ${newSession.energy}kWh to your history.`);
          }}
          className="bg-volt-green text-black font-bold px-8 py-3.5 rounded-full text-[13px] hover:bg-[#cce600] active:scale-[0.98] transition-all tracking-wide"
        >
          START CHARGE SESSION
        </button>
      </div>

    </div>
  );
}

