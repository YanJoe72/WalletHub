import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { getProductById } from '@/query/use-fetch';

interface ProductScreenProps {
    id: number;
}

const ProductScreen: React.FC<ProductScreenProps> = ({ id }) => {
    const { data, isLoading, error } = getProductById(id);
    console.log(data);

    if (isLoading) return <Text>Chargement...</Text>;
    if (error) return <Text>Erreur : {(error as Error).message}</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nom : {data?.title}</Text>
            <Text style={styles.description}>Description : {data?.description}</Text>
            <Text style={styles.price}>Prix : {data?.price} €</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center', // Assurez-vous que le contenu est centré
        alignItems: 'center', // Assurez-vous que le contenu est centré
        backgroundColor: '#fff', // Fond blanc pour voir les données
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
    },
    price: {
        fontSize: 16,
        color: '#888',
    },
});

export default ProductScreen;
