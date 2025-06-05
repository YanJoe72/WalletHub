import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      const seen = await AsyncStorage.getItem('hasSeenOnboarding');
      if (seen === 'true') {
        router.replace('/home-connection');
      } else {
        router.replace('/onboarding');
      }
      setLoading(false);
    };
    check();
  }, []);

  if (loading) {
    return <View><ActivityIndicator /></View>;
  }

  return null;
}