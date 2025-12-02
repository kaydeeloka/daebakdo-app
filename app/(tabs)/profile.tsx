import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [tripDate, setTripDate] = useState<string | null>(null);

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
      } catch (e) {
        console.warn('Failed to load profile data', e);
      }
    };
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Name: {name}</Text>
      <Text>Country: {country}</Text>
      <Text>Trip date: {tripDate ?? 'Not set'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 16, fontFamily: 'BalooChettan2-Bold' },
});
