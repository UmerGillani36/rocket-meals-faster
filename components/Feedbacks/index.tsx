import {
  ActivityIndicator,
  Dimensions,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { useTheme } from '@/hooks/useTheme';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import FeedbackLabel from '../FeedbackLabel';
import { isWeb } from '@/constants/Constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  getpreviousFeedback,
  numToOneDecimal,
} from '@/constants/HelperFunctions';
import { Foods } from '@/constants/types';
import { FoodFeedbackHelper } from '@/redux/actions/FoodFeedbacks/FoodFeedbacks';
import useToast from '@/hooks/useToast';
import { DateHelper } from '@/helper/dateHelper';
import {
  DELETE_FOOD_FEEDBACK_LOCAL,
  UPDATE_FOOD_FEEDBACK_LOCAL,
} from '@/redux/Types/types';
import PermissionModal from '../PermissionModal/PermissionModal';

interface FeedbacksProps {
  foodDetails: Foods;
  offerId: string;
}

const loadingState = {
  submitLoading: false,
  deleteLoading: false,
};

const Feedbacks: React.FC<FeedbacksProps> = ({ foodDetails, offerId }) => {
  const toast = useToast();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(loadingState);
  const dispatch = useDispatch();
  const [warning, setWarning] = useState(false);
  const [comment, setComment] = useState('');
  const foodFeedbackHelper = new FoodFeedbackHelper();
  const { user, profile } = useSelector((state: any) => state.authReducer);
  const {
    foodFeedbackLabels: labels,
    ownfoodFeedbackLabelEntries: labelEntries,
  } = useSelector((state: any) => state.food);
  const previousFeedback = useSelector((state: any) =>
    getpreviousFeedback(state.food.ownFoodFeedbacks, foodDetails?.id)
  );
  const submitCommentFeedback = async (string: string | null) => {
    if (!user?.id) {
      setWarning(true);
      return;
    }

    if (string !== null && !string.trim()) {
      toast('Please write a comment', 'error');
      return;
    }

    // Set loading state based on whether string is null or not
    setLoading((prev) => ({
      ...prev,
      [string === null ? 'deleteLoading' : 'submitLoading']: true,
    }));

    try {
      const result: any = await foodFeedbackHelper.updateFoodFeedback(
        foodDetails?.id,
        profile?.id,
        { ...previousFeedback, comment: string }
      );
      // Dispatch the correct action
      dispatch({
        type: result?.id
          ? UPDATE_FOOD_FEEDBACK_LOCAL
          : DELETE_FOOD_FEEDBACK_LOCAL,
        payload: result?.id ? result : previousFeedback.id,
      });

      // Clear comment and reset loading state
      setComment('');
      setLoading(loadingState);
    } catch (error) {
      console.error('Error submitting comment feedback:', error);
      setLoading(loadingState);
    }
  };

  useEffect(() => {
    if (previousFeedback.comment) {
      setComment(previousFeedback.comment);
    }
  }, [previousFeedback]);

  const resp = Dimensions.get('window').width > 800;

  return (
    <View style={styles.container}>
      <Text
        style={{
          ...styles.heading,
          color: theme.screen.text,
          fontSize: isWeb ? 26 : 24,
        }}
      >
        Food Feedbacks
      </Text>
      <View style={styles.row}>
        <View style={styles.col}>
          <Ionicons
            name='bar-chart'
            size={isWeb ? 24 : 22}
            color={theme.screen.icon}
          />
          <Text
            style={{
              ...styles.label,
              color: theme.screen.text,
              fontSize: isWeb ? 18 : 14,
              marginTop: 2,
            }}
          >
            Number of Ratings
          </Text>
        </View>
        <Text
          style={{
            ...styles.label,
            color: theme.screen.text,
            fontSize: isWeb ? 18 : 14,
            marginTop: 2,
          }}
        >
          {foodDetails?.rating_amount}
        </Text>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <AntDesign
            name='areachart'
            size={isWeb ? 24 : 22}
            color={theme.screen.icon}
          />
          <Text
            style={{
              ...styles.label,
              color: theme.screen.text,
              fontSize: isWeb ? 18 : 14,
              marginTop: 2,
            }}
          >
            Average Rating
          </Text>
        </View>
        <Text
          style={{
            ...styles.label,
            color: theme.screen.text,
            fontSize: isWeb ? 18 : 14,
            marginTop: 2,
          }}
        >
          {foodDetails?.rating_average &&
            numToOneDecimal(foodDetails.rating_average)}
        </Text>
      </View>
      <Text
        style={{
          ...styles.heading,
          color: theme.screen.text,
          fontSize: isWeb ? 26 : 24,
        }}
      >
        Feedback Labels
      </Text>
      {labels.map((label: any) => (
        <FeedbackLabel
          key={label.id}
          label={label.translations}
          icon={label.icon ? label.icon : undefined}
          imageUrl={label.image ? label.image : undefined}
          labelEntries={labelEntries}
          foodId={foodDetails?.id}
          offerId={offerId}
        />
      ))}
      {previousFeedback && previousFeedback.comment && (
        <View style={styles.commentsContainer}>
          <View style={styles.commentsHeader}>
            <Text
              style={{
                ...styles.heading,
                color: theme.screen.text,
                fontSize: isWeb ? 26 : 24,
              }}
            >
              Your Comments
            </Text>
            <TouchableOpacity
              style={{
                ...styles.deleteButton,
                backgroundColor: theme.screen.iconBg,
              }}
              onPress={() => submitCommentFeedback(null)}
            >
              {loading.deleteLoading ? (
                <ActivityIndicator color={theme.primary} size={20} />
              ) : (
                <MaterialIcons name='delete-outline' size={24} color={'red'} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.comment}>
            <Text style={{ ...styles.commentText, color: theme.screen.text }}>
              {previousFeedback.comment}
            </Text>
            <Text style={{ ...styles.commentDate, color: theme.screen.text }}>
              {DateHelper.formatOfferDateToReadable(
                previousFeedback.updated_at,
                true,
                true
              )}
            </Text>
          </View>
          <View style={styles.divider} />
        </View>
      )}

      <View
        style={{
          ...styles.searchContainer,
          flexDirection: resp ? 'row' : 'column',
          borderRadius: resp ? 50 : 8,
          gap: 20,
        }}
      >
        <TextInput
          style={[
            styles.input,
            { width: resp ? '70%' : '100%' },
            Platform.OS === 'web' && ({ outlineStyle: 'none' } as any),
          ]}
          cursorColor={theme.modal.text}
          placeholderTextColor={theme.modal.placeholder}
          onChangeText={setComment}
          value={comment}
          placeholder='Write Your Comment Here'
        />
        <TouchableOpacity
          style={{
            ...styles.commentButton,
            // width: isWeb ? 150 : '90%', // Reduced width for web and mobile
            width: resp ? 200 : '90%',
            borderRadius: resp ? 50 : 50,
            backgroundColor: theme.primary,
          }}
          onPress={() => submitCommentFeedback(comment)}
          disabled={previousFeedback?.comment === comment}
        >
          {loading.submitLoading ? (
            <ActivityIndicator color={theme.background} size={22} />
          ) : (
            <Text style={[styles.commentLabel, { color: theme.light }]}>Comment</Text>
          )}
        </TouchableOpacity>
      </View>
      <PermissionModal isVisible={warning} setIsVisible={setWarning} />
    </View>
  );
};

export default Feedbacks;
