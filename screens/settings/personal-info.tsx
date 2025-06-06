import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { databases } from '@/config/appwrite.config';
import { DATABASE_ID, COLLECTION_ID } from '@/config/constants';
import { ProfileItem as ProfileItemType, ProfileSection, UserData } from '@/types/profile';
import { useRouter } from 'expo-router';

const ProfileItem: React.FC<ProfileItemType> = ({ icon, label, value, action }) => (
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

const LoadingScreen = () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color="#000" />
    <Text>Chargement...</Text>
  </View>
);

export default function PersonalInfo() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const documents = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        if (documents.documents.length > 0) {
          setUserData(documents.documents[0] as UserData);
        } else {
          console.warn("Aucun document public trouvé.");
        }
      } catch (error) {
        console.error("Erreur récupération données publiques :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicData();
  }, []);

  if (loading) return <LoadingScreen />;

  const profileSections: ProfileSection[] = [
    {
      title: "Informations personnelles",
      items: [
        { icon: "person-outline", label: "Nom", value: userData?.lastName },
        { icon: "happy-outline", label: "Prénom", value: userData?.firstName },
        { icon: "mail-outline", label: "Email", value: userData?.email },
        { icon: "call-outline", label: "Téléphone", value: userData?.phone },
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

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Informations personnelles",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: '600',
            color: 'black',
          },
          headerStyle: {
            backgroundColor: '#F6F6F6',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView style={styles.container}>
        {profileSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item: ProfileItemType, itemIndex: number) => (
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
  container: { flex: 1, backgroundColor: '#F6F6F6' },
  section: { marginVertical: 12, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#6B7280', marginBottom: 8, marginLeft: 4 },
  sectionContent: { backgroundColor: '#FFFFFF', borderRadius: 16, overflow: 'hidden' },
  itemContainer: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F6F6F6' },
  iconContainer: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#F6F6F6', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  textContainer: { flex: 1 },
  label: { fontSize: 16, color: '#1F2937', fontWeight: '500' },
  value: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backButton: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 50, backgroundColor:'hite' },
  headerTitle: { marginLeft: 10, fontSize: 20, fontWeight: '600', paddingLeft: 40, color: 'black' },

});