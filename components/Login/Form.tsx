import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Server from '@/constants/ServerUrl';
import Checkbox from 'expo-checkbox';
import GoogleIcon from '@/assets/icons/google.svg';
import { useTheme } from '@/context/ThemeContext';
import { UrlHelper } from '@/constants/UrlHelper';
import { styles } from './styles';
import { FormProps } from './types';
import { generateCodeChallenge, generateCodeVerifier } from '@/constants/HelperFunctions';
import { isWeb } from '@/constants/Constants';

const LoginForm: React.FC<FormProps> = ({
  setIsVisible,
  onSuccess,
  openSheet,
  openAttentionSheet,
}) => {
  const [isChecked, setChecked] = useState(false);
  const { theme } = useTheme();

  const getToken = async (codeVerifier: String, code: String) => {
    console.log('Login');
    try {
      // Fetching refresh token explicitly if not set by session cookie
      const token_url = Server.ServerUrl + '/proof-key-code-exchange/token';

      const requestBody = {
        code_verifier: codeVerifier,
        code: code,
      };

      const response = await fetch(token_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      //console.log(response);
      const json = await response.json();
      // const directus_session_token = json.directus_session_token; // not send anymore
      const directus_refresh_token = json?.directus_refresh_token || null;
      console.log(
        'Login SuccessFull directus_refresh_token: ' + directus_refresh_token
      );
      if (directus_refresh_token) {
        if (onSuccess) {
          onSuccess(directus_refresh_token);
        }
      }
    } catch (err: any) {
      console.log('error: ');
      console.log(err);
      console.log(err.toString());
    }
  };

  const onPressLogin = async (provider: String) => {
    const authorizeUrl =
      Server.ServerUrl + '/proof-key-code-exchange/authorize';
    const desiredRedirectURL = UrlHelper.getURLToLogin();
    const code_challenge_method = 'S256';
    const code_verifier = await generateCodeVerifier();
    const code_challenge = await generateCodeChallenge(code_verifier);

    const requestBody = {
      provider: provider,
      redirect_url: desiredRedirectURL,
      code_challenge_method: code_challenge_method,
      code_challenge: code_challenge,
    };

    try {
      const response = await fetch(authorizeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const json = await response.json();

      const urlToProviderLogin = json.urlToProviderLogin;

      if (Platform.OS === 'web') {
        const WEB_CHECK_INTERVAL = 25; // ms , set to 25ms to get a fast response

        // Web-specific logic
        const authWindow = window.open(
          urlToProviderLogin,
          '_blank',
          'width=500,height=600'
        );
        const authCheckInterval = setInterval(() => {
          if (!!authWindow) {
            try {
              if (authWindow.closed) {
                clearInterval(authCheckInterval);
              } else {
                const currentLocationNewWindow = new URL(
                  authWindow.location.href
                );
                //console.log("check current location: "+currentLocationNewWindow);

                if (
                  (currentLocationNewWindow + '').startsWith(
                    desiredRedirectURL + ''
                  )
                ) {
                  //console.log("yes, arrived at the desired redirect url")
                  authWindow.close();
                  const code_splits = (currentLocationNewWindow + '').split(
                    'code='
                  );
                  const code = code_splits[1];

                  clearInterval(authCheckInterval);
                  getToken(code_verifier, code);
                }
              }
            } catch (err) {
              console.log(err);
            }
          }
        }, WEB_CHECK_INTERVAL);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <View
      style={{
        ...styles.loginForm,
        alignItems: isWeb ? 'flex-start' : 'center',
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
            if (isWeb) {
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
            width: isWeb ? '100%' : '90%',
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
