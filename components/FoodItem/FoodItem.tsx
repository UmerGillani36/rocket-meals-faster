import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styles from './styles';
import { isWeb } from '@/constants/Constants';
import { useTheme } from '@/context/ThemeContext';
import { AntDesign } from '@expo/vector-icons';
import { FoodItemProps } from './types';

const FoodItem: React.FC<FoodItemProps> = ({ item, handleNavigation }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={{
        ...styles.card,
        width: isWeb ? 250 : '48%',
        height: isWeb ? 300 : 250,
        backgroundColor: theme.card.background,
      }}
      key={item.id}
      onPress={handleNavigation}
    >
      <View
        style={{
          ...styles.imageContainer,
          height: isWeb ? '70%' : '70%',
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri: item.image,
          }}
        />
        <View style={styles.overlay} />
        <TouchableOpacity style={styles.favContainer}>
          {/* <AntDesign name='hearto' size={20} color={'white'} /> */}
          <AntDesign name='heart' size={20} color={'red'} />
        </TouchableOpacity>
        <View style={styles.categoriesContainer}>
          <TouchableOpacity>
            <Image source={{ uri: item.logo }} style={styles.categoryLogo} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={{ uri: item.logo }} style={styles.categoryLogo} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={{ uri: item.logo }} style={styles.categoryLogo} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          ...styles.cardContent,
          gap: isWeb ? 15 : 5,
          paddingHorizontal: isWeb ? 20 : 10,
        }}
      >
        <Text style={{ ...styles.foodName, color: theme.card.text }}>
          {item.foodName}
        </Text>
        <TouchableOpacity style={{ ...styles.priceButton }}>
          <Text style={{ ...styles.price, color: 'black' }}>{item.price}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default FoodItem;
