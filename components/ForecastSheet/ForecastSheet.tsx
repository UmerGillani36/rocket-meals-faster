import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import styles from './styles';
import { isWeb } from '@/constants/Constants';
import { AntDesign } from '@expo/vector-icons';
import { ForecastSheetProps } from './types';
import { BarChart } from 'react-native-chart-kit';
import { format, parseISO } from 'date-fns';
import { UtilizationEntryHelper } from '@/redux/actions/UtilizationEntries/UtilizationEntries';
import { useSelector } from 'react-redux';

const ForecastSheet: React.FC<ForecastSheetProps> = ({ closeSheet }) => {
  const { theme } = useTheme();
  const utilizationEntryHelper = new UtilizationEntryHelper();
  const { selectedCanteen } = useSelector((state: any) => state.canteenReducer);

  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [{ data: [] }],
  });

  const processData = (data: any) => {
    const intervals = [];
    for (let i = 0; i < 24; i++) {
      intervals.push(`${i}:00`, `${i}:15`, `${i}:30`, `${i}:45`);
    }

    const chartData = intervals.map((label) => {
      const matchingData = data?.find((entry: any) => {
        const start = format(parseISO(entry.date_start), 'H:mm');
        return start === label;
      });
      return matchingData
        ? matchingData.value_real ?? matchingData.value_forecast_current ?? 0
        : 0;
    });

    return { labels: intervals, datasets: [{ data: chartData }] };
  };

  const getUtilization = async () => {
    try {
      const utilizationData =
        await utilizationEntryHelper.fetchUtilizationEntries(
          {},
          selectedCanteen?.utilization_group,
          new Date().toISOString()
        );

      const processedData = processData(utilizationData);
      setChartData(processedData);
    } catch (error) {
      console.error('Error fetching utilization data:', error);
    }
  };

  useEffect(() => {
    if (selectedCanteen) {
      getUtilization();
    }
  }, [selectedCanteen]);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: () => theme.primary,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };
  return (
    <BottomSheetView
      style={{ ...styles.container, backgroundColor: theme.sheet.sheetBg }}
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
          Forecast
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={styles.forecastContainer}
        nestedScrollEnabled
        contentContainerStyle={{
          paddingHorizontal: isWeb ? 20 : 10,
          width: chartData
            ? Math.max(
              chartData.labels.length * 50,
              Dimensions.get('window').width
            )
            : Dimensions.get('window').width,
          alignItems: 'center',
          marginTop: chartData ? 40 : 0,
        }}
      >
        {chartData ? (
          <BarChart
            style={styles.graphStyle}
            data={chartData}
            width={Math.max(
              chartData.labels.length * 50,
              Dimensions.get('window').width
            )}
            height={400}
            // yAxisLabel='$'
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        ) : (
          <View style={{ width: '100%', alignItems: 'center' }}>
            <ActivityIndicator size={40} color={theme.screen.icon} />
          </View>
        )}
      </ScrollView>
    </BottomSheetView>
  );
};

export default ForecastSheet;
