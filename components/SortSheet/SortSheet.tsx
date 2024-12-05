import { Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import styles from './styles';
import { useTheme } from '@/hooks/useTheme';
import { isWeb } from '@/constants/Constants';
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import { SortSheetProps } from './types';
import Checkbox from 'expo-checkbox';

const SortSheet: React.FC<SortSheetProps> = ({ closeSheet }) => {
  const { theme } = useTheme();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const sortingOptions = [
    {
      id: 'intelligent',
      label: 'Intelligent',
      icon: <MaterialCommunityIcons name='brain' size={24} />,
    },
    {
      id: 'favorite',
      label: 'Favorite',
      icon: <AntDesign name='heart' size={24} />,
    },
    {
      id: 'eating',
      label: 'Eating Habits',
      icon: <Ionicons name='bag-add' size={24} />,
    },
    {
      id: 'rating',
      label: 'Public Rating',
      icon: <AntDesign name='star' size={24} />,
    },
    {
      id: 'alphabetical',
      label: 'Alphabetical',
      icon: <FontAwesome5 name='sort-alpha-down' size={24} />,
    },
    {
      id: 'none',
      label: 'None',
      icon: <MaterialCommunityIcons name='sort-variant-remove' size={24} />,
    },
  ];

  return (
    <BottomSheetScrollView
      style={{ ...styles.sheetView, backgroundColor: theme.sheet.sheetBg }}
      contentContainerStyle={styles.contentContainer}
    >
      <View
        style={{
          ...styles.sheetHeader,
          paddingRight: isWeb ? 10 : 0,
          paddingTop: isWeb ? 10 : 0,
        }}
      >
        <View />
        <Text
          style={{
            ...styles.sheetHeading,
            fontSize: isWeb ? 40 : 28,
            color: theme.sheet.text,
          }}
        >
          Sort
        </Text>
        <TouchableOpacity
          style={{
            ...styles.sheetcloseButton,
            backgroundColor: theme.sheet.closeBg,
          }}
          onPress={closeSheet}
        >
          <AntDesign name='close' size={24} color={theme.sheet.closeIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.sortingListContainer}>
        {sortingOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.actionItem,
              selectedOption === option.id && {
                backgroundColor: theme.primary,
              },
            ]}
            onPress={() => setSelectedOption(option.id)}
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
              onValueChange={() => setSelectedOption(option.id)} // Toggle option
              color={selectedOption === option.id ? '#000000' : undefined}
            />
          </TouchableOpacity>
        ))}
      </View>
    </BottomSheetScrollView>
  );
};

export default SortSheet;
