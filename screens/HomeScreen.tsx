import React, { useState,useRef } from 'react';
import { StyleSheet,TextInput, Alert ,ScrollView, View, Image,SafeAreaView, Dimensions, NativeScrollEvent, NativeSyntheticEvent   } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import userData from '@/constants/user';
import BankCard  from '@/components/ui/Acceuil/BankCard';
import Depense  from '@/components/ui/Acceuil/Depenses';
import Button  from '@/components/ui/Acceuil/ImageButton';


export default function HomeScreen() {

//---------POINTS-----------
const { width } = Dimensions.get('window'); // pour savoir la largeur de l’écran

const [activeIndex, setActiveIndex] = useState(0);

const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  const offsetX = event.nativeEvent.contentOffset.x;
  const index = Math.round(offsetX / width); // déduit l'index actif
  setActiveIndex(index);
};

//---------BankCard-----------

const comptes = [
  { title: 'N26', amount: '1230.45',cardNumber:'0001 0002 300', backgroundColor:'#F9E79F'},
  { title: 'Revolut', amount: '980.00',cardNumber:'154845 84845 4558', backgroundColor:'#FFD6B0'},
  { title: 'Société Générale', amount: '540.75' ,cardNumber:'1784848 9598485 8958 ',backgroundColor: '#B8E0D2'},
  { title: 'Lydia', amount: '215.10', cardNumber:'741 852 963',backgroundColor: '#B5B9FF'},
  { title: 'Caisse d’Épargne', amount: '880.00' , cardNumber:'12345 789 7862',backgroundColor:'#A7C7E7'},
];

//---------DEPENSES-----------
 const depenses = [
    {
      id: 1,
      imageSource: require('../assets/images/netflixlogo.png'),
      title: "Abonnement mensuel Netflix ",
      montant: "29.99 €",
    },
    {
      id: 2,
      imageSource: require('../assets/images/crabGamelogo.png'),
      title: "Crab game : Jeux",
      montant: "50.99€",
    },
    {
      id: 3,
      imageSource: require('../assets/images/photologo.png'),
      title: "Appareil Photo",
      montant: "64.99€",
    },
    {
      id: 4,
      imageSource: require('../assets/images/favicon.png'),
      title: "Abonnement mensuel ExpoGo ",
      montant: "100.99€",
    },
    {
      id: 5,
      imageSource: require('../assets/images/netflixlogo.png'),
      title: "Encore Netflix mais Prenium",
      montant: "59.99 €",
    },
  ];

//---------VUES-----------
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainerVertical}

      >
<View style={styles.header}>

      {/* Conteneur avec flexDirection row pour les éléments côte à côte */}
      <View style={{marginTop:50,marginBottom:-150, marginLeft:150, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* KeyButton 1 avec image */}


        <ThemedText style={{color:'#A9A9A9' }} type="title">Home</ThemedText>

        {/* KeyButton 2 avec image */}
        <Button
          imageSource={require('../assets/images/Notification.png')} // Remplace par ton image
        />
      </View>


      {/* ScrollView avec les BankCards */}
      <ScrollView
        horizontal
         pagingEnabled
         onScroll={handleScroll}
         scrollEventThrottle={16}
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={styles.scrollContent}
         style={styles.scrollContainerHorizontal}>
        {comptes.map((bank, i) => (
            <View key={i} style={{height:100,width:width, alignItems: 'center' }}>
                <BankCard  key={i}  title={bank.title} amount={bank.amount} cardNumber={bank.cardNumber} backgroundColor={bank.backgroundColor}/>
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
                style={styles.button}
                imageSource={require('../assets/images/Virement.png')} // Remplace par ton image
              />
              <Button
                style={styles.button}
                imageSource={require('../assets/images/Scan.png')} // Remplace par ton image
              />
              <Button
                style={styles.button}
                imageSource={require('../assets/images/Document.png')} // Remplace par ton image
              />

      </View>
   </View>

<ThemedText style={{marginLeft:30,color:'gray',  fontWeight: 'bold' }}>Activité récentes:</ThemedText>


<View style={styles.scrollContent}>
              {depenses.map((depense, i) => (
                <Depense key={depense.id} imageSource={depense.imageSource} title={depense.title} montant={depense.montant} />
              ))}
</View>
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

  },header: {
      backgroundColor: 'white',
      height:480,
    },

  scrollContainerVertical:{
          paddingBottom: 20
      },
  scrollContainerHorizontalHorizontal: {

      },
  scrollContent: {
    paddingHorizontal: 1,
    alignItems: 'center',
      },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    gap: 8,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 100,
  },
});








// import HomeScreen from '@/Screen/HomeScreen';
//
// export default function Home(){
//     return <HomeScreen/>;
// }