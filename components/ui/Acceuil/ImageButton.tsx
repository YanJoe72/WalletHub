import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

interface ImageButtonProps {
  onPress: () => void;
  imageSource: any; // généralement `require(...)`
  disabled?: boolean;
}

const ImageButton: React.FC<ImageButtonProps> = ({ onPress, imageSource, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Image source={imageSource} style={styles.image} />
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
});

export default ImageButton;
