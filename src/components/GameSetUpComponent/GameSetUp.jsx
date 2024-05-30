import React, { useState } from 'react';
import PlayerSelector from '../PlayerSelectorComponent/PlayerSelector.jsx';

const GameSetup = () => {
    const [numPlayers, setNumPlayers] = useState(1);
    const [userName, setUserName] = useState('');
  
    const handleNameChange = (e) => {
      setUserName(e.target.value);
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Game Setup</h1>
        <PlayerSelector numPlayers={numPlayers} setNumPlayers={setNumPlayers} />
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={handleNameChange}
            className="px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mt-4 text-xl">
          {userName && (
            <p>
              {userName} has selected {numPlayers} {numPlayers === 1 ? 'player' : 'players'}.
            </p>
          )}
        </div>
      </div>
    );
  };
  
  export default GameSetup;