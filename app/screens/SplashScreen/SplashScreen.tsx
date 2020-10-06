import React from 'react';
import {View, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {styles} from './styles';

type Props = {
  navigation: StackNavigationProp<any, any>;
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
