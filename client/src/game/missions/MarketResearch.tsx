import { useState } from 'react';
import { Mission } from '../../types/game';
import { useGameState } from '../../lib/stores/useGameState';

interface MarketResearchProps {
  mission: Mission;
  onClose: () => void;
}

/**
 * MarketResearch Component
 * 
 * Interactive mission focused on market research concepts from Chapter 3.
 * Players analyze consumer data and recommend research approaches.
 */
const MarketResearch = ({ mission, onClose }: MarketResearchProps) => {
  const { completeObjective, completeMission } = useGameState();
  
  // Mission state variables
  const [currentStep, setCurrentStep] = useState(0);
  const [researchPlan, setResearchPlan] = useState({
    primaryMethods: [] as string[],
    secondaryMethods: [] as string[],
    qualitativeMethods: [] as string[],
    quantitativeMethods: [] as string[],
    samplingMethod: '',
    dataAnalysisMethod: '',
    presentationComplete: false
  });
  
  // Research method options
  const primaryResearchMethods = [
    'Surveys', 'Interviews', 'Focus Groups', 'Observations', 'Experiments'
  ];
  
  const secondaryResearchMethods = [
    'Industry Reports', 'Government Data', 'Academic Journals', 
    'Company Records', 'Competitor Analysis'
  ];
  
  const qualitativeResearchMethods = [
    'In-depth Interviews', 'Open-ended Surveys', 'Participant Observation',
    'Case Studies', 'Content Analysis'
  ];
  
  const quantitativeResearchMethods = [
    'Structured Surveys', 'Experiments', 'Statistical Analysis',
    'A/B Testing', 'Big Data Analytics'
  ];
  
  const samplingMethods = [
    'Random Sampling', 'Stratified Sampling', 'Cluster Sampling',
    'Convenience Sampling', 'Judgmental Sampling'
  ];
  
  const dataAnalysisMethods = [
    'Statistical Analysis', 'Thematic Analysis', 'Content Analysis',
    'Regression Analysis', 'Cluster Analysis', 'Factor Analysis'
  ];
  
  // Helper functions for research plan selection
  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    } else {
      return [...array, item];
    }
  };
  
  const handleToggleMethod = (methodType: keyof typeof researchPlan, method: string) => {
    if (typeof researchPlan[methodType] === 'string') {
      // For single selection fields
      setResearchPlan(prev => ({ ...prev, [methodType]: method }));
    } else {
      // For array selection fields
      setResearchPlan(prev => ({
        ...prev,
        [methodType]: toggleArrayItem(prev[methodType] as string[], method)
      }));
    }
  };
  
  // Content steps for the market research mission
  const steps = [
    // Step 1: Brief introduction
    <div key="step1" className="space-y-4">
      <h3 className="text-xl font-bold mb-4 text-yellow-400">Market Research Brief</h3>
      
      <p className="mb-4">
        Professor Jenkins has given you a research brief for ThriveTech's new smart home device. 
        The company wants to understand consumer preferences and market potential before full development.
      </p>
      
      <div className="p-4 bg-gray-800 rounded-md my-4">
        <h4 className="font-bold text-green-400 mb-2">Research Objective:</h4>
        <p className="text-white">
          Assess market demand, consumer preferences, and willingness to pay for a new 
          AI-powered smart home assistant that integrates with existing household devices.
        </p>
      </div>
      
      <p className="mb-4">
        Your task is to design a comprehensive market research plan using concepts from 
        Chapter 3 of the "Fundamentals of Marketing" textbook by Baines.
      </p>
      
      <div className="rounded-md p-4 bg-gray-800 mt-4">
        <h4 className="font-bold text-green-400 mb-2">Marketing Concept:</h4>
        <p>
          <span className="font-bold">Market Research</span> is the process of gathering, analyzing, 
          and interpreting information about a market, about a product or service to be offered 
          for sale in that market, and about potential customers.
        </p>
      </div>
    </div>,
    
    // Step 2: Primary Research Methods
    <div key="step2" className="space-y-4">
      <h3 className="text-xl font-bold mb-4 text-yellow-400">Primary Research Methods</h3>
      
      <p className="mb-4">
        Primary research involves collecting original data specifically for your current research need.
        Select which primary research methods would be most appropriate for this project.
      </p>
      
      <div className="rounded-md p-4 bg-gray-800 my-4">
        <h4 className="font-bold text-green-400 mb-2">Marketing Concept:</h4>
        <p>
          <span className="font-bold">Primary Research</span> gathers first-hand information directly from 
          sources and is tailored to address specific research questions, but tends to be more 
          expensive and time-consuming than secondary research.
        </p>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
        {primaryResearchMethods.map(method => (
          <button
            key={method}
            onClick={() => handleToggleMethod('primaryMethods', method)}
            className={`p-2 rounded border ${
              researchPlan.primaryMethods.includes(method)
                ? 'bg-blue-600 border-blue-400 text-white'
                : 'bg-gray-700 border-gray-600 text-gray-300'
            }`}
          >
            {method}
          </button>
        ))}
      </div>
      
      {researchPlan.primaryMethods.length === 0 && (
        <p className="text-red-400 text-sm mt-2">Please select at least one primary research method</p>
      )}
    </div>,
    
    // Step 3: Secondary Research Methods
    <div key="step3" className="space-y-4">
      <h3 className="text-xl font-bold mb-4 text-yellow-400">Secondary Research Methods</h3>
      
      <p className="mb-4">
        Secondary research uses existing data that was collected for other purposes.
        Select which secondary research methods would complement your primary research.
      </p>
      
      <div className="rounded-md p-4 bg-gray-800 my-4">
        <h4 className="font-bold text-green-400 mb-2">Marketing Concept:</h4>
        <p>
          <span className="font-bold">Secondary Research</span> utilizes existing data collected 
          for previous purposes. It's typically faster and less expensive than primary research 
          but may not address specific research questions as precisely.
        </p>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
        {secondaryResearchMethods.map(method => (
          <button
            key={method}
            onClick={() => handleToggleMethod('secondaryMethods', method)}
            className={`p-2 rounded border ${
              researchPlan.secondaryMethods.includes(method)
                ? 'bg-green-600 border-green-400 text-white'
                : 'bg-gray-700 border-gray-600 text-gray-300'
            }`}
          >
            {method}
          </button>
        ))}
      </div>
    </div>,
    
    // Step 4: Qualitative vs Quantitative
    <div key="step4" className="space-y-4">
      <h3 className="text-xl font-bold mb-4 text-yellow-400">Qualitative & Quantitative Methods</h3>
      
      <p className="mb-4">
        Both qualitative and quantitative research approaches have their strengths.
        Select methods from each category that would be valuable for this project.
      </p>
      
      <div className="rounded-md p-4 bg-gray-800 my-4">
        <h4 className="font-bold text-green-400 mb-2">Marketing Concept:</h4>
        <p className="mb-2">
          <span className="font-bold">Qualitative Research</span> explores underlying reasons, opinions, 
          and motivations, providing depth and insight but with smaller sample sizes.
        </p>
        <p>
          <span className="font-bold">Quantitative Research</span> collects numerical data that can be 
          transformed into usable statistics and typically involves larger sample sizes.
        </p>
      </div>
      
      <div className="mt-6">
        <h4 className="font-medium text-purple-300 mb-2">Qualitative Methods:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          {qualitativeResearchMethods.map(method => (
            <button
              key={method}
              onClick={() => handleToggleMethod('qualitativeMethods', method)}
              className={`p-2 rounded border ${
                researchPlan.qualitativeMethods.includes(method)
                  ? 'bg-purple-600 border-purple-400 text-white'
                  : 'bg-gray-700 border-gray-600 text-gray-300'
              }`}
            >
              {method}
            </button>
          ))}
        </div>
        
        <h4 className="font-medium text-blue-300 mb-2">Quantitative Methods:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {quantitativeResearchMethods.map(method => (
            <button
              key={method}
              onClick={() => handleToggleMethod('quantitativeMethods', method)}
              className={`p-2 rounded border ${
                researchPlan.quantitativeMethods.includes(method)
                  ? 'bg-blue-600 border-blue-400 text-white'
                  : 'bg-gray-700 border-gray-600 text-gray-300'
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>
    </div>,
    
    // Step 5: Sampling and Data Analysis
    <div key="step5" className="space-y-4">
      <h3 className="text-xl font-bold mb-4 text-yellow-400">Sampling & Data Analysis</h3>
      
      <p className="mb-4">
        Select an appropriate sampling method and data analysis approach for your research.
      </p>
      
      <div className="mt-6">
        <h4 className="font-medium text-yellow-300 mb-2">Sampling Method:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
          {samplingMethods.map(method => (
            <button
              key={method}
              onClick={() => handleToggleMethod('samplingMethod', method)}
              className={`p-2 rounded border ${
                researchPlan.samplingMethod === method
                  ? 'bg-yellow-600 border-yellow-400 text-white'
                  : 'bg-gray-700 border-gray-600 text-gray-300'
              }`}
            >
              {method}
            </button>
          ))}
        </div>
        
        <h4 className="font-medium text-green-300 mb-2">Data Analysis Method:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {dataAnalysisMethods.map(method => (
            <button
              key={method}
              onClick={() => handleToggleMethod('dataAnalysisMethod', method)}
              className={`p-2 rounded border ${
                researchPlan.dataAnalysisMethod === method
                  ? 'bg-green-600 border-green-400 text-white'
                  : 'bg-gray-700 border-gray-600 text-gray-300'
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>
    </div>,
    
    // Step 6: Review and Present
    <div key="step6" className="space-y-4">
      <h3 className="text-xl font-bold mb-4 text-yellow-400">Research Plan Review</h3>
      
      <p className="mb-4">
        Review your market research plan below. When you're ready, present it to Professor Jenkins.
      </p>
      
      <div className="p-4 bg-gray-800 rounded-md space-y-4 mb-6">
        <div>
          <h4 className="text-sm text-gray-400">Primary Research Methods:</h4>
          {researchPlan.primaryMethods.length > 0 ? (
            <div className="flex flex-wrap gap-1 mt-1">
              {researchPlan.primaryMethods.map(method => (
                <span key={method} className="px-2 py-1 bg-blue-900 text-blue-200 rounded-full text-xs">
                  {method}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-red-400">None selected</p>
          )}
        </div>
        
        <div>
          <h4 className="text-sm text-gray-400">Secondary Research Methods:</h4>
          {researchPlan.secondaryMethods.length > 0 ? (
            <div className="flex flex-wrap gap-1 mt-1">
              {researchPlan.secondaryMethods.map(method => (
                <span key={method} className="px-2 py-1 bg-green-900 text-green-200 rounded-full text-xs">
                  {method}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">None selected</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm text-gray-400">Qualitative Methods:</h4>
            {researchPlan.qualitativeMethods.length > 0 ? (
              <div className="flex flex-wrap gap-1 mt-1">
                {researchPlan.qualitativeMethods.map(method => (
                  <span key={method} className="px-2 py-1 bg-purple-900 text-purple-200 rounded-full text-xs">
                    {method}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">None selected</p>
            )}
          </div>
          
          <div>
            <h4 className="text-sm text-gray-400">Quantitative Methods:</h4>
            {researchPlan.quantitativeMethods.length > 0 ? (
              <div className="flex flex-wrap gap-1 mt-1">
                {researchPlan.quantitativeMethods.map(method => (
                  <span key={method} className="px-2 py-1 bg-blue-900 text-blue-200 rounded-full text-xs">
                    {method}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">None selected</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm text-gray-400">Sampling Method:</h4>
            <p className="text-white">{researchPlan.samplingMethod || "Not specified"}</p>
          </div>
          
          <div>
            <h4 className="text-sm text-gray-400">Data Analysis Method:</h4>
            <p className="text-white">{researchPlan.dataAnalysisMethod || "Not specified"}</p>
          </div>
        </div>
      </div>
      
      {!researchPlan.presentationComplete ? (
        <button
          onClick={() => {
            setResearchPlan(prev => ({ ...prev, presentationComplete: true }));
            completeObjective('market_research', 'present-findings');
          }}
          className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-md font-bold text-white transition"
          disabled={!isFormComplete()}
          style={{ opacity: isFormComplete() ? 1 : 0.5 }}
        >
          Present Research Plan
        </button>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-green-900 border border-green-600 rounded-md">
            <h4 className="font-bold text-green-300 mb-2">Presentation Successful!</h4>
            <p className="text-green-100">
              Professor Jenkins is impressed with your thorough research plan. He particularly 
              appreciates your choice of {researchPlan.primaryMethods[0]} as a primary research method 
              and your {researchPlan.samplingMethod.toLowerCase()} approach to ensure representative data.
            </p>
          </div>
          
          <button
            onClick={() => {
              completeMission('market_research');
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
  
  // Check if form is complete for current step
  function isCurrentStepComplete() {
    switch (currentStep) {
      case 0: return true; // intro step
      case 1: return researchPlan.primaryMethods.length > 0;
      case 2: return true; // secondary methods are optional
      case 3: return researchPlan.qualitativeMethods.length > 0 || researchPlan.quantitativeMethods.length > 0;
      case 4: return !!researchPlan.samplingMethod && !!researchPlan.dataAnalysisMethod;
      default: return true;
    }
  }
  
  // Check if entire form is complete
  function isFormComplete() {
    return researchPlan.primaryMethods.length > 0 &&
           (researchPlan.qualitativeMethods.length > 0 || researchPlan.quantitativeMethods.length > 0) &&
           !!researchPlan.samplingMethod && 
           !!researchPlan.dataAnalysisMethod;
  }
  
  // Handle next step
  const handleNext = () => {
    if (currentStep < steps.length - 1 && isCurrentStepComplete()) {
      setCurrentStep(currentStep + 1);
      
      // Complete objectives based on steps
      if (currentStep === 0) {
        completeObjective('market_research', 'review-brief');
      } else if (currentStep === 3) {
        completeObjective('market_research', 'complete-research');
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
            <span>Research Plan Development</span>
            <span>{currentStep + 1} of {steps.length}</span>
          </div>
          <div className="w-full h-1 bg-gray-700">
            <div 
              className="h-full" 
              style={{ 
                width: `${((currentStep + 1) / steps.length) * 100}%`,
                backgroundColor: 'var(--primary)',
                transition: 'width 0.3s ease'
              }}
            ></div>
          </div>
        </div>
        
        {/* Current step content */}
        <div className="terminal-text mb-8 leading-relaxed text-gray-200">
          {steps[currentStep]}
        </div>
        
        {/* Navigation buttons (not shown on the final review screen if presentation is done) */}
        {!(currentStep === steps.length - 1 && researchPlan.presentationComplete) && (
          <div className="flex justify-between mt-6">
            <button
              className="retro-button bg-gray-700 text-white px-4 py-2"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              style={{ opacity: currentStep === 0 ? 0.5 : 1 }}
            >
              Previous
            </button>
            
            {currentStep < steps.length - 1 && (
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

export default MarketResearch;