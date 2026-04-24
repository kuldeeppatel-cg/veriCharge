import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function LiveMap() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ lat: 37.7749, lng: -122.4194 }); // Default SF
  const API_KEY = 'f19c959c-9083-4e91-96cc-849e939eecff';

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Location error:", error);
          // Fallback triggers fetch via the other useEffect anyway
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchStations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.openchargemap.io/v3/poi?key=${API_KEY}&latitude=${location.lat}&longitude=${location.lng}&distance=30&distanceunit=KM&maxresults=30`);
        const data = await res.json();
        setStations(data);
      } catch (err) {
        console.error("API Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, [location]);

  // Calculate relative map position based on lat/lng difference from center
  const getPinStyle = (stationLat, stationLng) => {
    const latDiff = stationLat - location.lat;
    const lngDiff = stationLng - location.lng;
    
    // Scale approx 0.27 degrees (30km) to 40% of the screen (from center 50%)
    const top = 50 - (latDiff * 150);
    const left = 50 + (lngDiff * 150);
    
    return {
      top: `${Math.max(10, Math.min(90, top))}%`,
      left: `${Math.max(10, Math.min(90, left))}%`
    };
  };

  const getPower = (connections) => {
    if (!connections || connections.length === 0) return 0;
    const max = Math.max(...connections.map(c => c.PowerKW || 0));
    return max > 0 ? max : 'Unknown ';
  };

  return (
    <div className="flex h-screen w-screen bg-[#0a0f0d] font-inter text-white overflow-hidden">
      
      <Sidebar activePage="map" />

      <div className="flex flex-col flex-1 h-screen relative">
        <Header />

        {/* Map Container */}
        <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-[#1b2b23] via-[#3a5848] to-[#18261e]">
          
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#ffffff33_1px,transparent_1px),linear-gradient(90deg,#ffffff33_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          {/* User Center Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-pulse"></div>
            <div className="text-blue-200 text-[8px] font-bold mt-1 uppercase tracking-widest bg-black/50 px-1 rounded">You</div>
          </div>

          {/* Dynamic Map Pins */}
          {!loading && stations.map((station, index) => {
            const isOperational = station.StatusType?.IsOperational !== false;
            const power = getPower(station.Connections);
            
            return (
              <Link 
                key={station.ID || index} 
                to="/station" 
                className={`absolute flex flex-col items-center group cursor-pointer hover:-translate-y-1 transition-transform z-20 ${!isOperational ? 'opacity-60 grayscale' : ''}`}
                style={getPinStyle(station.AddressInfo.Latitude, station.AddressInfo.Longitude)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 border-2 ${isOperational ? 'bg-volt-green border-volt-green shadow-[0_0_20px_rgba(204,230,0,0.4)]' : 'bg-[#111] border-neutral-500'}`}>
                  <svg className={`w-4 h-4 ${isOperational ? 'text-black' : 'text-neutral-500'}`} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <div className={`bg-[#111] border text-[9px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${isOperational ? 'border-volt-green text-volt-green' : 'border-[#333] text-neutral-500'}`}>
                  {power}kW • {isOperational ? 'FREE' : 'OFFLINE'}
                </div>
              </Link>
            );
          })}

          {/* Right Floating Panel (Nearby Stations & Range) */}
          <div className="absolute top-6 right-6 w-[360px] flex flex-col gap-4 z-30 h-[calc(100%-120px)]">
            
            <div className="bg-[#161616]/95 backdrop-blur-xl border border-[#2c2c2c] rounded-2xl p-5 shadow-2xl flex-1 flex flex-col overflow-hidden">
              <div className="flex justify-between items-center mb-5 shrink-0">
                <h3 className="text-white font-semibold">Nearby Stations</h3>
                <span className="text-neutral-500 text-[10px] font-bold tracking-widest uppercase">
                  {loading ? 'SEARCHING...' : `${stations.length} FOUND`}
                </span>
              </div>

              <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-4">
                {loading ? (
                  <div className="text-center text-neutral-500 text-sm mt-10">Loading live data...</div>
                ) : stations.length === 0 ? (
                  <div className="text-center text-neutral-500 text-sm mt-10">No stations found nearby.</div>
                ) : (
                  stations.map((station, i) => {
                    const isOp = station.StatusType?.IsOperational !== false;
                    const power = getPower(station.Connections);
                    
                    return (
                      <Link key={station.ID || i} to="/station" className={`bg-[#1c1c1c] border border-[#2c2c2c] rounded-xl p-4 transition-colors cursor-pointer group ${isOp ? 'hover:border-volt-green/50 hover:bg-[#1c2c20]' : 'opacity-60'}`}>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`text-sm font-bold truncate pr-2 ${isOp ? 'text-white group-hover:text-volt-green transition-colors' : 'text-neutral-400'}`}>
                            {station.AddressInfo.Title}
                          </h4>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase flex items-center gap-1 shrink-0 ${isOp ? 'bg-volt-green text-black' : 'bg-[#333] text-neutral-400'}`}>
                            {isOp && <span className="w-1.5 h-1.5 bg-black rounded-full"></span>}
                            {isOp ? 'AVAILABLE' : 'OFFLINE'}
                          </span>
                        </div>
                        <p className="text-neutral-400 text-[11px] mb-3">
                          {station.AddressInfo.Distance ? station.AddressInfo.Distance.toFixed(1) : '?'} km away • {power}kW
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className={`w-3 h-3 rounded-full ${isOp ? 'bg-volt-green' : 'bg-[#333]'}`}></div>
                            <div className={`w-3 h-3 rounded-full ${isOp ? 'bg-volt-green' : 'bg-[#333]'}`}></div>
                            <div className="w-3 h-3 rounded-full bg-[#222]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#222]"></div>
                          </div>
                          <span className="text-neutral-500 text-[10px] truncate">
                            {station.AddressInfo.AddressLine1}
                          </span>
                        </div>
                      </Link>
                    )
                  })
                )}
              </div>
            </div>

            {/* Estimated Range Panel */}
            <div className="bg-[#161616]/95 backdrop-blur-xl border border-[#2c2c2c] rounded-2xl p-5 shadow-2xl flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90 absolute" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#222" strokeWidth="12" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#cce600" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="60" strokeLinecap="round" />
                  </svg>
                  <span className="text-[10px] font-bold text-white z-10">76%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-neutral-500 text-[9px] font-bold tracking-widest uppercase mb-0.5">ESTIMATED RANGE</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white leading-none">242</span>
                    <span className="text-xs font-semibold text-neutral-400">MILES</span>
                  </div>
                </div>
              </div>
              <button className="w-10 h-10 rounded-xl bg-[#222] hover:bg-[#333] flex items-center justify-center text-neutral-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </button>
            </div>
          </div>

          {/* Bottom Filter Pills */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center bg-[#161616]/90 backdrop-blur-md rounded-full p-1 border border-[#2c2c2c] z-20">
            <button className="bg-volt-green text-black px-6 py-3 rounded-full text-[11px] font-bold tracking-wide shadow-lg">
              VERIFIED ONLY
            </button>
            <button className="text-neutral-400 hover:text-white px-6 py-3 rounded-full text-[11px] font-bold tracking-wide transition-colors">
              FAST CHARGE (150kW+)
            </button>
            <button className="text-neutral-400 hover:text-white px-6 py-3 rounded-full text-[11px] font-bold tracking-wide transition-colors">
              AMENITY FILTERS
            </button>
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-8 right-6 flex flex-col gap-3 z-20">
            <button className="w-12 h-12 bg-[#161616]/90 backdrop-blur-md border border-[#2c2c2c] rounded-xl flex items-center justify-center text-white hover:bg-[#222] transition-colors shadow-lg">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
            </button>
            <button className="w-12 h-12 bg-[#161616]/90 backdrop-blur-md border border-[#2c2c2c] rounded-xl flex items-center justify-center text-white hover:bg-[#222] transition-colors shadow-lg">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4"/></svg>
            </button>
            <button 
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
                  );
                }
              }}
              className="w-12 h-12 bg-[#161616]/90 backdrop-blur-md border border-[#2c2c2c] rounded-xl flex items-center justify-center text-white hover:bg-[#222] mt-2 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </button>
          </div>

        </div>
      </div>
      
      {/* Scrollbar hide styling */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
      `}} />
    </div>
  );
}
