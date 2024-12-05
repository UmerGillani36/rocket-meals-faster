import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { MenuSheetProps } from './types';
import { isWeb } from '@/constants/Constants';
import { useTheme } from '@/hooks/useTheme';
// import { Image } from 'expo-image';

const MenuSheet: React.FC<MenuSheetProps> = ({ closeSheet }) => {
  const { theme } = useTheme();
  const body = [
    { id: 1, label: 'MENSA CLASSIC HEARTY AND SAVORY' },
    {
      id: 2,
      label:
        'MENSA CLASSIC is characterized by regional specialities and traditional German and European cuisine. Mainly seasonal ingredients are used.',
    },
    {
      id: 3,
      label:
        'MENSA CLASSIC also stands for varied desserts ranging from fruity to creamy-sweet.',
    },
    {
      id: 4,
      label:
        'Examples from the MENSA CLASSIC menu line include burgers, schnitzel, stews and pasta dishes.',
    },
  ];
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
          {'Classic menu line (menu_line_c)'}
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
              uri: 'https://www.studentenwerk-osnabrueck.de/fileadmin/_processed_/5/8/csm_Mensa_Classic_rund_weiss_05f8706461.png',
            }}
            style={styles.image}
          />
        </View>
        {body.map((value) => (
          <Text
            style={{
              ...styles.body,
              color: theme.sheet.text,
            }}
            key={value.id}
          >
            {value.label}
          </Text>
        ))}
      </View>
    </BottomSheetScrollView>
  );
};

export default MenuSheet;
