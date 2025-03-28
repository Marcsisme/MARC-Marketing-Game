import { useEffect } from 'react';
import { useGameState } from '../../lib/stores/useGameState';
import { scenes } from '../../data/scenes';
import Scene from './Scene';

const OfficeScene = () => {
  const { currentScene } = useGameState();
  
  // Get the office scene from data
  const officeScene = scenes.find(scene => scene.id === 'corporate_office');
  
  if (!officeScene) {
    return <div className="text-white">Error: Office scene not found!</div>;
  }
  
  return <Scene scene={officeScene} />;
};

export default OfficeScene;
