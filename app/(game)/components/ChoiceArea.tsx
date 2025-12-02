import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Choice } from '../types';

interface ChoiceAreaProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
  disabled: boolean;
}

export const ChoiceArea: React.FC<ChoiceAreaProps> = ({ choices, onSelect, disabled }) => {
  if (choices.length === 0) return null;

  return (
    <View style={styles.container}>
      {choices.map((choice) => (
        <TouchableOpacity
          key={choice.id}
          onPress={() => onSelect(choice)}
          disabled={disabled}
          style={[styles.button, disabled && styles.buttonDisabled]}
          activeOpacity={0.7}
        >
          <Text style={[styles.text, disabled && styles.textDisabled]}>
            {choice.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16, // p-4 approx 16px
    backgroundColor: '#ffffff', // bg-white
    borderTopWidth: 1,
    borderTopColor: '#ccc', // border-border approximate
    // No direct animation, could add using Animated API if needed
  },
  button: {
    width: '100%',
    paddingVertical: 20, // py-5 equivalent approx
    paddingHorizontal: 24, // px-6 equivalent approx
    borderRadius: 20, // rounded-2xl approx 16-24
    borderWidth: 1,
    borderColor: '#ccc', // border-border approximate
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    color: '#333333', // text-dark-text approx
    fontSize: 18, // text-lg to text-xl approximation
    fontWeight: '500',
  },
  textDisabled: {
    color: '#999999',
  },
});
