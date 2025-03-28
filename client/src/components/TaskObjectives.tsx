import { useEffect, useState } from 'react';
import { useGameState } from '../lib/stores/useGameState';
import { Mission, Objective } from '../types/game';

/**
 * TaskObjectives Component
 * 
 * Displays the current mission objectives in a floating panel
 * Shows completed objectives with a checkmark and highlighted style
 */
const TaskObjectives = () => {
  const { currentMission } = useGameState();
  const [mission, setMission] = useState<Mission | null>(null);
  const [minimized, setMinimized] = useState(false);
  
  // Update local mission state when global state changes
  useEffect(() => {
    if (currentMission) {
      setMission(currentMission);
    }
  }, [currentMission]);
  
  if (!mission) {
    return null;
  }
  
  return (
    <div 
      className="fixed top-20 right-4 w-64 z-40 transition-all duration-300"
      style={{ 
        transform: minimized ? 'translateX(calc(100% - 40px))' : 'translateX(0)'
      }}
    >
      <div 
        className="pixel-dialogue"
        style={{ backgroundColor: 'rgba(20, 19, 39, 0.9)' }}
      >
        {/* Header with minimize button */}
        <div className="flex justify-between items-center pixel-dialogue-header">
          <span>Current Mission</span>
          <button 
            onClick={() => setMinimized(!minimized)}
            className="text-xs"
          >
            {minimized ? '«' : '»'}
          </button>
        </div>
        
        {/* Mission title and description */}
        <div className="mb-4">
          <h3 className="text-white font-bold mb-1">{mission.title}</h3>
          <p className="text-gray-300 text-xs">{mission.description}</p>
        </div>
        
        {/* Objectives list */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-gray-300 mb-2 border-b border-gray-700 pb-1">
            Objectives:
          </h4>
          {mission.objectives.map((objective) => (
            <ObjectiveItem key={objective.id} objective={objective} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Individual objective item component
const ObjectiveItem = ({ objective }: { objective: Objective }) => {
  return (
    <div 
      className="flex items-start text-xs"
      style={{ 
        opacity: objective.isCompleted ? 0.8 : 1,
        color: objective.isCompleted ? 'var(--accent)' : 'white'
      }}
    >
      <div 
        className="w-5 h-5 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5 rounded-sm"
        style={{ 
          backgroundColor: objective.isCompleted ? 'rgba(255, 204, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)',
          border: objective.isCompleted ? '1px solid var(--accent)' : '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        {objective.isCompleted ? '✓' : ''}
      </div>
      <div>
        {objective.description}
      </div>
    </div>
  );
};

export default TaskObjectives;