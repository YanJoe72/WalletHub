import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface KeyButtonProps {
  digit: string;
  onPress: (digit: string) => void;
  disabled?: boolean;
}

const KeyButton: React.FC<KeyButtonProps> = ({ digit, onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={() => onPress(digit)}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{digit}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  disabled: {
    backgroundColor: '#cccccc',
  },
  text: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
  },
});

export default KeyButton;
