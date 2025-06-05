import HomeScreen from '@/screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Home(){
  const [loading, setLoading] = useState(true);
  const router = useRouter()

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

    return <HomeScreen/>;
}