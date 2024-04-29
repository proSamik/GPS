# Global Parking System

This repository contains the code for a parking management system, consisting of a React frontend (`parking-system-client`) and a Node.js backend (`Server-side`). This project allows users to interact with a parking system, manage bookings, and view parking availability in real-time.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14.x or later recommended)
- npm (typically comes with Node.js)

## Installation

Follow these steps to get your development environment set up:

### Clone the Repository

```bash
git clone https://github.com/licofiS/GPS.git
```

### Setup the Backend from root directory
```bash
cd Server-side
npm install
```

### Setup the Client from root directory
```bash
cd parking-system-client
npm install
cp .env.example .env
```

### Start the Backend Server from root directory
```bash
cd Server-side
node server.js
```

### Start the Client Development Server from root directory
```bash
cd parking-system-client
npm run dev
```



## NodeMCU Configuration

To run the NodeMCU, connect it via USB and see the serial monitor for arduino IDE. Before running in local environment change the wifi user and password in the .ino code and upload the sketch and see the changes in serial monitor.
