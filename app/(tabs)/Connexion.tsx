import React, { useState } from 'react';
import { StyleSheet,TextInput, Alert   } from 'react-native';
import PasswordDisplay from '@/components/ui/Password';
import Keypad from '@/components/ui/Keypad';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import userData from '@/constants/user';

export default function ConnexionScreen() {
  const [pin, setPin] = useState(''); // Déclaration de pin ici
  const [id, setId] = useState(''); // Déclaration de pin ici




  const handleDigitPress = (digit: string) => {
    if (digit === '←') {
      // Supprimer un caractère du PIN
      setPin((prev) => prev.slice(0, -1));
    } else if (pin.length < 4) {
      // Ajouter un chiffre au PIN
      const newPin = pin + digit;
      setPin(newPin);

      // Vérification du PIN lorsque celui-ci atteint 4 chiffres
      if (newPin.length === 4) {
        if (newPin === userData.password) {
          Alert.alert('Connexion réussie', `Bienvenue, ${userData.id}`);
          // Navigation vers une autre page (par exemple, Dashboard ou Page d'accueil)
        } else {
          Alert.alert('Erreur', 'Code incorrect');
          setPin(''); // Réinitialiser le PIN après une tentative incorrecte
        }
      }
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
{/*Identifiant*/}


      <ThemedView style={styles.titleContainer}>
        <TextInput
           style={styles.input}
           value={id}
           onChangeText={setId}
           placeholder="Identifiant"
           placeholderTextColor="#999"
         />
      </ThemedView>
{/*Code Personnel*/}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Code Personnel</ThemedText>
      </ThemedView>
{/* Affichage du PIN */}
      <ThemedView>
        <PasswordDisplay style={styles.password}  value={pin} />
      </ThemedView>
{/* Affichage du Clavier */}
      <ThemedView style={styles.stepContainer}>
        <Keypad onDigitPress={handleDigitPress} /> {/* Le clavier */}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  password:{
       alignItems: 'center',
       justify : 'center',
       marginTop : 10,
       marginLeft : 10,
       marginRight : 10,
       marginBottom: 10,
      },
  input: {
    height: 50,
    width :220,

    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    color: 'black',
  },
});
