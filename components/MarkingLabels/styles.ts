import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  col: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  col2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    borderRadius: 25,
  },
  label: {
    fontFamily: 'Poppins_400Regular',
  },
  dislikeButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#2E2E2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shortCode: {
    width: 25,
    height: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#2E2E2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
});