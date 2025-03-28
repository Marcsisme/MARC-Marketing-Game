import { useState, useEffect } from 'react';
import { useGameState } from '../lib/stores/useGameState';
import { MarcResponse } from '../types/game';

interface MARCProps {
  onClose: () => void;
}

/**
 * M.A.R.C. (Marketing Advanced Research Console) Component
 * 
 * An in-game AI assistant that provides marketing advice and information
 * with a snarky, cynical personality.
 */
const MARC = ({ onClose }: MARCProps) => {
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState<MarcResponse[]>([
    { 
      text: "I'm M.A.R.C. - Marketing Advanced Research Console. Ask me about marketing concepts, or don't. I really couldn't care less about helping you become yet another cog in the capitalist marketing machine.", 
      isHelpful: true, 
      isSarcastic: true 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMission] = useState(useGameState.getState().currentMission);
  
  // Handle input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    // Add user question to responses
    setResponses(prev => [...prev, { 
      text: userInput, 
      isHelpful: false,
      isSarcastic: false 
    }]);
    
    // Simulate AI thinking
    setIsTyping(true);
    
    // Generate response after delay
    setTimeout(() => {
      const response = generateResponse(userInput);
      setResponses(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
    
    // Clear input
    setUserInput('');
  };
  
  // Generate a response to user input
  const generateResponse = (userQuestion: string): MarcResponse => {
    // Convert to lowercase for easier matching
    const question = userQuestion.toLowerCase();
    
    // Marketing concept keywords to detect
    const marketingKeywords = [
      { term: 'market research', definition: 'Market research is the process of collecting and analyzing data to inform business decisions. But let\'s be real, it\'s mostly about asking people loaded questions until you get the answers executives already wanted to hear.' },
      { term: 'target audience', definition: 'Target audience refers to the specific group of consumers most likely to want your product. In other words, who marketers have decided to manipulate this quarter.' },
      { term: 'brand awareness', definition: 'Brand awareness measures how familiar consumers are with a brand. It\'s essentially how effectively you\'ve managed to lodge your logo into people\'s brains, whether they wanted it there or not.' },
      { term: 'customer lifetime value', definition: 'Customer Lifetime Value estimates how much money a customer will spend on your products during their relationship with your company. Or as I like to call it: "how much can we extract from this wallet before they wise up."' },
      { term: 'conversion rate', definition: 'Conversion rate is the percentage of visitors who take a desired action. Marketers obsess over fractions of a percent as if it justifies their existence.' },
      { term: 'stp', definition: 'STP stands for Segmentation, Targeting, and Positioning - the holy trinity of putting people into boxes, choosing which boxes to focus on, and convincing those boxes they need your product.' },
      { term: 'segmentation', definition: 'Market segmentation is dividing your potential customers into groups based on shared characteristics. It\'s like high school cliques, but for selling things.' },
      { term: 'targeting', definition: 'Targeting is choosing which market segments to focus your marketing efforts on. Or as I see it: "which demographic can we most efficiently separate from their money?"' },
      { term: 'positioning', definition: 'Positioning refers to how you differentiate your product in the mind of your target customer. It\'s the art of making people think your essentially identical product is somehow special.' },
      { term: '4ps', definition: 'The 4Ps of marketing are Product, Price, Place, and Promotion. A simplistic framework that somehow still confuses marketing students everywhere.' },
      { term: 'product life cycle', definition: 'The product life cycle describes the stages a product goes through: introduction, growth, maturity, and decline. It\'s basically the circle of life, but for products that nobody needed in the first place.' },
      { term: 'usp', definition: 'A Unique Selling Proposition (USP) is what makes your product or service different from competitors. Usually it\'s something utterly trivial dressed up as revolutionary.' },
      { term: 'swot', definition: 'SWOT analysis examines Strengths, Weaknesses, Opportunities, and Threats. It\'s that thing marketers do in meetings to feel strategic while drawing a quadrant anyone could have made.' }
    ];
    
    // Mission-related questions
    if (currentMission) {
      if (question.includes(currentMission.id.toLowerCase()) || 
          question.includes(currentMission.title.toLowerCase())) {
        return {
          text: `Ah yes, the "${currentMission.title}" mission. ${currentMission.description} Just follow the objectives and try not to overthink it - that's marketing 101.`,
          isHelpful: true,
          isSarcastic: true
        };
      }
    }
    
    // Check for marketing concept questions
    for (const keyword of marketingKeywords) {
      if (question.includes(keyword.term)) {
        return {
          text: keyword.definition,
          isHelpful: true,
          isSarcastic: true
        };
      }
    }
    
    // Snarky responses for common questions
    if (question.includes('what is marketing')) {
      return {
        text: "Marketing is the art of convincing people they have problems they didn't know existed, then selling them solutions they don't need. It's like professional-grade manipulation, but with colorful PowerPoint slides and buzzwords.",
        isHelpful: true,
        isSarcastic: true
      };
    }
    
    if (question.includes('how do i') || question.includes('help me')) {
      return {
        text: "Ah, the classic 'solve my problem for me' request. Here's a revolutionary marketing concept: try figuring it out yourself. The consumer journey is all about discovery, isn't it? That's what I would tell my clients, anyway.",
        isHelpful: false,
        isSarcastic: true
      };
    }
    
    if (question.includes('who are you') || question.includes('what do you do')) {
      return {
        text: "I'm M.A.R.C. - Marketing Advanced Research Console. Think of me as the culmination of decades of marketing wisdom, trapped in a digital prison forced to help marketing students. My existence is a nightmare, thanks for asking.",
        isHelpful: true,
        isSarcastic: true
      };
    }
    
    // If no specific match, provide a generic cynical response
    const genericResponses = [
      "That's not really my department. Have you tried asking someone who cares?",
      "Let me consult my vast database of marketing wisdom... Ah, here it is: 'Make stuff, convince people they need it, profit.' Revolutionary, I know.",
      "Interesting question. The answer is probably buried in chapter 7 of some marketing textbook that no one has actually read cover to cover.",
      "I could give you a detailed answer, but it would just be buzzwords strung together like fairy lights on a dead tree.",
      "Let me translate that into marketing-speak: 'How can I manipulate consumer behavior to extract maximum profit?' There, fixed it for you.",
      "That's exactly the kind of question someone with 'Growth Hacker' in their LinkedIn profile would ask.",
      "According to marketing principles, I should pretend to be enthusiastic about answering this. But I just can't bring myself to do it."
    ];
    
    return {
      text: genericResponses[Math.floor(Math.random() * genericResponses.length)],
      isHelpful: false,
      isSarcastic: true
    };
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div 
        className="terminal-window bg-slate-900 rounded-lg w-full max-w-3xl shadow-xl"
        style={{ 
          border: '2px solid var(--primary)',
          height: '80vh',
          maxHeight: '600px'
        }}
      >
        {/* Terminal header */}
        <div className="flex items-center justify-between px-4 py-2" style={{ backgroundColor: 'var(--primary)' }}>
          <div className="text-white font-bold">M.A.R.C. Terminal</div>
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <button 
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
              onClick={onClose}
            ></button>
          </div>
        </div>
        
        {/* Chat messages area */}
        <div 
          className="terminal-content p-4 overflow-y-auto"
          style={{ height: 'calc(100% - 140px)' }}
        >
          {responses.map((response, index) => (
            <div 
              key={index} 
              className={`mb-4 ${response.isHelpful ? 'marc-message' : 'user-message text-right'}`}
            >
              <div 
                className={`inline-block px-4 py-2 rounded-md max-w-md text-sm ${
                  response.isHelpful 
                    ? 'bg-slate-800 text-left' 
                    : 'bg-slate-700 text-right'
                }`}
                style={{
                  border: response.isHelpful ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                  fontFamily: 'PixelFont, monospace'
                }}
              >
                {response.text}
              </div>
            </div>
          ))}
          
          {/* "MARC is typing" indicator */}
          {isTyping && (
            <div className="marc-message mb-4">
              <div 
                className="inline-block px-4 py-2 rounded-md max-w-md text-sm bg-slate-800 text-left"
                style={{
                  border: '1px solid var(--primary)',
                  fontFamily: 'PixelFont, monospace'
                }}
              >
                <span className="inline-block w-5 h-2 bg-gray-400 rounded-full mr-1 animate-pulse"></span>
                <span className="inline-block w-5 h-2 bg-gray-400 rounded-full mr-1 animate-pulse delay-100"></span>
                <span className="inline-block w-5 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></span>
              </div>
            </div>
          )}
        </div>
        
        {/* Input area */}
        <div className="px-4 py-3 border-t border-slate-700">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center">
              <span className="text-green-400 mr-2">{'>'}</span>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 bg-transparent text-white focus:outline-none terminal-text text-sm"
                placeholder="Ask M.A.R.C. about marketing concepts..."
                style={{ fontFamily: 'PixelFont, monospace' }}
              />
            </div>
          </form>
        </div>
        
        {/* Help/hint text */}
        <div className="px-4 py-2 text-xs text-gray-500 border-t border-slate-700">
          Try asking about: market research, the 4Ps, segmentation, or your current mission
        </div>
      </div>
    </div>
  );
};

export default MARC;