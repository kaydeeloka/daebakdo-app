import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Play, User2, BookAIcon } from 'lucide-react-native';

const bgSource = require('@/assets/images/background-main.png');

const { height } = Dimensions.get('window');

export default function MainPage() {
  const goToTabsGame = () => router.replace('/(tabs)/game');
  const goToTabsLearn = () => router.replace('/(tabs)/learn');
  const goToTabsProfile = () => router.replace('/(tabs)/profile');

  return (
    <ImageBackground
      source={bgSource}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Top buttons: Profile + Learn */}
        <View style={styles.topButtonsRow}>
          <TouchableOpacity style={styles.roundButton} onPress={goToTabsProfile}>
            <User2 color="#FFFFFF" size={22} />
            <Text style={styles.roundButtonText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundButton} onPress={goToTabsLearn}>
            <BookAIcon color="#FFFFFF" size={22} />
            <Text style={styles.roundButtonText}>Learn</Text>
          </TouchableOpacity>
        </View>

        {/* Tiger area wrapper so bubble can be positioned relative to it */}
        <View style={styles.tigerArea}>
          {/* Speech bubble */}
          <View style={styles.dialogCard}>
            <Text style={styles.dialogTitle}>Welcome!</Text>
            <Text style={styles.dialogSubtitle}>
              Ready to exercise your brain today?
            </Text>
          </View>

        </View>

        {/* Spacer to keep bottom button off the tiger */}
        <View style={{ flex: 1 }} />

        {/* Bottom Start Playing button */}
        <TouchableOpacity style={styles.playButton} onPress={goToTabsGame}>
          <View style={styles.playButtonContent}>
            <Play color="#FFFFFF" size={20} style={{ marginRight: 8 }} />
            <Text style={styles.playButtonText}>Start Playing</Text>
          </View>
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

  /* Top buttons */
  topButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roundButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FF8C32',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  roundButtonText: {
    fontSize: 11,
    color: '#ffffff',
    fontFamily: 'BalooChettan2-Medium',
    marginTop: 4,
  },

  /* Tiger + bubble area */
  tigerArea: {
    marginTop: 40,
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },

  dialogCard: {
    position: 'absolute',
    top: '10%',
    maxWidth: '75%',
    backgroundColor: '#FFF7EB',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  dialogTitle: {
    fontSize: 24,
    fontFamily: 'BalooChettan2-Bold',
    marginBottom: 2,
  },
  dialogSubtitle: {
    fontSize: 18,
    lineHeight: 22,
    color: '#555',
    fontFamily: 'BalooChettan2-Medium',
  },

  botBadge: {
    position: 'absolute',
    bottom: -18,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF8C32',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },

  /* Bottom button */
  playButton: {
    marginBottom: 40,
    backgroundColor: '#FF8C32',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  playButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'BalooChettan2-Bold',
  },
});
