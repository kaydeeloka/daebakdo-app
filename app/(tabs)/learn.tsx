import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router'; 

const lesson = require('@/assets/images/message/lessonmsg.png');

const LearningScreen = () => {
  const cards = [
  { title: 'Essential Phrases & Greetings', route: '/learn/essentials' },
  { title: 'Travel Scenarios', route: '/learn/scenarios' },
  { title: 'Transportation', route: '/learn/transportation' },
  { title: 'Numbers & Money', route: '/learn/numbers' },
  { title: 'Food & Dining', route: '/learn/foods' },
];

  const onPress = (route: string) => () => router.push(route as any);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Learning Materials</Text>

      <View style={styles.topRow}>
        <Image source={lesson} style={styles.lessonImage} resizeMode="contain" />
      </View>

      <View style={styles.list}>
        {cards.map(item => (
          <TouchableOpacity
            key={item.route}
            style={styles.card}
            activeOpacity={0.8}
            onPress={onPress(item.route)}
          >
            <View style={styles.iconCircle} />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default LearningScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },
  lessonImage: {
    width: '100%',
    height: 180,
    alignSelf: 'center',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  list: {
    marginTop: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9F1',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000', // basic shadow [web:14][web:20]
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFE4CC',
    marginRight: 12,
  },
  cardText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
