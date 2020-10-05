import {StyleSheet} from 'react-native';
import colorTheme from './appColorTheme';

const styles = StyleSheet.create({
  textDialog: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonDialog: {
    borderRadius: 10,
    backgroundColor: colorTheme.primary,
    width: 128,
    height: 40,
    alignSelf: 'center',
  },
  container: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  checkIconStyle: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
});
export default styles;
