import { create } from 'zustand';
import { Character, Item, InteractiveObject } from '../../types/game';
import { items } from '../../data/items';
import { useDialogue } from './useDialogue';
import { useAudio } from './useAudio';

interface CharacterState {
  player: Character | null;
  inventory: Item[];
  selectedItem: Item | null;
  
  setPlayer: (player: Character) => void;
  movePlayerTo: (x: number, y: number) => void;
  interactWithObject: (object: InteractiveObject) => void;
  interactWithCharacter: (character: Character) => void;
  addItemById: (itemId: string) => void;
  removeItemById: (itemId: string) => void;
  selectItem: (item: Item | null) => void;
  useItem: (item: Item) => void;
  combineItems: (item1: Item, item2: Item) => void;
}

export const useCharacter = create<CharacterState>((set, get) => ({
  player: null,
  inventory: [],
  selectedItem: null,
  
  // Set the player character
  setPlayer: (player) => set({ player }),
  
  // Move player to coordinates
  movePlayerTo: (x, y) => {
    set(state => {
      if (state.player) {
        return { 
          player: { 
            ...state.player, 
            x, 
            y 
          } 
        };
      }
      return state;
    });
  },
  
  // Interact with an object
  interactWithObject: (object) => {
    // If the object has a dialogue, start it
    if (object.dialogueId) {
      useDialogue.getState().startDialogue(object.dialogueId);
    }
    
    // If the object has an onInteract function, call it
    if (object.onInteract && get().player) {
      object.onInteract(get().player);
    }
  },
  
  // Interact with another character
  interactWithCharacter: (character) => {
    // Start dialogue with the character if they have dialogues
    if (character.dialogues && character.dialogues.length > 0) {
      // Start the first dialogue
      useDialogue.getState().startDialogue(character.dialogues[0]);
    }
  },
  
  // Add an item to inventory by ID
  addItemById: (itemId) => {
    const itemToAdd = items.find(item => item.id === itemId);
    
    if (itemToAdd) {
      set(state => ({ 
        inventory: [...state.inventory, itemToAdd] 
      }));
      
      // Play success sound
      useAudio.getState().playSuccess();
    }
  },
  
  // Remove an item from inventory by ID
  removeItemById: (itemId) => {
    set(state => ({
      inventory: state.inventory.filter(item => item.id !== itemId),
      // Deselect the item if it's the one being removed
      selectedItem: state.selectedItem?.id === itemId ? null : state.selectedItem
    }));
  },
  
  // Select an item
  selectItem: (item) => set({ selectedItem: item }),
  
  // Use an item
  useItem: (item) => {
    if (item.canUse && item.onUse) {
      item.onUse();
    }
  },
  
  // Combine two items
  combineItems: (item1, item2) => {
    // Check if the items can be combined
    if (item1.useWith && item1.useWith.includes(item2.id)) {
      // Implement item combination logic here
      console.log(`Combining ${item1.name} with ${item2.name}`);
      
      // For now, just deselect the item
      set({ selectedItem: null });
    } else {
      // Items can't be combined
      alert(`You can't combine ${item1.name} with ${item2.name}`);
      set({ selectedItem: null });
    }
  }
}));
