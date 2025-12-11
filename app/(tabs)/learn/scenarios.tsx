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

const ScenariosScreen: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    hotelCheckin: true,
    restaurant: false,
    airport: false,
    directions: false,
    emergency: false,
  });

  const sections: Section[] = [
    {
      id: 'hotelCheckin',
      title: 'Hotel Check-in',
      items: [
        {
          korean: '예약했어요',
          romanized: 'Yeyakhaesseoyo',
          english: 'I have a reservation',
        },
        {
          korean: '제 이름은 (이름)이에요',
          romanized: 'Je ireumeun (ireum)ieyo',
          english: 'My name is (name)',
        },
        {
          korean: '몇 박이요?',
          romanized: 'Myeot bagi-yo?',
          english: 'How many nights?',
        },
        {
          korean: '언제 체크아웃이에요?',
          romanized: 'Eonje checkaut-ieyo?',
          english: 'When is check-out?',
        },
        {
          korean: '조식이 포함되어 있어요?',
          romanized: 'Josigi pohamkdwieoh isseoyo?',
          english: 'Is breakfast included?',
        },
        {
          korean: '와이파이 비밀번호는?',
          romanized: 'Waipai bimineunhoneun?',
          english: 'What is the WiFi password?',
        },
        {
          korean: '짐을 맡을 수 있어요?',
          romanized: 'Jimeul mateul su isseoyo?',
          english: 'Can I store my luggage?',
        },
        {
          korean: '엘리베이터는 어디예요?',
          romanized: 'Ellibeitereun eodiyeyo?',
          english: 'Where is the elevator?',
        },
        {
          korean: '세탁 서비스가 있어요?',
          romanized: 'Setaek seobiseu-ga isseoyo?',
          english: 'Is there laundry service?',
        },
        {
          korean: '늦게 체크아웃을 할 수 있어요?',
          romanized: 'Neutke checkaut-eul hal su isseoyo?',
          english: 'Can I check out late?',
        },
      ],
    },
    {
      id: 'restaurant',
      title: 'Restaurant Dining',
      items: [
        {
          korean: '테이블 하나 있어요?',
          romanized: 'Table hana isseoyo?',
          english: 'Do you have a table for one?',
        },
        {
          korean: '몇 명이세요?',
          romanized: 'Myeot myeong-iseyo?',
          english: 'How many people?',
        },
        {
          korean: '메뉴판 주세요',
          romanized: 'Menuupan juseyo',
          english: 'Menu please',
        },
        {
          korean: '추천 메뉴가 뭐예요?',
          romanized: 'Chuchen menuega mwoyeyo?',
          english: 'What do you recommend?',
        },
        {
          korean: '이거 뭐예요?',
          romanized: 'Igeeo mwoyeyo?',
          english: 'What is this?',
        },
        {
          korean: '매워요? 아니에요?',
          romanized: 'Maewoyo? Anieyo?',
          english: 'Is it spicy? Or not?',
        },
        {
          korean: '물 한잔 주세요',
          romanized: 'Mul hanjan juseyo',
          english: 'Water please',
        },
        {
          korean: '주문할게요',
          romanized: 'Jumunhallgeyo',
          english: 'I\'ll order',
        },
        {
          korean: '계산해주세요',
          romanized: 'Gyesanhhaejuseyo',
          english: 'Please bring the bill',
        },
        {
          korean: '정말 맛있었어요',
          romanized: 'Jeongmal masiteoesseoyo',
          english: 'It was delicious',
        },
      ],
    },
    {
      id: 'airport',
      title: 'Airport & Flight',
      items: [
        {
          korean: '카운터는 어디예요?',
          romanized: 'Kaunteereun eodiyeyo?',
          english: 'Where is the counter?',
        },
        {
          korean: '항공편 번호는?',
          romanized: 'Hanggongpyeon bonhoneun?',
          english: 'What is the flight number?',
        },
        {
          korean: '탑승 시간이 언제예요?',
          romanized: 'Tapsseung sigang-i eonjeyeyo?',
          english: 'When is boarding time?',
        },
        {
          korean: '짐의 무게 제한이 있어요?',
          romanized: 'Jimeui mugye jehangi isseoyo?',
          english: 'Is there a weight limit?',
        },
        {
          korean: '여권을 가져왔어요',
          romanized: 'Yeogwoneul gajyeowasseoyo',
          english: 'I brought my passport',
        },
        {
          korean: '비자가 필요해요?',
          romanized: 'Bijaga pilyohaeyo?',
          english: 'Do I need a visa?',
        },
        {
          korean: '게이트는 어디예요?',
          romanized: 'Geiteneun eodiyeyo?',
          english: 'Where is the gate?',
        },
        {
          korean: '탑승 카드를 잃어버렸어요',
          romanized: 'Tapsseung kadeu-reul ileobeolyeosseoyo',
          english: 'I lost my boarding pass',
        },
        {
          korean: '국제선 출발이에요',
          romanized: 'Gukjewon chulbal-ieyo',
          english: 'It\'s an international flight',
        },
        {
          korean: '수하물을 부칠 수 있어요?',
          romanized: 'Suhamul-eul buchil su isseoyo?',
          english: 'Can I check baggage?',
        },
      ],
    },
    {
      id: 'directions',
      title: 'Asking for Directions',
      items: [
        {
          korean: '미안해요, (장소)는 어디예요?',
          romanized: 'Mianhaeyo, (jangso)neun eodiyeyo?',
          english: 'Excuse me, where is (place)?',
        },
        {
          korean: '지도가 있어요?',
          romanized: 'Jidoga isseoyo?',
          english: 'Do you have a map?',
        },
        {
          korean: '여기서 멀어요?',
          romanized: 'Yeogiseo meoreowayo?',
          english: 'Is it far from here?',
        },
        {
          korean: '어떻게 가요?',
          romanized: 'Eotteohke gayo?',
          english: 'How do I get there?',
        },
        {
          korean: '앞으로 쭉 가면 돼요',
          romanized: 'Appeuro jjuk gamyeon dwaeyo',
          english: 'Just go straight ahead',
        },
        {
          korean: '다음 모퉁이에서 왼쪽으로 꺾어요',
          romanized: 'Daeum motung-i-eseo wenjjog-euro kkeul-eoyo',
          english: 'Turn left at the next corner',
        },
        {
          korean: '버스 정거장은 어디예요?',
          romanized: 'Beoseu jeonggeojang-eun eodiyeyo?',
          english: 'Where is the bus stop?',
        },
        {
          korean: '택시를 부를 수 있어요?',
          romanized: 'Taeksireul bureul su isseoyo?',
          english: 'Can you call a taxi?',
        },
        {
          korean: '지하철역까지 몇 분이에요?',
          romanized: 'Jihacheolyeokkkaji myeot bunideyo?',
          english: 'How many minutes to the subway?',
        },
        {
          korean: '이 주소로 가주세요',
          romanized: 'I jusororyeo gajuseyo',
          english: 'Please take me to this address',
        },
      ],
    },
    {
      id: 'emergency',
      title: 'Emergency & Help',
      items: [
        {
          korean: '도와주세요!',
          romanized: 'Dowajuseyo!',
          english: 'Help!',
        },
        {
          korean: '경찰을 부르세요',
          romanized: 'Gyeongchal-eul bureuseyo',
          english: 'Call the police',
        },
        {
          korean: '병원에 가야 해요',
          romanized: 'Byeongwon-e gayah haeyo',
          english: 'I need to go to the hospital',
        },
        {
          korean: '여권을 잃어버렸어요',
          romanized: 'Yeogwon-eul ileobeolyeosseoyo',
          english: 'I lost my passport',
        },
        {
          korean: '지갑을 잃어버렸어요',
          romanized: 'Jigab-eul ileobeolyeosseoyo',
          english: 'I lost my wallet',
        },
        {
          korean: '어디가 아파요?',
          romanized: 'Eodiga apayo?',
          english: 'Where does it hurt?',
        },
        {
          korean: '약국은 어디예요?',
          romanized: 'Yakkuk-eun eodiyeyo?',
          english: 'Where is the pharmacy?',
        },
        {
          korean: '영사관은 어디예요?',
          romanized: 'Yeongsakwan-eun eodiyeyo?',
          english: 'Where is the embassy?',
        },
        {
          korean: '전화 번호를 알려주세요',
          romanized: 'Jeonhwa beonnoreul allyeojuseyo',
          english: 'Please give me the phone number',
        },
        {
          korean: '누군가 저를 도와줘요',
          romanized: 'Nugunya jeoreul dowajweoyo',
          english: 'Someone help me',
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
      <Text style={styles.header}>Travel Scenarios</Text>

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

export default ScenariosScreen;

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
