import React from 'react';
import { Link } from 'react-router-dom';
import evChargingImg from '../../assets/ev_charging.png';

export default function Signup() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen w-screen bg-volt-dark font-inter text-white overflow-x-hidden">
      
      {/* Left Panel (Hero) */}
      <div className="relative w-full lg:w-1/2 h-[45vh] lg:h-full shrink-0 border-none lg:border-r border-volt-border">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: `url(${evChargingImg})` }}
        ></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-volt-dark lg:from-black via-volt-dark/60 lg:via-black/80 to-transparent z-10"></div>
        
        {/* Content */}
        <div className="absolute bottom-12 lg:bottom-10 left-6 lg:left-10 right-6 lg:right-10 z-20">
          <h3 className="text-volt-green italic text-xl lg:text-2xl font-extrabold mb-3 lg:mb-5 tracking-tight">VOLT_NODE</h3>
          <h1 className="text-2xl lg:text-[2.5rem] font-bold leading-tight lg:leading-[1.1] mb-3 lg:mb-4 text-white">
            Join the network of performance-driven drivers
          </h1>
          <p className="text-sm lg:text-base text-neutral-400 leading-relaxed mb-6 lg:mb-8 max-w-full lg:max-w-[90%]">
            Experience ultra-fast charging speeds and precision energy management designed for the next generation of mobility.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <img className="w-6 h-6 lg:w-7 lg:h-7 rounded-full border-2 border-volt-dark lg:border-black" src="https://i.pravatar.cc/100?img=11" alt="User 1" />
              <img className="w-6 h-6 lg:w-7 lg:h-7 rounded-full border-2 border-volt-dark lg:border-black" src="https://i.pravatar.cc/100?img=12" alt="User 2" />
              <img className="w-6 h-6 lg:w-7 lg:h-7 rounded-full border-2 border-volt-dark lg:border-black" src="https://i.pravatar.cc/100?img=13" alt="User 3" />
            </div>
            <span className="text-[9.5px] lg:text-[10.5px] font-semibold text-neutral-300 tracking-wide uppercase">
              JOINED BY 12K+ OWNERS
            </span>
          </div>
        </div>
      </div>

      {/* Right Panel (Form) */}
      <div className="flex w-full lg:w-1/2 bg-volt-dark flex-col justify-start lg:justify-center items-center relative p-6 lg:p-10 pt-8 lg:pt-10 z-30 rounded-t-3xl lg:rounded-none -mt-6 lg:mt-0 pb-24 lg:pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] lg:shadow-none">
        
        {/* Mobile handle for sheet effect */}
        <div className="w-12 h-1.5 bg-neutral-700 rounded-full mb-8 lg:hidden"></div>

        <div className="w-full max-w-[400px]">
          <div className="mb-8 lg:mb-10 text-center lg:text-left">
            <h2 className="text-2xl font-semibold mb-2 text-neutral-100">Create your account</h2>
            <p className="text-sm text-neutral-400">Access the most reliable charging infrastructure.</p>
          </div>

          <form className="flex flex-col gap-4 lg:gap-5" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-1.5 lg:gap-2">
              <label className="text-[10px] font-semibold text-neutral-400 tracking-wide uppercase ml-1">FULL NAME</label>
              <div className="relative flex items-center">
                <svg className="absolute left-4 w-5 h-5 text-neutral-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  className="w-full bg-volt-gray border border-volt-border rounded-xl lg:rounded-md text-white text-[15px] py-3.5 lg:py-3 pl-11 pr-4 focus:outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-600"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 lg:gap-2">
              <label className="text-[10px] font-semibold text-neutral-400 tracking-wide uppercase ml-1">EMAIL ADDRESS</label>
              <div className="relative flex items-center">
                <svg className="absolute left-4 w-5 h-5 text-neutral-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full bg-volt-gray border border-volt-border rounded-xl lg:rounded-md text-white text-[15px] py-3.5 lg:py-3 pl-11 pr-4 focus:outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-600"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 lg:gap-2">
              <label className="text-[10px] font-semibold text-neutral-400 tracking-wide uppercase ml-1">VEHICLE MODEL</label>
              <div className="relative flex items-center">
                <svg className="absolute left-4 w-5 h-5 text-neutral-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l-1.41-1.41a2 2 0 010-2.83l1.83-1.83a2 2 0 012.83 0L10 5" />
                  <rect x="3" y="10" width="18" height="10" rx="2" />
                  <circle cx="7" cy="15" r="1.5" />
                  <circle cx="17" cy="15" r="1.5" />
                </svg>
                <select 
                  defaultValue="" 
                  className="w-full bg-volt-gray border border-volt-border rounded-xl lg:rounded-md text-white text-[15px] py-3.5 lg:py-3 pl-11 pr-4 focus:outline-none focus:border-neutral-500 transition-colors appearance-none cursor-pointer invalid:text-neutral-600"
                >
                  <option value="" disabled hidden>Select your vehicle</option>
                  <option value="tesla_3">Tesla Model 3</option>
                  <option value="rivian_r1t">Rivian R1T</option>
                  <option value="lucid_air">Lucid Air</option>
                </select>
                <svg className="absolute right-4 w-4 h-4 text-neutral-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <button type="submit" className="mt-4 lg:mt-2.5 w-full bg-volt-green text-black border-none rounded-xl lg:rounded-md py-3.5 lg:py-3 text-[15px] font-bold cursor-pointer flex justify-center items-center gap-2 hover:bg-[#cce600] active:scale-[0.98] transition-all">
              Create Account 
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>

          <div className="flex items-center my-6 lg:my-6 text-center before:flex-1 before:border-b before:border-volt-border after:flex-1 after:border-b after:border-volt-border">
            <span className="px-3 text-neutral-500 text-[10px] font-bold tracking-widest uppercase">OR CONTINUE WITH</span>
          </div>

          <button type="button" className="w-full bg-[#2a303c] lg:bg-[#3b4252] text-white border-none rounded-xl lg:rounded-md py-3.5 lg:py-3 text-[15px] font-medium cursor-pointer flex justify-center items-center gap-2.5 hover:bg-[#3a4254] transition-colors active:scale-[0.98]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <p className="text-center mt-8 lg:mt-7 text-[14px] lg:text-[15px] text-neutral-400">
            Already have an account? <Link to="/login" className="text-volt-green font-semibold hover:underline">Log in</Link>
          </p>
        </div>

        {/* Footer links */}
        <div className="absolute bottom-6 lg:bottom-10 flex justify-center lg:justify-between gap-6 lg:gap-0 w-full max-w-[400px]">
          <a href="#" className="text-neutral-500 hover:text-neutral-300 text-[9px] lg:text-[10.5px] font-bold tracking-wider uppercase transition-colors">TERMS OF SERVICE</a>
          <a href="#" className="text-neutral-500 hover:text-neutral-300 text-[9px] lg:text-[10.5px] font-bold tracking-wider uppercase transition-colors">PRIVACY POLICY</a>
          <a href="#" className="text-neutral-500 hover:text-neutral-300 text-[9px] lg:text-[10.5px] font-bold tracking-wider uppercase transition-colors">STATION HELP</a>
        </div>
      </div>
    </div>
  );
}
