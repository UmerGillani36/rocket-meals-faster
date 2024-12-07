import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { isWeb } from '@/constants/Constants';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import styles from './styles';
import { EatingHabitsSheetProps } from './types';
import MarkingLabels from '../MarkingLabels/MarkingLabels';
import { useSelector } from 'react-redux';

const EatingHabitsSheet: React.FC<EatingHabitsSheetProps> = ({
  closeSheet,
}) => {
  const { theme } = useTheme();
  const { selectedFoodMarkings } = useSelector((state: any) => state.food);
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
          Eating Habits
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
      <View style={styles.eatingHabitsList}>
        {
          selectedFoodMarkings?.map((marking: any, index: number) => (
            <View key={index}>
              <MarkingLabels
                key={index}
                markingId={marking.markings_id}
              />
              <View style={styles.divider} />
            </View>
          ))
        }
        {/* <MarkingLabels
          markingId='b1a02dc4-b3a4-4459-ad28-77d66fb084c7'
          key={'b1a02dc4-b3a4-4459-ad28-77d66fb084c7'}
        />
        <View style={styles.divider} />
        <MarkingLabels
          markingId='b1a02dc4-b3a4-4459-ad28-77d66fb084c7'
          key={'b1a02dc4-b3a4-4459-ad28-77d66fb084c7'}
        /> */}
        <View style={styles.divider} />
      </View>
    </BottomSheetScrollView>
  );
};

export default EatingHabitsSheet;
