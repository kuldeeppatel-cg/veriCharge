import React from 'react';

export default function CommunityReports() {
  return (
    <div className="bg-[#161616] border border-[#222] rounded-2xl p-8 flex-1">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Community Reports</h3>
        <span className="text-volt-green text-[10px] font-bold tracking-widest uppercase hover:underline cursor-pointer">VIEW ALL 152</span>
      </div>
      
      <div className="flex flex-col gap-4">
        {/* Report 1 */}
        <div className="bg-[#1c1c1c] border border-[#2c2c2c] rounded-xl p-5">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#333]"></div>
              <span className="text-white text-sm font-bold">Model_3_Pioneer</span>
              <span className="bg-volt-green text-black px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider uppercase">VERIFIED STAY</span>
            </div>
            <span className="text-[#666] text-xs">14 mins ago</span>
          </div>
          <p className="text-[#999] text-[13px] leading-relaxed">
            "Peak charging at 248kW. Station is clean and well-lit. The cafe next door is open late."
          </p>
        </div>

        {/* Report 2 */}
        <div className="bg-[#1c1c1c] border border-[#2c2c2c] rounded-xl p-5">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#333]"></div>
              <span className="text-white text-sm font-bold">ElectrifiedTraveler</span>
            </div>
            <span className="text-[#666] text-xs">2 hours ago</span>
          </div>
          <p className="text-[#999] text-[13px] leading-relaxed">
            "Smooth session on Charger 1. No issues with payment app today."
          </p>
        </div>
      </div>
    </div>
  );
}
