import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';

const fetchProductById = async (id: number): Promise<Product> => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération du produit');
    }
    const data = await response.json();
    return data;
};

const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des produits');
    }
    const data = await response.json();
    return data;
};

export const getProductById = (id: number) => {
    return useQuery<Product, Error>({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id),
    });
};

export const getProducts = () => {
    return useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
};
