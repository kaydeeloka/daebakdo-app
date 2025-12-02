import Icon from '@react-native-vector-icons/MaterialCommunityIcons'; // Use the icon set you prefer
import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TopicItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  progress?: { current: number; total: number };
  onClick: () => void;
}

interface GameTopicScreenProps {
  title: string;
  subtitle?: string;
  items: TopicItem[];
  onBack?: () => void;
}

const ICON_MAP: Record<string, string> = {
  // Map your icon keys to icon names from react-native-vector-icons
  scenario_cat: 'message-text',
  skill_cat: 'flash',
  cat_food: 'silverware-fork-knife',
  cat_transport: 'bus',
  cat_number: 'calculator',
  cat_word: 'alphabetical',
  coffee: 'coffee',
  plane: 'airplane',
  general: 'brain',
  nature: 'leaf',
  default: 'help-circle',
};

const AnimatedCard: React.FC<{ item: TopicItem; delay: number; onPress: () => void }> = ({ item, delay, onPress }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY, delay]);

  const iconName = ICON_MAP[item.icon] || ICON_MAP.default;

  // Calculate progress width percent
  const progressPercent = item.progress ? (item.progress.current / item.progress.total) * 100 : 0;

  return (
    <Animated.View style={[styles.card, { opacity, transform: [{ translateY }] }]}>
      <TouchableOpacity style={styles.touchable} activeOpacity={0.8} onPress={onPress}>
        <View style={styles.iconCircle}>
          <Icon name={iconName} size={32} color="#F97316" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>[translate:{item.title}]</Text>
          <Text style={styles.subtitle}>[translate:{item.subtitle}]</Text>
        </View>
        {item.progress ? (
          <View style={styles.progressContainer}>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>[translate:Progress]</Text>
              <Text style={styles.progressCount}>{item.progress.current}/{item.progress.total}</Text>
            </View>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
            </View>
          </View>
        ) : (
          <View style={styles.progressPlaceholder} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};


export const GameTopicScreen: React.FC<GameTopicScreenProps> = ({ title, subtitle, items, onBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Icon name="arrow-left" size={20} color="#9CA3AF" />
            <Text style={styles.backText}>[translate:Back]</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.screenTitle}>[translate:{title}]</Text>
        {subtitle && <Text style={styles.screenSubtitle}>[translate:{subtitle}]</Text>}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {items.map((item, index) => (
          <AnimatedCard key={item.id} item={item} delay={index * 100} onPress={item.onClick} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', padding: 16, paddingBottom: 48 },
  header: { marginBottom: 24 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backText: { marginLeft: 6, color: '#9CA3AF', fontWeight: '700', fontSize: 14 },
  screenTitle: { fontSize: 28, fontWeight: '700', color: '#111827' },
  screenSubtitle: { color: '#6B7280', marginTop: 4, fontSize: 14 },

  scrollContainer: { paddingBottom: 32 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    minHeight: 220,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 15,
    elevation: 5,
  },
  touchable: { flex: 1, alignItems: 'center', justifyContent: 'space-between' },

  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFEDD5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  textContainer: { alignItems: 'center', marginBottom: 16 },
  title: { fontWeight: '700', fontSize: 18, color: '#111827', marginBottom: 4 },
  subtitle: { fontWeight: '600', fontSize: 10, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1 },

  progressContainer: { width: '100%' },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4, marginBottom: 4 },
  progressLabel: { fontSize: 10, fontWeight: '700', color: '#9CA3AF' },
  progressCount: { fontSize: 10, fontWeight: '700', color: '#6B7280' },

  progressBarBackground: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#F97316',
    borderRadius: 16,
  },

  progressPlaceholder: { width: 48, height: 4, backgroundColor: '#E5E7EB', borderRadius: 16, marginTop: 8 },
});

// Export it
export type { TopicItem };
