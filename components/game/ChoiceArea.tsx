import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Choice } from '../../app/(tabs)/game/types';

interface ChoiceAreaProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
  disabled: boolean;
}

export const ChoiceArea: React.FC<ChoiceAreaProps> = ({ choices, onSelect, disabled }) => {
  if (choices.length === 0) return null;

  return (
    <View style={styles.container}>
      {choices.map(choice => (
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    // subtle card-like elevation
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  text: {
    color: '#111827',
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
  },
  textDisabled: {
    color: '#9CA3AF',
  },
});
