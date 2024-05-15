import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, useLocation } from 'react-router-dom';
import ParkingStatus from './ParkingStatus';
import MapComponent from './MapComponent';
import BookingComponent from './BookingComponent';
import Preloader from './Preloader';
import HomePage from './HomePage';
import './App.css'; 
import QRDisplay from './QRDisplay';
import EntryQRDisplay from './EntryQRDisplay';


function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // Simulate loading time
  }, []);

    return (
      <Router>
        {loading && <Preloader />} {/* Show preloader while loading */}
      <div className={`flex flex-col min-h-screen bg-gray-100 ${loading ? 'hidden' : ''}`}>
          <Nav />
          <main className="flex-1">
            <Routes>
          <Route path="/entry-qr" element={<EntryQRDisplay />} />
          <Route path="/qrdisplay" element={<QRDisplay />} />
              <Route path="/booking" element={<BookingComponent />} />
              <Route path="/status" element={<ParkingStatus />} />
              <Route path="/map" element={<MapComponent />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }
  
  function Nav() {
    const location = useLocation();
    const tabs = ['/', '/map', '/booking', '/status'];
    

    // Helper function to format string to Sentence case
  function formatLabel(path) {
    if (path === '/') {
      return 'Home'; // Special case for home, capitalize first letter
    }
    const label = path.substring(1); // Remove the leading slash
    return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase(); // Capitalize first letter, rest in lowercase
  }

    return (
    <nav className="bg-purple-600 shadow-md">
      <ul className="flex justify-center space-x-6 p-4 text-white">
        {tabs.map((tab) => (
          <li key={tab}>
            <NavLink
              to={tab}
              className={({ isActive }) =>
                `nav-link text-lg font-semibold px-2 pb-1 ${isActive ? 'nav-link-active' : ''}`
              }
            >
              {formatLabel(tab)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
  }
  
  function WelcomeMessage() {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-700">Welcome to the Parking System</h1>
        <p className="mt-2 text-purple-700">Select an option from the menu to proceed</p>
      </div>
    );
  }
  
  export default App;
