import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import {Entypo, MaterialCommunityIcons} from '@expo/vector-icons';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


export default function TabLayout() {
    const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarBackground: () => <View style={{ backgroundColor: 'white', flex: 1 }}>
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
        name="index"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View style={{ marginTop: 10, marginLeft: 50  }}>
              <IconSymbol size={28} name="house.fill" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
                name="accounts"
                options={{
                    title: 'Accounts',
                    tabBarIcon: ({ color }) => <MaterialIcons name="account-balance-wallet" size={24} color="black" />,
                }}
            />
      <Tabs.Screen
        name="settings"
        options={{
          title: '',
          headerShown: false, 
          tabBarIcon: ({ color }) => (
            <View style={{ marginTop: 20}}>
              <IconSymbol size={28} name="person.fill" color={color} />
            </View>
          ),
        }}
      />
                        
    </Tabs>
  );
}