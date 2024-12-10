import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { isWeb } from '@/constants/Constants';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { CustomStackHeaderProps } from './types';
import { useRouter } from 'expo-router';

const CustomStackHeader: React.FC<CustomStackHeaderProps> = ({ label }) => {
  const { theme } = useTheme();
  const router = useRouter();

  const handleGoback = () => {
    router.navigate('/(app)/foodoffers');
  };
  return (
    <View
      style={{
        ...styles.header,
        backgroundColor: theme.header.background,
        paddingHorizontal: isWeb ? 20 : 10,
      }}
    >
      <View style={styles.row}>
        <View style={styles.col1}>
          <TouchableOpacity onPress={handleGoback}>
            <Ionicons name='arrow-back' size={24} color={theme.header.text} />
          </TouchableOpacity>
          <Text style={{ ...styles.heading, color: theme.header.text }}>
            {label}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomStackHeader;
