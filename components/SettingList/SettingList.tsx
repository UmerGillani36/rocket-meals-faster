import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styles from './styles';
import { useTheme } from '@/hooks/useTheme';
import { isWeb } from '@/constants/Constants';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { SettingListProps } from './types';

const SettingList: React.FC<SettingListProps> = ({
  leftIcon,
  label,
  rightIcon,
  value,
  handleFunction,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={{
        ...styles.list,
        backgroundColor: theme.screen.iconBg,
        paddingHorizontal: isWeb ? 20 : 10,
      }}
      onPress={handleFunction}
    >
      <View style={{ ...styles.col, gap: isWeb ? 10 : 5 }}>
        {leftIcon}
        <Text
          style={{
            ...styles.label,
            color: theme.screen.text,
            fontSize: isWeb ? 16 : 14,
            marginTop: isWeb ? 0 : 2,
          }}
        >
          {label}
        </Text>
      </View>
      <View style={{ ...styles.col, gap: isWeb ? 10 : 5 }}>
        {value && (
          <Text
            style={{
              ...styles.value,
              color: theme.screen.text,
              fontSize: isWeb ? 16 : 14,
              marginTop: isWeb ? 0 : 2,
            }}
          >
            {value}
          </Text>
        )}
        {rightIcon}
      </View>
    </TouchableOpacity>
  );
};

export default SettingList;
