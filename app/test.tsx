import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TestScreen() {
	const [count, setCount] = useState(0);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Test Page</Text>
			<Text style={styles.subtitle}>Tap the button to update the counter.</Text>

			<Pressable style={styles.button} onPress={() => setCount((value: number) => value + 1)}>
				<Text style={styles.buttonText}>Pressed {count} times</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f4efe8',
		padding: 24,
	},
	title: {
		fontSize: 32,
		fontWeight: '700',
		color: '#1f1a17',
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: '#5f534b',
		marginBottom: 20,
		textAlign: 'center',
	},
	button: {
		backgroundColor: '#1f6f5b',
		paddingHorizontal: 22,
		paddingVertical: 14,
		borderRadius: 14,
	},
	buttonText: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '600',
	},
});
