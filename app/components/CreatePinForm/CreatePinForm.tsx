import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {StackNavigationProp} from '@react-navigation/stack';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../../store';
import {AppThunkDispatch} from '../../store/thunk';
import {updateUser} from '../../store/user/actions';
import {updateUserType} from '../../utils/types';
import styles from './styles';
import dialogStyle from '../../shared/dialogStyles';
import checkIcon from '../../assets/img/check.png';
import failedIcon from '../../assets/img/failed.png';
import waitingIcon from '../../assets/img/waiting.png';

//connecting state and dispatch
const mapState = (state: RootState) => ({
  user: state.session,
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
  isDialogVisible: boolean;
};

type Props = PropsFromRedux & {
  navigation: StackNavigationProp<any, any>;
};

class CreatePinForm extends React.Component<Props, State> {
  state: Readonly<State> = {
    pin: '',
    isPinCreated: false,
    isDialogVisible: false,
  };

  pinInputRef = React.createRef<SmoothPinCodeInput>();

  backSpacePressed = () => {
    this.pinInputRef.current?.shake();
  };

  toggleDialog = () => {
    this.setState({isDialogVisible: !this.state.isDialogVisible});
  };

  onSubmit = () => {
    const {id} = this.props.user.user.credentials;
    if (!this.state.isPinCreated) {
      this.toggleDialog();
      let formData = new FormData();
      formData.append('pin', this.state.pin);
      this.props.updateUser(id as number, {userdata: formData});
    } else {
      this.props.navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Home',
          },
        ],
      });
    }
  };

  render() {
    const {pin, isPinCreated, isDialogVisible} = this.state;
    const {status} = this.props.user;
    return (
      <>
        <Dialog visible={isDialogVisible}>
          <DialogContent style={dialogStyle.container}>
            <FastImage
              style={dialogStyle.checkIconStyle}
              source={
                status.loading
                  ? waitingIcon
                  : status.error
                  ? failedIcon
                  : checkIcon
              }
              {...{resizeMode: 'cover'}}
            />
            <Text style={dialogStyle.textDialog}>{status.msg}</Text>
            {!status.loading ? (
              <Button
                onPress={() => {
                  this.setState({isDialogVisible: false});
                  if (!status.error) {
                    this.setState({isPinCreated: true});
                  }
                }}
                buttonStyle={dialogStyle.buttonDialog}
                title="Confirm"
              />
            ) : null}
          </DialogContent>
        </Dialog>
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
