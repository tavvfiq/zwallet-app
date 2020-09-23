import React, {Component} from 'react';
import PinInputForm from '../../components/CreatePinForm';
import {NavigationScreenProp} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default class CreatePinForm extends Component<Props, object> {
  // ... navigationOptions

  render() {
    return <PinInputForm navigation={this.props.navigation} />;
  }
}
