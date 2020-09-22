/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationScreenProp} from 'react-navigation';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './screens/Authentication/LoginScreen';
import RegisterScreen from './screens/Authentication/RegisterScreen';

const Stack = createStackNavigator();

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const App = (props: Props) => {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" headerMode="none">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* <LoginScreen navigation={props.navigation} /> */}
    </>
  );
};

export default App;
