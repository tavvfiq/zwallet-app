import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  cardContainer: {
    width,
    height: 96,
    backgroundColor: 'white',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  imageAndName: {
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    width: 56,
    height: 56,
    alignSelf: 'center',
    marginRight: 16,
    borderRadius: 10,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  nameText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#4D4B57',
  },
  childText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#7A7886',
  },
  amountTextIn: {
    fontSize: 18,
    fontWeight: '700',
    minWidth: 90,
    maxHeight: 25,
    alignSelf: 'center',
    textAlign: 'right',
    color: '#1EC15F',
  },
  amountTextOut: {
    fontSize: 18,
    fontWeight: '700',
    minWidth: 90,
    maxHeight: 25,
    alignSelf: 'center',
    textAlign: 'right',
    color: '#FF5B37',
  },
});

export default styles;
