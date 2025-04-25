import React, { useState } from 'react';
import { StyleSheet,TextInput, Alert ,ScrollView, View, Image  } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import userData from '@/constants/user';
import Compte  from '@/components/ui/Acceuil/Compte';
import Depense  from '@/components/ui/Acceuil/Depenses';
import Button  from '@/components/ui/Connexion/KeyButton';




export default function HomeScreen() {


const comptes = [
  { nom: 'N26', solde: '1230.45' },
  { nom: 'Revolut', solde: '980.00' },
  { nom: 'Société Générale', solde: '540.75' },
  { nom: 'Lydia', solde: '215.10' },
  { nom: 'Caisse d’Épargne', solde: '880.00' },
];
 const depenses = [
    {
      id: 1,
      imageSource: require('@/assets/images/netflixlogo.png'),
      title: "Abonnement mensuel Netflix ",
      montant: "29.99 €",
    },
    {
      id: 2,
      imageSource: require('@/assets/images/crabGamelogo.png'),
      title: "Crab game : Jeux",
      montant: "50.99€",
    },
    {
      id: 3,
      imageSource: require('../../assets/images/photologo.png'),
      title: "Appareil Photo",
      montant: "64.99€",
    },
  ];


  return (
    <ThemedView>

    <ThemedView>
      {/* Conteneur avec flexDirection row pour les éléments côte à côte */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' ,marginTop:25}}>
        {/* KeyButton 1 avec image */}
        <Button
          digit="1"
          onPress={(digit) => console.log(digit)}
          imageSource={require('@/assets/images/Setting.png')} // Remplace par ton image
        />

        <ThemedText type="title">Home</ThemedText>

        {/* KeyButton 2 avec image */}
        <Button
          digit="2"
          onPress={(digit) => console.log(digit)}
          imageSource={require('@/assets/images/Notification.png')} // Remplace par ton image
        />
      </View>
    </ThemedView>

      {/* ScrollView avec les comptes */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollContainerHorizontal}
      >
        {comptes.map((compte, i) => (
          <Compte key={i} nomBanque={compte.nom} solde={compte.solde} />
        ))}
      </ScrollView>


      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' ,marginTop:25}}>
              {/* KeyButton 1 avec image */}
              <Button
                digit="1"
                onPress={(digit) => console.log(digit)}
                imageSource={require('@/assets/images/Virement.png')} // Remplace par ton image
              />
              <Button
                digit="1"
                onPress={(digit) => console.log(digit)}
                imageSource={require('@/assets/images/Scan.png')} // Remplace par ton image
              />
              <Button
                digit="1"
                onPress={(digit) => console.log(digit)}
                imageSource={require('@/assets/images/Document.png')} // Remplace par ton image
              />
      </View>

            <ScrollView
              vertical
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              style={styles.scrollContainerVertical}
            >
              {depenses.map((depense, i) => (
                <Depense image={depense.image} title={depense.title} montant={depense.montant} />
              ))}
            </ScrollView>
    </ThemedView>
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
  scrollContainerVertical:{
        maxHeight: 500,
      },
  scrollContainerHorizontalHorizontal: {
        maxHeight: 120, // hauteur max (tes cards font ~100px de haut)
      },
  scrollContent: {
    paddingHorizontal: 10,
    alignItems: 'center',
      },
});
