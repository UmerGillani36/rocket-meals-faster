import { StyleSheet } from "react-native";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  webContainer: {
    width: '45%',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  webTitleContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontFamily: 'Poppins_700Bold',
  },
  subTitle: {
    textAlign: 'center',
    fontFamily: 'Poppins_200ExtraLight',
  },
  webBody: {
    width: '80%',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
