import React from 'react';
import personIcon from '../../assets/personIcon.png'; // Adjust the path as necessary

const PlayerDisplay = ({ numPlayers }) => {
  return (
    <div className="flex items-center space-x-2 mt-4">
      {[...Array(numPlayers)].map((_, index) => (
        <img key={index} src={personIcon} alt="Player Icon" className="w-8 h-8" />
      ))}
    </div>
  );
};

export default PlayerDisplay;
