import { useState } from 'react';
import { useInventory } from '../lib/stores/useInventory';
import { useGameState } from '../lib/stores/useGameState';
import { items as gameItems } from '../data/items';
import { Item } from '../types/game';

/**
 * Inventory Component
 * 
 * Displays and manages the player's inventory items with use/examine functionality
 */
const Inventory = () => {
  const { items: playerItems, selectItem, selectedItemId } = useInventory();
  const [examiningItem, setExaminingItem] = useState<Item | null>(null);
  
  // Close inventory panel
  const handleClose = () => {
    useGameState.getState().setShowInventory(false);
  };
  
  // Handle clicking on an item
  const handleItemClick = (item: Item) => {
    if (examiningItem) {
      // If already examining an item, close the details panel
      setExaminingItem(null);
    } else {
      // Select the item and show details
      selectItem(item.id);
      setExaminingItem(item);
    }
  };
  
  // Find full item objects from data based on IDs
  const inventoryItems = playerItems.map(itemId => {
    const fullItem = gameItems.find(i => i.id === itemId);
    if (!fullItem) {
      console.warn(`Item ${itemId} not found in items data`);
      return null;
    }
    return fullItem;
  }).filter(Boolean) as Item[];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-slate-900 rounded-lg w-full max-w-3xl shadow-xl"
        style={{ 
          border: '2px solid var(--border-color)',
          height: '80vh',
          maxHeight: '600px'
        }}
      >
        {/* Inventory header */}
        <div 
          className="flex items-center justify-between px-4 py-2 border-b border-gray-700"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <div className="text-white font-bold">Inventory</div>
          <button 
            className="w-6 h-6 rounded-full flex items-center justify-center"
            onClick={handleClose}
            style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          >
            ×
          </button>
        </div>
        
        <div className="p-4 grid grid-cols-1 gap-4 md:grid-cols-2 h-full">
          {/* Item grid */}
          <div 
            className="grid grid-cols-4 gap-2 h-full overflow-y-auto p-2"
            style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}
          >
            {inventoryItems.length === 0 ? (
              <div className="col-span-4 text-center text-gray-400 p-4">
                Your inventory is empty.
              </div>
            ) : (
              inventoryItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`relative cursor-pointer p-2 ${selectedItemId === item.id ? 'selected-item' : ''}`}
                  onClick={() => handleItemClick(item)}
                  style={{ 
                    backgroundColor: selectedItemId === item.id ? 'rgba(255, 204, 0, 0.2)' : 'rgba(0, 0, 0, 0.3)',
                    border: `1px solid ${selectedItemId === item.id ? 'var(--accent)' : 'var(--border-color)'}`,
                    borderRadius: '4px'
                  }}
                >
                  <div 
                    className="w-full aspect-square mb-1 pixelart"
                    style={{
                      backgroundImage: `url(${item.sprite})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                  <div className="text-xs text-center text-white truncate">{item.name}</div>
                </div>
              ))
            )}
          </div>
          
          {/* Item details */}
          <div 
            className="p-4 flex flex-col" 
            style={{ 
              backgroundColor: 'rgba(0,0,0,0.2)', 
              borderRadius: '4px',
              border: '1px solid var(--border-color)' 
            }}
          >
            {examiningItem ? (
              <>
                <div className="font-bold text-white mb-2">{examiningItem.name}</div>
                
                <div 
                  className="w-24 h-24 pixelart mx-auto mb-3"
                  style={{
                    backgroundImage: `url(${examiningItem.sprite})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                
                <div className="text-sm text-gray-300 mb-4 flex-grow">
                  {examiningItem.description}
                </div>
                
                {examiningItem.canUse && (
                  <button
                    className="retro-button w-full mt-auto"
                    onClick={() => {
                      // Implementation for using items would go here
                      if (examiningItem.onUse) {
                        examiningItem.onUse();
                      } else {
                        console.log(`Using item: ${examiningItem.name}`);
                      }
                    }}
                    style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                  >
                    Use Item
                  </button>
                )}
              </>
            ) : (
              <div className="text-gray-400 text-center flex-grow flex items-center justify-center">
                Select an item to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;