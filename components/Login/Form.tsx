import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import GoogleIcon from '@/assets/icons/google.svg';
import { useTheme } from '@/hooks/useTheme';
import { UrlHelper } from '@/constants/UrlHelper';
import { styles } from './styles';
import { FormProps } from './types';
import {
  generateCodeChallenge,
  generateCodeVerifier,
} from '@/constants/HelperFunctions';
import usePlatformHelper from '@/helper/platformHelper';
import {
  fetchAuthorizationUrl,
  fetchToken,
} from '@/redux/actions/ApiService/ApiService';
import { handleNativeLogin, handleWebLogin } from '@/helper/authHelper';

const LoginForm: React.FC<FormProps> = ({
  setIsVisible,
  onSuccess,
  openSheet,
  openAttentionSheet,
}) => {
  const [isChecked, setChecked] = useState(false);
  const { theme } = useTheme();
  const { isWeb } = usePlatformHelper();

  const getToken = async (codeVerifier: string, code: string) => {
    try {
      const { directus_refresh_token } = await fetchToken(codeVerifier, code);

      if (directus_refresh_token && onSuccess) {
        onSuccess(directus_refresh_token);
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  const onPressLogin = async (provider: string) => {
    try {
      const desiredRedirectURL = UrlHelper.getURLToLogin();
      const codeVerifier = await generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      const payload = {
        provider,
        redirect_url: desiredRedirectURL,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
      };

      const { urlToProviderLogin } = await fetchAuthorizationUrl(payload);

      if (isWeb()) {
        await handleWebLogin(
          urlToProviderLogin,
          desiredRedirectURL,
          codeVerifier,
          getToken
        );
      } else {
        await handleNativeLogin(
          urlToProviderLogin,
          desiredRedirectURL,
          codeVerifier,
          getToken
        );
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <View
      style={{
        ...styles.loginForm,
        alignItems: isWeb() ? 'flex-start' : 'center',
      }}
    >
      <Text style={{ ...styles.heading, color: theme.login.text }}>
        Sign in
      </Text>
      <Text style={{ ...styles.subHeading, color: theme.login.text }}>
        Sign in with open account
      </Text>
      <View style={{ width: '100%', opacity: isChecked ? 1 : 0.3 }}>
        <View style={styles.firstRow}>
          <TouchableOpacity
            style={{
              ...styles.button,
              ...styles.google,
              borderColor: theme.login.border,
            }}
            disabled={!isChecked}
            onPress={() => onPressLogin('google')}
          >
            <GoogleIcon width={20} height={20} />
            <Text style={{ ...styles.buttonLabel, color: theme.login.text }}>
              Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.button,
              ...styles.apple,
              borderColor: theme.login.border,
            }}
            disabled={!isChecked}
            onPress={() => onPressLogin('apple')}
          >
            <AntDesign name='apple1' size={28} color={theme.login.icon} />
            <Text style={{ ...styles.buttonLabel, color: theme.login.text }}>
              Apple
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            ...styles.button,
            ...styles.incognito,
            borderColor: theme.login.border,
          }}
          disabled={!isChecked}
          onPress={openAttentionSheet}
        >
          <MaterialCommunityIcons
            name='incognito'
            size={28}
            color={theme.login.icon}
          />
          <Text style={{ ...styles.buttonLabel, color: theme.login.text }}>
            Continue without account
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.managementLogin}>
        <Text style={{ ...styles.fromManagement, color: theme.login.text }}>
          From Management?
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (isWeb()) {
              setIsVisible(true);
            } else {
              openSheet();
            }
          }}
        >
          <Text style={{ ...styles.loginText, color: theme.login.linkButton }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#000000' : undefined}
        />
        <Text
          style={{
            ...styles.checkboxLabel,
            color: theme.login.text,
            width: isWeb() ? '100%' : '90%',
          }}
        >
          I agree to the General Terms and Conditions and declare that I have
          taken note of the Privacy Policy.
        </Text>
      </View>
    </View>
  );
};

export default LoginForm;
