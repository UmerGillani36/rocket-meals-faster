import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { styles } from './styles';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { SheetProps } from './types';

const ManagementSheet: React.FC<SheetProps> = ({ closeSheet, handleLogin }) => {
  const { theme } = useTheme();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    isEmailValid: false,
    isPasswordValid: false,
  });


  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setFormState((prevState) => ({
      ...prevState,
      email,
      isEmailValid: emailRegex.test(email),
    }));
  };

  const validatePassword = (password: string) => {
    setFormState((prevState) => ({
      ...prevState,
      password,
      isPasswordValid: password.length >= 6,
    }));
  };

  const isFormValid = formState.isEmailValid && formState.isPasswordValid;

  return (
    <BottomSheetView
      style={{ ...styles.sheetView, backgroundColor: theme.sheet.sheetBg }}
    >
      <View style={styles.sheetHeader}>
        <TouchableOpacity
          style={{
            ...styles.sheetcloseButton,
            backgroundColor: theme.sheet.closeBg,
          }}
          onPress={closeSheet}
        >
          <AntDesign name="close" size={24} color={theme.sheet.closeIcon} />
        </TouchableOpacity>
      </View>
      <Text style={{ ...styles.sheetHeading, color: theme.sheet.text }}>
        Management Login
      </Text>
      <Text style={{ ...styles.sheetSubHeading, color: theme.sheet.text }}>
        Sign in with open account
      </Text>
      <TextInput
        style={{
          ...styles.sheetInput,
          color: theme.sheet.text,
          backgroundColor: theme.sheet.inputBg,
          borderColor: formState.isEmailValid
            ? theme.sheet.inputBorderValid
            : theme.sheet.inputBorderInvalid,
        }}
        placeholderTextColor={theme.sheet.placeholder}
        cursorColor={theme.sheet.text}
        selectionColor={theme.primary}
        onChangeText={validateEmail}
        value={formState.email}
        placeholder="You@swosy.com"
      />
      <TextInput
        style={{
          ...styles.sheetInput,
          color: theme.sheet.text,
          backgroundColor: theme.sheet.inputBg,
          borderColor: formState.isPasswordValid
            ? theme.sheet.inputBorderValid
            : theme.sheet.inputBorderInvalid,
        }}
        onChangeText={validatePassword}
        placeholderTextColor={theme.sheet.placeholder}
        cursorColor={theme.sheet.text}
        selectionColor={theme.primary}
        value={formState.password}
        secureTextEntry
        placeholder="Password"
      />
      <TouchableOpacity
        style={{
          ...styles.sheetLoginButton,
          backgroundColor: isFormValid
            ? theme.primary
            : theme.sheet.buttonDisabled,
        }}
        disabled={!isFormValid}
        onPress={() => handleLogin(undefined, formState.email, formState.password)}
      >
        <Text style={{ ...styles.sheetLoginLabel }}>Sign In</Text>
      </TouchableOpacity>
    </BottomSheetView>
  );
};

export default ManagementSheet;
