import React from 'react';
import { View, StyleSheet } from 'react-native';
import KeyButton from './KeyButton';
import ClearSymbol from '@/assets/images/ClearSymbol.png'

const rows = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0','⌫']
];

const Keypad: React.FC<{ onDigitPress: (digit: string) => void }> = ({ onDigitPress }) => {
  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((digit, colIndex) => {
            if (digit === '') {
              return <View key={colIndex} style={styles.empty} />;
            }

            if (digit === '⌫') {
              return (
                <KeyButton
                  key={colIndex}
                  digit={digit}
                  onPress={onDigitPress}
                  image={require('@/assets/images/ClearSymbol.png')}// on passe l'image
                />
              );
            }

            return (
              <KeyButton
                key={colIndex}
                digit={digit}
                onPress={onDigitPress}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      width:300,
    backgroundColor : '#F0F1F5',
    flexWrap: 'wrap',
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 30,
  },
  empty: {
    width: 80,
    height: 80,
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  }

});

export default Keypad;
