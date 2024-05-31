import React, { useEffect, useState } from 'react';
import personIcon from '../../assets/personIcon.png'; // Adjust the path as necessary

const PlayerDisplay = ({ numPlayers, start }) => {
  const [showDialog, setShowDialog] = useState(Array(numPlayers + 1).fill(false));
  const [lastMessage, setLastMessage] = useState('Horray'); // Start with 'Horray' so the first message is 'HepHep'

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * (numPlayers + 1));
      setShowDialog((prev) => prev.map((val, index) => index === randomIndex));
      setLastMessage((prevMessage) => (prevMessage === 'HepHep' ? 'Horray' : 'HepHep'));
    }, 2000);

    return () => clearInterval(interval);
  }, [numPlayers]);

  return (
    <div className="flex items-center space-x-4 mt-4 relative">
      {[...Array(numPlayers + 1)].map((_, index) => (
        <div key={index} className="flex flex-col items-center relative">
          <img src={personIcon} alt={`Player ${index + 1} Icon`} className="w-44 h-44" />
          <p className="mt-2 text-lg font-semibold">
            {index === 0 ? 'You' : `Player ${index}`}
          </p>
          {showDialog[index] && start === true && (
            <div className="absolute top-0 left-5 transform -translate-x-1/2 bg-white border border-gray-300 p-2 rounded shadow-md">
              {lastMessage}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlayerDisplay;
