import React from "react";
import { View, ScrollView, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import styles from './styles';
import {
  Entypo,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons';
import { isWeb } from '@/constants/Constants';
import SettingList from '@/components/SettingList/SettingList';

const Settings = () => {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        ...styles.contentContainer,
        backgroundColor: theme.screen.background,
      }}
    >
      <View
        style={{ ...styles.settingContainer, width: isWeb ? '80%' : '100%' }}
      >
        {/* Account */}
        <View
          style={{
            ...styles.list,
            backgroundColor: theme.screen.iconBg,
            paddingHorizontal: isWeb ? 20 : 10,
          }}
        >
          <View style={styles.col}>
            <MaterialCommunityIcons
              name='clipboard-account'
              size={24}
              color={theme.screen.icon}
            />
            <Text style={{ ...styles.label, color: theme.screen.text }}>
              Account
            </Text>
          </View>
          <View style={styles.col}>
            <Text
              style={{
                ...styles.value,
                color: theme.screen.text,
                fontSize: isWeb ? 16 : 14,
              }}
            >
              Without Account
            </Text>
          </View>
        </View>
        {/* NickName */}
        <SettingList
          leftIcon={
            <MaterialCommunityIcons
              name='account'
              size={24}
              color={theme.screen.icon}
            />
          }
          label='Nickname'
          rightIcon={
            <MaterialCommunityIcons
              name='pencil'
              size={24}
              color={theme.screen.icon}
            />
          }
          handleFunction={() => {}}
        />
        {/* Language */}

        <SettingList
          leftIcon={
            <Ionicons name='language' size={24} color={theme.screen.icon} />
          }
          label='Language'
          value='English'
          rightIcon={
            <MaterialCommunityIcons
              name='pencil'
              size={20}
              color={theme.screen.icon}
            />
          }
          handleFunction={() => {}}
        />
        {/* Canteen */}
        <SettingList
          leftIcon={
            <MaterialIcons
              name='restaurant-menu'
              size={24}
              color={theme.screen.icon}
            />
          }
          label='Canteen'
          value='Bistro Caprivi'
          rightIcon={
            <MaterialCommunityIcons
              name='pencil'
              size={20}
              color={theme.screen.icon}
            />
          }
          handleFunction={() => {}}
        />
        <SettingList
          leftIcon={
            <Ionicons
              name='bag-add-sharp'
              size={24}
              color={theme.screen.icon}
            />
          }
          label='Eating Habits'
          rightIcon={
            <Octicons
              name='chevron-right'
              size={24}
              color={theme.screen.icon}
            />
          }
          handleFunction={() => {}}
        />
        <SettingList
          leftIcon={
            <MaterialIcons name='euro' size={24} color={theme.screen.icon} />
          }
          label='Price Group'
          value='Students'
          rightIcon={
            <Octicons
              name='chevron-right'
              size={24}
              color={theme.screen.icon}
            />
          }
          handleFunction={() => {}}
        />
        <SettingList
          leftIcon={
            <Ionicons name='card' size={24} color={theme.screen.icon} />
          }
          label='Account Balance'
          value='€'
          rightIcon={
            <Octicons
              name='chevron-right'
              size={24}
              color={theme.screen.icon}
            />
          }
          handleFunction={() => {}}
        />
        <SettingList
          leftIcon={
            <Ionicons
              name='notifications'
              size={24}
              color={theme.screen.icon}
            />
          }
          label='Notification'
          rightIcon={
            <Octicons
              name='chevron-right'
              size={24}
              color={theme.screen.icon}
            />
          }
          handleFunction={() => {}}
        />
        <SettingList
          leftIcon={
            <MaterialCommunityIcons
              name='theme-light-dark'
              size={24}
              color={theme.screen.icon}
            />
          }
          label='Color Scheme'
          value='System'
          rightIcon={
            <Octicons
              name='chevron-right'
              size={24}
              color={theme.screen.icon}
            />
          }
          handleFunction={() => {}}
        />
        <SettingList
          leftIcon={<Entypo name='menu' size={24} color={theme.screen.icon} />}
          label='Drawer Position'
          value='System'
          rightIcon={
            <Octicons
              name='chevron-right'
              size={24}
              color={theme.screen.icon}
            />
          }
          handleFunction={() => {}}
        />
        <SettingList
          leftIcon={
            <FontAwesome5 name='columns' size={24} color={theme.screen.icon} />
          }
          label='Amount Columns for Cards'
          value='System'
          rightIcon={
            <Octicons
              name='chevron-right'
              size={24}
              color={theme.screen.icon}
            />
          }
          handleFunction={() => {}}
        />
        <SettingList
          leftIcon={
            <Feather name='calendar' size={24} color={theme.screen.icon} />
          }
          label='First Day of Week'
          value='System'
          rightIcon={
            <Octicons
              name='chevron-right'
              size={24}
              color={theme.screen.icon}
            />
          }
          handleFunction={() => {}}
        />
        <SettingList
          leftIcon={<Entypo name='login' size={24} color={theme.screen.icon} />}
          label='Sign In'
          rightIcon={
            <Entypo name='login' size={24} color={theme.screen.icon} />
          }
          handleFunction={() => {}}
        />
        <SettingList
          leftIcon={
            <MaterialCommunityIcons
              name='database-eye'
              size={24}
              color={theme.screen.icon}
            />
          }
          label='Data Access'
          rightIcon={
            <Octicons
              name='chevron-right'
              size={24}
              color={theme.screen.icon}
            />
          }
          handleFunction={() => {}}
        />
        <SettingList
          leftIcon={
            <MaterialIcons
              name='support-agent'
              size={24}
              color={theme.screen.icon}
            />
          }
          label='Support & FAQ'
          rightIcon={
            <Octicons
              name='chevron-right'
              size={24}
              color={theme.screen.icon}
            />
          }
          handleFunction={() => {}}
        />
        <SettingList
          leftIcon={
            <MaterialCommunityIcons
              name='license'
              size={24}
              color={theme.screen.icon}
            />
          }
          label='License Information'
          rightIcon={
            <Octicons
              name='chevron-right'
              size={24}
              color={theme.screen.icon}
            />
          }
          handleFunction={() => {}}
        />
        {/* Terms & Conditions */}
        <View
          style={{
            ...styles.termList,
            backgroundColor: theme.screen.iconBg,
            paddingHorizontal: isWeb ? 20 : 10,
          }}
        >
          <View style={styles.termRow}>
            <MaterialCommunityIcons
              name='clipboard-account'
              size={24}
              color={theme.screen.icon}
            />
            <Text
              style={{
                ...styles.label,
                color: theme.screen.text,
                fontSize: isWeb ? 16 : 14,
              }}
            >
              Terms and Conditions accepted and Privacy Policy read at date
            </Text>
          </View>
          <View style={styles.termRow2}>
            <Text
              style={{
                ...styles.value,
                color: theme.screen.text,
                fontSize: isWeb ? 16 : 14,
              }}
            >
              03.12.2024 13:12:16
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Settings;
