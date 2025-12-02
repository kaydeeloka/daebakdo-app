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
  // 1. START NODE: The entry point
  start: {
    id: 'start',
    text: "Hi there! Welcome to The Daily Grind. What can I get started for you today?",
    choices: [
      {
        id: 'c1_correct',
        text: "Hi! I'd like to order a Latte, please.",
        nextId: 'size_selection', // POINTS TO: The node with id 'size_selection'
        isCorrect: true
      },
      {
        id: 'c1_wrong_1',
        text: "Gimme a drink.",
        nextId: null, // NULL: Stays on 'start'
        isCorrect: false,
        feedback: "Um, I'd love to, but I need to know specifically what kind of drink you'd like! We have coffee, tea, and pastries."
      },
      {
        id: 'c1_wrong_2',
        text: "Where is the bathroom?",
        nextId: null,
        isCorrect: false,
        feedback: "It's in the back corner, but let's handle your order first if you're in line!"
      }
    ]
  },
  
  // 2. MIDDLE NODE: Size Selection
  size_selection: {
    id: 'size_selection',
    text: "Sure thing, a Latte. What size would you like? We have 12oz, 16oz, or 20oz.",
    choices: [
      {
        id: 'c2_correct',
        text: "I'll take the 16oz (Medium), please.",
        nextId: 'milk_selection', // POINTS TO: 'milk_selection'
        isCorrect: true
      },
      {
        id: 'c2_wrong_1',
        text: "The biggest one you have.",
        nextId: null,
        isCorrect: false,
        feedback: "Okay, 20oz it is... wait, actually could you confirm the specific size name just so I don't get it wrong?"
      },
      {
        id: 'c2_wrong_2',
        text: "Actually, I want a pizza.",
        nextId: null,
        isCorrect: false,
        feedback: "Haha, we're a coffee shop! We don't serve pizza. Still want that Latte?"
      }
    ]
  },
  
  // 3. MIDDLE NODE: Milk Selection
  milk_selection: {
    id: 'milk_selection',
    text: "Got it, 16oz Latte. Do you have a preference for milk? We have Whole, Oat, or Almond.",
    choices: [
      {
        id: 'c3_correct',
        text: "Oat milk would be perfect.",
        nextId: 'name_entry',
        isCorrect: true
      },
      {
        id: 'c3_wrong_1',
        text: "Just regular milk.",
        nextId: 'name_entry', // Note: This is also correct, leads to same place
        isCorrect: true 
      },
      {
        id: 'c3_wrong_2',
        text: "I want orange juice in it.",
        nextId: null,
        isCorrect: false,
        feedback: "Ew! I definitely can't do that. It would curdle immediately. Let's stick to milk options?"
      }
    ]
  },
  
  // 4. MIDDLE NODE: Name
  name_entry: {
    id: 'name_entry',
    text: "Great choice. Last thing, can I get a name for the order?",
    choices: [
      {
        id: 'c4_correct',
        text: "It's for Alex.",
        nextId: 'end', // POINTS TO: 'end'
        isCorrect: true
      },
      {
        id: 'c4_wrong_1',
        text: "Why do you need my name?",
        nextId: null,
        isCorrect: false,
        feedback: "It's just so we can call it out when it's ready at the pick-up counter!"
      },
      {
        id: 'c4_wrong_2',
        text: "No.",
        nextId: null,
        isCorrect: false,
        feedback: "Okay, I'll just put it under 'Mystery Guest' then... just kidding, a name really helps us out!"
      }
    ]
  },
  
  // 5. END NODE: Conclusion
  end: {
    id: 'end',
    text: "Perfect! That'll be $5.50. It'll be ready at the end of the bar in just a moment. Have a great day!",
    choices: [] // EMPTY ARRAY = GAME OVER / SUCCESS SCREEN
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
    title: 'The Daily Grind',
    description: 'Order a coffee like a pro.',
    icon: 'coffee', // Maps to <Coffee /> in App.tsx
    initialNodeId: 'start', 
    nodes: coffeeNodes
  },
  airport: {
    id: 'airport',
    title: 'Airport Check-in',
    description: 'Navigate the check-in counter.',
    icon: 'plane', // Maps to <Plane /> in App.tsx
    initialNodeId: 'start',
    nodes: airportNodes
  }
  // ADD YOUR NEW SCENARIO HERE:
  // my_scenario: {
  //   id: 'my_scenario',
  //   title: 'My Title',
  //   description: 'Description...',
  //   icon: 'coffee', // or 'plane'
  //   initialNodeId: 'start',
  //   nodes: myScenarioNodes
  // }
};