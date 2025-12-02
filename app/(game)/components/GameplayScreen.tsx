import Icon from '@react-native-vector-icons/material-icons'; // or your preferred icon set
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GameLevel, QuestionType } from '../types';
import { MatchingImageLevel } from './levels/MatchingImageLevel';
import { MatchingLevel } from './levels/MatchingLevel';
import { McqAudioLevel } from './levels/McqAudioLevel';
import { McqImageLevel } from './levels/McqImageLevel';
import { McqLevel } from './levels/McqLevel';
import { WordPuzzleLevel } from './levels/WordPuzzleLevel';
import { YesNoLevel } from './levels/YesNoLevel';

interface GameplayScreenProps {
  levels: GameLevel[];
  currentLevelIndex: number;
  topicName?: string;
  onLevelComplete: (success: boolean) => void;
  onExit: () => void;
  onRestart: () => void;
}

export const GameplayScreen: React.FC<GameplayScreenProps> = ({
  levels,
  currentLevelIndex,
  topicName,
  onLevelComplete,
  onExit,
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    // Animate progress bar width
    Animated.timing(progressAnim, {
      toValue: ((currentLevelIndex + 1) / levels.length) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();

    // Animate level content fade and slide
    opacityAnim.setValue(0);
    translateYAnim.setValue(20);
    Animated.parallel([
      Animated.spring(opacityAnim, { toValue: 1, stiffness: 300, damping: 30, useNativeDriver: true }),
      Animated.spring(translateYAnim, { toValue: 0, stiffness: 300, damping: 30, useNativeDriver: true }),
    ]).start();
  }, [currentLevelIndex, levels.length, progressAnim, opacityAnim, translateYAnim]);

  const renderLevel = () => {
    const level = levels[currentLevelIndex];
    if (!level) return null;

    const key = level.id;

    switch (level.type) {
      case QuestionType.MCQ:
        return <McqLevel key={key} level={level} onComplete={onLevelComplete} />;
      case QuestionType.YES_NO:
        return <YesNoLevel key={key} level={level} onComplete={onLevelComplete} />;
      case QuestionType.MATCHING:
        return <MatchingLevel key={key} level={level} onComplete={onLevelComplete} />;
      case QuestionType.WORD_PUZZLE:
        return <WordPuzzleLevel key={key} level={level} onComplete={onLevelComplete} />;
      case QuestionType.MCQ_IMAGE:
        return <McqImageLevel key={key} level={level} onComplete={onLevelComplete} />;
      case QuestionType.MCQ_AUDIO:
        return <McqAudioLevel key={key} level={level} onComplete={onLevelComplete} />;
      case QuestionType.MATCHING_IMAGE:
        return <MatchingImageLevel key={key} level={level} onComplete={onLevelComplete} />;
      default:
        return (
          <View>
            <Text>Unknown Level Type</Text>
          </View>
        );
    }
  };

  // Interpolate progress bar width from animated value
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.titleColumn}>
            <TouchableOpacity onPress={onExit} style={styles.backButton}>
              <Icon name="arrow-back-ios" size={16} color="#9CA3AF" />
              <Text style={styles.backText}>[translate:Back]</Text>
            </TouchableOpacity>
            <Text style={styles.topicName}>{topicName}</Text>
          </View>
          <View style={styles.levelCounter}>
            <Text style={styles.levelLabel}>[translate:Level]</Text>
            <Text style={styles.levelNumber}>
              {currentLevelIndex + 1} <Text style={styles.levelSeparator}>/</Text> {levels.length}
            </Text>
          </View>
        </View>
        {/* Progress Bar */}
        <View style={styles.progressBarBackground}>
          <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
        </View>
      </View>

      {/* MAIN LEVEL CONTENT */}
      <Animated.View
        style={[
          styles.levelContent,
          {
            opacity: opacityAnim,
            transform: [{ translateY: translateYAnim }],
          },
        ]}
        key={levels[currentLevelIndex]?.id || 'level'}
      >
        {renderLevel()}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 640,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  titleColumn: {
    flexDirection: 'column',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  backText: {
    color: '#9CA3AF',
    fontWeight: '700',
    fontSize: 12,
    marginLeft: 4,
  },
  topicName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  levelCounter: {
    alignItems: 'flex-end',
  },
  levelLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  levelNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: '#2563EB',
    lineHeight: 32,
  },
  levelSeparator: {
    color: '#D1D5DB',
    fontSize: 18,
    fontWeight: '900',
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 10,
  },
  levelContent: {
    flex: 1,
  },
});
