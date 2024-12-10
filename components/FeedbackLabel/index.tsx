import React, { useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import styles from './styles';
import { FeedbackLabelProps } from './types';
import { isWeb } from '@/constants/Constants';
import { Image } from 'expo-image';
import {
  getIconComponent,
  getTextFromTranslation,
} from '@/helper/resourceHelper';
import { CanteensFeedbacksLabelsEntries, FoodsFeedbacksLabelsEntries } from '@/constants/types';
import { FoodFeedbackLabelEntryHelper } from '@/redux/actions/FoodFeeedbackLabelEntries/FoodFeedbackLabelEntries';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_OWN_FOOD_FEEDBACK_LABEL_ENTRIES_LOCAL, UPDATE_OWN_FOOD_FEEDBACK_LABEL_ENTRIES_LOCAL } from '@/redux/Types/types';
import PermissionModal from '../PermissionModal/PermissionModal';

const FeedbackLabel: React.FC<FeedbackLabelProps> = ({
  label,
  icon,
  imageUrl,
  labelEntries,
  foodId,
  offerId,
}) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [warning, setWarning] = useState(false);
  const { user, profile } = useSelector((state: any) => state.authReducer);
  const { selectedCanteen } = useSelector((state: any) => state.canteenReducer);
  const foodFeedbackLabelEntryHelper = new FoodFeedbackLabelEntryHelper();

  // Use useMemo to optimize the filtering process
  const labelData = useMemo(() => {
    return labelEntries.find((entry: FoodsFeedbacksLabelsEntries) => entry.label === label[0]?.foods_feedbacks_labels_id && entry.food === foodId) || {} as FoodsFeedbacksLabelsEntries;
  }, [label, labelEntries]);

  // Function to handle updating the entry
  const handleUpdateEntry = async (isLike: boolean | null) => {
    if (!user?.id) {
      setWarning(true);
      return;
    }
    let likeStats = null;
    if (isLike === true && like === true) {
      likeStats = null;
    } else if (isLike === false && like === false) {
      likeStats = null;
    } else {
      likeStats = isLike;
    }
    // Update the entry
    const result = await foodFeedbackLabelEntryHelper.updateFoodFeedbackLabelEntry(foodId, profile.id, labelEntries, label[0]?.foods_feedbacks_labels_id, likeStats, selectedCanteen.id, offerId);
    dispatch({ type: result ? UPDATE_OWN_FOOD_FEEDBACK_LABEL_ENTRIES_LOCAL : DELETE_OWN_FOOD_FEEDBACK_LABEL_ENTRIES_LOCAL, payload: result ? result : labelData.id });
  };

  // Destructure label data for easier access in JSX
  const { like, dislike } = labelData;

  return (
    <View style={styles.row}>
      <View style={styles.col}>
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={styles.icon}
            contentFit="cover"
            cachePolicy="memory-disk"
            transition={500}
          />
        )}
        {icon && getIconComponent(icon, theme.screen.icon)}
        <Text
          style={[
            styles.label,
            {
              color: theme.screen.text,
              fontSize: isWeb ? 18 : 14,
            },
          ]}
        >
          {getTextFromTranslation(label)}
        </Text>
      </View>
      <View style={styles.col2}>
        <TouchableOpacity style={styles.likeButton} onPress={() => handleUpdateEntry(true)}>
          <MaterialCommunityIcons
            name={like ? 'thumb-up' : 'thumb-up-outline'}
            size={isWeb ? 24 : 22}
            color={like ? theme.primary : theme.screen.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dislikeButton} onPress={() => handleUpdateEntry(false)}>
          <MaterialCommunityIcons
            name={like === false ? 'thumb-down' : 'thumb-down-outline'}
            size={isWeb ? 24 : 22}
            color={like === false ? theme.primary : theme.screen.icon}
          />
        </TouchableOpacity>
      </View>
      <PermissionModal
        isVisible={warning}
        setIsVisible={setWarning}
      />
    </View>
  );
};

export default FeedbackLabel;
