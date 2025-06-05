import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import {Entypo, MaterialCommunityIcons} from '@expo/vector-icons';


export default function TabLayout() {
    const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarBackground: () => <View style={{ backgroundColor: 'white' }}>
        <View 
          style={{
            position: 'absolute',
            top: 0,
            left: '25%',
            right: '25%', 
            height: 0.5, 
            backgroundColor: 'grey', 
            borderRadius: 1.5, 
          }} 
        />
      </View>,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: 'white', 
          ...Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View style={{ marginTop: 5, marginLeft: 50  }}>
              <IconSymbol size={28} name="house.fill" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
            title: '',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <View style={{ marginTop: 5 }}>
                <Entypo name="wallet" size={28} color={color} />
              </View>
            ),
        }}
        />
      <Tabs.Screen
        name="settings"
        options={{
          title: '',
          headerShown: false, 
          tabBarIcon: ({ color }) => (
            <View style={{ marginTop: 5, marginRight: 50}}>
              <IconSymbol size={28} name="person.fill" color={color} />
            </View>
          ),
        }}
      />
                        
    </Tabs>
  );
}