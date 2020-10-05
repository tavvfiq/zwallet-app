import React, {Component} from 'react';
import LoginForm from '../../components/LoginFrom';
import {NavigationScreenProp} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default class LoginScreen extends Component<Props, object> {
  // ... navigationOptions

  render() {
    return <LoginForm navigation={this.props.navigation} />;
  }
}
