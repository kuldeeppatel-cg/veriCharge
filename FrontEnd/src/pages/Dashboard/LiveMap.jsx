import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Map, { Marker, Source, Layer, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

function TurnIcon({ modifier }) {
  const mod = modifier ? modifier.toLowerCase() : '';
  const isLeft = mod.includes('left');
  const isRight = mod.includes('right');
  const isUturn = mod.includes('uturn');
  
  if (isUturn) return <svg className="w-6 h-6 text-volt-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10 9l-6 6 6 6"/><path strokeLinecap="round" strokeLinejoin="round" d="M4 15h11a4 4 0 004-4V4"/></svg>;
  if (isLeft) return <svg className="w-6 h-6 text-volt-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l-4-4 4-4"/><path strokeLinecap="round" strokeLinejoin="round" d="M5 10h11a4 4 0 014 4v6"/></svg>;
  if (isRight) return <svg className="w-6 h-6 text-volt-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 14l4-4-4-4"/><path strokeLinecap="round" strokeLinejoin="round" d="M19 10H8a4 4 0 00-4 4v6"/></svg>;
  
  // straight
  return <svg className="w-6 h-6 text-volt-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5"/><path strokeLinecap="round" strokeLinejoin="round" d="M5 12l7-7 7 7"/></svg>;
}

export default function LiveMap() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null); 
  const [heading, setHeading] = useState(0);
  const [selectedStation, setSelectedStation] = useState(null);
  const [routeCoords, setRouteCoords] = useState(null);
  
  const [isRouting, setIsRouting] = useState(false);
  const [isAutoFollow, setIsAutoFollow] = useState(true); 
  const [navInstruction, setNavInstruction] = useState(null);
  
  const [hasFetchedStations, setHasFetchedStations] = useState(false);
  const locationRef = useRef(null);
  const navigate = useNavigate();

  const [viewState, setViewState] = useState({
    longitude: -122.4194,
    latitude: 37.7749,
    zoom: 12,
    pitch: 0,
    bearing: 0
  });

  const isRoutingRef = useRef(isRouting);
  const isAutoFollowRef = useRef(isAutoFollow);
  useEffect(() => { isRoutingRef.current = isRouting; }, [isRouting]);
  useEffect(() => { isAutoFollowRef.current = isAutoFollow; }, [isAutoFollow]);
  
  const API_KEYS = [
    'b506fd81-d7b5-463d-a901-62b5f5c35b42',
    'de24e0dc-a164-4af7-8cc0-80aaa394b74d',
    '65419a05-816b-4fff-97e8-b42c3a7a97f2',
    'cd054356-79e3-4e7d-a1ac-8f2f86e5bf0e',
    '96c22f97-d9b2-4ce6-adf4-2d33376f3c9b',
    'f19c959c-9083-4e91-96cc-849e939eecff' 
  ];

  // Watch user location and heading
  useEffect(() => {
    if (!navigator.geolocation) {
       setLocation({ lat: 37.7749, lng: -122.4194 });
       return;
    }

    let lastLat = null;
    let lastLng = null;

    const getDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371e3;
      const dLat = (lat2 - lat1) * Math.PI/180;
      const dLon = (lon2 - lon1) * Math.PI/180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);
      return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
    };

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLat = position.coords.latitude;
        const newLng = position.coords.longitude;
        
        let distance = 0;
        if (lastLat !== null && lastLng !== null) {
           distance = getDistance(lastLat, lastLng, newLat, newLng);
        }

        if (lastLat === null || distance > 3) {
          setLocation({ lat: newLat, lng: newLng });
          locationRef.current = { lat: newLat, lng: newLng };

          let currentHeading = 0;
          if (position.coords.heading !== null && !isNaN(position.coords.heading)) {
            currentHeading = position.coords.heading;
          } else if (lastLat !== null && lastLng !== null) {
            const startLat = lastLat * Math.PI / 180;
            const startLng = lastLng * Math.PI / 180;
            const destLat = newLat * Math.PI / 180;
            const destLng = newLng * Math.PI / 180;
            const y = Math.sin(destLng - startLng) * Math.cos(destLat);
            const x = Math.cos(startLat) * Math.sin(destLat) -
                      Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
            let brng = Math.atan2(y, x);
            brng = brng * 180 / Math.PI;
            currentHeading = (brng + 360) % 360;
          }
          
          setHeading(currentHeading);

          if (isAutoFollowRef.current) {
             setViewState(prev => ({
                ...prev,
                longitude: newLng,
                latitude: newLat,
                zoom: isRoutingRef.current ? 18 : 14,
                pitch: isRoutingRef.current ? 65 : 0,
                bearing: isRoutingRef.current ? currentHeading : 0,
                transitionDuration: 1000
             }));
          }

          lastLat = newLat;
          lastLng = newLng;
        }
      },
      (error) => {
        console.error("Location error:", error);
        if (!locationRef.current) {
          setLocation({ lat: 37.7749, lng: -122.4194 });
        }
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (!location || hasFetchedStations) return;

    const fetchStations = async () => {
      setLoading(true);
      setHasFetchedStations(true);
      
      // Setup initial view
      setViewState(prev => ({
         ...prev,
         longitude: location.lng,
         latitude: location.lat,
         zoom: 14,
         transitionDuration: 2000
      }));

      let success = false;
      for (const key of API_KEYS) {
        try {
          const res = await fetch(`https://api.openchargemap.io/v3/poi?key=${key}&latitude=${location.lat}&longitude=${location.lng}&distance=30&distanceunit=KM&maxresults=30`);
          if (!res.ok) continue;
          const data = await res.json();
          setStations(data);
          success = true;
          break;
        } catch (err) {
          console.error(`API Fetch Error with key ${key}:`, err);
        }
      }
      
      setLoading(false);
    };
    
    fetchStations();
  }, [location, hasFetchedStations]);

  useEffect(() => {
    if (!selectedStation) {
      setRouteCoords(null);
      setIsRouting(false);
      setNavInstruction(null);
      setIsAutoFollow(true);
      if (location) {
        setViewState(prev => ({
          ...prev,
          pitch: 0,
          bearing: 0,
          transitionDuration: 1000
        }));
      }
    }
  }, [selectedStation, location]);

  const handleStartRoute = async () => {
    if (!selectedStation || !location) return;
    
    setIsRouting(true);
    setIsAutoFollow(true);
    
    setViewState(prev => ({
       ...prev,
       zoom: 18,
       pitch: 65,
       bearing: heading,
       transitionDuration: 2000
    }));
    
    try {
      const startLng = location.lng;
      const startLat = location.lat;
      const endLng = selectedStation.AddressInfo.Longitude;
      const endLat = selectedStation.AddressInfo.Latitude;
      
      const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson&steps=true`);
      const data = await res.json();
      
      if (data.routes && data.routes.length > 0) {
        // GeoJSON uses [lng, lat], which MapLibre perfectly accepts natively!
        setRouteCoords(data.routes[0].geometry.coordinates);

        const steps = data.routes[0].legs[0].steps;
        if (steps && steps.length > 1) {
          const nextStep = steps[1]; 
          setNavInstruction({
            modifier: nextStep.maneuver.modifier || 'straight',
            name: nextStep.name,
            distance: nextStep.distance
          });
        } else {
          setNavInstruction({ modifier: 'straight', name: 'Destination', distance: data.routes[0].distance });
        }
      }
    } catch (err) {
      console.error("Failed to fetch route:", err);
      setIsRouting(false);
    }
  };

  const getPower = (connections) => {
    if (!connections || connections.length === 0) return 0;
    const max = Math.max(...connections.map(c => c.PowerKW || 0));
    return max > 0 ? max : 'Unknown ';
  };

  if (!location) {
    return (
      <div className="flex h-screen w-screen bg-[#0a0f0d] font-inter text-white overflow-hidden">
        <Sidebar activePage="map" />
        <div className="flex flex-col flex-1 h-screen relative">
          <Header />
          <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-[#1b2b23] via-[#0a0f0d] to-[#0a0f0d]">
             <div className="relative w-24 h-24 flex items-center justify-center mb-6">
                <div className="absolute inset-0 border-4 border-[#222] rounded-full"></div>
                <div className="absolute inset-0 border-4 border-volt-green rounded-full border-t-transparent animate-spin"></div>
                <svg className="w-8 h-8 text-volt-green animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
             </div>
             <h2 className="text-2xl font-bold tracking-widest text-white mb-2">AQUIRING SIGNAL</h2>
             <p className="text-neutral-500 text-sm font-medium tracking-wide">Waiting for precise GPS location...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-[#0a0f0d] font-inter text-white overflow-hidden">
      
      <Sidebar activePage="map" />

      <div className="flex flex-col flex-1 h-screen relative">
        <Header />

        <div className="flex-1 relative overflow-hidden bg-[#0a0f0d]">
          {/* MapLibre WebGL Engine */}
          <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            onDragStart={() => setIsAutoFollow(false)}
            mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
            style={{ width: '100%', height: '100%' }}
            pitchWithGestures={true}
            dragRotate={true}
          >
            {/* Native 3D Controls (Compass & Zoom) */}
            <NavigationControl position="bottom-right" style={{ marginRight: 24, marginBottom: 90 }} showCompass={true} showZoom={true} />

            {/* User Navigation Arrow (Lies flat on ground in 3D, rotates perfectly) */}
            <Marker 
              longitude={location.lng} 
              latitude={location.lat} 
              anchor="center"
              pitchAlignment={isRouting ? "map" : "viewport"}
              rotationAlignment={isRouting ? "map" : "viewport"}
              rotation={isRouting ? heading : 0}
            >
              {isRouting ? (
                <svg width="64" height="64" viewBox="0 0 48 48" fill="none" style={{ filter: 'drop-shadow(0 0 15px rgba(204,230,0,0.8))' }}>
                  <path d="M24 4L42 42L24 34L6 42L24 4Z" fill="#cce600" stroke="#111" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 bg-blue-500 rounded-full border-[3px] border-white shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-pulse"></div>
                  <div className="text-blue-200 text-[9px] font-bold mt-1 uppercase tracking-widest bg-black/70 px-1.5 py-0.5 rounded">You</div>
                </div>
              )}
            </Marker>

            {/* Station Markers (Billboard style - always upright) */}
            {!loading && stations.map((station, index) => {
              const isOperational = station.StatusType?.IsOperational !== false;
              const power = getPower(station.Connections);
              const lng = station.AddressInfo.Longitude;
              const lat = station.AddressInfo.Latitude;

              return (
                <Marker
                  key={station.ID || index}
                  longitude={lng}
                  latitude={lat}
                  anchor="bottom"
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setSelectedStation(station);
                  }}
                  style={{ zIndex: selectedStation?.ID === station.ID ? 10 : 1 }}
                >
                  <div className={`flex flex-col items-center group cursor-pointer hover:scale-110 transition-transform origin-bottom ${selectedStation?.ID === station.ID ? 'scale-110' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 border-2 ${isOperational ? 'bg-volt-green border-volt-green shadow-[0_0_20px_rgba(204,230,0,0.4)]' : 'bg-[#111] border-neutral-500'}`}>
                      <svg className={`w-4 h-4 ${isOperational ? 'text-black' : 'text-neutral-500'}`} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                    </div>
                    <div className={`bg-[#111] border text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${isOperational ? 'border-volt-green text-volt-green' : 'border-[#333] text-neutral-500'} shadow-lg`}>
                      {power}kW • {isOperational ? 'FREE' : 'OFFLINE'}
                    </div>
                  </div>
                </Marker>
              );
            })}

            {/* Glowing 3D Route Display */}
            {routeCoords && (
              <Source 
                id="route-source" 
                type="geojson" 
                data={{
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'LineString',
                    coordinates: routeCoords
                  }
                }}
              >
                <Layer 
                  id="route-glow" 
                  type="line" 
                  layout={{ 'line-join': 'round', 'line-cap': 'round' }}
                  paint={{ 'line-color': '#cce600', 'line-width': 12, 'line-opacity': 0.3, 'line-blur': 4 }} 
                />
                <Layer 
                  id="route-line" 
                  type="line" 
                  layout={{ 'line-join': 'round', 'line-cap': 'round' }}
                  paint={{ 'line-color': '#cce600', 'line-width': 5 }} 
                />
              </Source>
            )}
          </Map>

          {/* Turn-by-Turn Navigation Banner */}
          {isRouting && navInstruction && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#161616]/95 backdrop-blur-xl border border-[#2c2c2c] rounded-2xl p-4 shadow-2xl z-[1000] flex items-center gap-4 animate-in slide-in-from-top-4 duration-300 min-w-[300px]">
              <div className="w-12 h-12 rounded-xl bg-[#222] border border-[#333] flex items-center justify-center shrink-0">
                <TurnIcon modifier={navInstruction.modifier} />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl leading-none mb-1">{navInstruction.distance.toFixed(0)}m</span>
                <span className="text-neutral-400 text-sm font-medium">
                  {navInstruction.modifier.replace(/-/g, ' ').toUpperCase()} on <span className="text-volt-green font-bold">{navInstruction.name || 'Unknown Road'}</span>
                </span>
              </div>
            </div>
          )}

          {/* RESUME NAVIGATION BUTTON */}
          {isRouting && !isAutoFollow && (
            <button 
              onClick={() => {
                setIsAutoFollow(true);
                if (location) {
                  setViewState(prev => ({
                    ...prev,
                    longitude: location.lng,
                    latitude: location.lat,
                    zoom: 18,
                    pitch: 65,
                    bearing: heading,
                    transitionDuration: 1000
                  }));
                }
              }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-volt-green text-black px-6 py-3 rounded-full font-bold shadow-[0_10px_30px_rgba(204,230,0,0.3)] z-[1000] flex items-center gap-2 hover:bg-[#b3cc00] transition-transform hover:scale-105 active:scale-95 animate-in slide-in-from-bottom-8 duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              RESUME
            </button>
          )}

          {/* Locate Me Bottom Right */}
          <div className="absolute bottom-8 right-6 z-[1000]">
            <button 
              onClick={() => { 
                setIsAutoFollow(true);
                if (location) {
                  setViewState(prev => ({
                    ...prev,
                    longitude: location.lng,
                    latitude: location.lat,
                    zoom: isRouting ? 18 : 14,
                    pitch: isRouting ? 65 : 0,
                    bearing: isRouting ? heading : 0,
                    transitionDuration: 1000
                  }));
                }
              }}
              title="Locate Me"
              className="w-10 h-10 bg-[#292929]/90 backdrop-blur-md border border-[#444] rounded flex items-center justify-center text-white hover:bg-[#333] transition-colors shadow-lg"
            >
              <svg className="w-5 h-5 text-volt-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </button>
          </div>

          {/* Left Floating Panel (Nearby Stations) */}
          {!isRouting && (
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
          )}

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
                onClick={handleStartRoute}
                disabled={isRouting}
                className="w-full bg-volt-green hover:bg-[#b3cc00] text-black font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2 shadow-[0_4px_20px_rgba(204,230,0,0.2)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isRouting && !routeCoords ? (
                   <span className="animate-pulse">CALCULATING ROUTE...</span>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                    {routeCoords ? 'NAVIGATING...' : 'START ROUTE'}
                  </>
                )}
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
        .maplibregl-ctrl-group {
          background-color: rgba(41, 41, 41, 0.9) !important;
          backdrop-filter: blur(8px);
          border: 1px solid #444;
        }
        .maplibregl-ctrl-group button {
          border-bottom: 1px solid #444 !important;
        }
        .maplibregl-ctrl-group button span {
          filter: invert(1);
        }
      `}} />
    </div>
  );
}
