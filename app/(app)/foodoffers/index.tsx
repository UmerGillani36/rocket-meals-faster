import { ScrollView, View } from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react';
import styles from './styles';
import { useTheme } from '@/context/ThemeContext';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { FOOD_DATA, isWeb } from '@/constants/Constants';
import FoodItem from '@/components/FoodItem/FoodItem';
import { useNavigation, useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { fetchFoodOffersByCanteen } from '@/redux/actions/FoodOffers/FoodOffers';

const index: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const { selectedCanteen } = useSelector((state: any) => state.canteenReducer);
  const { theme, setThemeMode } = useTheme();
  const stackNavigation = useNavigation();
  const router = useRouter();
  const handleNavigation = () => {
    router.push({
      pathname: '/(app)/foodoffers/details/[id]',
      params: { id: '123' },
    });
  };

  useLayoutEffect(() => {
    stackNavigation.setOptions({
      headerTitle: selectedCanteen?.alias || 'Food Offers',
    });
  }, [selectedCanteen]);

  const fetchFoods = async () => {
    // Fetch food offers
    const foodData = await fetchFoodOffersByCanteen(selectedCanteen?.id);
    console.log('Food data:', foodData);
    // const foodOffersData = await fetchFoodOffers();
    // const foodOffers = foodOffersData?.data || [];
    // dispatch({ type: SET_FOOD_OFFERS, payload: foodOffers });
    // console.log('Food offers:', foodOffers);
  };

  useEffect(() => {
    fetchFoods();
    // setThemeMode('dark');
  }, [selectedCanteen]);

  useEffect(() => {
    setThemeMode('dark');
  }, []);
  return (
    <ScrollView
      style={{ ...styles.container, backgroundColor: theme.screen.background }}
      contentContainerStyle={{
        ...styles.contentContainer,
        paddingHorizontal: isWeb ? 30 : 0,
      }}
    >
      <View
        style={{
          ...styles.foodContainer,
          gap: isWeb ? 20 : 10,
        }}
      >
        {FOOD_DATA &&
          FOOD_DATA.map((item) => (
            <FoodItem
              item={item}
              key={item.id}
              handleNavigation={handleNavigation}
            />
          ))}
      </View>
    </ScrollView>
  );
};

export default index;
