import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import { useTheme } from '@/hooks/useTheme';
import { campuses, isWeb } from '@/constants/Constants';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
  DrawerContentComponentProps,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { RootDrawerParamList } from './types';
import { useNavigation } from 'expo-router';
import BuildingItem from '@/components/BuildingItem/BuildingItem';

const index: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const drawerNavigation =
    useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const [query, setQuery] = useState<string>('');

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.screen.background,
        paddingBottom: 0,
      }}
    >
      <View style={{ ...styles.container }}>
        <View
          style={{
            ...styles.header,
            backgroundColor: theme.header.background,
            paddingHorizontal: isWeb ? 20 : 10,
          }}
        >
          <View style={styles.row}>
            <View style={styles.col1}>
              <TouchableOpacity onPress={() => drawerNavigation.toggleDrawer()}>
                <Ionicons name='menu' size={24} color={theme.header.text} />
              </TouchableOpacity>
              <Text style={{ ...styles.heading, color: theme.header.text }}>
                Housing
              </Text>
            </View>
            <View style={{ ...styles.col2, gap: isWeb ? 30 : 15 }}>
              <TouchableOpacity>
                <MaterialIcons
                  name='sort'
                  size={24}
                  color={theme.header.text}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView
          style={{
            ...styles.compusContainer,
            backgroundColor: theme.screen.background,
          }}
          contentContainerStyle={{
            ...styles.compusContentContainer,
            paddingHorizontal: isWeb ? 30 : 5,
          }}
        >
          <View
            style={{ ...styles.searchContainer, width: isWeb ? '60%' : '100%' }}
          >
            <TextInput
              style={[
                styles.searchInput,
                // Platform.OS === 'web' && ({ outlineStyle: 'none' } as any),
                { color: theme.screen.text },
              ]}
              cursorColor={theme.screen.text}
              placeholderTextColor={theme.screen.placeholder}
              onChangeText={setQuery}
              value={query}
              placeholder='Search campus here...'
            />
          </View>
          <View style={{ ...styles.campusContainer, gap: isWeb ? 40 : 10 }}>
            {campuses.map((campus) => (
              <BuildingItem
                key={campus.id}
                id={campus.id}
                imageUrl={campus.imageUrl}
                distance={campus.distance}
                campusName={campus.campusName}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default index;
