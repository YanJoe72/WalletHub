import React, { useState,useRef } from 'react';
import { StyleSheet,TextInput, Alert ,ScrollView, View, Image,SafeAreaView, Dimensions, NativeScrollEvent, NativeSyntheticEvent   } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import userData from '@/constants/user';
import Compte  from '@/components/ui/Acceuil/Compte';
import Depense  from '@/components/ui/Acceuil/Depenses';
import Button  from '@/components/ui/Connexion/KeyButton';


export default function HomeScreen() {

//---------POINTS-----------
const { width } = Dimensions.get('window'); // pour savoir la largeur de l’écran

const [activeIndex, setActiveIndex] = useState(0);

const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  const offsetX = event.nativeEvent.contentOffset.x;
  const index = Math.round(offsetX / width); // déduit l'index actif
  setActiveIndex(index);
};

//---------COMPTE-----------

const comptes = [
  { nom: 'N26', solde: '1230.45' },
  { nom: 'Revolut', solde: '980.00' },
  { nom: 'Société Générale', solde: '540.75' },
  { nom: 'Lydia', solde: '215.10' },
  { nom: 'Caisse d’Épargne', solde: '880.00' },
];

//---------DEPENSES-----------
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

//---------VUES-----------
  return (
    <SafeAreaView style={styles.safeArea}>

    <ThemedView backgroundColor='white'>
      {/* Conteneur avec flexDirection row pour les éléments côte à côte */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' ,marginTop:25}}>
        {/* KeyButton 1 avec image */}
        <Button

          digit="1"
          onPress={(digit) => console.log(digit)}
          imageSource={require('@/assets/images/Setting.png')} // Remplace par ton image
        />

        <ThemedText style={{color:'black'}} type="title">Home</ThemedText>

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
         pagingEnabled
         onScroll={handleScroll}
         scrollEventThrottle={16}
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={styles.scrollContent}
         style={styles.scrollContainerHorizontal}>
        {comptes.map((compte, i) => (
//           <Compte key={i} nomBanque={compte.nom} solde={compte.solde} />
            <View key={i} style={{marginTop:50 ,height:200,width:'400', alignItems: 'center' }}>
                <Compte nomBanque={compte.nom} solde={compte.solde} />
              </View>
        ))}
      </ScrollView>
<View style={styles.pagination}>
  {comptes.map((_, index) => (
    <View
      key={index}
      style={[
        styles.dot,
        { backgroundColor: index === activeIndex ? '#8B98AF' : '#DCE1EA' },
      ]}
    />
  ))}
</View>

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

<ThemedText style={{marginLeft:30,color:'gray',  fontWeight: 'bold' }}>Activité récentes:</ThemedText>
            <ScrollView
              vertical
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              style={styles.scrollContainerVertical}
            >
              {depenses.map((depense, i) => (
                <Depense key={depense.id} imageSource={depense.imageSource} title={depense.title} montant={depense.montant} />
              ))}
            </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
      safeArea: {
          flex: 1,
          backgroundColor: 'white',
        },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },

  scrollContainerVertical:{
        maxHeight: 500,
      },
  scrollContainerHorizontalHorizontal: {
        maxHeight: 100, // hauteur max (tes cards font ~100px de haut)
      },
  scrollContent: {
    paddingHorizontal: 1,
    alignItems: 'center',
      },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 100,
  },
});







