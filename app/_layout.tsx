// app/_layout.tsx
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import React from 'react';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'BalooChettan2-Regular': require('@/assets/fonts/BalooChettan2-Regular.ttf'),
    'BalooChettan2-Medium': require('@/assets/fonts/BalooChettan2-Medium.ttf'),
    'BalooChettan2-SemiBold': require('@/assets/fonts/BalooChettan2-SemiBold.ttf'),
    'BalooChettan2-Bold': require('@/assets/fonts/BalooChettan2-Bold.ttf'),
    'BalooChettan2-ExtraBold': require('@/assets/fonts/BalooChettan2-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="main" />    {/* landing page, no tabs */}
      <Stack.Screen name="(tabs)" />   {/* tab navigator */}
    </Stack>
  );
}
