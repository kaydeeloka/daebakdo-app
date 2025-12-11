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

const TransportationScreen: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    types: true,
    phrases: false,
    directions: false,
    tickets: false,
  });

  const sections: Section[] = [
    {
      id: 'types',
      title: 'Types of Transportation',
      items: [
        {
          korean: '버스',
          romanized: 'Beoseu',
          english: 'Bus',
        },
        {
          korean: '택시',
          romanized: 'Taeksi',
          english: 'Taxi',
        },
        {
          korean: '지하철',
          romanized: 'Jihacheol',
          english: 'Subway',
        },
        {
          korean: '기차',
          romanized: 'Gicha',
          english: 'Train',
        },
        {
          korean: '비행기',
          romanized: 'Bihaenggi',
          english: 'Airplane',
        },
        {
          korean: '배',
          romanized: 'Bae',
          english: 'Ship/Boat',
        },
        {
          korean: '자동차',
          romanized: 'Jadongcha',
          english: 'Car',
        },
        {
          korean: '오토바이',
          romanized: 'Ototabai',
          english: 'Motorcycle',
        },
        {
          korean: '자전거',
          romanized: 'Jajeongeeo',
          english: 'Bicycle',
        },
        {
          korean: '보도',
          romanized: 'Bodo',
          english: 'Walking',
        },
      ],
    },
    {
      id: 'phrases',
      title: 'Transportation Phrases',
      items: [
        {
          korean: '(목적지)로 가는 버스는?',
          romanized: 'Moksjeokjiro ganeun beoseun?',
          english: 'Which bus goes to (destination)?',
        },
        {
          korean: '얼마나 걸려요?',
          romanized: 'Eolmana geollyeyo?',
          english: 'How long does it take?',
        },
        {
          korean: '내려줄 수 있어요?',
          romanized: 'Naeryeojul su isseoyo?',
          english: 'Can you drop me off?',
        },
        {
          korean: '여기서 내릴게요',
          romanized: 'Yeogiseo naerillgeyo',
          english: 'I\'ll get off here',
        },
        {
          korean: '다음 정거장이 어디예요?',
          romanized: 'Daeum jeonggeojang-i eodiyeyo?',
          english: 'What\'s the next stop?',
        },
        {
          korean: '지하철역 어디예요?',
          romanized: 'Jihacheolyeok eodiyeyo?',
          english: 'Where is the subway station?',
        },
        {
          korean: '이 버스는 (장소)로 가요?',
          romanized: 'I beoseun (jangso)ro gayo?',
          english: 'Does this bus go to (place)?',
        },
        {
          korean: '환승하려면 어디서 해요?',
          romanized: 'Hwanseungharyeomyeon eodiseo haeyo?',
          english: 'Where do I transfer?',
        },
        {
          korean: '편도표 주세요',
          romanized: 'Pyeondopyo juseyo',
          english: 'One-way ticket please',
        },
        {
          korean: '왕복표 주세요',
          romanized: 'Wangbokpyo juseyo',
          english: 'Round-trip ticket please',
        },
      ],
    },
    {
      id: 'directions',
      title: 'Directions & Locations',
      items: [
        {
          korean: '앞으로',
          romanized: 'Appeuro',
          english: 'Straight ahead',
        },
        {
          korean: '왼쪽으로',
          romanized: 'Wenjjogeur-o',
          english: 'Turn left',
        },
        {
          korean: '오른쪽으로',
          romanized: 'Oreunji-jjog-euro',
          english: 'Turn right',
        },
        {
          korean: '가까워요',
          romanized: 'Gakkaowayo',
          english: 'It\'s close',
        },
        {
          korean: '멀어요',
          romanized: 'Meoreowayo',
          english: 'It\'s far',
        },
        {
          korean: '북쪽',
          romanized: 'Bukjjok',
          english: 'North',
        },
        {
          korean: '남쪽',
          romanized: 'Namjjok',
          english: 'South',
        },
        {
          korean: '동쪽',
          romanized: 'Dongjjok',
          english: 'East',
        },
        {
          korean: '서쪽',
          romanized: 'Seojjok',
          english: 'West',
        },
        {
          korean: '(장소)는 어디예요?',
          romanized: 'Jangsoneun eodiyeyo?',
          english: 'Where is (place)?',
        },
      ],
    },
    {
      id: 'tickets',
      title: 'Tickets & Fares',
      items: [
        {
          korean: '표',
          romanized: 'Pyo',
          english: 'Ticket',
        },
        {
          korean: '요금',
          romanized: 'Yogeum',
          english: 'Fare/Fee',
        },
        {
          korean: '카드',
          romanized: 'Kadeu',
          english: 'Card',
        },
        {
          korean: '승차권',
          romanized: 'Seungchagwon',
          english: 'Ticket',
        },
        {
          korean: '어른 표',
          romanized: 'Eoreun pyo',
          english: 'Adult ticket',
        },
        {
          korean: '아이 표',
          romanized: 'Ai pyo',
          english: 'Child ticket',
        },
        {
          korean: '경로 할인',
          romanized: 'Gyeongno hallin',
          english: 'Senior discount',
        },
        {
          korean: '학생 할인',
          romanized: 'Haksaeng hallin',
          english: 'Student discount',
        },
        {
          korean: '정기권',
          romanized: 'Jeongigwon',
          english: 'Pass/Season ticket',
        },
        {
          korean: '환불',
          romanized: 'Hwanbul',
          english: 'Refund',
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
      <Text style={styles.header}>Transportation</Text>

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

export default TransportationScreen;

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
