import React, { useState } from 'react';
import { StyleSheet, TextInput, Alert, View, Text, SafeAreaView, Button } from 'react-native'; // <-- Ajout de Button ici
import PasswordDisplay from '@/components/ui/Connexion/Password';
import Keypad from '@/components/ui/Connexion/Keypad';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import userData from '@/constants/user';

export default function ConnexionScreen() {
  const [pin, setPin] = useState('');
  const [id, setId] = useState('');

  const handleDigitPress = (digit: string) => {
    if (digit === '⌫') {
      setPin((prev) => prev.slice(0, -1));
    } else if (pin.length < 6) {
      const newPin = pin + digit;
      setPin(newPin);

      if (newPin.length === 6) {
        if (id === userData.id) {
          if (newPin === userData.password) {
            Alert.alert('Connexion réussie', `Bienvenue, ${userData.id}`);
            router.push('/(tabs)/accounts');
          } else {
            Alert.alert('Erreur', 'Code ou identidiant incorrect');
            setPin('');
          }
        }
      }
    }
  };

  // ----- Ton bouton personnalisé ici -----
  const handleTestButtonPress = () => {
    router.push('/(tabs)/accounts');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <View style={styles.VueVertical}>
          <ThemedText style={styles.text} type="title">Identifiant</ThemedText>
          <TextInput
            style={styles.input}
            value={id}
            onChangeText={setId}
            placeholder="Identifiant"
            placeholderTextColor="#999"
          />
          <ThemedText style={styles.text} type="title">Code Personnel</ThemedText>
        </View>

        <View style={styles.VueVertical}>
          <PasswordDisplay style={styles.password} value={pin} />
          <Keypad onDigitPress={handleDigitPress} />

          {/* ------ Bouton ajouté ici ------ */}
          <View style={{ marginTop: 20 }}>
            <Button title="Test application" onPress={handleTestButtonPress} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  VueVertical: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 8,
    paddingBottom: 0,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  root: {
    gap: 8,
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'white',
  },
  password: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  input: {
    height: 50,
    width: 260,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  text: {
    height: 50,
    width: 260,
    color: 'black',
  },
});