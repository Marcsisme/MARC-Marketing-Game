import { useState, useEffect } from 'react';
import { useGame } from '../lib/stores/useGame';
import { useGameState } from '../lib/stores/useGameState';
import { useCharacter } from '../lib/stores/useCharacter';
import { useDialogue } from '../lib/stores/useDialogue';
import { useAudio } from '../lib/stores/useAudio';
import Scene from './scenes/Scene';
import Character from './Character';
import DialogueSystem from './DialogueSystem';
import MARC from './MARC';
import Inventory from './Inventory';
import Stats from './Stats';
import Mission from './missions/Mission';
import TaskObjectives from '../components/TaskObjectives';

/**
 * Main Game Component
 * 
 * Controls the overall game flow, scene rendering, and UI components
 */
const Game = () => {
  // Global state 
  const { phase, start } = useGame();
  const { 
    currentScene, 
    activeScene, 
    gamePhase, 
    setGamePhase, 
    showInventory,
    showStats,
    showMission,
    currentMission,
    initGame
  } = useGameState();
  const { player, setPlayer } = useCharacter();
  const { isDialogueActive } = useDialogue();
  const { backgroundMusic, setBackgroundMusic } = useAudio();
  
  // Local UI state
  const [showMARC, setShowMARC] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(true);
  
  // Initialize game state on component mount
  useEffect(() => {
    initGame();
    
    // Set up background music if not already playing
    if (!backgroundMusic) {
      const music = new Audio('/sounds/background-music.mp3');
      music.loop = true;
      music.volume = 0.3;
      setBackgroundMusic(music);
      // Don't autoplay - let user start it
    }
    
    // Set initial player character
    if (!player) {
      setPlayer({
        id: 'player',
        name: 'Marketing Student',
        sprite: '/sprites/player.png',
        x: 100,
        y: 100,
        width: 64,
        height: 96,
        dialogues: [],
        isNPC: false
      });
    }
  }, []);
  
  // Handle game start
  const handleStartGame = () => {
    setShowInstructionsModal(false);
    start();
    
    // Start background music on user interaction
    if (backgroundMusic) {
      backgroundMusic.play().catch(err => {
        console.warn('Audio not allowed to autoplay:', err);
      });
    }
  };
  
  // Render loading state if no active scene
  if (!activeScene) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading game world...</div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Intro modal / instructions */}
      {phase === 'ready' && showInstructionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="pixel-dialogue max-w-2xl">
            <div className="pixel-dialogue-header">Welcome to M.A.R.C.</div>
            <div className="my-4">
              <h2 className="text-2xl font-bold text-white mb-4">Marketing Advanced Research Console</h2>
              <p className="mb-4 text-white">
                Welcome to your new marketing internship! As a budding marketing professional,
                you'll be guided by M.A.R.C. (Marketing Advanced Research Console), our AI assistant.
                Complete marketing challenges, learn real concepts, and try not to take M.A.R.C.'s
                sarcastic comments too personally.
              </p>
              <div className="mb-4 text-white">
                <h3 className="text-lg font-bold mb-2">How to Play:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Click to interact with characters and objects</li>
                  <li>Complete missions to improve your marketing skills</li>
                  <li>Ask M.A.R.C. for help (though don't expect friendliness)</li>
                  <li>Collect items and information to solve marketing challenges</li>
                </ul>
              </div>
              <p className="text-sm mb-6 text-gray-300">
                <em>Based on Baines' "Fundamentals of Marketing" textbook</em>
              </p>
            </div>
            <div className="text-center">
              <button 
                onClick={handleStartGame}
                className="retro-button"
                style={{ backgroundColor: 'var(--primary)', color: 'white' }}
              >
                Start Game
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Game UI */}
      <div className="game-container w-full h-full">
        {/* Render active scene */}
        <Scene scene={activeScene} />
        
        {/* Render the player character */}
        {player && <Character character={player} />}
        
        {/* Render all NPCs in current scene */}
        {activeScene.characters.map((character) => (
          character.id !== 'player' && <Character key={character.id} character={character} />
        ))}
        
        {/* Game menu bar */}
        <div className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-80 px-4 py-2 flex justify-between items-center z-30 border-b border-gray-700">
          <div className="text-white font-bold">M.A.R.C.</div>
          <div className="flex items-center space-x-2">
            <button 
              className="retro-button-small"
              onClick={() => setShowMARC(true)}
            >
              Ask M.A.R.C.
            </button>
            <button 
              className="retro-button-small"
              onClick={() => useGameState.getState().setShowInventory(!showInventory)}
            >
              Inventory
            </button>
            <button 
              className="retro-button-small"
              onClick={() => useGameState.getState().setShowStats(!showStats)}
            >
              Stats
            </button>
          </div>
        </div>
        
        {/* MARC AI assistant modal */}
        {showMARC && (
          <MARC onClose={() => setShowMARC(false)} />
        )}
        
        {/* Task objectives panel */}
        {currentMission && <TaskObjectives />}
        
        {/* Dialogue system */}
        {isDialogueActive && <DialogueSystem />}
        
        {/* Game components that show conditionally */}
        {showInventory && <Inventory />}
        {showStats && <Stats />}
        {showMission && currentMission && (
          <Mission mission={currentMission} onClose={() => useGameState.getState().setShowMission(false)} />
        )}
        
        {/* Retro scanline effect (no flickering) */}
        <div className="scanline"></div>
      </div>
    </div>
  );
};

export default Game;