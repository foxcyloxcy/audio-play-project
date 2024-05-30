import React from 'react';

const PlayerSelector = ({ numPlayers, setNumPlayers }) => {
  const handleSelect = (number) => {
    setNumPlayers(number);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">Select Number of Players</h2>
      <div className="flex space-x-4">
        {[1, 2, 3, 4, 5].map((number) => (
          <button
            key={number}
            onClick={() => handleSelect(number)}
            className={`px-4 py-2 text-lg font-bold ${
              numPlayers === number ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-700'
            } text-white rounded-md transition-colors duration-200`}
            aria-label={`Select ${number} ${number === 1 ? 'player' : 'players'}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlayerSelector;
