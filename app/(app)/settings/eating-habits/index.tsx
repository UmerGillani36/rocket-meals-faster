import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import styles from './styles';
import { useTheme } from '@/hooks/useTheme';
import { isWeb } from '@/constants/Constants';
import { Image } from 'expo-image';
import RedirectButton from '@/components/RedirectButton';
import FeedbackLabel from '@/components/FeedbackLabel';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import MarkingLabels from '@/components/MarkingLabels/MarkingLabels';
import { FoodoffersMarkings } from '@/constants/types';

const index = () => {
  const { theme } = useTheme();
  const { markings } = useSelector((state: any) => state.food);

  return (
    <ScrollView
      style={{ ...styles.container, backgroundColor: theme.screen.background }}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.gifContainer}>
        <Image
          source={require('@/assets/gifs/price.gif')}
          style={styles.gif}
          transition={1000}
        />
      </View>
      <View
        style={{
          ...styles.eatingHabitsContainer,
          width: isWeb ? '80%' : '100%',
        }}
      >
        <Text style={{ ...styles.body1, color: theme.screen.text }}>
          Tell us which eating habits you prefer or want to avoid. We will then
          sort and mark the meal offers for you. We can use this information to
          improve our offer. Your data will not be passed on to third parties.
        </Text>
        <Text style={{ ...styles.body2, color: theme.screen.text }}>
          The food labeling data is based on available information and may vary.
          We strive for a correct filter in the app, but technical problems
          cannot be ruled out. The awards on site apply. Further information on
          the data can be found here:
        </Text>
        <RedirectButton
          type={'link'}
          label='Studentenwerk Osnabrueck'
          backgroundColor='#FCDE31'
          color={'#000000'}
        />
        <View style={styles.feedbackLabelsContainer}>
          {markings?.map((marking: FoodoffersMarkings) => {
            return (
              <MarkingLabels
                key={marking?.id}
                markingId={marking?.id}
              />
            );
          })}
          {/* <FeedbackLabel
            label='Flavor'
            icon={
              <FontAwesome5
                name='apple-alt'
                size={isWeb ? 24 : 22}
                color={theme.screen.icon}
              />
            }
          /> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default index;
