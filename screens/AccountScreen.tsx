import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ColorValue } from 'react-native';
import { Tabs, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// Define a type for the card objects
interface Card {
    title: string;
    amount: number;
    cardNumber: string;
    gradientColors: [ColorValue, ColorValue];
    pieColor: ColorValue;
}

// Define fixed colors for each account type with explicit typing
const accountColors: Record<string, string[]> = {
    Balance: ['#FF5733', '#FF5733'],
    Bakiye: ['#33FF57', '#33FF57'],
    Savings: ['#3357FF', '#3357FF'],
    Credit: ['#FF33A1', '#FF33A1'],
};

export default function AccountScreen() {
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        const baseCards = [
            {
                title: 'Balance',
                amount: 15560.00,
                cardNumber: '5282 3000 1445 3286',
            },
            {
                title: 'Bakiye',
                amount: 2500.00,
                cardNumber: '5282 3000 1445 3286',
            },
            {
                title: 'Savings',
                amount: 8800.00,
                cardNumber: '4000 1234 5678 9010',
            },
            {
                title: 'Credit',
                amount: 1200.00,
                cardNumber: '5399 1234 8765 4321',
            },
        ];

        const enriched = baseCards.map((card) => ({
            ...card,
            gradientColors: accountColors[card.title] as [ColorValue, ColorValue],
            pieColor: accountColors[card.title][0] as ColorValue,
        }));
        setCards(enriched);
    }, []);

    const totalAmount = cards.reduce((sum, card) => sum + card.amount, 0);

    let cumulativeRotation = 0;
    const cardSegments = cards.map(card => {
        const segmentFillPercentage = totalAmount > 0 ? (card.amount / totalAmount) * 100 : 0;
        const segmentRotationStart = cumulativeRotation;
        const segmentAngleDegrees = totalAmount > 0 ? (card.amount / totalAmount) * 360 : 0;
        cumulativeRotation += segmentAngleDegrees;
        return {
            ...card,
            segmentFill: segmentFillPercentage,
            rotationStart: segmentRotationStart,
        };
    });

    const graphSize = 200;

    return (
        <SafeAreaView style={styles.container}>
            <Tabs.Screen
                options={{
                    headerShown: true,
                    title: '',
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        <Ionicons name="notifications-outline" size={24} color="#6B7280" style={styles.headerIcon} />
                    ),
                }}
            />

            <View style={{ alignItems: 'center', marginBottom: 20, marginTop: 20 }}>
                <View style={styles.circularProgressContainer}>
                    <AnimatedCircularProgress
                        size={graphSize}
                        width={20}
                        fill={100}
                        tintColor="#e6e6e6"
                        backgroundColor="transparent"
                        rotation={0}
                        style={styles.circularProgressBase}
                        lineCap="butt"
                    >
                        {(fill: number) => (
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 32, fontWeight: 'bold' }}>
                                    ₺ {totalAmount.toLocaleString('tr-TR')}
                                </Text>
                                <Text style={{ fontSize: 16, color: '#aaa' }}>Total Balance</Text>
                            </View>
                        )}
                    </AnimatedCircularProgress>

                    {cardSegments.map((segment, index) => (
                        <AnimatedCircularProgress
                            key={segment.title + index + '-visual'}
                            size={graphSize}
                            width={20}
                            fill={segment.segmentFill}
                            tintColor={segment.pieColor as string || '#000000'}
                            backgroundColor="transparent"
                            rotation={segment.rotationStart}
                            lineCap="butt"
                            style={styles.circularProgressBase}
                        />
                    ))}
                </View>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
                {cards.map((card, index) => (
                    <LinearGradient
                        key={index}
                        colors={card.gradientColors}
                        style={styles.card}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>{card.title}</Text>
                            <View style={styles.cardIcon}>
                                <View style={styles.cardIconDot} />
                                <View style={[styles.cardIconDot, { marginLeft: 4 }]} />
                            </View>
                        </View>
                        <Text style={styles.amount}>₺ {card.amount.toLocaleString('tr-TR')}</Text>
                        {card.cardNumber && (
                            <Text style={styles.cardNumber}>{card.cardNumber}</Text>
                        )}
                    </LinearGradient>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    headerIcon: {
        marginHorizontal: 16,
    },
    circularProgressContainer: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circularProgressBase: {
        position: 'absolute',
    },
    card: {
        borderRadius: 24,
        padding: 20,
        marginBottom: 16,
        minHeight: 140,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
        opacity: 0.9,
    },
    cardIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardIconDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
        opacity: 0.8,
    },
    amount: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: '600',
        marginBottom: 16,
    },
    cardNumber: {
        color: '#FFFFFF',
        fontSize: 16,
        opacity: 0.9,
        letterSpacing: 1,
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
});
