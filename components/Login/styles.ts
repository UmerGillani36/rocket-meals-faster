import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  picker: {
    width: 160,
    borderRadius: 8,
    borderWidth: 0,
    paddingHorizontal: 5,
  },
  loginForm: {
    width: '100%',
  },
  heading: {
    fontSize: 44,
    fontFamily: 'Poppins_700Bold',
  },
  subHeading: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  firstRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    height: 58,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  google: {
    width: '49%',
  },
  apple: {
    width: '49%',
  },
  incognito: {
    width: '100%',
    marginTop: 10,
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    marginLeft: 10,
    marginTop: 4,
  },
  managementLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  fromManagement: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    marginRight: 4,
  },
  loginText: {
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkbox: {
    marginRight: 15,
  },
  checkboxLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  link: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#696969',
  },
  divider: {
    color: '#696969',
    marginHorizontal: 10,
    marginBottom: 2,
  },
  //---------------Modal-------------------
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 600,
    height: 450,
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
  },
  input: {
    width: '80%',
    height: 60,
    borderRadius: 20,
    paddingHorizontal: 20,
    borderWidth: 0,
    borderColor: 'transparent',
    // outline: 'none',
    // outlineColor: 'transparent',
    marginTop: 20,
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
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
  // ----------------Sheet------------------
  sheetView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    padding: 15,
  },
  sheetHeader: {
    width: '100%',
    alignItems: 'flex-end',
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
  },
  attentionSheetHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
  },
  attentionContent: {
    alignItems: 'center',
  },
  attentionBody: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    marginVertical: 20,
    textAlign: 'center',
  },
  attentionActions: {
    marginTop: 10,
  },
  gifContainer: {
    width: 120,
    height: 120,
  },
  gif: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  confirmButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#FCDE31',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  cancleButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 10,
  },
  confirmLabel: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },

  sheetcloseButton: {
    width: 45,
    height: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetHeading: {
    fontSize: 26,
    fontFamily: 'Poppins_700Bold',
    marginTop: 20,
  },
  attentionSheetHeading: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    marginTop: 20,
  },
  sheetSubHeading: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 10,
  },
  sheetInput: {
    width: '100%',
    height: 52,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
  },
  sheetLoginButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#FCDE31',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 20,
  },
  sheetLoginLabel: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
});