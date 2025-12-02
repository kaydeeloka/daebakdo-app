import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const topics = [
  'Essential Phrases & Greetings',
  'Travel Scenarios',
  'Culture & Etiquette',
  'Transportation',
  'Numbers & Money',
  'Food & Dining',
];

export default function LearnScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Choose a Topic</Text>

      <View style={styles.grid}>
        {topics.map((title) => (
          <View key={title} style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.progressLabel}>Progress</Text>
            <Text style={styles.progressValue}>0/0</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF8EE',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontFamily: 'BalooChettan2-Bold',
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'BalooChettan2-Medium',
    color: '#333',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 12,
    color: '#999',
  },
  progressValue: {
    fontSize: 12,
    color: '#FF8C32',
    marginTop: 2,
  },
});
