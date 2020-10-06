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
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './utils/types';

import {Provider} from 'react-redux';

import SystemStatusbar from './SystemStatusbar';
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
import ChangePin from './screens/Profile/ChangePin';
import AddPhoneNumber from './screens/Profile/AddPhoneNumber';
import ManagePhoneNumber from './screens/Profile/ManagePhoneNumber';
import ResetPassword from './screens/Authentication/ResetPassword';

import {store} from './store';

const Stack = createStackNavigator<RootStackParamList>();

interface Props {
  navigation: StackNavigationProp<any, any>;
}

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  return (
    <>
      <Provider store={store}>
        <SystemStatusbar />
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
            <Stack.Screen name="ChangePin" component={ChangePin} />
            <Stack.Screen name="AddPhoneNumber" component={AddPhoneNumber} />
            <Stack.Screen
              name="ManagePhoneNumber"
              component={ManagePhoneNumber}
            />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
