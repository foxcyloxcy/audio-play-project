import React, { useState } from 'react';
import PlayerSelector from '../PlayerSelectorComponent/PlayerSelector.jsx';
import PlayerDisplay from '../PlayerDisplayComponent/PlayerDisplay.jsx'; // Adjust the path as necessary

const GameSetup = () => {
  const [numPlayers, setNumPlayers] = useState(0); // Start with 0 to hide PlayerDisplay initially
  const [start, setStart] = useState(false); // Start with 0 to hide PlayerDisplay initially
  const [userName, setUserName] = useState('');
  const [disableButton, setDisableButton] = useState(true);

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleStart = () => {
    setStart(true);
    setUserName('');
    setDisableButton(false)
  };

  const handleReset = () => {
    setNumPlayers(0);
    setUserName('');
  };

  const triggerHephep = () => {
    setNumPlayers(0);
    setUserName('');
  };

  const triggerHorray = () => {
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
            {userName} has selected {numPlayers} {numPlayers === 1 ? 'player' : 'players'} to play with.
          </p>
          <PlayerDisplay numPlayers={numPlayers} start={start} />
          <div className="flex flex-row items-center justify-center justify-around mt-4 w-full">
            <button
              onClick={triggerHephep}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 w-3/12"
              aria-label="HepHep button"
              disabled={disableButton}
            >
              HepHep
            </button>
            <button
              onClick={triggerHorray}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 w-3/12"
              aria-label="Horray button"
              disabled={disableButton}
            >
              Horray
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={handleStart}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-300"
              aria-label="Start the game"
            >
              Start
            </button>
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300"
              aria-label="Reset the game setup"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameSetup;
