import React, { useEffect, useState } from 'react';
import personIcon from '../../assets/personIcon.png';  // Adjust the path as necessary

const PlayerDisplay = ({ numPlayers }) => {
  const [showDialog, setShowDialog] = useState(Array(numPlayers + 1).fill(false));

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * (numPlayers + 1));
      setShowDialog((prev) => prev.map((val, index) => index === randomIndex));
    }, 2000);

    return () => clearInterval(interval);
  }, [numPlayers]);

  return (
    <div className="flex items-center space-x-2 mt-4 relative">
      {[...Array(numPlayers + 1)].map((_, index) => (
        <div key={index} className="relative">
          <img src={personIcon} alt="Player Icon" className="w-8 h-8" />
          {showDialog[index] && (
            <div className="absolute top-0 left-8 bg-white border border-gray-300 p-2 rounded shadow-md">
              Hello!
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlayerDisplay;
