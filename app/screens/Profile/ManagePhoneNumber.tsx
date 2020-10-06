/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../utils/types';
import {styles} from './manageStyles';

type ManagePhoneNumberRouteProps = RouteProp<
  RootStackParamList,
  'ManagePhoneNumber'
>;

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ManagePhoneNumber'>;
  route: ManagePhoneNumberRouteProps;
};

export default function AddPhoneNumber(props: Props) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Icon
            name="arrow-left"
            color="#4D4B57"
            size={30}
            onPress={() => {
              props.navigation.goBack();
            }}
          />
          <Text style={styles.headerText}>Manage Phone Number</Text>
        </View>
        <Text style={styles.subHeaderText}>
          You can only delete the phone number and then you must add another
          phone number.
        </Text>
        <View
          style={[styles.longCell, {display: 'flex', flexDirection: 'row'}]}>
          <View style={styles.phoneText}>
            <Text style={styles.cellTitleText}>Primary</Text>
            <Text style={styles.cellChildText}>
              {props.route.params.phoneNumber}
            </Text>
          </View>
          <Icon
            name="trash"
            size={30}
            color="#BBBBBE"
            style={styles.trashIcon}
          />
        </View>
      </View>
    </>
  );
}
