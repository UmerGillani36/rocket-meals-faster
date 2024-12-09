import React, { useState, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'expo-image';
import { MarkingLabelProps } from './types';
import { getImageUrl } from '@/constants/HelperFunctions';

import { ProfileHelper } from '@/redux/actions/Profile/Profile';
import { UPDATE_PROFILE } from '@/redux/Types/types';
import PermissionModal from '../PermissionModal/PermissionModal';
import { useTheme } from '@/hooks/useTheme';
import { isWeb } from '@/constants/Constants';
import styles from './styles';
import { getTextFromTranslation } from '@/helper/resourceHelper';
import { Profiles } from '@/constants/types';

const MarkingLabels: React.FC<MarkingLabelProps> = ({ markingId }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const profileHelper = new ProfileHelper();
  const [warning, setWarning] = useState(false);

  // Destructure and memoize selectors
  const { user, profile } = useSelector((state: any) => state.authReducer);
  const { markings } = useSelector((state: any) => state.food);
  const marking = markings.find((mark: any) => mark.id === markingId);
  const ownMarking = profile?.markings?.find((mark: any) => mark.markings_id === markingId);

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

  // Handle update for liking/unliking the marking
  const handleUpdateMarking = useCallback(async (like: boolean) => {
    if (!user?.id) {
      setWarning(true);
      return;
    }

    try {
      const likeStats = ownMarking?.like === like ? null : like;
      const updatedMarking = { ...ownMarking, like: likeStats };

      const profileData = { ...profile };
      let markingFound = false;

      // Update or remove marking in the profile
      profileData?.markings.forEach((profileMarkings: any, index: number) => {
        if (profileMarkings.markings_id === updatedMarking?.markings_id) {
          markingFound = true;
          if (updatedMarking?.like === null) {
            profileData.markings.splice(index, 1);  // Remove if unliked
          } else {
            profileData.markings[index] = updatedMarking;  // Update like status
          }
        }
      });

      // If the marking doesn't exist, add it
      if (!markingFound) {
        profileData.markings.push({ ...updatedMarking, markings_id: markingId, profiles_id: profileData?.id });
      }

      dispatch({ type: UPDATE_PROFILE, payload: profileData });

      // Update profile on the server
      const result = await profileHelper.updateProfile(profileData);
      if (result) {
        fetchProfile();
      }
    } catch (error) {
      console.error('Error updating marking:', error);
    }
  }, [user?.id, profile, ownMarking, markingId, dispatch, profileHelper, fetchProfile]);

  if (!marking) return null;  // Early return if the marking doesn't exist

  const markingImage = marking?.image_remote_url ?
    { uri: marking?.image_remote_url } :
    { uri: getImageUrl(marking?.image) };

  const markingText = getTextFromTranslation(marking?.translations);
  const iconSize = isWeb ? 24 : 22;

  return (
    <View style={styles.row}>
      <View style={styles.col}>
        {
          marking?.short_code ? (
            <View style={styles.shortCode}>
              <Text style={{ color: theme.screen.text, fontSize: 10 }}>
                {marking?.short_code}
              </Text>
            </View>
          ) : (
            <Image
              source={markingImage}
              style={styles.icon}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={500}
            />
          )
        }
        <Text
          style={{
            ...styles.label,
            color: theme.screen.text,
            fontSize: isWeb ? 18 : 14,
            marginTop: 2,
          }}
        >
          {markingText}
        </Text>
      </View>
      <View style={styles.col2}>
        <TouchableOpacity style={styles.likeButton} onPress={() => handleUpdateMarking(true)}>
          <MaterialCommunityIcons
            name={ownMarking?.like ? 'thumb-up' : 'thumb-up-outline'}
            size={iconSize}
            color={ownMarking?.like ? theme.primary : theme.screen.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dislikeButton} onPress={() => handleUpdateMarking(false)}>
          <MaterialCommunityIcons
            name={ownMarking?.like === false ? 'thumb-down' : 'thumb-down-outline'}
            size={iconSize}
            color={ownMarking?.like === false ? theme.primary : theme.screen.icon}
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

export default MarkingLabels;
