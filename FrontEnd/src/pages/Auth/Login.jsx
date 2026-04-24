import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="min-h-screen w-screen bg-[#0e0e0e] flex flex-col justify-center items-center font-inter text-white px-4 relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-volt-green/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Card Container */}
      <div className="w-full max-w-[420px] bg-[#161616] border border-[#222] rounded-2xl p-8 relative z-10 shadow-2xl">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-[#222] rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-volt-green" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-wide mb-1 text-white">VOLT_NODE</h1>
          <p className="text-[#888] text-sm">Sign in to VeriCharge Desktop</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase ml-1">EMAIL ADDRESS</label>
            <div className="relative flex items-center">
              <input 
                type="email" 
                placeholder="name@volt-node.io" 
                className="w-full bg-[#0e0e0e] border border-[#333] rounded-xl text-white text-[15px] py-3.5 px-4 focus:outline-none focus:border-volt-green/50 transition-colors placeholder:text-neutral-600"
              />
              <span className="absolute right-4 text-neutral-500 font-medium">@</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">PASSWORD</label>
              <a href="#" className="text-[10px] font-bold text-volt-green hover:underline">Forgot Password?</a>
            </div>
            <div className="relative flex items-center">
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-[#0e0e0e] border border-[#333] rounded-xl text-white text-[15px] py-3.5 px-4 focus:outline-none focus:border-volt-green/50 transition-colors placeholder:text-neutral-600 tracking-widest"
              />
              <svg className="absolute right-4 w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
          </div>

          <button type="submit" className="mt-2 w-full bg-volt-green text-black border-none rounded-xl py-3.5 text-[15px] font-bold cursor-pointer flex justify-center items-center gap-2 hover:bg-[#cce600] active:scale-[0.98] transition-all">
            Continue 
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>

        <div className="flex items-center my-8 text-center before:flex-1 before:border-b before:border-[#333] after:flex-1 after:border-b after:border-[#333]">
          <span className="px-3 text-neutral-500 text-[10px] font-bold tracking-widest uppercase">OR SECURE ACCESS</span>
        </div>

        {/* Secure Access Options */}
        <div className="flex gap-3">
          <button type="button" className="flex-1 bg-[#222] hover:bg-[#2a2a2a] text-white border border-[#333] rounded-xl py-3 flex flex-col items-center justify-center gap-1.5 transition-colors active:scale-[0.98]">
            <svg className="w-5 h-5 text-volt-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41M12 6a6 6 0 100 12 6 6 0 000-12z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v4" />
            </svg>
            <span className="text-[11px] font-semibold text-neutral-300">Biometrics</span>
          </button>
          <button type="button" className="flex-1 bg-[#222] hover:bg-[#2a2a2a] text-white border border-[#333] rounded-xl py-3 flex flex-col items-center justify-center gap-1.5 transition-colors active:scale-[0.98]">
            <svg className="w-5 h-5 text-volt-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 7h3a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h3m10-4v4" />
              <circle cx="12" cy="11" r="3" />
            </svg>
            <span className="text-[11px] font-semibold text-neutral-300">Hardware Key</span>
          </button>
        </div>

        {/* Card Footer */}
        <div className="mt-8 pt-6 border-t border-[#222] text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1 text-[#666]">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-[8px] font-bold tracking-widest uppercase">ENCRYPTED WITH VOLT-SHIELD PROTOCOL</span>
          </div>
          <p className="text-[8px] font-bold tracking-widest uppercase text-[#555]">
            © 2024 VOLT_NODE SYSTEMS. ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>

      {/* External Footer */}
      <p className="mt-6 text-sm text-[#777]">
        New to the energy network? <Link to="/signup" className="text-volt-green font-semibold hover:underline">Request access</Link>
      </p>

    </div>
  );
}
