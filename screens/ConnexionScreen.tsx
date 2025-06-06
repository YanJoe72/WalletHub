import React, { useState } from 'react';
import { StyleSheet, TextInput, Alert, View, Text, SafeAreaView, Button } from 'react-native'; // <-- Ajout de Button ici
import PasswordDisplay from '@/components/ui/Connexion/Password';
import Keypad from '@/components/ui/Connexion/Keypad';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import userData from '@/constants/user';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { loginUser } from '@/query/use-fetch';

export default function ConnexionScreen() {
  const [pin, setPin] = useState('');
  const [id, setId] = useState('');

  const handleDigitPress = async (digit: string) => {
    if (digit === '⌫') {
      setPin((prev) => prev.slice(0, -1));
    } else if (pin.length < 6) {
      const newPin = pin + digit;
      setPin(newPin);

if (newPin.length === 6) {
  try {
    const token = await loginUser(id, newPin); // appel à l'API
    Alert.alert('Connexion réussie ✅');
    // TODO : stocker le token dans AsyncStorage ou Context si nécessaire
    router.push('/(tabs)/accounts');
  } catch (error) {
    Alert.alert('Erreur', 'Identifiant ou code incorrect ❌');
    setPin('');
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
    <AntDesign name="caretleft" size={24} color="gray" style={{marginBottom:100, marginLeft:'50', alignSelf: 'flex-start'}} />
        <View style={styles.VueVertical}>
          <ThemedText style={styles.text} type="title">Identifiant</ThemedText>
          <TextInput
            style={styles.input}
            value={id}
            onChangeText={setId}
            placeholder="Identifiant"
            placeholderTextColor="#999"
          />

        </View>

        <View style={styles.VueVertical}>
         <ThemedText style={styles.text} type="title">Code Personnel</ThemedText>
              <PasswordDisplay style={styles.password} value={pin} />
               <View  style={{ marginTop: 2 }}>
                    <Keypad  onDigitPress={handleDigitPress} />
               </View>
              {/* ------ Bouton ajouté ici ------ */}
                <View style={{ marginTop: 2 }}>
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
    marginTop:20,
    paddingBottom: 0,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  root: {
    gap: 8,
    alignItems: 'center',
    marginTop: 80,
    backgroundColor: 'white',
  },

  input: {
    height: 40,
    width: 260,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  text: {
    height: 30,
    width: 230,
    color: 'black',
    fontSize: 20,
  },
});