import { Character } from '../types/game';

export const characters: Character[] = [
  // Player character
  {
    id: 'player',
    name: 'Marketing Student',
    sprite: 'player',
    x: 400,
    y: 300,
    width: 32,
    height: 64,
    dialogues: [],
    isNPC: false
  },
  
  // NPCs
  {
    id: 'professor',
    name: 'Professor Smith',
    sprite: 'professor',
    x: 200,
    y: 200,
    width: 32,
    height: 64,
    dialogues: ['intro_1'],
    isNPC: true
  },
  {
    id: 'client',
    name: 'Mr. Thompson',
    sprite: 'client',
    x: 600,
    y: 200,
    width: 32,
    height: 64,
    dialogues: ['client_1'],
    isNPC: true
  },
  {
    id: 'intern',
    name: 'Overworked Intern',
    sprite: 'intern',
    x: 500,
    y: 350,
    width: 32,
    height: 64,
    dialogues: ['intern_1'],
    isNPC: true
  }
];
