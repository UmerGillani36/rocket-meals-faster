import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import styles from './styles';
import { useTheme } from '@/hooks/useTheme';
import { isWeb } from '@/constants/Constants';
import { HoursSheetProps } from './types';

const HourSheet: React.FC<HoursSheetProps> = ({ closeSheet }) => {
  const { theme } = useTheme();
  const { selectedCanteen, businessHours } = useSelector((state: any) => state.canteenReducer);

  // Fetch the business hour data for the selected canteen
  const businessHour = businessHours.find((hour: any) => hour.id === selectedCanteen.foodservice_hours[0]?.businesshours_id);

  // If businessHour is not available, return an empty or default view.
  if (!businessHour) {
    return (
      <BottomSheetScrollView style={{ ...styles.sheetView, backgroundColor: theme.sheet.sheetBg }}>
        <View style={styles.contentContainer}>
          <Text style={{ ...styles.body, color: theme.screen.text }}>No business hours available.</Text>
        </View>
      </BottomSheetScrollView>
    );
  }

  // Helper function to format the time in 'HH:mm' format (without seconds)
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  // Helper function to format day-time strings
  const formatDayTime = (day: string, start: string, end: string) => {
    return businessHour[day] ? `${formatTime(start)} - ${formatTime(end)}` : 'Closed';
  };

  // Days of the week
  const daysOfWeek = [
    { name: 'Monday', key: 'monday' },
    { name: 'Tuesday', key: 'tuesday' },
    { name: 'Wednesday', key: 'wednesday' },
    { name: 'Thursday', key: 'thursday' },
    { name: 'Friday', key: 'friday' },
    { name: 'Saturday', key: 'saturday' },
    { name: 'Sunday', key: 'sunday' },
  ];

  return (
    <BottomSheetScrollView
      style={{ ...styles.sheetView, backgroundColor: theme.sheet.sheetBg }}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={{ ...styles.sheetHeader, paddingRight: isWeb ? 10 : 0, paddingTop: isWeb ? 10 : 0 }}>
        <View />
        <Text style={{ ...styles.sheetHeading, fontSize: isWeb ? 40 : 28, color: theme.sheet.text }}>
          Opening Hours
        </Text>
        <TouchableOpacity
          style={{ ...styles.sheetcloseButton, backgroundColor: theme.sheet.closeBg }}
          onPress={closeSheet}
        >
          <AntDesign name="close" size={24} color={theme.sheet.closeIcon} />
        </TouchableOpacity>
      </View>

      <View style={{ ...styles.hoursContainer, width: isWeb ? '90%' : '100%' }}>
        <Text style={{ ...styles.hoursHeading, color: theme.sheet.text }}>Food Service Hours</Text>

        {daysOfWeek.map((day) => {
          const isClosed = businessHour[day.key] ? theme.screen.text : theme.accent;
          const timeDisplay = formatDayTime(day.key, businessHour.time_start, businessHour.time_end);
          return (
            <View key={day.key} style={styles.row}>
              <Text style={{ ...styles.body, color: theme.screen.text }}>{day.name}</Text>
              <Text style={{ ...styles.body, color: isClosed }}>{timeDisplay}</Text>
            </View>
          );
        })}
      </View>
    </BottomSheetScrollView>
  );
};

export default HourSheet;
