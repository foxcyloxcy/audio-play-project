import React, { useState, useEffect } from 'react';
import PlayerSelector from '../PlayerSelectorComponent/PlayerSelector.jsx';
import PlayerDisplay from '../PlayerDisplayComponent/PlayerDisplay.jsx'; // Adjust the path as necessary

const GameSetup = () => {
  const [numPlayers, setNumPlayers] = useState(0); // Start with 0 to hide PlayerDisplay initially
  const [start, setStart] = useState(false); // Start with false to hide PlayerDisplay initially
  const [userName, setUserName] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [lastMessage, setLastMessage] = useState('Horray'); // Initial message
  const [currentTurn, setCurrentTurn] = useState(-1); // Track the current turn index (-1 indicates no active turn)
  const [remainingPlayers, setRemainingPlayers] = useState([]);

  useEffect(() => {
    if (start) {
      setRemainingPlayers([...Array(numPlayers + 1).keys()]);
      setCurrentTurn(0); // Start with the user
    }
  }, [start, numPlayers]);

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleStart = () => {
    setStart(true);
    setDisableButton(false);
    setUserName('');
  };

  const handleReset = () => {
    setNumPlayers(0);
    setUserName('');
    setStart(false);
    setDisableButton(true);
    setLastMessage('Horray');
    setCurrentTurn(-1);
    setRemainingPlayers([]);
  };

  const handleUserClick = (message) => {
    if (message === lastMessage) {
      alert('You are out!');
      handleReset();
    } else {
      setLastMessage(message);
      setCurrentTurn((prevTurn) => (prevTurn + 1) % remainingPlayers.length);
    }
  };

  useEffect(() => {
    if (start && currentTurn !== 0) {
      const timer = setTimeout(() => {
        setCurrentTurn((prevTurn) => {
          let nextTurn = (prevTurn + 1) % remainingPlayers.length;
          if (nextTurn === 0) nextTurn = 1; // Ensure the user's turn is skipped for AI processing

          // AI players logic
          if (remainingPlayers.length > 2) {
            const currentMessage = lastMessage === 'HepHep' ? 'Horray' : 'HepHep';
            const randomChoice = Math.random() > 0.5 ? currentMessage : lastMessage;

            if (randomChoice === lastMessage) {
              // AI made a mistake
              alert(`Player ${remainingPlayers[nextTurn]} is out!`);
              const newRemainingPlayers = remainingPlayers.filter(
                (_, index) => index !== nextTurn
              );
              setRemainingPlayers(newRemainingPlayers);

              if (newRemainingPlayers.length === 2) {
                // Only the user and one AI left, the AI should not make a mistake
                nextTurn = newRemainingPlayers.indexOf(newRemainingPlayers[1]);
              } else {
                nextTurn = (nextTurn + 1) % newRemainingPlayers.length;
                if (nextTurn === 0) nextTurn = 1;
              }
            } else {
              setLastMessage(randomChoice);
            }
          } else {
            setLastMessage(lastMessage === 'HepHep' ? 'Horray' : 'HepHep');
          }

          return nextTurn;
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentTurn, start, remainingPlayers, lastMessage]);

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
          <PlayerDisplay
            numPlayers={numPlayers}
            start={start}
            lastMessage={lastMessage}
            currentTurn={currentTurn}
            remainingPlayers={remainingPlayers}
          />
          <div className="flex flex-row items-center justify-center justify-around mt-4 w-full">
            <button
              onClick={() => handleUserClick('HepHep')}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 w-3/12"
              aria-label="HepHep button"
              disabled={disableButton || currentTurn !== 0}
            >
              HepHep
            </button>
            
            <button
              onClick={() => handleUserClick('Horray')}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 w-3/12"
              aria-label="Horray button"
              disabled={disableButton || currentTurn !== 0}
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
