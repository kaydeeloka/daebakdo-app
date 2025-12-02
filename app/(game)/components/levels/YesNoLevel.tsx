import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { YesNoLevel as IYesNoLevel } from '../../types';

interface YesNoLevelProps {
  level: IYesNoLevel;
  onComplete: (success: boolean) => void;
}

export const YesNoLevel: React.FC<YesNoLevelProps> = ({ level, onComplete }) => {
  const [selected, setSelected] = useState<boolean | null>(null);

  const handleSelect = (choice: boolean) => {
    if (selected !== null) return;
    setSelected(choice);

    const isCorrect = choice === level.correctAnswer;
    setTimeout(() => {
      onComplete(isCorrect);
    }, 1200);
  };

  return (
    <View style={styles.root}>
      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.iconCircle}>
          {/* Replace HelpCircle icon with emoji or vector icon */}
          <Text style={styles.iconText}>❓</Text>
        </View>
        <Text style={styles.questionText}>{level.question}</Text>

        {selected !== null && (
          <View style={styles.feedbackContainer}>
            <Text style={[styles.feedbackText, selected === level.correctAnswer ? styles.correct : styles.incorrect]}>
              {selected === level.correctAnswer ? 'Correct! 🎉' : 'Incorrect ❌'}
            </Text>
          </View>
        )}
      </View>

      {/* Footer Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selected === true
              ? selected === level.correctAnswer
                ? styles.buttonCorrect
                : styles.buttonIncorrect
              : styles.buttonDefault,
            selected !== null && selected !== true && styles.buttonDimmed,
          ]}
          activeOpacity={0.8}
          onPress={() => handleSelect(true)}
          disabled={selected !== null}
        >
          <Text style={[styles.icon, selected === true ? styles.iconLight : styles.iconSecondary]}>👍</Text>
          <Text style={styles.buttonText}>YES</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selected === false
              ? selected === level.correctAnswer
                ? styles.buttonCorrect
                : styles.buttonIncorrect
              : styles.buttonDefault,
            selected !== null && selected !== false && styles.buttonDimmed,
          ]}
          activeOpacity={0.8}
          onPress={() => handleSelect(false)}
          disabled={selected !== null}
        >
          <Text style={[styles.icon, selected === false ? styles.iconLight : styles.iconSecondary]}>👎</Text>
          <Text style={styles.buttonText}>NO</Text>
        </TouchableOpacity>
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
    padding: 16,
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    lineHeight: 34,
  },
  feedbackContainer: {
    marginTop: 32,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 32,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  feedbackText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  correct: {
    color: '#22c55e', // green-500
  },
  incorrect: {
    color: '#ef4444', // red-500
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  button: {
    flex: 1,
    height: 112,
    borderRadius: 32,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  buttonDefault: {
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: 'transparent',
  },
  buttonCorrect: {
    backgroundColor: '#22c55e',
    borderWidth: 4,
    borderColor: '#4ade80',
    shadowColor: '#22c55e',
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 12,
  },
  buttonIncorrect: {
    backgroundColor: '#ef4444',
    borderWidth: 4,
    borderColor: '#f87171',
    shadowColor: '#ef4444',
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 12,
  },
  buttonDimmed: {
    opacity: 0.3,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  iconLight: {
    color: '#fff',
  },
  iconSecondary: {
    color: '#f43f5e',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#111827',
  },
});
