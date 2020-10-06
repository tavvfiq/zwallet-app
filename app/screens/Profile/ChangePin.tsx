import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import FastImage from 'react-native-fast-image';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {ProfileStackParamList} from '../../utils/types';
import {connect, ConnectedProps} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {RootState} from '../../store';
import {AppThunkDispatch} from '../../store/thunk';
import {updateUser} from '../../store/user/actions';
import {updateUserType} from '../../utils/types';
import {styles} from './changePinstyles';
import dialogStyle from '../../shared/dialogStyles';
import checkIcon from '../../assets/img/check.png';
import failedIcon from '../../assets/img/failed.png';
import waitingIcon from '../../assets/img/waiting.png';

//connecting state and dispatch
const mapState = (state: RootState) => ({
  status: state.session.status,
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
  msg: string;
  isMatched: boolean;
  isDialogVisible: boolean;
};

type ChangePinRouteProps = RouteProp<ProfileStackParamList, 'ChangePin'>;

type Props = PropsFromRedux & {
  navigation: StackNavigationProp<ProfileStackParamList, 'ChangePin'>;
  route: ChangePinRouteProps;
};

class ChangePin extends React.Component<Props, State> {
  state: Readonly<State> = {
    pin: '',
    msg: '',
    isMatched: false,
    isDialogVisible: false,
  };

  pinInputRef = React.createRef<SmoothPinCodeInput>();

  backSpacePressed = () => {
    this.pinInputRef.current?.shake();
    this.setState({msg: ''});
  };

  onSubmit = () => {
    if (!this.state.isMatched) {
      if (this.state.pin === this.props.route.params.pin) {
        this.setState({isMatched: true});
        this.setState({pin: ''});
      } else {
        this.setState({msg: 'Wrong PIN entered'});
        this.pinInputRef.current?.shake();
      }
    } else {
      let formData = new FormData();
      formData.append('newPin', this.state.pin);
      this.props.updateUser(this.props.route.params.id, {userdata: formData});
      this.setState({isDialogVisible: true});
    }
  };

  render() {
    const {pin, isDialogVisible} = this.state;
    const {status} = this.props;
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
                    this.props.navigation.navigate('Profile');
                  } else {
                    this.setState({isMatched: false});
                  }
                }}
                buttonStyle={dialogStyle.buttonDialog}
                title="Confirm"
              />
            ) : null}
          </DialogContent>
        </Dialog>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Icon
              name="arrow-left"
              color="#4D4B57"
              size={26}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
            <Text style={styles.headerPinText}>Change PIN</Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.subTitleText}>
              {this.state.isMatched
                ? 'Type your new 6 digits security PIN to use in Zwallet.'
                : 'Enter your current 6 digits Zwallet PIN below to continue to the next steps.'}
            </Text>
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
            <Text style={styles.pinErrorMsg}>{this.state.msg}</Text>
            <Button
              onPress={this.onSubmit}
              buttonStyle={styles.transferButton}
              loading={status.loading}
              title="Continue"
              disabled={pin.length < 6}
            />
          </View>
        </View>
      </>
    );
  }
}

export default connector(ChangePin);
