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

const NumbersScreen: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    sino: true,
    native: false,
    money: false,
    shopping: false,
  });

  const sections: Section[] = [
    {
      id: 'sino',
      title: 'Sino-Korean Numbers',
      items: [
        {
          korean: '영/공',
          romanized: 'Yeong/Gong',
          english: '0 (zero)',
        },
        {
          korean: '일',
          romanized: 'Il',
          english: '1',
        },
        {
          korean: '이',
          romanized: 'I',
          english: '2',
        },
        {
          korean: '삼',
          romanized: 'Sam',
          english: '3',
        },
        {
          korean: '사',
          romanized: 'Sa',
          english: '4',
        },
        {
          korean: '오',
          romanized: 'O',
          english: '5',
        },
        {
          korean: '육',
          romanized: 'Yuk',
          english: '6',
        },
        {
          korean: '칠',
          romanized: 'Chil',
          english: '7',
        },
        {
          korean: '팔',
          romanized: 'Pal',
          english: '8',
        },
        {
          korean: '구',
          romanized: 'Gu',
          english: '9',
        },
        {
          korean: '십',
          romanized: 'Ship',
          english: '10',
        },
        {
          korean: '백',
          romanized: 'Baek',
          english: '100',
        },
        {
          korean: '천',
          romanized: 'Cheon',
          english: '1,000',
        },
        {
          korean: '만',
          romanized: 'Man',
          english: '10,000',
        },
      ],
    },
    {
      id: 'native',
      title: 'Native Korean Numbers',
      items: [
        {
          korean: '하나',
          romanized: 'Hana',
          english: '1',
        },
        {
          korean: '둘',
          romanized: 'Dul',
          english: '2',
        },
        {
          korean: '셋',
          romanized: 'Set',
          english: '3',
        },
        {
          korean: '넷',
          romanized: 'Net',
          english: '4',
        },
        {
          korean: '다섯',
          romanized: 'Daseot',
          english: '5',
        },
        {
          korean: '여섯',
          romanized: 'Yeoseot',
          english: '6',
        },
        {
          korean: '일곱',
          romanized: 'Ilgop',
          english: '7',
        },
        {
          korean: '여덟',
          romanized: 'Yeodeol',
          english: '8',
        },
        {
          korean: '아홉',
          romanized: 'Ahop',
          english: '9',
        },
        {
          korean: '열',
          romanized: 'Yeol',
          english: '10',
        },
        {
          korean: '스무 개',
          romanized: 'Seumugeae',
          english: '20 (countable objects)',
        },
        {
          korean: '서른',
          romanized: 'Seoreun',
          english: '30',
        },
      ],
    },
    {
      id: 'money',
      title: 'Money Related Phrases',
      items: [
        {
          korean: '얼마예요?',
          romanized: 'Eolmayeyo?',
          english: 'How much is it?',
        },
        {
          korean: '너무 비싸요',
          romanized: 'Neomu bissayo',
          english: 'It\'s too expensive',
        },
        {
          korean: '할인이 있어요?',
          romanized: 'Halini isseoyo?',
          english: 'Is there a discount?',
        },
        {
          korean: '현금으로 낼게요',
          romanized: 'Hyungeumi-ro naelgeyo',
          english: 'I\'ll pay in cash',
        },
        {
          korean: '카드로 낼게요',
          romanized: 'Kadeuro naelgeyo',
          english: 'I\'ll pay with card',
        },
        {
          korean: '거스름돈은?',
          romanized: 'Geoseureumdon-eun?',
          english: 'What about the change?',
        },
        {
          korean: '영수증 주세요',
          romanized: 'Yeongsujeung juseyo',
          english: 'Please give me a receipt',
        },
        {
          korean: '이건 너무 싸요',
          romanized: 'Igeon neomu ssayo',
          english: 'This is very cheap',
        },
        {
          korean: '가격이 너무 낮아요',
          romanized: 'Gagyeogi neomu najwayo',
          english: 'The price is very low',
        },
        {
          korean: '이건 얼마예요?',
          romanized: 'Igeon eolmayeyo?',
          english: 'How much is this?',
        },
      ],
    },
    {
      id: 'shopping',
      title: 'Shopping Phrases',
      items: [
        {
          korean: '더 큰 사이즈가 있어요?',
          romanized: 'Deo keun saijeuga isseoyo?',
          english: 'Do you have a larger size?',
        },
        {
          korean: '더 작은 사이즈가 있어요?',
          romanized: 'Deo jageun saijeuga isseoyo?',
          english: 'Do you have a smaller size?',
        },
        {
          korean: '이거 입어봐도 돼요?',
          romanized: 'Igeeo ibeobwado dwaeyo?',
          english: 'Can I try this on?',
        },
        {
          korean: '다른 색깔이 있어요?',
          romanized: 'Dareun saekkkali isseoyo?',
          english: 'Do you have other colors?',
        },
        {
          korean: '이건 너무 작아요',
          romanized: 'Igeon neomu jagawayo',
          english: 'This is too small',
        },
        {
          korean: '이건 너무 커요',
          romanized: 'Igeon neomu keowayo',
          english: 'This is too big',
        },
        {
          korean: '이것도 감싸주세요',
          romanized: 'Igeotdo gamsajuseyo',
          english: 'Please wrap this too',
        },
        {
          korean: '다른 것 있어요?',
          romanized: 'Dareun geot isseoyo?',
          english: 'Do you have anything else?',
        },
        {
          korean: '이건 품질이 좋아요',
          romanized: 'Igeon pumjili joayo',
          english: 'This has good quality',
        },
        {
          korean: '쇼핑하기 좋아요',
          romanized: 'Shopingha gi joayo',
          english: 'It\'s good for shopping',
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
      <Text style={styles.header}>Numbers & Money</Text>

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

export default NumbersScreen;

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
