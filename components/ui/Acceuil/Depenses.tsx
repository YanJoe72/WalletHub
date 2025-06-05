import React from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';

// Composant cliquable dynamique
const Depenses = ({id, imageSource, title, montant,date, onPress }) => {
  return (
      <View  style={{

                    flexDirection: 'row',
                    alignItems: 'center',
                    width :320,
                    height: 160,

                  }} >
    <TouchableOpacity
      style={{
        padding: 10,
        backgroundColor: 'white', // gris semi-transparent
        borderWidth: 3,
        borderColor: '#ccc',
        borderRadius:25

      }}
      onPress={onPress}
    >

          <View
             style= {{
                            width:310,
                            height:80,
                            padding: 10,
                            borderWidth: 3,

                            borderColor: 'transparent',
                            borderRadius: 10,
                            flexDirection: 'row',

                        }} >
          {/* Image à gauche */}
          <Image
            source={imageSource}
            style={{ marginRight: 5, width: 40, height: 40 ,  borderRadius: 10,}}/>

          {/* Texte à droite */}
            <Text  style={{color: 'gray', fontWeight: 'bold', fontSize: 13 }}>{title}</Text>

             {/* Montant */}
            <Text  style={{marginLeft:10,  color: 'gray', fontWeight: 'bold',fontSize: 15 }}>{montant}</Text>
          </View>
          <Text  style={{marginLeft:10,  color: 'gray', fontWeight: 'bold',fontSize: 15 }}>{date}</Text>

    </TouchableOpacity>
   </View>
  );
};





export default Depenses;
