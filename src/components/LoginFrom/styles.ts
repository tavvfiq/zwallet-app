import {Platform, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const primaryBlue = Platform.select({
  ios: '#007aff', // rgb(0, 122, 255)
  android: '#2196f3', // rgb(33, 150, 243)
});

const imageWidth = '80%';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FAFCFF',
    // height,
    width,
  },
  header: {
    height: 0.25 * height,
    width,
    paddingTop: '20%',
  },
  headerText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#6379F4',
    alignSelf: 'center',
  },
  formContainer: {
    height: 0.75 * height,
    width,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 8,
    paddingTop: 40,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 59,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    alignSelf: 'center',
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
  loginButton: {
    height: 57,
    borderRadius: 12,
    backgroundColor: '#6379F4',
    marginTop: 70,
    marginBottom: 30,
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
});

export default styles;
