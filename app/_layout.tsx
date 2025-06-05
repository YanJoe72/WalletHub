import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack 
  screenOptions={{
    headerShown: false,  // <-- désactive la barre en haut
  }}/>;
}