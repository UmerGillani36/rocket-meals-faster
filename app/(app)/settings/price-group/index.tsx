import { Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { useTheme } from '@/hooks/useTheme';
import { Image } from 'expo-image';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { isWeb } from '@/constants/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileHelper } from '@/redux/actions/Profile/Profile';
import { UPDATE_PROFILE } from '@/redux/Types/types';

const sortingOptions = [
  {
    id: 'student',
    label: 'Students',
    icon: <FontAwesome name='graduation-cap' size={24} />,
  },
  {
    id: 'employee',
    label: 'Employees',
    icon: <Ionicons name='bag' size={24} />,
  },
  {
    id: 'guest',
    label: 'Guests',
    icon: <FontAwesome5 name='users' size={24} />,
  },
];

const index = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const profileHelper = new ProfileHelper();
  const [loading, setLoading] = useState(false);
  const { profile } = useSelector((state: any) => state.authReducer);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const updatePricing = async (option: string) => {
    try {
      setLoading(true);
      setSelectedOption(option);
      const payload = { ...profile, price_group: option };
      const result = await profileHelper.updateProfile(payload);
      if (result) {
        dispatch({ type: UPDATE_PROFILE, payload });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setLoading(false);
    }

  };

  useEffect(() => {
    setSelectedOption(profile?.price_group || 'student');
  }, [profile]);

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.screen.background }}
    >
      <View style={styles.gifContainer}>
        <Image
          source={require('@/assets/gifs/price.gif')}
          style={styles.gif}
          transition={1000}
        />
      </View>
      <View
        style={{ ...styles.priceGroupContainer, width: isWeb ? '80%' : '100%' }}
      >
        {sortingOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.actionItem,
              selectedOption === option.id && {
                backgroundColor: theme.primary,
              },
            ]}
            onPress={() => updatePricing(option.id)}
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
              // onValueChange={() => updatePricing(option.id)}
              color={selectedOption === option.id ? '#000000' : undefined}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default index;
