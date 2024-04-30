import React from 'react';
import myImage from './assets/circle_preloader.png';
import './Preloader.css'; 

const Preloader = () => {
  return (
    <div className="preloader">
      <img src={myImage} alt="Loading..." />
    </div>
  );
};

export default Preloader;
