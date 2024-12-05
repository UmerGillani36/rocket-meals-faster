import React, { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { PermissionModalProps } from './types';
import { useTheme } from '@/hooks/useTheme';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { isWeb } from '@/constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ON_LOGOUT } from '@/redux/Types/types';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';

const PermissionModal: React.FC<PermissionModalProps> = ({
  isVisible,
  setIsVisible,
}) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await AsyncStorage.clear();
      dispatch({ type: ON_LOGOUT });
      setLoading(false);
      router.replace('/(auth)/login');
    } catch (error) {
      setLoading(false);
      console.error('Error during logout:', error);
    }
  };

  return (
    <Modal isVisible={isVisible} style={styles.modalContainer}>
      <View
        style={{
          ...styles.modalView,
          width: isWeb ? 550 : '100%',
          backgroundColor: theme.modal.modalBg,
        }}
      >
        <View style={styles.modalHeader}>
          <TouchableOpacity
            style={{
              ...styles.closeButton,
              backgroundColor: theme.modal.closeBg,
            }}
            onPress={() => setIsVisible(false)}
          >
            <AntDesign name='close' size={28} color={theme.modal.closeIcon} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            ...styles.modalHeading,
            fontSize: isWeb ? 36 : 26,
            color: theme.modal.text,
          }}
        >
          Access Limited
        </Text>
        <Text
          style={{
            ...styles.modalSubHeading,
            width: isWeb ? '90%' : '100%',
            color: theme.modal.text,
            fontSize: isWeb ? 16 : 14,
          }}
        >
          To enjoy a personalized experience, please log in or create an
          account. Alternatively, you can continue as a guest with limited
          features.
        </Text>

        <TouchableOpacity
          style={{
            ...styles.loginButton,
            backgroundColor: theme.primary,
          }}
          onPress={handleLogout}
        >
          {loading ? <ActivityIndicator size={22} color={theme.background} /> : <Text style={{ ...styles.loginLabel }}>Sign In / Create Account</Text>}
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PermissionModal;
