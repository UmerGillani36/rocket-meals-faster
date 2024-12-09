import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { useTheme } from '@/hooks/useTheme';
import { AntDesign } from '@expo/vector-icons';
import { Foodoffers, Foods } from '@/constants/types';
import RedirectButton from '../RedirectButton';
import { useSelector } from 'react-redux';
import { isWeb, nutritionLabels } from '@/constants/Constants';
import { useLocalSearchParams } from 'expo-router';
import {
  filterNullishProperties,
  formatFoodInformationValue,
} from '@/constants/HelperFunctions';
import { Icon } from '@/helper/iconHelper';
import { IconNames } from '@/constants/IconNames';
import { extractFoodDetails } from '@/helper/resourceHelper';

const Details = ({}) => {
  const { theme } = useTheme();
  const { foodId } = useLocalSearchParams();
  const [foodDetails, setFoodDetails] = useState<any>(null);
  const extractedDetails = foodDetails ? extractFoodDetails(foodDetails) : null;
  const foodOffers = useSelector(
    (state: any) => state.canteenReducer.selectedCanteenFoodOffers
  );

  const getFoodDetails = async () => {
    foodOffers.forEach((offers: Foodoffers) => {
      // Ensure food is not null and is a valid Foods object
      const food = offers?.food as Foods | null;

      // Check if food exists and if it matches the foodId
      if (food && food.id === foodId) {
        // Filter out null/undefined properties from both food and offers
        const filteredFood = filterNullishProperties(food);
        const filteredOffers = filterNullishProperties(offers);

        // Combine the filtered objects
        const foodDetails = { ...filteredFood, ...filteredOffers };

        // Update the food details state
        setFoodDetails(foodDetails);
      }
    });
  };

  useEffect(() => {
    getFoodDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.heading, color: theme.screen.text }}>
        Food Data
      </Text>
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        Average Nutritional Values per Portion
      </Text>
      <View style={styles.nutritionsContainer}>
        {extractedDetails &&
          Object.entries(extractedDetails).map(([key, value]) => {
            const iconName = nutritionLabels[key];
            const icon =
              iconName && IconNames[iconName as keyof typeof IconNames];
            return (
              <View style={styles.nutrition} key={key}>
                {icon && (
                  <Icon name={icon} size={20} color={theme.screen.icon} />
                )}
                <View style={styles.averageNutrition}>
                  <Text style={{ ...styles.label, color: theme.screen.text }}>
                    {value !== null && value !== undefined
                      ? formatFoodInformationValue(value as number, 'g')
                      : 'N/A'}
                  </Text>
                  <Text style={{ ...styles.label, color: theme.screen.text }}>
                    {nutritionLabels[key]}
                  </Text>
                </View>
              </View>
            );
          })}
      </View>

      <Text style={{ ...styles.body, color: theme.screen.text }}>
        Environmental Impact
      </Text>
      <View style={styles.row}>
        <AntDesign name='cloud' size={24} color={theme.screen.icon} />
        <Text style={{ ...styles.body, color: theme.screen.text }}>
          {foodDetails?.co2_g !== null &&
            formatFoodInformationValue(foodDetails?.co2_g, 'g')}
        </Text>
        <Text style={{ ...styles.body, color: theme.screen.text }}>
          CO₂ Emissions
        </Text>
      </View>
      <Text style={{ ...styles.body1, color: theme.screen.text }}>
        The food labeling data is based on available information and may vary.
        We strive for a correct filter in the app, but technical problems cannot
        be ruled out. The awards on site apply. Further information on the data
        can be found here:
      </Text>
      <RedirectButton
        type={'link'}
        label='Studentenwerk Osnabrueck'
        backgroundColor='#FCDE31'
        color={'#000000'}
      />
    </View>
  );
};

export default Details;
