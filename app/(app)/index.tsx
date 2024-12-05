import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
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
      // Fetch buildings
      const buildingsData = (await buildingsHelper.fetchBuildings({})) as Buildings[];
      const buildings = buildingsData || [];
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
      const canteensData = (await canteenHelper.fetchCanteens({})) as Canteens[];
      const canteens = canteensData || [];

      // Process canteens with building data
      const updatedCanteens = canteens.map((canteen: any) => {
        const building = buildingsDict[canteen?.building as string]; // Match building by ID
        return {
          ...canteen,
          imageAssetId: building?.image,
          thumbHash: building?.image_thumb_hash,
          image_url: building?.image_remote_url || getImageUrl(building?.image),
        };
      });

      // Dispatch updated canteens
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
  }

  useEffect(() => {
    checkCanteenSelection();
    getBusinessHours();
    getCanteensWithBuildings();
  }, []);

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
          gap: isWeb ? 20 : 10,
          marginLeft: isWeb ? 20 : 0,
          padding: isWeb ? 20 : 10,
          paddingBottom: 0,
          marginBottom: 10,
        }}
      >
        {canteens &&
          canteens?.map((canteen: CanteenProps, index: number) => (
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
