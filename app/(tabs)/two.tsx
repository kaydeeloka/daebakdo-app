import { useRouter } from 'expo-router';
import { Platform, Pressable, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {
  const router = useRouter();
  const buttonShadow = Platform.select({
    web: {
      boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.14)',
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.14,
      shadowRadius: 10,
      elevation: 4,
    },
  });

  const destinations = [
    { label: 'Kaydee', href: '/kaydee' },
    { label: 'Adib', href: '/adib' },
    { label: 'Fahrizal', href: '/fahrizal' },
    { label: 'Muhsin', href: '/muhsin' },
  ] as const;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <Text style={styles.subtitle}>Pick a name to open that page.</Text>
      <View style={styles.buttonList}>
        {destinations.map((destination) => (
          <Pressable
            key={destination.label}
            style={({ pressed }) => [styles.button, buttonShadow, pressed && styles.buttonPressed]}
            onPress={() => router.push(destination.href as never)}>
            <Text style={styles.buttonText}>{destination.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 0.2,
    color: '#111827',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
  buttonList: {
    width: '100%',
    gap: 14,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: '#111827',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});
