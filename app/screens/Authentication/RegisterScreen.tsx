import React, {Component} from 'react';
import RegisterForm from '../../components/RegisterForm';
import {NavigationScreenProp} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default class RegisterScreen extends Component<Props, object> {
  // ... navigationOptions

  render() {
    return <RegisterForm navigation={this.props.navigation} />;
  }
}
