import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {NavigationScreenProp} from 'react-navigation';
import {RouteProp} from '@react-navigation/native';
import {connect, ConnectedProps} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {RootState} from '../../store';
import {AppThunkDispatch} from '../../store/thunk';
import {doTransaction} from '../../store/transaction/actions';
import {transactionType} from '../../utils/types';
import {styles} from './transactionStyle';
import {RootStackParamList} from '../../utils/types';

//connecting state and dispatch
const mapState = (state: RootState) => ({
  user: state.user,
});

const mapDispatch = (dispatch: AppThunkDispatch) => {
  return {
    doTransaction: (data: transactionType) => dispatch(doTransaction(data)),
  };
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type State = {
  pin: string;
  msg: string;
  isMatched: boolean;
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
        this.props.doTransaction(this.props.route.params.transactionData);
        this.props.navigation.navigate('TransactionInfo', {
          amount: this.props.route.params.transactionData.amount,
          date: this.props.route.params.date,
          notes: this.props.route.params.transactionData.notes,
        });
      } else {
        this.setState({msg: 'Wrong PIN entered'});
        this.pinInputRef.current?.shake();
      }
    }
  };

  render() {
    const {pin} = this.state;
    const {status} = this.props.user;
    return (
      <>
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
