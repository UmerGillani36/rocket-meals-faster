import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './styles';
import { useTheme } from '@/hooks/useTheme';
import {
  DrawerContentComponentProps,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { isWeb, languageCode } from '@/constants/Constants';
import FoodItem from '@/components/FoodItem/FoodItem';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoodOffersByCanteen } from '@/redux/actions/FoodOffers/FoodOffers';
import {
  SET_CANTEEN_FEEDBACK_LABELS,
  SET_SELECTED_CANTEEN_FOOD_OFFERS,
  SET_SELECTED_CANTEEN_FOOD_OFFERS_LOCAL,
} from '@/redux/Types/types';
import {
  CanteensFeedbacksLabels,
  Foodoffers,
  FoodoffersMarkings,
} from '@/constants/types';
import {
  Entypo,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { RootDrawerParamList } from './types';
import BottomSheet from '@gorhom/bottom-sheet';
import CanteenSelectionSheet from '@/components/CanteenSelectionSheet/CanteenSelectionSheet';
import SortSheet from '@/components/SortSheet/SortSheet';
import HourSheet from '@/components/HoursSheet/HoursSheet';
import CalendarSheet from '@/components/CalendarSheet/CalendarSheet';
import { excerpt } from '@/constants/HelperFunctions';
import ForecastSheet from '@/components/ForecastSheet/ForecastSheet';
import MenuSheet from '@/components/MenuSheet/MenuSheet';
import ImageManagementSheet from '@/components/ImageManagementSheet/ImageManagementSheet';
import EatingHabitsSheet from '@/components/EatingHabitsSheet/EatingHabitsSheet';
import MarkingLabels from '@/components/MarkingLabels/MarkingLabels';
import { CanteenFeedbackLabelHelper } from '@/redux/actions/CanteenFeedbacksLabel/CanteenFeedbacksLabel';
import CanteenFeedbackLabels from '@/components/CanteenFeedbackLabels/CanteenFeedbackLabels';
import {
  intelligentSort,
  sortByEatingHabits,
  sortByFoodName,
  sortByOwnFavorite,
  sortByPublicFavorite,
} from '@/helper/sortingHelper';

const index: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const router = useRouter();
  const canteenFeedbackLabelHelper = new CanteenFeedbackLabelHelper();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [isActive, setIsActive] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState('');
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width
  );

  const canteenSheetRef = useRef<BottomSheet>(null);
  const sortSheetRef = useRef<BottomSheet>(null);
  const hoursSheetRef = useRef<BottomSheet>(null);
  const calendarSheetRef = useRef<BottomSheet>(null);
  const forecastSheetRef = useRef<BottomSheet>(null);
  const menuSheetRef = useRef<BottomSheet>(null);
  const imageManagementSheetRef = useRef<BottomSheet>(null);
  const eatingHabitSheetRef = useRef<BottomSheet>(null);

  const canteenPoints = useMemo(() => ['100%'], []);
  const sortPoints = useMemo(() => ['80%'], []);
  const hoursPoints = useMemo(() => ['80%'], []);
  const calendarPoints = useMemo(() => ['80%'], []);
  const forecastPoints = useMemo(() => ['80%'], []);
  const menuPoints = useMemo(() => ['90%'], []);
  const imageManagementPoints = useMemo(() => ['70%'], []);
  const eatingHabitPoints = useMemo(() => ['90%'], []);

  const drawerNavigation =
    useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  const { sortBy } = useSelector((state: any) => state.settings);
  const { ownFoodFeedbacks } = useSelector((state: any) => state.food);
  const { profile } = useSelector((state: any) => state.authReducer);
  const {
    selectedCanteen,
    selectedCanteenFoodOffers,
    canteenFeedbackLabels,
    canteenFoodOffers,
  } = useSelector((state: any) => state.canteenReducer);
  useFocusEffect(
    useCallback(() => {
      setIsActive(true);
      return () => {
        setIsActive(false);
      };
    }, [])
  );

  const openCanteenSheet = () => {
    canteenSheetRef?.current?.expand();
  };

  const closeCanteenSheet = () => {
    canteenSheetRef?.current?.close();
  };

  const openCalendarSheet = () => {
    calendarSheetRef?.current?.expand();
  };

  const closeCalendarSheet = () => {
    calendarSheetRef?.current?.close();
  };
  const openEatingHabitSheet = () => {
    eatingHabitSheetRef?.current?.expand();
  };
  const closeEatingHabitSheet = () => {
    eatingHabitSheetRef?.current?.close();
  };
  const openForecastSheet = () => {
    forecastSheetRef?.current?.expand();
  };
  const closeForecastSheet = () => {
    forecastSheetRef?.current?.close();
  };
  const openMenuSheet = () => {
    menuSheetRef?.current?.expand();
  };

  const closeMenuSheet = () => {
    menuSheetRef?.current?.close();
  };
  const openImageManagementSheet = () => {
    imageManagementSheetRef?.current?.expand();
  };

  const closeImageManagementSheet = () => {
    imageManagementSheetRef?.current?.close();
  };

  const openSortSheet = () => {
    sortSheetRef.current?.expand();
  };

  const closeSortSheet = () => {
    sortSheetRef?.current?.close();
  };

  const openHoursSheet = () => {
    hoursSheetRef.current?.expand();
  };

  const closeHoursSheet = () => {
    hoursSheetRef?.current?.close();
  };

  const handleDateChange = (direction: 'prev' | 'next') => {
    const currentDate = new Date(selected);
    if (direction === 'prev') {
      currentDate.setDate(currentDate.getDate() - 1); // Go back one day
    } else {
      currentDate.setDate(currentDate.getDate() + 1); // Go forward one day
    }
    setSelected(currentDate.toISOString().split('T')[0]); // Update selected date in ISO format
  };

  const getDayLabel = (date: string) => {
    const currentDate = new Date();
    const day = new Date(date);

    // Set both dates to midnight to avoid time differences affecting comparison
    currentDate.setHours(0, 0, 0, 0);
    day.setHours(0, 0, 0, 0);

    if (currentDate.toDateString() === day.toDateString()) {
      return 'Today';
    }

    // Check for yesterday
    currentDate.setDate(currentDate.getDate() - 1);
    if (currentDate.toDateString() === day.toDateString()) {
      return 'Yesterday';
    }

    // Check for tomorrow
    currentDate.setDate(currentDate.getDate() + 2);
    if (currentDate.toDateString() === day.toDateString()) {
      return 'Tomorrow';
    }

    return date; // Return the date if it's not Today, Yesterday, or Tomorrow
  };

  const updateSort = (id: string, foodOffers: Foodoffers[]) => {
    // Copy food offers to avoid mutation
    let copiedFoodOffers = [...foodOffers];

    // Sorting logic based on option id
    switch (id) {
      case 'alphabetical':
        copiedFoodOffers = sortByFoodName(copiedFoodOffers, languageCode);
        break;
      case 'favorite':
        copiedFoodOffers = sortByOwnFavorite(
          copiedFoodOffers,
          ownFoodFeedbacks
        );
        break;
      case 'eating':
        copiedFoodOffers = sortByEatingHabits(
          copiedFoodOffers,
          profile.markings
        );
        break;
      case 'rating':
        copiedFoodOffers = sortByPublicFavorite(copiedFoodOffers);
        break;
      case 'intelligent':
        copiedFoodOffers = intelligentSort(
          copiedFoodOffers,
          ownFoodFeedbacks,
          profile.markings,
          languageCode
        );
        break;
      default:
        console.warn('Unknown sorting option:', id);
        break;
    }

    // Dispatch updated food offers and close the sheet
    dispatch({
      type: SET_SELECTED_CANTEEN_FOOD_OFFERS,
      payload: copiedFoodOffers,
    });
  };
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    const subscription = Dimensions.addEventListener('change', handleResize);

    return () => subscription?.remove();
  }, []);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const foodData = await fetchFoodOffersByCanteen(
        selectedCanteen?.id,
        selected
      );
      const foodOffers = foodData?.data || [];

      updateSort(sortBy, foodOffers);

      dispatch({
        type: SET_SELECTED_CANTEEN_FOOD_OFFERS_LOCAL,
        payload: foodOffers,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching Food Offers:', error);
    }
  };

  const fetchCanteenLabels = async () => {
    try {
      // Fetch Canteen Feedback Labels
      const canteenFeedbackLabels =
        await canteenFeedbackLabelHelper.fetchCanteenFeedbackLabels();
      dispatch({
        type: SET_CANTEEN_FEEDBACK_LABELS,
        payload: canteenFeedbackLabels,
      });
    } catch (error) {
      console.error('Error fetching Canteen Feedback Labels:', error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [selectedCanteen, selected]);

  useEffect(() => {
    fetchCanteenLabels();
  }, []);

  return (
    <View style={styles.foodOfferContainer}>
      <View
        style={{
          ...styles.header,
          backgroundColor: theme.header.background,
          paddingHorizontal: isWeb ? 20 : 10,
        }}
      >
        <View style={styles.row}>
          <View style={styles.col1}>
            {/* Menu */}
            <TouchableOpacity
              onPress={() => drawerNavigation.toggleDrawer()}
              style={{ padding: isWeb ? screenWidth < 500 ? 5 : 10 : 5 }}
            >
              <Ionicons name='menu' size={24} color={theme.header.text} />
            </TouchableOpacity>
            {/* Canteen Heading */}
            <Text style={{ ...styles.heading, color: theme.header.text }}>
              {excerpt(String(selectedCanteen?.alias), 10) || 'Food Offers'}
            </Text>
          </View>
          <View style={{ ...styles.col2, gap: isWeb ? screenWidth < 500 ? 6 : 30 : 15 }}>
            {/* Sorting */}
            <TouchableOpacity
              onPress={() => openSortSheet()}
              style={{ padding: isWeb ? screenWidth < 500 ? 5 : 10 : 5 }}
            >
              <MaterialIcons name='sort' size={24} color={theme.header.text} />
            </TouchableOpacity>
            {/* Price Group */}
            <TouchableOpacity
              onPress={() => {
                router.navigate('/settings/price-group');
              }}
              style={{ padding: isWeb ? screenWidth < 500 ? 5 : 10 : 5 }}
            >
              <FontAwesome6
                name='euro-sign'
                size={24}
                color={theme.header.text}
              />
              {/* Eating Habits */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.navigate('/settings/eating-habits');
              }}
              style={{ padding: isWeb ? screenWidth < 500 ? 5 : 10 : 5 }}
            >
              <Ionicons name='bag-add' size={24} color={theme.header.text} />
            </TouchableOpacity>
            {/* Change Canteen */}
            <TouchableOpacity
              onPress={openCanteenSheet}
              style={{ padding: isWeb ? screenWidth < 500 ? 5 : 10 : 5 }}
            >
              <MaterialIcons
                name='restaurant-menu'
                size={24}
                color={theme.header.text}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          {/* Calendar */}
          <View style={{ ...styles.col2, gap: isWeb ? screenWidth < 500 ? 15 : 26 : 15 }}>
            <TouchableOpacity
              onPress={() => handleDateChange('prev')}
              style={{ padding: isWeb ? screenWidth < 500 ? 2 : 5 : 2 }}
            >
              <Entypo name='chevron-left' size={24} color={theme.header.text} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openCalendarSheet}
              style={{ padding: isWeb ? screenWidth < 500 ? 2 : 5 : 2 }}
            >
              <MaterialIcons
                name='calendar-month'
                size={24}
                color={theme.header.text}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDateChange('next')}
              style={{ padding: isWeb ? screenWidth < 500 ? 2 : 5 : 2 }}
            >
              <Entypo
                name='chevron-right'
                size={24}
                color={theme.header.text}
              />
            </TouchableOpacity>
            <Text style={{ ...styles.heading, color: theme.header.text }}>
              {getDayLabel(selected)}
            </Text>
          </View>
          <View style={{ ...styles.col2, gap: isWeb ? 30 : 15 }}>
            {/* ForeCast */}
            <TouchableOpacity
              onPress={openForecastSheet}
              style={{ padding: isWeb ? screenWidth < 500 ? 2 : 5 : 2 }}
            >
              <FontAwesome6
                name='people-group'
                size={24}
                color={theme.header.text}
              />
            </TouchableOpacity>
            {/* Opening Hours */}
            <TouchableOpacity
              onPress={() => openHoursSheet()}
              style={{ padding: isWeb ? screenWidth < 500 ? 2 : 5 : 2 }}
            >
              <MaterialCommunityIcons
                name='clock-time-eight'
                size={24}
                color={theme.header.text}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        style={{
          ...styles.container,
          backgroundColor: theme.screen.background,
        }}
        contentContainerStyle={{
          ...styles.contentContainer,
          paddingHorizontal: isWeb ? screenWidth < 500 ? 5 : 20 : 5,
        }}
      >
        <View
          style={{
            ...styles.foodContainer,
            gap: isWeb ? 10 : 10,
          }}
        >
          {loading ? (
            <View
              style={{ width: '100%', height: 400, justifyContent: 'center' }}
            >
              <ActivityIndicator size={'large'} color={theme.screen.icon} />
            </View>
          ) : (
            selectedCanteenFoodOffers &&
            selectedCanteenFoodOffers.map((item: Foodoffers) => (
              <FoodItem
                item={item}
                key={item.id}
                handleMenuSheet={openMenuSheet}
                handleImageSheet={openImageManagementSheet}
                handleEatingHabitsSheet={openEatingHabitSheet}
                setSelectedFoodId={setSelectedFoodId}
              />
            ))
          )}
        </View>
        {/* <View
          style={{
            ...styles.foodContainer,
            flexDirection: isWeb ? 'row' : 'column',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: isWeb ? 20 : 10,
          }}
        >
          {loading ? (
            <View
              style={{
                width: '100%',
                height: 400,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator size={'large'} color={theme.screen.icon} />
            </View>
          ) : (
            selectedCanteenFoodOffers &&
            selectedCanteenFoodOffers.map((item: Foodoffers) => (
              <FoodItem
                item={item}
                key={item.id}
                handleMenuSheet={openMenuSheet}
                handleImageSheet={openImageManagementSheet}
                handleEatingHabitsSheet={openEatingHabitSheet}
                setSelectedFoodId={setSelectedFoodId}
              />
            ))
          )}
        </View> */}

        {!loading && (
          <View style={styles.feebackContainer}>
            <View>
              <Text style={{ ...styles.foodLabels, color: theme.screen.text }}>
                Feedback Labels
              </Text>
            </View>
            {canteenFeedbackLabels?.map((label: CanteensFeedbacksLabels) => (
              <CanteenFeedbackLabels
                key={label?.id}
                label={label}
                date={selected}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {isActive && (
        <BottomSheet
          ref={canteenSheetRef}
          index={-1}
          snapPoints={canteenPoints}
          backgroundStyle={{
            ...styles.sheetBackground,
            backgroundColor: theme.sheet.sheetBg,
          }}
          handleComponent={null}
        >
          <CanteenSelectionSheet closeSheet={closeCanteenSheet} />
        </BottomSheet>
      )}
      {/* sort sheet */}
      {isActive && (
        <BottomSheet
          ref={sortSheetRef}
          index={-1}
          snapPoints={sortPoints}
          backgroundStyle={{
            ...styles.sheetBackground,
            backgroundColor: theme.sheet.sheetBg,
          }}
          handleComponent={null}
        >
          <SortSheet closeSheet={closeSortSheet} />
        </BottomSheet>
      )}
      {/* Hours sheet */}
      {isActive && (
        <BottomSheet
          ref={hoursSheetRef}
          index={-1}
          snapPoints={hoursPoints}
          backgroundStyle={{
            ...styles.sheetBackground,
            backgroundColor: theme.sheet.sheetBg,
          }}
          handleComponent={null}
        >
          <HourSheet closeSheet={closeHoursSheet} />
        </BottomSheet>
      )}
      {/* Calendar sheet */}

      {isActive && (
        <BottomSheet
          ref={calendarSheetRef}
          index={-1}
          snapPoints={calendarPoints}
          backgroundStyle={{
            ...styles.sheetBackground,
            backgroundColor: theme.sheet.sheetBg,
          }}
          handleComponent={null}
        >
          <CalendarSheet
            closeSheet={closeCalendarSheet}
            selected={selected}
            setSelected={setSelected}
          />
        </BottomSheet>
      )}
      {/* Forecast sheet */}

      {isActive && (
        <BottomSheet
          ref={forecastSheetRef}
          index={-1}
          snapPoints={forecastPoints}
          backgroundStyle={{
            ...styles.sheetBackground,
            backgroundColor: theme.sheet.sheetBg,
          }}
          handleComponent={null}
          enableHandlePanningGesture={false}
          enableContentPanningGesture={false}
        >
          <ForecastSheet closeSheet={closeForecastSheet} />
        </BottomSheet>
      )}
      {/* Menu sheet */}

      {isActive && (
        <BottomSheet
          ref={menuSheetRef}
          index={-1}
          snapPoints={menuPoints}
          backgroundStyle={{
            ...styles.sheetBackground,
            backgroundColor: theme.sheet.sheetBg,
          }}
          handleComponent={null}
          enableHandlePanningGesture={false}
          enableContentPanningGesture={false}
        >
          <MenuSheet closeSheet={closeMenuSheet} />
        </BottomSheet>
      )}
      {/* Image Management sheet */}

      {isActive && (
        <BottomSheet
          ref={imageManagementSheetRef}
          index={-1}
          snapPoints={imageManagementPoints}
          backgroundStyle={{
            ...styles.sheetBackground,
            backgroundColor: theme.sheet.sheetBg,
          }}
          handleComponent={null}
          enableHandlePanningGesture={false}
          enableContentPanningGesture={false}
        >
          <ImageManagementSheet
            closeSheet={closeImageManagementSheet}
            selectedFoodId={selectedFoodId}
            handleFetch={fetchFoods}
          />
        </BottomSheet>
      )}

      {/* Eating Habits sheet */}

      {isActive && (
        <BottomSheet
          ref={eatingHabitSheetRef}
          index={-1}
          snapPoints={eatingHabitPoints}
          backgroundStyle={{
            ...styles.sheetBackground,
            backgroundColor: theme.sheet.sheetBg,
          }}
          handleComponent={null}
        >
          <EatingHabitsSheet closeSheet={closeEatingHabitSheet} />
        </BottomSheet>
      )}
    </View>
  );
};

export default index;
