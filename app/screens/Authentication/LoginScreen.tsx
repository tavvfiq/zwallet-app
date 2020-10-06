import React, {Component} from 'react';
import LoginForm from '../../components/LoginFrom';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../utils/types';

interface Props {
  navigation: StackNavigationProp<any, any>;
}

export default class LoginScreen extends Component<Props, object> {
  // ... navigationOptions

  render() {
    return <LoginForm navigation={this.props.navigation} />;
  }
}
