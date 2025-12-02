import React from 'react';
import { Image, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  // Determine bubble and text styles based on sender and error status
  const bubbleStyle: ViewStyle[] = [
    styles.bubble,
    isBot ? styles.bubbleBot : styles.bubbleUser,
    message.isErrorFeedback ? styles.bubbleError : null,
    isBot ? styles.roundedTLNone : styles.roundedTRNone,
  ];

  const textStyle: TextStyle[] = [
    styles.text,
    isBot ? styles.textBot : styles.textUser,
    message.isErrorFeedback ? styles.textError : null,
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
    marginBottom: 24,
    flexDirection: 'row',
    maxWidth: '85%',
  },
  alignLeft: {
    justifyContent: 'flex-start',
  },
  alignRight: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6', // neutral-bg
    borderWidth: 1,
    borderColor: '#e5e7eb', // border
    overflow: 'hidden',
    marginRight: 12,
    flexShrink: 0,
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bubble: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 24,
  },
  bubbleBot: {
    backgroundColor: '#fff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  bubbleUser: {
    backgroundColor: '#2563eb', // secondary (vibrant blue)
    shadowColor: '#2563eb',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  bubbleError: {
    backgroundColor: '#fef2f2', // bg-red-50
    borderColor: '#fecaca', // border-red-200
  },
  roundedTLNone: {
    borderTopLeftRadius: 0,
  },
  roundedTRNone: {
    borderTopRightRadius: 0,
  },
  text: {
    fontSize: 18,
    lineHeight: 26,
  },
  textBot: {
    color: '#111827', // dark-text
  },
  textUser: {
    color: '#fff',
  },
  textError: {
    color: '#dc2626', // incorrect (red)
  },
});
