import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './styles';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity>
        <Text style={styles.link}>About Us</Text>
      </TouchableOpacity>
      <Text style={styles.divider}>|</Text>
      <TouchableOpacity>
        <Text style={styles.link}>Accessibility</Text>
      </TouchableOpacity>
      <Text style={styles.divider}>|</Text>
      <TouchableOpacity>
        <Text style={styles.link}>Privacy Policy</Text>
      </TouchableOpacity>
      <Text style={styles.divider}>|</Text>
      <TouchableOpacity>
        <Text style={styles.link}>General Terms and Conditions</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Footer
