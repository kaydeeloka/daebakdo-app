import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GameTopic } from '../types';
// Replace your icons with react-native-vector-icons or other RN icon sets
import Icon from '@react-native-vector-icons/material-icons';

interface StartScreenProps {
  topics: GameTopic[];
  onSelectTopic: (topic: GameTopic) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ topics, onSelectTopic }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>[translate:Topics]</Text>
      </View>

      {topics.map((topic, index) => (
        <AnimatedTopicCard key={topic.id} topic={topic} delay={index * 100} onPress={() => onSelectTopic(topic)} />
      ))}
    </ScrollView>
  );
};

const AnimatedTopicCard: React.FC<{ topic: GameTopic; delay: number; onPress: () => void }> = ({ topic, delay, onPress }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      delay,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateY, {
      toValue: 0,
      duration: 400,
      delay,
      useNativeDriver: true,
    }).start();
  }, [opacity, translateY, delay]);

  return (
    <Animated.View style={[styles.topicCard, { opacity, transform: [{ translateY }] }]}>
      <View style={styles.iconContainer}>
        {/* Replace topic.icon with an equivalent Icon component */}
        <Icon name={topic.icon || "star"} size={48} color="#333" />
      </View>
      <Text style={styles.topicTitle}>{topic.name}</Text>
      <Text style={styles.topicDescription}>{topic.description}</Text>

      <TouchableOpacity style={styles.startButton} onPress={onPress}>
        <Icon name="play-circle-outline" size={20} color="#fff" />
        <Text style={styles.startButtonText}>[translate:Start Quiz]</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

interface GameOverScreenProps {
  correctCount: number;
  totalLevels: number;
  onRestart: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ correctCount, totalLevels, onRestart }) => {
  const percentage = totalLevels > 0 ? Math.round((correctCount / totalLevels) * 100) : 0;

  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: percentage,
      duration: 800,
      delay: 300,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const widthInterpolated = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.gameOverContainer}>
      <View style={styles.resultCard}>
        <View style={styles.trophyCircle}>
          <Icon name="emoji-events" size={40} color="#f59e0b" />
        </View>
        <Text style={styles.sessionCompleteText}>[translate:Session Complete!]</Text>
        <Text style={styles.subText}>[translate:Here is how you did]</Text>

        <View style={styles.accuracyContainer}>
          <Text style={styles.accuracyLabel}>[translate:Accuracy]</Text>
          <Text style={styles.accuracyPercent}>{percentage}%</Text>
        </View>

        <View style={styles.progressBarBackground}>
          <Animated.View style={[styles.progressBarFill, { width: widthInterpolated }]} />
        </View>

        <View style={styles.correctCountContainer}>
          <Icon name="check-circle" size={20} color="#22c55e" />
          <Text style={styles.correctCountText}>{correctCount} / {totalLevels} [translate:Correct]</Text>
        </View>

        <TouchableOpacity style={styles.playAgainButton} onPress={onRestart}>
          <Text style={styles.playAgainText}>[translate:Play Again]</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 80,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  topicCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { height: 4, width: 0 },
    shadowRadius: 10,
    elevation: 3,
  },
  iconContainer: {
    marginBottom: 12,
  },
  topicTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  topicDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  gameOverContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { height: 6, width: 0 },
    shadowRadius: 15,
    elevation: 5,
  },
  trophyCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  sessionCompleteText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  subText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
    marginTop: 4,
  },
  accuracyContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  accuracyLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  accuracyPercent: {
    fontSize: 28,
    fontWeight: '900',
    color: '#2563eb',
  },
  progressBarBackground: {
    height: 16,
    width: '100%',
    backgroundColor: '#e5e7eb',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 20,
  },
  correctCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  correctCountText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
  playAgainButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
  },
  playAgainText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
