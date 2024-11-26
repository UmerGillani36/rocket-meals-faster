import React, { useEffect } from 'react';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/components/Drawer/CustomDrawerContent';
import { useTheme } from '@/context/ThemeContext';
import { isWeb } from '@/constants/Constants';

export default function Layout() {
  const { theme, setThemeMode } = useTheme();
  useEffect(() => {
    setThemeMode('dark');
  }, []);
  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: theme.header.background },
        headerTintColor: theme.header.text,
        drawerType: isWeb ? 'permanent' : 'front',
        headerLeft: isWeb ? () => null : undefined,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name='index'
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name='foodoffers'
        options={{
          title: 'Canteens',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name='account-balance/index'
        options={{
          title: 'Account Balance',
        }}
      />
      <Drawer.Screen
        name='campus/index'
        options={{
          title: 'Campus',
        }}
      />
      <Drawer.Screen
        name='housing/index'
        options={{
          title: 'Housing',
        }}
      />
      <Drawer.Screen
        name='news/index'
        options={{
          title: 'News',
        }}
      />
      <Drawer.Screen
        name='course-timetable/index'
        options={{
          title: 'Course Timetable',
        }}
      />
      <Drawer.Screen
        name='settings/index'
        options={{
          title: 'Settings',
        }}
      />
      <Drawer.Screen
        name='faq-food/index'
        options={{
          title: 'FAQ-Food',
        }}
      />
      <Drawer.Screen
        name='faq-living/index'
        options={{
          title: 'FAQ-Living',
        }}
      />
      <Drawer.Screen
        name='privacy-policy/index'
        options={{
          title: 'Privacy Policy',
        }}
      />
      <Drawer.Screen
        name='about-us/index'
        options={{
          title: 'About Us',
        }}
      />
      <Drawer.Screen
        name='accessibility/index'
        options={{
          title: 'Accessibility',
        }}
      />
      <Drawer.Screen
        name='management/index'
        options={{
          title: 'Management',
        }}
      />
      <Drawer.Screen
        name='terms-and-conditions/index'
        options={{
          title: 'Terms And Conditions',
        }}
      />
    </Drawer>
  );
}
