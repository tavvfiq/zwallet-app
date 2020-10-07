import {StyleSheet, Dimensions} from 'react-native';
import colorTheme from '../../shared/appColorTheme';

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  splashScreen: {
    height,
    width,
    backgroundColor: colorTheme.primary,
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: 32,
    fontFamily: 'NunitoSans-Bold',
    color: 'white',
  },
});
