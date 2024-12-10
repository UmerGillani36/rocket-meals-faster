import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
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
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width
  );

  const handleSelectCanteen = (canteen: CanteenProps) => {
    dispatch({ type: SET_SELECTED_CANTEEN, payload: canteen });
    closeSheet();
  };
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    const subscription = Dimensions.addEventListener('change', handleResize);

    return () => subscription?.remove();
  }, []);

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
          width: isWeb ? '100%' : '100%',
          gap: isWeb ? screenWidth < 500 ? 10 : 20 : 10,
          marginTop: isWeb ? 40 : 20,
        }}
      >
        {canteens.map((canteen: CanteenProps, index: number) => (
          <TouchableOpacity
            style={{
              ...styles.card,
              width: screenWidth > 800 ? 210 : 170,
              height: screenWidth > 800 ? 250 : 210,
              backgroundColor: theme.card.background,
              marginBottom: 10,
            }}
            key={canteen.alias}
            onPress={() => {
              handleSelectCanteen(canteen);
            }}
          >
            <View
              style={{
                ...styles.imageContainer,
                height: screenWidth > 800 ? 210 : 170,
              }}
            >              <Image
                style={styles.image}
                source={{
                  uri: canteen?.image_url || canteensData[index].image,
                }}

              />
            </View>
            <Text
              style={{ ...styles.foodName, color: theme.card.text }}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {excerpt(String(canteen.alias), 32)}

            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </BottomSheetScrollView>
  );
};

export default CanteenSelectionSheet;
