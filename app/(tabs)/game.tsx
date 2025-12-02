// app/(tabs)/game.tsx
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

// Types & data
import { FOOD_GAME_TOPICS } from '../(game)/data/PuzzlesFood';
import { NUMBER_GAME_TOPICS } from '../(game)/data/PuzzlesNumber';
import { TRANSPORT_GAME_TOPICS } from '../(game)/data/PuzzlesTransportation';
import { ESSENTIAL_WORDS_GAME_TOPICS } from '../(game)/data/PuzzlesWord';
import { scenarios } from '../(game)/data/scenario';
import { GameTopic } from '../(game)/types';

// Components
import { GameplayScreen } from '../(game)/components/GameplayScreen';
import { TopicItem } from '@/components/GameTopicScreen';
import { ScenarioGameView } from '../(game)/components/ScenarioGameView';

// ... your imports (scenarios, topics, types, components) ...

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
  };

  // --- Render depending on state ---

  if (gameMode === 'SCENARIO') {
    return (
      <ScenarioGameView scenario={selectedScenario} onExit={handleExitGame} />
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
        onRestart={handleQuizRestart}  // pass it here
      />
    );
  }


  if (browseCategory === 'SCENARIO') {
    return (
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {Object.entries(scenarios).map(([id, scenario]) => (
          <TouchableOpacity
            key={id}
            onPress={() => handleStartScenario(id)}
            style={{ marginBottom: 12, padding: 12, backgroundColor: '#ccc', borderRadius: 8 }}
          >
            <Text>{scenario.title}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => setBrowseCategory(null)} style={{ marginTop: 16 }}>
          <Text style={{ color: 'blue' }}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

if (browseCategory === 'FOOD') {
  const foodTopics = getSkillItems(FOOD_GAME_TOPICS);
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {foodTopics.map(topic => (
        <TouchableOpacity
          key={topic.id}
          onPress={topic.onClick}
          style={{ marginBottom: 12, padding: 12, backgroundColor: '#eee', borderRadius: 8 }}
        >
          <Text>{topic.title}</Text>
          <Text style={{ color: '#666' }}>{topic.subtitle}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => setBrowseCategory(null)} style={{ marginTop: 16 }}>
        <Text style={{ color: 'blue' }}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

if (browseCategory === 'NUMBER') {
  const numberTopics = getSkillItems(NUMBER_GAME_TOPICS);
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {numberTopics.map(topic => (
        <TouchableOpacity
          key={topic.id}
          onPress={topic.onClick}
          style={{ marginBottom: 12, padding: 12, backgroundColor: '#eee', borderRadius: 8 }}
        >
          <Text>{topic.title}</Text>
          <Text style={{ color: '#666' }}>{topic.subtitle}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => setBrowseCategory(null)} style={{ marginTop: 16 }}>
        <Text style={{ color: 'blue' }}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

if (browseCategory === 'TRANSPORT') {
  const transportTopics = getSkillItems(TRANSPORT_GAME_TOPICS);
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {transportTopics.map(topic => (
        <TouchableOpacity
          key={topic.id}
          onPress={topic.onClick}
          style={{ marginBottom: 12, padding: 12, backgroundColor: '#eee', borderRadius: 8 }}
        >
          <Text>{topic.title}</Text>
          <Text style={{ color: '#666' }}>{topic.subtitle}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => setBrowseCategory(null)} style={{ marginTop: 16 }}>
        <Text style={{ color: 'blue' }}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

if (browseCategory === 'WORD') {
  const wordTopics = getSkillItems(ESSENTIAL_WORDS_GAME_TOPICS);
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {wordTopics.map(topic => (
        <TouchableOpacity
          key={topic.id}
          onPress={topic.onClick}
          style={{ marginBottom: 12, padding: 12, backgroundColor: '#eee', borderRadius: 8 }}
        >
          <Text>{topic.title}</Text>
          <Text style={{ color: '#666' }}>{topic.subtitle}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => setBrowseCategory(null)} style={{ marginTop: 16 }}>
        <Text style={{ color: 'blue' }}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


  // Default view with root category menu:
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {rootCategories.map(cat => (
        <TouchableOpacity
          key={cat.id}
          onPress={cat.onClick}
          style={{ marginBottom: 12, padding: 12, backgroundColor: '#ddd', borderRadius: 8 }}
        >
          <Text>{cat.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}