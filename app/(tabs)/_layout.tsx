// app/(tabs)/_layout.tsx
import { Home, Gamepad2, User, BookAIcon } from 'lucide-react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const tabBarHeight = Platform.OS === 'ios' ? 60 : 56;
  const bottomPadding = Platform.select({
    ios: Math.max(insets.bottom, 4),
    android: Math.max(insets.bottom + 4, 8),
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FF7A1A',
          borderTopWidth: 0,
          height: 74,
          paddingTop: 6,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFE4CC',
      }}
    >
      {/* Visible tab buttons */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, size }) => (
            <BookAIcon name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="game"
        options={{
          title: 'Game',
          tabBarIcon: ({ color, size }) => (
            <Gamepad2 name="game-controller-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User name="person-outline" size={size} color={color} />
          ),
        }}
      />
      {/* Hidden dynamic subpages — tab bar stays visible, no tab button */}
      <Tabs.Screen name="learn/topics" options={{ href: null }} />
      <Tabs.Screen name="learn/foods" options={{ href: null }} />
      <Tabs.Screen name="learn/numbers" options={{ href: null }} />
      <Tabs.Screen name="learn/scenarios" options={{ href: null }} />
      <Tabs.Screen name="learn/transportation" options={{ href: null }} />
      <Tabs.Screen name="(game)/[components]" options={{ href: null }} />
    </Tabs>
  );
}