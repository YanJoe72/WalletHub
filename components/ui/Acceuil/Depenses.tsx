import React from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';

// Composant cliquable dynamique
const Depenses = ({ imageSource, title, montant, onPress }) => {
  return (
      <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width :250,
                    height:200,
                  }} >
    <TouchableOpacity
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}
      onPress={onPress}
    >
      <View>
      {/* Image à gauche */}
      <Image
        source={imageSource}
        style={{ width: 40, height: 40}}
      />
      {/* Texte à droite */}
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
        <Text style={{ color: 'gray' }}>{montant}</Text>
      </View>
    </TouchableOpacity>
   </View>
  );
};

export default Depenses;
