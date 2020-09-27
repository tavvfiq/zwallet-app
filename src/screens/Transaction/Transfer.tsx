import React from 'react';
import {View, Text, TextInput} from 'react-native';
import FastImage from 'react-native-fast-image';
import {NavigationScreenProp} from 'react-navigation';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import userIcon from '../../assets/img/user.png';
import {styles} from './transactionStyle';
import {DateTime} from 'luxon';

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

type State = {
  value: string;
  isBlur: boolean;
  notes: string;
  confirmed: boolean;
  datetime?: DateTime;
};

class Transfer extends React.Component<Props, State> {
  state: State = {
    value: '',
    isBlur: true,
    notes: '',
    confirmed: false,
    datetime: DateTime.local(),
  };

  handleOnChange = (event: any) => {
    const rawValue = event.nativeEvent.text;
    this.setState({value: rawValue});
  };

  onConfirm = () => {
    if (!this.state.confirmed) {
      this.setState({confirmed: true});
    }
  };

  render() {
    const {confirmed, isBlur} = this.state;
    return (
      <>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerSection}>
              <Icon name="arrow-left" color="white" size={26} />
              <Text style={styles.headerText}>
                {confirmed ? 'Confirmation' : 'Transfer'}
              </Text>
            </View>
            <View style={styles.headerCard}>
              <FastImage
                style={styles.cardImage}
                source={userIcon}
                {...{resizeMode: 'cover'}}
              />
              <View style={styles.headerCardText}>
                <Text style={styles.nameText}>Taufiq Widi</Text>
                <Text style={styles.phoneNumberText}>081284544654</Text>
              </View>
            </View>
          </View>
          {!confirmed ? (
            <>
              <View style={styles.amountContainer}>
                <Text style={styles.textInputStyle}>
                  {this.state.value === '' ? '' : 'Rp'}
                </Text>
                <TextInput
                  placeholder={'0.00'}
                  style={styles.textInputStyle}
                  keyboardType="numeric"
                  onChange={this.handleOnChange}
                  // value={value}
                />
              </View>
              <Text style={styles.balanceText}>Rp120.000 Available</Text>
              <Input
                leftIcon={
                  <Icon
                    name="edit-2"
                    size={22}
                    color={isBlur ? 'rgba(169, 169, 169, 0.6)' : '#6379F4'}
                  />
                }
                placeholder="Add some notes"
                placeholderTextColor="rgba(169, 169, 169, 0.8)"
                inputContainerStyle={
                  this.state.isBlur ? styles.notesStyleBlur : styles.notesStyle
                }
                inputStyle={styles.notesText}
                onChangeText={(text) => {
                  this.setState({notes: text});
                  if (text === '') {
                    this.setState({isBlur: true});
                  } else {
                    this.setState({isBlur: false});
                  }
                }}
                onFocus={() => {
                  this.setState({isBlur: false});
                }}
                onBlur={() => {
                  this.setState({isBlur: true});
                }}
                value={this.state.notes}
              />
            </>
          ) : (
            <>
              <View style={styles.confirmationContainer}>
                <View style={styles.cell}>
                  <Text style={styles.cellTitleText}>Amount</Text>
                  <Text style={styles.cellChildText}>
                    Rp{Number(this.state.value).toLocaleString('id-ID')}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.cellTitleText}>Balance Left</Text>
                  <Text style={styles.cellChildText}>Rp20.000</Text>
                </View>
              </View>
              <View style={styles.confirmationContainer}>
                <View style={styles.cell}>
                  <Text style={styles.cellTitleText}>Date</Text>
                  <Text style={styles.cellChildText}>
                    {this.state.datetime?.toISODate()}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.cellTitleText}>Time</Text>
                  <Text style={styles.cellChildText}>
                    {this.state.datetime?.toISOTime()}
                  </Text>
                </View>
              </View>
              <View style={styles.longCell}>
                <Text style={styles.cellTitleText}>Notes</Text>
                <Text style={styles.cellChildText}>{this.state.notes}</Text>
              </View>
            </>
          )}
          <Button
            buttonStyle={styles.submitButton}
            title="Continue"
            titleStyle={styles.buttonText}
            onPress={this.onConfirm}
          />
        </View>
      </>
    );
  }
}

export default Transfer;
