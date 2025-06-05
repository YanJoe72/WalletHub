import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

interface KeyButtonProps {
  digit: string;
  onPress: (digit: string) => void;
  disabled?: boolean;
  imageSource?: any;  // Pour accepter une image source
}

const KeyButton: React.FC<KeyButtonProps> = ({ digit, onPress, disabled = false ,imageSource}) => {
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
      borderColor: 'gray',
        borderWidth: 2,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
image: {
  width: 24,
  height: 24,
  resizeMode: 'contain',
},
  disabled: {
    backgroundColor: '#c9c4b5',
  },
  text: {
    fontSize: 28,
    fontWeight: '600',

  },
});

export default KeyButton;
