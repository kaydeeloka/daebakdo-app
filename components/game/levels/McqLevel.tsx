import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MCQLevel } from '../../../app/(tabs)/game/types';
import { shuffleArray } from '../../../app/(tabs)/game/utils';

interface McqLevelProps {
  level: MCQLevel;
  onComplete: (success: boolean) => void;
}

export const McqLevel: React.FC<McqLevelProps> = ({ level, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    setShuffledOptions(shuffleArray(level.options));
  }, [level]);

  const handleSelect = (option: string) => {
    if (hasSubmitted) return;
    setSelectedOption(option);
    setHasSubmitted(true);

    const isCorrect = option === level.correctAnswer;
    setTimeout(() => {
      onComplete(isCorrect);
    }, 1500);
  };

  return (
    <View style={styles.root}>
      {/* Main Content: Icon & Question */}
      <View style={styles.mainContent}>
        <View style={styles.iconCircle}>
          {/* Replace HelpCircle icon with emoji or vector icon */}
          <Text style={styles.iconText}>❓</Text>
        </View>
        <Text style={styles.questionText}>{level.question}</Text>
      </View>

      {/* Footer: Options Grid */}
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
              style={[
                styles.optionButton,
                buttonStyle,
                hasSubmitted && !isCorrect && !isSelected ? { opacity: 0.4 } : {},
              ]}
              activeOpacity={0.8}
            >
              <Text style={[styles.optionText, textStyle]}>{option}</Text>
              {/* Add icons via react-native-vector-icons if desired */}
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
  alignItems: 'center',
  justifyContent: 'flex-start', // push content up
  paddingHorizontal: 24,
  paddingTop: 40,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: 'rgba(244,63,94,0.1)', // secondary/10
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  iconText: {
    fontSize: 32,
    color: '#f43f5e', // secondary
  },
  questionText: {
  fontSize: 22,
  textAlign: 'center',
  marginTop: 12,
  },
  optionsGrid: {
  paddingHorizontal: 24,
  paddingBottom: 32,
  },
  optionButton: {
  width: '100%',          // full‑width buttons
  marginVertical: 6,
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
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
    fontSize: 18,
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
