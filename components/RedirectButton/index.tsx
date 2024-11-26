import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styles from './styles';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { RedirectButtonProps } from './types';
import { isWeb } from '@/constants/Constants';

const RedirectButton: React.FC<RedirectButtonProps> = ({ type, label }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        width: isWeb ? 400 : '100%',
        height: isWeb ? 50 : 43,
      }}
    >
      {type === 'email' ? (
        <MaterialCommunityIcons name='email' size={24} color={'#ffffff'} />
      ) : (
        <FontAwesome6
          name='arrow-up-right-from-square'
          size={20}
          color={'#ffffff'}
        />
      )}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default RedirectButton;
