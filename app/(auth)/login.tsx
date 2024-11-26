import { View, Text, Alert } from 'react-native';
import styles from './styles';
import { useTheme } from '@/context/ThemeContext';
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
import { useDispatch } from 'react-redux';
import { ON_LOGIN, UPDATE_MANAGEMENT } from '@/redux/Types/types';
import AttentionSheet from '@/components/Login/AttentionSheet';
import useToast from '@/hooks/useToast';
import { updateLoginStatus } from '@/constants/HelperFunctions';

export default function Login() {
  const dispatch = useDispatch();
  const { theme, setThemeMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%'], []);
  const attentionSheetRef = useRef<BottomSheet>(null);
  const attentionSnapPoints = useMemo(() => ['70%'], []);
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
    console.log('handleSheetChanges', index);
  }, []);

  const handleAttentionSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const onSuccessfulLogin = async (token: string) => {
    console.log('Login Successful with token: ' + token);
    const result = await ServerAPI.authenticate_with_access_token(token);
    dispatch({ type: ON_LOGIN, payload: result });
    const user = ServerAPI.getMe();
    console.log('User: ', user);
    updateLoginStatus(dispatch);
    router.replace('/(app)');
  };

  const handleLoginWithManagementCredentials = (
    email: string,
    password: string
  ) => {
    ServerAPI.authenticate_with_email_and_password(email, password)
      .then((result) => {
        if (result) {
          dispatch({ type: ON_LOGIN, payload: result });
          dispatch({ type: UPDATE_MANAGEMENT, payload: true });
          const user = ServerAPI.getMe();
          console.log('User: ', user);
          updateLoginStatus(dispatch);
          router.replace('/(app)');
        }
      })
      .catch((e) => {
        toast('Invalid credentials', 'error');
      });
  };

  const handleAnonymousLogin = () => {
    console.log('Anonymous Login');
    dispatch({ type: ON_LOGIN, payload: null });
    updateLoginStatus(dispatch);
    router.replace('/(app)');
  };

  useEffect(() => {
    setThemeMode('dark');
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
      {isWeb && (
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
      <View style={{ ...styles.loginContainer, width: isWeb ? '50%' : '100%' }}>
        <Header />
        <Form
          setIsVisible={setIsVisible}
          openSheet={openSheet}
          openAttentionSheet={openAttentionSheet}
          onSuccess={onSuccessfulLogin}
        />
        <Footer />
      </View>
      {isWeb ? (
        <ManagementModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          handleLogin={handleLoginWithManagementCredentials}
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
            handleLogin={handleLoginWithManagementCredentials}
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
        <AttentionSheet closeSheet={closeAttentionSheet} handleLogin={handleAnonymousLogin} />
      </BottomSheet>
    </View>
  );
}
