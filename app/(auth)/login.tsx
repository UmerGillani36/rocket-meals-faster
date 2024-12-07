import React from 'react';
import { View, Text, Alert, Dimensions } from 'react-native';
import styles from './styles';
import { useTheme } from '@/hooks/useTheme';
import WebSvg from '@/assets/svgs/login_Bg.svg';
import Form from '@/components/Login/Form';
import Header from '@/components/Login/Header';
import Footer from '@/components/Login/Footer';
import ManagementModal from '@/components/Login/ManagementModal';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ManagementSheet from '@/components/Login/ManagementSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { isWeb } from '@/constants/Constants';
import { router } from 'expo-router';
import { ServerAPI } from '@/redux/actions/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { ON_LOGIN, UPDATE_MANAGEMENT } from '@/redux/Types/types';
import AttentionSheet from '@/components/Login/AttentionSheet';
import useToast from '@/hooks/useToast';
import { updateLoginStatus } from '@/constants/HelperFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DirectusUsers } from '@/constants/types';

export default function Login() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%'], []);
  const attentionSheetRef = useRef<BottomSheet>(null);
  const attentionSnapPoints = useMemo(() => ['70%'], []);
  const [isWebVisible, setIsWebVisible] = useState(
    Dimensions.get('window').width > 500
  );

  const toast = useToast();

  const openSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const closeSheet = () => {
    bottomSheetRef?.current?.close();
  };
  const openAttentionSheet = () => {
    attentionSheetRef.current?.expand();
  };

  const closeAttentionSheet = () => {
    attentionSheetRef?.current?.close();
  };

  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const handleAttentionSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const handleUserLogin = async (
    token?: string,
    email?: string,
    password?: string
  ) => {
    try {
      // Authenticate based on token or credentials
      if (token) {
        await ServerAPI.authenticateWithAccessToken(token);
      } else if (email && password) {
        const result = await ServerAPI.authenticateWithEmailAndPassword(
          email,
          password
        );
        if (!result) throw new Error('Invalid credentials');
        dispatch({ type: UPDATE_MANAGEMENT, payload: true });
      }

      // Fetch and process user data
      const user = await ServerAPI.getMe();
      updateLoginStatus(dispatch, user as DirectusUsers);
      router.replace('/(app)');
    } catch (error) {
      console.error('Error during login: ', error);
      if (!token) toast('Invalid credentials', 'error'); // Only show toast for credential-based login
    }
  };

  const handleAnonymousLogin = () => {
    // @ts-ignore
    updateLoginStatus(dispatch, { id: '' });
    router.replace('/(app)');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsWebVisible(Dimensions.get('window').width > 650);
    };

    const subscription = Dimensions.addEventListener('change', handleResize);

    return () => subscription?.remove();
  }, []);

  return (
    <View
      style={{
        ...styles.mainContainer,
        backgroundColor: theme.login.background,
        padding: isWeb ? 40 : 20,
        justifyContent: isWeb ? 'space-between' : 'flex-start',
      }}
    >
      <View
        style={{
          ...styles.loginContainer,
          width: isWeb && isWebVisible ? '50%' : '100%',
        }}
      >
        <Header />
        <Form
          setIsVisible={setIsVisible}
          openSheet={openSheet}
          openAttentionSheet={openAttentionSheet}
          onSuccess={handleUserLogin}
        />
        <Footer />
      </View>
      {isWeb && isWebVisible && (
        <View
          style={{
            ...styles.webContainer,
            backgroundColor: theme.login.webContainerBg,
          }}
        >
          <View style={styles.webTitleContainer}>
            <Text style={{ ...styles.title, color: theme.login.text }}>
              With <Text style={{ color: '#fcde61' }}>Swosy!</Text>
            </Text>
          </View>
          <Text style={{ ...styles.subTitle, color: theme.login.text }}>
            All your campus food choices,
          </Text>
          <Text style={{ ...styles.subTitle, color: theme.login.text }}>
            Right at your fingertips
          </Text>
          <WebSvg />
          <Text style={{ ...styles.webBody, color: theme.login.text }}>
            The Hannover Student Union app makes it easy to explore the canteen
            menu, filter and sort dishes, and share ratings and feedback. With
            NFC campus card integration, it's a seamless way to manage your
            meals and enhance your student life.
          </Text>
        </View>
      )}
      {isWeb ? (
        <ManagementModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          handleLogin={handleUserLogin}
        />
      ) : (
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          handleComponent={null}
          onChange={handleSheetChanges}
          backgroundStyle={{
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          }}
        >
          <ManagementSheet
            closeSheet={closeSheet}
            handleLogin={handleUserLogin}
          />
        </BottomSheet>
      )}
      <BottomSheet
        ref={attentionSheetRef}
        index={-1}
        snapPoints={attentionSnapPoints}
        handleComponent={null}
        onChange={handleAttentionSheetChanges}
        backgroundStyle={{
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}
      >
        <AttentionSheet
          closeSheet={closeAttentionSheet}
          handleLogin={handleAnonymousLogin}
        />
      </BottomSheet>
    </View>
  );
}
