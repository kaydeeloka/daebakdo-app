import { Scenario, ScenarioNode } from '../types';

// --- SCENARIO 1: COFFEE SHOP ---
const coffeeNodes: Record<string, ScenarioNode> = {
  // 1. START NODE: 주문 시작 (What would you like?)
  start: {
    id: 'start',
    text: "어서 오세요! 무엇을 드릴까요?",
    choices: [
      {
        id: 'c1_correct',
        text: "아이스 아메리카노 주세요.",
        nextId: 'dine_takeout',
        isCorrect: true
      },
      {
        id: 'c1_wrong_1',
        text: "카드로 결제할게요.",
        nextId: null,
        isCorrect: false,
        feedback: "아직 주문을 안 하셨는데요! 먼저 메뉴를 말씀해 주세요."
      },
      {
        id: 'c1_wrong_2',
        text: "화장실 어디에요?",
        nextId: null,
        isCorrect: false,
        feedback: "뒤쪽에 있어요. 하지만 먼저 주문부터 해요!"
      }
    ]
  },

  // 2. MIDDLE NODE: 매장/포장 (For here or to go?)
  dine_takeout: {
    id: 'dine_takeout',
    text: "네, 아이스 아메리카노요. 여기서 드실거예요? 포장해 드릴까요?",
    choices: [
      {
        id: 'c2_correct',
        text: "포장해 주세요.",
        nextId: 'payment_selection',
        isCorrect: true
      },
      {
        id: 'c2_wrong_1',
        text: "이름이 뭐에요?",
        nextId: null,
        isCorrect: false,
        feedback: "진동벨로 부를게요! 포장/매장 중에 선택해 주세요."
      },
      {
        id: 'c2_wrong_2',
        text: "얼마에요?",
        nextId: null,
        isCorrect: false,
        feedback: "먼저 포장/매장 알려 주세요! 가격을 알려 드릴게요."
      }
    ]
  },

  // 3. MIDDLE NODE: 결제 방법 선택 (Payment type)
  payment_selection: {
    id: 'payment_selection',
    text: "어떤 결제 방법을 하시겠어요? 현금, 카드, 또는 휴대폰 결제 가능합니다.",
    choices: [
      {
        id: 'c3_correct',
        text: "카드로 할게요.",
        nextId: 'end',
        isCorrect: true
      },
      {
        id: 'c3_wrong_1',
        text: "사이즈를 말해 주세요.",
        nextId: null,
        isCorrect: false,
        feedback: "결제 방법을 먼저 선택해 주세요!"
      },
      {
        id: 'c3_wrong_2',
        text: "더 큰 사이즈 주세요.",
        nextId: null,
        isCorrect: false,
        feedback: "결제 방법을 먼저 골라 주세요!"
      }
    ]
  },

  // 4. END NODE: 주문 완료
  end: {
    id: 'end',
    text: "네, 결제 완료되었습니다. 주문하신 아이스 아메리카노 포장 4,500원입니다. 진동벨로 불러 드리겠습니다. 감사합니다!",
    choices: []
  }
};

// --- SCENARIO: Airport Check-in ---
const airportNodes = {
  start: {
    id: 'start',
    text: "안녕하세요. 어디로 가세요?",
    choices: [
      {
        id: 'a1_correct',
        text: "도쿄로 가요.",
        nextId: 'documents',
        isCorrect: true
      },
      {
        id: 'a1_wrong_1',
        text: "배고파요.",
        nextId: null,
        isCorrect: false,
        feedback: "지금은 체크인 중이에요. 여행지(도시)를 말씀해주세요."
      },
      {
        id: 'a1_wrong_2',
        text: "비밀이에요.",
        nextId: null,
        isCorrect: false,
        feedback: "목적지를 모르면 체크인을 할 수 없어요."
      }
    ]
  },

  documents: {
    id: 'documents',
    text: "좋습니다. 여권과 티켓 보여주세요.",
    choices: [
      {
        id: 'a2_correct',
        text: "네, 여기 있어요.",
        nextId: 'baggage',
        isCorrect: true
      },
      {
        id: 'a2_wrong_1',
        text: "집에 두고 왔어요.",
        nextId: null,
        isCorrect: false,
        feedback: "여권 없이는 비행기를 탈 수 없어요. 확인해보세요."
      },
      {
        id: 'a2_wrong_2',
        text: "왜 필요해요?",
        nextId: null,
        isCorrect: false,
        feedback: "체크인을 위해 신분 확인이 필요합니다."
      }
    ]
  },

  baggage: {
    id: 'baggage',
    text: "네, 확인했습니다. 수하물 부치시나요? 캐리어 있으세요?",
    choices: [
      {
        id: 'a3_correct_1',
        text: "네, 이 가방이요.",
        nextId: 'end',
        isCorrect: true
      },
      {
        id: 'a3_correct_2',
        text: "아니요, 기내 반입만 있어요.",
        nextId: 'end',
        isCorrect: true
      },
      {
        id: 'a3_wrong_1',
        text: "제 친구를 부치고 싶어요.",
        nextId: null,
        isCorrect: false,
        feedback: "사람은 수하물이 될 수 없어요. 진지하게 답해주세요!"
      }
    ]
  },

  end: {
    id: 'end',
    text: "알겠습니다. 체크인 완료입니다. 좋은 여행 되세요!",
    choices: []
  }
};


// --- SCENARIO: Convenience Store Checkout ---
const storeNodes = {
  start: {
    id: 'start',
    text: "안녕하세요. 계산 도와드릴게요. 이거 모두 사시는 건가요?",
    choices: [
      {
        id: 'c1_correct',
        text: "네, 맞아요.",
        nextId: 'pay',
        isCorrect: true
      },
      {
        id: 'c1_wrong_1',
        text: "아니요, 그냥 구경해요.",
        nextId: null,
        isCorrect: false,
        feedback: "계산대에서는 구경만 할 수 없어요. 사실 구매하실 건가요?"
      },
      {
        id: 'c1_wrong_2',
        text: "배고파요.",
        nextId: null,
        isCorrect: false,
        feedback: "지금은 계산 질문에만 답해주세요. 모두 사시는 건가요?"
      }
    ]
  },

  pay: {
    id: 'pay',
    text: "총 4,500원입니다. 결제는 어떻게 하시나요?",
    choices: [
      {
        id: 'c2_correct',
        text: "카드로 할게요.",
        nextId: 'extras',
        isCorrect: true
      },
      {
        id: 'c2_wrong_1',
        text: "돈 없어요.",
        nextId: null,
        isCorrect: false,
        feedback: "그러면 결제를 할 수 없어요. 결제 방법을 선택해주세요."
      },
      {
        id: 'c2_wrong_2',
        text: "무료예요?",
        nextId: null,
        isCorrect: false,
        feedback: "죄송하지만 무료가 아닙니다. 결제 방법을 선택해주세요."
      }
    ]
  },

  extras: {
    id: 'extras',
    text: "결제 완료되었습니다. 봉투 필요하세요? 영수증도 드릴까요?",
    choices: [
      {
        id: 'c3_correct_1',
        text: "네, 둘 다 주세요.",
        nextId: 'end',
        isCorrect: true
      },
      {
        id: 'c3_correct_2',
        text: "봉투만 주세요.",
        nextId: 'end',
        isCorrect: true
      },
      {
        id: 'c3_wrong_1',
        text: "저는 가방이 아니에요.",
        nextId: null,
        isCorrect: false,
        feedback: "잠시만요! 봉투가 필요한지 여쭤본 거예요. 필요하신가요?"
      }
    ]
  },

  end: {
    id: 'end',
    text: "네, 준비해드릴게요. 좋은 하루 되세요!",
    choices: []
  }
};

export const scenarios: Record<string, Scenario> = {
  coffee: {
    id: 'coffee',
    title: 'Coffee Shop',
    description: 'Order a coffee like a pro.',
    icon: 'coffee', // Maps to <Coffee /> in App.tsx
    initialNodeId: 'start',
    nodes: coffeeNodes,
    subtitle: undefined
  },
  airport: {
    id: 'airport',
    title: 'Airport Check-in',
    description: 'Navigate the check-in counter.',
    icon: 'plane', // Maps to <Plane /> in App.tsx
    initialNodeId: 'start',
    nodes: airportNodes,
    subtitle: undefined
  },
  store: {
    id: 'airport',
    title: 'Airport Check-in',
    description: 'Navigate the check-in counter.',
    icon: 'plane', // Maps to <Plane /> in App.tsx
    initialNodeId: 'start',
    nodes: airportNodes,
    subtitle: undefined
  }
};