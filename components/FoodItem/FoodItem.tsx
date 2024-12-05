import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import { FOOD_DATA, isWeb } from '@/constants/Constants';
import { useTheme } from '@/hooks/useTheme';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { FoodItemProps } from './types';
import {
  excerpt,
  getImageUrl,
  getpreviousFeedback,
  showPrice,
} from '@/constants/HelperFunctions';
import { getTextFromTranslation } from '@/helper/resourceHelper';
import { Foods } from '@/constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { FoodFeedbackHelper } from '@/redux/actions/FoodFeedbacks/FoodFeedbacks';
import {
  DELETE_FOOD_FEEDBACK_LOCAL,
  UPDATE_FOOD_FEEDBACK_LOCAL,
} from '@/redux/Types/types';
import PermissionModal from '../PermissionModal/PermissionModal';
import { router } from 'expo-router';

const FoodItem: React.FC<FoodItemProps> = ({
  item,
  handleMenuSheet,
  handleImageSheet,
  setSelectedFoodId,
}) => {
  const foodFeedbackHelper = new FoodFeedbackHelper();
  const [warning, setWarning] = useState(false);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { food } = item;
  const foodItem = food as Foods;
  const { user, profile, isManagement } = useSelector(
    (state: any) => state.authReducer
  );
  const previousFeedback = useSelector((state: any) =>
    getpreviousFeedback(state.food.ownFoodFeedbacks, foodItem.id)
  );
  const handleNavigation = (id: string, foodId: string) => {
    router.push({
      pathname: '/(app)/foodoffers/details/[id]',
      params: { id, foodId },
    });
  };

  const updateRating = async (rating: number | null) => {
    if (!user?.id) {
      setWarning(true);
      return;
    }
    try {
      const updateFeedbackResult = await foodFeedbackHelper.updateFoodFeedback(
        foodItem?.id,
        profile?.id,
        { ...previousFeedback, rating }
      );
      if (updateFeedbackResult?.id) {
        dispatch({
          type: UPDATE_FOOD_FEEDBACK_LOCAL,
          payload: updateFeedbackResult,
        });
      } else {
        dispatch({
          type: DELETE_FOOD_FEEDBACK_LOCAL,
          payload: previousFeedback?.id,
        });
      }
    } catch (e) {
      console.error('Error creating feedback:', e);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={{
          ...styles.card,
          width: isWeb ? 250 : '48%',
          height: isWeb ? 300 : 250,
          backgroundColor: theme.card.background,
        }}
        key={item?.alias}
        onPress={() => {
          const foodId =
            item?.food && typeof item.food !== 'string' ? item.food.id : '';
          handleNavigation(item?.id, foodId);
        }}
      >
        <View
          style={{
            ...styles.imageContainer,
            height: isWeb ? '70%' : '70%',
          }}
        >
          <Image
            style={styles.image}
            source={{
              uri:
                foodItem?.image_remote_url || getImageUrl(foodItem?.image),
            }}
          // contentFit='cover'
          // cachePolicy={'memory-disk'}
          // transition={500}
          />

          <View style={styles.overlay} />
          {isManagement && (
            <TouchableOpacity
              style={styles.editImageButton}
              onPress={() => {
                setSelectedFoodId(item?.food?.id);
                handleImageSheet();
              }}
            >
              <MaterialCommunityIcons
                name='image-edit'
                size={20}
                color={'white'}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.favContainer}>
            {previousFeedback?.rating === 5 ? (
              <TouchableOpacity onPress={() => updateRating(null)}>
                <AntDesign name='star' size={20} color={theme.primary} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => updateRating(5)}>
                <AntDesign name='staro' size={20} color={'white'} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          <View style={styles.categoriesContainer}>
            <TouchableOpacity onPress={handleMenuSheet}>
              <Image
                source={{
                  uri: 'https://www.studentenwerk-osnabrueck.de/fileadmin/_processed_/5/8/csm_Mensa_Classic_rund_weiss_05f8706461.png',
                }}
                style={styles.categoryLogo}
              // contentFit='cover'
              // cachePolicy={'memory-disk'}
              // transition={500}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            ...styles.cardContent,
            gap: isWeb ? 15 : 5,
            paddingHorizontal: isWeb ? 20 : 10,
          }}
        >
          <Text style={{ ...styles.foodName, color: theme.card.text }}>
            {isWeb
              ? excerpt(getTextFromTranslation(foodItem?.translations), 24)
              : excerpt(getTextFromTranslation(foodItem?.translations), 12)}
          </Text>
          <TouchableOpacity style={{ ...styles.priceButton }}>
            <Text style={{ ...styles.price, color: 'black' }}>
              {showPrice(item, profile)}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <PermissionModal isVisible={warning} setIsVisible={setWarning} />
    </>
  );
};

export default FoodItem;
