import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {StackNavigationProp} from '@react-navigation/stack';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../../store';
import {AppThunkDispatch} from '../../store/thunk';
import {updateUser} from '../../store/user/actions';
import {updateUserType} from '../../utils/types';
import checkIcon from '../../assets/img/check.png';
import styles from './styles';

//connecting state and dispatch
const mapState = (state: RootState) => ({
  user: state.user,
});

const mapDispatch = (dispatch: AppThunkDispatch) => {
  return {
    updateUser: (id: number, data: updateUserType) =>
      dispatch(updateUser(id, data)),
  };
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type State = {
  pin: string;
  isPinCreated: boolean;
};

type Props = PropsFromRedux & {
  navigation: StackNavigationProp<any, any>;
};

class CreatePinForm extends React.Component<Props, State> {
  state: Readonly<State> = {
    pin: '',
    isPinCreated: false,
  };

  pinInputRef = React.createRef<SmoothPinCodeInput>();

  backSpacePressed = () => {
    this.pinInputRef.current?.shake();
  };

  onSubmit = () => {
    const {id} = this.props.user.user.credentials;
    if (!this.state.isPinCreated) {
      this.setState({isPinCreated: true});
      let formData = new FormData();
      formData.append('pin', this.state.pin);
      this.props.updateUser(id as number, {userdata: formData});
    } else {
      this.props.navigation.navigate('Home');
    }
  };

  render() {
    const {pin, isPinCreated} = this.state;
    const {status} = this.props.user;
    return (
      <>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Zwallet</Text>
          </View>
          <View style={styles.formContainer}>
            {isPinCreated ? (
              <FastImage
                style={styles.checklistIcon}
                source={checkIcon}
                {...{resizeMode: 'contain'}}
              />
            ) : null}
            <Text style={styles.titleText}>
              {isPinCreated
                ? 'PIN Successfully Created'
                : 'Create Security PIN'}
            </Text>
            <Text style={styles.subTitleText}>
              {isPinCreated
                ? 'Your PIN was successfully created and you can now access all the features in Zwallet. Login to your new account and start exploring!'
                : 'Create a PIN that’s contain 6 digits number for security purpose in Zwallet.'}
            </Text>
            {isPinCreated ? null : (
              <SmoothPinCodeInput
                ref={this.pinInputRef}
                value={pin}
                onTextChange={(value: string) => this.setState({pin: value})}
                codeLength={6}
                containerStyle={styles.pinContainerStyle}
                cellStyle={styles.pinCell}
                cellStyleFocused={styles.pinCellFocused}
                textStyle={styles.pinTextFocused}
                onBackspace={this.backSpacePressed}
                restrictToNumbers={true}
              />
            )}
            <Button
              onPress={this.onSubmit}
              buttonStyle={
                isPinCreated ? styles.LoginButton : styles.confirmButton
              }
              loading={status.loading}
              title={isPinCreated ? 'Login Now' : 'Confirm'}
              disabled={pin.length < 6}
            />
          </View>
        </View>
      </>
    );
  }
}

export default connector(CreatePinForm);
