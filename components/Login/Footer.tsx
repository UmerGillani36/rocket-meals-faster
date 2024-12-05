import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { useTheme } from '@/hooks/useTheme';
import { links } from '@/constants/Constants';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <View style={styles.footer}>
      {links.map((link, index) => (
        <React.Fragment key={index}>
          <TouchableOpacity onPress={link.onPress}>
            <Text style={{ ...styles.link, color: theme.screen.text }}>
              {link.title}
            </Text>
          </TouchableOpacity>
          {index < links.length - 1 && (
            <Text style={{ ...styles.divider, color: theme.screen.text }}>
              |
            </Text>
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

export default Footer;
