/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {NavigationScreenProp, NavigationRoute} from 'react-navigation';

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
    fontWeight: 'bold',
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
    fontWeight: '700',
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
  },
});

type Props = {
  navigation: NavigationScreenProp<any, any>;
  route: NavigationRoute;
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
            <Text style={styles.cellChildText}>{firstname}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTitleText}>Last Name</Text>
            <Text style={styles.cellChildText}>{lastname}</Text>
          </View>
        </View>
        <View style={styles.longCell}>
          <Text style={styles.cellTitleText}>Verified E-mail</Text>
          <Text style={styles.cellChildText}>{email}</Text>
        </View>
        <View
          style={[styles.longCell, {display: 'flex', flexDirection: 'row'}]}>
          <View style={styles.phoneText}>
            <Text style={styles.cellTitleText}>Phone Number</Text>
            <Text style={styles.cellChildText}>
              {phone ? phone : 'No Phone Number'}
            </Text>
          </View>
          <Button
            containerStyle={styles.buttonStyle}
            titleStyle={styles.manageText}
            type="clear"
            title="Manage"
          />
        </View>
      </View>
    </>
  );
};

export default PersonalInfo;
