import React from 'react';
import { FlatList, Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getProducts } from '@/query/use-fetch';
import { useRouter } from 'expo-router';
import { Product } from '@/types/product';

export default function ProductList() {
    const { data, isLoading, error } = getProducts();
    const router = useRouter();

    if (isLoading) return <Text>Chargement...</Text>;
    if (error) return <Text>Erreur : {(error as Error).message}</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Liste des produits</Text>
            {data && data.length > 0 ? (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }: { item: Product }) => (
                        <TouchableOpacity
                            style={styles.productCard}
                            onPress={() => router.push(`/product/${item.id}`)}
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={styles.productImage}
                            />
                            <View style={styles.productInfo}>
                                <Text style={styles.productTitle}>{item.title}</Text>
                                <Text style={styles.productCategory}>{item.category}</Text>
                                <Text style={styles.productPrice}>{item.price} €</Text>
                                <Text style={styles.productRating}>
                                    {item.rating.rate} ({item.rating.count} avis)
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <Text>Aucun produit trouvé</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productCard: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productCategory: {
        fontSize: 14,
        color: '#888',
    },
    productPrice: {
        fontSize: 14,
        color: '#000',
    },
    productRating: {
        fontSize: 12,
        color: '#888',
    },
});
