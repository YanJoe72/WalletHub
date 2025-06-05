import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, RefreshControl } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BankCard from '../components/BankCard';
import { getAccounts } from '@/query/use-fetch';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';

const accountColors = [
    '#A7C7E7', 
    '#B5B9FF', 
    '#B8E0D2',
    '#FFD6B0', 
    '#C3AED6', 
    '#A0D8B3',
    '#F7C8E0', 
    '#F9E79F', 
    '#B4DFE5', 
    '#F6C28B', 

];

const CardSkeleton = () => (
  <View style={[{
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
    backgroundColor: '#e0e0e0', 
  }]}> 
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
      <View style={{ width: 80, height: 18, borderRadius: 4, backgroundColor: '#cccccc' }} />
      <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#cccccc' }} />
    </View>
    <View style={{ width: 120, height: 32, borderRadius: 6, backgroundColor: '#cccccc', marginBottom: 18, marginTop: 2 }} />
    <View style={{ width: 100, height: 18, borderRadius: 4, backgroundColor: '#cccccc', marginTop: 8 }} />
  </View>
);


export default function AccountScreen() {
    const { data: accounts, isLoading, error, refetch, isFetching } = getAccounts();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const totalAmount = accounts?.reduce((sum, acc) => sum + acc.balance, 0) || 0;

    const minSegment = 6; 
    const n = accounts?.length || 0;
    const minTotal = n * minSegment;
    const rest = 100 - minTotal;
    const totalRestAmount = Math.max(totalAmount, 1); 

    let cumulativeRotation = 0;
    const cardSegments = accounts?.map((acc, index) => {
        const proportional = rest * (acc.balance / totalRestAmount);
        const segmentFillPercentage = minSegment + proportional;
        const segmentRotationStart = cumulativeRotation;
        const segmentAngleDegrees = (segmentFillPercentage / 100) * 360;
        cumulativeRotation += segmentAngleDegrees;
        return {
            ...acc,
            segmentFill: segmentFillPercentage,
            rotationStart: segmentRotationStart,
            pieColor: accountColors[index % accountColors.length],
        };
    }) || [];

    const graphSize = 200;

    const renderHeader = () => (
        <View>
            <Tabs.Screen
                options={{
                    headerShown: true,
                    title: '',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#fff',
                        shadowColor: 'transparent',
                        elevation: 0,
                    },
                    headerTitleStyle: {
                        color: '#60708F',
                        fontWeight: 'bold',
                    },
                    headerRight: () => (
                        <View style={{ marginRight: 18 }}>
                            <View
                                style={{
                                    backgroundColor: '#f3f4f6',
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: '#e5e7eb',
                                    padding: 6,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    shadowColor: '#000',
                                    shadowOpacity: 0.06,
                                    shadowRadius: 2,
                                    shadowOffset: { width: 0, height: 1 },
                                }}
                            >
                                <Ionicons name="notifications-outline" size={22} color="#6B7280" />
                            </View>
                        </View>
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
                            <View style={styles.centerTextContainer}>
                                <Text
                                    style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}
                                    numberOfLines={1}
                                    adjustsFontSizeToFit
                                    minimumFontScale={0.5}
                                >
                                    {Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalAmount)}
                                </Text>
                                <Text
                                    style={{ fontSize: 15, color: '#aaa', textAlign: 'center' }}
                                    numberOfLines={1}
                                    adjustsFontSizeToFit
                                >
                                    Total Balance
                                </Text>
                            </View>
                        )}
                    </AnimatedCircularProgress>
                    {cardSegments.map((segment, index) => (
                        <AnimatedCircularProgress
                            key={segment.accountNumber + index + '-visual'}
                            size={graphSize}
                            width={20}
                            fill={segment.segmentFill}
                            tintColor={segment.pieColor}
                            backgroundColor="transparent"
                            rotation={segment.rotationStart}
                            lineCap="butt"
                            style={styles.circularProgressBase}
                        />
                    ))}
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <View style={{ padding: 16 }}>
                    {[...Array(3)].map((_, i) => <CardSkeleton key={i} />)}
                </View>
            ) : error ? (
                <Text style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>{error.message}</Text>
            ) : accounts?.length === 0 ? (
                <Text style={{ textAlign: 'center', marginTop: 40 }}>Aucun compte trouvé.</Text>
            ) : (
                <Animated.FlatList
                    data={accounts}
                    keyExtractor={item => item.accountNumber}
                    renderItem={({ item, index }) => (
                        <Animated.View entering={FadeIn} layout={Layout.springify()}>
                            <BankCard
                                title={item.bankName}
                                amount={item.balance}
                                cardNumber={item.accountNumber}
                                backgroundColor={accountColors[index % accountColors.length]}
                            />
                        </Animated.View>
                    )}
                    ListHeaderComponent={renderHeader}
                    contentContainerStyle={styles.content}
                    refreshControl={
                        <RefreshControl refreshing={refreshing || isFetching} onRefresh={onRefresh} />
                    }
                    windowSize={5}
                    maxToRenderPerBatch={5}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },
    circularProgressContainer: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerTextContainer: {
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circularProgressBase: {
        position: 'absolute',
    },
});

