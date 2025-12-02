import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

const bgSource = require('@/assets/images/background-main.png');

export default function MainPage() {
  const goToTabsGame = () => router.replace('/(tabs)/game');
  const goToTabsLearn = () => router.replace('/(tabs)/lesson');
  const goToTabsHome = () => router.replace('/(tabs)/home');

  return (
    <ImageBackground
      source={bgSource}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Top buttons */}
        <View style={styles.topButtonsRow}>
          <TouchableOpacity style={styles.roundButton} onPress={goToTabsHome}>
            <Text style={styles.roundButtonText}>settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundButton} onPress={goToTabsLearn}>
            <Text style={styles.roundButtonText}>learning</Text>
          </TouchableOpacity>
        </View>

        {/* Spacer so tiger stays visible */}
        <View style={{ flex: 1 }} />

        {/* Play button near bottom center */}
        <TouchableOpacity style={styles.playButton} onPress={goToTabsGame}>
          <Text style={styles.playButtonText}>Play Game</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  topButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roundButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FF8C32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButtonText: {
    fontSize: 10,
    color: '#000',
    fontFamily: 'BalooChettan2-Medium',
  },
  playButton: {
    marginBottom: 40,
    backgroundColor: '#FF8C32',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  playButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'BalooChettan2-Bold',
  },
});
