import { Ionicons } from '@expo/vector-icons';

export type IconName = keyof typeof Ionicons.glyphMap;

export interface ProfileItem {
  icon: IconName;
  label: string;
  value?: string;
  action?: boolean;
}

export interface ProfileSection {
  title: string;
  items: ProfileItem[];
}

export interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  [key: string]: any;
} 