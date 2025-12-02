import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MCQImageLevel } from '../../../app/(tabs)/(game)/types';
import { shuffleArray } from '../../../app/(tabs)/(game)/utils';

interface McqImageLevelProps {
  level: MCQImageLevel;
  onComplete: (success: boolean) => void;
}

export const McqImageLevel: React.FC<McqImageLevelProps> = ({ level, onComplete }) => {
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
      {/* Main Content: Image & Question */}
      <View style={styles.mainContent}>
        <Text style={styles.questionText}>{level.question}</Text>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: level.imageUrl }}
            style={styles.image}
            resizeMode="contain"
            accessibilityLabel="Question"
          />
        </View>
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
              {/* For icons, use react-native-vector-icons or similar */}
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'BalooChettan2-Medium',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    maxHeight: '30%',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12 as any,
    paddingBottom: 8,
  },
  optionButton: {
    minWidth: '40%',
    margin: 6,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
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
    fontFamily: 'BalooChettan2-Medium'
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
