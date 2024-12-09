import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { useTheme } from '@/hooks/useTheme';
import { CanteenHelper } from '@/redux/actions/Canteens/Canteens';
import { BuildingsHelper } from '@/redux/actions/Buildings/Buildings';
import {
  SET_BUILDINGS,
  SET_BUSINESS_HOURS,
  SET_CANTEENS,
  SET_SELECTED_CANTEEN,
} from '@/redux/Types/types';
import { useRouter } from 'expo-router';
import { CanteenProps } from '@/components/CanteenSelectionSheet/types';
import { isWeb, blurhash } from '@/constants/Constants';
import { excerpt, getImageUrl } from '@/constants/HelperFunctions';
import { Image } from 'expo-image';
import { Buildings, Canteens } from '@/constants/types';
import { BusinessHoursHelper } from '@/redux/actions/BusinessHours/BusinessHours';


const Home = () => {
  const dispatch = useDispatch();
  const businessHoursHelper = new BusinessHoursHelper();
  const canteenHelper = new CanteenHelper();
  const buildingsHelper = new BuildingsHelper();
  const router = useRouter();
  const { theme } = useTheme();
  const { canteens, selectedCanteen } = useSelector((state: any) => state.canteenReducer);

  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  const checkCanteenSelection = () => {
    if (selectedCanteen) {
      router.push('/(app)/foodoffers');
    }
  };

  const handleSelectCanteen = (canteen: CanteenProps) => {
    dispatch({ type: SET_SELECTED_CANTEEN, payload: canteen });
    router.push('/(app)/foodoffers');
  };

  const getCanteensWithBuildings = async () => {
    try {
      const buildingsData = (await buildingsHelper.fetchBuildings({})) as Buildings[];
      const buildings = buildingsData || [];
      const buildingsDict = buildings.reduce(
        (acc: Record<string, any>, building: any) => {
          acc[building.id] = building;
          return acc;
        },
        {}
      );

      dispatch({ type: SET_BUILDINGS, payload: buildings });

      const canteensData = (await canteenHelper.fetchCanteens({})) as Canteens[];
      const canteens = canteensData || [];

      const updatedCanteens = canteens.map((canteen: any) => {
        const building = buildingsDict[canteen?.building as string];
        return {
          ...canteen,
          imageAssetId: building?.image,
          thumbHash: building?.image_thumb_hash,
          image_url: building?.image_remote_url || getImageUrl(building?.image),
        };
      });

      dispatch({ type: SET_CANTEENS, payload: updatedCanteens });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getBusinessHours = async () => {
    try {
      const businessHours = await businessHoursHelper.fetchBusinessHours({});
      dispatch({ type: SET_BUSINESS_HOURS, payload: businessHours });
    } catch (error) {
      console.error('Error fetching business hours:', error);
    }
  };

  useEffect(() => {
    checkCanteenSelection();
    getBusinessHours();
    getCanteensWithBuildings();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    const subscription = Dimensions.addEventListener('change', handleResize);

    return () => subscription?.remove();

  }, []);

  const iscenter =
    screenWidth > 768 ? 'flex-start' : screenWidth > 480 ? 'center' : 'center';

  return (
    <ScrollView
      style={{
        ...styles.mainContainer,
        backgroundColor: theme.screen.background,
      }}
    >
      <View
        style={{
          ...styles.canteensContainer,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: iscenter,
          gap: 10,
          paddingHorizontal: screenWidth > 800 ? 20 : 0,
        }}
      >
        {canteens &&
          canteens.map((canteen: CanteenProps, index: number) => (
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
              >
                <Image
                  style={styles.image}
                  source={canteen?.image_url}
                  contentFit='cover'
                  placeholder={!canteen?.image_url && { blurhash }}
                  cachePolicy={'memory-disk'}
                  transition={500}
                />
              </View>
              <Text style={{ ...styles.canteenName, color: theme.card.text }}>
                {excerpt(String(canteen.alias), 12)}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
};

export default Home;
