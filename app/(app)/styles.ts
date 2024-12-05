import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  sheetHeading: {
    fontSize: 26,
    fontFamily: 'Poppins_400Regular',
  },
  canteensContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: 20,
    marginTop: 20,
  },
  card: {
    borderRadius: 18,
  },
  imageContainer: {
    width: '100%',
    height: '75%',
    borderRadius: 18,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    resizeMode: 'cover',
  },
  canteenName: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    marginTop: 5,
  },
});
