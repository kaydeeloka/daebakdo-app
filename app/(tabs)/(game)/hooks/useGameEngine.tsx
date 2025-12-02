import { useCallback, useState } from 'react';
import { Choice, GameState, Message, Scenario } from '../types';

export const useGameEngine = (scenario: Scenario) => {
  // --- STATE MANAGEMENT ---
  
  // Stores the history of chat bubbles (both user and bot)
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Tracks the ID of the current conversation step (matches keys in scenario.nodes)
  const [currentNodeId, setCurrentNodeId] = useState<string>(scenario.initialNodeId);
  
  // Tracks overall game status (START -> PLAYING -> GAME_OVER)
  const [gameState, setGameState] = useState<GameState>('START');
  
  // Controls the "..." bubble visibility. Used to lock interaction while bot is "thinking"
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  // Controls when the MCQ buttons appear. Usually hidden while bot is typing.
  const [showChoices, setShowChoices] = useState<boolean>(false);

  /**
   * HELPER: Add Message
   * Adds a new bubble to the UI. 
   * 'isErrorFeedback' allows specific styling for wrong answer responses (e.g., red tint).
   */
  const addMessage = useCallback((sender: 'bot' | 'user', text: string, isErrorFeedback = false) => {
    const newMessage: Message = {
      id: Date.now().toString() + Math.random().toString(), // Unique ID generation
      sender,
      text,
      isErrorFeedback
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  /**
   * LOGIC: Start Game
   * Resets all state and fires the first message of the scenario.
   */
  const startGame = useCallback(() => {
    // 1. Reset state
    setMessages([]);
    setCurrentNodeId(scenario.initialNodeId);
    setGameState('PLAYING');
    setIsTyping(true);
    setShowChoices(false);

    // 2. Artificial delay for realism (1 second) before the first message appears
    setTimeout(() => {
      const startNode = scenario.nodes[scenario.initialNodeId];
      if (startNode) {
        addMessage('bot', startNode.text);
      }
      // 3. Reveal UI
      setIsTyping(false);
      setShowChoices(true);
    }, 1000); // <--- CUSTOMIZABLE: Change delay time here (in milliseconds)
  }, [scenario, addMessage]);

  /**
   * CORE LOGIC: Handle Choice Selection
   * This is the main decision engine.
   */
  const handleChoiceSelect = useCallback((choice: Choice) => {
    // 1. Hide choices immediately so user can't double click
    setShowChoices(false);
    
    // 2. Add the USER'S selected text to the chat
    addMessage('user', choice.text);
    
    // 3. Show typing indicator to simulate bot processing
    setIsTyping(true);

    if (choice.isCorrect) {
      // ------------------------------------------------
      // PATH A: CORRECT ANSWER
      // Move to the next node in the conversation graph.
      // ------------------------------------------------
      setTimeout(() => {
        // Check if there is a next step
        if (choice.nextId && scenario.nodes[choice.nextId]) {
          const nextNode = scenario.nodes[choice.nextId];
          
          // Update pointer to new node
          setCurrentNodeId(choice.nextId);
          
          // Add Bot's response associated with the NEW node
          addMessage('bot', nextNode.text);
          setIsTyping(false);
          
          // Check if this new node has choices. If not, it's the end.
          if (nextNode.choices.length === 0) {
            setGameState('GAME_OVER');
          } else {
            setShowChoices(true);
          }
        } else {
          // Fallback if no next ID is provided (Implicit end of game)
          setIsTyping(false);
          setGameState('GAME_OVER');
        }
      }, 1200); // <--- CUSTOMIZABLE: Delay for correct answer (1.2 seconds)
    } else {
      // ------------------------------------------------
      // PATH B: WRONG ANSWER
      // Stay on the CURRENT node, show feedback, then let user try again.
      // ------------------------------------------------
      setTimeout(() => {
        // Use custom feedback text or a generic default
        const feedback = choice.feedback || "I didn't catch that. Could you try again?";
        
        // Add feedback message (flagged as 'ErrorFeedback' for styling)
        addMessage('bot', feedback, true);
        setIsTyping(true);

        // Wait a bit after feedback before showing the SAME choices again
        setTimeout(() => {
          setIsTyping(false);
          setShowChoices(true); // Re-enable the same options
        }, 1500); // <--- CUSTOMIZABLE: Time to read the error message
      }, 1000); 
    }
  }, [scenario, addMessage]);

  // Get the choices for the current state to pass to the UI
  const currentChoices = scenario.nodes[currentNodeId]?.choices || [];

  return {
    messages,
    gameState,
    isTyping,
    showChoices,
    currentChoices,
    startGame,
    handleChoiceSelect
  };
};