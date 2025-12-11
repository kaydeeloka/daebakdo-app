import React from 'react';
import { Image, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Message } from '../../app/(tabs)/game/types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  // Determine bubble and text styles based on sender and error status
  const bubbleStyle: ViewStyle[] = [
    styles.bubble,
    isBot ? styles.bubbleBot : styles.bubbleUser,
    isBot ? styles.roundedTLNone : styles.roundedTRNone,
    ...(message.isErrorFeedback ? [styles.bubbleError] : []),
  ];

  const textStyle: TextStyle[] = [
    styles.text,
    isBot ? styles.textBot : styles.textUser,
    ...(message.isErrorFeedback ? [styles.textError] : []),
  ];


  return (
    <View style={[styles.container, isBot ? styles.alignLeft : styles.alignRight]}>
      {/* Bot Avatar */}
      {isBot && (
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://picsum.photos/64/64' }}
            style={styles.avatar}
            accessibilityLabel="Bot Avatar"
          />
        </View>
      )}

      {/* Text Bubble */}
      <View style={bubbleStyle}>
        <Text style={textStyle}>{message.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,          // a bit tighter than 24 for mobile
    flexDirection: 'row',
  },
  alignLeft: {
    justifyContent: 'flex-start',
  },
  alignRight: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
    marginRight: 8,
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bubble: {
    maxWidth: '80%',           // prevent super-wide bubbles on large phones
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 18,
  },
  bubbleBot: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  bubbleUser: {
    backgroundColor: '#2563eb',
    shadowColor: '#2563eb',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  bubbleError: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  roundedTLNone: {
    borderTopLeftRadius: 0,
  },
  roundedTRNone: {
    borderTopRightRadius: 0,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  textBot: {
    color: '#111827',
  },
  textUser: {
    color: '#ffffff',
  },
  textError: {
    color: '#dc2626',
  },
});

