import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MatchingLevel as IMatchingLevel } from '../../types';
import { shuffleArray } from '../../utils';

interface MatchingLevelProps {
  level: IMatchingLevel;
  onComplete: (success: boolean) => void;
}

export const MatchingLevel: React.FC<MatchingLevelProps> = ({ level, onComplete }) => {
  const [rightItems, setRightItems] = useState<{ id: string; text: string }[]>([]);
  const [leftItems, setLeftItems] = useState<{ id: string; text: string }[]>([]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongShake, setWrongShake] = useState<string | null>(null); // placeholder for shake animation

  useEffect(() => {
    const rightSide = level.pairs.map(p => ({ id: p.id, text: p.right }));
    const leftSide = level.pairs.map(p => ({ id: p.id, text: p.left }));

    setRightItems(shuffleArray(rightSide));
    setLeftItems(shuffleArray(leftSide));
    setSelectedLeft(null);
    setMatchedIds(new Set());
    setWrongShake(null);
  }, [level]);

  const handleLeftClick = (id: string) => {
    if (matchedIds.has(id)) return;
    setSelectedLeft(id);
    setWrongShake(null);
  };

  const handleRightClick = (targetId: string) => {
    if (matchedIds.has(targetId)) return;

    if (selectedLeft) {
      if (selectedLeft === targetId) {
        const newMatched = new Set(matchedIds);
        newMatched.add(targetId);
        setMatchedIds(newMatched);
        setSelectedLeft(null);

        if (newMatched.size === level.pairs.length) {
          setTimeout(() => onComplete(true), 1000);
        }
      } else {
        setWrongShake(targetId);
        setTimeout(() => setWrongShake(null), 500);
        setSelectedLeft(null);
      }
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.questionText}>{level.question}</Text>
        <Text style={styles.instructionText}>Tap left item, then match on right.</Text>
      </View>

      <View style={styles.columnsContainer}>
        {/* Left Column */}
        <View style={styles.column}>
          {leftItems.map(item => {
            const isMatched = matchedIds.has(item.id);
            const isSelected = selectedLeft === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => handleLeftClick(item.id)}
                disabled={isMatched}
                style={[
                  styles.tile,
                  isMatched && styles.tileMatched,
                  !isMatched && isSelected && styles.tileSelected,
                  { justifyContent: 'flex-start' },
                ]}
              >
                <Text style={[styles.tileText, isMatched && styles.tileTextMatched]}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Right Column */}
        <View style={styles.column}>
          {rightItems.map(item => {
            const isMatched = matchedIds.has(item.id);
            const isShake = wrongShake === item.id;  // placeholder
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => handleRightClick(item.id)}
                disabled={isMatched}
                style={[
                  styles.tile,
                  isMatched && styles.tileMatched,
                  { justifyContent: 'flex-end' },
                  isShake && styles.tileWrong,
                ]}
              >
                <Text style={[styles.tileText, isMatched && styles.tileTextMatched]}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingBottom: 8,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827', // dark-text
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#6b7280', // gray-500
    marginTop: 4,
    textAlign: 'center',
  },
  columnsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16 as any,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  tile: {
    flex: 1,
    marginVertical: 6,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
  },
  tileSelected: {
    backgroundColor: '#f43f5e', // secondary color
    shadowColor: '#f43f5e',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  tileMatched: {
    backgroundColor: '#dcfce7',
    borderColor: '#bbf7d0',
    shadowOpacity: 0,
    elevation: 0,
  },
  tileWrong: {
    borderColor: '#f87171',
  },
  tileText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  tileTextMatched: {
    color: '#15803d',
  },
});
