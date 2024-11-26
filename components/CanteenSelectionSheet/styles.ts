import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  sheetView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    padding: 10,
  },
  sheetHeader: {
    width: '100%',
    alignItems: 'flex-end',
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
  },
  sheetcloseButton: {
    width: 45,
    height: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetHeading: {
    fontFamily: 'Poppins_700Bold',
  },
  canteensContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: 20,
  },
  card: {
    borderRadius: 18,
  },
  imageContainer: {
    width: '100%',
    height: '80%',
    borderRadius: 18,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    resizeMode: 'cover',
  },
  canteenName: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    marginTop: 5,
  },
});
