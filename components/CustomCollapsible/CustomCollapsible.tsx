import { Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import { useTheme } from '@/context/ThemeContext';
import { CustomCollapsibleProps } from './types';

const CustomCollapsible: React.FC<CustomCollapsibleProps> = ({
  headerText,
  children,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const { theme } = useTheme();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => setCollapsed((prev) => !prev)}>
        <View
          style={{
            ...styles.header,
            borderBottomLeftRadius: collapsed ? 12 : 0,
            borderBottomRightRadius: collapsed ? 12 : 0,
          }}
        >
          <Text style={styles.headerText}>{headerText}</Text>
          <MaterialIcons
            name={collapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
            size={22}
            color={'#ffffff'}
          />
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed} align='center'>
        <View
          style={{
            ...styles.content,
            backgroundColor: theme.screen.background,
          }}
        >
          {children}
        </View>
      </Collapsible>
    </View>
  );
};

export default CustomCollapsible;
