import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WordPuzzleLevel as IWordPuzzleLevel } from '../../types';
import { shuffleArray } from '../../utils';

interface Letter {
  id: string;
  char: string;
}

interface WordPuzzleLevelProps {
  level: IWordPuzzleLevel;
  onComplete: (success: boolean) => void;
}

export const WordPuzzleLevel: React.FC<WordPuzzleLevelProps> = ({ level, onComplete }) => {
  const [bank, setBank] = useState<Letter[]>([]);
  const [slots, setSlots] = useState<(Letter | null)[]>([]);
  const [status, setStatus] = useState<'playing' | 'correct' | 'wrong'>('playing');

  useEffect(() => {
    const chars = level.word.toUpperCase().split('');
    const initialLetters: Letter[] = chars.map((char, i) => ({
      id: `${char}-${i}-${Math.random()}`,
      char,
    }));

    setBank(shuffleArray(initialLetters));
    setSlots(new Array(chars.length).fill(null));
    setStatus('playing');
  }, [level]);

  const handleBankClick = (letter: Letter) => {
    if (status !== 'playing') return;

    const firstEmptyIndex = slots.findIndex(s => s === null);
    if (firstEmptyIndex === -1) return;

    const newSlots = [...slots];
    newSlots[firstEmptyIndex] = letter;
    setSlots(newSlots);

    setBank(prev => prev.filter(l => l.id !== letter.id));
  };

  const handleSlotClick = (index: number) => {
    if (status !== 'playing') return;

    const letter = slots[index];
    if (!letter) return;

    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);

    setBank(prev => [...prev, letter]);
  };

  useEffect(() => {
    if (slots.length > 0 && slots.every(s => s !== null)) {
      const currentWord = slots.map(s => s?.char).join('');
      if (currentWord === level.word.toUpperCase()) {
        setStatus('correct');
        setTimeout(() => onComplete(true), 1500);
      } else {
        setStatus('wrong');
        setTimeout(() => setStatus('playing'), 1000);
      }
    }
  }, [slots, level.word, onComplete]);

  return (
    <View style={styles.root}>
      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.mainContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.questionText}>{level.question}</Text>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: level.imageUrl }}
            style={styles.image}
            resizeMode="contain"
            accessible
            accessibilityLabel="Puzzle"
          />
        </View>

        {/* Answer Slots */}
        <View style={styles.slotsContainer}>
          {slots.map((slot, i) => {
            const isFilled = slot !== null;
            const slotStyle = [
              styles.slot,
              isFilled && (status === 'correct' ? styles.slotCorrect : status === 'wrong' ? styles.slotWrong : styles.slotSelected),
            ];

            return (
              <TouchableOpacity
                key={i}
                onPress={() => handleSlotClick(i)}
                disabled={!isFilled || status !== 'playing'}
                style={slotStyle}
                activeOpacity={0.8}
              >
                <Text style={[styles.slotText, isFilled && styles.slotTextFilled]}>{slot?.char}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer: Bank */}
      <View style={styles.bankContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bankContent}>
          {bank.map(letter => (
            <TouchableOpacity
              key={letter.id}
              onPress={() => handleBankClick(letter)}
              style={styles.bankLetter}
              activeOpacity={0.8}
            >
              <Text style={styles.bankLetterText}>{letter.char}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContent: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
  },
  imageContainer: {
    width: '100%',
    maxHeight: 160,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  image: {
    width: '100%',
    height: 160,
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  slot: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderBottomWidth: 4,
    borderColor: '#d1d5db',
    backgroundColor: '#e5e7eb',
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotSelected: {
    backgroundColor: '#3b82f6',
    borderColor: '#1e40af',
  },
  slotCorrect: {
    backgroundColor: '#22c55e',
    borderColor: '#166534',
    shadowColor: '#22c55e',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  slotWrong: {
    backgroundColor: '#ef4444',
    borderColor: '#991b1b',
    shadowColor: '#ef4444',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  slotText: {
    fontSize: 28,
    fontWeight: '900',
    color: 'transparent',
  },
  slotTextFilled: {
    color: '#fff',
  },
  bankContainer: {
    borderTopWidth: 2,
    borderTopColor: '#f3f4f6',
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  bankContent: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  bankLetter: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankLetterText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
});
