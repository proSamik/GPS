import React from 'react';
import './HomePage.css'; 
import myImage from './assets/bg_image.png';

function HomePage() {
  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>Welcome to the Global Parking System</h1>
        <p>Select an option from the menu to proceed.</p>
      </div>
      <img src={myImage} alt="Descriptive Alt Text" className="centered-image"/>
    </div>
  );
}

export default HomePage;
