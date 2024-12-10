import { Linking, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import styles from './styles';
import { useTheme } from '@/hooks/useTheme';
import FeedbackLabel from '../FeedbackLabel';
import RedirectButton from '../RedirectButton';
import { FoodoffersMarkings, Foods, FoodsMarkings, Markings } from '@/constants/types';
import { studentUnionUrl } from '@/constants/Constants';
import MarkingLabels from '../MarkingLabels/MarkingLabels';
import { useSelector } from 'react-redux';
import { getFoodOffer } from '@/constants/HelperFunctions';

const Labels = ({ _, offerId }) => {
  const { theme } = useTheme();
  const foodOffer = useSelector((state: any) =>
    getFoodOffer(state.canteenReducer.selectedCanteenFoodOffers, offerId)
  );

  const handleRedirect = () => {
    // Redirect to Studentenwerk Osnabrueck
    Linking.openURL(studentUnionUrl).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.heading, color: theme.screen.text }}>
        Labels
      </Text>
      {foodOffer?.markings?.map((marking: FoodoffersMarkings) => {
        return (
          <MarkingLabels
            key={marking?.id}
            markingId={marking.markings_id}
          />
        );
      })}

      <Text style={{ ...styles.body, color: theme.screen.text, fontStyle: 'italic' }}>
        The food labeling data is based on available information and may vary.
        We strive for a correct filter in the app, but technical problems cannot
        be ruled out. The awards on site apply. Further information on the data
        can be found here:
      </Text>
      <RedirectButton
        type={'link'}
        onClick={handleRedirect}
        label='Studentenwerk Osnabrueck'
        backgroundColor={theme.primary}
        color={'#FFF'}
      />
    </View>
  );
};

export default Labels;
