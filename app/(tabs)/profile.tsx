// app/(tabs)/profile.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CalendarDays, RotateCcw } from 'lucide-react-native';
import { router } from 'expo-router';

const profileImg = require('@/assets/images/profile.png');
const headerBg = require('@/assets/images/bg-profile.png');

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [tripDate, setTripDate] = useState<string | null>(null);
  const [planName, setPlanName] = useState<string>('K-Planner');

  useEffect(() => {
    const load = async () => {
      try {
        const userJson = await AsyncStorage.getItem('userInfo');
        if (userJson) {
          const user = JSON.parse(userJson);
          setName(user.name ?? '');
          setCountry(user.country ?? '');
        }

        const storedTripDate = await AsyncStorage.getItem('tripDate');
        if (storedTripDate) {
          const d = new Date(storedTripDate);
          setTripDate(d.toLocaleDateString('en-GB'));
        }

        const storedPlan = await AsyncStorage.getItem('planName');
        if (storedPlan) setPlanName(storedPlan);
      } catch (e) {
        console.warn('Failed to load profile data', e);
      }
    };
    load();
  }, []);

  const handleSetTripDate = () => {
    router.replace('/tripdate');
  };

  const handleResetProgress = async () => {
    await AsyncStorage.removeItem('tripDate');
    setTripDate(null);
  };

  return (
    <View style={styles.container}>
      {/* colorful header */}
      <View style={styles.header}>
        <Image source={headerBg} style={styles.headerWave} resizeMode="cover" />

        <View style={styles.avatarWrapper}>
          <View style={styles.avatarCircle}>
            <Image
              source={profileImg}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>

      {/* content */}
      <View style={styles.content}>
        {/* special name/origin card */}
        <View style={styles.identityCard}>
          <Text style={styles.identityName}>{name || 'Adventurer'}</Text>
          <Text style={styles.identityCountry}>
            {country || 'From Somewhere in the World'}
          </Text>
        </View>

        {/* regular cards */}
        <View style={styles.card}>
          <Text style={styles.cardLabelSmall}>Current Plan</Text>
          <View style={styles.cardRow}>
            <View style={styles.planIcon} />
            <Text style={styles.planText}>{planName}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabelSmall}>Trip Date</Text>
          <View style={styles.cardRow}>
            <CalendarDays color="#FF8C32" size={18} />
            <Text style={styles.tripText}>
              {tripDate ? tripDate : 'Not set yet'}
            </Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: '#FF8C32' }]}
            onPress={handleSetTripDate}
          >
            <CalendarDays
              color="#FFFFFF"
              size={18}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.primaryButtonText}>Set Trip Date</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: '#008CFF' }]}
            onPress={handleResetProgress}
          >
            <RotateCcw
              color="#FFFFFF"
              size={18}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.primaryButtonText}>Reset Progress</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const HEADER_HEIGHT = 220;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7EB',
  },

  header: {
    height: HEADER_HEIGHT,
    backgroundColor: '#8B7CFF',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  headerWave: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.45,
  },

  avatarWrapper: {
    alignItems: 'center',
    marginTop: 32,
  },
  avatarCircle: {
    width: 98,
    height: 98,
    borderRadius: 43,
    backgroundColor: '#FFE4CC',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '110%',
    height: '110%',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 0,
  },

  /* special name/origin card */
  identityCard: {
    marginTop: -26, // overlap slightly with header
    alignSelf: 'center',
    backgroundColor: '#FFFDF7',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  identityName: {
    fontSize: 28,
    fontFamily: 'BalooChettan2-Bold',
    color: '#222',
    textAlign: 'center',
  },
  identityCountry: {
    fontSize: 16,
    color: '#777',
    fontFamily: 'BalooChettan2-Medium',
    marginTop: 2,
    textAlign: 'center',
  },

  /* regular cards */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  cardLabelSmall: {
    fontSize: 12,
    color: '#888',
    marginBottom: 6,
    fontFamily: 'BalooChettan2-Medium',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planIcon: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#4CC0FF',
    marginRight: 8,
  },
  planText: {
    fontSize: 15,
    fontFamily: 'BalooChettan2-Bold',
    color: '#222',
  },
  tripText: {
    fontSize: 15,
    marginLeft: 6,
    fontFamily: 'BalooChettan2-Medium',
    color: '#333',
  },

  buttonRow: {
    marginTop: 24,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    paddingVertical: 12,
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'BalooChettan2-Bold',
  },
});
