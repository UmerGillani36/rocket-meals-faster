import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    height: 350,
    borderRadius: 40,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    width: '100%',
    alignItems: 'flex-end',
  },
  closeButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeading: {
    fontFamily: 'Poppins_700Bold',
  },
  modalSubHeading: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  loginButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#FCDE31',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 40,
  },
  loginLabel: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: '#2E2E2E',
  },
});
