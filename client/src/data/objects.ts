import { InteractiveObject } from '../types/game';

export const objects: InteractiveObject[] = [
  // University objects
  {
    id: 'professor_desk',
    name: 'Professor\'s Desk',
    sprite: 'desk',
    x: 150,
    y: 150,
    width: 96,
    height: 48,
    zIndex: 150,
    isObstacle: true
  },
  {
    id: 'student_chair',
    name: 'Student Chair',
    sprite: 'chair',
    x: 250,
    y: 250,
    width: 32,
    height: 32,
    zIndex: 250,
    isObstacle: true
  },
  {
    id: 'whiteboard',
    name: 'Whiteboard',
    sprite: 'whiteboard',
    x: 400,
    y: 100,
    width: 128,
    height: 96,
    zIndex: 100,
    isObstacle: true,
    dialogueId: 'whiteboard_1'
  },
  
  // Office objects
  {
    id: 'ceo_desk',
    name: 'CEO\'s Desk',
    sprite: 'desk',
    x: 550,
    y: 150,
    width: 96,
    height: 48,
    zIndex: 150,
    isObstacle: true
  },
  {
    id: 'coffee_machine',
    name: 'Coffee Machine',
    sprite: 'coffeeMachine',
    x: 100,
    y: 350,
    width: 48,
    height: 64,
    zIndex: 350,
    isObstacle: true,
    dialogueId: 'coffee_machine_1'
  },
  {
    id: 'printer',
    name: 'Malfunctioning Printer',
    sprite: 'printer',
    x: 300,
    y: 400,
    width: 48,
    height: 32,
    zIndex: 400,
    isObstacle: true,
    dialogueId: 'analyze_evidence_1'
  },
  {
    id: 'computer',
    name: 'Office Computer',
    sprite: 'computer',
    x: 600,
    y: 350,
    width: 48,
    height: 48,
    zIndex: 350,
    isObstacle: true
  }
];
