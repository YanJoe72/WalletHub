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

const fetchAccountsById = async (accountId: string): Promise<Account> => {
    try {
        const response = await databases.listDocuments(
            databaseId, 
            collectionId, 
            [
                Query.equal('accountNumber', accountId),
                Query.limit(1)
            ]
        );

        if (response.documents.length === 0) {
            throw new Error('Compte non trouvé');
        }

        const document = response.documents[0];
        return {
            userId: document.userId as number,
            bankName: document.bankName as string,
            accountNumber: document.accountNumber as string,
            balance: document.balance as number
        };
    } catch (error) {
        console.error('Erreur lors de la récupération du compte:', error);
        throw new Error('Erreur lors de la récupération des détails du compte');
    }
};

export const useAccountDetails = (accountId: string) => {
    return useQuery({
        queryKey: ['account', accountId],
        queryFn: () => fetchAccountsById(accountId),
    });
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

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur de connexion : ${response.status}`);
    }

    const data = await response.json(); // contient un token
    return data.token; // string
  } catch (error) {
    console.error('Échec de la connexion :', error);
    throw error;
  }
};









