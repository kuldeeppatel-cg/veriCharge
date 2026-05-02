<div align="center">

# ⚡ VeriCharge Pro
**Next-Generation EV Infrastructure & Smart Queue Management Platform**

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-success?style=for-the-badge&logo=vercel)](https://vericharge.vercel.app/)
[![Postman Documentation](https://img.shields.io/badge/Postman-API_Docs-orange?style=for-the-badge&logo=postman)](https://documenter.getpostman.com/view/50839348/2sBXqKof19)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

### 🌐 [Explore the Live Demo](https://vericharge.vercel.app/) | 📄 [View API Documentation](https://documenter.getpostman.com/view/50839348/2sBXqKof19) | 🎨 [Figma Prototype](https://www.figma.com/proto/pZUu5qXerpjH2kAt1CpV6u/Untitled?page-id=0%3A1&node-id=30-3438&p=f&viewport=-287%2C-1647%2C0.47&t=5bYD9XioPioRtTtf-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=30%3A4347)

</div>

---

## 📌 Project Overview

**VeriCharge** is a high-performance platform engineered to eliminate range anxiety and streamline the electric vehicle charging experience. The application tackles the critical problem of EV charger availability by utilizing real-time geographic data to connect drivers with the most optimal, time-efficient charging stations.

Developed by **[Kuldeep Patel](https://github.com/kuldeeppatel-cg)**, this platform serves as a production-ready demonstration of full-stack engineering, real-time data orchestration, and premium UI/UX design.

---

## 🚀 Key Features

*   **⚡ Intelligent Location Discovery**: Instantly scans your GPS coordinates to pinpoint the nearest high-powered EV charging stations.
*   **📊 Predictive Availability**: Live telemetry showing which chargers are free, their power output (kW), and predicted wait times.
*   **🗺️ Turn-by-Turn Navigation**: Dynamic ETA calculation and hardware-accelerated 3D map camera that rotates in your direction of travel.
*   **🛣️ Smart Route Planner**: Plot long-distance journeys while intelligently discovering all compatible charging stations located along your specific highway path.
*   **📱 Mobile-First UX**: Physics-based draggable sheets, responsive data cards, and a compressed navigation system optimized for the road.

---

## 📡 API Ecosystem

VeriCharge seamlessly orchestrates several powerful global APIs:

*   **[OpenChargeMap API](https://openchargemap.org/)**: The global registry of EV charging locations. Includes a custom **API Key Rotation** system (6 keys) to bypass rate limits.
*   **[OSRM Routing Engine](http://project-osrm.org/)**: Powers the turn-by-turn navigation engine and highway polyline generation.
*   **[Nominatim Geocoding](https://nominatim.org/)**: Driving the intelligent search bar for global location discovery.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React (Vite), Tailwind CSS, React Router |
| **Mapping** | MapLibre GL JS, React Map GL |
| **SEO** | Schema.org JSON-LD, Dynamic Meta Tags, XML Sitemaps |
| **Design** | Figma (High-Fidelity Prototype) |
| **Deployment**| Vercel (CI/CD Pipeline) |

---

## 💻 Installation & Setup

Want to run VeriCharge locally? Follow these simple steps:

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
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 👨‍💻 Developer Branding

**Kuldeep Patel** - Full Stack Developer & Algo-Trader
*   **LinkedIn:** [Kuldeep Patel](https://www.linkedin.com/in/kuldeep-patel07)
*   **GitHub:** [@kuldeeppatel-cg](https://github.com/kuldeeppatel-cg)
*   **LeetCode:** [Profile](https://leetcode.com/u/kuldeep-patel-cg/)
*   **Portfolio:** [Live Website](https://vericharge.vercel.app/)

---

<div align="center">
  <sub>Built with ❤️ for the next generation of mobility.</sub>
</div>