import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    height: "auto",
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
    fontSize: 36,
    fontFamily: 'Poppins_700Bold',
  },
  modalSubHeading: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',

  },

  loginButton: {
    width: '80%',
    height: 60,
    backgroundColor: '#FCDE31',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 20,
  },
  loginLabel: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: '#2E2E2E',
  },

});