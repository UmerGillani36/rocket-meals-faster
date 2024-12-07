import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import styles from './styles';
import { isWeb } from '@/constants/Constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const details = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('information');

  const renderContent = () => {
    switch (activeTab) {
      case 'feedbacks':
        return (
          <View>
            <Text>Information</Text>
          </View>
        );
      case 'details':
        return (
          <View>
            <Text>Description</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      style={{
        ...styles.safeAreaContainer,
        backgroundColor: theme.screen.background,
      }}
    >
      <ScrollView
        style={{
          ...styles.container,
          backgroundColor: theme.screen.background,
        }}
        contentContainerStyle={styles.contentContainer}
      >
        <View
          style={{ ...styles.bulidingContainer, width: isWeb ? '80%' : '100%' }}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1534655610770-dd69616f05ff',
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text
              style={{ ...styles.buildingHeading, color: theme.screen.text }}
            >
              Mensa Westerberg
            </Text>
            <TouchableOpacity
              style={{
                ...styles.navigationButton,
                backgroundColor: theme.screen.iconBg,
              }}
            >
              <MaterialCommunityIcons
                name='navigation-variant'
                size={24}
                color={theme.screen.icon}
              />
            </TouchableOpacity>
            <View
              style={{
                ...styles.tabViewContainer,
                width: isWeb ? '100%' : '100%',
              }}
            >
              <View
                style={{
                  ...styles.tabs,
                  width: isWeb ? '95%' : '100%',
                  gap: isWeb ? 20 : 0,
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === 'information' && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab('information')}
                >
                  <MaterialCommunityIcons
                    name='nutrition'
                    size={26}
                    color={activeTab === 'information' ? '#000000' : '#ffffff'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === 'description' && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab('description')}
                >
                  <MaterialCommunityIcons
                    name='medical-bag'
                    size={26}
                    color={activeTab === 'description' ? '#000000' : '#ffffff'}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  ...styles.pagerView,
                  width: isWeb ? '95%' : '100%',
                  paddingHorizontal: isWeb ? 20 : 10,
                }}
              >
                {renderContent()}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default details;
