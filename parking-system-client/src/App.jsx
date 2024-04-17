import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ParkingStatus from './ParkingStatus';
import MapComponent from './MapComponent';
import BookingComponent from './BookingComponent';

function App() {
  return (
      <Router>
          <div>
              <nav>
                  <ul>
                      <li><Link to="/map">Home (Map)</Link></li>
                      <li><Link to="/booking">Book Parking</Link></li>
                      <li><Link to="/status">Parking Status</Link></li>
                  </ul>
              </nav>
              <Routes>
                  <Route path="/booking" element={<BookingComponent />} />
                  <Route path="/status" element={<ParkingStatus />} />
                  <Route path="/map" element={<MapComponent />} />
                  <Route path="/" element={<div>Welcome to the Parking System! Select an option above to proceed.</div>} />
              </Routes>
          </div>
      </Router>
  );
}


export default App;
