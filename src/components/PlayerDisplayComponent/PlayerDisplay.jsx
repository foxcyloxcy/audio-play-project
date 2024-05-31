import React, { useEffect, useState } from 'react';
import personIcon from '../../assets/personIcon.png'; // Adjust the path as necessary

const PlayerDisplay = ({ numPlayers, start, lastMessage, handleUserClick }) => {
  const [showDialog, setShowDialog] = useState(Array(numPlayers + 1).fill(false));
  const [currentMessage, setCurrentMessage] = useState(lastMessage);

  useEffect(() => {
    if (!start) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * (numPlayers + 1));
      if (randomIndex === 0) {
        // If it's the user's turn, show '...' and wait for user input
        setCurrentMessage('...');
        setShowDialog((prev) => prev.map((_, index) => index === randomIndex));
      } else {
        // If it's an AI player's turn, continue the HepHep-Horray cycle
        setShowDialog((prev) => prev.map((_, index) => index === randomIndex));
        setCurrentMessage((prevMessage) => (prevMessage === 'HepHep' ? 'Horray' : 'HepHep'));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [numPlayers, start]);

  return (
    <div className="flex items-center space-x-4 mt-4 relative">
      {[...Array(numPlayers + 1)].map((_, index) => (
        <div key={index} className="flex flex-col items-center relative">
          <img src={personIcon} alt={`Player ${index + 1} Icon`} className="w-44 h-44" />
          <p className="mt-2 text-lg font-semibold">
            {index === 0 ? 'You' : `Player ${index}`}
          </p>
          {showDialog[index] && start && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 p-2 rounded shadow-md">
              {index === 0 ? (
                <>
                  {currentMessage}
                  <button onClick={() => handleUserClick('HepHep')} className="ml-2">HepHep</button>
                  <button onClick={() => handleUserClick('Horray')} className="ml-2">Horray</button>
                </>
              ) : (
                currentMessage
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlayerDisplay;
