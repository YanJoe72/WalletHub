import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';
import { Account } from '@/types/account';
import { databases,Query } from '../config/appwrite.config';

const databaseId = '684148870027b9f0adc2';
const collectionId = '68414a7a0019bf369905';

const fetchAccounts = async (): Promise<Account[]> => {
    const response = await databases.listDocuments(databaseId, collectionId, [Query.limit(100)]);
    return response.documents.map((doc: any) => ({
        userId: doc.userId,
        bankName: doc.bankName,
        accountNumber: doc.accountNumber,
        balance: doc.balance,
    }));
};

export const getAccounts = () => {
    return useQuery<Account[], Error>({
        queryKey: ['accounts'],
        queryFn: fetchAccounts,
        refetchOnWindowFocus: true,
    });
};

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








