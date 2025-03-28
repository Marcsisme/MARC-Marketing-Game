import { useState } from 'react';
import { Mission } from '../../types/game';
import { useGameState } from '../../lib/stores/useGameState';

interface MarketingCampaignProps {
  mission: Mission;
  onClose: () => void;
}

/**
 * MarketingCampaign Component
 * 
 * Interactive mission where the player designs a marketing campaign
 * for a silly product using concepts from the textbook chapters on
 * advertising, promotion, and brand communication.
 */
const MarketingCampaign = ({ mission, onClose }: MarketingCampaignProps) => {
  const { completeObjective, completeMission } = useGameState();
  
  // Track the player's campaign design choices
  const [campaignState, setCampaignState] = useState({
    productName: '',
    targetAudience: '',
    valueProposition: '',
    channels: [] as string[],
    creativeApproach: '',
    presentationDone: false
  });
  
  // Campaign steps
  const [currentStep, setCurrentStep] = useState(0);
  
  // Available marketing channels
  const marketingChannels = [
    'Television', 'Social Media', 'Influencers', 'Print Media', 
    'Radio', 'Email', 'Content Marketing', 'SEO', 'Events'
  ];
  
  // Creative approaches
  const creativeApproaches = [
    'Humor', 'Emotional Appeal', 'Celebrity Endorsement', 
    'Testimonials', 'Comparison', 'Problem-Solution'
  ];
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCampaignState(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle channel selection
  const toggleChannel = (channel: string) => {
    setCampaignState(prev => {
      if (prev.channels.includes(channel)) {
        return { ...prev, channels: prev.channels.filter(c => c !== channel) };
      } else {
        return { ...prev, channels: [...prev.channels, channel] };
      }
    });
  };
  
  // Handle creative approach selection
  const setCreativeApproach = (approach: string) => {
    setCampaignState(prev => ({ ...prev, creativeApproach: approach }));
  };
  
  // Campaign setup screens based on current step
  const screens = [
    // Step 1: Product briefing
    <div key="step1" className="space-y-4">
      <h3 className="text-xl font-bold mb-4 text-yellow-400">Campaign Briefing</h3>
      <p className="mb-4">
        You've been tasked with creating a marketing campaign for the "UltraSponge 3000" - 
        a revolutionary kitchen sponge with "AI-enhanced" cleaning capabilities 
        (it's just a regular sponge with some fancy designs).
      </p>
      <p className="mb-4">
        Your challenge is to make this ordinary product seem extraordinary through clever marketing.
        Apply concepts from Chapters 7, 8, and 11 of your marketing textbook.
      </p>
      
      <div className="rounded-md p-4 bg-gray-800 my-6">
        <h4 className="font-bold text-green-400 mb-2">Chapter Concepts to Apply:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Market Segmentation and Targeting</li>
          <li>Unique Selling Proposition (USP)</li>
          <li>Advertising Message Strategy</li>
          <li>Integrated Marketing Communications</li>
          <li>Brand Positioning</li>
        </ul>
      </div>
      
      <p>Let's start by creating a catchy product name that will resonate with consumers!</p>
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">Product Name:</label>
        <input
          type="text"
          name="productName"
          value={campaignState.productName}
          onChange={handleInputChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
          placeholder="Enter your product name..."
        />
      </div>
    </div>,
    
    // Step 2: Target audience
    <div key="step2" className="space-y-4">
      <h3 className="text-xl font-bold mb-4 text-yellow-400">Target Audience</h3>
      <p className="mb-4">
        Effective marketing campaigns start with a clear understanding of the target audience.
        Who would be most interested in your enhanced sponge product?
      </p>
      
      <div className="rounded-md p-4 bg-gray-800 my-4">
        <h4 className="font-bold text-green-400 mb-2">Marketing Concept:</h4>
        <p>
          <span className="font-bold">Segmentation</span> is the process of dividing a market 
          into distinct groups of buyers who have different needs, characteristics, or behaviors, 
          and who might require separate products or marketing mixes.
        </p>
      </div>
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">Describe Your Target Audience:</label>
        <textarea
          name="targetAudience"
          value={campaignState.targetAudience}
          onChange={handleInputChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white h-24"
          placeholder="Describe the demographics, psychographics, behaviors, and needs of your target audience..."
        />
      </div>
    </div>,
    
    // Step 3: Value proposition
    <div key="step3" className="space-y-4">
      <h3 className="text-xl font-bold mb-4 text-yellow-400">Value Proposition</h3>
      <p className="mb-4">
        What makes your product special? Create a compelling value proposition that highlights
        the unique benefits of your product.
      </p>
      
      <div className="rounded-md p-4 bg-gray-800 my-4">
        <h4 className="font-bold text-green-400 mb-2">Marketing Concept:</h4>
        <p>
          A <span className="font-bold">Unique Selling Proposition (USP)</span> is a factor that differentiates 
          a product from its competitors, such as the lowest cost, the highest quality, or the first-ever product of its kind.
        </p>
      </div>
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">Value Proposition:</label>
        <textarea
          name="valueProposition"
          value={campaignState.valueProposition}
          onChange={handleInputChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white h-24"
          placeholder="What unique value does your product offer? Why should consumers choose it over competitors?"
        />
      </div>
    </div>,
    
    // Step 4: Marketing channels
    <div key="step4" className="space-y-4">
      <h3 className="text-xl font-bold mb-4 text-yellow-400">Marketing Channels</h3>
      <p className="mb-4">
        Select the marketing channels you'll use to promote your product. Choose wisely based on
        your target audience and message strategy.
      </p>
      
      <div className="rounded-md p-4 bg-gray-800 my-4">
        <h4 className="font-bold text-green-400 mb-2">Marketing Concept:</h4>
        <p>
          <span className="font-bold">Integrated Marketing Communications (IMC)</span> refers to integrating and coordinating
          all marketing tools, avenues, and sources in a company into a seamless program that maximizes the impact on consumers.
        </p>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2">
        {marketingChannels.map(channel => (
          <button
            key={channel}
            onClick={() => toggleChannel(channel)}
            className={`p-2 rounded border ${
              campaignState.channels.includes(channel)
                ? 'bg-blue-600 border-blue-400 text-white'
                : 'bg-gray-700 border-gray-600 text-gray-300'
            }`}
          >
            {channel}
          </button>
        ))}
      </div>
      
      {campaignState.channels.length === 0 && (
        <p className="text-red-400 text-sm mt-2">Please select at least one channel</p>
      )}
    </div>,
    
    // Step 5: Creative approach
    <div key="step5" className="space-y-4">
      <h3 className="text-xl font-bold mb-4 text-yellow-400">Creative Approach</h3>
      <p className="mb-4">
        How will you present your product to capture attention and persuade your audience?
        Select a creative approach for your advertising campaign.
      </p>
      
      <div className="rounded-md p-4 bg-gray-800 my-4">
        <h4 className="font-bold text-green-400 mb-2">Marketing Concept:</h4>
        <p>
          <span className="font-bold">Advertising Message Strategy</span> defines what a campaign is going to say about
          the product or service, while the creative strategy determines how the message will be communicated.
        </p>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-3">
        {creativeApproaches.map(approach => (
          <button
            key={approach}
            onClick={() => setCreativeApproach(approach)}
            className={`p-3 rounded border ${
              campaignState.creativeApproach === approach
                ? 'bg-purple-600 border-purple-400 text-white'
                : 'bg-gray-700 border-gray-600 text-gray-300'
            }`}
          >
            {approach}
          </button>
        ))}
      </div>
    </div>,
    
    // Step 6: Campaign review & presentation
    <div key="step6" className="space-y-4">
      <h3 className="text-xl font-bold mb-4 text-yellow-400">Campaign Review</h3>
      <p className="mb-4">
        Review your marketing campaign below. When you're ready, present it to the client.
      </p>
      
      <div className="p-4 bg-gray-800 rounded-md space-y-3 mb-4">
        <div>
          <h4 className="text-sm text-gray-400">Product Name:</h4>
          <p className="text-white font-bold">{campaignState.productName || "Not specified"}</p>
        </div>
        
        <div>
          <h4 className="text-sm text-gray-400">Target Audience:</h4>
          <p className="text-white">{campaignState.targetAudience || "Not specified"}</p>
        </div>
        
        <div>
          <h4 className="text-sm text-gray-400">Value Proposition:</h4>
          <p className="text-white">{campaignState.valueProposition || "Not specified"}</p>
        </div>
        
        <div>
          <h4 className="text-sm text-gray-400">Marketing Channels:</h4>
          {campaignState.channels.length > 0 ? (
            <div className="flex flex-wrap gap-1 mt-1">
              {campaignState.channels.map(channel => (
                <span key={channel} className="px-2 py-1 bg-blue-900 text-blue-200 rounded-full text-xs">
                  {channel}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-red-400">No channels selected</p>
          )}
        </div>
        
        <div>
          <h4 className="text-sm text-gray-400">Creative Approach:</h4>
          <p className="text-white">{campaignState.creativeApproach || "Not specified"}</p>
        </div>
      </div>
      
      {!campaignState.presentationDone ? (
        <button
          onClick={() => {
            setCampaignState(prev => ({ ...prev, presentationDone: true }));
            completeObjective('marketing_campaign', 'present-campaign');
          }}
          className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-md font-bold text-white transition"
          disabled={!isFormComplete()}
          style={{ opacity: isFormComplete() ? 1 : 0.5 }}
        >
          Present Campaign to Client
        </button>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-green-900 border border-green-600 rounded-md">
            <h4 className="font-bold text-green-300 mb-2">Presentation Successful!</h4>
            <p className="text-green-100">
              The client loves your marketing campaign for the {campaignState.productName}! 
              They particularly appreciate your focus on {campaignState.creativeApproach.toLowerCase()} 
              and your strategic use of {campaignState.channels.slice(0, 2).join(" and ")} channels.
            </p>
          </div>
          
          <button
            onClick={() => {
              completeMission('marketing_campaign');
              onClose();
            }}
            className="w-full py-3 bg-yellow-600 hover:bg-yellow-700 rounded-md font-bold text-white transition"
          >
            Complete Mission
          </button>
        </div>
      )}
    </div>
  ];
  
  // Check if all form fields are complete for the current step
  function isCurrentStepComplete() {
    switch (currentStep) {
      case 0: return !!campaignState.productName;
      case 1: return !!campaignState.targetAudience;
      case 2: return !!campaignState.valueProposition;
      case 3: return campaignState.channels.length > 0;
      case 4: return !!campaignState.creativeApproach;
      default: return true;
    }
  }
  
  // Check if the entire form is complete
  function isFormComplete() {
    return !!campaignState.productName &&
           !!campaignState.targetAudience &&
           !!campaignState.valueProposition &&
           campaignState.channels.length > 0 &&
           !!campaignState.creativeApproach;
  }
  
  // Handle next step
  const handleNext = () => {
    if (currentStep < screens.length - 1 && isCurrentStepComplete()) {
      setCurrentStep(currentStep + 1);
      
      // Complete objectives based on steps
      if (currentStep === 0) {
        completeObjective('marketing_campaign', 'attend-briefing');
      } else if (currentStep === 4) {
        completeObjective('marketing_campaign', 'design-campaign');
      }
    }
  };
  
  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div 
        className="relative w-4/5 max-w-3xl rounded-lg p-6 max-h-[80vh] overflow-y-auto" 
        style={{ 
          backgroundColor: 'var(--bg-color)',
          border: '3px solid var(--border-color)',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* CRT scanline effect overlay */}
        <div className="scanline absolute inset-0 pointer-events-none"></div>
        
        {/* Close button */}
        <button 
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>
        
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Campaign Planning</span>
            <span>{currentStep + 1} of {screens.length}</span>
          </div>
          <div className="w-full h-1 bg-gray-700">
            <div 
              className="h-full" 
              style={{ 
                width: `${((currentStep + 1) / screens.length) * 100}%`,
                backgroundColor: 'var(--primary)',
                transition: 'width 0.3s ease'
              }}
            ></div>
          </div>
        </div>
        
        {/* Current screen content */}
        <div className="terminal-text mb-8 leading-relaxed text-gray-200">
          {screens[currentStep]}
        </div>
        
        {/* Navigation buttons (not shown on the final review screen if presentation is done) */}
        {!(currentStep === screens.length - 1 && campaignState.presentationDone) && (
          <div className="flex justify-between mt-6">
            <button
              className="retro-button bg-gray-700 text-white px-4 py-2"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              style={{ opacity: currentStep === 0 ? 0.5 : 1 }}
            >
              Previous
            </button>
            
            {currentStep < screens.length - 1 && (
              <button
                className="retro-button px-4 py-2"
                onClick={handleNext}
                disabled={!isCurrentStepComplete()}
                style={{ 
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  opacity: isCurrentStepComplete() ? 1 : 0.5
                }}
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketingCampaign;