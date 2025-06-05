// product/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native'; // Importation du hook pour la navigation
import ProductScreen from '@/screens/ProductScreen';
import {useEffect} from "react";

export default function ProductDetail() {
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: 'Détails du produit',
        });
    }, [navigation]);

    return <ProductScreen id={parseInt(id as string, 10)} />;
}
