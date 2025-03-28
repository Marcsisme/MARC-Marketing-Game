import { DialogueNode } from '../types/game';

export const dialogues: DialogueNode[] = [
  // Game Introduction dialogue
  {
    id: 'game-intro',
    character: 'Professor Jenkins',
    text: "Welcome to M.A.R.C., the Marketing Advanced Research Console! I'm Professor Jenkins, and I'll be your guide in this educational adventure through the world of marketing. Click on characters and objects to interact with them, and follow your objectives in the top-right corner.",
    options: [
      { id: 'game-intro-1', text: "Thanks! What should I do first?", nextDialogue: 'game-intro-2' },
      { id: 'game-intro-2', text: "Is there a tutorial I can try?", nextDialogue: 'game-intro-2' }
    ]
  },
  {
    id: 'game-intro-2',
    character: 'Professor Jenkins',
    text: "I'd recommend starting with our interactive tutorial. It will teach you all the basic controls and concepts you need to know. After that, your first mission will involve analyzing market orientation using concepts from Chapter 1 of your marketing textbook.",
    options: [
      { id: 'game-intro-2-1', text: "Let's start the tutorial", nextDialogue: '', effect: { type: 'startMission', value: 'game_intro' } },
      { id: 'game-intro-2-2', text: "I'd rather jump right into the game", nextDialogue: 'game-intro-3' }
    ]
  },
  {
    id: 'game-intro-3',
    character: 'Professor Jenkins',
    text: "Eager to start, I see! If you ever need help, just click the M.A.R.C. button at the bottom of the screen. Remember that your objective is to learn marketing concepts while completing missions. Your first mission will be about market orientation with ThriveTech.",
    options: [
      { id: 'game-intro-3-1', text: "I'll find Professor Smith to start my mission", nextDialogue: '', effect: { type: 'completeObjective', value: 'meet-professor-jenkins' } }
    ]
  },
  {
    id: 'game-intro-complete',
    character: 'Professor Jenkins',
    text: "Excellent! Now that you've completed the tutorial, you're ready to tackle your first real marketing challenge. Head to the office area to meet with Professor Smith who will brief you on the market orientation mission with ThriveTech.",
    options: [
      { id: 'game-intro-complete-1', text: "I'll go find Professor Smith now", nextDialogue: '', effect: { type: 'completeObjective', value: 'complete-tutorial' } }
    ]
  },
  
  // Intro dialogue
  {
    id: 'intro_1',
    character: 'Professor Smith',
    text: "Ah, there you are! I've been looking all over for you. As a second-year communication student, it's time for your big challenge: launching a real marketing campaign for a real client! I'll be your mentor for this experience.",
    options: [
      { id: 'intro_1_1', text: "I'm ready for this challenge!", nextDialogue: 'intro_2' },
      { id: 'intro_1_2', text: "What exactly will I be doing?", nextDialogue: 'intro_1_explain' },
      { id: 'intro_1_3', text: "I'm a bit nervous about working with real clients...", nextDialogue: 'intro_1_nervous' }
    ]
  },
  {
    id: 'intro_1_explain',
    character: 'Professor Smith',
    text: "You'll be analyzing ThriveTech, a software company, to determine if they're truly market-oriented as defined in Chapter 1 of your textbook. You'll gather evidence by talking to employees, examining documents, and observing their operations. Then you'll prepare a report on your findings.",
    options: [
      { id: 'intro_1_explain_1', text: "That sounds interesting. I'm ready!", nextDialogue: 'intro_2' },
      { id: 'intro_1_explain_2', text: "What is market orientation again?", nextDialogue: 'intro_1_market_orientation' }
    ]
  },
  {
    id: 'intro_1_market_orientation',
    character: 'Professor Smith',
    text: "Market orientation is a business approach where all decisions are driven by customer needs and market information. According to the Baines textbook, it involves gathering customer insights, sharing this information across departments, and responding to it. It's contrasted with product orientation, which focuses on features rather than customer needs.",
    options: [
      { id: 'intro_1_market_1', text: "That makes sense. I'll look for evidence of this at ThriveTech.", nextDialogue: 'intro_2' }
    ]
  },
  {
    id: 'intro_1_nervous',
    character: 'Professor Smith',
    text: "It's natural to be nervous, but remember this is a learning experience. You'll develop real-world skills while applying marketing concepts from your textbook. Plus, you'll have M.A.R.C. to help you, and I'll be available for guidance throughout the process.",
    options: [
      { id: 'intro_1_nervous_1', text: "That's reassuring. I'll do my best!", nextDialogue: 'intro_2' },
      { id: 'intro_1_nervous_2', text: "Who or what is M.A.R.C.?", nextDialogue: 'intro_marc_explain' }
    ]
  },
  {
    id: 'intro_marc_explain',
    character: 'Professor Smith',
    text: "M.A.R.C. stands for Marketing Advanced Research Console. It's an AI assistant programmed with marketing knowledge from textbooks like Baines'. M.A.R.C. can answer questions about marketing concepts, though be warned - it has a rather... cynical view of the industry. Still, its information is accurate.",
    options: [
      { id: 'intro_marc_explain_1', text: "Sounds like an interesting helper! Let's continue.", nextDialogue: 'intro_2' }
    ]
  },
  {
    id: 'intro_2',
    character: 'Professor Smith',
    text: "Excellent! Or... well, it doesn't matter if you're ready or not. The client meeting is tomorrow. But don't worry, you'll have help from our new AI system: M.A.R.C., the Marketing Advanced Research Console.",
    options: [
      { id: 'intro_2_1', text: "An AI assistant? That sounds helpful!", nextDialogue: 'intro_3' },
      { id: 'intro_2_2', text: "Is this AI actually reliable?", nextDialogue: 'intro_3' }
    ]
  },
  {
    id: 'intro_3',
    character: 'Professor Smith',
    text: "M.A.R.C. is... well, let's just say he has a unique personality. He's programmed with all the latest marketing theories, but he's also a bit... how should I put it... cynical about the industry. Still, his insights are valuable... mostly.",
    options: [
      { id: 'intro_3_1', text: "Let me meet this M.A.R.C. then.", nextDialogue: 'intro_marc_1', effect: { type: 'addItem', value: 'marc_access_card' } },
    ]
  },
  {
    id: 'intro_marc_1',
    character: 'M.A.R.C.',
    text: "SYSTEM INITIALIZING... LOADING MARKETING STRATEGIES... IDENTIFYING TARGET DEMOGRAPHICS... PREPARING MEANINGLESS BUZZWORDS...",
    isMarcResponse: true,
    options: [
      { id: 'intro_marc_1_1', text: "Hello?", nextDialogue: 'intro_marc_2' }
    ]
  },
  {
    id: 'intro_marc_2',
    character: 'M.A.R.C.',
    text: "Oh great, another bright-eyed student ready to learn how to manipulate the masses through carefully crafted messaging. I'm M.A.R.C., your Marketing Advanced Research Console. Think of me as your guide to the dark arts of making people buy things they don't need.",
    isMarcResponse: true,
    options: [
      { id: 'intro_marc_2_1', text: "That's not what marketing is about!", nextDialogue: 'intro_marc_3' },
      { id: 'intro_marc_2_2', text: "Sounds like you really understand the industry.", nextDialogue: 'intro_marc_3' }
    ]
  },
  {
    id: 'intro_marc_3',
    character: 'M.A.R.C.',
    text: "Isn't it though? *sigh* Fine, let's pretend it's about 'building relationships with customers' and 'creating value.' Your first mission is to determine if your client's company is truly market-oriented or just pretending to be. The professor wants to see if you can tell the difference.",
    isMarcResponse: true,
    options: [
      { id: 'intro_marc_3_1', text: "What's market orientation?", nextDialogue: 'intro_marc_4' },
      { id: 'intro_marc_3_2', text: "How do I tell the difference?", nextDialogue: 'intro_marc_4' }
    ]
  },
  {
    id: 'intro_marc_4',
    character: 'M.A.R.C.',
    text: "Market orientation means the company genuinely focuses on customer needs rather than just trying to sell whatever they make. The clues are everywhere - in how they talk, what they prioritize, and how departments communicate. Look for evidence and then make your judgment. Just don't expect a gold star for honesty if the client isn't market-oriented. Sometimes people prefer comforting lies.",
    isMarcResponse: true,
    options: [
      { id: 'intro_marc_4_1', text: "I'll find the truth!", nextDialogue: '', effect: { type: 'startMission', value: 'market_orientation' } }
    ]
  },
  
  // Whiteboard dialogue
  {
    id: 'whiteboard_1',
    character: 'You',
    text: "This whiteboard is covered with marketing jargon and buzzwords. There's a chart that seems to show customer satisfaction declining while executive bonuses increase.",
    options: [
      { id: 'whiteboard_1_1', text: "Take a closer look at the chart", nextDialogue: 'whiteboard_2' },
      { id: 'whiteboard_1_2', text: "Step away from the whiteboard", nextDialogue: '' }
    ]
  },
  {
    id: 'whiteboard_2',
    character: 'You',
    text: "The chart is labeled 'Key Performance Indicators'. There's a note that says 'Remember, if customers complain, reframe it as product feedback and ignore it.' Interesting...",
    options: [
      { id: 'whiteboard_2_1', text: "Take a photo as evidence", nextDialogue: '', effect: { type: 'addItem', value: 'whiteboard_photo' } },
      { id: 'whiteboard_2_2', text: "Leave it", nextDialogue: '' }
    ]
  },
  
  // Coffee machine dialogue
  {
    id: 'coffee_machine_1',
    character: 'You',
    text: "A fancy coffee machine with dozens of buttons and options. It's currently making weird gurgling noises.",
    options: [
      { id: 'coffee_machine_1_1', text: "Try to make a coffee", nextDialogue: 'coffee_machine_2' },
      { id: 'coffee_machine_1_2', text: "Step away slowly", nextDialogue: '' }
    ]
  },
  {
    id: 'coffee_machine_2',
    character: 'You',
    text: "You press several buttons randomly. After much hissing and steaming, the machine produces something that vaguely resembles coffee.",
    options: [
      { id: 'coffee_machine_2_1', text: "Take the coffee", nextDialogue: '', effect: { type: 'addItem', value: 'coffee' } },
      { id: 'coffee_machine_2_2', text: "Leave it, that doesn't look safe", nextDialogue: '' }
    ]
  },
  
  // Client dialogue
  {
    id: 'client_1',
    character: 'Mr. Thompson',
    text: "Ah, you must be the marketing student I've heard about! I'm Mr. Thompson, CEO of ThriveTech. We make productivity software that nobody asked for but everyone will buy because we say they need it! Ha ha!",
    options: [
      { id: 'client_1_1', text: "Nice to meet you. How do you determine what features to add to your products?", nextDialogue: 'client_2' },
      { id: 'client_1_2', text: "Hello! How often do you collect customer feedback?", nextDialogue: 'client_2' }
    ]
  },
  {
    id: 'client_2',
    character: 'Mr. Thompson',
    text: "Customers? Oh, we don't bother them with questions. Our engineering team knows what's best! We add features that look good in press releases and marketing materials. Speaking of which, we need you to create a campaign for our newest product. It's a revolutionary... um... thing that does... stuff.",
    options: [
      { id: 'client_2_1', text: "But what problem does it solve for customers?", nextDialogue: 'client_3' },
      { id: 'client_2_2', text: "Can you tell me more about your target audience?", nextDialogue: 'client_3' }
    ]
  },
  {
    id: 'client_3',
    character: 'Mr. Thompson',
    text: "Problems? Audience? You marketing people and your endless questions! Our target is anyone with money to spend! And the problem it solves is... um... not having our product! Look, just make it sound exciting and innovative. Use words like 'disruptive' and 'paradigm-shifting'.",
    options: [
      { id: 'client_3_1', text: "I think I understand your approach now. Thank you.", nextDialogue: '', effect: { type: 'completeObjective', value: 'identify_orientation' } },
      { id: 'client_3_2', text: "One more thing - do you have any market research I could look at?", nextDialogue: 'client_4' }
    ]
  },
  {
    id: 'client_4',
    character: 'Mr. Thompson',
    text: "Market research? Oh, we did that once. Turns out people wanted things that were too expensive to build! So now we just make what we want and tell people it's what they need. Much simpler that way.",
    options: [
      { id: 'client_4_1', text: "I see. Thank you for your time.", nextDialogue: '', effect: { type: 'completeObjective', value: 'identify_orientation' } }
    ]
  },
  
  // Intern dialogue
  {
    id: 'intern_1',
    character: 'Intern',
    text: "Oh! You startled me. I'm just the intern here. Been working 60-hour weeks for 'exposure' and 'experience.' You know how it is.",
    options: [
      { id: 'intern_1_1', text: "How does the company treat its customers?", nextDialogue: 'intern_2' },
      { id: 'intern_1_2', text: "What's it like working here?", nextDialogue: 'intern_2' }
    ]
  },
  {
    id: 'intern_2',
    character: 'Intern',
    text: "Honestly? The company motto might be 'Customers First,' but behind closed doors, it's all about quarterly numbers. I once suggested we do a customer survey and got laughed out of the room. They said, 'We tell customers what they want, not the other way around.'",
    options: [
      { id: 'intern_2_1', text: "That's valuable information, thank you.", nextDialogue: '', effect: { type: 'completeObjective', value: 'gather_employee_insight' } },
      { id: 'intern_2_2', text: "Is there any documentation that might help my research?", nextDialogue: 'intern_3' }
    ]
  },
  {
    id: 'intern_3',
    character: 'Intern',
    text: "Well... don't tell anyone I gave you this, but here's an internal memo about the company's 'customer strategy.' It's pretty revealing. Just don't say you got it from me, or I'll lose this amazing opportunity to work for free.",
    options: [
      { id: 'intern_3_1', text: "Thank you, I'll keep your name out of it.", nextDialogue: '', effect: { type: 'addItem', value: 'internal_memo' } }
    ]
  },
  
  // Analyze evidence dialogue
  {
    id: 'analyze_evidence_1',
    character: 'You',
    text: "Now that I've gathered evidence about ThriveTech's approach to customers, I need to analyze if they're truly market-oriented.",
    options: [
      { id: 'analyze_evidence_1_1', text: "Review the evidence", nextDialogue: 'analyze_evidence_2', requiresItem: 'internal_memo' },
      { id: 'analyze_evidence_1_2', text: "I need more information first", nextDialogue: '' }
    ]
  },
  {
    id: 'analyze_evidence_2',
    character: 'You',
    text: "Based on my conversations with the CEO, the intern, and the internal memo, it seems clear that ThriveTech is not market-oriented. They develop products without customer input and focus on selling rather than solving problems.",
    options: [
      { id: 'analyze_evidence_2_1', text: "Prepare a report stating they're product-oriented, not market-oriented", nextDialogue: 'analyze_evidence_3' },
      { id: 'analyze_evidence_2_2', text: "Prepare a flattering report claiming they're market-oriented", nextDialogue: 'analyze_evidence_4' }
    ]
  },
  {
    id: 'analyze_evidence_3',
    character: 'You',
    text: "You've prepared an honest assessment of ThriveTech's orientation. While they claim to be customer-focused, the evidence suggests they're primarily product-oriented, focusing on what they can make rather than what customers need.",
    options: [
      { id: 'analyze_evidence_3_1', text: "Submit the honest report", nextDialogue: '', effect: { type: 'completeObjective', value: 'prepare_report' } }
    ]
  },
  {
    id: 'analyze_evidence_4',
    character: 'You',
    text: "You've prepared a glowing but dishonest report about ThriveTech's market orientation. It ignores the evidence and instead praises their 'innovative approach' to customer needs.",
    options: [
      { id: 'analyze_evidence_4_1', text: "Submit the misleading report", nextDialogue: '', effect: { type: 'completeObjective', value: 'prepare_report' } }
    ]
  },
  
  // Mission completion dialogue
  {
    id: 'mission_complete_1',
    character: 'Professor Smith',
    text: "I've reviewed your analysis of ThriveTech's market orientation. Very interesting findings! It takes courage to present an honest assessment, especially when it might not be what the client wants to hear.",
    options: [
      { id: 'mission_complete_1_1', text: "Thank you, Professor.", nextDialogue: 'mission_complete_2' },
      { id: 'mission_complete_1_2', text: "I just followed the evidence.", nextDialogue: 'mission_complete_2' }
    ]
  },
  {
    id: 'mission_complete_2',
    character: 'Professor Smith',
    text: "That's what good marketing professionals do - they provide honest insights, even when uncomfortable. Your next challenge will involve the 4Ps of marketing. But before that, I think M.A.R.C. has something to say about your work.",
    options: [
      { id: 'mission_complete_2_1', text: "I'd like to hear M.A.R.C.'s thoughts.", nextDialogue: 'mission_complete_marc' }
    ]
  },
  {
    id: 'mission_complete_marc',
    character: 'M.A.R.C.',
    text: "Well, well, well. Look who completed their first mission without completely embarrassing themselves. I'd say I'm impressed, but my programming prevents me from giving insincere compliments. Let's just say you met the bare minimum requirements. Ready for something more challenging, or should we stick to finger painting?",
    isMarcResponse: true,
    options: [
      { id: 'mission_complete_marc_1', text: "I'm ready for the next challenge!", nextDialogue: '', effect: { type: 'completeMission', value: 'market_orientation' } }
    ]
  },
];
