import { Scene } from '../types/game';
import { characters } from './characters';
import { objects } from './objects';

export const scenes: Scene[] = [
  // University Scene
  {
    id: 'university',
    name: 'University Classroom',
    background: 'universityBackground',
    width: 800,
    height: 600,
    objects: [
      objects.find(o => o.id === 'professor_desk')!,
      objects.find(o => o.id === 'student_chair')!,
      objects.find(o => o.id === 'whiteboard')!
    ],
    characters: [
      characters.find(c => c.id === 'player')!,
      characters.find(c => c.id === 'professor')!
    ],
    exits: [
      {
        x: 700,
        y: 500,
        width: 100,
        height: 100,
        targetScene: 'corporate_office',
        targetX: 100,
        targetY: 300
      }
    ],
    isLocked: false
  },
  
  // Corporate Office Scene
  {
    id: 'corporate_office',
    name: 'ThriveTech Headquarters',
    background: 'officeBackground',
    width: 800,
    height: 600,
    objects: [
      objects.find(o => o.id === 'ceo_desk')!,
      objects.find(o => o.id === 'coffee_machine')!,
      objects.find(o => o.id === 'printer')!,
      objects.find(o => o.id === 'computer')!
    ],
    characters: [
      // Note: Player is added dynamically when transitioning scenes
      characters.find(c => c.id === 'client')!,
      characters.find(c => c.id === 'intern')!
    ],
    exits: [
      {
        x: 0,
        y: 250,
        width: 100,
        height: 100,
        targetScene: 'university',
        targetX: 650,
        targetY: 450
      }
    ],
    isLocked: false
  }
];
