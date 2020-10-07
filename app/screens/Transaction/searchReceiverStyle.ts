import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FAFCFF',
    height,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 42,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'NunitoSans-Bold',
    color: '#4D4B57',
    marginLeft: 26,
  },
  searchContainer: {
    backgroundColor: '#FAFCFF',
    borderWidth: 0,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 25,
  },
  searchInput: {
    backgroundColor: 'rgba(58, 61, 66, 0.1)',
    borderRadius: 12,
    paddingLeft: 12,
  },
  input: {
    fontSize: 16,
    fontWeight: '400',
    color: '#4D4B57',
  },
  subTitle: {
    fontSize: 18,
    fontFamily: 'NunitoSans-Bold',
    color: '#4D4B57',
    marginTop: 25,
    marginLeft: 16,
  },
  childText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#8F8F8F',
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 15,
  },
  listStyle: {
    paddingBottom: 20,
  },
});
