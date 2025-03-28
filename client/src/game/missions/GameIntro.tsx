import { useState } from 'react';
import { Mission } from '../../types/game';
import { useGameState } from '../../lib/stores/useGameState';

interface GameIntroProps {
  mission: Mission;
  onClose: () => void;
}

/**
 * GameIntro Component
 * 
 * Provides a tutorial introduction to the game mechanics, marketing concepts,
 * and narrative context for the player. Guides the player through basic interactions.
 */
const GameIntro = ({ mission, onClose }: GameIntroProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { completeObjective } = useGameState();
  
  const tutorialSteps = [
    {
      title: "Welcome to M.A.R.C.!",
      content: (
        <div>
          <p className="mb-4">
            Welcome to the Marketing Advanced Research Console, an educational tool that will teach you fundamental marketing concepts through interactive gameplay.
          </p>
          <p>
            You've been hired as a fresh marketing graduate at ThriveTech, a tech company with ambitions of dominating the global market. Your mission is to learn and apply marketing principles to help the company succeed.
          </p>
        </div>
      )
    },
    {
      title: "Game Controls",
      content: (
        <div>
          <p className="mb-3">
            <span className="font-bold">Movement:</span> Click anywhere on the screen to move your character.
          </p>
          <p className="mb-3">
            <span className="font-bold">Interaction:</span> Click on objects or characters to interact with them.
          </p>
          <p className="mb-3">
            <span className="font-bold">Inventory:</span> Click the INVENTORY button to view your collected items.
          </p>
          <p>
            <span className="font-bold">M.A.R.C.:</span> Click the M.A.R.C. button for AI assistance on marketing concepts (warning: he's a bit snarky).
          </p>
        </div>
      )
    },
    {
      title: "Marketing Concepts",
      content: (
        <div>
          <p className="mb-4">
            Throughout your journey, you'll learn about key marketing principles:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Market Orientation</li>
            <li>Segmentation, Targeting and Positioning</li>
            <li>Marketing Research Methods</li>
            <li>Consumer Behavior</li>
            <li>Brand Strategy</li>
            <li>Marketing Mix (4Ps)</li>
            <li>Digital Marketing Channels</li>
          </ul>
        </div>
      )
    },
    {
      title: "Your First Task",
      content: (
        <div>
          <p className="mb-4">
            Your first mission is to find Professor Jenkins in the University lobby. He will brief you on your initial assignment regarding ThriveTech's marketing orientation.
          </p>
          <p>
            Complete missions to earn stat points in <span className="text-yellow-300">creativity</span>, <span className="text-blue-300">research</span>, <span className="text-green-300">persuasion</span>, and <span className="text-purple-300">public speaking</span> that will help you tackle more complex challenges.
          </p>
        </div>
      )
    }
  ];
  
  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the tutorial objective
      completeObjective('game_intro', 'complete-tutorial');
      onClose();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const currentTutorial = tutorialSteps[currentStep];
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div 
        className="relative w-4/5 max-w-3xl rounded-lg p-6 max-h-[80vh] overflow-y-auto" 
        style={{ 
          backgroundColor: 'var(--bg-color)',
          border: '3px solid var(--border-color)',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* CRT scanline effect overlay */}
        <div className="scanline absolute inset-0 pointer-events-none"></div>
        
        {/* Close button */}
        <button 
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>
        
        {/* Tutorial content */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--primary)' }}>
            {currentTutorial.title}
          </h2>
          <div className="w-full h-1 bg-gray-700 mb-4">
            <div 
              className="h-full" 
              style={{ 
                width: `${((currentStep + 1) / tutorialSteps.length) * 100}%`,
                backgroundColor: 'var(--primary)',
                transition: 'width 0.3s ease'
              }}
            ></div>
          </div>
        </div>
        
        <div className="terminal-text mb-8 leading-relaxed text-gray-200">
          {currentTutorial.content}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            className="retro-button bg-gray-700 text-white px-4 py-2"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            style={{ opacity: currentStep === 0 ? 0.5 : 1 }}
          >
            Previous
          </button>
          
          <button
            className="retro-button px-4 py-2"
            onClick={handleNext}
            style={{ 
              backgroundColor: 'var(--primary)',
              color: 'white'
            }}
          >
            {currentStep === tutorialSteps.length - 1 ? 'Start Game' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameIntro;