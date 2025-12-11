import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Phrase {
  korean: string;
  romanized: string;
  english: string;
}

interface Section {
  id: string;
  title: string;
  items: Phrase[];
}

const EssentialsScreen: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    greetings: true,
    common: false,
    questions: false,
    address: false,
  });

  const sections: Section[] = [
    {
      id: 'greetings',
      title: 'Essential Greetings',
      items: [
        {
          korean: '안녕하세요',
          romanized: 'Annyeonghaseyo',
          english: 'Hello',
        },
        {
          korean: '감사합니다',
          romanized: 'Gamsahamnida',
          english: 'Thank you',
        },
        {
          korean: '죄송합니다',
          romanized: 'Joesongahmnida',
          english: 'Sorry',
        },
        {
          korean: '네',
          romanized: 'Ne',
          english: 'Yes',
        },
        {
          korean: '아니요',
          romanized: 'Aniyo',
          english: 'No',
        },
      ],
    },
    {
      id: 'common',
      title: 'Common Phrases',
      items: [
        {
          korean: '좋습니다',
          romanized: 'Josilmnida',
          english: 'Good / Okay',
        },
        {
          korean: '천천히 말해주세요',
          romanized: 'Cheoncheonhi malhaejuseyo',
          english: 'Please speak slowly',
        },
        {
          korean: '이해합니다',
          romanized: 'Ihaehhamnida',
          english: 'I understand',
        },
        {
          korean: '모릅니다',
          romanized: 'Moreubnida',
          english: "I don't know",
        },
      ],
    },
    {
      id: 'questions',
      title: 'Common Questions',
      items: [
        {
          korean: '이게 뭐예요?',
          romanized: 'Igge mwoyeyo?',
          english: 'What is this?',
        },
        {
          korean: '어디예요?',
          romanized: 'Eodiyeyo?',
          english: 'Where is it?',
        },
        {
          korean: '얼마예요?',
          romanized: 'Eolmayeyo?',
          english: 'How much is it?',
        },
        {
          korean: '시간이 몇 시예요?',
          romanized: 'Sigani myeot siyeyo?',
          english: 'What time is it?',
        },
      ],
    },
    {
      id: 'address',
      title: 'How to address people',
      items: [
        {
          korean: '선생님',
          romanized: 'Seonsaengnim',
          english: 'Teacher',
        },
        {
          korean: '누나',
          romanized: 'Nuna',
          english: 'Older sister (if male)',
        },
        {
          korean: '형',
          romanized: 'Hyung',
          english: 'Older brother (if male)',
        },
        {
          korean: '언니',
          romanized: 'Eonni',
          english: 'Older sister (if female)',
        },
      ],
    },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Essential Phrases & Greetings</Text>

      {sections.map(section => (
        <View key={section.id} style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection(section.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <MaterialIcons
              name={expandedSections[section.id] ? 'expand-less' : 'expand-more'}
              size={24}
              color="#333"
            />
          </TouchableOpacity>

          {expandedSections[section.id] && (
            <View style={styles.sectionContent}>
              {section.items.map((item, index) => (
                <View key={index} style={styles.phraseItem}>
                  <View style={styles.phraseTextContainer}>
                    <Text style={styles.korean}>{item.korean}</Text>
                    <Text style={styles.romanized}>{item.romanized}</Text>
                  </View>
                  <Text style={styles.english}>{item.english}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default EssentialsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F5',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
    marginTop: 8,
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFF9F1',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  sectionContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0E6DC',
  },
  phraseItem: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phraseTextContainer: {
    flex: 1,
  },
  korean: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  romanized: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  english: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
    marginLeft: 12,
  },
});
