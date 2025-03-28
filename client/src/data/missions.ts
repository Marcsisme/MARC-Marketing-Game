import { Mission } from '../types/game';

export const missions: Mission[] = [
  // Tutorial mission
  {
    id: 'game_intro',
    title: 'Welcome to M.A.R.C.',
    description: 'Learn the basic controls and concepts of the game.',
    objectives: [
      {
        id: 'complete-tutorial',
        description: 'Complete the interactive tutorial',
        isCompleted: false
      },
      {
        id: 'meet-professor-jenkins',
        description: 'Meet Professor Jenkins in the University lobby',
        isCompleted: false
      }
    ],
    isCompleted: false,
    reward: {
      stats: {
        creativity: 5,
        persuasion: 5,
        publicSpeaking: 5,
        research: 5
      }
    }
  },
  
  // Market Orientation mission
  {
    id: 'market_orientation',
    title: 'Marketing Orientation Analysis',
    description: 'Analyze whether ThriveTech is truly market-oriented as defined in Chapter 1 of your textbook.',
    objectives: [
      {
        id: 'meet-client',
        description: 'Meet with the CEO of ThriveTech',
        isCompleted: false
      },
      {
        id: 'gather-employee-insight',
        description: 'Talk to at least one employee about customer interactions',
        isCompleted: false
      },
      {
        id: 'identify-orientation',
        description: 'Determine if ThriveTech is market-oriented',
        isCompleted: false
      },
      {
        id: 'prepare-report',
        description: 'Prepare a report on your findings',
        isCompleted: false
      }
    ],
    isCompleted: false,
    reward: {
      stats: {
        research: 15,
        publicSpeaking: 10
      }
    }
  },
  
  // Marketing Campaign mission
  {
    id: 'marketing_campaign',
    title: 'Design a Marketing Campaign',
    description: 'Create a marketing campaign for a silly product using concepts from Chapters 7, 8, and 11.',
    objectives: [
      {
        id: 'attend-briefing',
        description: 'Attend the campaign briefing with Professor Smith',
        isCompleted: false
      },
      {
        id: 'design-campaign',
        description: 'Design your marketing campaign',
        isCompleted: false
      },
      {
        id: 'present-campaign',
        description: 'Present your campaign to the client',
        isCompleted: false
      }
    ],
    isCompleted: false,
    reward: {
      stats: {
        creativity: 20,
        persuasion: 15
      },
      items: ['marketing_award']
    }
  },
  
  // Market Research mission
  {
    id: 'market_research',
    title: 'Market Research Analysis',
    description: 'Apply market research concepts from Chapter 3 to analyze consumer data and make recommendations.',
    objectives: [
      {
        id: 'review-brief',
        description: 'Review the research brief from Professor Jenkins',
        isCompleted: false
      },
      {
        id: 'complete-research',
        description: 'Complete the research analysis',
        isCompleted: false
      },
      {
        id: 'present-findings',
        description: 'Present your findings and recommendations',
        isCompleted: false
      }
    ],
    isCompleted: false,
    reward: {
      stats: {
        research: 25,
        persuasion: 10
      }
    }
  },
  
  // Brand Strategy mission
  {
    id: 'brand_strategy',
    title: 'Brand Positioning Strategy',
    description: 'Develop a brand positioning strategy using concepts from Chapter 6 of your textbook.',
    objectives: [
      {
        id: 'analyze-brand',
        description: 'Analyze the current brand perception',
        isCompleted: false
      },
      {
        id: 'identify-target',
        description: 'Identify target segments and positioning',
        isCompleted: false
      },
      {
        id: 'develop-strategy',
        description: 'Develop the brand positioning strategy',
        isCompleted: false
      },
      {
        id: 'present-strategy',
        description: 'Present your strategy to stakeholders',
        isCompleted: false
      }
    ],
    isCompleted: false,
    reward: {
      stats: {
        creativity: 15,
        persuasion: 20
      }
    }
  }
];

// Helper function to find a mission by ID
export const findMissionById = (id: string): Mission | undefined => {
  return missions.find(mission => mission.id === id);
};