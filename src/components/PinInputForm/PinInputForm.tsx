import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {NavigationScreenProp} from 'react-navigation';
import checkIcon from '../../assets/img/check.png';
import styles from './styles';

type State = {
  pinValue: string;
  isPinCreated: boolean;
};

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

class PinInputForm extends React.Component<Props, State> {
  state: Readonly<State> = {
    pinValue: '',
    isPinCreated: false,
  };

  pinInputRef = React.createRef<SmoothPinCodeInput>();

  backSpacePressed = () => {
    this.pinInputRef.current.shake();
  };

  onSubmit = () => {
    if (!this.state.isPinCreated) {
      this.setState({isPinCreated: true});
    }
  };

  render() {
    const {pinValue, isPinCreated} = this.state;
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
                value={pinValue}
                onTextChange={(value: string) =>
                  this.setState({pinValue: value})
                }
                codeLength={6}
                containerStyle={styles.pinContainerStyle}
                cellStyle={styles.pinCell}
                cellStyleFocused={styles.pinCellFocused}
                textStyle={styles.pinTextFocused}
                onBackspace={this.backSpacePressed}
              />
            )}
            <Button
              onPress={this.onSubmit}
              buttonStyle={
                isPinCreated ? styles.LoginButton : styles.confirmButton
              }
              title={isPinCreated ? 'Login Now' : 'Confirm'}
              disabled={pinValue.length < 6}
            />
          </View>
        </View>
      </>
    );
  }
}

export default PinInputForm;
