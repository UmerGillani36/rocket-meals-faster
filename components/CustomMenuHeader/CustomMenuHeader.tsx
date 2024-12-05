import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { isWeb } from '@/constants/Constants';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation, useRouter } from 'expo-router';
import { CustomMenuHeaderProps, DrawerParamList } from './types';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const CustomMenuHeader: React.FC<CustomMenuHeaderProps> = ({ label }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
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
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Ionicons name='menu' size={24} color={theme.header.text} />
          </TouchableOpacity>
          <Text style={{ ...styles.heading, color: theme.header.text }}>
            {label}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomMenuHeader;
