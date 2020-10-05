import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import FastImage from 'react-native-fast-image';
import {NavigationScreenProp} from 'react-navigation';
import {RouteProp} from '@react-navigation/native';
import {connect, ConnectedProps} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {RootState} from '../../store';
import {AppThunkDispatch} from '../../store/thunk';
import {doTransaction} from '../../store/transaction/actions';
import {styles} from './transactionStyle';
import dialogStyle from '../../shared/dialogStyles';
import {RootStackParamList} from '../../utils/types';
import checkIcon from '../../assets/img/check.png';
import failedIcon from '../../assets/img/failed.png';
import waitingIcon from '../../assets/img/waiting.png';

//connecting state and dispatch
const mapState = (state: RootState) => ({
  transaction: state.transaction,
});

const mapDispatch = (dispatch: AppThunkDispatch) => {
  return {
    doTransaction: (data: FormData) => dispatch(doTransaction(data)),
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

type PinConfirmationRouteProps = RouteProp<
  RootStackParamList,
  'PinConfirmation'
>;

type Props = PropsFromRedux & {
  navigation: NavigationScreenProp<
    PinConfirmationRouteProps,
    'PinConfirmation'
  >;
  route: PinConfirmationRouteProps;
};

class PinConfirmation extends React.Component<Props, State> {
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
      if (this.state.pin === this.props.route.params?.pin) {
        this.setState({isMatched: true});
        this.props.doTransaction(this.props.route.params.data);
        this.setState({isDialogVisible: true});
      } else {
        this.setState({msg: 'Wrong PIN entered'});
        this.pinInputRef.current?.shake();
      }
    }
  };

  render() {
    const {pin, isDialogVisible} = this.state;
    const {status} = this.props.transaction;
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
                  this.props.navigation.navigate('TransactionInfo', {
                    sender_id: this.props.route.params.data._parts[0][1],
                    receiver_id: this.props.route.params.data._parts[1][1],
                    amount: this.props.route.params.data._parts[4][1],
                    date: this.props.route.params.date,
                    notes: this.props.route.params.data._parts[5][1],
                    success: !this.props.transaction.status.error,
                  });
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
            <Text style={styles.headerPinText}>Enter Your PIN</Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.subTitleText}>
              Enter your 6 digits PIN for confirmation to continue transferring
              money.
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
              title="Transfer Now"
              disabled={pin.length < 6}
            />
          </View>
        </View>
      </>
    );
  }
}

export default connector(PinConfirmation);
