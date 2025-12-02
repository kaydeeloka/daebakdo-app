import React, { useState } from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';

const tripmsg = require('@/assets/images/message/tripmsg.png');

export default function TripDateScreen() {
  const [tripDate, setTripDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const formattedDate = tripDate
    ? tripDate.toLocaleDateString('en-GB') // dd/mm/yyyy
    : '';

  const onChange = (_: any, selectedDate?: Date) => {
    if (Platform.OS !== 'ios') {
      setShowPicker(false);
    }
    if (selectedDate) {
      setTripDate(selectedDate);
    }
  };

  const openPicker = () => setShowPicker(true);

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
      {/* Top image */}
      <Image source={tripmsg} style={styles.tripImage} resizeMode="contain" />

      {/* Date input (opens calendar) */}
      <TouchableOpacity
        style={styles.inputWrapper}
        onPress={openPicker}
        activeOpacity={0.8}
      >
        <TextInput
          style={styles.input}
          placeholder="dd/mm/yyyy"
          placeholderTextColor="#9e9e9e"
          value={formattedDate}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      {/* Calendar */}
      {showPicker && (
        <DateTimePicker
          value={tripDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
          onChange={onChange}
        />
      )}

      {/* Set trip date button */}
      <TouchableOpacity
        style={[styles.button, !isValid && styles.buttonDisabled]}
        disabled={!isValid}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Set trip date</Text>
      </TouchableOpacity>

      {/* Skip text */}
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
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  input: {
    height: 48,
    fontSize: 16,
    fontFamily: 'BalooChettan2-Regular',
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
