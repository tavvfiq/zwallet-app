import React, {Component} from 'react';
import PinInputForm from '../../components/CreatePinForm';
import {NavigationScreenProp} from 'react-navigation';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../../store';

//connecting state and dispatch
const mapState = (state: RootState) => ({
  user: state.user.user,
});

const connector = connect(mapState, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  navigation: NavigationScreenProp<any, any>;
};

class CreatePinForm extends Component<Props, object> {
  // ... navigationOptions

  componentDidMount() {
    if (this.props.user.credentials.pin) {
      this.props.navigation.navigate('Home');
    }
  }

  render() {
    return <PinInputForm navigation={this.props.navigation} />;
  }
}

export default connector(CreatePinForm);
