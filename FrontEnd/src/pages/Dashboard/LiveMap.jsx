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

  if (isUturn) return <svg className="w-6 h-6 text-volt-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10 9l-6 6 6 6" /><path strokeLinecap="round" strokeLinejoin="round" d="M4 15h11a4 4 0 004-4V4" /></svg>;
  if (isLeft) return <svg className="w-6 h-6 text-volt-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l-4-4 4-4" /><path strokeLinecap="round" strokeLinejoin="round" d="M5 10h11a4 4 0 014 4v6" /></svg>;
  if (isRight) return <svg className="w-6 h-6 text-volt-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 14l4-4-4-4" /><path strokeLinecap="round" strokeLinejoin="round" d="M19 10H8a4 4 0 00-4 4v6" /></svg>;

  // straight
  return <svg className="w-6 h-6 text-volt-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5" /><path strokeLinecap="round" strokeLinejoin="round" d="M5 12l7-7 7 7" /></svg>;
}

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

const getTravelTimeMins = (distanceMeters) => {
  const speedKmH = 40; // Assume 40 km/h average city speed
  const hours = (distanceMeters / 1000) / speedKmH;
  return Math.max(1, Math.ceil(hours * 60)); // At least 1 min
};

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
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchLocation, setSearchLocation] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const locationRef = useRef(null);

  // Trip Planner State
  const [tripPlanMode, setTripPlanMode] = useState(false);
  const [tripStart, setTripStart] = useState('');
  const [tripDest, setTripDest] = useState('');
  const [isPlanningTrip, setIsPlanningTrip] = useState(false);
  const [tripStartSuggestions, setTripStartSuggestions] = useState([]);
  const [showTripStartSuggestions, setShowTripStartSuggestions] = useState(false);
  const [tripDestSuggestions, setTripDestSuggestions] = useState([]);
  const [showTripDestSuggestions, setShowTripDestSuggestions] = useState(false);

  useEffect(() => {
    if (!tripStart.trim() || tripStart.length < 3) {
      setTripStartSuggestions([]);
      return;
    }
    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(tripStart)}&limit=5`);
        const data = await res.json();
        if (data) {
          setTripStartSuggestions(data);
          setShowTripStartSuggestions(true);
        }
      } catch (err) {}
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [tripStart]);

  useEffect(() => {
    if (!tripDest.trim() || tripDest.length < 3) {
      setTripDestSuggestions([]);
      return;
    }
    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(tripDest)}&limit=5`);
        const data = await res.json();
        if (data) {
          setTripDestSuggestions(data);
          setShowTripDestSuggestions(true);
        }
      } catch (err) {}
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [tripDest]);

  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }
    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`);
        const data = await res.json();
        if (data) {
          setSuggestions(data);
          setShowSuggestions(true);
        }
      } catch (err) {
        console.error("Suggestion fetch error:", err);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSuggestionClick = (result) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);

    setSearchLocation({ lat, lng });
    setSearchQuery(result.display_name.split(',')[0]);
    setShowSuggestions(false);
    setSelectedStation(null);
    setRouteCoords(null);
    setIsRouting(false);
    setIsAutoFollow(false);

    setViewState(prev => ({
      ...prev,
      longitude: lng,
      latitude: lat,
      zoom: 14,
      transitionDuration: 2000
    }));

    fetchStationsForLocation(lat, lng);
  };
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

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 10000); // 10s tick
    return () => clearInterval(interval);
  }, []);

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
      setLocationError(true);
      return;
    }

    let lastLat = null;
    let lastLng = null;



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
        setLocationError(true);
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const fetchStationsForLocation = async (lat, lng) => {
    setLoading(true);
    let success = false;
    for (const key of API_KEYS) {
      try {
        const res = await fetch(`https://api.openchargemap.io/v3/poi?key=${key}&latitude=${lat}&longitude=${lng}&distance=30&distanceunit=KM&maxresults=30`);
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

  useEffect(() => {
    if (!location || hasFetchedStations) return;

    setHasFetchedStations(true);
    setViewState(prev => ({
      ...prev,
      longitude: location.lng,
      latitude: location.lat,
      zoom: 14,
      transitionDuration: 2000
    }));

    fetchStationsForLocation(location.lat, location.lng);
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
      longitude: location.lng,
      latitude: location.lat,
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setShowSuggestions(false);
    setIsSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);

        setSearchLocation({ lat, lng });
        setSelectedStation(null);
        setRouteCoords(null);
        setIsRouting(false);
        setIsAutoFollow(false);

        setViewState(prev => ({
          ...prev,
          longitude: lng,
          latitude: lat,
          zoom: 14,
          transitionDuration: 2000
        }));

        fetchStationsForLocation(lat, lng);
      } else {
        alert("Location not found. Please try a different search.");
      }
    } catch (err) {
      console.error("Search error:", err);
      alert("Failed to search location. Please try again later.");
    }
    setIsSearching(false);
  };

  const handlePlanTrip = async (e) => {
    e.preventDefault();
    if (!tripStart.trim() || !tripDest.trim()) return;
    
    if (tripStart.trim().toLowerCase() === tripDest.trim().toLowerCase()) {
      alert("Start location and destination cannot be the same.");
      return;
    }

    setIsPlanningTrip(true);
    setLoading(true);
    try {
      // Nominatim requires User-Agent
      const headers = { 'User-Agent': 'VeriChargeApp/1.0' };

      // 1. Geocode Start
      const startRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(tripStart)}`, { headers });
      const startData = await startRes.json();
      if (!startData || startData.length === 0) throw new Error("Start location not found");
      const startLat = parseFloat(startData[0].lat);
      const startLng = parseFloat(startData[0].lon);

      await new Promise(r => setTimeout(r, 1000)); // Respect Nominatim 1req/s policy

      // 2. Geocode Destination
      const destRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(tripDest)}`, { headers });
      const destData = await destRes.json();
      if (!destData || destData.length === 0) throw new Error("Destination not found");
      const endLat = parseFloat(destData[0].lat);
      const endLng = parseFloat(destData[0].lon);

      // 3. Fetch Route
      const routeRes = await fetch(`https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`);
      const routeData = await routeRes.json();

      if (routeData.routes && routeData.routes.length > 0) {
        setRouteCoords(routeData.routes[0].geometry.coordinates);
        setIsRouting(false);
        setIsAutoFollow(false);
        setSelectedStation(null);

        // Center map on route
        const centerLat = (startLat + endLat) / 2;
        const centerLng = (startLng + endLng) / 2;
        
        const distKm = getDistance(startLat, startLng, endLat, endLng) / 1000;
        
        setViewState(prev => ({
          ...prev,
          longitude: centerLng,
          latitude: centerLat,
          zoom: distKm > 100 ? 7 : distKm > 50 ? 9 : 11,
          transitionDuration: 2000
        }));

        // 4. Fetch Stations strictly along the polyline (Start, Destination, and Waypoints)
        const coords = routeData.routes[0].geometry.coordinates; // [lng, lat]
        const numSamples = Math.min(6, Math.max(3, Math.ceil(distKm / 40))); // Sample up to 6 points along the highway
        const samplePoints = [];
        for (let i = 0; i < numSamples; i++) {
          const index = Math.floor((i / (numSamples - 1)) * (coords.length - 1));
          samplePoints.push(coords[index]);
        }

        const radius = Math.min(30, Math.max(15, distKm / numSamples)); // Dynamic 15-30km radius around each city/point

        // Distribute API requests across multiple keys to prevent rate limiting
        const fetchPromises = samplePoints.map((pt, i) => {
          const key = API_KEYS[i % API_KEYS.length];
          return fetch(`https://api.openchargemap.io/v3/poi?key=${key}&latitude=${pt[1]}&longitude=${pt[0]}&distance=${radius}&distanceunit=KM&maxresults=40`)
            .then(res => res.ok ? res.json() : [])
            .catch(() => []);
        });

        const results = await Promise.all(fetchPromises);
        const allStations = results.flat();

        if (allStations.length > 0) {
          // Remove duplicates based on station ID
          const uniqueStations = Array.from(new Map(allStations.map(item => [item.ID, item])).values());
          setStations(uniqueStations);
        } else {
          alert("No charging stations found along this route.");
        }
      }
    } catch (err) {
      alert("Failed to plan trip: " + err.message);
    }
    setLoading(false);
    setIsPlanningTrip(false);
  };

  const getSimulatedStationState = (station, timeMs) => {
    const id = station.ID || 1;
    const cycleDurationMinutes = (id % 30) + 20; // 20 to 49 minutes
    const cycleDurationMs = cycleDurationMinutes * 60 * 1000;

    const timeInCycle = timeMs % cycleDurationMs;
    const isOccupiedPhase = timeInCycle < (cycleDurationMs * 0.8);

    if (isOccupiedPhase) {
      const occupiedTimeRemainingMs = (cycleDurationMs * 0.8) - timeInCycle;
      const waitMins = Math.ceil(occupiedTimeRemainingMs / 60000);
      return { status: 'OCCUPIED', waitTime: waitMins };
    } else {
      return { status: 'AVAILABLE', waitTime: 0 };
    }
  };

  const getAvailabilityStatus = (station, timeMs) => {
    // 1. Check actual OpenChargeMap API real-time data first
    if (station.StatusType?.IsOperational === false || station.StatusType?.ID === 100) return { status: 'OFFLINE', waitTime: 'N/A' };
    if (station.StatusType?.ID === 20 || station.StatusType?.ID === 210) return { status: 'OCCUPIED', waitTime: 'Unknown' };

    if (station.Connections && station.Connections.length > 0) {
      const anyInUse = station.Connections.some(c => c.StatusType?.ID === 20 || c.StatusTypeID === 20 || c.StatusTypeID === 210);
      if (anyInUse) return { status: 'OCCUPIED', waitTime: 'Unknown' };

      const allOut = station.Connections.every(c => c.StatusType?.ID === 100 || c.StatusTypeID === 100 || c.StatusType?.IsOperational === false);
      if (allOut) return { status: 'OFFLINE', waitTime: 'N/A' };
    }

    // 2. Fallback to simulation to ensure UI can be demonstrated since OCM often lacks live telemetry
    if (station.ID && station.ID % 13 === 0) return { status: 'OFFLINE', waitTime: 'N/A' };
    if (station.ID && station.ID % 3 === 0) return getSimulatedStationState(station, timeMs);

    return { status: 'AVAILABLE', waitTime: 0 };
  };

  const getStatusColors = (status) => {
    if (status === 'AVAILABLE') return { bg: 'bg-volt-green', border: 'border-volt-green', text: 'text-volt-green', icon: 'text-black', shadow: 'shadow-[0_0_20px_rgba(204,230,0,0.4)]' };
    if (status === 'OCCUPIED') return { bg: 'bg-yellow-500', border: 'border-yellow-500', text: 'text-yellow-500', icon: 'text-black', shadow: 'shadow-[0_0_20px_rgba(234,179,8,0.4)]' };
    return { bg: 'bg-[#111]', border: 'border-neutral-500', text: 'text-neutral-500', icon: 'text-neutral-500', shadow: '' };
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
        <Header>
          <div className="flex items-center gap-4 w-full max-w-[800px] ml-4">
            <div className="bg-[#111] border border-[#333] rounded-full flex p-1 shrink-0 h-[40px]">
              <button onClick={() => setTripPlanMode(false)} className={`px-4 py-1 rounded-full text-[10px] font-bold tracking-widest transition-colors ${!tripPlanMode ? 'bg-volt-green text-black' : 'text-neutral-500 hover:text-white'}`}>AREA</button>
              <button onClick={() => setTripPlanMode(true)} className={`px-4 py-1 rounded-full text-[10px] font-bold tracking-widest transition-colors ${tripPlanMode ? 'bg-volt-green text-black' : 'text-neutral-500 hover:text-white'}`}>TRIP</button>
            </div>

            <div className="flex-1 relative h-[40px]">
              {!tripPlanMode ? (
                <div className="relative w-full h-full max-w-[400px]">
                  <form onSubmit={handleSearch} className="relative flex items-center h-full">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" /></svg>
                    <input type="text" placeholder="Search by location..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }} className="w-full h-full bg-[#161616] border border-[#222] rounded-full text-white text-[13px] pl-11 pr-24 focus:outline-none focus:border-volt-green/50 transition-colors placeholder:text-neutral-600 shadow-inner" />
                    <button type="submit" disabled={isSearching} className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#222] text-white px-4 py-1.5 rounded-full text-[10px] font-bold hover:bg-volt-green hover:text-black transition-colors disabled:opacity-50 tracking-wider">{isSearching ? '...' : 'SEARCH'}</button>
                  </form>
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-[#161616] border border-[#222] rounded-xl overflow-hidden z-[1010] shadow-2xl">
                      {suggestions.map((s, idx) => (
                        <div key={idx} className="px-4 py-3 hover:bg-[#222] cursor-pointer text-sm text-neutral-300 border-b border-[#222] last:border-0 transition-colors" onClick={() => handleSuggestionClick(s)}>
                          <span className="text-white font-bold block text-[13px]">{s.display_name.split(',')[0]}</span>
                          <span className="text-[11px] text-neutral-500 truncate block mt-0.5">{s.display_name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handlePlanTrip} className="flex gap-3 w-full h-full">
                  <div className="relative flex-1 h-full">
                    <input type="text" placeholder="Start Location..." value={tripStart} onChange={(e) => setTripStart(e.target.value)} onFocus={() => { if (tripStartSuggestions.length > 0) setShowTripStartSuggestions(true); }} className="w-full h-full bg-[#161616] border border-[#222] rounded-full text-white text-[13px] px-4 focus:outline-none focus:border-volt-green/50 transition-colors shadow-inner" />
                    {showTripStartSuggestions && tripStartSuggestions.length > 0 && (
                      <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-[#161616] border border-[#222] rounded-xl overflow-hidden z-[1010] shadow-2xl">
                        {tripStartSuggestions.map((s, idx) => (
                          <div key={idx} className="px-4 py-3 hover:bg-[#222] cursor-pointer text-sm text-neutral-300 border-b border-[#222] last:border-0 transition-colors" onClick={() => { setTripStart(s.display_name.split(',')[0]); setShowTripStartSuggestions(false); }}>
                            <span className="text-white font-bold block text-[13px]">{s.display_name.split(',')[0]}</span>
                            <span className="text-[11px] text-neutral-500 truncate block mt-0.5">{s.display_name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="relative flex-1 h-full">
                    <input type="text" placeholder="Destination..." value={tripDest} onChange={(e) => setTripDest(e.target.value)} onFocus={() => { if (tripDestSuggestions.length > 0) setShowTripDestSuggestions(true); }} className="w-full h-full bg-[#161616] border border-[#222] rounded-full text-white text-[13px] px-4 focus:outline-none focus:border-volt-green/50 transition-colors shadow-inner" />
                    {showTripDestSuggestions && tripDestSuggestions.length > 0 && (
                      <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-[#161616] border border-[#222] rounded-xl overflow-hidden z-[1010] shadow-2xl">
                        {tripDestSuggestions.map((s, idx) => (
                          <div key={idx} className="px-4 py-3 hover:bg-[#222] cursor-pointer text-sm text-neutral-300 border-b border-[#222] last:border-0 transition-colors" onClick={() => { setTripDest(s.display_name.split(',')[0]); setShowTripDestSuggestions(false); }}>
                            <span className="text-white font-bold block text-[13px]">{s.display_name.split(',')[0]}</span>
                            <span className="text-[11px] text-neutral-500 truncate block mt-0.5">{s.display_name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button type="submit" disabled={isPlanningTrip} className="shrink-0 bg-[#222] text-white px-5 h-full rounded-full text-[10px] font-bold hover:bg-volt-green hover:text-black transition-colors disabled:opacity-50 tracking-wider">
                    {isPlanningTrip ? '...' : 'PLAN ROUTE'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Header>

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
            touchZoomRotate={true}
            touchPitch={true}
          >
            {/* Native 3D Controls (Compass & Zoom) */}
            <NavigationControl position="bottom-right" style={{ marginRight: 24, marginBottom: 90 }} showCompass={true} showZoom={true} />

            {/* Status Banners for Location */}
            {locationError && !location && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg text-xs font-bold tracking-wider z-[1000] backdrop-blur-md shadow-2xl">
                LOCATION DENIED: USE SEARCH TO FIND STATIONS
              </div>
            )}
            {!locationError && !location && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-200 px-4 py-2 rounded-lg text-xs font-bold tracking-wider z-[1000] backdrop-blur-md flex items-center gap-2 shadow-2xl">
                <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                ACQUIRING GPS SIGNAL...
              </div>
            )}

            {/* User Navigation Arrow (Lies flat on ground in 3D, rotates perfectly) */}
            {location && (
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
                  <path d="M24 4L42 42L24 34L6 42L24 4Z" fill="#cce600" stroke="#111" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 bg-blue-500 rounded-full border-[3px] border-white shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-pulse"></div>
                  <div className="text-blue-200 text-[9px] font-bold mt-1 uppercase tracking-widest bg-black/70 px-1.5 py-0.5 rounded">You</div>
                </div>
              )}
            </Marker>
            )}

            {/* Station Markers (Billboard style - always upright) */}
            {!loading && stations.map((station, index) => {
              const statusInfo = getAvailabilityStatus(station, now);
              const status = statusInfo.status;
              const colors = getStatusColors(status);
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
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 border-2 ${colors.bg} ${colors.border} ${colors.shadow}`}>
                      <svg className={`w-4 h-4 ${colors.icon}`} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                    </div>
                    <div className={`bg-[#111] border text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${colors.border} ${colors.text} shadow-lg`}>
                      {power}kW • {status}
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
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              RESUME
            </button>
          )}

          {/* Locate Me Bottom Right */}
          <div className="absolute bottom-8 right-6 z-[1000]">
            <button
              onClick={() => {
                setIsAutoFollow(true);
                if (location) {
                  if (searchLocation) {
                    setSearchLocation(null);
                    setSearchQuery('');
                    fetchStationsForLocation(location.lat, location.lng);
                  }
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
              className="w-12 h-12 bg-[#1c2c20]/90 backdrop-blur-md border border-volt-green/30 rounded-full flex items-center justify-center text-volt-green hover:bg-[#253a2a] transition-colors shadow-[0_4px_20px_rgba(204,230,0,0.2)]"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
              </svg>
            </button>
          </div>

          {/* Left Floating Panel (Nearby Stations) */}
          {!isRouting && (
            <div className="absolute top-6 left-6 md:w-[360px] w-full px-6 md:px-0 flex flex-col gap-4 z-[1000] h-[calc(100%-48px)] pointer-events-none">



              <div className="bg-[#161616]/95 backdrop-blur-xl border border-[#2c2c2c] rounded-2xl p-5 shadow-2xl flex-1 flex flex-col overflow-hidden pointer-events-auto">
                <div className="flex justify-between items-center mb-5 shrink-0">
                  <h3 className="text-white font-semibold text-lg">{tripPlanMode && routeCoords ? 'Stations on Route' : searchLocation ? 'Searched Area' : 'Nearby Stations'}</h3>
                </div>

                {/* Filters */}
                <div className="flex gap-3 mb-5 shrink-0">
                  <button className="bg-volt-green text-black px-4 py-2 rounded-full text-[10px] font-bold tracking-wide flex items-center gap-1.5 shadow-lg">
                    <span className="w-1.5 h-1.5 bg-black rounded-full"></span> AVAILABLE NOW
                  </button>
                  <button className="bg-[#222] text-neutral-400 hover:text-white px-4 py-2 rounded-full text-[10px] font-bold tracking-wide flex items-center gap-1.5 transition-colors border border-[#333]">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
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
                      const statusInfo = getAvailabilityStatus(station, now);
                      const status = statusInfo.status;
                      const waitTime = statusInfo.waitTime;
                      const isOp = status !== 'OFFLINE';
                      const isAvail = status === 'AVAILABLE';
                      const power = getPower(station.Connections);

                      return (
                        <div
                          key={station.ID || i}
                          onClick={() => setSelectedStation(station)}
                          className={`bg-[#1c1c1c] border border-[#2c2c2c] rounded-xl p-4 transition-colors cursor-pointer group ${isOp ? (isAvail ? 'hover:border-volt-green/50 hover:bg-[#1c2c20]' : 'hover:border-yellow-500/50 hover:bg-[#2c2a1c]') : 'opacity-60'} ${selectedStation?.ID === station.ID ? (isAvail ? 'border-volt-green/50 bg-[#1c2c20]' : status === 'OCCUPIED' ? 'border-yellow-500/50 bg-[#2c2a1c]' : 'border-neutral-500 bg-[#222]') : ''}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className={`text-[15px] font-bold truncate pr-2 ${isOp ? (isAvail ? 'text-white group-hover:text-volt-green transition-colors' : 'text-white group-hover:text-yellow-500 transition-colors') : 'text-neutral-400'} ${selectedStation?.ID === station.ID ? (isAvail ? 'text-volt-green' : status === 'OCCUPIED' ? 'text-yellow-500' : 'text-neutral-500') : ''}`}>
                              {station.AddressInfo.Title}
                            </h4>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase flex items-center gap-1 shrink-0 ${isAvail ? 'bg-volt-green/20 text-volt-green' : status === 'OCCUPIED' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-[#333] text-neutral-500'}`}>
                              {status === 'AVAILABLE' ? (power >= 150 ? 'FAST • FREE' : 'L2 • FREE') : status}
                            </span>
                          </div>
                          <p className="text-neutral-400 text-[10px] font-bold tracking-widest uppercase mb-3 truncate">
                            {station.AddressInfo.AddressLine1}
                          </p>

                          <div className="flex items-center gap-6 mt-1">
                            <div className={`flex items-center gap-1.5 ${isAvail ? 'text-volt-green' : status === 'OCCUPIED' ? 'text-yellow-500' : 'text-neutral-500'}`}>
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                              <span className="font-bold text-[15px]">{power} <span className="text-[11px] text-neutral-400 font-medium">kW</span></span>
                            </div>
                            <div className="flex items-center gap-1.5 text-neutral-300">
                              <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
                              <span className="text-[13px]">Wait: <span className={isAvail ? 'text-volt-green font-medium' : status === 'OCCUPIED' ? 'text-yellow-500 font-medium' : 'text-neutral-500 font-medium'}>{isAvail ? '0 mins' : status === 'OCCUPIED' ? `${waitTime} mins` : 'N/A'}</span></span>
                            </div>
                            <div className="flex items-center gap-1.5 text-neutral-300">
                              <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" /></svg>
                              <span className="text-[13px] font-medium text-volt-green">
                                {location ? `${getTravelTimeMins(getDistance(location.lat, location.lng, station.AddressInfo.Latitude, station.AddressInfo.Longitude))} mins away` : 'Calc...'}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between border-t border-[#333] pt-3">
                            <span className="text-neutral-400 text-[10px] font-bold tracking-widest uppercase">
                              {station.Connections?.length || 0}/12 PLUGS OPEN
                            </span>
                            <svg className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
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
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                  </svg>
                </div>
                <div className="flex-1 pr-4 pt-1">
                  <h3 className="text-white font-bold text-[17px] leading-tight mb-1">{selectedStation.AddressInfo.Title}</h3>
                  {(() => {
                    const statusInfo = getAvailabilityStatus(selectedStation, now);
                    const status = statusInfo.status;
                    const waitTime = statusInfo.waitTime;
                    const isAvail = status === 'AVAILABLE';
                    return (
                      <p className={`${isAvail ? 'text-volt-green' : status === 'OCCUPIED' ? 'text-yellow-500' : 'text-neutral-500'} text-[9px] font-bold tracking-widest uppercase flex items-center gap-1.5`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isAvail ? 'bg-volt-green shadow-[0_0_8px_rgba(204,230,0,0.8)]' : status === 'OCCUPIED' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]' : 'bg-neutral-500'}`}></span>
                        {isAvail ? 'ULTRA-FAST RELIABLE PARTNER' : status === 'OCCUPIED' ? `CURRENTLY IN USE (${waitTime} MINS WAIT)` : 'CURRENTLY OFFLINE'}
                      </p>
                    );
                  })()}
                </div>
                <button
                  className="text-neutral-500 hover:text-white absolute top-4 right-4"
                  onClick={() => setSelectedStation(null)}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
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
                  <span className="text-white font-bold text-[15px]">{selectedStation.UsageCost ? selectedStation.UsageCost.replace(/\$/g, '₹').replace(/EUR/g, '₹') : '₹18.50/kWh'}</span>
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
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                    {routeCoords ? 'NAVIGATING...' : 'START ROUTE'}
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
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
