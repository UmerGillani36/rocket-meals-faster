import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styles from './styles';
import { isWeb } from '@/constants/Constants';
import { FontAwesome6 } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';

const NewsItem = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        ...styles.card,
        flexDirection: isWeb ? 'row' : 'column',
        backgroundColor: theme.screen.iconBg,
      }}
    >
      <View
        style={{
          ...styles.imageContainer,
          width: isWeb ? '20%' : '100%',
          height: isWeb ? 220 : 180,
        }}
      >
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1495020689067-958852a7765e',
          }}
          style={styles.image}
        />
      </View>
      <View
        style={{
          width: isWeb ? '79%' : '100%',
          justifyContent: isWeb ? 'space-between' : 'flex-start',
          padding: isWeb ? 10 : 0,
        }}
      >
        <View
          style={{
            width: '100%',
          }}
        >
          <View
            style={{
              ...styles.newsHeader,
              marginTop: isWeb ? 10 : 5,
              marginBottom: 10,
            }}
          >
            <Text style={{ ...styles.newsHeading, color: theme.screen.text }}>
              Now we have the salad!
            </Text>
            <Text style={{ ...styles.newsDate, color: theme.screen.text }}>
              22.09.2024
            </Text>
          </View>
          <Text style={{ ...styles.newsBody, color: theme.screen.text }}>
            Welcome to the healthy enjoyment week salad workshop from June 10 to
            13 in your canteen. . .
          </Text>
        </View>
        <View
          style={{
            ...styles.actionContainer,
            alignItems: isWeb ? 'flex-end' : 'center',
          }}
        >
          <TouchableOpacity
            style={{
              ...styles.readMoreButton,
              backgroundColor: theme.primary,
              width: isWeb ? 200 : '100%',
            }}
          >
            <Text style={styles.readMore}>Read More</Text>
            <FontAwesome6 name='arrow-up-right-from-square' size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NewsItem;
