import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { isWeb } from '@/constants/Constants';
import { excerpt } from '@/constants/HelperFunctions';
import { useTheme } from '@/hooks/useTheme';
import { useSelector } from 'react-redux';
import styles from './styles';
import { BuildingItemProps } from './types';
import { router } from 'expo-router';

const BuildingItem: React.FC<BuildingItemProps> = ({
  id,
  imageUrl,
  distance,
  campusName,
  handleNavigation,
}) => {
  const { theme } = useTheme();

  const { isManagement } = useSelector((state: any) => state.authReducer);

  return (
    <TouchableOpacity
      style={{
        ...styles.card,
        width: isWeb ? 250 : '48%',
        height: isWeb ? 300 : 250,
        backgroundColor: theme.card.background,
      }}
      onPress={handleNavigation}
      key={id}
    >
      <View
        style={{
          ...styles.imageContainer,
          height: isWeb ? 250 : '80%',
        }}
      >
        <Image
          style={styles.image}
          source={{ uri: imageUrl }}
          // contentFit='cover'
          // placeholder={{ blurhash }}
          // cachePolicy={'memory-disk'}
          // transition={500}
        />

        <View style={styles.imageActionContainer}>
          {isManagement ? (
            <TouchableOpacity
              style={styles.editImageButton}
              // onPress={() => {
              //   setSelectedFoodId(item.id);
              //   handleImageSheet();
              // }}
            >
              <MaterialCommunityIcons
                name='image-edit'
                size={20}
                color={'white'}
              />
            </TouchableOpacity>
          ) : (
            <View />
          )}
          <TouchableOpacity
            style={{
              ...styles.directionButton,
              backgroundColor: theme.primary,
            }}
          >
            <MaterialCommunityIcons
              name='map-marker-distance'
              size={20}
              color={'black'}
            />
            <Text style={{ ...styles.distance, color: 'black' }}>
              {`${distance} m`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          ...styles.cardContent,
          paddingHorizontal: isWeb ? 20 : 10,
        }}
      >
        <Text style={{ ...styles.campusName, color: theme.screen.text }}>
          {isWeb ? excerpt(campusName, 18) : excerpt(campusName, 12)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(BuildingItem);
