import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../src/firebase';

// Design Theme Colors
const COLORS = {
  bg: '#FCF8F2',
  cardBg: '#FFFFFF',
  primaryOrange: '#F98A44',
  textDark: '#292524',
  inputBg: '#FAF7F1',
  placeholder: '#BCB9B4',
  stampGreen: '#16A34A',
};

export default function OnboardingScreen() {
  const router = useRouter();

  // Form State Management
  const [name, setName] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('United States');
  const [departureDate, setDepartureDate] = useState(new Date(2026, 5, 15)); // June 15, 2026
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handlers
  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDepartureDate(selectedDate);
    }
  };

  const handleFinalizeRegistration = async () => {
    if (!name.trim()) {
      Alert.alert('Incomplete Form', 'Please provide your name.');
      return;
    }

    setLoading(true);
    try {
      // Use authenticated user UID or fallback to temporary guest key
      const userId = auth.currentUser ? auth.currentUser.uid : `guest_${Date.now()}`;

      // Save user boarding pass profile to Firestore
      await setDoc(
        doc(db, 'users', userId),
        {
          displayName: name.trim(),
          countryOfOrigin: countryOfOrigin.trim(),
          departureDate: departureDate.toISOString(),
          sector: 'ICN - SEOUL',
          boardingPassIssued: true,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      // Navigate to main tabs dashboard
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error('Finalize registration failed:', error);
      Alert.alert('Error', error.message || 'Something went wrong while setting up your profile.');
    } finally {
      setLoading(false);
    }
  };

  const formatDateDisplay = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Background Decorative Icons */}
      <Image
        source={require('../../assets/images/plane_icon.png')}
        style={[styles.decoIcon, styles.planeIcon]}
      />
      <Image
        source={require('../../assets/images/cherry_blossom.png')}
        style={[styles.decoIcon, styles.cherryBlossomIcon]}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Boarding Pass Card */}
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={[styles.dot, styles.dotLeft]} />
            <View style={[styles.dot, styles.dotRight]} />

            <View style={styles.headerTitleGroup}>
              <Text style={styles.headerTitleMain}>DAEBAKDO</Text>
              <MaterialCommunityIcons
                name="airplane-takeoff"
                size={18}
                color="white"
                style={styles.headerPlaneIcon}
              />
            </View>
            <Text style={styles.headerSub}>SOUTH KOREA BOARDING PASS</Text>
          </View>

          {/* Form Body */}
          <View style={styles.cardBody}>
            <Text style={styles.formTitleLabel}>TRAVELER REGISTRATION CARD</Text>

            {/* Input: Traveler Name */}
            <FormGroup iconName="account-outline" labelEn="TRAVELER NAME" labelKr="성명">
              <TextInput
                style={styles.input}
                placeholder="e.g. Bunny"
                placeholderTextColor={COLORS.placeholder}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </FormGroup>

            {/* Input: Country of Origin */}
            <FormGroup iconName="web" labelEn="COUNTRY OF ORIGIN" labelKr="국적" isDropdownIcon>
              <TextInput
                style={styles.input}
                placeholder="e.g. United States"
                placeholderTextColor={COLORS.placeholder}
                value={countryOfOrigin}
                onChangeText={setCountryOfOrigin}
              />
            </FormGroup>

            {/* Input: Departure Date */}
            <FormGroup iconName="calendar-month-outline" labelEn="DEPARTURE DATE" labelKr="출국일">
              <TouchableOpacity
                style={styles.inputDatePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.inputDateTextValue}>
                  {formatDateDisplay(departureDate)}
                </Text>
                <MaterialCommunityIcons name="calendar-range" size={20} color={COLORS.textDark} />
              </TouchableOpacity>
            </FormGroup>

            {showDatePicker && (
              <DateTimePicker
                value={departureDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}

            {/* Sector Display & Stamp */}
            <View style={styles.sectorGroup}>
              <View>
                <Text style={styles.sectorLabel}>SECTOR</Text>
                <Text style={styles.sectorValueText}>ICN ✓ SEOUL</Text>
              </View>
              <View style={styles.stampReplica}>
                <Text style={styles.stampApprovedText}>APPROVED</Text>
                <Text style={styles.stampKTravelText}>K-TRAVEL</Text>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitBoardingButton}
              onPress={handleFinalizeRegistration}
              activeOpacity={0.85}
              disabled={loading}
            >
              <View style={styles.submitButtonContent}>
                <Text style={styles.submitButtonText}>
                  {loading ? 'Processing...' : 'Issue Boarding Pass'}
                </Text>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={18}
                  color="white"
                  style={styles.submitButtonArrow}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Custom FormGroup Component
function FormGroup({ iconName, labelEn, labelKr, children, isDropdownIcon }: any) {
  return (
    <View style={styles.formGroupContainer}>
      <View style={styles.labelHeaderRow}>
        <MaterialCommunityIcons name={iconName} size={16} color={COLORS.textDark} />
        <Text style={styles.labelTextEn}> {labelEn} </Text>
        <Text style={styles.labelTextKr}>/ {labelKr}</Text>
      </View>
      {isDropdownIcon ? (
        <View style={styles.dropdownWrapper}>
          {children}
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={COLORS.textDark}
            style={styles.dropdownChevron}
          />
        </View>
      ) : (
        children
      )}
    </View>
  );
}

// Complete Stylesheet
const styles = StyleSheet.create({
  // Global Container
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },

  // Decorative Icons
  decoIcon: {
    position: 'absolute',
    opacity: 0.1,
  },
  planeIcon: {
    width: 60,
    height: 60,
    top: 40,
    left: 20,
    transform: [{ rotate: '-15deg' }],
  },
  cherryBlossomIcon: {
    width: 60,
    height: 60,
    bottom: 20,
    right: 20,
    opacity: 0.2,
  },

  // Boarding Pass Card Container
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  // Card Header
  cardHeader: {
    backgroundColor: COLORS.primaryOrange,
    paddingTop: 32,
    paddingBottom: 16,
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    position: 'absolute',
    top: 12,
  },
  dotLeft: { left: 12 },
  dotRight: { right: 12 },

  headerTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerTitleMain: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  headerPlaneIcon: {
    marginLeft: 6,
    marginTop: -2,
  },
  headerSub: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    opacity: 0.85,
  },

  // Card Body
  cardBody: {
    padding: 20,
  },
  formTitleLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
    letterSpacing: 0.8,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.6,
  },

  // Form Inputs
  formGroupContainer: {
    marginBottom: 16,
  },
  labelHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  labelTextEn: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textDark,
    opacity: 0.9,
  },
  labelTextKr: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textDark,
    opacity: 0.8,
  },
  input: {
    width: '100%',
    height: 44,
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 13,
    color: COLORS.textDark,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },

  // DatePicker Button
  inputDatePickerButton: {
    width: '100%',
    height: 44,
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  inputDateTextValue: {
    fontSize: 13,
    color: COLORS.textDark,
  },

  // Dropdown Chevron
  dropdownWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  dropdownChevron: {
    position: 'absolute',
    right: 10,
    opacity: 0.7,
  },

  // Sector & Stamp Section
  sectorGroup: {
    marginTop: 8,
    marginBottom: 24,
    backgroundColor: COLORS.inputBg,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectorLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.textDark,
    opacity: 0.7,
    letterSpacing: 0.5,
  },
  sectorValueText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 2,
  },
  stampReplica: {
    borderWidth: 2,
    borderColor: '#FC8C84',
    borderStyle: 'dashed',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    transform: [{ rotate: '5deg' }],
  },
  stampApprovedText: {
    color: '#FC8C84',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
  },
  stampKTravelText: {
    color: '#FC8C84',
    fontSize: 6,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: -1,
  },

  // Submit Button
  submitBoardingButton: {
    width: '100%',
    height: 48,
    backgroundColor: COLORS.primaryOrange,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  submitButtonArrow: {
    marginLeft: 8,
    marginTop: -1,
  },
});