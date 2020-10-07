import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {mainAPI} from '../../utils/apicalls';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

type Props = {
  navigation: StackNavigationProp<any, any>;
};

const WelcomeScreen = (props: Props) => {
  const {sessionIsValid} = useSelector((state: RootState) => state.system);
  const {token, pin} = useSelector(
    (state: RootState) => state.session.user.credentials,
  );

  React.useEffect(() => {
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
    SplashScreen.hide();
  }, []);
  return <></>;
};

export default WelcomeScreen;
