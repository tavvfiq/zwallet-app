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
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  RootStackParamList,
  TransactionStackParamList,
  ProfileStackParamList,
} from './utils/types';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import SystemStatusbar from './SystemStatusbar';
import LoginScreen from './screens/Authentication/LoginScreen';
import RegisterScreen from './screens/Authentication/RegisterScreen';
import CreatePinScreen from './screens/Authentication/CreatePinScreen';
import Home from './screens/Home/Home';
import TransactionScreen from './screens/Transaction/TransactionScreen';
import SplashScreen from './screens/SplashScreen/SplashScreen';
import ProfileScreen from './screens/Profile/ProfileScreen';
import ResetPassword from './screens/Authentication/ResetPassword';

import {appStore, persistor} from './store';

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
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
          <SystemStatusbar />
          <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={RegisterScreen} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Stack.Screen
                name="CreatePinScreen"
                component={CreatePinScreen}
              />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen
                name="TransactionScreen"
                component={TransactionScreen}
              />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
