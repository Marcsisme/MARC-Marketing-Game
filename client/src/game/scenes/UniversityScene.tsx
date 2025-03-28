import { useEffect } from 'react';
import { useGameState } from '../../lib/stores/useGameState';
import { scenes } from '../../data/scenes';
import Scene from './Scene';

const UniversityScene = () => {
  const { currentScene } = useGameState();
  
  // Get the university scene from data
  const universityScene = scenes.find(scene => scene.id === 'university');
  
  if (!universityScene) {
    return <div className="text-white">Error: University scene not found!</div>;
  }
  
  return <Scene scene={universityScene} />;
};

export default UniversityScene;
