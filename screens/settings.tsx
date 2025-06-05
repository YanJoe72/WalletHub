import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

type SettingsRoute = 
  | "/settings/personal-info"
  | "/settings/messages"
  | "/settings/product-preferences"
  | "/settings/notifications"
  | "/settings/qr-settings"
  | "/settings/definitions";

type SettingItem = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  href: SettingsRoute;
};

type Section = {
  title: string;
  items: SettingItem[];
};

const settingsData: Section[] = [
  {
    title: "Profil",
    items: [
      { icon: "person-outline", title: "Personal Information", href: "/settings/personal-info" },
      { icon: "mail-outline", title: "Messages", href: "/settings/messages" },
    ]
  },
  {
    title: "Préférences",
    items: [
      { icon: "star-outline", title: "Product Preferences", href: "/settings/product-preferences" },
      { icon: "notifications-outline", title: "Notification Settings", href: "/settings/notifications" },
      { icon: "qr-code-outline", title: "QR Settings", href: "/settings/qr-settings" },
    ]
  },
  {
    title: "Autre",
    items: [
      { icon: "list-outline", title: "Definitions", href: "/settings/definitions" },
    ]
  }
];

const SearchBar = ({ value, onChangeText }: { value: string; onChangeText: (text: string) => void }) => (
  <View style={styles.searchContainer}>
    <View style={styles.searchBar}>
      <Ionicons name="search-outline" size={22} color="#8F8F8F" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search in settings.."
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#B4B4B4"
      />
    </View>
  </View>
);

const SettingItem = ({ icon, title, href }: SettingItem) => (
  <Link href={href as any} asChild>
    <TouchableOpacity style={styles.settingItem}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={22} color="#8F8F8F" />
      </View>
      <Text style={styles.settingTitle}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#D1D1D6" style={styles.chevron} />
    </TouchableOpacity>
  </Link>
);

const SectionTitle = ({ title }: { title: string }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

export default function Settings() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrer les sections en fonction de la recherche
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return settingsData;

    const query = searchQuery.toLowerCase().trim();
    return settingsData
      .map(section => ({
        ...section,
        items: section.items.filter(item =>
          item.title.toLowerCase().includes(query)
        )
      }))
      .filter(section => section.items.length > 0);
  }, [searchQuery]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.headerTitle}>Settings</Text>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

        <View style={styles.content}>
          {filteredSections.map((section, index) => (
            <View key={section.title}>
              <SectionTitle title={section.title} />
              <View style={styles.section}>
                {section.items.map((item, itemIndex) => (
                  <SettingItem
                    key={`${section.title}-${itemIndex}`}
                    icon={item.icon}
                    title={item.title}
                    href={item.href}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1C1C1E',
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  content: {
    paddingHorizontal: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
    borderColor: '#4C9EFF20',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 17,
    color: '#000000',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'normal',
    fontWeight: '400',
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    marginBottom: 32,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTitle: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  chevron: {
    marginLeft: 8,
  },
});
