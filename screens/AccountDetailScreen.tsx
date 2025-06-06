import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAccountDetails } from '@/query/use-fetch';
import Animated, { FadeIn } from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;

const activities = [
  {
    id: '1',
    name: 'Netflix Membership',
    date: '15.01.2021',
    amount: '- ₺ 29.90',
  },
  {
    id: '2',
    name: 'Turkcell Invoice',
    date: '10.01.2021',
    amount: '- ₺ 65.00',
  },
  {
    id: '3',
    name: 'Money Transfer',
    date: '03.01.2021',
    amount: '- ₺ 450.00',
  },
];

const generateMonthLabels = () => {
  const today = new Date();
  const months = [];
  
  for (let i = 4; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    months.push(date.toLocaleString('fr-FR', { month: 'short' }));
  }
  
  return months;
};

export default function AccountDetails() {
  const { id, color } = useLocalSearchParams();
  const router = useRouter();
  const { data: account, isLoading, error, refetch } = useAccountDetails(id as string);
  const [selectedPoint, setSelectedPoint] = useState<{ x: number; y: number; value: number } | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const chartData = useMemo(() => {
    if (!account) return null;

    const months = generateMonthLabels();
    const data = Array(4).fill(null);
    data.push(account.balance);

    return {
      labels: months,
      datasets: [{ data }]
    };
  }, [account]);

  const curveColor = typeof color === 'string' ? color : '#8438FF';

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>Erreur: {error.message}</Text>
      </View>
    );
  }

  if (!account) {
    return (
      <View style={styles.container}>
        <Text>Compte non trouvé</Text>
      </View>
    );
  }

  const infoLabels = [
    { label: 'Numéro de compte', value: account.accountNumber },
    { label: 'Banque', value: account.bankName },
    { label: 'Solde', value: Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(account.balance) },
  ];

  return (
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeIn.delay(index * 100)}>
            <View style={styles.activityRow}>
              <View style={styles.activityIconPlaceholder}>
                <Ionicons name="card-outline" size={24} color="#666" />
              </View>
              <View>
                <Text style={styles.activityName}>{item.name}</Text>
                <Text style={styles.activityDate}>{item.date}</Text>
              </View>
              <Text style={styles.activityAmount}>{item.amount}</Text>
            </View>
          </Animated.View>
        )}
        ListHeaderComponent={
          <View>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails du compte</Text>
      </View>

            {/* Infos principales */}
      <View style={styles.infoBox}>
        {infoLabels.map((item, index) => (
          <Animated.View entering={FadeIn.delay(index * 100)} style={styles.infoRow} key={item.label}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </Animated.View>
        ))}
      </View>

            {/* Balance & Chart */}
      <Animated.View entering={FadeIn.delay(0)} style={styles.balanceBox}>
        <Animated.Text entering={FadeIn.delay(100)} style={styles.balanceLabel}>Balance</Animated.Text>
        <Animated.Text 
          entering={FadeIn.delay(200)}
          style={[
            styles.balanceValue,
            { color: curveColor }
          ]}
        >
          {Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(account.balance)}
        </Animated.Text>
        <Animated.View entering={FadeIn.delay(300)} style={styles.chartContainer}>
          {chartData && (
                  <>
            <LineChart
              data={chartData}
              width={screenWidth - 40}
              height={220}
              withDots
              withInnerLines={false}
              withOuterLines={true}
              withVerticalLines={true}
              withHorizontalLines={true}
                      onDataPointClick={({ x, y, value }) => {
                        setSelectedPoint({ x, y, value });
                      }}
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                color: (opacity = 1) => `${curveColor}CC`,
                labelColor: () => '#999',
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#fff',
                },
                formatYLabel: (value) => 
                  Intl.NumberFormat('fr-FR', { 
                    style: 'currency', 
                    currency: 'EUR',
                    maximumFractionDigits: 0 
                  }).format(Number(value)),
              }}
              bezier
              style={{
                borderRadius: 10,
                paddingRight: 70,    
              }}
              segments={4}
              fromZero={false}
            />
                    {selectedPoint && (
                      <View style={[styles.tooltip, { left: selectedPoint.x - 50, top: selectedPoint.y - 40 }]}>
                        <Text style={styles.tooltipText}>
                          {Intl.NumberFormat('fr-FR', { 
                            style: 'currency', 
                            currency: 'EUR',
                            maximumFractionDigits: 0 
                          }).format(selectedPoint.value)}
                        </Text>
                      </View>
                    )}
                  </>
          )}
        </Animated.View>
      </Animated.View>

        <Text style={styles.activitiesTitle}>Activités récentes</Text>
                </View>
        }
        contentContainerStyle={styles.container}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[curveColor]}
            tintColor={curveColor}
            progressViewOffset={50}
        />
        }
      />
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: { 
    flex: 1, 
    backgroundColor: 'white', 
    padding: 20, 
    paddingTop: 50,
    minHeight: Dimensions.get('window').height - 50,
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 50 },
  headerTitle: { marginLeft: 10, fontSize: 20, fontWeight: '600', paddingLeft: 40, color: '#60708F' },

  infoBox: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    paddingBottom: 20,
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { color: '#999' },
  value: { fontWeight: 'bold' },

  balanceBox: { marginBottom: 20 },
  balanceLabel: { color: '#999', paddingBottom: 10, fontSize:20 },
  balanceValue: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },

  activitySection: { marginTop: 10 },
  activitiesTitle: { fontWeight: '600', marginBottom: 10 },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  activityIconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  activityName: { fontWeight: '500' },
  activityDate: { color: '#aaa', fontSize: 12 },
  activityAmount: { fontWeight: 'bold', color: '#333' },

  chartContainer: {
    marginTop: 10,
    borderRadius: 0,
  },

  backButton: {
    padding: 5,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },

  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 8,
    borderRadius: 4,
    zIndex: 1000,
  },
  tooltipText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});