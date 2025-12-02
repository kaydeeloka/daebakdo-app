import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function GameScreen() {
  const goHome = () => router.replace('/landing'); // go to app/index.tsx

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>This is gaming page</Text>

      <TouchableOpacity style={styles.homeButton} onPress={goHome}>
        <Text style={styles.homeButtonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'BalooChettan2-Bold',
    color: '#333',
    marginBottom: 16,
  },
  homeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FF8C32',
  },
  homeButtonText: {
    color: 'white',
    fontFamily: 'BalooChettan2-Medium',
  },
});
