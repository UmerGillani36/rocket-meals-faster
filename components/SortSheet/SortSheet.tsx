import { Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import styles from './styles';
import { useTheme } from '@/hooks/useTheme';
import { isWeb, languageCode } from '@/constants/Constants';
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import { SortSheetProps } from './types';
import Checkbox from 'expo-checkbox';
import { SET_SELECTED_CANTEEN_FOOD_OFFERS, SET_SORTING } from '@/redux/Types/types';
import { useDispatch, useSelector } from 'react-redux';
import { Foodoffers, Foods, ProfilesMarkings } from '@/constants/types';
import { getFoodName, isRatingNegative, isRatingPositive } from '@/helper/resourceHelper';
import { MarkingHelper } from '@/helper/MarkingHelper';

export function sortByFoodName(foodOffers: Foodoffers[], languageCode: string) {
  foodOffers.sort((a, b) => {
    let nameA = getFoodName(a.food, languageCode);
    let nameB = getFoodName(b.food, languageCode);
    if (nameA && nameB) {
      return nameA.localeCompare(nameB);
    } else if (nameA) {
      return -1;
    } else if (nameB) {
      return 1;
    }
  });
  return foodOffers;
}

function sortByOwnFavorite(foodOffers: Foodoffers[], ownFeedBacks: any) {
  const feedbackMap = new Map(
    ownFeedBacks.map((feedback: any) => [feedback.food, feedback.rating])
  );

  return foodOffers.sort((a, b) => {
    const aRating = feedbackMap.get(a?.food?.id) ?? null;
    const bRating = feedbackMap.get(b?.food?.id) ?? null;

    const getCategory = (rating: any) => {
      if (isRatingNegative(rating)) return 3; // Lowest priority
      if (rating === null || rating === undefined) return 2; // Unknown priority
      if (isRatingPositive(rating)) return 1; // Highest priority
      return 0; // Fallback, if needed
    };

    const aCategory = getCategory(aRating);
    const bCategory = getCategory(bRating);

    return aCategory - bCategory;
  });
}


function sortByPublicFavorite(foodOffers: Foodoffers[]) {
  foodOffers.sort((a, b) => {
    const aFood: Foods = a.food || {};
    const bFood: Foods = b.food || {};
    const getRatingCategory = (rating: number | null | undefined) => {
      if (isRatingNegative(rating)) return "negative";
      if (rating === null || rating === undefined) return "null";
      if (isRatingPositive(rating)) return "positive";
      return "unknown"; // Fallback for unexpected cases
    };

    const aCategory = getRatingCategory(aFood?.rating_average);
    const bCategory = getRatingCategory(bFood?.rating_average);

    const priorityOrder = ["positive", "unknown", "null", "negative",];

    const aPriority = priorityOrder.indexOf(aCategory);
    const bPriority = priorityOrder.indexOf(bCategory);

    return aPriority - bPriority;
  });

  return foodOffers;
}


function sortByEatingHabits(foodOffers: Foodoffers[], profileMarkingsData: any) {
  const profileMarkingsMap = new Map(
    profileMarkingsData.map((marking: any) => [marking.markings_id, marking])
  );

  foodOffers.sort((a, b) => {
    const calculateSortValue = (foodOffer: Foodoffers) => {
      let sortValue = 0;
      const likeSortWeight = 1;
      const dislikeSortWeight = likeSortWeight * 2;

      if (foodOffer?.markings) {
        foodOffer.markings.forEach((marking) => {
          const profileMarking = profileMarkingsMap.get(marking.markings_id);

          if (profileMarking) {
            if (profileMarking.like === true) {
              sortValue += likeSortWeight;
            } else if (profileMarking.like === false) {
              sortValue -= dislikeSortWeight;
            }
          }
        });
      }

      return sortValue;
    };

    const aSortValue = calculateSortValue(a);
    const bSortValue = calculateSortValue(b);

    // Sort in descending order of sort value (higher preference first)
    return bSortValue - aSortValue;
  });

  return foodOffers;
}


const SortSheet: React.FC<SortSheetProps> = ({ closeSheet }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { selectedCanteenFoodOffers } = useSelector(
    (state: any) => state.canteenReducer
  );
  const { ownFoodFeedbacks } = useSelector((state: any) => state.food);
  const { profile } = useSelector((state: any) => state.authReducer);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const sortingOptions = [
    {
      id: 'intelligent',
      label: 'Intelligent',
      icon: <MaterialCommunityIcons name='brain' size={24} />,
    },
    {
      id: 'favorite',
      label: 'Favorite',
      icon: <AntDesign name='heart' size={24} />,
    },
    {
      id: 'eating',
      label: 'Eating Habits',
      icon: <Ionicons name='bag-add' size={24} />,
    },
    {
      id: 'rating',
      label: 'Public Rating',
      icon: <AntDesign name='star' size={24} />,
    },
    {
      id: 'alphabetical',
      label: 'Alphabetical',
      icon: <FontAwesome5 name='sort-alpha-down' size={24} />,
    },
    {
      id: 'none',
      label: 'None',
      icon: <MaterialCommunityIcons name='sort-variant-remove' size={24} />,
    },
  ];

  const updateSort = (option: { id: string }) => {
    console.log('UPdate SOrt called: ', option.id);
    setSelectedOption(option.id);
    dispatch({ type: SET_SORTING, payload: option.id });
    let copiedFoodOffers = [...selectedCanteenFoodOffers];
    if (option.id === 'alphabetical') {
      copiedFoodOffers = sortByFoodName(copiedFoodOffers, languageCode);
    } else if (option.id === 'favourite') {
      copiedFoodOffers = sortByOwnFavorite(copiedFoodOffers, ownFoodFeedbacks);
    } else if (option.id === 'eating') {
      copiedFoodOffers = sortByEatingHabits(copiedFoodOffers, profile.markings);
    } else if (option.id === 'rating') {
      console.log("Sort By public Rating called");
      copiedFoodOffers = sortByPublicFavorite(copiedFoodOffers);
    }
    // else if (option.id === 'alphabetical') {
    //   copiedFoodOffers = FoodOfferCategoriesHelper.sortFoodoffersByFoodofferCategory(copiedFoodOffers, foodoffersCategoriesDict, languageCode);
    // } else if (sortType === SortType.foodsCategories) {
    //   copiedFoodOffers = FoodsCategoriesHelper.sortFoodoffersByFoodsCategory(copiedFoodOffers, foodsCategoriesDict, languageCode);
    // }
    console.log('Food Offers: ', copiedFoodOffers);
    dispatch({ type: SET_SELECTED_CANTEEN_FOOD_OFFERS, payload: copiedFoodOffers });
    closeSheet();
    // return copiedFoodOffers;
  }

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
        <View />
        <Text
          style={{
            ...styles.sheetHeading,
            fontSize: isWeb ? 40 : 28,
            color: theme.sheet.text,
          }}
        >
          Sort
        </Text>
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
      <View style={styles.sortingListContainer}>
        {sortingOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.actionItem,
              selectedOption === option.id && {
                backgroundColor: theme.primary,
              },
            ]}
            onPress={() => updateSort(option)}
          >
            <View style={styles.col}>
              {React.cloneElement(
                option.icon,
                selectedOption === option.id
                  ? {
                    color: '#000000',
                  }
                  : { color: theme.screen.icon }
              )}
              <Text
                style={[
                  styles.label,
                  selectedOption === option.id
                    ? {
                      color: '#000000',
                    }
                    : { color: theme.screen.text },
                ]}
              >
                {option.label}
              </Text>
            </View>
            <Checkbox
              style={styles.checkbox}
              value={selectedOption === option.id}
              // onValueChange={() => updateSort(option)} // Toggle option
              color={selectedOption === option.id ? '#000000' : undefined}
            />
          </TouchableOpacity>
        ))}
      </View>
    </BottomSheetScrollView>
  );
};

export default SortSheet;
