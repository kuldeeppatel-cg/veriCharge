<div align="center">
  
  # ⚡ VeriCharge

  **Next-Generation EV Infrastructure & Smart Queue Management Platform**

  [![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-success?style=for-the-badge&logo=vercel)](https://vericharge.vercel.app/)
  [![Postman Documentation](https://img.shields.io/badge/Postman-API_Docs-orange?style=for-the-badge&logo=postman)](https://documenter.getpostman.com/view/50839348/2sBXqKof19)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

  ### 🌐 [Explore the Live Demo](https://vericharge.vercel.app/) | 📄 [View API Documentation](https://documenter.getpostman.com/view/50839348/2sBXqKof19)

</div>

---

## 📌 Overview

**VeriCharge** is a high-performance platform engineered to eliminate range anxiety and streamline the electric vehicle charging experience. The application tackles the critical problem of EV charger availability by utilizing real-time geographic data to connect drivers with the most optimal, time-efficient charging stations.

## 🚀 The Problem We Solve

EV drivers frequently experience **"range anxiety"**—the fear of running out of power before reaching a station. This is compounded by arriving at a station only to find the chargers broken, incompatible, or occupied with a long waiting queue. VeriCharge solves this fragmented experience through four core pillars:

1. **Intelligent Location Discovery**: Instantly scans your current geographic coordinates to pinpoint the nearest operational, high-powered EV charging stations around you.
2. **Predictive Availability Tracking**: Eliminates the frustration of arriving at a full station. VeriCharge provides live telemetry to show you exactly *which* chargers are currently free, their power output (kW), and predicts the exact wait time in minutes for occupied stalls.
3. **Turn-by-Turn Navigation & Reach Time**: Dynamically calculates your real-time travel ETA to any station and seamlessly launches turn-by-turn routing directly within the dashboard, keeping the map camera intelligently rotated in your direction of travel.
4. **Long-Distance Route Planning**: Enter any starting point and final destination, and the platform will plot your entire journey while intelligently displaying all compatible charging stations located along your specific route.

## 📡 Third-Party API Integrations

To power the live data ecosystem, VeriCharge seamlessly orchestrates several powerful third-party APIs:

- **[OpenChargeMap API](https://openchargemap.org/)**: The global public registry of electric vehicle charging locations. VeriCharge queries this API in real-time based on your GPS coordinates to fetch nearby stations, hardware capabilities, max power output (kW), and connector compatibility.
- **[OSRM (Open Source Routing Machine)](http://project-osrm.org/)**: Powers the turn-by-turn navigation engine. When you start a route, VeriCharge queries the OSRM backend to calculate the fastest road network polyline and provides live driving instructions.
- **[Nominatim (OpenStreetMap)](https://nominatim.org/)**: The geocoding engine driving the search bar. It allows users to search for any city, street, or landmark and instantly converts that human-readable text into exact GPS coordinates.

## 🛠️ Technology Stack & Libraries

- **React & Vite**: Core UI library and build tool for a high-performance frontend.
- **Tailwind CSS**: Powering the premium, responsive dark-mode aesthetic.
- **MapLibre GL JS & React Map GL**: Hardware-accelerated 3D live navigation map.
- **Schema.org JSON-LD**: Advanced SEO integration for personal branding and social discovery.

## 💻 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/kuldeeppatel-cg/veriCharge.git
cd veriCharge/FrontEnd
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

---

## 👨‍💻 Developer Branding

**Kuldeep Patel** - Full Stack Developer & Algo-Trader
*   **LinkedIn:** [Kuldeep Patel](https://www.linkedin.com/in/kuldeep-patel07)
*   **GitHub:** [@kuldeeppatel-cg](https://github.com/kuldeeppatel-cg)
*   **LeetCode:** [Profile](https://leetcode.com/u/kuldeep-patel-cg/)
*   **Portfolio:** [Live Website](https://vericharge.vercel.app/)

---

<div align="center">
  <sub>Built with ❤️ by Kuldeep Patel for the next generation of mobility.</sub>
</div>