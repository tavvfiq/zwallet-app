import React, {Component} from 'react';
import RegisterForm from '../../components/RegisterForm';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<any, any>;
}

export default class RegisterScreen extends Component<Props, object> {
  // ... navigationOptions

  render() {
    return <RegisterForm navigation={this.props.navigation} />;
  }
}
