import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  sheetView: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    padding: 10,
    paddingBottom: 0,
  },
  contentContainer: {
    alignItems: 'center',
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
    paddingBottom: 20,
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
  // canteenName: {
  //   fontSize: 18,
  //   fontFamily: 'Poppins_700Bold',
  //   marginTop: 10,
  // },
  foodName: {
    fontSize: 16, // Adjust as needed
    fontFamily: 'Poppins_700Bold',
    lineHeight: 22, // Ensure enough space between lines
    paddingBottom: 2, // Add a little padding to prevent clipping
    overflow: 'hidden', // Ensures no part of the text overflows its container
    textAlign: 'center',
    marginTop: 5,

  },

});
