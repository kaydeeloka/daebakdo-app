import React, { useState } from 'react';
import { Scenario, GameTopic } from './types';
import { scenarios } from './data/scenario';

// Data Imports (New Skill Categories)
import { FOOD_GAME_TOPICS } from './data/PuzzlesFood';
import { NUMBER_GAME_TOPICS } from './data/PuzzlesNumber';
import { TRANSPORT_GAME_TOPICS } from './data/PuzzlesTransportation';
import { ESSENTIAL_WORDS_GAME_TOPICS } from './data/PuzzlesWord';

// Components
import { ScenarioGameView } from './components/ScenarioGameView';
import { GameplayScreen } from './components/GameplayScreen';
import { GameOverScreen } from './components/GameOverlay';
import { GameTopicScreen, TopicItem } from './components/GameTopicScreen'; 

// Icons
import { 
  Home, Gamepad2, User, BookAIcon, Play
} from 'lucide-react';

type Tab = 'home' | 'learn' | 'game' | 'profile';
type GameMode = 'SCENARIO' | 'QUIZ' | null;

// The available categories visible on the main Game Dashboard
type BrowseCategory = 'SCENARIO' | 'FOOD' | 'TRANSPORT' | 'WORD' | 'NUMBER' | null;

const App: React.FC = () => {
  // --- Navigation State ---
  const [activeTab, setActiveTab] = useState<Tab>('home');
  
  // --- Game Selection State ---
  // browseCategory determines which LIST of items we are viewing (e.g. List of Food topics)
  const [browseCategory, setBrowseCategory] = useState<BrowseCategory>(null);
  
  // gameMode determines if we are actively PLAYING a game (Scenario view or Quiz view)
  const [gameMode, setGameMode] = useState<GameMode>(null);
  
  // Scenario State
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(scenarios.coffee);
  
  // Quiz State
  const [selectedTopic, setSelectedTopic] = useState<GameTopic | null>(null);
  const [quizLevelIndex, setQuizLevelIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizGameOver, setQuizGameOver] = useState(false);

  // --- Handlers ---

  const handleStartScenario = (scenarioId: string) => {
    const scen = scenarios[scenarioId];
    if (scen) {
      setSelectedScenario(scen);
      setGameMode('SCENARIO');
    }
  };

  const handleStartQuiz = (topic: GameTopic) => {
    setSelectedTopic(topic);
    setQuizLevelIndex(0);
    setQuizScore(0);
    setQuizGameOver(false);
    setGameMode('QUIZ');
  };

  const handleQuizLevelComplete = (success: boolean) => {
    if (success) {
      setQuizScore(prev => prev + 1);
    }
    
    if (selectedTopic && quizLevelIndex < selectedTopic.levels.length - 1) {
      setQuizLevelIndex(prev => prev + 1);
    } else {
      setQuizGameOver(true);
    }
  };

  const handleQuizRestart = () => {
    setQuizLevelIndex(0);
    setQuizScore(0);
    setQuizGameOver(false);
  };

  const handleExitGame = () => {
    setGameMode(null);
    // Note: We stay in the "Game" tab, just return to browsing
  };

  // --- DATA PREPARATION FOR MENUS ---

  // 1. Root Dashboard Items (The Main Menu)
  const rootCategories: TopicItem[] = [
    {
      id: 'cat_scenario',
      title: 'Roleplay Scenarios',
      subtitle: 'Real-world conversations',
      icon: 'scenario_cat', 
      onClick: () => setBrowseCategory('SCENARIO')
    },
    {
      id: 'cat_food',
      title: 'Food & Dining',
      subtitle: 'Ingredients, dishes, and ordering',
      icon: 'cat_food',
      onClick: () => setBrowseCategory('FOOD')
    },
    {
      id: 'cat_transport',
      title: 'Transportation',
      subtitle: 'Getting around town',
      icon: 'cat_transport',
      onClick: () => setBrowseCategory('TRANSPORT')
    },
    {
      id: 'cat_word',
      title: 'Essential Words',
      subtitle: 'Common phrases & vocabulary',
      icon: 'cat_word',
      onClick: () => setBrowseCategory('WORD')
    },
    {
      id: 'cat_number',
      title: 'Numbers',
      subtitle: 'Counting, money, and time',
      icon: 'cat_number',
      onClick: () => setBrowseCategory('NUMBER')
    }
  ];

  // 2. Helper to generate Topic items from Data Files
  const getSkillItems = (topics: GameTopic[]): TopicItem[] => {
    return topics.map(topic => ({
      id: topic.id,
      title: topic.name,
      subtitle: topic.description,
      icon: topic.icon, 
      progress: { current: 0, total: topic.levels.length },
      onClick: () => handleStartQuiz(topic)
    }));
  };

  // 3. Scenario Items List
  const scenarioItems: TopicItem[] = Object.values(scenarios).map(scen => ({
    id: scen.id,
    title: scen.title,
    subtitle: scen.description,
    icon: scen.icon,
    progress: { current: 0, total: 1 }, 
    onClick: () => handleStartScenario(scen.id)
  }));


  // --- RENDERERS ---

  const renderHome = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-light-bg text-center space-y-6">
      <div className="space-y-2 animate-fadeInScaleUp">
        <h1 className="text-4xl font-bold text-dark-text font-korean">Welcome!</h1>
        <p className="text-gray-500 text-lg">Ready to exercise your brain today?</p>
      </div>
      
      <div className="w-full max-w-xs space-y-4">
        <button 
          onClick={() => setActiveTab('game')}
          className="w-full bg-primary text-white p-4 rounded-2xl font-bold shadow-lg shadow-orange-500/30 flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          <Play className="fill-current" />
          Start Playing
        </button>
      </div>
    </div>
  );

  const renderGameTab = () => {
    // A. GAMEPLAY VIEW (Active Mode)
    // ------------------------------
    if (gameMode === 'SCENARIO') {
      return (
        <ScenarioGameView 
          scenario={selectedScenario} 
          onExit={handleExitGame} 
        />
      );
    }
    
    if (gameMode === 'QUIZ' && selectedTopic) {
      if (quizGameOver) {
        return (
          <GameOverScreen 
            correctCount={quizScore} 
            totalLevels={selectedTopic.levels.length} 
            onRestart={handleQuizRestart}
          />
        );
      }
      return (
        <GameplayScreen
          levels={selectedTopic.levels}
          currentLevelIndex={quizLevelIndex}
          topicName={selectedTopic.name}
          onLevelComplete={handleQuizLevelComplete}
          onExit={handleExitGame}
        />
      );
    }

    // B. CATEGORY BROWSING (Sub-menus)
    // --------------------------------
    if (browseCategory) {
      let items: TopicItem[] = [];
      let title = "";
      let subtitle = "";

      switch (browseCategory) {
        case 'SCENARIO':
          items = scenarioItems;
          title = "Roleplay Scenarios";
          subtitle = "Practice real-life conversations";
          break;
        case 'FOOD':
          items = getSkillItems(FOOD_GAME_TOPICS);
          title = "Food & Dining";
          subtitle = "Choose a specific topic";
          break;
        case 'TRANSPORT':
          items = getSkillItems(TRANSPORT_GAME_TOPICS);
          title = "Transportation";
          subtitle = "Choose a specific topic";
          break;
        case 'WORD':
          items = getSkillItems(ESSENTIAL_WORDS_GAME_TOPICS);
          title = "Essential Words";
          subtitle = "Choose a specific topic";
          break;
        case 'NUMBER':
          items = getSkillItems(NUMBER_GAME_TOPICS);
          title = "Numbers";
          subtitle = "Choose a specific topic";
          break;
      }

      return (
        <GameTopicScreen 
          title={title}
          subtitle={subtitle}
          items={items}
          onBack={() => setBrowseCategory(null)}
        />
      );
    }

    // C. ROOT DASHBOARD (Main Menu)
    // -----------------------------
    return (
      <GameTopicScreen
        title="Game Mode"
        subtitle="Select a way to play"
        items={rootCategories}
      />
    );
  };

  const renderProfile = () => (
    <div className="flex-1 flex flex-col items-center justify-center bg-light-bg p-6 text-center animate-subtleFloat">
      <div className="w-20 h-20 bg-neutral-bg rounded-full flex items-center justify-center mb-4 text-gray-400 border-2 border-border">
        <User size={40} />
      </div>
      <h2 className="text-xl font-bold text-dark-text font-korean">Player Profile</h2>
      <p className="text-gray-500 mt-2">Stats and progress tracking coming soon.</p>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-bg p-0 sm:p-4 font-sans">
      <div className="w-full max-w-md bg-white sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[100dvh] sm:h-[800px]">
        
        {/* HEADER - Only Profile has a fixed header now, others have internal headers */}
        {activeTab === 'profile' && (
          <header className="bg-white border-b border-border p-4 flex items-center justify-center z-10 sticky top-0">
             <h1 className="font-bold text-dark-text text-lg tracking-wide font-korean">
               My Profile
             </h1>
          </header>
        )}

        {/* MAIN CONTENT */}
        {activeTab === 'home' && renderHome()}
        {activeTab === 'game' && renderGameTab()}
        {activeTab === 'profile' && renderProfile()}

        {/* BOTTOM NAVIGATION */}
        <nav className="bg-white border-t border-border px-6 py-3 flex justify-between items-center z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center transition-colors w-16 ${activeTab === 'home' ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
          >
            <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            <span className={`text-[10px] mt-1 ${activeTab === 'home' ? 'font-bold' : 'font-medium'}`}>Home</span>
          </button>
          <button 
            onClick={() => setActiveTab('learn')}
            className={`flex flex-col items-center transition-colors w-16 ${activeTab === 'learn' ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
          >
            <BookAIcon size={24} strokeWidth={activeTab === 'learn' ? 2.5 : 2} />
            <span className={`text-[10px] mt-1 ${activeTab === 'learn' ? 'font-bold' : 'font-medium'}`}>Learn</span>
          </button>
          <button 
            onClick={() => setActiveTab('game')}
            className={`flex flex-col items-center transition-colors w-16 ${activeTab === 'game' ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
          >
            <Gamepad2 size={24} strokeWidth={activeTab === 'game' ? 2.5 : 2} />
            <span className={`text-[10px] mt-1 ${activeTab === 'game' ? 'font-bold' : 'font-medium'}`}>Game</span>
          </button>
          
          <button 
             onClick={() => setActiveTab('profile')}
             className={`flex flex-col items-center transition-colors w-16 ${activeTab === 'profile' ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
          >
            <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
            <span className={`text-[10px] mt-1 ${activeTab === 'profile' ? 'font-bold' : 'font-medium'}`}>Profile</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default App;