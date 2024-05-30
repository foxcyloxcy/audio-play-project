import React, { useState } from 'react';
import PlayerSelector from '../PlayerSelectorComponent/PlayerSelector.jsx';
import PlayerDisplay from '../PlayerDisplayComponent/PlayerDisplay.jsx'; // Adjust the path as necessary

const GameSetup = () => {
  const [numPlayers, setNumPlayers] = useState(0); // Start with 0 to hide PlayerDisplay initially
  const [userName, setUserName] = useState('');

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleReset = () => {
    setNumPlayers(0);
    setUserName('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Game Setup</h1>
      {numPlayers === 0 ? (
        <>
          <PlayerSelector numPlayers={numPlayers} setNumPlayers={setNumPlayers} />
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={handleNameChange}
              className="px-4 py-2 border rounded-md"
              aria-label="Enter your name"
            />
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-xl mt-4">
            {userName} has selected {numPlayers} {numPlayers === 1 ? 'player' : 'players'}.
          </p>
          <PlayerDisplay numPlayers={numPlayers} />
          <button
            onClick={handleReset}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default GameSetup;
