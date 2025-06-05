import { RootStackParamList } from '@/config/navigation';
import OnBoarding from '@/screens/onBoarding';
import { useNavigation, NavigationProp } from '@react-navigation/native';

export default function OnboardingScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return <OnBoarding onFinish={() => navigation.navigate('home-connection')} />;
}