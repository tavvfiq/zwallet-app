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
import {StatusBar, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationScreenProp} from 'react-navigation';
import {createStackNavigator} from '@react-navigation/stack';

import {Provider} from 'react-redux';

import LoginScreen from './screens/Authentication/LoginScreen';
import RegisterScreen from './screens/Authentication/RegisterScreen';
import CreatePinScreen from './screens/Authentication/CreatePinScreen';
import Home from './screens/Home/Home';
import TransactionHistory from './screens/Transaction/TransactionHistory';
import SearchReceiver from './screens/Transaction/SearchReceiver';
import Transfer from './screens/Transaction/Transfer';
import PinConfirmation from './screens/Transaction/PinConfirmation';
import TransactionInfo from './screens/Transaction/TransactionInfo';
import SplashScreen from './screens/SplashScreen/SplashScreen';
import Profile from './screens/Profile/Profile';
import PersonalInfo from './screens/Profile/PersonalInfo';
import ChangePassword from './screens/Profile/ChangePassword';

import {store} from './store';

const Stack = createStackNavigator();

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  return (
    <>
      <Provider store={store}>
        {/* <StatusBar /> */}
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={RegisterScreen} />
            <Stack.Screen name="CreatePinScreen" component={CreatePinScreen} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="TransactionHistory"
              component={TransactionHistory}
            />
            <Stack.Screen name="SearchReceiver" component={SearchReceiver} />
            <Stack.Screen name="Transfer" component={Transfer} />
            <Stack.Screen name="PinConfirmation" component={PinConfirmation} />
            <Stack.Screen name="TransactionInfo" component={TransactionInfo} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
