import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  splashScreen: {
    height,
    width,
    backgroundColor: '#6379F4',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
  },
});
