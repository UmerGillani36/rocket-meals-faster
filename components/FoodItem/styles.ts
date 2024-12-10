import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    borderRadius: 21,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  cardContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    borderRadius: 18,
    position: 'relative',
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    // backgroundColor: 'rgba(0,0,0,0.2)',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 10,
    left: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.2)',
    // position: 'absolute',
    // top: 5,
    // left: 5,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  favContainer: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    top: 5,
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favContainerWarn: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    top: 45,
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    gap: 5,
    width: 35,
    height: 35,
    position: 'absolute',
    top: 30,
    left: 5,
    justifyContent: 'center',
    alignItems: 'center',

  },
  categoryLogo: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    // backgroundColor: 'rgba(0,0,0,0.2)',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    resizeMode: 'cover',
    borderBottomWidth: 3,
  },
  foodName: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    marginTop: 5,
  },
  priceButton: {
    width: '100%',
    height: 35,
    backgroundColor: 'white',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    marginTop: 2,
  },
  heading: {
    fontSize: 40,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
  },
  priceTag: {
    position: 'absolute',
    bottom: 10, // Distance from the bottom of the image
    right: 10, // Distance from the right of the image
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5, // Rounded corners
  },
  priceText: {
    color: '#FFF', // White text color for visibility
    fontSize: 14,
    fontWeight: 'bold',
  },

});
