import { StyleSheet, Text, View } from 'react-native';

export default function KaydeeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Kaydee Page</Text>
      <Text style={styles.subtitle}>This is a simple page</Text>
      <View style={styles.content}>
        <Text style={styles.text}>Your content goes here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  content: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
});
