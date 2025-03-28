import { useState, useEffect } from 'react';
import { Mission as MissionType } from '../../types/game';
import { useGameState } from '../../lib/stores/useGameState';
import GameIntro from './GameIntro';
import MarketingOrientation from './MarketingOrientation';
import MarketResearch from './MarketResearch';
import MarketingCampaign from './MarketingCampaign';

interface MissionProps {
  mission: MissionType;
  onClose: () => void;
}

/**
 * Mission Component
 * 
 * Renders the appropriate mission content based on mission ID
 * Acts as a router to specific mission implementations
 */
const Mission = ({ mission, onClose }: MissionProps) => {
  // Render specific mission component based on mission ID
  const renderMissionContent = () => {
    switch (mission.id) {
      case 'game-intro':
        return <GameIntro mission={mission} onClose={onClose} />;
      case 'marketing-orientation':
        return <MarketingOrientation mission={mission} onClose={onClose} />;
      case 'market-research':
        return <MarketResearch mission={mission} onClose={onClose} />;
      case 'marketing-campaign':
        return <MarketingCampaign mission={mission} onClose={onClose} />;
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">{mission.title}</h2>
            <p className="text-white mb-6">{mission.description}</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-2">Objectives:</h3>
              <ul className="space-y-2">
                {mission.objectives.map((objective) => (
                  <li 
                    key={objective.id}
                    className="flex items-center"
                  >
                    <div 
                      className="w-5 h-5 flex-shrink-0 flex items-center justify-center mr-2 rounded-sm"
                      style={{ 
                        backgroundColor: objective.isCompleted ? 'rgba(255, 204, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                        border: objective.isCompleted ? '1px solid var(--accent)' : '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      {objective.isCompleted ? '✓' : ''}
                    </div>
                    <span 
                      style={{ 
                        color: objective.isCompleted ? 'var(--accent)' : 'white',
                        textDecoration: objective.isCompleted ? 'line-through' : 'none'
                      }}
                    >
                      {objective.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-center">
              <button 
                onClick={onClose}
                className="retro-button"
                style={{ backgroundColor: 'var(--primary)', color: 'white' }}
              >
                Close
              </button>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-slate-900 rounded-lg w-full max-w-4xl shadow-xl"
        style={{ 
          border: '2px solid var(--primary)',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
      >
        {/* Mission header */}
        <div 
          className="flex items-center justify-between px-4 py-2 sticky top-0 z-10"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <div className="text-white font-bold">Mission: {mission.title}</div>
          <button 
            className="w-6 h-6 rounded-full flex items-center justify-center"
            onClick={onClose}
            style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          >
            ×
          </button>
        </div>
        
        {/* Mission content */}
        <div className="mission-content terminal-window">
          {renderMissionContent()}
        </div>
      </div>
    </div>
  );
};

export default Mission;