import React, { useState } from 'react';
import { StyleSheet, TextInput, Alert, View, Text, SafeAreaView, Button, TouchableOpacity } from 'react-native'; // <-- Ajout de Button ici
import PasswordDisplay from '@/components/ui/Connexion/Password';
import Keypad from '@/components/ui/Connexion/Keypad';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
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
    const token = await loginUser(id, newPin); 
    Alert.alert('Connexion réussie ✅');
    router.push('/(tabs)/accounts');
  } catch (error) {
    Alert.alert('Erreur', 'Identifiant ou code incorrect ❌');
    setPin('');
  }
}
    }
  };

  const handleTestButtonPress = () => {
    router.push('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.root}>
        {/* Header */}
        <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Connexion</Text>
            </View>
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
               <View  style={{ }}>
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
    paddingBottom: 0,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  root: {
    gap: 8,
    alignItems: 'center',
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
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 50, marginRight:120 },
  headerTitle: { marginLeft: 40, fontSize: 20, fontWeight: '600', paddingLeft: 40, color: '#60708F' },
  backButton: {
    padding: 5,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
});