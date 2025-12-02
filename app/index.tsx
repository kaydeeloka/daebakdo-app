import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const welcoming = require('@/assets/images/message/welcoming.png');

export default function WelcomeScreen() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');

  const isFormValid = name.trim().length > 0 && country.trim().length > 0;

  const handleLetsGo = async () => {
  if (!isFormValid) return;

  const data = { name, country };
  try {
    await AsyncStorage.setItem('userInfo', JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save user info', e);
  }

  router.replace('/tripdate'); // go to trip date screen
};

  return (
    <View style={styles.screen}>
      <Image source={welcoming} style={styles.welcomingImage} resizeMode="contain" />

      <View style={styles.form}>
        <Text style={styles.label}>Your name :</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#9e9e9e"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Your Country :</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your country"
          placeholderTextColor="#9e9e9e"
          value={country}
          onChangeText={setCountry}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        disabled={!isFormValid}
        onPress={handleLetsGo}
      >
        <Text style={styles.buttonText}>Let’s go!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#06B5EA',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  welcomingImage: {
    width: '100%',
    height: 180,
    alignSelf: 'center',
  },
  form: {
    marginTop: 40,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'BalooChettan2-Medium',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'BalooChettan2-Regular',
    marginBottom: 24,
  },
  button: {
    marginTop: 'auto',
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
    fontWeight: '600',
    fontFamily: 'BalooChettan2-Bold',
  },
});
