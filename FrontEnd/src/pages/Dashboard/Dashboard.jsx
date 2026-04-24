import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import StationOverview from '../../components/dashboard/StationOverview';
import SystemIntegrity from '../../components/dashboard/SystemIntegrity';
import LiveQueue from '../../components/dashboard/LiveQueue';
import Amenities from '../../components/dashboard/Amenities';
import TechnicalSpecs from '../../components/dashboard/TechnicalSpecs';
import CommunityReports from '../../components/dashboard/CommunityReports';

export default function Dashboard() {
  return (
    <div className="flex h-screen w-screen bg-[#121212] font-inter text-white overflow-hidden">
      
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Layout Area */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        
        {/* Fixed Header */}
        <Header />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-10 pb-[120px] relative">
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
      <div className="absolute bottom-8 left-1/2 lg:left-[calc(50%+130px)] -translate-x-1/2 bg-[#1c1c1c] border border-[#333] rounded-full p-2 pr-2 pl-6 flex items-center gap-6 shadow-2xl z-50">
        <span className="text-white text-sm font-bold">Hub V3 - 1 Stall Available</span>
        <button className="bg-volt-green text-black font-bold px-8 py-3.5 rounded-full text-[13px] hover:bg-[#cce600] active:scale-[0.98] transition-all tracking-wide">
          START CHARGE SESSION
        </button>
      </div>

    </div>
  );
}
