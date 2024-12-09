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

  // Determine the card width for small screens
  const cardWidth = screenWidth > 768 ? '15%' : screenWidth > 480 ? '45%' : '45%';
  const cardHeight = screenWidth > 768 ? '15%' : screenWidth > 480 ? '45%' : '45%';
  const iscenter = screenWidth > 768 ? 'flex-start' : screenWidth > 480 ? 'center' : 'center';
  const marginLeft = screenWidth > 768 ? 10 : screenWidth > 480 ? 0 : 0;
  const calculateRatio = () => {
    const screenWidth = Dimensions.get('window').width;
    const cardWidth = screenWidth > 768
      ? screenWidth * 0.15 // 15% of the screen width for large screens
      : screenWidth > 480
        ? screenWidth * 0.45 // 45% for medium screens
        : screenWidth * 0.45; // 45% for smaller screens
    console.log(cardWidth - 30)
    return cardWidth - 30; // Subtract 30 for padding/margin adjustments
  };
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
          marginLeft: marginLeft
          // margin: 10,
        }}
      >
        {canteens &&
          canteens.map((canteen: CanteenProps, index: number) => (
            <TouchableOpacity
              style={{
                ...styles.card,
                width: calculateRatio(),
                height: 210,
                backgroundColor: theme.card.background,
                marginBottom: 10,
              }}
              key={canteen.alias}
              onPress={() => {
                handleSelectCanteen(canteen);
              }}
            >
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={canteen?.image_url}
                  contentFit="cover"
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
