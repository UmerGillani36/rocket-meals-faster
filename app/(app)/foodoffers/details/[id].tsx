import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import styles from './styles';
import { useTheme } from '@/hooks/useTheme';
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { isWeb, blurhash, languageCode } from '@/constants/Constants';
import Feedbacks from '@/components/Feedbacks';
import Details from '@/components/Details';
import Labels from '@/components/Labels';
import { Image } from 'expo-image';
import { fetchFoodDetailsById } from '@/redux/actions/FoodOffers/FoodOffers';
import {
  getImageUrl,
  getpreviousFeedback,
  numToOneDecimal,
} from '@/constants/HelperFunctions';
import { Foods, FoodsTranslations } from '@/constants/types';
import { FoodFeedbackHelper } from '@/redux/actions/FoodFeedbacks/FoodFeedbacks';
import { useDispatch, useSelector } from 'react-redux';
import {
  DELETE_FOOD_FEEDBACK_LOCAL,
  UPDATE_FOOD_FEEDBACK_LOCAL,
} from '@/redux/Types/types';
import PermissionModal from '@/components/PermissionModal/PermissionModal';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FoodDetailsScreen() {
  const { id, foodId } = useLocalSearchParams();
  const dispatch = useDispatch();
  const [warning, setWarning] = useState(false);
  const { user, profile } = useSelector((state: any) => state.authReducer);
  const previousFeedback = useSelector((state: any) =>
    getpreviousFeedback(state.food.ownFoodFeedbacks, foodId.toString())
  );
  const foodfeedbackHelper = new FoodFeedbackHelper();
  const [foodDetails, setFoodDetails] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('feedbacks');
  const { theme } = useTheme();

  const renderContent = (foodDetails: Foods) => {
    switch (activeTab) {
      case 'feedbacks':
        return <Feedbacks foodDetails={foodDetails} offerId={id.toString()} />;
      case 'details':
        return <Details foodDetails={foodDetails} />;
      case 'labels':
        return <Labels foodDetails={foodDetails} offerId={id.toString()} />;
      default:
        return null;
    }
  };

  const rateFood = async (rating: number) => {
    if (!user?.id) {
      setWarning(true);
      return;
    }
    try {
      const updateFeedbackResult = await foodfeedbackHelper.updateFoodFeedback(
        foodDetails?.id,
        profile?.id,
        {
          ...previousFeedback,
          rating: previousFeedback?.rating === rating ? null : rating,
        }
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

  // const getFoodFeedbacks = async () => {
  //   // Fetch food feedbacks
  //   try {
  //     console.log('Fetching food feedbacks', foodId);
  //     const foodFeedbacks = await foodfeedbackHelper.fetchFoodFeedbacks(
  //       profile?.id,
  //       { query: { food: foodId } }
  //     );
  //     // if (foodFeedbacks && foodFeedbacks.data) {
  //     //   console.log('Food Feedbacks:', foodFeedbacks.data);
  //     // } else {
  //     //   console.log('No food feedbacks found');
  //     // }
  //   } catch (e) {
  //     console.error('Error fetching food feedbacks: ', e);
  //   }
  // };

  const getFoodDetails = async () => {
    // Fetch food details
    try {
      const foodData = await fetchFoodDetailsById(foodId.toString());

      if (foodData && foodData.data) {
        // Find the matching translation based on the languageCode
        const translation = foodData.data?.translations?.find(
          (val: FoodsTranslations) => val?.languages_code === languageCode
        );

        // Set the food details with the translation or fallback to an empty object if not found
        setFoodDetails({
          ...foodData.data,
          name: translation ? translation.name : null, // Use translation text or null if not found
        });
      } else {
        console.log('No food data found');
      }
    } catch (e) {
      console.error('Error fetching food details: ', e);
    }
  };

  useEffect(() => {
    getFoodDetails();
    // getFoodFeedbacks();
  }, []);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width
  );

  let containerWidth;

  if (isWeb) {
    const windowWidth = Dimensions.get('window').width;

    if (windowWidth < 600) {
      containerWidth = '95%';
    } else {
      containerWidth = '80%';
    }
  } else {
    containerWidth = '100%';
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    const subscription = Dimensions.addEventListener('change', handleResize);

    return () => subscription?.remove();
  }, []);

  const isbreak = screenWidth > 1000 ? 'row' : screenWidth > 480 ? '' : '';
  const cardWidth = screenWidth > 1000 ? '50%' : '100%';
  const cardHeight = screenWidth > 1000 ? 400 : 'auto';

  const detailcon = screenWidth > 1000 ? 'space-between' : '';
  const aligndetails = screenWidth > 1000 ? 'flex-start' : 'center';
  const Textalign = screenWidth > 1000 ? '' : 'center';
  const imagewidth = screenWidth > 1000 ? 400 : '100%';
  const cardDirection = screenWidth > 1000 ? '' : '';

  const themeStyles = {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
    color: theme.light,
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.screen.background,
        // paddingTop: 10,
      }}
      edges={['top']}
    >
      <ScrollView
        style={{
          ...styles.container,
          backgroundColor: theme.screen.background,
          padding: isWeb ? 20 : 10,
        }}
        contentContainerStyle={{
          ...styles.contentContainer,
          width: '100%',
          backgroundColor: theme.screen.background,
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
          }}
        >
          {isWeb ? (
            <View
              style={{
                ...styles.featuredContainer,
                width: screenWidth > 1000 ? '80%' : '100%',
                flexDirection: isbreak,
              }}
            >
              <View
                style={{
                  ...styles.foodDetail,
                  // width: cardWidth,

                  alignItems: aligndetails,
                }}
              >
                <View style={{ ...styles.imageContainer, width: imagewidth }}>
                  <Image
                    style={styles.featuredImage}
                    contentFit='cover'
                    source={
                      foodDetails?.image_remote_url ||
                      getImageUrl(foodDetails?.image)
                    }
                    placeholder={!foodDetails?.image_url && { blurhash }}
                    cachePolicy={'memory-disk'}
                    transition={500}
                  />
                </View>
                <Text
                  style={{
                    ...styles.foodHeading,
                    width: imagewidth,
                    color: theme.screen.text,
                    textAlign: Textalign,
                    fontSize: screenWidth > 800 ? 44 : 24,
                  }}
                >
                  {foodDetails?.name}
                </Text>
              </View>
              <View
                style={{
                  ...styles.detailsContainer,
                  width: cardWidth,
                  justifyContent: detailcon,
                  height: cardHeight,
                  paddingHorizontal: screenWidth > 800 ? 20 : 0,
                }}
              >
                <View style={{ width: '100%', alignItems: 'flex-end' }}>
                  <View style={styles.ratingView}>
                    <AntDesign name='star' size={22} color={theme.primary} />
                    <Text
                      style={{
                        ...styles.totalRating,
                        color: theme.screen.text,
                      }}
                    >
                      {(foodDetails?.rating_average || foodDetails?.rating_average_legacy) &&
                        numToOneDecimal(foodDetails.rating_average || foodDetails?.rating_average_legacy)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    ...styles.ratingContainer,
                    marginTop: screenWidth > 1000 ? 0 : 20,
                  }}
                >
                  <Text style={{ ...styles.rateUs, color: theme.screen.text }}>
                    Rate Us
                  </Text>
                  <View style={styles.stars}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => rateFood(index + 1)}
                        style={{ padding: 5 }}
                      >
                        <AntDesign
                          name={
                            previousFeedback?.rating > index ? 'star' : 'staro'
                          }
                          size={22}
                          color={
                            index < foodDetails?.rating_average
                              ? theme.primary
                              : theme.screen.icon
                          }
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.mobileImageContainer}>
              <Image
                source={
                  foodDetails?.image_remote_url ||
                  getImageUrl(foodDetails?.image)
                }
                style={styles.mobileFeaturedImage}
                contentFit='cover'
                cachePolicy={'memory-disk'}
                transition={500}
              />
              <View style={styles.overlay}>
                <View style={styles.mobileDetailsHeader}>
                  <View style={styles.row}>
                    <Text
                      style={{
                        ...styles.mediumMobile,
                        color: theme.screen.text,
                      }}
                    >
                      {/* Small Portion */}
                    </Text>
                    <View style={styles.mobileRatingView}>
                      <AntDesign name='star' size={18} color={theme.primary} />
                      <Text
                        style={{
                          ...styles.mobileTotalRating,
                          color: theme.screen.text,
                        }}
                      >
                        {(foodDetails?.rating_average || foodDetails?.rating_average_legacy) &&
                          numToOneDecimal(foodDetails.rating_average || foodDetails?.rating_average_legacy)}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      ...styles.mobileFoodHeading,
                      color: theme.screen.text,
                    }}
                  >
                    {foodDetails?.name}
                  </Text>
                </View>
                <View style={styles.mobileDetailsFooter}></View>
              </View>
              <View style={styles.mobileRatingContainer}>
                <Text
                  style={{
                    ...styles.mobileRateUs,
                    color: theme.screen.text,
                  }}
                >
                  Rate Us
                </Text>
                <View style={styles.mobileStars}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => rateFood(index + 1)}
                    >
                      <AntDesign
                        name={
                          previousFeedback?.rating > index ? 'star' : 'staro'
                        }
                        size={20}
                        color={
                          index < foodDetails?.rating_average
                            ? theme.primary
                            : theme.screen.icon
                        }
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          )}
          <View
            style={{
              ...styles.notificationContainer,
              backgroundColor: theme.drawerBg,
              // width: isWeb ? '80%' : '100%',
              width: containerWidth,
            }}
          >
            <Text
              style={{
                ...styles.notificationBody,
                color: theme.screen.text,
                fontSize: isWeb ? 18 : 14,
              }}
            >
              Get Notification on Availability
            </Text>
            {true ? (
              <TouchableOpacity
                style={{
                  ...styles.bellIconAtiveContainer,
                  borderColor: theme.primary,
                  padding: isWeb ? 12 : 8,
                }}
              >
                <MaterialIcons
                  name='notifications'
                  size={32}
                  color={theme.screen.icon}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  ...styles.bellIconContainer,
                  backgroundColor: theme.primary,
                  padding: isWeb ? 12 : 8,
                }}
              >
                <MaterialIcons
                  name='notifications-active'
                  size={32}
                  color={theme.drawerBg}
                />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              ...styles.tabViewContainer,
              // width: isWeb ? '80%' : '100%',
              width: containerWidth,
            }}
          >
            <View
              style={{
                ...styles.tabs,
                width: isWeb ? '95%' : '100%',
                gap: isWeb ? 20 : 0,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === 'feedbacks' && themeStyles,
                ]}
                onPress={() => setActiveTab('feedbacks')}
              >
                <MaterialCommunityIcons
                  name='chat'
                  size={26}
                  color={theme.light}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === 'details' && themeStyles,
                ]}
                onPress={() => setActiveTab('details')}
              >
                <MaterialCommunityIcons
                  name='nutrition'
                  size={26}
                  color={theme.light}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'labels' && themeStyles]}
                onPress={() => setActiveTab('labels')}
              >
                <MaterialCommunityIcons
                  name='medical-bag'
                  size={26}
                  color={theme.light}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...styles.pagerView,
                width: isWeb ? '95%' : '100%',
                paddingHorizontal: isWeb ? (screenWidth > 1000 ? 20 : 0) : 10,
              }}
            >
              {foodDetails?.id && renderContent(foodDetails)}
            </View>
          </View>
          <PermissionModal isVisible={warning} setIsVisible={setWarning} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
