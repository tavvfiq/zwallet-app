import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  homeContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 42,
    backgroundColor: '#FAFCFF',
    height,
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 10,
    alignSelf: 'center',
    marginRight: 20,
    resizeMode: 'cover',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
  },
  textAndImage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  helloText: {
    fontSize: 18,
    fontWeight: '400',
  },
  nameText: {
    fontFamily: 'NunitoSans-Regular.ttf',
    fontWeight: '700',
    fontSize: 18,
  },
  icon: {
    alignSelf: 'center',
  },
  cardBalanceContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 25,
    marginLeft: 16,
    marginRight: 16,
    height: 141,
    backgroundColor: '#6379F4',
    marginTop: 29,
    borderRadius: 20,
  },
  balanceText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  childText: {
    color: '#DFDCDC',
    fontSize: 14,
    fontWeight: '400',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 30,
  },
  buttonStyle: {
    width: 0.432 * width,
    height: 57,
    backgroundColor: '#E5E8ED',
    borderRadius: 10,
    justifyContent: 'space-evenly',
  },
  buttonText: {
    color: '#514F5B',
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 3,
  },
  subSectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 30,
    marginBottom: 5,
  },
  subSectionText: {
    fontSize: 18,
    fontWeight: '700',
  },
  seeAllButton: {
    alignSelf: 'center',
  },
  seeAllButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6379F4',
    paddingTop: 4,
  },
  transactionHistoryList: {
    backgroundColor: '#FAFCFF',
    paddingBottom: 20,
  },
});

export default styles;
