import {StyleSheet} from 'react-native';
import colorTheme from './appColorTheme';

const styles = StyleSheet.create({
  textDialog: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonDialog: {
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: colorTheme.primary,
    width: 128,
    height: 40,
    alignSelf: 'center',
  },
  cancelButton: {
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: colorTheme.error,
    width: 128,
    height: 40,
    alignSelf: 'center',
  },
  canceltext: {
    color: colorTheme.dark,
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
    marginTop: 5,
  },
});
export default styles;
