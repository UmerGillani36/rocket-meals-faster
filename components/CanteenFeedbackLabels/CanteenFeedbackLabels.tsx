import React, { useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import styles from './styles';
import { CanteenFeedbackLabelProps } from './types';
import { isWeb } from '@/constants/Constants';
import { Image } from 'expo-image';
import {
    getIconComponent,
    getTextFromTranslation,
} from '@/helper/resourceHelper';
import { CanteensFeedbacksLabelsEntries, FoodsFeedbacksLabelsEntries } from '@/constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_OWN_CANTEEN_FEEDBACK_LABEL_ENTRIES, UPDATE_OWN_CANTEEN_FEEDBACK_LABEL_ENTRIES } from '@/redux/Types/types';
import PermissionModal from '../PermissionModal/PermissionModal';
import { getImageUrl } from '@/constants/HelperFunctions';
import { CanteenFeedbackLabelEntryHelper } from '@/redux/actions/CanteenFeedbackLabelEntries/CanteenFeedbackLabelEntries';
import { isSameDay } from 'date-fns';

const CanteenFeedbackLabels: React.FC<CanteenFeedbackLabelProps> = ({
    label,
    date,
}) => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const canteenFeedbackLabelEntryHelper = new CanteenFeedbackLabelEntryHelper();
    const [warning, setWarning] = useState(false);
    const [count, setCount] = useState({ likes: 0, dislikes: 0 });
    const { user, profile } = useSelector((state: any) => state.authReducer);
    const { selectedCanteen, ownCanteenFeedBackLabelEntries } = useSelector((state: any) => state.canteenReducer);

    // Use useMemo to optimize the filtering processs
    const labelData = useMemo(() => {
      return (
        ownCanteenFeedBackLabelEntries?.find(
          (entry: CanteensFeedbacksLabelsEntries) =>
            entry.label === label?.id &&
            entry.canteen === selectedCanteen.id &&
            isSameDay(entry.date, date)
        ) || ({} as FoodsFeedbacksLabelsEntries)
      );
    }, [ownCanteenFeedBackLabelEntries, date]);

    // Function to handle updating the entry
    const handleUpdateEntry = async (isLike: boolean | null) => {
      if (!user?.id) {
        setWarning(true);
        return;
      }
      let likeStats = null;
      if (isLike === true && labelData?.like === true) {
        likeStats = null;
      } else if (isLike === false && labelData?.like === false) {
        likeStats = null;
      } else {
        likeStats = isLike;
      }
      // Update the entry
      const result =
        await canteenFeedbackLabelEntryHelper.updateCanteenFeedbackLabelEntry(
          profile.id,
          ownCanteenFeedBackLabelEntries,
          label?.id,
          likeStats,
          selectedCanteen.id,
          date
        );
      getLabelEntries(label?.id);
      dispatch({
        type: result
          ? UPDATE_OWN_CANTEEN_FEEDBACK_LABEL_ENTRIES
          : DELETE_OWN_CANTEEN_FEEDBACK_LABEL_ENTRIES,
        payload: result ? result : labelData.id,
      });
    };

    const getLabelEntries = async (labelId: string) => {
      // Fetch the label entriess
      const result =
        (await canteenFeedbackLabelEntryHelper.fetchCanteenFeedbackLabelEntries(
          {},
          date,
          selectedCanteen.id,
          labelId
        )) as any;
      if (result) {
        const likes =
          result?.find(
            (entry: CanteensFeedbacksLabelsEntries) => entry.like === true
          )?.count || 0;
        const dislikes =
          result?.find(
            (entry: CanteensFeedbacksLabelsEntries) => entry.like === false
          )?.count || 0;
        setCount({ likes, dislikes });
      }
    };

    useEffect(() => {
        if (label?.id) {
            getLabelEntries(label?.id);
        }
    }, [label?.id, date]);

    // Destructure label data for easier access in JSXs
    //   const { like, dislike } = labelData;
    // const like = false;

    return (
        <View style={styles.row}>
            <View style={styles.col}>
                {
                    label?.image_remote_url || label?.image ?
                        <Image
                            source={{ uri: label?.image_remote_url || getImageUrl(label?.image) || '' }}
                            style={styles.icon}
                            contentFit="cover"
                            cachePolicy="memory-disk"
                            transition={500}
                        />
                        :
                        label?.icon && getIconComponent(label?.icon, theme.screen.icon)
                }
                <Text
                    style={[
                        styles.label,
                        {
                            color: theme.screen.text,
                            fontSize: isWeb ? 18 : 14,
                            marginTop: 2,
                        },
                    ]}
                >
                    {getTextFromTranslation(label?.translations)}
                </Text>
            </View>
            <View style={styles.col2}>
                <TouchableOpacity style={styles.likeButton} onPress={() => handleUpdateEntry(true)}>
                    <MaterialCommunityIcons
                        name={labelData?.like ? 'thumb-up' : 'thumb-up-outline'}
                        size={isWeb ? 24 : 22}
                        color={labelData?.like ? theme.primary : theme.screen.icon}
                    />
                    {
                        count?.likes > 0 &&
                        <Text style={[styles.count, { color: theme.screen.text }]}>{count.likes}</Text>
                    }
                </TouchableOpacity>

                <TouchableOpacity style={styles.dislikeButton} onPress={() => handleUpdateEntry(false)}>
                    <MaterialCommunityIcons
                        name={labelData?.like === false ? 'thumb-down' : 'thumb-down-outline'}
                        size={isWeb ? 24 : 22}
                        color={labelData?.like === false ? theme.primary : theme.screen.icon}
                    />
                    {
                        count?.dislikes > 0 &&
                        <Text style={[styles.count, { color: theme.screen.text }]}>{count.dislikes}</Text>
                    }
                </TouchableOpacity>
            </View>
            <PermissionModal
                isVisible={warning}
                setIsVisible={setWarning}
            />
        </View>
    );
};

export default CanteenFeedbackLabels;
