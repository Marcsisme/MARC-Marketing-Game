import { create } from 'zustand';
import { DialogueNode, DialogueOption } from '../../types/game';
import { dialogues } from '../../data/dialogues';
import { useGameState } from './useGameState';
import { useCharacter } from './useCharacter';

interface DialogueState {
  isDialogueActive: boolean;
  currentDialogue: DialogueNode | null;
  dialogueHistory: DialogueNode[];
  
  startDialogue: (dialogueId: string) => void;
  selectOption: (option: DialogueOption) => void;
  endDialogue: () => void;
}

export const useDialogue = create<DialogueState>((set, get) => ({
  isDialogueActive: false,
  currentDialogue: null,
  dialogueHistory: [],
  
  // Start a dialogue by ID
  startDialogue: (dialogueId) => {
    const dialogue = dialogues.find(d => d.id === dialogueId);
    
    if (dialogue) {
      set({ 
        isDialogueActive: true,
        currentDialogue: dialogue,
        dialogueHistory: []
      });
      
      // Switch game phase to dialogue
      useGameState.getState().setGamePhase('dialogue');
    }
  },
  
  // Select a dialogue option
  selectOption: (option) => {
    const currentDialogue = get().currentDialogue;
    
    if (!currentDialogue) return;
    
    // Add current dialogue to history
    set(state => ({ 
      dialogueHistory: [...state.dialogueHistory, currentDialogue]
    }));
    
    // Process option effects
    if (option.effect) {
      switch (option.effect.type) {
        case 'addItem':
          useCharacter.getState().addItemById(option.effect.value);
          break;
        case 'removeItem':
          useCharacter.getState().removeItemById(option.effect.value);
          break;
        case 'modifyStat':
          if (typeof option.effect.value === 'object' && 'stat' in option.effect.value && 'amount' in option.effect.value) {
            useGameState.getState().modifyStat(option.effect.value.stat, option.effect.value.amount);
          }
          break;
        case 'startMission':
          useGameState.getState().startMission(option.effect.value);
          break;
        case 'completeMission':
          useGameState.getState().completeMission(option.effect.value);
          break;
        case 'completeObjective':
          if (typeof option.effect.value === 'string') {
            const currentMission = useGameState.getState().currentMission;
            if (currentMission) {
              useGameState.getState().completeObjective(currentMission.id, option.effect.value);
            }
          }
          break;
        case 'moveCharacter':
          // Implementation for moving characters would go here
          break;
        case 'unlockScene':
          // Implementation for unlocking scenes would go here
          break;
      }
    }
    
    // Go to next dialogue if specified
    if (option.nextDialogue) {
      const nextDialogue = dialogues.find(d => d.id === option.nextDialogue);
      if (nextDialogue) {
        set({ currentDialogue: nextDialogue });
      } else {
        // End dialogue if next dialogue not found
        get().endDialogue();
      }
    } else {
      // End dialogue if no next dialogue specified
      get().endDialogue();
    }
  },
  
  // End the current dialogue
  endDialogue: () => {
    set({ 
      isDialogueActive: false,
      currentDialogue: null
    });
    
    // Return to playing phase
    useGameState.getState().setGamePhase('playing');
  }
}));
