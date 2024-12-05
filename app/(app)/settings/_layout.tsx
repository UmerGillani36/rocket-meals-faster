import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Stack } from 'expo-router';
import CustomStackHeader from '@/components/CustomStackHeader/CustomStackHeader';
import CustomMenuHeader from '@/components/CustomMenuHeader/CustomMenuHeader';

export default function SettingsLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.header.background },
        headerTintColor: theme.header.text,
      }}
      initialRouteName='index'
    >
      <Stack.Screen
        name='index'
        options={{
          header: () => <CustomMenuHeader label='Settings' />,
        }}
      />
      <Stack.Screen
        name='eating-habits/index'
        options={{
          header: () => <CustomStackHeader label='Eating Habits' />,
        }}
      />
      <Stack.Screen
        name='price-group/index'
        options={{
          header: () => <CustomStackHeader label='Price Group' />,
        }}
      />
    </Stack>
  );
}
