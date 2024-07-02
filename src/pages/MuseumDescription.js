// src/components/MuseumDescription.js

import React from 'react';
import './MuseumDescription.css';
import museumImage from '../assets/museum.jpg'; // Make sure to have an image in this path

const MuseumDescription = () => {
  return (
    <div className="museum-description">
      <div className="text-section">
        <h2>Welcome to Our Museum</h2>
        <p>
          Discover the wonders of history, art, and culture at our museum. Our
          exhibits offer a unique glimpse into the past and present, showcasing
          a diverse range of artifacts and artworks from around the world. Join
          us for an unforgettable journey through time and creativity.
        </p>
      </div>
      <div className="image-section">
        <img src={museumImage} alt="Museum" />
      </div>
    </div>
  );
};

export default MuseumDescription;
