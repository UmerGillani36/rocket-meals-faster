import React, { useEffect } from 'react';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/components/Drawer/CustomDrawerContent';
import { useTheme } from '@/hooks/useTheme';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'expo-router';
import { ProfileHelper } from '@/redux/actions/Profile/Profile';
import { Profiles } from '@/constants/types';
import { UPDATE_FOOD_FEEDBACK_LABELS, UPDATE_MARKINGS, UPDATE_OWN_FOOD_FEEDBACK, UPDATE_OWN_FOOD_FEEDBACK_LABEL_ENTRIES, UPDATE_PROFILE } from '@/redux/Types/types';
import { FoodFeedbackLabelHelper } from '@/redux/actions/FoodFeedbacksLabel/FoodFeedbacksLabel';
import { FoodFeedbackHelper } from '@/redux/actions/FoodFeedbacks/FoodFeedbacks';
import { FoodFeedbackLabelEntryHelper } from '@/redux/actions/FoodFeeedbackLabelEntries/FoodFeedbackLabelEntries';
import { MarkingHelper } from '@/redux/actions/Markings/Markings';
import { SafeAreaView } from 'react-native';
import CustomMenuHeader from '@/components/CustomMenuHeader/CustomMenuHeader';

export default function Layout() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const markingHelper = new MarkingHelper();
  const foodFeedbackHelper = new FoodFeedbackHelper();
  const foodfeedbackLabelHelper = new FoodFeedbackLabelHelper();
  const foodFeedbackLabelEntryHelper = new FoodFeedbackLabelEntryHelper();
  const profileHelper = new ProfileHelper();
  const { loggedIn, user, profile } = useSelector(
    (state: any) => state.authReducer
  );

  if (!loggedIn) {
    return <Redirect href='/(auth)/login' />;
  }

  // Fetch food feedback labels
  const getFoodFeedBackLabels = async () => {
    try {
      const foodFeedbackLabels =
        await foodfeedbackLabelHelper.fetchFoodFeedbackLabels({});
      if (foodFeedbackLabels) {
        dispatch({
          type: UPDATE_FOOD_FEEDBACK_LABELS,
          payload: foodFeedbackLabels,
        });
      } else {
        console.log('No food feedback labels found');
      }
    } catch (e) {
      console.error('Error fetching food feedback labels: ', e);
    }
  };

  // Fetch profile function
  const fetchProfile = async () => {
    try {
      const profile = (await profileHelper.fetchProfileById(user?.profile, {})) as Profiles;
      if (profile) {
        dispatch({ type: UPDATE_PROFILE, payload: profile });
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const getOwnFeedback = async () => {
    try {
      // Fetch own feedback
      const result = await foodFeedbackHelper.fetchFoodFeedbackByProfileId(
        profile?.id
      );
      if (result) {
        dispatch({ type: UPDATE_OWN_FOOD_FEEDBACK, payload: result });
      }
    } catch (error) {
      console.error('Error fetching own feedback:', error);
    }
  };

  const getFeedbackEntries = async () => {
    try {
      const result =
        await foodFeedbackLabelEntryHelper.fetchFoodFeedbackLabelEntriesByProfile(
          profile?.id
        );
      if (result) {
        dispatch({
          type: UPDATE_OWN_FOOD_FEEDBACK_LABEL_ENTRIES,
          payload: result,
        });
      }
    } catch (error) {
      console.error('Error fetching feedback entries:', error);
    }
  };

  const getMarkings = async () => {
    try {
      const result = await markingHelper.fetchMarkings({});
      if (result) {
        dispatch({ type: UPDATE_MARKINGS, payload: result });
      }
    } catch (error) {
      console.error('Error fetching markings:', error);
    }
  };

  useEffect(() => {
    if (profile?.id) {
      getOwnFeedback();
      getFeedbackEntries();
    }
  }, [profile]);

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
    getMarkings();
    getFoodFeedBackLabels();
  }, [user]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.screen.iconBg }}>
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: theme.header.background },
          headerTintColor: theme.header.text,
          drawerType: 'front',
        }}
        detachInactiveScreens={true}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        backBehavior='history'
      >
        <Drawer.Screen
          name='index'
          options={{
            title: 'Please Select your canteen',
          }}
        />
        <Drawer.Screen
          name='foodoffers'
          options={{
            title: 'Canteens',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name='account-balance/index'
          options={{
            title: 'Account Balance',
          }}
        />
        <Drawer.Screen
          name='campus/index'
          options={{
            title: 'Campus',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name='housing/index'
          options={{
            title: 'Housing',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name='news/index'
          options={{
            title: 'News',
            header: () => <CustomMenuHeader label='News' key={'News'} />,
          }}
        />
        <Drawer.Screen
          name='course-timetable/index'
          options={{
            title: 'Course Timetable',
          }}
        />
        <Drawer.Screen
          name='settings'
          options={{
            title: 'Settings',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name='faq-food/index'
          options={{
            title: 'FAQ-Food',
          }}
        />
        <Drawer.Screen
          name='faq-living/index'
          options={{
            title: 'FAQ-Living',
          }}
        />
        <Drawer.Screen
          name='privacy-policy/index'
          options={{
            title: 'Privacy Policy',
          }}
        />
        <Drawer.Screen
          name='about-us/index'
          options={{
            title: 'About Us',
          }}
        />
        <Drawer.Screen
          name='accessibility/index'
          options={{
            title: 'Accessibility',
          }}
        />
        <Drawer.Screen
          name='management/index'
          options={{
            title: 'Management',
          }}
        />
        <Drawer.Screen
          name='terms-and-conditions/index'
          options={{
            title: 'Terms And Conditions',
          }}
        />
      </Drawer>
    </SafeAreaView>
  );
}
