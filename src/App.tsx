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
import CreatePinScreen from './screens/Authentication/CreatePinScreen';
import Home from './screens/Home/Home';
import TransactionHistory from './screens/Transaction/TransactionHistory';
import SearchReceiver from './screens/Transaction/SearchReceiver';

const Stack = createStackNavigator();

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const App = () => {
  return (
    <>
      {/* <StatusBar /> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SearchReceiver" headerMode="none">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={RegisterScreen} />
          <Stack.Screen name="CreatePinScreen" component={CreatePinScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="TransactionHistory"
            component={TransactionHistory}
          />
          <Stack.Screen name="SearchReceiver" component={SearchReceiver} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
