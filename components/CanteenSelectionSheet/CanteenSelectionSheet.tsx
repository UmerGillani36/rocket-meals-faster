import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import styles from './styles';
import { useTheme } from '@/hooks/useTheme';
import { CanteenProps, CanteenSelectionSheetProps } from './types';
import { isWeb, canteensData } from '@/constants/Constants';
import { useRouter } from 'expo-router';
import { imageAPI } from '@/redux/actions';
import { SET_SELECTED_CANTEEN } from '@/redux/Types/types';
import { AntDesign } from '@expo/vector-icons';
// import { Image } from 'expo-image';
import { excerpt } from '@/constants/HelperFunctions';

const CanteenSelectionSheet: React.FC<CanteenSelectionSheetProps> = ({
  closeSheet,
}) => {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const canteens = useSelector((state: any) => state.canteenReducer.canteens);

  const handleSelectCanteen = (canteen: CanteenProps) => {
    dispatch({ type: SET_SELECTED_CANTEEN, payload: canteen });
    closeSheet();
  };

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
      <Text
        style={{
          ...styles.sheetHeading,
          fontSize: isWeb ? 40 : 32,
          color: theme.sheet.text,
        }}
      >
        Canteens
      </Text>
      <View
        style={{
          ...styles.canteensContainer,
          width: isWeb ? '80%' : '100%',
          gap: isWeb ? 20 : 10,
          marginTop: isWeb ? 40 : 20,
        }}
      >
        {canteens.map((canteen: CanteenProps, index: number) => (
          <TouchableOpacity
            style={{
              ...styles.card,
              width: isWeb ? 250 : '48%',
              height: isWeb ? 200 : 200,
              backgroundColor: theme.card.background,
            }}
            key={canteen.alias}
            onPress={() => {
              handleSelectCanteen(canteen);
            }}
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: canteen?.image_url || canteensData[index].image,
                }}
              // transition={500}
              // contentFit='cover'
              // cachePolicy={'memory-disk'}
              />
            </View>
            <Text style={{ ...styles.canteenName, color: theme.card.text }}>
              {excerpt(String(canteen.alias), 12)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </BottomSheetScrollView>
  );
};

export default CanteenSelectionSheet;
