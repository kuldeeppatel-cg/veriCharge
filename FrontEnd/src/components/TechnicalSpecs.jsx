import React from 'react';

export default function TechnicalSpecs() {
  return (
    <div className="bg-[#161616] border border-[#222] rounded-2xl p-8 flex-1">
      <h3 className="text-xl font-bold text-white mb-6">Technical Specs</h3>
      
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center border-b border-[#222] pb-4">
          <span className="text-[#888] text-sm">Connector Type</span>
          <span className="text-white font-bold text-sm">Tesla (NACS) / CCS1</span>
        </div>
        
        <div className="flex justify-between items-center border-b border-[#222] pb-4">
          <span className="text-[#888] text-sm">Max Power Output</span>
          <span className="text-volt-green font-bold text-sm">250 kW</span>
        </div>
        
        <div className="flex justify-between items-center border-b border-[#222] pb-4">
          <span className="text-[#888] text-sm">Pricing Model</span>
          <span className="text-white font-bold text-sm">$0.34 / kWh</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-[#888] text-sm">Access Control</span>
          <span className="text-white font-bold text-sm">Public (App Required)</span>
        </div>
      </div>
    </div>
  );
}
