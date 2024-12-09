import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import styles from './styles';
import { FOOD_DATA, isWeb } from '@/constants/Constants';
import { useTheme } from '@/hooks/useTheme';
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { FoodItemProps } from './types';
import {
  excerpt,
  getImageUrl,
  getpreviousFeedback,
  showPrice,
} from '@/constants/HelperFunctions';
import { getTextFromTranslation } from '@/helper/resourceHelper';
import {
  Foods,
  FoodsFeedbacks,
  Markings,
  ProfilesMarkings,
} from '@/constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { FoodFeedbackHelper } from '@/redux/actions/FoodFeedbacks/FoodFeedbacks';
import {
  DELETE_FOOD_FEEDBACK_LOCAL,
  SET_SELECTED_FOOD_MARKINGS,
  UPDATE_FOOD_FEEDBACK_LOCAL,
} from '@/redux/Types/types';
import PermissionModal from '../PermissionModal/PermissionModal';
import { router } from 'expo-router';

const FoodItem: React.FC<FoodItemProps> = ({
  item,
  handleMenuSheet,
  handleImageSheet,
  setSelectedFoodId,
  handleEatingHabitsSheet,
  // setItemMarkings,
}) => {
  const foodFeedbackHelper = new FoodFeedbackHelper();
  const [warning, setWarning] = useState(false);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { food } = item;
  const foodItem = food as Foods;
  const { markings } = useSelector((state: any) => state.food);
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

  const handleOpenSheet = () => {
    dispatch({
      type: SET_SELECTED_FOOD_MARKINGS,
      payload: dislikedMarkings,
    });
    handleEatingHabitsSheet();
  };

  const dislikedMarkings = item?.markings.filter((marking) => {
    return profile?.markings?.some(
      (profileMarking: ProfilesMarkings) =>
        profileMarking?.markings_id === marking?.markings_id &&
        profileMarking?.like === false
    );
  });

  const updateRating = async (rating: number | null) => {
    if (!user?.id) {
      setWarning(true);
      return;
    }
    try {
      const updateFeedbackResult = (await foodFeedbackHelper.updateFoodFeedback(
        foodItem?.id,
        profile?.id,
        { ...previousFeedback, rating }
      )) as FoodsFeedbacks;
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

  const markingsData = useMemo(
    () =>
      markings
        .filter((m: Markings) =>
          item?.markings.some((mark) => mark.markings_id === m.id)
        )
        .slice(0, 2), // Limit to a maximum of 2 items
    [markings, item?.markings]
  );

  const handlePriceChange = () => {
    router.navigate('/settings/price-group');
  };

  return (
    <>
      <TouchableOpacity
        style={{
          ...styles.card,
          width: isWeb ? 250 : '48%',
          height: isWeb ? 300 : 250,
          backgroundColor: theme.card.background,
          borderWidth: dislikedMarkings.length > 0 ? 1 : 0,
          borderColor: '#FF000095',
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
            style={{
              ...styles.image,
              borderColor: theme.primary,
            }}
            source={{
              uri:
                foodItem?.image_remote_url ||
                getImageUrl(foodItem?.image) ||
                '',
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
          {dislikedMarkings.length > 0 && (
            <TouchableOpacity
              style={styles.favContainerWarn}
              onPress={handleOpenSheet}
            >
              <MaterialIcons name='warning' size={20} color={'#000'} />
            </TouchableOpacity>
          )}
          <View style={styles.categoriesContainer}>
            {markingsData?.map((mark: any) => (
              <TouchableOpacity key={mark.id} onPress={handleMenuSheet}>
                <Image
                  source={{
                    uri:
                      mark?.image_remote_url || getImageUrl(mark?.image) || '',
                  }}
                  style={styles.categoryLogo}
                  // contentFit='cover'
                  // cachePolicy={'memory-disk'}
                  // transition={500}
                />
              </TouchableOpacity>
            ))}
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
          <TouchableOpacity
            style={{ ...styles.priceButton }}
            onPress={handlePriceChange}
          >
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
