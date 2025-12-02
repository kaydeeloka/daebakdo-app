import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import { AppIcon } from '@/components/game/Icon';

const game = require('@/assets/images/message/gamemsg.png');

export type TopicItem = {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  progress?: {
    current: number;
    total: number;
  };
  onClick: () => void;
};

type GameTopicScreenProps = {
  title: string;
  subtitle?: string;
  items: TopicItem[];
  onBack?: () => void;
};

export const GameTopicScreen: React.FC<GameTopicScreenProps> = ({
  title,
  subtitle,
  items,
  onBack,
}) => {
  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        {onBack && (
          <Pressable
            style={styles.backButton}
            onPress={onBack}
            hitSlop={8}
          >
            <Text style={styles.backText}>{'‹'}</Text>
          </Pressable>
        )}

        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerTitle}>{title}</Text>
          {subtitle ? (
            <Text style={styles.headerSubtitle}>{subtitle}</Text>
          ) : null}
        </View>
      </View>

      {/* Banner image between header and cards */}
      <View style={styles.topRow}>
        <Image source={game} style={styles.gameImage} resizeMode="contain" />
      </View>

      {/* Body grid */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {items.map(item => (
            <TopicCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const TopicCard: React.FC<{ item: TopicItem }> = ({ item }) => {
  const total = item.progress?.total ?? 0;
  const current = item.progress?.current ?? 0;
  const progressRatio = total > 0 ? current / total : 0;

  return (
    <Pressable style={styles.card} onPress={item.onClick}>
      <View style={styles.cardIconWrapper}>
        <AppIcon name={item.icon ?? 'words'} size={24} color="#FF9C40" />
      </View>

      <Text style={styles.cardTitle} numberOfLines={2}>
        {item.title}
      </Text>
      {item.subtitle ? (
        <Text style={styles.cardSubtitle} numberOfLines={2}>
          {item.subtitle}
        </Text>
      ) : null}

      <View style={{ flex: 1 }} />

      {item.progress && (
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>
            Progress {current}/{total}
          </Text>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${progressRatio * 100}%` },
              ]}
            />
          </View>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF7EC',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  backText: {
    fontSize: 20,
    fontFamily: 'BalooChettan2-Medium',
    color: '#333333',
  },
  headerTextWrapper: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    lineHeight: 32,
    fontFamily: 'BalooChettan2-Bold',
    color: '#333333',
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: 'BalooChettan2-Medium',
    color: '#777777',
  },

  topRow: {
    alignItems: 'center',
    marginBottom: 12,
  },
  gameImage: {
    width: '100%',
    height: 160,
  },

  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    alignItems: 'center',
  },
  cardIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFE8D0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'BalooChettan2-Medium',
    textAlign: 'center',
    color: '#333333',
  },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'BalooChettan2-Medium',
    textAlign: 'center',
    color: '#888888',
  },
  progressSection: {
    marginTop: 12,
  },
  progressLabel: {
    fontSize: 11,
    fontFamily: 'BalooChettan2-Medium',
    color: '#999999',
    marginBottom: 4,
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F0F0F0',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#FF9C40',
  },
});
