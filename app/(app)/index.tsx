import { InteractionManager, View } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet from '@gorhom/bottom-sheet';
import CanteenSelectionSheet from '@/components/CanteenSelectionSheet/CanteenSelectionSheet';
import styles from './styles';
import { useTheme } from '@/context/ThemeContext';
import { fetchBuildings, fetchCanteens } from '@/redux/actions/Canteen/Canteen';
import { SET_BUILDINGS, SET_CANTEENS, SET_FOOD_OFFERS } from '@/redux/Types/types';
import useAxiosAuthorization from '@/components/useAxios/useAxios';
import { fetchFoodOffers } from '@/redux/actions/FoodOffers/FoodOffers';

const Home = () => {
  const dispatch = useDispatch();
  const { selectedCanteen } = useSelector((state: any) => state.canteenReducer);
  const { theme, setThemeMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['100%'], []);

  const openSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const closeSheet = () => {
    bottomSheetRef?.current?.close();
  };
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (!selectedCanteen) {
        openSheet();
      }
    });
  }, [openSheet]);

  const getFoodOffers = async () => {
    // Fetch food offers
    const foodOffersData = await fetchFoodOffers();
    const foodOffers = foodOffersData?.data || [];
    // dispatch({ type: SET_FOOD_OFFERS, payload: foodOffers });
    console.log('Food offers:', foodOffers);
  }

  const getCanteensWithBuildings = async () => {
    try {
      // Fetch buildings
      const buildingsData = await fetchBuildings();
      const buildings = buildingsData?.data || [];
      const buildingsDict = buildings.reduce(
        (acc: Record<string, any>, building: any) => {
          acc[building.id] = building; // Assuming buildings have a unique 'id'
          return acc;
        },
        {}
      );

      // Dispatch buildings
      dispatch({ type: SET_BUILDINGS, payload: buildings });

      // Fetch canteens
      const canteensData = await fetchCanteens();
      const canteens = canteensData?.data || [];

      // Process canteens with building data
      const updatedCanteens = canteens.map((canteen: any) => {
        const building = buildingsDict[canteen?.building as string]; // Match building by ID
        return {
          ...canteen,
          imageAssetId: building?.image,
          thumbHash: building?.image_thumb_hash,
          image_url: building?.image_remote_url,
        };
      });

      // Dispatch updated canteens
      dispatch({ type: SET_CANTEENS, payload: updatedCanteens });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getCanteensWithBuildings();
    getFoodOffers();
  }, []);

  useAxiosAuthorization();

  return (
    <View
      style={{
        ...styles.mainContainer,
        backgroundColor: theme.screen.background,
      }}
    >
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{
          ...styles.sheetBackground,
          backgroundColor: theme.sheet.sheetBg,
        }}
        handleStyle={{
          ...styles.sheetHandle,
          backgroundColor: theme.sheet.sheetBg,
        }}
        handleIndicatorStyle={{ width: 50, backgroundColor: theme.sheet.text }}
      >
        <CanteenSelectionSheet />
      </BottomSheet>
    </View>
  );
};

export default Home;
