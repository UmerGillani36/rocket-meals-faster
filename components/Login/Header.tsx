import { View } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import Logo from '@/assets/icons/swosy-rect.svg';
import { useTheme } from '@/context/ThemeContext';
import { styles } from './styles';
import { isWeb } from '@/constants/Constants';

const LoginHeader = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { theme } = useTheme();

  return (
    <View style={styles.header}>
      <Logo width={40} height={40} />
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
        style={{
          ...styles.picker,
          height: isWeb ? 41 : 'auto',
          backgroundColor: theme.login.pickerBg,
          color: theme.login.pickerText,
        }}
      >
        <Picker.Item label='English' value='en' />
        <Picker.Item label='Persian (فارسی)' value='fa' />
        <Picker.Item label='Spanish (Español)' value='es' />
        <Picker.Item label='French (Français)' value='fr' />
        <Picker.Item label='German (Deutsch)' value='de' />
        <Picker.Item label='Chinese (中文)' value='zh' />
        <Picker.Item label='Arabic (العربية)' value='ar' />
        <Picker.Item label='Russian (Русский)' value='ru' />
        <Picker.Item label='Hindi (हिन्दी)' value='hi' />
        <Picker.Item label='Japanese (日本語)' value='ja' />
      </Picker>
    </View>
  );
};

export default LoginHeader;
