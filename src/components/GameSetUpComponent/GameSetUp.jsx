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
  const [playTime, setPlayTime] = useState(0); // Track play time for playerIndex

  useEffect(() => {
    let timer;
    if (start) {
      setRemainingPlayers([...Array(numPlayers + 1).keys()]);
      setCurrentTurn(0); // Start with the user
      timer = setInterval(() => setPlayTime((prev) => prev + 1), 1000); // Increment play time every second
    }
    return () => clearInterval(timer);
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
    setPlayTime(0);
  };

  const handleUserClick = (message) => {
    if (message === lastMessage) {
      alert('You are out!');
      handleReset();
    } else {
      const fromPlayerResponse = message === 'HepHep' ? 'Horray' : 'HepHep';
      setLastMessage(fromPlayerResponse);
      const randomTurn = Math.random() > 0.5 ? 1 : 0;;
      console.log('random Turn from handleclick',randomTurn)
      setCurrentTurn(randomTurn)
    }
  };

  useEffect(() => {
    if (start && currentTurn !== 0) {

      const timer = setTimeout(() => {
        const nextTurn = (currentTurn + 1) % remainingPlayers.length;
        const currentMessage = lastMessage === 'HepHep' ? 'Horray' : 'HepHep';

        if (nextTurn === 0) {
          setCurrentTurn(0); // Player's turn
        } else {
          // AI turn
          const randomChoice = Math.random() > 0.5 ? currentMessage : lastMessage;
          if (randomChoice === lastMessage) {
            setTimeout(() => {
              const newRemainingPlayers = remainingPlayers.filter((_, index) => index !== nextTurn);
              setRemainingPlayers(newRemainingPlayers);
            }, 1000); // Delay before removing the AI player
              alert(`Player ${remainingPlayers[nextTurn]} is out!`);
          } else {
            setLastMessage(randomChoice);
            setCurrentTurn(nextTurn);
          }
        }
      }, 2000);

      return () => clearTimeout(timer);
    } else if (start && currentTurn === 1 && remainingPlayers.length === 2) {
      // Ensure AI takes turn if only one AI is left
      const timer = setTimeout(() => {
        const nextMessage = lastMessage === 'HepHep' ? 'Horray' : 'HepHep';
        setLastMessage(nextMessage);
        const randomTurn = Math.random() > 0.5 ? 1 : 0;
        console.log('random Turn from else if',randomTurn)
        setCurrentTurn(randomTurn)
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
              disabled={start} // Disable start button once the game starts
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
      {start && (
        <div className="mt-4 text-xl">
          Time spent playing: {playTime} seconds
        </div>
      )}
    </div>
  );
};

export default GameSetup;
