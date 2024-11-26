import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#d14610',
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#d14610',
    padding: 10,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  content: {
    padding: 20,
    backgroundColor: '#2e2e2e',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
