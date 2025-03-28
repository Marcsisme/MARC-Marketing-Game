import { useState, useEffect } from 'react';
import { useDialogue } from '../lib/stores/useDialogue';
import { useAudio } from '../lib/stores/useAudio';
import { useGameState } from '../lib/stores/useGameState';
import { useInventory } from '../lib/stores/useInventory';
import { DialogueOption } from '../types/game';

/**
 * DialogueSystem Component
 * 
 * Renders in-game dialogues with characters, including
 * dialogue options, character portraits, and choice handling.
 */
const DialogueSystem = () => {
  const { currentDialogue, selectOption, endDialogue } = useDialogue();
  const { playHit } = useAudio();
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [textSpeed] = useState(30); // ms per character
  
  // Text typing effect
  useEffect(() => {
    if (!currentDialogue) return;
    
    setIsTyping(true);
    setDisplayedText('');
    
    let i = 0;
    const text = currentDialogue.text;
    
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, textSpeed);
    
    // Clean up interval on unmount or dialogue change
    return () => clearInterval(typingInterval);
  }, [currentDialogue, textSpeed]);
  
  // Skip typing animation on click when typing
  const handleTextClick = () => {
    if (isTyping && currentDialogue) {
      setIsTyping(false);
      setDisplayedText(currentDialogue.text);
    }
  };
  
  // Handle option selection
  const handleOptionSelect = (option: DialogueOption) => {
    playHit();
    selectOption(option);
  };
  
  // Check if option is available based on requirements
  const isOptionAvailable = (option: DialogueOption) => {
    // If no requirements, option is available
    if (!option.requiresStat && !option.requiresItem) return true;
    
    // Check stat requirements
    if (option.requiresStat) {
      const playerStat = useGameState.getState().playerStats[option.requiresStat.stat];
      if (playerStat < option.requiresStat.value) return false;
    }
    
    // Check item requirements
    if (option.requiresItem) {
      const hasItem = useInventory.getState().hasItem(option.requiresItem);
      if (!hasItem) return false;
    }
    
    return true;
  };
  
  if (!currentDialogue) return null;
  
  return (
    <div className="fixed bottom-0 left-0 w-full p-4 z-40">
      <div className="pixel-dialogue max-w-4xl mx-auto">
        {/* Character name/info */}
        {!currentDialogue.isMarcResponse && (
          <div className="pixel-dialogue-header">
            {currentDialogue.character}
          </div>
        )}
        
        {/* Character image if provided */}
        {currentDialogue.image && (
          <div 
            className="float-left mr-4 mb-2 w-24 h-24 rounded overflow-hidden pixelart"
            style={{ border: '2px solid var(--border-color)' }}
          >
            <img 
              src={currentDialogue.image} 
              alt={currentDialogue.character} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* MARC response styling */}
        {currentDialogue.isMarcResponse && (
          <div className="flex items-center mb-3">
            <div 
              className="w-10 h-10 flex items-center justify-center text-2xl mr-3 pixelart"
              style={{ backgroundColor: 'var(--primary)', border: '2px solid var(--border-color)' }}
            >
              🤖
            </div>
            <div>
              <h2 className="text-lg font-bold" style={{ color: 'var(--primary)' }}>M.A.R.C.</h2>
              <div className="text-xs" style={{ color: '#a0a0a0' }}>Marketing Advanced Research Console</div>
            </div>
          </div>
        )}
        
        {/* Dialogue text with typing effect */}
        <div 
          className="text-white mb-4 terminal-text"
          onClick={handleTextClick}
        >
          {displayedText}
          {isTyping && <span className="blink">_</span>}
        </div>
        
        {/* Dialogue options */}
        {!isTyping && currentDialogue.options && currentDialogue.options.length > 0 && (
          <div className="mt-4 space-y-2">
            {currentDialogue.options.map((option) => {
              const available = isOptionAvailable(option);
              
              return (
                <button
                  key={option.id}
                  onClick={() => available && handleOptionSelect(option)}
                  className={`w-full text-left px-3 py-2 rounded ${
                    available 
                      ? 'hover:bg-gray-700 transition-colors' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
                    borderLeft: available ? '3px solid var(--accent)' : '3px solid gray' 
                  }}
                  disabled={!available}
                >
                  {option.text}
                  
                  {/* Show requirement if option is not available */}
                  {!available && option.requiresStat && (
                    <span className="ml-2 text-red-400 text-xs">
                      (Requires {option.requiresStat.stat}: {option.requiresStat.value})
                    </span>
                  )}
                  
                  {!available && option.requiresItem && (
                    <span className="ml-2 text-red-400 text-xs">
                      (Requires item: {option.requiresItem})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
        
        {/* Continue prompt if no options */}
        {!isTyping && (!currentDialogue.options || currentDialogue.options.length === 0) && (
          <div className="text-right">
            <button
              onClick={endDialogue}
              className="retro-button"
              style={{ 
                backgroundColor: 'var(--primary)',
                color: 'white'
              }}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DialogueSystem;