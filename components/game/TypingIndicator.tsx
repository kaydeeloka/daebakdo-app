import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

const BOUNCE_DELAYS = [0, 150, 300];

export const TypingIndicator: React.FC = () => {
  const bounceValues = BOUNCE_DELAYS.map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    const animations = bounceValues.map((bounceValue, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceValue, {
            toValue: 1,
            duration: 500,
            delay: BOUNCE_DELAYS[index],
            useNativeDriver: true,
          }),
          Animated.timing(bounceValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      )
    );
    Animated.stagger(150, animations).start();

    // Optionally handle clean-up if needed
    return () => {
      animations.forEach(anim => anim.stop());
    };
  }, [bounceValues]);

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image
          source={{ uri: 'https://picsum.photos/64/64' }}
          style={styles.avatar}
          resizeMode="cover"
          blurRadius={1} // To simulate opacity: 0.5 visually
        />
      </View>
      <View style={styles.bubble}>
        {bounceValues.map((bounceValue, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                transform: [
                  {
                    translateY: bounceValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -10], // Bounce up 10 units
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 40, // md:w-12 is 48 though approximating for mobile
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6', // neutral-bg approximate
    borderWidth: 1,
    borderColor: '#d1d5db', // border-border approximate
    marginRight: 12,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  bubble: {
    backgroundColor: 'white',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56, // min-h-[3.5rem] ~ 56px
    width: 96, // w-24 * 4px = 96px approx
    justifyContent: 'space-between',
  },
  dot: {
    width: 12, // w-3 = 12px
    height: 12,
    backgroundColor: '#9ca3af', // gray-400
    borderRadius: 6,
  },
});
