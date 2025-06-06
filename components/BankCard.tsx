import React from 'react';
import { View, Text, StyleSheet, GestureResponderEvent, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export interface BankCardProps {
    title: string;
    amount: number;
    cardNumber: string;
    backgroundColor: string | import('react-native').ColorValue;
    onPress?: (event: GestureResponderEvent) => void;
    isHidden?: boolean;
}

export default function BankCard({ title, amount, cardNumber, backgroundColor, onPress, isHidden = false }: BankCardProps) {
    const formattedNumber = cardNumber
        ? cardNumber.replace(/(.{4})/g, '$1 ').trim()
        : '';

    const maskedNumber = formattedNumber
        .split(' ')
        .map((group, index) => {
            if (index >= 4) {
                return group;
            }
            return 'XXXX';
        })
        .join(' ');

    const displayNumber = isHidden ? maskedNumber : formattedNumber;

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <View style={[
                styles.card, 
                { 
                    backgroundColor: backgroundColor || '#8F5CFF',
                    opacity: isHidden ? 0.7 : 1
                }
            ]}> 
                <View style={styles.headerRow}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <Text style={styles.amount}>
                    {Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount)}
                </Text>
                <Text style={styles.cardNumber}>
                    {displayNumber}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 325,
        height: 200,
        borderRadius: 30,
        padding: 24,
        justifyContent: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.10,
        shadowRadius: 18,
        elevation: 8,
        marginBottom: 24,
        alignSelf: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '500',
        opacity: 0.8,
    },
    amount: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 18,
        marginTop: 2,
    },
    currency: {
        fontSize: 22,
        fontWeight: 'bold',
        opacity: 0.9,
    },
    cardNumber: {
        color: '#fff',
        fontSize: 16,
        opacity: 0.8,
    },
}); 