import React from 'react';
import {Linking, Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {mainAPI} from '../../utils/apicalls';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {RESET_PASSWORD_KEY} from '../../utils/environment';

type Props = {
  navigation: StackNavigationProp<any, any>;
};

type DecodedToken = {
  email: string;
};

const idRegx = /\/([^\/]+)\/?$/;
const routeRegx = /.*?:\/\//g;

const WelcomeScreen = (props: Props) => {
  const {sessionIsValid} = useSelector((state: RootState) => state.system);
  const {token, pin} = useSelector(
    (state: RootState) => state.session.user.credentials,
  );

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then((url) => {
        if (__DEV__) {
          console.log(sessionIsValid, token, pin);
        }
        if (url) {
          if (!sessionIsValid && token === '' && pin === null) {
            const route = url?.replace(routeRegx, '');
            const email = route?.match(idRegx)[1];
            const routeName = route?.split('/')[0];
            props.navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'AuthScreen',
                  state: {
                    routes: [
                      {
                        name: routeName,
                        params: {
                          email: email,
                          isReset: true,
                        },
                      },
                    ],
                  },
                },
              ],
            });
          } else if (!sessionIsValid && token === '') {
            props.navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'AuthScreen',
                  state: {
                    routes: [{name: 'CreatePin'}],
                  },
                },
              ],
            });
          } else {
            props.navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'AuthScreen',
                  state: {
                    routes: [{name: 'Login'}],
                  },
                },
              ],
            });
          }
        } else {
          if (sessionIsValid && token !== '' && pin !== null) {
            mainAPI.setToken(token as string);
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
                  name: 'AuthScreen',
                  state: {
                    routes: [{name: 'CreatePin'}],
                  },
                },
              ],
            });
          } else {
            props.navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'AuthScreen',
                  state: {
                    routes: [{name: 'Login'}],
                  },
                },
              ],
            });
          }
        }
        SplashScreen.hide();
      });
    }
  }, []);
  return <></>;
};

export default WelcomeScreen;
