# Smart Parking Admin Panel

A web-based admin dashboard for managing a smart parking system. This application is part of a complete IoT-based parking management solution that helps administrators manage parking lots and monitor real-time parking spot availability.

## What Is This Project About?

This admin panel is the **control center** for a smart parking system that:
- Allows administrators to add and manage parking lots (parking garages/areas)
- Add and configure parking spots/slots within each lot
- Monitor the current status of all parking spots (occupied or free)
- View real-time updates from IoT sensors that detect car presence
- Manage admin users who have access to the dashboard

**The Complete Smart Parking Ecosystem:**

1. **IoT Sensors** → Detect when cars park or leave a spot
2. **Backend API** → Receives sensor data via MQTT and stores it in the database
3. **Admin Panel (This App)** → Manages parking lots, slots, and monitors status
4. **Android Mobile App** → Shows users available parking on a map with real-time updates

**How It Works:**
- Admins use this dashboard to create parking lots (e.g., "Downtown Parking Garage")
- Admins add parking slots to each lot and assign sensor IDs
- When a car parks, the IoT sensor sends data to the backend
- The backend updates the slot status to "occupied"
- This admin panel shows the updated status in real-time
- The Android app also displays the availability to help drivers find parking

## What It Does

This admin panel provides:
- **Admin Authentication**: Secure login system for administrators
- **Parking Lot Management**: Create, view, edit, and delete parking lots with GPS coordinates and addresses
- **Parking Slot Management**: Add parking slots to lots, assign sensor IDs, and monitor occupancy status (occupied/free)
- **Real-time Status Monitoring**: See which parking spots are currently occupied or free
- **Admin User Management**: Add, edit, and manage admin users who can access the system
- **Dashboard Analytics**: View parking system status and usage statistics

## Technologies Used

- **Vue 3**: Modern JavaScript framework for building the user interface
- **Vue Router**: Navigation and routing
- **Axios**: API communication
- **Vite**: Fast build tool and development server

## Getting Started

### Prerequisites

- Node.js (version 20.19.0 or higher, or version 22.12.0 or higher)
- npm (comes with Node.js)

### How to Clone

```bash
git clone https://github.com/mtmab2408/smart-parking-admin-panel.git
cd smart-parking-admin-panel
git checkout main
```

### Installation

Install the required dependencies:

```bash
npm install
```

### How to Run the Program

#### Development Mode

To run the application in development mode with hot-reload:

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or another available port).

#### Production Build

To build the application for production:

```bash
npm run build
```

#### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Usage

1. Start the development server using `npm run dev`
2. Open your browser and navigate to the local address shown in the terminal
3. Log in with your admin credentials
4. Access the dashboard to manage parking lots, slots, and admin users

## Project Structure

```
smart-parking-admin-panel/
├── src/
│   ├── assets/          # Static assets and styles
│   ├── components/      # Reusable Vue components
│   ├── router/          # Vue Router configuration
│   ├── services/        # API service functions
│   ├── views/           # Page components
│   └── main.js          # Application entry point
├── public/              # Public static files
└── package.json         # Project dependencies and scripts
```

## Related Projects

This admin panel is part of a complete smart parking solution. Here are the related components:

### Backend API
- **Repository**: https://github.com/mtmab2408/smart-parking-backend
- **Technology**: Spring Boot (Java 21), MQTT, H2 Database
- **Purpose**: Receives IoT sensor data via MQTT, provides REST API endpoints, manages database
- **Features**:
  - Real-time MQTT messaging from parking sensors
  - REST API for parking lot and slot management
  - Updates parking status (occupied/free) in real-time
  - GPS coordinates support for map integration

### Android Mobile App
- **Technology**: Kotlin, Jetpack Compose, OSMDroid (OpenStreetMap)
- **Purpose**: Shows drivers available parking spots on a map
- **Features**:
  - Interactive map with color-coded markers (green = available, yellow = limited, red = full)
  - Real-time updates every 5 seconds
  - GPS navigation to parking lots
  - Shows free slots vs total slots for each location

### How They Work Together
```
IoT Sensor → MQTT → Backend API ← Admin Panel (manage & monitor)
                         ↓
                    Android App (find parking)
```

## Branch Information

- **Main Branch**: `main`
- Repository URL: https://github.com/mtmab2408/smart-parking-admin-panel

## License

This is a private project for educational purposes (Masters thesis project).
