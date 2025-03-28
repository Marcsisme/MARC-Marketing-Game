import { useEffect, useRef } from 'react';
import { InteractiveObject as ObjectType } from '../../types/game';
import { sprites } from '../../assets/sprites';

interface ObjectProps {
  object: ObjectType;
  onClick: (object: ObjectType) => void;
}

const InteractiveObject = ({ object, onClick }: ObjectProps) => {
  const objectRef = useRef<HTMLDivElement>(null);
  
  // Sprite style
  const spriteStyle = {
    backgroundImage: `url(${sprites[object.sprite] || sprites.defaultObject})`,
    width: `${object.width}px`,
    height: `${object.height}px`,
    position: 'absolute' as 'absolute',
    left: `${object.x}px`,
    top: `${object.y}px`,
    zIndex: object.zIndex,
    cursor: 'pointer',
  };
  
  // Handle click
  const handleClick = () => {
    onClick(object);
  };
  
  return (
    <div 
      ref={objectRef}
      style={spriteStyle}
      className="pixelart object"
      data-object-id={object.id}
      onClick={handleClick}
    />
  );
};

export default InteractiveObject;
