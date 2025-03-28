import { Item } from '../types/game';

export const items: Item[] = [
  {
    id: 'marc_access_card',
    name: 'M.A.R.C. Access Card',
    description: 'A digital access card that allows you to communicate with M.A.R.C., the Marketing Advanced Research Console. It has a suspicious smiley face on it.',
    sprite: 'viralContentGenerator',
    canUse: false
  },
  {
    id: 'coffee',
    name: 'Cup of Coffee',
    description: 'A questionable cup of coffee from the office machine. Smells like burnt plastic and desperation. Might help with your Public Speaking skill... or send you to the hospital.',
    sprite: 'coffee',
    canUse: true,
    onUse: () => {
      // Increase Public Speaking by 5
      const currentStats = { ...useGameState.getState().playerStats };
      currentStats.publicSpeaking = Math.min(100, currentStats.publicSpeaking + 5);
      useGameState.getState().setPlayerStats(currentStats);
      
      // Display message
      alert('You drink the coffee. Your Public Speaking increased by 5! You also feel slightly nauseous.');
    }
  },
  {
    id: 'whiteboard_photo',
    name: 'Whiteboard Photo',
    description: 'A photo of the company whiteboard showing declining customer satisfaction alongside increasing executive bonuses. Concrete evidence of their priorities.',
    sprite: 'report',
    canUse: false
  },
  {
    id: 'internal_memo',
    name: 'Internal Memo',
    description: 'A confidential company memo outlining ThriveTech\'s "customer strategy." It explicitly states: "Market research is a waste of resources. We build what we want, then create the demand."',
    sprite: 'report',
    canUse: false
  },
  {
    id: 'focus_group_report',
    name: 'Focus Group Report',
    description: 'A report containing carefully selected focus group feedback that only includes positive comments. Someone has scribbled "Ignore the negative ones" in the margins.',
    sprite: 'focusGroupReport',
    canUse: false
  },
  {
    id: 'influencer_contract',
    name: 'Overpriced Influencer Contract',
    description: 'A contract for an influencer with questionable reach. The payment amount is circled several times with "Worth it???" written next to it.',
    sprite: 'influencerContract',
    canUse: false
  }
];
