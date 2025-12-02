import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MCQAudioLevel } from '../../types';
import { shuffleArray } from '../../utils';

interface McqAudioLevelProps {
  level: MCQAudioLevel;
  onComplete: (success: boolean) => void;
}

export const McqAudioLevel: React.FC<McqAudioLevelProps> = ({ level, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    setShuffledOptions(shuffleArray(level.options));
    cancelSpeech();
  }, [level]);

  useEffect(() => {
    return () => cancelSpeech();
  }, []);

  const cancelSpeech = () => {
    if ('speechSynthesis' in global) {
      global.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in global)) {
      Alert.alert("Text-to-Speech not supported", "Text-to-Speech is not supported on this platform.");
      return;
    }

    if (isPlaying) {
      global.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(level.textToSpeak);

    if (level.language) {
      utterance.lang = level.language;
    } else {
      const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(level.textToSpeak);
      utterance.lang = hasKorean ? 'ko-KR' : 'en-US';
    }
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    global.speechSynthesis.speak(utterance);
  };

  const handleSelect = (option: string) => {
    if (hasSubmitted) return;

    cancelSpeech();

    setSelectedOption(option);
    setHasSubmitted(true);

    const isCorrect = option === level.correctAnswer;
    setTimeout(() => {
      onComplete(isCorrect);
    }, 1500);
  };

  return (
    <View style={styles.root}>
      {/* Main content */}
      <View style={styles.mainContent}>
        <Text style={styles.questionText}>{level.question}</Text>

        <TouchableOpacity
          onPress={handleSpeak}
          activeOpacity={0.8}
          style={[styles.playButton, isPlaying ? styles.playButtonActive : styles.playButtonInactive]}
        >
          {isPlaying ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text style={styles.playIcon}>▶</Text> // Simple play icon; replace with vector icon if desired
          )}
        </TouchableOpacity>

        <View style={styles.listenHint}>
          <Text style={styles.listenHintText}>Tap to listen</Text>
        </View>
      </View>

      {/* Options footer */}
      <View style={styles.optionsGrid}>
        {shuffledOptions.map((option, index) => {
          const isCorrect = option === level.correctAnswer;
          const isSelected = option === selectedOption;

          let buttonStyle = styles.optionButtonOutline;
          let textStyle = styles.optionTextOutline;

          if (hasSubmitted) {
            if (isCorrect) {
              buttonStyle = styles.optionButtonSuccess;
              textStyle = styles.optionTextSuccess;
            } else if (isSelected) {
              buttonStyle = styles.optionButtonDanger;
              textStyle = styles.optionTextDanger;
            }
          }

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(option)}
              disabled={hasSubmitted}
              style={[styles.optionButton, buttonStyle, hasSubmitted && !isCorrect && !isSelected ? { opacity: 0.4 } : {}]}
              activeOpacity={0.8}
            >
              <Text style={[styles.optionText, textStyle]}>{option}</Text>
              {/* You can add icons here using a React Native icon library */}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 24,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 32,
    textAlign: 'center',
  },
  playButton: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonActive: {
    backgroundColor: '#f43f5e', // secondary
    borderColor: '#fb7185', // secondary-light
  },
  playButtonInactive: {
    backgroundColor: '#fff',
    borderColor: '#e5e7eb', // gray-100
  },
  playIcon: {
    fontSize: 48,
    color: '#f43f5e',
  },
  listenHint: {
    marginTop: 12,
  },
  listenHintText: {
    color: '#6b7280',
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  optionsGrid: {
    flexShrink: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12 as any,
    justifyContent: 'center',
    paddingBottom: 8,
  },
  optionButton: {
    minWidth: '40%',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  optionButtonOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  optionButtonSuccess: {
    backgroundColor: '#dcfce7',
    borderWidth: 1,
    borderColor: '#22c55e',
    shadowOpacity: 0,
    elevation: 0,
  },
  optionButtonDanger: {
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#ef4444',
    shadowOpacity: 0,
    elevation: 0,
  },
  optionText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  optionTextOutline: {
    color: '#111827',
  },
  optionTextSuccess: {
    color: '#15803d',
  },
  optionTextDanger: {
    color: '#b91c1c',
  },
});
