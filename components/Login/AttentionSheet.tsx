import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from '@/context/ThemeContext';
import { AttentionSheetProps } from './types';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
import { isWeb } from '@/constants/Constants';

const AttentionSheet: React.FC<AttentionSheetProps> = ({ closeSheet, handleLogin }) => {
  const { theme } = useTheme();
  return (
    <BottomSheetView
      style={{ ...styles.sheetView, backgroundColor: theme.sheet.sheetBg }}
    >
      <View style={styles.attentionSheetHeader}>
        <View />

        <TouchableOpacity
          style={{
            ...styles.sheetcloseButton,
            backgroundColor: theme.sheet.closeBg,
          }}
          onPress={closeSheet}
        >
          <AntDesign name='close' size={24} color={theme.sheet.closeIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.gifContainer}>
        <Image
          source={require('@/assets/gifs/attention.gif')}
          style={styles.gif}
        />
      </View>
      <Text
        style={{ ...styles.attentionSheetHeading, color: theme.sheet.text }}
      >
        Attention!
      </Text>
      <View
        style={{ ...styles.attentionContent, width: isWeb ? '60%' : '100%' }}
      >
        <Text style={{ ...styles.attentionBody, color: theme.sheet.text }}>
          We respect your privacy and offer you the option to use the app as
          anonymously as possible. However, some features such as push
          notifications, synchronization, and other functions are not available
          because an account is required for these.
        </Text>
        <View
          style={{ ...styles.attentionActions, width: isWeb ? '40%' : '100%' }}
        >
          <TouchableOpacity style={styles.confirmButton} onPress={() => { handleLogin(); }}>
            <Text style={styles.confirmLabel}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancleButton} onPress={closeSheet}>
            <Text style={styles.confirmLabel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetView>
  );
};

export default AttentionSheet;
