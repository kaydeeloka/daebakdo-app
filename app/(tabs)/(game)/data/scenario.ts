import { Scenario, ScenarioNode } from '../types';

/**
 * ==========================================================================================
 *                                  SCENARIO CREATION GUIDE
 * ==========================================================================================
 * 
 * HOW TO ADD A NEW SCENARIO:
 * 
 * 1. DEFINE YOUR NODES (The Conversation Graph)
 *    - Create a constant variable (e.g., `const pizzaNodes = { ... }`).
 *    - Every conversation needs a 'start' node.
 *    - Each node represents one message from the Bot.
 * 
 * 2. UNDERSTANDING FLOW & BRANCHING
 *    - When a user clicks a choice, the `nextId` determines where they go.
 *    - Correct Answer (`isCorrect: true`):
 *         The bot moves to the node matching `nextId`.
 *    - Wrong Answer (`isCorrect: false`):
 *         The bot stays on the CURRENT node.
 *         It shows the `feedback` message (e.g., "That's not right").
 *         Then it re-displays the choices so the user can try again.
 * 
 * 3. ENDING THE GAME
 *    - To end a scenario, create a node with an empty choices array: `choices: []`.
 * 
 * 4. ICONS
 *    - The `icon` property maps to the icon library in `App.tsx`.
 *    - CURRENT AVAILABLE NAMES: 'coffee', 'plane', 'user'.
 *    - To add more, open `App.tsx`, import the icon from 'lucide-react', and add it to `ICON_MAP`.
 * 
 * ==========================================================================================
 */


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

// --- SCENARIO 2: AIRPORT CHECK-IN ---
const airportNodes: Record<string, ScenarioNode> = {
  start: {
    id: 'start',
    text: "Good morning. Welcome to SkyHigh Airlines. Where are you flying to today?",
    choices: [
      {
        id: 'a1_correct',
        text: "Hi, I'm flying to New York.",
        nextId: 'documents',
        isCorrect: true
      },
      {
        id: 'a1_wrong_1',
        text: "I'd like a cheeseburger.",
        nextId: null,
        isCorrect: false,
        feedback: "Sir, this is the check-in counter, not the food court. Where are you flying?"
      },
      {
        id: 'a1_wrong_2',
        text: "It's a secret.",
        nextId: null,
        isCorrect: false,
        feedback: "I'm afraid I can't check you in if I don't know your destination!"
      }
    ]
  },
  documents: {
    id: 'documents',
    text: "New York, excellent. May I see your passport and ticket, please?",
    choices: [
      {
        id: 'a2_correct',
        text: "Here they are.",
        nextId: 'bags',
        isCorrect: true
      },
      {
        id: 'a2_wrong_1',
        text: "I left them at home.",
        nextId: null,
        isCorrect: false,
        feedback: "Oh dear. You definitely need those to fly. Please double check your pockets?"
      },
      {
        id: 'a2_wrong_2',
        text: "Why do you need to see them?",
        nextId: null,
        isCorrect: false,
        feedback: "Standard security procedure. I need to verify your identity and booking."
      }
    ]
  },
  bags: {
    id: 'bags',
    text: "Thank you, everything looks in order. Are you checking any bags today?",
    choices: [
      {
        id: 'a3_correct_1',
        text: "Yes, just this suitcase.",
        nextId: 'security_q',
        isCorrect: true
      },
      {
        id: 'a3_correct_2',
        text: "No, carry-on only.",
        nextId: 'security_q',
        isCorrect: true
      },
      {
        id: 'a3_wrong_1',
        text: "Can I check my friend in as luggage?",
        nextId: null,
        isCorrect: false,
        feedback: "Haha, very funny. Human trafficking is strictly prohibited. Serious answers only, please."
      }
    ]
  },
  security_q: {
    id: 'security_q',
    text: "Alright. Place it on the scale. Has this bag been in your possession the entire time?",
    choices: [
      {
        id: 'a4_correct',
        text: "Yes, I packed it myself.",
        nextId: 'end',
        isCorrect: true
      },
      {
        id: 'a4_wrong_1',
        text: "No, a stranger gave it to me outside.",
        nextId: null,
        isCorrect: false,
        feedback: "Whoa! That is a major security risk. We would have to call the police. Let's pretend you didn't say that."
      }
    ]
  },
  end: {
    id: 'end',
    text: "Great. Here is your boarding pass. Your flight leaves from Gate B12. Have a safe trip!",
    choices: []
  }
};

/*
 * ==========================================================================================
 *                                  TEMPLATE (COPY & PASTE THIS)
 * ==========================================================================================
 * 
 * const myScenarioNodes: Record<string, ScenarioNode> = {
 *   start: {
 *     id: 'start',
 *     text: "BOT MESSAGE HERE",
 *     choices: [
 *       {
 *         id: 'opt_1',
 *         text: "USER OPTION 1",
 *         nextId: 'node_2', // Go to node_2
 *         isCorrect: true
 *       },
 *       {
 *         id: 'opt_2',
 *         text: "WRONG OPTION",
 *         nextId: null, // Stay here
 *         isCorrect: false,
 *         feedback: "BOT FEEDBACK FOR WRONG ANSWER"
 *       }
 *     ]
 *   },
 *   node_2: {
 *      id: 'node_2',
 *      text: "NEXT BOT MESSAGE",
 *      choices: [] // Empty choices means END of conversation
 *   }
 * };
 * 
 * ==========================================================================================
 */


// --- EXPORTED COLLECTION ---
// This is where the app looks for your levels.
// Add your new scenario to this list.

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