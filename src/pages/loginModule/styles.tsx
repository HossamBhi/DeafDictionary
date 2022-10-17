import {StyleSheet} from 'react-native';
import {ROBOTO_REGULAR} from '../../utils/schema';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
    paddingBottom: 40,
    paddingHorizontal: 30,
  },
  pageHeader: {
    textAlign: 'center',
    fontSize: 36,
    paddingBottom: 35,
    paddingTop: 20,
    // backgroundColor: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CFD0D1',
    marginTop: 15,
    marginBottom: 0,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 12,
    fontFamily: ROBOTO_REGULAR,
  },
  socialText: {
    color: '#C1C0C0',
    fontSize: 16,
    paddingBottom: 20,
    textAlign: 'center',
    fontFamily: ROBOTO_REGULAR,
    paddingTop: 24,
  },
  button: {borderRadius: 4, marginTop: 40, paddingHorizontal: 25},
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: ROBOTO_REGULAR,
    paddingVertical: 10,
  },
  footerInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 15,
  },
  errorMessage: {
    borderColor: '#DC484B',
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginTop: 5,
    marginBottom: 5,
  },
});
