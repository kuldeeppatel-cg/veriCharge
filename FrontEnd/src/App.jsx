
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Dashboard'
import LiveMap from './pages/LiveMap'
import History from './pages/History'
import Reliability from './pages/Reliability'
import Support from './pages/Support'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<LiveMap />} />
        <Route path="/station" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/reliability" element={<Reliability />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
