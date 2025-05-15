import React from 'react';
import { Tabs } from 'expo-router';
import Settings from '@/screens/settings';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Stack } from 'expo-router';

export default function SettingsScreen() {
  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: false
        }}
      />
      <Tabs.Screen
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Settings />
    </>
  );
} 