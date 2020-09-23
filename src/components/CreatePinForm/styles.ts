import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F9FBFE',
    width,
  },
  header: {
    height: 0.2 * height,
    width,
    paddingTop: '15%',
  },
  headerText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#6379F4',
    alignSelf: 'center',
  },
  formContainer: {
    height: 0.8 * height,
    width,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 59,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  subTitleText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(58, 61, 66, 0.6)',
    textAlign: 'center',
    marginBottom: 50,
    marginLeft: 20,
    marginRight: 20,
  },
  inputContainerStyle: {
    borderBottomColor: '#6379F4',
  },
  inputStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3A3D42',
  },
  forgotPassword: {
    color: 'rgba(58, 61, 66, 0.8)',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
  },
  confirmButton: {
    height: 57,
    borderRadius: 12,
    backgroundColor: '#6379F4',
    marginTop: 233,
    marginBottom: 64,
  },
  LoginButton: {
    height: 57,
    borderRadius: 12,
    backgroundColor: '#6379F4',
    marginTop: 70,
    marginBottom: 64,
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(58, 61, 66, 0.6)',
    textAlign: 'center',
    alignSelf: 'center',
  },
  signUpButton: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6379F4',
  },
  errorMessageText: {
    marginTop: 20,
    color: '#FF5B37',
    fontSize: 16,
    textAlign: 'center',
  },
  errorMessage: {
    color: '#FF5B37',
  },
  pinContainerStyle: {
    alignSelf: 'center',
  },
  pinCell: {
    width: 47,
    height: 58,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(169, 169, 169, 0.6)',
  },
  pinCellFocused: {
    width: 47,
    height: 58,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6379F4',
  },
  pinText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3A3D42',
  },
  pinTextFocused: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3A3D42',
    borderBottomWidth: 1,
    borderColor: 'rgba(169, 169, 169, 0.4)',
  },
  checklistIcon: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    marginTop: 40,
  },
});

export default styles;
