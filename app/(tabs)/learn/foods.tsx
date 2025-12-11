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

const FoodsScreen: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    streetFood: true,
    restaurant: false,
    convenience: false,
  });

  const sections: Section[] = [
    {
      id: 'streetFood',
      title: 'Street Food Words',
      items: [
        {
          korean: '떡볶이',
          romanized: 'Tteokbokki',
          english: 'Spicy rice cakes',
        },
        {
          korean: '호떡',
          romanized: 'Hotteok',
          english: 'Sweet pancake',
        },
        {
          korean: '순대',
          romanized: 'Sundae',
          english: 'Korean blood sausage',
        },
        {
          korean: '김밥',
          romanized: 'Kimbap',
          english: 'Seaweed rice roll',
        },
        {
          korean: '핫도그',
          romanized: 'Hotdog',
          english: 'Hot dog',
        },
        {
          korean: '어묵',
          romanized: 'Eomuk',
          english: 'Fish cake',
        },
        {
          korean: '국물',
          romanized: 'Gungmul',
          english: 'Soup/Broth',
        },
        {
          korean: '계란',
          romanized: 'Gyeran',
          english: 'Egg',
        },
        {
          korean: '고기 꼬치',
          romanized: 'Gogi Kkochi',
          english: 'Meat skewers',
        },
        {
          korean: '마라탕',
          romanized: 'Maratang',
          english: 'Chinese spicy broth',
        },
      ],
    },
    {
      id: 'restaurant',
      title: 'Restaurant Essential Things',
      items: [
        {
          korean: '테이블',
          romanized: 'Table',
          english: 'Table',
        },
        {
          korean: '의자',
          romanized: 'Uija',
          english: 'Chair',
        },
        {
          korean: '메뉴판',
          romanized: 'Menuupan',
          english: 'Menu',
        },
        {
          korean: '주문하다',
          romanized: 'Jumunhada',
          english: 'To order',
        },
        {
          korean: '계산하다',
          romanized: 'Gyesanhada',
          english: 'To pay',
        },
        {
          korean: '배고프다',
          romanized: 'Baegoproda',
          english: 'To be hungry',
        },
        {
          korean: '물',
          romanized: 'Mul',
          english: 'Water',
        },
        {
          korean: '서빙',
          romanized: 'Serving',
          english: 'Serving/Service',
        },
        {
          korean: '이 음식이 맛있어요',
          romanized: 'I eumshigi mashisseoyo',
          english: 'This food is delicious',
        },
        {
          korean: '계산서',
          romanized: 'Gyesanseo',
          english: 'Bill/Receipt',
        },
      ],
    },
    {
      id: 'convenience',
      title: 'Convenience Store Items',
      items: [
        {
          korean: '라면',
          romanized: 'Ramyeon',
          english: 'Instant noodles',
        },
        {
          korean: '김밥',
          romanized: 'Kimbap',
          english: 'Seaweed rice roll',
        },
        {
          korean: '도시락',
          romanized: 'Dosirak',
          english: 'Lunch box',
        },
        {
          korean: '음료수',
          romanized: 'Eumryosu',
          english: 'Beverage',
        },
        {
          korean: '커피',
          romanized: 'Keopi',
          english: 'Coffee',
        },
        {
          korean: '우유',
          romanized: 'Uyu',
          english: 'Milk',
        },
        {
          korean: '스낵',
          romanized: 'Seunnaek',
          english: 'Snack',
        },
        {
          korean: '초콜릿',
          romanized: 'Chokolllit',
          english: 'Chocolate',
        },
        {
          korean: '사탕',
          romanized: 'Satang',
          english: 'Candy',
        },
        {
          korean: '계산대',
          romanized: 'Gyesandae',
          english: 'Cash register/Checkout',
        },
        {
          korean: '봉지',
          romanized: 'Bongji',
          english: 'Bag',
        },
        {
          korean: '가격',
          romanized: 'Gagyeok',
          english: 'Price',
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
      <Text style={styles.header}>Food & Dining</Text>

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

export default FoodsScreen;

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
