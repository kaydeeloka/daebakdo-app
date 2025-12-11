import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MatchingImageLevel as IMatchingImageLevel } from '../../../app/(tabs)/game/types';
import { shuffleArray } from '../../../app/(tabs)/game/utils';

interface MatchingImageLevelProps {
  level: IMatchingImageLevel;
  onComplete: (success: boolean) => void;
}

export const MatchingImageLevel: React.FC<MatchingImageLevelProps> = ({ level, onComplete }) => {
  const [rightItems, setRightItems] = useState<{ id: string; text: string }[]>([]);
  const [leftItems, setLeftItems] = useState<{ id: string; imageUrl: string }[]>([]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongShake, setWrongShake] = useState<string | null>(null); // placeholder if you add animation later

  useEffect(() => {
    const rightSide = level.pairs.map(p => ({ id: p.id, text: p.word }));
    const leftSide = level.pairs.map(p => ({ id: p.id, imageUrl: p.imageUrl }));

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
        setWrongShake(targetId); // no visual shake yet
        setTimeout(() => setWrongShake(null), 500);
        setSelectedLeft(null);
      }
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.questionText}>{level.question}</Text>
      </View>

      <View style={styles.columnsContainer}>
        {/* Left Column - Images */}
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
                  styles.imageButton,
                  isMatched && styles.imageButtonMatched,
                  !isMatched && isSelected && styles.imageButtonSelected,
                ]}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.image}
                  resizeMode="cover"
                />
                {isMatched && (
                  <View style={styles.matchedOverlay}>
                    <Text style={styles.matchedCheck}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Right Column - Words */}
        <View style={styles.column}>
          {rightItems.map(item => {
            const isMatched = matchedIds.has(item.id);
            const isShake = wrongShake === item.id; // hook for future animation

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => handleRightClick(item.id)}
                disabled={isMatched}
                style={[
                  styles.wordButton,
                  isMatched && styles.wordButtonMatched,
                  // placeholder: you could change background if isShake
                  isShake && styles.wordButtonWrong,
                ]}
              >
                <Text style={[styles.wordText, isMatched && styles.wordTextMatched]}>
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
    color: '#111827', // text-dark-text equivalent
    textAlign: 'center',
  },
  columnsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16 as any, 
    alignItems: 'stretch',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  imageButton: {
    flex: 1,
    marginVertical: 6,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  imageButtonSelected: {
    borderColor: '#fb7185', // secondary-ish
  },
  imageButtonMatched: {
    borderColor: '#4ade80',
    opacity: 0.4,
  },
  image: {
    width: '100%',
    height: 90,
  },
  matchedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchedCheck: {
    fontSize: 32,
    color: '#22c55e',
  },
  wordButton: {
    flex: 1,
    marginVertical: 6,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  wordButtonMatched: {
    backgroundColor: '#dcfce7',
    borderColor: '#bbf7d0',
    shadowOpacity: 0,
    elevation: 0,
  },
  wordButtonWrong: {
    borderColor: '#f97373',
  },
  wordText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  wordTextMatched: {
    color: '#15803d',
  },
});
