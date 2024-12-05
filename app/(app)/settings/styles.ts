import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 40,
    alignItems: 'center',
  },
  settingContainer: {
    flex: 1,
    gap: 10,
  },
  list: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
  },
  termList: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 10,
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  termRow: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  termRow2: {
    width: '100%',
    alignItems: 'flex-end',
    gap: 10,
  },
  label: {
    fontFamily: 'Poppins_700Bold',
  },
  value: {
    fontFamily: 'Poppins_400Regular',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});
