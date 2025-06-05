import React from 'react';
import { View, StyleSheet } from 'react-native';
import KeyButton from './KeyButton';

interface PasswordProps {
  value: string; // les chiffres déjà tapés
  maxLength?: number;
  hideText?: boolean; // pour afficher des * au lieu des chiffres
}

const Password: React.FC<PasswordProps> = ({ value, maxLength = 6, hideText = true }) => {
  const padded = value.padEnd(maxLength, ' '); // complète avec des espaces

  return (
    <View style={styles.container}>
      {padded.split('').map((char, index) => (
        <KeyButton
          key={index}
          digit={char.trim() === '' ? '' : hideText ? '*' : char}
          onPress={() => {}}
          disabled={true}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginLeft: 20,

  },
});

export default Password;
