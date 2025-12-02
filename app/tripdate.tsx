import React, { useState, useMemo } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const tripmsg = require('@/assets/images/message/tripmsg.png');

export default function TripDateScreen() {
  const today = new Date();

  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');

  const tripDate = useMemo(() => {
  const d = Number(day);
  const m = Number(month);
  const y = Number(year);

  if (!d || !m || !y) return null;

  // basic year range: 2025–2100 (adjust as you like)
  if (y < 2025 || y > 2100) return null;

  const date = new Date(y, m - 1, d);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return null; // invalid calendar date
  }
  return date;
}, [day, month, year]);


  const formattedDate = tripDate
    ? tripDate.toLocaleDateString('en-GB')
    : `${day.padStart(2, '0') || 'dd'}/${month.padStart(2, '0') || 'mm'}/${
        year.padStart(4, '0')  || 'yyyy'
      }`;

  const goHome = () => {
    router.replace('/(tabs)/home');
  };

  const handleSave = async () => {
    if (!tripDate) return;
    try {
      await AsyncStorage.setItem('tripDate', tripDate.toISOString());
    } catch (e) {
      console.warn('Failed to save trip date', e);
    }
    goHome();
  };

  const isValid = !!tripDate;

  return (
    <View style={styles.screen}>
      <Image source={tripmsg} style={styles.tripImage} resizeMode="contain" />

      {/* Custom date input: day / month / year */}
      <View style={styles.inputWrapper}>
        <View style={styles.dateRow}>
          <TextInput
            style={[styles.partInput, styles.partDay]}
            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
            maxLength={2}
            placeholder="dd"
            placeholderTextColor="#9e9e9e"
            value={day}
            onChangeText={text => setDay(text.replace(/[^0-9]/g, ''))}
          />
          <Text style={styles.separator}>/</Text>
          <TextInput
            style={[styles.partInput, styles.partMonth]}
            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
            maxLength={2}
            placeholder="mm"
            placeholderTextColor="#9e9e9e"
            value={month}
            onChangeText={text => setMonth(text.replace(/[^0-9]/g, ''))}
          />
          <Text style={styles.separator}>/</Text>
          <TextInput
          style={[styles.partInput, styles.partYear]}
          keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'default'}
          maxLength={4}
          placeholder="yyyy"
          placeholderTextColor="#9e9e9e"
          value={year}
          onChangeText={text => setYear(text.replace(/[^0-9]/g, ''))}
        />

        </View>
      </View>

      <Text
        style={[
          styles.previewText,
          !tripDate && (day || month || year) ? styles.previewError : null,
        ]}
      >
        {tripDate ? formattedDate : 'Enter a valid date'}
      </Text>

      <TouchableOpacity
        style={[styles.button, !isValid && styles.buttonDisabled]}
        disabled={!isValid}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Set trip date</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipWrapper} onPress={goHome}>
        <Text style={styles.skipText}>I’ll add it later</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  tripImage: {
    width: '100%',
    height: 180,
    alignSelf: 'center',
  },
  inputWrapper: {
    marginTop: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#06B5EA',
    paddingHorizontal: 4,
    justifyContent: 'center',
    height: 56,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  partInput: {
    fontSize: 18,
    fontFamily: 'BalooChettan2-Regular',
    textAlign: 'center',
  },
  partDay: {
    width: 60,
    flex: 1,
  },
  partMonth: {
    width: 60,
    flex: 1,
  },
  partYear: {
    width: 60,
    flex: 1,
  },
  separator: {
    fontSize: 18,
    color: '#9e9e9e',
    paddingHorizontal: 2,
  },
  previewText: {
    marginTop: 8,
    fontSize: 12,
    color: '#4B5563',
  },
  previewError: {
    color: '#DC2626',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#FF8C32',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'BalooChettan2-Bold',
  },
  skipWrapper: {
    marginTop: 24,
    alignItems: 'center',
  },
  skipText: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'BalooChettan2-Medium',
  },
});
