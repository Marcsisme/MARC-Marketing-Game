import { useState, useEffect } from 'react';
import { Scene as SceneType, InteractiveObject } from '../../types/game';
import { useCharacter } from '../../lib/stores/useCharacter';

interface SceneProps {
  scene: SceneType;
}

/**
 * Scene Component
 * 
 * Renders the game scene with its background, objects, and interactive elements
 */
const Scene = ({ scene }: SceneProps) => {
  const { interactWithObject } = useCharacter();
  
  // Handle object interaction
  const handleObjectClick = (object: InteractiveObject) => {
    interactWithObject(object);
  };
  
  return (
    <div 
      className="w-full h-full relative overflow-hidden"
      style={{ 
        backgroundColor: '#111',
        backgroundImage: `url(${scene.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        width: scene.width,
        height: scene.height
      }}
    >
      {/* Render all interactive objects in the scene */}
      {scene.objects.map((object) => (
        <ObjectRenderer key={object.id} object={object} onClick={handleObjectClick} />
      ))}
      
      {/* Scene exits are invisible by default */}
      {scene.exits.map((exit) => (
        <div 
          key={exit.targetScene}
          className="absolute"
          style={{ 
            left: exit.x,
            top: exit.y,
            width: exit.width,
            height: exit.height,
            backgroundColor: 'rgba(0, 255, 0, 0.1)', // Slightly visible for debugging, can be made invisible
            border: '1px dashed rgba(0, 255, 0, 0.3)',
            cursor: 'pointer',
            zIndex: 5
          }}
        />
      ))}
      
      {/* Scene name indicator */}
      <div 
        className="absolute top-4 left-4 px-3 py-1 rounded-md text-sm font-bold"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'var(--accent)',
          border: '1px solid var(--border-color)'
        }}
      >
        {scene.name}
      </div>
    </div>
  );
};

/**
 * ObjectRenderer Component
 * 
 * Renders individual interactive objects within a scene
 */
const ObjectRenderer = ({ object, onClick }: { object: InteractiveObject, onClick: (object: InteractiveObject) => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="absolute"
      style={{ 
        left: object.x,
        top: object.y,
        width: object.width,
        height: object.height,
        backgroundImage: `url(${object.sprite})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        cursor: 'pointer',
        zIndex: object.zIndex || 10,
        transition: 'transform 0.2s ease-in-out'
      }}
      onClick={() => onClick(object)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Optional hover effect for interactable objects */}
      {isHovered && (
        <div 
          className="absolute inset-0 rounded-md pointer-events-none"
          style={{ 
            border: '2px solid var(--accent)',
            boxShadow: '0 0 10px rgba(255, 204, 0, 0.5)'
          }}
        />
      )}
      
      {/* Optional object name on hover */}
      {isHovered && (
        <div 
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md text-xs whitespace-nowrap"
          style={{ 
            backgroundColor: 'var(--bg-color)',
            color: 'var(--accent)',
            border: '1px solid var(--accent)',
            fontFamily: 'PixelFont'
          }}
        >
          {object.name}
        </div>
      )}
    </div>
  );
};

export default Scene;