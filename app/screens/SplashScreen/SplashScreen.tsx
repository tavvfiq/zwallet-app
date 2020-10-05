import React from 'react';
import {View, Text} from 'react-native';
import {NavigationScreenProp, NavigationRoute} from 'react-navigation';
import {styles} from './styles';

type Props = {
  navigation: NavigationScreenProp<any, any>;
  route: NavigationRoute;
};

const SplashScreen = (props: Props) => {
  setTimeout(() => {
    props.navigation.navigate('Login');
  }, 2000);
  return (
    <>
      <View style={styles.splashScreen}>
        <Text style={styles.text}>Zwallet</Text>
      </View>
    </>
  );
};

export default SplashScreen;
