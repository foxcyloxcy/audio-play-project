import React from 'react';
import personIcon from '../../assets/personIcon.png'; // Adjust the path as necessary

const PlayerDisplay = ({ numPlayers, start, lastMessage, currentTurn, remainingPlayers }) => {
  return (
    <div className="flex items-center space-x-4 mt-4 relative">
      {remainingPlayers.map((playerIndex) => (
        <div key={playerIndex} className="flex flex-col items-center relative">
          <img src={personIcon} alt={`Player ${playerIndex + 1} Icon`} className="w-44 h-44" />
          <p className="mt-2 text-lg font-semibold">
            {playerIndex === 0 ? 'You' : `Player ${playerIndex}`}
          </p>
          {currentTurn === playerIndex && start && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 p-2 rounded shadow-md">
              {playerIndex === 0 ? '...' : lastMessage}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlayerDisplay;
