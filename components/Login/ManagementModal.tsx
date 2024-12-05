import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { styles } from "./styles";
import { useTheme } from "@/context/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import { ManagementModalProps } from "./types";

const ManagementModal: React.FC<ManagementModalProps> = ({
  isVisible,
  setIsVisible,
  handleLogin,
}) => {
  const { theme } = useTheme();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    isEmailValid: false,
    isPasswordValid: false,
  });

  const handleEmailChange = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setFormState((prev) => ({
      ...prev,
      email: text,
      isEmailValid: emailRegex.test(text),
    }));
  };

  const handlePasswordChange = (text: string) => {
    setFormState((prev) => ({
      ...prev,
      password: text,
      isPasswordValid: text.length >= 6, // Ensures password is at least 8 characters
    }));
  };

  const isFormValid = formState.isEmailValid && formState.isPasswordValid;

  return (
    <Modal isVisible={isVisible} style={styles.modalContainer}>
      <View
        style={{ ...styles.modalView, backgroundColor: theme.modal.modalBg }}
      >
        <View style={styles.modalHeader}>
          <TouchableOpacity
            style={{
              ...styles.closeButton,
              backgroundColor: theme.modal.closeBg,
            }}
            onPress={() => setIsVisible(false)}
          >
            <AntDesign name="close" size={28} color={theme.modal.closeIcon} />
          </TouchableOpacity>
        </View>
        <Text style={{ ...styles.modalHeading, color: theme.modal.text }}>
          Management Login
        </Text>
        <Text style={{ ...styles.modalSubHeading, color: theme.modal.text }}>
          Sign in with open account
        </Text>
        <TextInput
          style={{
            ...styles.input,
            color: theme.modal.text,
            backgroundColor: theme.modal.inputBg,
            borderColor: formState.isEmailValid
              ? theme.modal.inputBorderValid
              : theme.modal.inputBorderInvalid,
            borderWidth: 1,
          }}
          cursorColor={theme.modal.text}
          placeholderTextColor={theme.modal.placeholder}
          onChangeText={handleEmailChange}
          value={formState.email}
          placeholder="You@swosy.com"
        />
        <TextInput
          style={{
            ...styles.input,
            color: theme.modal.text,
            backgroundColor: theme.modal.inputBg,
            borderColor: formState.isPasswordValid
              ? theme.modal.inputBorderValid
              : theme.modal.inputBorderInvalid,
            borderWidth: 1,
          }}
          onChangeText={handlePasswordChange}
          cursorColor={theme.modal.text}
          placeholderTextColor={theme.modal.placeholder}
          value={formState.password}
          secureTextEntry
          placeholder="Password"
        />
        <TouchableOpacity
          style={{
            ...styles.loginButton,
            backgroundColor: isFormValid
              ? theme.primary
              : theme.modal.buttonDisabled,
          }}
          disabled={!isFormValid}
          onPress={() => handleLogin(undefined, formState.email, formState.password)}
        >
          <Text style={{ ...styles.loginLabel }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ManagementModal;
