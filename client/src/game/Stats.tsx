import { useState, useEffect } from 'react';
import { useGameState } from '../lib/stores/useGameState';
import { PlayerStats, Stat } from '../types/game';

/**
 * Stats Component
 * 
 * Displays the player's marketing skill stats and provides information
 * about what each stat represents and how to improve it
 */
const Stats = () => {
  const { playerStats } = useGameState();
  const [selectedStat, setSelectedStat] = useState<Stat | null>(null);
  
  // Close stats panel
  const handleClose = () => {
    useGameState.getState().setShowStats(false);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-slate-900 rounded-lg w-full max-w-2xl shadow-xl"
        style={{ 
          border: '2px solid var(--border-color)',
          height: '80vh',
          maxHeight: '500px'
        }}
      >
        {/* Stats header */}
        <div 
          className="flex items-center justify-between px-4 py-2 border-b border-gray-700"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <div className="text-white font-bold">Marketing Skills</div>
          <button 
            className="w-6 h-6 rounded-full flex items-center justify-center"
            onClick={handleClose}
            style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          >
            ×
          </button>
        </div>
        
        <div className="p-6">
          <div className="terminal-text text-sm text-gray-300 mb-6">
            Your marketing aptitude is measured across four key dimensions.
            Complete missions to increase your skills in these areas.
          </div>
          
          <div className="space-y-4 mb-6">
            <StatBar 
              stat="creativity" 
              value={playerStats.creativity} 
              label="Creativity" 
              onClick={() => setSelectedStat("creativity")}
              isSelected={selectedStat === "creativity"}
            />
            
            <StatBar 
              stat="persuasion" 
              value={playerStats.persuasion} 
              label="Persuasion" 
              onClick={() => setSelectedStat("persuasion")}
              isSelected={selectedStat === "persuasion"}
            />
            
            <StatBar 
              stat="publicSpeaking" 
              value={playerStats.publicSpeaking} 
              label="Public Speaking" 
              onClick={() => setSelectedStat("publicSpeaking")}
              isSelected={selectedStat === "publicSpeaking"}
            />
            
            <StatBar 
              stat="research" 
              value={playerStats.research} 
              label="Research" 
              onClick={() => setSelectedStat("research")}
              isSelected={selectedStat === "research"}
            />
          </div>
          
          {/* Stat details panel */}
          <div 
            className="p-4 rounded" 
            style={{ 
              backgroundColor: 'rgba(0,0,0,0.2)', 
              border: '1px solid var(--border-color)',
              minHeight: '150px'
            }}
          >
            {selectedStat ? (
              <StatInfo stat={selectedStat} value={playerStats[selectedStat]} />
            ) : (
              <div className="text-center text-gray-400">
                Select a skill to see details and improvement tips
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Individual stat bar component
interface StatBarProps {
  stat: Stat;
  value: number;
  label: string;
  onClick: () => void;
  isSelected: boolean;
}

const StatBar = ({ stat, value, label, onClick, isSelected }: StatBarProps) => {
  return (
    <div 
      className={`cursor-pointer ${isSelected ? 'selected-item' : ''}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-1">
        <span 
          className="text-sm font-bold"
          style={{ color: isSelected ? 'var(--accent)' : 'white' }}
        >
          {label}
        </span>
        <span className="text-xs text-gray-300">{value}/10</span>
      </div>
      
      <div className="stat-bar">
        <div 
          className={`stat-fill ${stat}-fill`}
          style={{ width: `${value * 10}%` }}
        ></div>
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}/10</span>
      </div>
    </div>
  );
};

// Stat information component
interface StatInfoProps {
  stat: Stat;
  value: number;
}

const StatInfo = ({ stat, value }: StatInfoProps) => {
  // Info about each stat
  const statInfo = {
    creativity: {
      title: "Creativity",
      description: "Your ability to generate innovative marketing ideas and campaigns that stand out from competitors.",
      levels: [
        "Novice: Your ideas are basic and predictable.",
        "Competent: You can adapt existing ideas with some originality.",
        "Expert: You consistently produce unique and effective marketing concepts."
      ],
      improveTips: [
        "Complete the Marketing Campaign mission",
        "Experiment with unconventional marketing approaches",
        "Study successful creative campaigns in the game library"
      ]
    },
    persuasion: {
      title: "Persuasion",
      description: "Your effectiveness at convincing stakeholders and consumers through compelling messaging.",
      levels: [
        "Novice: Your arguments lack conviction and rarely persuade.",
        "Competent: You can make reasonable cases that sometimes influence others.",
        "Expert: Your messaging is highly compelling and reliably changes minds."
      ],
      improveTips: [
        "Practice persuasive dialogue options with NPCs",
        "Study consumer psychology in the university library",
        "Complete the Consumer Behavior mission"
      ]
    },
    publicSpeaking: {
      title: "Public Speaking",
      description: "Your ability to present marketing concepts clearly and confidently to groups.",
      levels: [
        "Novice: You struggle with presentations and often lose your audience.",
        "Competent: You can deliver prepared material effectively.",
        "Expert: You command attention and can expertly adapt your message to any audience."
      ],
      improveTips: [
        "Present your marketing plans to the agency team",
        "Practice delivery techniques in the university workshop",
        "Participate in the pitch competition event"
      ]
    },
    research: {
      title: "Research",
      description: "Your proficiency at gathering and analyzing market data to inform decisions.",
      levels: [
        "Novice: Your research is superficial and often leads to poor conclusions.",
        "Competent: You can find and interpret basic market information.",
        "Expert: Your thorough analysis consistently reveals valuable market insights."
      ],
      improveTips: [
        "Complete the Market Research mission",
        "Practice data analysis at the research terminal",
        "Interview consumers in different market segments"
      ]
    }
  };
  
  const info = statInfo[stat];
  
  // Determine current level based on value
  let levelText = info.levels[0];
  if (value >= 7) {
    levelText = info.levels[2];
  } else if (value >= 4) {
    levelText = info.levels[1];
  }
  
  return (
    <div>
      <h3 
        className="text-lg font-bold mb-2"
        style={{ color: `var(--accent)` }}
      >
        {info.title}
      </h3>
      
      <p className="text-sm text-gray-300 mb-4">
        {info.description}
      </p>
      
      <div className="mb-3">
        <h4 className="text-white text-sm font-bold mb-1">Current Level:</h4>
        <p className="text-sm text-gray-300">
          {levelText}
        </p>
      </div>
      
      <div>
        <h4 className="text-white text-sm font-bold mb-1">How to Improve:</h4>
        <ul className="text-sm text-gray-300 list-disc pl-5">
          {info.improveTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stats;