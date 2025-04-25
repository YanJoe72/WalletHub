import React from 'react';
import { View, StyleSheet } from 'react-native';
import KeyButton from './KeyButton';

const rows = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', '←']
];

const Keypad: React.FC<{ onDigitPress: (digit: string) => void }> = ({ onDigitPress }) => {
  return (
  <View style={styles.container}>
    {rows.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((digit, colIndex) =>
          digit === '' ? (
            <View key={colIndex} style={styles.empty} />
          ) : (
            <KeyButton key={colIndex} digit={digit} onPress={onDigitPress} />
          )
        )}
      </View>
    ))}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor : 'gray',
    flexDirection: 'row',
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
