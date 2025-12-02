import React from 'react';
import { Animated, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost';
  fullWidth?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  onPress,
  style,
  textStyle,
}) => {
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  const variantStyles = {
    primary: styles.primary,
    secondary: styles.secondary,
    danger: styles.danger,
    success: styles.success,
    outline: styles.outline,
    ghost: styles.ghost,
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, fullWidth && { width: '100%' }]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.base,
          variantStyles[variant],
          disabled && styles.disabled,
          style,
          fullWidth && { width: '100%' },
        ]}
      >
        <Text
          style={[
            styles.textBase,
            (variant === 'outline' || variant === 'ghost') ? styles.textDark : styles.textLight,
            variant === 'danger' && styles.textLight,
            variant === 'success' && styles.textLight,
            disabled && styles.textDisabled,
            textStyle,
          ]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  textBase: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  primary: {
    backgroundColor: '#fb641b', // bg-primary (orange)
    shadowColor: '#fb641b',
  },
  secondary: {
    backgroundColor: '#3b82f6', // bg-secondary (blue)
    shadowColor: '#3b82f6',
  },
  danger: {
    backgroundColor: '#ef4444', // bg-incorrect (red)
    shadowColor: '#ef4444',
  },
  success: {
    backgroundColor: '#22c55e', // bg-correct (green)
    shadowColor: '#22c55e',
  },
  outline: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowOpacity: 0.1,
  },
  ghost: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
  },
  textLight: {
    color: 'white',
  },
  textDark: {
    color: '#111827', // dark-text equivalent
  },
  textDisabled: {
    color: 'rgba(0,0,0,0.3)',
  },
  disabled: {
    opacity: 0.5,
  },
});
