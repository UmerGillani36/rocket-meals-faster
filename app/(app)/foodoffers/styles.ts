import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  foodOfferContainer: {
    flex: 1,
  },
  header: {
    width: '100%',
    paddingBottom: 10,
    paddingVertical: 20,
    gap: 20,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  col1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  col2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  foodContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'stretch',
    // alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
    justifyContent: 'center'
  },
  sheetBackground: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  feebackContainer: {
    width: '100%',
    marginTop: 20,
  },
  foodLabels: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
  },
  dummy: {},
});
