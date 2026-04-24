import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom(), {
      animate: true,
      duration: 1.5
    });
  }, [center, map]);
  return null;
}

function CustomMapControls({ onLocate }) {
  const map = useMap();
  return (
    <div className="absolute bottom-8 right-6 flex flex-col gap-3 z-[1000]">
      <button onClick={(e) => { e.stopPropagation(); map.zoomIn(); }} className="w-12 h-12 bg-[#161616]/90 backdrop-blur-md border border-[#2c2c2c] rounded-xl flex items-center justify-center text-white hover:bg-[#222] transition-colors shadow-lg">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
      </button>
      <button onClick={(e) => { e.stopPropagation(); map.zoomOut(); }} className="w-12 h-12 bg-[#161616]/90 backdrop-blur-md border border-[#2c2c2c] rounded-xl flex items-center justify-center text-white hover:bg-[#222] transition-colors shadow-lg">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4"/></svg>
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); onLocate(); }}
        className="w-12 h-12 bg-[#161616]/90 backdrop-blur-md border border-[#2c2c2c] rounded-xl flex items-center justify-center text-white hover:bg-[#222] mt-2 transition-colors shadow-lg"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </button>
    </div>
  );
}

export default function LiveMap() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ lat: 37.7749, lng: -122.4194 }); // Default SF
  const [selectedStation, setSelectedStation] = useState(null);
  const navigate = useNavigate();
  
  const API_KEYS = [
    'b506fd81-d7b5-463d-a901-62b5f5c35b42',
    'de24e0dc-a164-4af7-8cc0-80aaa394b74d',
    '65419a05-816b-4fff-97e8-b42c3a7a97f2',
    'cd054356-79e3-4e7d-a1ac-8f2f86e5bf0e',
    '96c22f97-d9b2-4ce6-adf4-2d33376f3c9b',
    'f19c959c-9083-4e91-96cc-849e939eecff' // original key as final fallback
  ];

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
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchStations = async () => {
      setLoading(true);
      let success = false;
      
      for (const key of API_KEYS) {
        try {
          const res = await fetch(`https://api.openchargemap.io/v3/poi?key=${key}&latitude=${location.lat}&longitude=${location.lng}&distance=30&distanceunit=KM&maxresults=30`);
          if (!res.ok) {
            console.warn(`API fetch failed with key ${key}, status: ${res.status}`);
            continue;
          }
          const data = await res.json();
          setStations(data);
          success = true;
          break; // Stop trying keys if successful
        } catch (err) {
          console.error(`API Fetch Error with key ${key}:`, err);
        }
      }
      
      if (!success) {
        console.error("All API keys failed to fetch stations.");
      }
      
      setLoading(false);
    };
    fetchStations();
  }, [location]);

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
        <div className="flex-1 relative overflow-hidden bg-[#0a0f0d]">
          <MapContainer 
            center={[location.lat, location.lng]} 
            zoom={12} 
            zoomControl={false}
            className="w-full h-full z-0"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap &copy; CARTO'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <MapUpdater center={[location.lat, location.lng]} />

            {/* User Center Pin */}
            <Marker 
              position={[location.lat, location.lng]} 
              icon={L.divIcon({
                className: 'bg-transparent border-none',
                html: `
                  <div class="flex flex-col items-center" style="margin-left: -50%;">
                    <div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-pulse"></div>
                    <div class="text-blue-200 text-[8px] font-bold mt-1 uppercase tracking-widest bg-black/50 px-1 rounded">You</div>
                  </div>
                `,
                iconSize: [16, 24],
                iconAnchor: [8, 12]
              })}
            />

            {/* Dynamic Map Pins */}
            {!loading && stations.map((station, index) => {
              const isOperational = station.StatusType?.IsOperational !== false;
              const power = getPower(station.Connections);
              const lat = station.AddressInfo.Latitude;
              const lng = station.AddressInfo.Longitude;

              return (
                <Marker
                  key={station.ID || index}
                  position={[lat, lng]}
                  icon={L.divIcon({
                    className: 'bg-transparent border-none',
                    html: `
                      <div class="flex flex-col items-center group transition-transform ${!isOperational ? 'opacity-60 grayscale' : ''}" style="width: max-content; margin-left: -50%;">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center mb-1 border-2 ${isOperational ? 'bg-volt-green border-volt-green shadow-[0_0_20px_rgba(204,230,0,0.4)]' : 'bg-[#111] border-neutral-500'}">
                          <svg class="w-4 h-4 ${isOperational ? 'text-black' : 'text-neutral-500'}" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                          </svg>
                        </div>
                        <div class="bg-[#111] border text-[9px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${isOperational ? 'border-volt-green text-volt-green' : 'border-[#333] text-neutral-500'}">
                          ${power}kW • ${isOperational ? 'FREE' : 'OFFLINE'}
                        </div>
                      </div>
                    `,
                    iconSize: [32, 56],
                    iconAnchor: [16, 56]
                  })}
                  eventHandlers={{
                    click: () => {
                      setSelectedStation(station);
                    },
                  }}
                />
              );
            })}

            {/* Custom Map Controls */}
            <CustomMapControls onLocate={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
                );
              }
            }} />
          </MapContainer>

          {/* Left Floating Panel (Nearby Stations) */}
          <div className="absolute top-6 left-6 md:w-[360px] w-full px-6 md:px-0 flex flex-col gap-4 z-[1000] h-[calc(100%-48px)] pointer-events-none">
            
            <div className="bg-[#161616]/95 backdrop-blur-xl border border-[#2c2c2c] rounded-2xl p-5 shadow-2xl flex-1 flex flex-col overflow-hidden pointer-events-auto">
              <div className="flex justify-between items-center mb-5 shrink-0">
                <h3 className="text-white font-semibold text-lg">Nearby Stations</h3>
              </div>

              {/* Filters */}
              <div className="flex gap-3 mb-5 shrink-0">
                <button className="bg-volt-green text-black px-4 py-2 rounded-full text-[10px] font-bold tracking-wide flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 bg-black rounded-full"></span> AVAILABLE NOW
                </button>
                <button className="bg-[#222] text-neutral-400 hover:text-white px-4 py-2 rounded-full text-[10px] font-bold tracking-wide flex items-center gap-1.5 transition-colors border border-[#333]">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  FAST CHARGE
                </button>
              </div>

              <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-4">
                {loading ? (
                  <div className="text-center text-neutral-500 text-sm mt-10">Loading live data...</div>
                ) : stations.length === 0 ? (
                  <div className="text-center text-neutral-500 text-sm mt-10">No stations found nearby.</div>
                ) : (
                  stations.map((station, i) => {
                    const isOp = station.StatusType?.IsOperational !== false;
                    const power = getPower(station.Connections);
                    
                    return (
                      <div 
                        key={station.ID || i} 
                        onClick={() => setSelectedStation(station)} 
                        className={`bg-[#1c1c1c] border border-[#2c2c2c] rounded-xl p-4 transition-colors cursor-pointer group ${isOp ? 'hover:border-volt-green/50 hover:bg-[#1c2c20]' : 'opacity-60'} ${selectedStation?.ID === station.ID ? 'border-volt-green/50 bg-[#1c2c20]' : ''}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className={`text-[15px] font-bold truncate pr-2 ${isOp ? 'text-white group-hover:text-volt-green transition-colors' : 'text-neutral-400'} ${selectedStation?.ID === station.ID ? 'text-volt-green' : ''}`}>
                            {station.AddressInfo.Title}
                          </h4>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase flex items-center gap-1 shrink-0 ${isOp ? 'bg-[#333] text-neutral-300' : 'bg-[#333] text-neutral-500'}`}>
                            {isOp && power >= 150 ? 'DC FAST' : isOp ? 'LEVEL 2' : 'OFFLINE'}
                          </span>
                        </div>
                        <p className="text-neutral-400 text-[10px] font-bold tracking-widest uppercase mb-3 truncate">
                          {station.AddressInfo.AddressLine1}
                        </p>
                        
                        <div className="flex items-center gap-6 mt-1">
                          <div className="flex items-center gap-1.5 text-volt-green">
                             <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                             <span className="font-bold text-[15px]">{power} <span className="text-[11px] text-neutral-400 font-medium">kW</span></span>
                          </div>
                          <div className="flex items-center gap-1.5 text-neutral-300">
                             <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/></svg>
                             <span className="text-[13px]">Wait: <span className="text-volt-green font-medium">0 mins</span></span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-[#333] pt-3">
                          <span className="text-neutral-400 text-[10px] font-bold tracking-widest uppercase">
                            {station.Connections?.length || 0}/12 PLUGS OPEN
                          </span>
                          <svg className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>

          {/* Selected Station Overlay */}
          {selectedStation && (
            <div className="absolute bottom-8 right-24 w-[360px] bg-[#161616]/95 backdrop-blur-xl border border-[#2c2c2c] rounded-2xl p-5 shadow-2xl z-[1000] flex flex-col gap-4 pointer-events-auto animate-in slide-in-from-bottom-4 duration-200">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#222] border border-[#333] flex items-center justify-center shrink-0">
                  <svg className="w-7 h-7 text-volt-green" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                  </svg>
                </div>
                <div className="flex-1 pr-4 pt-1">
                  <h3 className="text-white font-bold text-[17px] leading-tight mb-1">{selectedStation.AddressInfo.Title}</h3>
                  <p className="text-volt-green text-[9px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-volt-green rounded-full shadow-[0_0_8px_rgba(204,230,0,0.8)]"></span>
                    {selectedStation.StatusType?.IsOperational !== false ? 'ULTRA-FAST RELIABLE PARTNER' : 'CURRENTLY OFFLINE'}
                  </p>
                </div>
                <button 
                  className="text-neutral-500 hover:text-white absolute top-4 right-4"
                  onClick={() => setSelectedStation(null)}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-1">
                <div className="bg-[#1c1c1c] border border-[#2c2c2c] rounded-xl p-3 flex flex-col items-center justify-center">
                  <span className="text-neutral-500 text-[9px] font-bold tracking-widest uppercase mb-1">POWER</span>
                  <span className="text-volt-green font-bold text-[15px]">{getPower(selectedStation.Connections)}kW</span>
                </div>
                <div className="bg-[#1c1c1c] border border-[#2c2c2c] rounded-xl p-3 flex flex-col items-center justify-center">
                  <span className="text-neutral-500 text-[9px] font-bold tracking-widest uppercase mb-1">PLUGS</span>
                  <span className="text-white font-bold text-[15px]">{selectedStation.Connections?.length || 0}/12</span>
                </div>
                <div className="bg-[#1c1c1c] border border-[#2c2c2c] rounded-xl p-3 flex flex-col items-center justify-center">
                  <span className="text-neutral-500 text-[9px] font-bold tracking-widest uppercase mb-1">PRICE</span>
                  <span className="text-white font-bold text-[15px]">{selectedStation.UsageCost || '$0.42'}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/station')}
                className="w-full bg-volt-green hover:bg-[#b3cc00] text-black font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2 shadow-[0_4px_20px_rgba(204,230,0,0.2)]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                START ROUTE
              </button>
            </div>
          )}

        </div>
      </div>
      
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
        .leaflet-container {
          background: #0a0f0d;
        }
        .leaflet-control-attribution {
          background: rgba(0,0,0,0.5) !important;
          color: #888 !important;
        }
        .leaflet-control-attribution a {
          color: #aaa !important;
        }
      `}} />
    </div>
  );
}
