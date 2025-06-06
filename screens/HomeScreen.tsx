import React, { useState, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions, Text, RefreshControl, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BankCard from '@/components/BankCard';
import { getAccounts } from '@/query/use-fetch';
import Animated, { FadeIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const accountColors = [
    '#8438FF',
    '#38CFFF',
    '#FF8000',
    '#FF1E1E',
    '#FF2090',
    '#49FFD8'
];


const ActionButton = ({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) => (
  <View style={styles.actionButton}>
    <View style={styles.actionIconContainer}>
      <Ionicons name={icon} size={24} color="#60708F" />
    </View>
    <Text style={styles.actionLabel} numberOfLines={2}>{label}</Text>
  </View>
);

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
  {
    id: '4',
    name: 'Macdo',
    date: '03.01.2021',
    amount: '- ₺ 23.00',
  },
  {
    id: '5',
    name: 'UberEats',
    date: '03.01.2021',
    amount: '- ₺ 80.00',
  },
];
 

export default function HomeScreen() {
  const router = useRouter();
  const { data: accounts, isLoading, error, refetch, isFetching } = getAccounts();
  const [activeIndex, setActiveIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveIndex(index % (accounts?.length || 1));

    // Logique de défilement infini
    if (accounts && accounts.length > 0) {
      const totalWidth = width * accounts.length;
      if (offsetX >= totalWidth) {
        scrollViewRef.current?.scrollTo({ x: 0, animated: false });
      }
    }
  };

  const renderCards = () => {
    if (!accounts || accounts.length === 0) return null;

    // Dupliquer les cartes pour créer un effet infini
    const duplicatedCards = [...accounts, ...accounts];

    return duplicatedCards.map((bank, i) => (
      <View key={i} style={styles.cardWrapper}>
        <BankCard
          title={bank.bankName}
          amount={bank.balance}
          cardNumber={bank.accountNumber}
          backgroundColor={accountColors[i % accountColors.length]}
          onPress={() => router.push({
            pathname: '/account/[id]',
            params: { 
              id: bank.accountNumber,
              color: accountColors[i % accountColors.length]
            }
          })}
        />
      </View>
    ));
  };

  const renderPaginationDots = () => {
    if (!accounts || accounts.length === 0) return null;

    return (
      <View style={styles.pagination}>
        {accounts.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: activeIndex % accounts.length === index ? '#8B98AF' : '#DCE1EA' },
            ]}
          />
        ))}
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.headerLeft} />
        <Text style={styles.headerTitle}>Home</Text>
        <View style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={22} color="#6B7280" />
        </View>
      </View>
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtonsContainer}>
      <ActionButton icon="swap-horizontal-outline" label="Virement" />
      <ActionButton icon="scan-outline" label="Scan" />
      <ActionButton icon="document-text-outline" label="Documents" />
      <ActionButton icon="add-circle-outline" label="Nouveau compte" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing || isFetching} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text>Chargement...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error.message}</Text>
          </View>
        ) : accounts?.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text>Aucun compte trouvé.</Text>
          </View>
        ) : (
          <>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              onScroll={handleScroll}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardsContainer}
              snapToInterval={width}
              decelerationRate="fast"
              snapToAlignment="center"
              disableIntervalMomentum={true}
              directionalLockEnabled={true}
              overScrollMode="never"
              scrollEventThrottle={32}
            >
              {renderCards()}
            </ScrollView>

            {renderPaginationDots()}
          </>
        )}

        {renderActionButtons()}
        
        <View style={styles.activitySection}>
          <Text style={styles.activitiesTitle}>Activités récentes</Text>
          {activities.map((item, index) => (
            <Animated.View key={item.id} entering={FadeIn.delay(index * 100)}>
              <View style={styles.activityRow}>
                <View style={styles.activityIconPlaceholder}>
                  <Ionicons name="card-outline" size={24} color="#666" />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityName}>{item.name}</Text>
                  <Text style={styles.activityDate}>{item.date}</Text>
                </View>
                <Text style={styles.activityAmount}>{item.amount}</Text>

              </View>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    zIndex: 1,
    paddingTop: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    width: 40,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#60708F',
    textAlign: 'center',
    flex: 1,
  },
  notificationIcon: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 6,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  cardsContainer: {
    paddingHorizontal: 1,
    alignItems: 'center',
  },
  cardWrapper: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 25,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  actionButton: {
    alignItems: 'center',
    width: '22%',
    height: 85,
  },
  newAccountButton: {
    marginTop: 8,
  },
  actionIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  actionLabel: {
    fontSize: 11,
    color: '#60708F',
    textAlign: 'center',
    height: 40,
    lineHeight: 16,
  },
  sectionTitle: {
    marginLeft: 30,
    color: 'gray',
    fontWeight: 'bold',
    marginTop: 20,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  activitySection: { 
    marginTop: 20,
    paddingHorizontal: 20,
  },
  activitiesTitle: { 
    fontWeight: '600', 
    marginBottom: 15,
    fontSize: 16,
    color: '#60708F',
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  activityIconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
    marginRight: 12,
  },
  activityName: { 
    fontWeight: '500',
    fontSize: 14,
    color: '#333',
  },
  activityDate: { 
    color: '#aaa', 
    fontSize: 12,
    marginTop: 2,
  },
  activityAmount: { 
    fontWeight: 'bold', 
    color: '#333',
    fontSize: 14,
    minWidth: 100,
    textAlign: 'right',
  },
 
});
