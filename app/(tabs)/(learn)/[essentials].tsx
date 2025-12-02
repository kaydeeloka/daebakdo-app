// app/(learn)/essentials.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

interface Phrase {
  korean: string;
  romanization: string;
  english: string;
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  phrases: Phrase[];
  level: number;
  type: 'vocab' | 'listening';
}

interface Topic {
  id: string;
  title: string;
  chapterId: string;
}

const ESSENTIAL_CHAPTERS: Chapter[] = [
  {
    id: 'greetings-1',
    title: 'Essential Greetings',
    description: 'Learn the most common ways to greet people.',
    phrases: [
      { korean: '안녕하세요', romanization: 'Annyeonghaseyo', english: 'Hello' },
      { korean: '감사합니다', romanization: 'Gamsahamnida', english: 'Thank you' },
      { korean: '죄송합니다', romanization: 'Joesonghamnida', english: 'Sorry' },
      { korean: '네', romanization: 'Ne', english: 'Yes' },
      { korean: '아니요', romanization: 'Aniyo', english: 'No' },
    ],
    level: 1,
    type: 'vocab',
  },
  {
    id: 'greetings-2',
    title: 'Common Phrases',
    description: 'Useful phrases for everyday situations.',
    phrases: [
      { korean: '실례합니다', romanization: 'Sillyehamnida', english: 'Excuse me' },
      { korean: '괜찮아요', romanization: 'Gwaenchanayo', english: "It's okay" },
      { korean: '주세요', romanization: 'Juseyo', english: 'Please give me' },
      {
        korean: '이름이 뭐예요?',
        romanization: 'Ireumi mwoyeyo?',
        english: 'What is your name?',
      },
    ],
    level: 1,
    type: 'vocab',
  },
  {
    id: 'essentials-listen',
    title: 'Common Questions',
    description: 'Listen to the phrase and guess the meaning.',
    phrases: [
      {
        korean: '화장실이 어디예요?',
        romanization: 'Hwajangsiri eodiyeyo?',
        english: 'Where is the bathroom?',
      },
      { korean: '도와주세요', romanization: 'Dowajuseyo', english: 'Please help me' },
      {
        korean: '저는 한국말 잘 못해요',
        romanization: 'Jeoneun hangukmal jal motaeyo',
        english: "I don't speak Korean well",
      },
      {
        korean: '영어 할 수 있어요?',
        romanization: 'Yeongeo hal su isseoyo?',
        english: 'Can you speak English?',
      },
    ],
    level: 2,
    type: 'listening',
  },
  {
    id: 'essentials-titles',
    title: 'Calling for People',
    description: 'Learn how to properly address people.',
    phrases: [
      {
        korean: '저기요',
        romanization: 'Jeogiyo',
        english: 'Excuse me (to get attention)',
      },
      {
        korean: '사장님',
        romanization: 'Sajangnim',
        english: 'Owner/Boss (used for restaurant owners)',
      },
      {
        korean: '기사님',
        romanization: 'Gisanim',
        english: 'Driver (for taxi drivers)',
      },
      {
        korean: '이모님',
        romanization: 'Imonim',
        english: 'Auntie (friendly term for older female staff)',
      },
    ],
    level: 2,
    type: 'vocab',
  },
];

const TOPICS: Topic[] = [
  { id: 'greetings', title: 'Essential Greetings', chapterId: 'greetings-1' },
  { id: 'phrases', title: 'Common Phrases', chapterId: 'greetings-2' },
  { id: 'questions', title: 'Common Questions', chapterId: 'essentials-listen' },
  { id: 'people', title: 'How to address people', chapterId: 'essentials-titles' },
];

const EssentialsScreen: React.FC = () => {
  const [openTopicId, setOpenTopicId] = useState<string | null>(null);

  const toggleTopic = (id: string) => {
    setOpenTopicId(prev => (prev === id ? null : id));
  };

  const getChapterForTopic = (topic: Topic) =>
    ESSENTIAL_CHAPTERS.find(ch => ch.id === topic.chapterId);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Static main header (no dropdown) */}
      <View style={styles.mainCard}>
        <View style={styles.mainHeaderRow}>
          <View style={styles.mainIconCircle}>
            <Text style={styles.mainIconText}>≡</Text>
          </View>
          <Text style={styles.mainTitle}>Essential Phrases & Greetings</Text>
        </View>
      </View>

      {/* Topics with their own dropdowns */}
      {TOPICS.map(topic => {
        const isOpen = topic.id === openTopicId;
        const chapter = getChapterForTopic(topic);

        return (
          <View key={topic.id} style={styles.topicCard}>
            <TouchableOpacity
              style={styles.topicHeader}
              activeOpacity={0.8}
              onPress={() => toggleTopic(topic.id)}
            >
              <Text style={styles.topicTitle}>{topic.title}</Text>
              <Text style={styles.chevron}>{isOpen ? '▴' : '▾'}</Text>
            </TouchableOpacity>

            {isOpen && chapter && (
              <View style={styles.topicBody}>
                {chapter.phrases.map(p => (
                  <View key={p.korean} style={styles.phraseRow}>
                    <Text style={styles.phraseKorean}>{p.korean}</Text>
                    <Text style={styles.phraseRoman}>{p.romanization}</Text>
                    <Text style={styles.phraseEnglish}>{p.english}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default EssentialsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
  },
  content: {
    padding: 16,
  },

  // Main header card
  mainCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  mainHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFE4CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  mainIconText: {
    color: '#F97316',
    fontWeight: '700',
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  // Topic accordions
  topicCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 1,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topicTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  chevron: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  topicBody: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
  },
  topicBodyText: {
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 8,
  },
  phraseRow: {
    marginBottom: 8,
  },
  phraseKorean: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  phraseRoman: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  phraseEnglish: {
    fontSize: 13,
    color: '#4B5563',
  },
});
