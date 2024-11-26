import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import styles from './styles';
import { useTheme } from '@/context/ThemeContext';
import { CanteenProps, CanteenSelectionSheetProps } from './types';
import { isWeb, canteensData } from '@/constants/Constants';
import { useRouter } from 'expo-router';
import { Canteens } from '@/constants/types';
import { imageAPI } from '@/redux/actions';
import { SET_SELECTED_CANTEEN } from '@/redux/Types/types';

const CanteenSelectionSheet: React.FC<CanteenSelectionSheetProps> = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const canteens = useSelector((state: any) => state.canteenReducer.canteens);

  const getImage = async (imageAssetId: string) => {
    try {
      const data = await imageAPI(imageAssetId);
      console.log("Data: ", data);
      return '';
    } catch (e) {
      console.log("Error: ", e);
      return '';
    }
    // return `https://api.dev.cloud.barista.coffee/assets/${imageAssetId}`;
  };

  const handleSelectCanteen = (canteen: CanteenProps) => {
    dispatch({ type: SET_SELECTED_CANTEEN, payload: canteen });
    router.push('/(app)/foodoffers');
  }

  return (
    <BottomSheetView
      style={{ ...styles.sheetView, backgroundColor: theme.sheet.sheetBg }}
    >
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
              height: isWeb ? 200 : 140,
              backgroundColor: theme.card.background,
            }}
            key={canteen.alias}
            onPress={() => {
              handleSelectCanteen(canteen);
            }}
          >
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: canteensData[index].image }} />
            </View>
            <Text style={{ ...styles.canteenName, color: theme.card.text }}>
              {canteen.alias}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </BottomSheetView>
  );
};

export default CanteenSelectionSheet;
