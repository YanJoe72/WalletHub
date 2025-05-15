import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Props typiques d’un compte ou solde
interface CompteProps {
  nomBanque: string;
  solde: string; // tu peux mettre number si tu veux formater toi-même
}

// Couleurs possibles
const couleurs = ['#FFB6C1', '#FFD700', '#87CEFA', '#90EE90', '#FFA07A', '#BA55D3', '#FF69B4'];

const Compte: React.FC<CompteProps> = ({ nomBanque, solde }) => {
  const randomColor = useMemo(() => {
    const index = Math.floor(Math.random() * couleurs.length);
    return couleurs[index];
  }, []);

  return (
    <View style={[styles.card, { backgroundColor: randomColor }]}>
      <Text style={styles.banque}>{nomBanque}</Text>
      <Text style={styles.solde}>{solde} €</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    elevation: 4, // ombre Android
    shadowColor: '#000', // ombre iOS
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  banque: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  solde: {
    fontSize: 18,
    color: '#fff',
    marginTop: 4,
  },
});

export default Compte;
