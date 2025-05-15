import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type ProfileSection = {
  title: string;
  items: ProfileItem[];
};

type ProfileItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  action?: boolean;
};

const profileSections: ProfileSection[] = [
  {
    title: "Informations personnelles",
    items: [
      { icon: "person-outline", label: "Nom", value: "Dupont" },
      { icon: "happy-outline", label: "Prénom", value: "Jean" },
      { icon: "mail-outline", label: "Email", value: "jean.dupont@email.com" },
      { icon: "call-outline", label: "Téléphone", value: "+33 6 12 34 56 78" },
    ]
  },
  {
    title: "Sécurité",
    items: [
      { icon: "key-outline", label: "Modifier le mot de passe", action: true },
      { icon: "finger-print-outline", label: "Authentification biométrique", action: true },
      { icon: "shield-checkmark-outline", label: "Vérification en 2 étapes", action: true },
    ]
  },
  {
    title: "Préférences",
    items: [
      { icon: "notifications-outline", label: "Notifications", action: true },
      { icon: "language-outline", label: "Langue", value: "Français" },
      { icon: "moon-outline", label: "Mode sombre", action: true },
    ]
  }
];

const ProfileItem = ({ icon, label, value, action }: ProfileItem) => (
  <TouchableOpacity style={styles.itemContainer}>
    <View style={styles.iconContainer}>
      <Ionicons name={icon} size={22} color="#6B7280" />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.label}>{label}</Text>
      {value && <Text style={styles.value}>{value}</Text>}
    </View>
    {action && <Ionicons name="chevron-forward" size={20} color="#D1D1D6" />}
  </TouchableOpacity>
);

export default function PersonalInfo() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Informations personnelles",
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: '600',
          },
        }} 
      />
      <ScrollView style={styles.container}>
        {profileSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <ProfileItem key={itemIndex} {...item} />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  section: {
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F6F6',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
}); 