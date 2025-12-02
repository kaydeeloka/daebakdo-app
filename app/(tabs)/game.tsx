// app/(tabs)/game.tsx
import { useState } from 'react';

// Types & data
import { scenarios } from '../(game)/data/scenario';
import { GameTopic, Scenario } from '../(game)/types';

// Components
import { TopicItem } from '../(game)/components/GameTopicScreen';

type GameMode = 'SCENARIO' | 'QUIZ' | null;
type BrowseCategory = 'SCENARIO' | 'FOOD' | 'TRANSPORT' | 'WORD' | 'NUMBER' | null;

export default function GameScreen() {
  // which sub-view is active (dashboard / list / gameplay)
  const [browseCategory, setBrowseCategory] = useState<BrowseCategory>(null);
  const [gameMode, setGameMode] = useState<GameMode>(null);

  // Scenario state
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(scenarios.coffee);

  // Quiz state
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
  };

  // --- Data for menus ---

  const rootCategories: TopicItem[] = [
    {
      id: 'cat_scenario',
      title: 'Roleplay Scenarios',
      subtitle: 'Real-world conversations',
      icon: 'scenario_cat',
      onClick: () => setBrowseCategory('SCENARIO'),
    },
    {
      id: 'cat_food',
      title: 'Food & Dining',
      subtitle: 'Ingredients, dishes, and ordering',
      icon: 'cat_food',
      onClick: () => setBrowseCategory('FOOD'),
    },
    {
      id: 'cat_transport',
      title: 'Transportation',
      subtitle: 'Getting around town',
      icon: 'cat_transport',
      onClick: () => setBrowseCategory('TRANSPORT'),
    },
    {
      id: 'cat_word',
      title: 'Essential Words',
      subtitle: 'Common phrases & vocabulary',
      icon: 'cat_word',
      onClick: () => setBrowseCategory('WORD'),
    },
    {
      id: 'cat_number',
      title: 'Numbers',
      subtitle: 'Counting, money, and time',
      icon: 'cat_number',
      onClick: () => setBrowseCategory('NUMBER'),
    },
  ];

  const getSkillItems = (topics: GameTopic[]): TopicItem[] =>
    topics.map(topic => ({
      id: topic.id,
      title: topic.name,
      subtitle: topic.description,
      icon: topic.icon,
      progress: { current: 0, total: topic.levels.length },
      onClick: () => handleStartQuiz(topic),
    }));
}