import React, { useState } from 'react';
import { StyleSheet,TextInput, Alert , View ,Text ,SafeAreaView } from 'react-native';
import PasswordDisplay from '@/components/ui/Connexion/Password';
import Keypad from '@/components/ui/Connexion/Keypad';
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


      if (newPin.length === 4) {
        if (newPin === userData.password) {
          Alert.alert('Connexion réussie', `Bienvenue, ${userData.id}`);

        } else {
          Alert.alert('Erreur', 'Code incorrect');
          setPin(''); // Réinitialiser le PIN après une tentative incorrecte
        }
      }
    }
  };

  return (
  <SafeAreaView style={styles.safeArea}>
      <View style={styles.root} >
            <View style={styles.VueVertical}>
                <TextInput
                style={styles.input}
                value={id}
                onChangeText={setId}
                placeholder="Identifiant"
                placeholderTextColor="#999"
                />
            </View>


          <View  style={styles.VueVertical}>

            <PasswordDisplay style={styles.password}  value={pin} />
            <Keypad onDigitPress={handleDigitPress} />
          </View>
 </View >
  </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  VueVertical: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:'white',
    gap: 8,
  },
  safeArea: {
      flex: 1,
      backgroundColor: 'white',
    },
  root: {
    gap: 8,
     alignItems: 'center',
     marginTop:200,
     backgroundColor:'white'
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
    width :260,
    marginTop:50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',

  },
});
