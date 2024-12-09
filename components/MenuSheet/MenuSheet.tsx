import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { MenuSheetProps } from './types';
import { isWeb } from '@/constants/Constants';
import { useTheme } from '@/hooks/useTheme';
import { useSelector } from 'react-redux';
import { getImageUrl } from '@/constants/HelperFunctions';
import { getDescriptionFromTranslation, getTextFromTranslation } from '@/helper/resourceHelper';
// import { Image } from 'expo-image';

const MenuSheet: React.FC<MenuSheetProps> = ({ closeSheet }) => {
  const { theme } = useTheme();
  const { markingDetails } = useSelector((state: any) => state.food);

  return (
    <BottomSheetScrollView
      style={{ ...styles.sheetView, backgroundColor: theme.sheet.sheetBg }}
      contentContainerStyle={styles.contentContainer}
    >
      <View
        style={{
          ...styles.sheetHeader,
          paddingRight: isWeb ? 10 : 0,
          paddingTop: isWeb ? 10 : 0,
        }}
      >
        <View />
        <Text
          style={{
            ...styles.sheetHeading,
            color: theme.sheet.text,
          }}
        >
          {getTextFromTranslation(markingDetails?.translations)}
          {` (${markingDetails?.external_identifier})`}
        </Text>
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
      <View style={{ ...styles.menuContainer, width: isWeb ? '90%' : '100%' }}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                markingDetails?.image_remote_url || getImageUrl(markingDetails?.image) || '',
            }}
            style={styles.image}
          />
        </View>
        <Text
          style={{
            ...styles.body,
            color: theme.sheet.text,
          }}
        >{getDescriptionFromTranslation(markingDetails?.translations)}</Text>
      </View>
    </BottomSheetScrollView>
  );
};

export default MenuSheet;
