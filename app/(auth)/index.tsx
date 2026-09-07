// app/(auth)/onboarding.tsx
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
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Assuming standard Expo setup
import DateTimePicker from '@react-native-community/datetimepicker';

// Import your localized language data if you are implementing switching
// For now, we will use static labels.

// --- Professional Constants & Colors ---
const COLORS = {
  bg: '#FCF8F2', // From the design inspect
  cardBg: '#FFFFFF',
  primaryOrange: '#F98A44',
  primaryOrangeHover: '#E07B3A', // Estimated hover state for UI feedback
  textDark: '#292524', // From the design inspect (text-stone-800)
  inputBg: '#FAF7F1',
  placeholder: '#BCB9B4',
  stampGreen: '#16A34A', // For the approved stamp
  stampText: '#FFFFFF',
};

// --- Main Onboarding Screen Component ---
export default function OnboardingScreen() {
  const router = useRouter();

  // --- Form State Management ---
  const [name, setName] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('us United States'); // Initial design state
  const [departureDate, setDepartureDate] = useState(new Date(2026, 5, 15)); // Month is 0-indexed: June 15, 2026
  const [showDatePicker, setShowDatePicker] = useState(false);

  // --- Handlers ---
  const handleDateChange = (event: any, selectedDate?: Date) => {
    // Hide picker after selection or cancel (Crucial for iOS)
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (selectedDate) {
      setDepartureDate(selectedDate);
    }
  };

  const handleIssueBoardingPass = async () => {
    // Basic validation
    if (!name.trim()) {
      Alert.alert('Incomplete', 'Please tell us your name.');
      return;
    }
    
    try {
      // In a real app, this is where you would finalize user profile creation in Firestore
      // based on the name, country, and date provided.
      // e.g., updateDoc(doc(db, 'users', auth.currentUser.uid), { ...profileData });
      
      console.log('Finalizing Registration with:', { name, countryOfOrigin, departureDate });
      
      // Navigate to the main tabs app
      router.replace('/(tabs)'); // Replaces the auth stack so back button won't return
    } catch (error) {
      console.error('Registration finalize error:', error);
      Alert.alert('Error', 'Failed to complete registration. Please try again.');
    }
  };

  // Helper function for display date
  const formatDisplayDate = (date: Date) => {
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
        
        {/* Main Boarding Card Container */}
        <View style={styles.card}>
          
          {/* Card Header (Orange) */}
          <View style={styles.cardHeader}>
            {/* The white dots for professional style */}
            <View style={[styles.dot, styles.dotLeft]} />
            <View style={[styles.dot, styles.dotRight]} />
            
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitleMain}>DAEBAKDO</Text>
              {/* Airplane icon within the text line */}
              <MaterialCommunityIcons name="airplane-takeoff" size={18} color="white" style={styles.airplaneLineIcon} />
            </View>
            <Text style={styles.headerSub}>SOUTH KOREA BOARDING PASS</Text>
          </View>

          {/* Card Body (Form) */}
          <View style={styles.cardBody}>
            <Text style={styles.formTitle}>TRAVELER REGISTRATION CARD</Text>

            {/* --- Input Field: Name --- */}
            <FormInputField 
              iconName="account-outline" 
              label="TRAVELER NAME / 성명" 
              placeholder="e.g. Bunny" 
              value={name}
              onChangeText={setName}
            />

            {/* --- Input Field: Country --- */}
            {/* Replicated as a text input for design fidelity, would be a dropdown in full dev */}
            <FormInputField 
              iconName="web" 
              label="COUNTRY OF ORIGIN / 국적" 
              placeholder="e.g. United States" 
              value={countryOfOrigin}
              onChangeText={setCountryOfOrigin}
              isDropdown
            />

            {/* --- Input Field: Departure Date --- */}
            <FormInputField 
              iconName="calendar-month-outline" 
              label="DEPARTURE DATE / 출국일" 
              value={formatDisplayDate(departureDate)}
              isDatePicker
              onDatePickerPress={() => setShowDatePicker(true)}
            />
            {/* Conditional Date Picker Rendering (iOS needs careful placement) */}
            {showDatePicker && (
              <DateTimePicker
                value={departureDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                minimumDate={new Date()} // Prevent past dates
              />
            )}

            {/* --- Pre-filled Field: Sector --- */}
            <View style={styles.sectorContainer}>
              <View>
                <Text style={styles.sectorLabel}>SECTOR</Text>
                <Text style={styles.sectorValue}>ICN ✓ SEOUL</Text>
              </View>
              {/* Approved Stamp */}
              <View style={styles.stamp}>
                <Text style={styles.stampText}>APPROVED</Text>
                <Text style={styles.stampTextSub}>K-TRAVEL</Text>
              </View>
            </View>

            {/* --- Submit Button --- */}
            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={handleIssueBoardingPass}
              activeOpacity={0.8}
            >
              <View style={styles.buttonTextContent}>
                <Text style={styles.buttonText}>Issue Boarding Pass</Text>
                {/* Arrow icon within button */}
                <MaterialCommunityIcons name="arrow-right" size={18} color="white" style={styles.buttonArrowIcon} />
              </View>
            </TouchableOpacity>

          </View>### Developer's Design Review & Recommendations

I have meticulously replicated the design, including:
*   The exact **background color** (`#FCF8F2`) and primary **orange** (`#F98A44`) theme from the CSS file.
*   The **layout** of the "boarding pass," including decorative white circles in the header, the airplane icon, and the "APPROVED K-TRAVEL" stamp.
*   The **Bilingual labels** (English/Korean) as requested.
*   The **pre-filled states** shown in your mockup (June 15, 2026, and the "United States" selection).

#### A. Pre-Requisites (Missing Assets)

Your boilerplate does not have the icons shown in your design. Before running this code, you must place two simple PNG icons into your `assets/images` folder and name them exactly:
1.  `assets/images/plane_icon.png`: A simple white/light-grey airplane silhouette.
2.  `assets/images/cherry_blossom.png`: A single pink cherry blossom flower.

*If these assets are missing, the app will crash on load.*

#### B. Component and Navigation Setup

Save the code below as a new file, likely replacing the boilerplate `app/(auth)/index.tsx` (making it the first screen after install). I have included the logical hooks for navigating to your main `(tabs)` application upon successful form completion.

You can copy and paste the entire block below into your file:

```tsx
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

// Define theme colors directly based on design inspect
const COLORS = {
  bg: '#FCF8F2', // Light cream background
  cardBg: '#FFFFFF',
  primaryOrange: '#F98A44',
  textDark: '#292524', // Design text-stone-800
  inputBg: '#FAF7F1', // Light cream input background
  placeholder: '#BCB9B4', // Placeholder text color
  stampGreen: '#16A34A', // For stamp visual feedback
};

export default function OnboardingFormScreen() {
  const router = useRouter();

  // 1. Form State Management
  const [name, setName] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('us United States'); // Pre-set design state
  // Initial date: June 15, 2026, per design mockup
  const [departureDate, setDepartureDate] = useState(new Date(2026, 5, 15)); 
  const [showDatePicker, setShowDatePicker] = useState(false);

  // 2. Form Handlers
  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDepartureDate(selectedDate);
    }
  };

  const handleFinalizeRegistration = async () => {
    // Basic validation
    if (!name.trim()) {
      Alert.alert('Incomplete Form', 'Please provide your name.');
      return;
    }
    
    try {
      // Logic for creating the final user profile in Firebase Firestore would go here.
      console.log('Submitting profile data to backend:', {
        displayName: name,
        originCountry: countryOfOrigin,
        arrival: departureDate,
      });
      
      // Navigate to the main tabs app application.
      // `router.replace` ensures the user cannot back out to the onboarding screen.
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Finalize registration failed:', error);
      Alert.alert('Error', 'Something went wrong while setting up your profile.');
    }
  };

  // Helper to format date for display
  const formatDateDisplay = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <SafeAreaView style="{styles.container}">
      <StatusBar style="dark"/>
      {/* Expo Router: Hide the default stack navigation header */}
      <Stack.Screen false headerShown: options="{{" }}/>
      
      {/* Background Decorative Icons (Require Assets) */}
      <Image source="{require('../../assets/images/plane_icon.png')}" style="{[styles.decoIcon," styles.planeIcon]}/>
      <Image source="{require('../../assets/images/cherry_blossom.png')}" style="{[styles.decoIcon," styles.cherryBlossomIcon]}/>

      <ScrollView contentContainerStyle="{styles.scrollContent}">
        
        {/* Main 'Boarding Pass' Card */}
        <View style="{styles.card}">
          
          {/* Card Header (Orange) */}
          <View style="{styles.cardHeader}">
            {/* Header Dots Decoration */}
            <View style="{[styles.dot," styles.dotLeft]}/>
            <View style="{[styles.dot," styles.dotRight]}/>
            
            <View style="{styles.headerTitleGroup}">
              <Text style="{styles.headerTitleMain}">DAEBAKDO</Text>
              <MaterialCommunityIcons color="white" name="airplane-takeoff" size="{18}" style="{styles.headerPlaneIcon}"/>
            </View>
            <Text style="{styles.headerSub}">SOUTH KOREA BOARDING PASS</Text>
          </View>

          {/* Card Body (The Form) */}
          <View style="{styles.cardBody}">
            <Text style="{styles.formTitleLabel}">TRAVELER REGISTRATION CARD</Text>

            {/* --- Form Section: Name --- */}
            <FormGroup iconName="account-outline" labelEn="TRAVELER NAME" labelKr="성명">
              <TextInput autoCapitalize="words" onChangeText="{setName}" placeholder="e.g. Bunny" placeholderTextColor="{COLORS.placeholder}" style="{styles.input}" value="{name}"/>
            </FormGroup>

            {/* --- Form Section: Country --- */}
            <FormGroup iconName="web" isDropdownIcon labelEn="COUNTRY OF ORIGIN" labelKr="국적">
              <TextInput // True a design dev editable="{true}" full mockup, onChangeText="{setCountryOfOrigin}" per picker placeholder="e.g. United States" placeholderTextColor="{COLORS.placeholder}" style="{styles.input}" true use value="{countryOfOrigin}" would/>
            </FormGroup>

            {/* --- Form Section: Departure Date --- */}
            <FormGroup iconName="calendar-month-outline" labelEn="DEPARTURE DATE" labelKr="출국일">
              <TouchableOpacity onPress="{()" style="{styles.inputDatePickerButton}"> setShowDatePicker(true)}>
                <Text : ? departureDate null]} style="{[styles.inputDateText," styles.inputDateTextValue>
                  {formatDateDisplay(departureDate)}
                </Text>
                <MaterialCommunityIcons color="{COLORS.textDark}" name="calendar-range" size="{20}"/>
              </TouchableOpacity>
            </FormGroup>
            
            {/* DateTimePicker rendering (Platform-specific nuances) */}
            {showDatePicker && (
              <DateTimePicker 'default'} 'ios' 'spinner' // : ? Can't Date()} depart display="{Platform.OS" in minimumDate="{new" mode="date" onChange="{handleDateChange}" past the value="{departureDate}"/>
            )}

            {/* --- Static Pre-Filled Section: Sector --- */}
            <View style="{styles.sectorGroup}">
              <View>
                <Text style="{styles.sectorLabel}">SECTOR</Text>
                <Text style="{styles.sectorValueText}">ICN ✓ SEOUL</Text>
              </View>
              {/* Approved Stamp Replica */}
              <View style="{styles.stampReplica}">
                <Text style="{styles.stampApprovedText}">APPROVED</Text>
                <Text style="{styles.stampKTravelText}">K-TRAVEL</Text>
              </View>
            </View>

            {/* --- Submit Button --- */}
            <TouchableOpacity activeOpacity="{0.85}" onPress="{handleFinalizeRegistration}" style="{styles.submitBoardingButton}">
              <View style="{styles.submitButtonContent}">
                <Text style="{styles.submitButtonText}">Issue Boarding Pass</Text>
                <MaterialCommunityIcons color="white" name="arrow-right" size="{18}" style="{styles.submitButtonArrow}"/>
              </View>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Custom Component for Form Labels and Grouping (Improves code clarity)
function FormGroup({ iconName, labelEn, labelKr, children, isDropdownIcon }: any) {
  return (
    <View style="{styles.formGroupContainer}">
      <View style="{styles.labelHeaderRow}">
        <MaterialCommunityIcons color="{COLORS.textDark}" name="{iconName}" size="{16}"/>
        <Text style="{styles.labelTextEn}"> {labelEn} </Text>
        <Text style="{styles.labelTextKr}">/ {labelKr}</Text>
      </View>
      {isDropdownIcon && (
         <View style="{styles.dropdownWrapper}">
           {children}
           <MaterialCommunityIcons color="{COLORS.textDark}" name="chevron-down" size="{20}" style="{styles.dropdownChevron}"/>
         </View>
      )}
      {!isDropdownIcon && children}
    </View>
  );
}

// Detailed Stylesheet replicating the design mockup exactly
const styles = StyleSheet.create({
  // Global Container
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center', // Vertically center the card
    alignItems: 'center', // Horizontally center the card
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  
  // Decorative Icons (Positioned absolutely like design inspect "relative")
  decoIcon: {
    position: 'absolute',
    opacity: 0.1, // Subtle watermark effect
  },
  planeIcon: {
    width: 60,
    height: 60,
    top: 40,
    left: 20,
    transform: [{ rotate: '-15deg' }], // Match angle
  },
  cherryBlossomIcon: {
    width: 60,
    height: 60,
    bottom: 20,
    right: 20,
    opacity: 0.2, // Slightly brighter watermark
  },

  // The 'Boarding Pass' Card Main Structure
  card: {
    width: '100%',
    maxWidth: 360, // Match typical card size
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    overflow: 'hidden', // Required for rounded header corners
    
    // Professional Card Shadow
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
  
  // Card Header Section (Orange)
  cardHeader: {
    backgroundColor: COLORS.primaryOrange,
    paddingTop: 32,
    paddingBottom: 16,
    alignItems: 'center',
    position: 'relative',
  },
  // The small white circles in the corners
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
  
  // Title text layout within header
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

  // Card Body (The form content)
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

  // Core Form Input Styling
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
  
  // Custom TextInput styling from inspect "selection:bg-orange-100"
  input: {
    width: '100%',
    height: 44,
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 13,
    color: COLORS.textDark,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)', // Very subtle border
  },

  // DatePicker Button replication
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
  inputDateText: {
    fontSize: 13,
    color: COLORS.placeholder, // Placeholder color if no date set
  },
  inputDateTextValue: {
    color: COLORS.textDark, // Design state date text color
  },
  
  // Dropdown replica logic
  dropdownWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  dropdownChevron: {
    position: 'absolute',
    right: 10,
    opacity: 0.7,
  },

  // Pre-filled Sector Display replicating design markup stamp
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
  // Approved Stamp Visual Replication
  stampReplica: {
    borderWidth: 2,
    borderColor: '#FC8C84', // Faded red/coral for stamp look
    borderStyle: 'dashed', // Dotted per design mockup
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    transform: [{ rotate: '5deg' }], // Faded rotation per design
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

  // Submit Button replication
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