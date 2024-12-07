import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useTheme } from '@/hooks/useTheme';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ON_LOGOUT } from '@/redux/Types/types';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = ({
  navigation,
  state,
}) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const activeIndex = state.index;
  const { isManagement } = useSelector((state: any) => state.authReducer);

  const isActive = (routeName: string) => {
    const activeRoute = state.routes[activeIndex].name;
    return activeRoute === routeName;
  };

  const getMenuItemStyle = (routeName: string) => ({
    ...styles.menuItem,
    backgroundColor: isActive(routeName)
      ? theme.activeBackground
      : 'transparent',
  });

  const getMenuLabelStyle = (routeName: string) => ({
    ...styles.menuLabel,
    color: isActive(routeName) ? theme.activeText : theme.inactiveText,
  });

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      dispatch({ type: ON_LOGOUT });
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <ScrollView
      style={{ ...styles.container, backgroundColor: theme.drawerBg }}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => navigation.navigate('foodoffers')}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo/customers/swosy.png')}
              style={styles.logo}
              resizeMode='contain'
            />
          </View>
          <Text style={{ ...styles.heading, color: theme.drawerHeading }}>
            SWOSY 2.0
          </Text>
        </TouchableOpacity>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={getMenuItemStyle('foodoffers')}
            onPress={() => navigation.navigate('foodoffers')}
          >
            <Ionicons
              name='restaurant-sharp'
              size={24}
              color={
                isActive('foodoffers') ? theme.activeIcon : theme.inactiveIcon
              }
            />
            <Text style={getMenuLabelStyle('foodoffers')}>Canteens</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getMenuItemStyle('account-balance/index')}
            onPress={() => navigation.navigate('account-balance/index')}
          >
            <Octicons
              name='credit-card'
              size={26}
              color={
                isActive('account-balance/index')
                  ? theme.activeIcon
                  : theme.inactiveIcon
              }
            />
            <Text style={getMenuLabelStyle('account-balance/index')}>
              Account Balance
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getMenuItemStyle('campus')}
            onPress={() => navigation.navigate('campus')}
          >
            <Octicons
              name='mortar-board'
              size={28}
              color={isActive('campus') ? theme.activeIcon : theme.inactiveIcon}
            />
            <Text style={getMenuLabelStyle('campus')}>Campus</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getMenuItemStyle('housing/index')}
            onPress={() => navigation.navigate('housing/index')}
          >
            <Octicons
              name='home'
              size={24}
              color={
                isActive('housing/index')
                  ? theme.activeIcon
                  : theme.inactiveIcon
              }
            />
            <Text style={getMenuLabelStyle('housing/index')}>Housing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getMenuItemStyle('news/index')}
            onPress={() => navigation.navigate('news/index')}
          >
            <FontAwesome6
              name='newspaper'
              size={24}
              color={
                isActive('news/index') ? theme.activeIcon : theme.inactiveIcon
              }
            />
            <Text style={getMenuLabelStyle('news/index')}>News</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getMenuItemStyle('course-timetable/index')}
            onPress={() => navigation.navigate('course-timetable/index')}
          >
            <MaterialCommunityIcons
              name='calendar-clock-outline'
              size={28}
              color={
                isActive('course-timetable/index')
                  ? theme.activeIcon
                  : theme.inactiveIcon
              }
            />
            <Text style={getMenuLabelStyle('course-timetable/index')}>
              Course Timetable
            </Text>
          </TouchableOpacity>
          {isManagement && (
            <TouchableOpacity
              style={getMenuItemStyle('management/index')}
              onPress={() => navigation.navigate('management/index')}
            >
              <Ionicons
                name='bag'
                size={28}
                color={
                  isActive('management/index')
                    ? theme.activeIcon
                    : theme.inactiveIcon
                }
              />
              <Text style={getMenuLabelStyle('management/index')}>
                Management
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.divider} />
          <TouchableOpacity
            style={getMenuItemStyle('settings')}
            onPress={() => navigation.navigate('settings')}
          >
            <Ionicons
              name='settings-outline'
              size={28}
              color={
                isActive('settings') ? theme.activeIcon : theme.inactiveIcon
              }
            />
            <Text style={getMenuLabelStyle('settings')}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getMenuItemStyle('faq-food/index')}
            // onPress={() => navigation.navigate('faq-food/index')}
          >
            <Ionicons
              name='fast-food-outline'
              size={28}
              color={
                isActive('faq-food/index')
                  ? theme.activeIcon
                  : theme.inactiveIcon
              }
            />
            <Text style={getMenuLabelStyle('faq-food/index')}>Food - Faq</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getMenuItemStyle('faq-living/index')}
            // onPress={() => navigation.navigate('faq-living/index')}
          >
            <MaterialCommunityIcons
              name='sofa-single-outline'
              size={28}
              color={
                isActive('faq-living/index')
                  ? theme.activeIcon
                  : theme.inactiveIcon
              }
            />
            <Text style={getMenuLabelStyle('faq-living/index')}>
              Living - Faq
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getMenuItemStyle('faq-living/index')}
            onPress={() => {
              handleLogout();
            }}
          >
            <MaterialCommunityIcons
              name='logout'
              size={28}
              color={theme.inactiveIcon}
            />
            <Text style={getMenuLabelStyle('faq-living/index')}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('about-us/index')}>
          <Text style={{ ...styles.link, color: theme.drawer.link }}>
            About Us
          </Text>
        </TouchableOpacity>
        <Text style={styles.bar}>|</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('accessibility/index')}
        >
          <Text style={{ ...styles.link, color: theme.drawer.link }}>
            Accessibility
          </Text>
        </TouchableOpacity>
        <Text style={styles.bar}>|</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('privacy-policy/index')}
        >
          <Text style={{ ...styles.link, color: theme.drawer.link }}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
        <Text style={styles.bar}>|</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('terms-and-conditions/index')}
        >
          <Text style={{ ...styles.link, color: theme.drawer.link }}>
            General Terms and Conditions
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CustomDrawerContent;
