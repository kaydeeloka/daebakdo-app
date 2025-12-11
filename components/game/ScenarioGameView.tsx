import { ArrowLeft, Coffee, HelpCircle, Plane, RotateCcw } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGameEngine } from '../../app/(tabs)/game/hooks/useGameEngine';
import { Scenario } from '../../app/(tabs)/game/types';
import { ChatMessage } from './ChatMessage';
import { ChoiceArea } from './ChoiceArea';
import { TypingIndicator } from './TypingIndicator';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  coffee: Coffee,
  plane: Plane,
  default: HelpCircle
};

interface ScenarioGameViewProps {
  scenario: Scenario;
  onExit: () => void;
}

export const ScenarioGameView: React.FC<ScenarioGameViewProps> = ({ scenario, onExit }) => {
  const {
    messages,
    gameState,
    isTyping,
    showChoices,
    currentChoices,
    startGame,
    handleChoiceSelect
  } = useGameEngine(scenario);

  const scrollRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario.id]);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, isTyping, showChoices]);

  const renderIcon = (iconName: string) => {
    const Icon = ICON_MAP[iconName] || ICON_MAP.default;
    return <Icon size={24} color="#FFFFFF" />;
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onExit} style={styles.backButton}>
            <ArrowLeft size={24} color="#9CA3AF" />
          </TouchableOpacity>

          <View
            style={[
              styles.avatar,
              scenario.icon === 'coffee' ? styles.avatarPrimary : styles.avatarSecondary
            ]}
          >
            {renderIcon(scenario.icon)}
          </View>

          <View>
            <Text style={styles.title}>{scenario.title}</Text>
            <View style={styles.liveRow}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Live Chat</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={startGame} style={styles.restartButton}>
          <RotateCcw size={22} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Chat area */}
      <View style={styles.chatContainer}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.chatScrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map(msg => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isTyping && <TypingIndicator />}
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {gameState === 'GAME_OVER' ? (
          <View style={styles.gameOverBox}>
            <Text style={styles.gameOverTitle}>Scenario Complete!</Text>
            <Text style={styles.gameOverText}>
              You successfully completed {scenario.title}.
            </Text>
            <View style={styles.gameOverButtonsRow}>
              <TouchableOpacity style={styles.primaryButton} onPress={startGame}>
                <Text style={styles.primaryButtonText}>Replay</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton} onPress={onExit}>
                <Text style={styles.secondaryButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          showChoices && (
            <ChoiceArea
              choices={currentChoices}
              onSelect={handleChoiceSelect}
              disabled={isTyping}
            />
          )
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F5F7'
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backButton: {
    marginRight: 12
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  avatarPrimary: {
    backgroundColor: '#F97316'
  },
  avatarSecondary: {
    backgroundColor: '#6366F1'
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827'
  },
  liveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    marginRight: 6
  },
  liveText: {
    fontSize: 12,
    color: '#22C55E',
    fontWeight: '600'
  },
  restartButton: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: '#F3F4F6'
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  chatScrollContent: {
    paddingBottom: 16
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  gameOverBox: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center'
  },
  gameOverTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'BalooChettan2-Medium',
    color: '#1D4ED8',
    marginBottom: 4
  },
  gameOverText: {
    fontSize: 14,
    fontFamily: 'BalooChettan2-Medium',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center'
  },
  gameOverButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  primaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#F97316',
    marginRight: 8
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'BalooChettan2-Medium'
  },
  secondaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#F97316',
    backgroundColor: '#FFFFFF'
  },
  secondaryButtonText: {
    color: '#F97316',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'BalooChettan2-Medium'
  }
});
