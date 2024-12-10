import React, { useEffect, useLayoutEffect } from 'react';
import { Slot } from 'expo-router';
import { RootSiblingParent } from 'react-native-root-siblings';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import { SafeAreaView, View } from 'react-native';
import { ThemeProvider } from '@/context/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore, persistor } from '@/redux/store';
import { Image } from 'expo-image';
import { ServerAPI } from '@/redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@/hooks/useTheme';
import { SET_SERVER_INFO } from '@/redux/Types/types';
import ServerStatusLoader from '@/components/ServerStatusLoader/ServerStatusLoader';

ServerAPI.createAuthentificationStorage(
  async () => {
    const storedData = await AsyncStorage.getItem('auth_data');
    return storedData ? JSON.parse(storedData) : null;
  },
  async (value) => {
    if (value) {
      await AsyncStorage.setItem('auth_data', JSON.stringify(value));
    } else {
      await AsyncStorage.removeItem('auth_data');
    }
  }
);

export default function Layout() {
  const { theme } = useTheme();
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        <Image
          source={require('@/assets/logo/customers/swosy.png')}
          style={{ width: 150, height: 150 }}
          contentFit='cover'
          transition={500}
        />
      </View>
    );
  }

  // useEffect(() => {
  //   const getServerInfo = async () => {
  //     try {
  //       const result = await ServerAPI.downloadServerInfo();
  //       console.log('Server Info:', result);
  //       if (result) {
  //         // configureStore.dispatch({ type: SET_SERVER_INFO, payload: result });
  //       }
  //     } catch (error) {
  //       console.error('Error fetching server info:', error);
  //     }
  //   };

  //   getServerInfo();
  // }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={configureStore}>
        <PersistGate loading={null} persistor={persistor}>
          <RootSiblingParent>
            <ThemeProvider>
              <ServerStatusLoader>
                <SafeAreaView
                  style={{ flex: 1, backgroundColor: theme.screen.iconBg }}
                >
                  <Slot />
                </SafeAreaView>
              </ServerStatusLoader>
            </ThemeProvider>
          </RootSiblingParent>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
