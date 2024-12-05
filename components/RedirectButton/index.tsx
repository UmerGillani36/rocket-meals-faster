import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styles from './styles';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { RedirectButtonProps } from './types';
import { isWeb } from '@/constants/Constants';

const RedirectButton: React.FC<RedirectButtonProps> = ({
  type,
  label,
  backgroundColor,
  color,
  onClick,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        width: isWeb ? 400 : '100%',
        height: isWeb ? 50 : 43,
        backgroundColor: backgroundColor || '#d14610',
      }}
      onPress={onClick}
    >
      {type === 'email' ? (
        <MaterialCommunityIcons
          name='email'
          size={24}
          color={color || '#ffffff'}
        />
      ) : (
        <FontAwesome6
          name='arrow-up-right-from-square'
          size={20}
          color={color || '#ffffff'}
        />
      )}
      <Text style={{ ...styles.label, color: color || '#ffffff' }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default RedirectButton;
