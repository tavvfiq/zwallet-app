import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';

import LoginScreen from '../../components/LoginFrom/LoginForm';
import RegisterScreen from '../../components/RegisterForm/RegisterForm';
import CreatePinScreen from '../../components/CreatePinForm/CreatePinForm';
import ResetPassword from './ResetPassword';

import {changeStatusbarTheme} from '../../store/system/actions';
import {AuthStackParamList} from '../../utils/types';
import {RootState} from '../../store';

const AuthStack = createStackNavigator<AuthStackParamList>();

type Props = {
  navigation: StackNavigationProp<any, any>;
};

const AuthScreen: React.FunctionComponent<Props> = (props) => {
  const {sessionIsValid} = useSelector((state: RootState) => state.system);
  const {token, pin} = useSelector(
    (state: RootState) => state.session.user.credentials,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (sessionIsValid && token !== '' && pin !== null) {
      if (pin !== '') {
        props.navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
            },
          ],
        });
      }
    } else if (sessionIsValid && token !== '' && pin === null) {
      props.navigation.reset({
        index: 0,
        routes: [
          {
            name: 'CreatePin',
          },
        ],
      });
    }
  }, [sessionIsValid, token]);

  const changeTheme = React.useCallback(() => {
    dispatch(
      changeStatusbarTheme({
        backgroundColor: '#FAFCFF',
        barStyle: 'dark-content',
      }),
    );
  }, [dispatch]);

  React.useEffect(() => {
    const eventHandler = props.navigation.addListener('focus', () =>
      changeTheme(),
    );
    return () => eventHandler();
  }, []);

  return (
    <AuthStack.Navigator initialRouteName="Login" headerMode="none">
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={RegisterScreen} />
      <AuthStack.Screen name="CreatePin" component={CreatePinScreen} />
      <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
    </AuthStack.Navigator>
  );
};

export default AuthScreen;
