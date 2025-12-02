// app/(tabs)/game.tsx
import { useState } from 'react';

// Types & data
import { FOOD_GAME_TOPICS } from './(game)/data/PuzzlesFood';
import { NUMBER_GAME_TOPICS } from './(game)/data/PuzzlesNumber';
import { TRANSPORT_GAME_TOPICS } from './(game)/data/PuzzlesTransportation';
import { ESSENTIAL_WORDS_GAME_TOPICS } from './(game)/data/PuzzlesWord';
import { scenarios } from './(game)/data/scenario';
import { GameTopic } from './(game)/types';

// Components
import { GameplayScreen } from '@/components/game/GameplayScreen';
import { GameTopicScreen, TopicItem } from '@/components/game/GameTopicScreen';
import { ScenarioGameView } from '@/components/game/ScenarioGameView';

type GameMode = 'SCENARIO' | 'QUIZ' | null;
type BrowseCategory = 'SCENARIO' | 'FOOD' | 'TRANSPORT' | 'WORD' | 'NUMBER' | null;

export default function GameScreen() {
  // --- State ---
  const [browseCategory, setBrowseCategory] = useState<BrowseCategory>(null);
  const [gameMode, setGameMode] = useState<GameMode>(null);

  const [selectedScenario, setSelectedScenario] = useState(scenarios.coffee);
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
    setBrowseCategory(null);
    setSelectedTopic(null);
    setQuizLevelIndex(0);
    setQuizScore(0);
    setQuizGameOver(false);
  };

  // --- Helpers for TopicItem arrays ---
  const getSkillItems = (topics: GameTopic[]): TopicItem[] =>
    topics.map(topic => ({
      id: topic.id,
      title: topic.name,
      subtitle: topic.description,
      icon: topic.icon,
      progress: { current: 0, total: topic.levels.length },
      onClick: () => handleStartQuiz(topic),
    }));

  const scenarioItems: TopicItem[] = Object.entries(scenarios).map(([id, scenario]) => ({
    id,
    title: scenario.title,
    subtitle: scenario.subtitle,
    icon: scenario.icon ?? 'scenario_cat',
    progress: { current: 0, total: 1 },
    onClick: () => handleStartScenario(id),
  }));

  const rootCategories: TopicItem[] = [
    {
      id: 'cat_scenario',
      title: 'Scenarios',
      subtitle: 'Practice real-life conversations',
      icon: 'scene',
      onClick: () => setBrowseCategory('SCENARIO'),
    },
    {
      id: 'cat_food',
      title: 'Food & Dining',
      subtitle: 'Ingredients, dishes, and ordering',
      icon: 'food',
      onClick: () => setBrowseCategory('FOOD'),
    },
    {
      id: 'cat_transport',
      title: 'Transportation',
      subtitle: 'Getting around town',
      icon: 'transport',
      onClick: () => setBrowseCategory('TRANSPORT'),
    },
    {
      id: 'cat_word',
      title: 'Essential Words',
      subtitle: 'Common phrases & vocabulary',
      icon: 'words',
      onClick: () => setBrowseCategory('WORD'),
    },
    {
      id: 'cat_number',
      title: 'Numbers',
      subtitle: 'Counting, money, and time',
      icon: 'numbers',
      onClick: () => setBrowseCategory('NUMBER'),
    },
  ];

  // --- Render depending on state ---

  if (gameMode === 'SCENARIO') {
    return (
      <ScenarioGameView
        scenario={selectedScenario}
        onExit={handleExitGame}
      />
    );
  }

  if (gameMode === 'QUIZ' && selectedTopic) {
    return (
      <GameplayScreen
        levels={selectedTopic.levels}
        currentLevelIndex={quizLevelIndex}
        topicName={selectedTopic.name}
        onLevelComplete={handleQuizLevelComplete}
        onExit={handleExitGame}
        onRestart={handleQuizRestart}
        gameOver={quizGameOver}                     // NEW
        score={quizScore}                           // NEW
        totalLevels={selectedTopic.levels.length}   // NEW
      />
    );
  }

  // Scenario topics screen
  if (browseCategory === 'SCENARIO') {
    return (
      <GameTopicScreen
        title="Scenarios"
        subtitle="Practice real-life conversations"
        items={scenarioItems}
        onBack={() => setBrowseCategory(null)}
      />
    );
  }

  // Food topics
  if (browseCategory === 'FOOD') {
    const foodItems = getSkillItems(FOOD_GAME_TOPICS);
    return (
      <GameTopicScreen
        title="Food & Dining"
        subtitle="Ingredients, dishes, and ordering"
        items={foodItems}
        onBack={() => setBrowseCategory(null)}
      />
    );
  }

  // Number topics
  if (browseCategory === 'NUMBER') {
    const numberItems = getSkillItems(NUMBER_GAME_TOPICS);
    return (
      <GameTopicScreen
        title="Numbers"
        subtitle="Counting, money, and time"
        items={numberItems}
        onBack={() => setBrowseCategory(null)}
      />
    );
  }

  // Transport topics
  if (browseCategory === 'TRANSPORT') {
    const transportItems = getSkillItems(TRANSPORT_GAME_TOPICS);
    return (
      <GameTopicScreen
        title="Transportation"
        subtitle="Getting around town"
        items={transportItems}
        onBack={() => setBrowseCategory(null)}
      />
    );
  }

  // Word topics
  if (browseCategory === 'WORD') {
    const wordItems = getSkillItems(ESSENTIAL_WORDS_GAME_TOPICS);
    return (
      <GameTopicScreen
        title="Essential Words"
        subtitle="Common phrases & vocabulary"
        items={wordItems}
        onBack={() => setBrowseCategory(null)}
      />
    );
  }

  // Root categories screen
  return (
    <GameTopicScreen
      title="Categories"
      subtitle=""
      items={rootCategories}
    />
  );
}