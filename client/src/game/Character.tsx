import { useState, useEffect } from 'react';
import { Character as CharacterType } from '../types/game';
import { useCharacter } from '../lib/stores/useCharacter';

interface CharacterProps {
  character: CharacterType;
}

/**
 * Character Component
 * 
 * Renders a game character with sprite and handles interactions
 */
const Character = ({ character }: CharacterProps) => {
  const [isInteractable, setIsInteractable] = useState(false);
  const { interactWithCharacter } = useCharacter();
  
  // Determine if character is interactable (NPCs only)
  useEffect(() => {
    setIsInteractable(character.isNPC);
  }, [character]);
  
  // Handle character click - show dialogue if NPC
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the game container from also handling this click
    
    if (isInteractable) {
      interactWithCharacter(character);
    }
  };
  
  return (
    <div 
      className="absolute"
      style={{ 
        left: character.x, 
        top: character.y,
        width: character.width,
        height: character.height,
        zIndex: character.y, // Higher Y value = higher z-index (appears in front)
        cursor: isInteractable ? 'pointer' : 'default',
        transition: 'left 0.3s ease, top 0.3s ease' // Smooth movement transitions
      }}
      onClick={handleClick}
    >
      {/* Character sprite */}
      <div 
        className="w-full h-full pixelart"
        style={{ 
          backgroundImage: `url(${character.sprite})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Character name tag */}
      <div 
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md text-xs whitespace-nowrap"
        style={{ 
          backgroundColor: character.isNPC ? 'var(--primary)' : 'var(--accent)',
          color: 'white',
          fontFamily: 'PixelFont',
          border: '1px solid rgba(0, 0, 0, 0.2)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        }}
      >
        {character.name}
      </div>
      
      {/* Interaction hint (NPCs only) */}
      {isInteractable && (
        <div 
          className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-2xl animate-bounce"
          style={{ color: 'var(--accent)' }}
        >
          ⬆️
        </div>
      )}
    </div>
  );
};

export default Character;