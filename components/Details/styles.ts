import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 26,
    fontFamily: 'Poppins_700Bold',
    marginVertical: 20,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  nutritionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginVertical: 20,
    gap: 10,
  },
  nutrition: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
  },
  averageNutrition: {},
  label: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  body: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  body1: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    marginTop: 40,
  },
});
