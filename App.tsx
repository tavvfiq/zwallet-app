/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';

import {setCustomText, setCustomTextInput} from 'react-native-global-props';
import LoginScreen from './src/screens/Authentication/LoginScreen';
import {NavigationScreenProp} from 'react-navigation';

declare const global: {HermesInternal: null | {}};

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const App = (props: Props) => {
  const customTextProps = {
    style: {
      fontFamily: 'NunitoSans-Regular',
    },
  };

  setCustomText(customTextProps);
  setCustomTextInput(customTextProps);
  return (
    <>
      <StatusBar />
      <LoginScreen navigation={props.navigation} />
    </>
  );
};

export default App;
