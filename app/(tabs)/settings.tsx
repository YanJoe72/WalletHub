import React from 'react';
import Settings from '@/screens/settings';
import { Stack } from 'expo-router';

export default function SettingsScreen() {
  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: false
        }}
      />
      <Settings />
    </>
  );
} 