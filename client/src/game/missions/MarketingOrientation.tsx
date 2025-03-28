import { useEffect } from 'react';
import { useGameState } from '../../lib/stores/useGameState';
import Mission from './Mission';

const MarketingOrientation = () => {
  const { currentMission, missions, showMission, setShowMission } = useGameState();
  
  // Find the Marketing Orientation mission
  const mission = missions.find(m => m.id === 'market_orientation');
  
  if (!mission) {
    return null;
  }
  
  // Close the mission view
  const handleClose = () => {
    setShowMission(false);
  };
  
  return showMission && currentMission?.id === 'market_orientation' ? (
    <Mission mission={mission} onClose={handleClose} />
  ) : null;
};

export default MarketingOrientation;
