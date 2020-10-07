/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {ProfileStackParamList} from '../../utils/types';
import {BoldText} from '../../components/CustomText/CustomText';

import colorTheme from '../../shared/appColorTheme';

type PersonalInfoRouteProps = RouteProp<ProfileStackParamList, 'PersonalInfo'>;

type Props = {
  navigation: StackNavigationProp<ProfileStackParamList, 'PersonalInfo'>;
  route: PersonalInfoRouteProps;
};

const PersonalInfo = (props: Props) => {
  const {username, email, phone} = props.route.params;
  const [firstname, lastname] = username.split(' ');
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
          <Text style={styles.headerText}>Personal Information</Text>
        </View>
        <Text style={styles.subHeaderText}>
          We got your personal information from the sign up proccess. If you
          want to make changes on your information, contact our support.
        </Text>
        <View style={styles.cellContainer}>
          <View style={styles.cell}>
            <Text style={styles.cellTitleText}>First Name</Text>
            <BoldText style={styles.cellChildText}>{firstname}</BoldText>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTitleText}>Last Name</Text>
            <BoldText style={styles.cellChildText}>{lastname}</BoldText>
          </View>
        </View>
        <View style={styles.longCell}>
          <Text style={styles.cellTitleText}>Verified E-mail</Text>
          <BoldText style={styles.cellChildText}>{email}</BoldText>
        </View>
        <View
          style={[styles.longCell, {display: 'flex', flexDirection: 'row'}]}>
          <View style={styles.phoneText}>
            <Text style={styles.cellTitleText}>Phone Number</Text>
            <BoldText style={styles.cellChildText}>
              {phone ? (
                phone
              ) : (
                <Button
                  containerStyle={styles.buttonStyle}
                  titleStyle={styles.addPhoneNumber}
                  type="clear"
                  title="Add phone number"
                  onPress={() => {
                    props.navigation.navigate('AddPhoneNumber', {
                      id: props.route.params.id,
                    });
                  }}
                />
              )}
            </BoldText>
          </View>
          {phone ? (
            <Button
              containerStyle={styles.buttonStyle}
              titleStyle={styles.manageText}
              type="clear"
              title="Manage"
              onPress={() => {
                props.navigation.navigate('ManagePhoneNumber', {
                  phoneNumber: phone,
                });
              }}
            />
          ) : null}
        </View>
      </View>
    </>
  );
};

export default PersonalInfo;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width,
    height,
    backgroundColor: '#FAFCFF',
    paddingTop: 42,
    paddingLeft: 16,
    paddingRight: 16,
  },
  headerContainer: {
    width,
    display: 'flex',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'NunitoSans-Bold',
    alignSelf: 'center',
    color: '#4D4B57',
    marginLeft: 25,
  },
  subHeaderText: {
    color: '#7A7886',
    fontSize: 16,
    marginTop: 40,
    textAlign: 'justify',
    lineHeight: 27,
  },
  cell: {
    width: width * 0.43,
    height: 92,
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 10,
    marginTop: 30,
    padding: 15,
    justifyContent: 'space-between',
  },
  cellTitleText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#7A7886',
  },
  cellChildText: {
    fontSize: 18,
    color: '#514F5B',
  },
  longCell: {
    width: width * 0.92,
    minHeight: 87,
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 10,
    marginTop: 30,
    alignSelf: 'center',
    padding: 15,
    justifyContent: 'space-between',
  },
  cellContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    alignSelf: 'center',
  },
  phoneText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  manageText: {
    fontSize: 14,
    fontWeight: '600',
    color: colorTheme.primary,
  },
  addPhoneNumber: {
    fontSize: 18,

    color: colorTheme.primary,
  },
});
