import { SafeAreaView, ScrollView, View } from 'react-native';
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import styles from './styles';
import { isWeb } from '@/constants/Constants';
import NewsItem from '@/components/NewsItem/NewsItem';

const index = () => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.screen.background }}>
      <ScrollView
        style={{
          ...styles.newsContainer,
          backgroundColor: theme.screen.background,
        }}
        contentContainerStyle={{
          ...styles.newsContentContainer,
          paddingHorizontal: isWeb ? 30 : 5,
        }}
      >
        <View style={styles.newsListContainer}>
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
