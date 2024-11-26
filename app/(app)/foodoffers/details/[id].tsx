import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useTheme } from '@/context/ThemeContext';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { isWeb } from '@/constants/Constants';

export default function FoodDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const router = useRouter();
  console.log('Id', id);

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.screen.background }}
    >
      {isWeb ? (
        <View style={styles.featuredContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1573821663912-6df460f9c684',
              }}
              style={styles.featuredImage}
            />
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.header}>
              <View style={styles.row}>
                <Text style={{ ...styles.medium, color: theme.screen.text }}>
                  Small Portion
                </Text>
                <View style={styles.ratingView}>
                  <AntDesign name='star' size={22} color={theme.primary} />
                  <Text
                    style={{ ...styles.totalRating, color: theme.screen.text }}
                  >
                    4.7
                  </Text>
                </View>
              </View>
              <Text style={{ ...styles.foodHeading, color: theme.screen.text }}>
                Fried Potatoes
              </Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={{ ...styles.rateUs, color: theme.screen.text }}>
                Rate Us
              </Text>
              <View style={styles.stars}>
                <TouchableOpacity>
                  <AntDesign name='star' size={22} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <AntDesign name='star' size={22} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <AntDesign name='star' size={22} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <AntDesign name='staro' size={22} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <AntDesign name='staro' size={22} color={theme.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View></View>
      )}
      <View
        style={{
          ...styles.notificationContainer,
          backgroundColor: theme.drawerBg,
        }}
      >
        <Text style={{ ...styles.notificationBody, color: theme.screen.text }}>
          Get Notification on Availability
        </Text>
        {false ? (
          <TouchableOpacity
            style={{
              ...styles.bellIconAtiveContainer,
            }}
          >
            <MaterialIcons
              name='notifications'
              size={35}
              color={theme.screen.icon}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              ...styles.bellIconContainer,
              backgroundColor: theme.primary,
            }}
          >
            <MaterialIcons
              name='notifications-active'
              size={35}
              color={theme.drawerBg}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
