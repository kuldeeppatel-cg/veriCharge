import { Link, useLocation } from 'react-router-dom';

export default function MobileNav() {
  const location = useLocation();
  const activePage = location.pathname.substring(1) || 'dashboard';

  if (activePage === 'login' || activePage === 'signup') return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#161616]/95 backdrop-blur-xl border-t border-[#2c2c2c] pb-safe z-[5000] flex justify-around items-center px-2 py-3 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <Link to="/dashboard" className={`flex flex-col items-center gap-1.5 w-16 ${activePage === 'dashboard' ? 'text-volt-green' : 'text-neutral-500 hover:text-white transition-colors'}`}>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <span className="text-[9px] font-bold tracking-wider uppercase">Map</span>
      </Link>
      
      <Link to="/station" className={`flex flex-col items-center gap-1.5 w-16 ${activePage === 'station' ? 'text-volt-green' : 'text-neutral-500 hover:text-white transition-colors'}`}>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <span className="text-[9px] font-bold tracking-wider uppercase">Station</span>
      </Link>

      <Link to="/reliability" className={`flex flex-col items-center gap-1.5 w-16 ${activePage === 'reliability' ? 'text-volt-green' : 'text-neutral-500 hover:text-white transition-colors'}`}>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-[9px] font-bold tracking-wider uppercase">Network</span>
      </Link>

      <Link to="/history" className={`flex flex-col items-center gap-1.5 w-16 ${activePage === 'history' ? 'text-volt-green' : 'text-neutral-500 hover:text-white transition-colors'}`}>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-[9px] font-bold tracking-wider uppercase">History</span>
      </Link>
    </div>
  );
}
