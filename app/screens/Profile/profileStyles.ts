import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    height,
    width,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FAFCFF',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 42,
    marginBottom: 25,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    // height: '100%',
  },
  buttonSingleContainer: {
    borderRadius: 10,
    width: 343,
    marginTop: 20,
    alignSelf: 'center',
    elevation: 2,
  },
  buttonStyle: {
    width: 343,
    height: 58,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderRadius: 10,
  },
  nameText: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#4D4B57',
    marginBottom: 10,
  },
  phoneNumber: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '400',
    color: '#7A7886',
  },
  titleStyle: {
    color: '#4D4B57',
    fontSize: 16,
    fontWeight: '700',
  },
  logoutTitleStyle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF5B37',
    // textAlign: 'center',
    // alignSelf: 'center',
  },
  editButtonStyle: {
    width: 48,
    height: 27,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 15,
    // justifyContent: 'space-between',
  },
  editTitle: {
    color: '#7A7886',
  },

  iconBackStyle: {
    marginLeft: 21,
  },
});
