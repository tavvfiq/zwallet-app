/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Switch} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {NavigationScreenProp} from 'react-navigation';
import FastImage from 'react-native-fast-image';
import userIcon from '../../assets/img/user.png';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height,
    width,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FAFCFF',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 42,
    marginBottom: 25,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    // height: '100%',
  },
  buttonSingleContainer: {
    borderRadius: 10,
    width: 343,
    marginTop: 20,
    alignSelf: 'center',
    elevation: 2,
  },
  buttonStyle: {
    width: 343,
    height: 58,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderRadius: 10,
  },
  nameText: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#4D4B57',
    marginBottom: 10,
  },
  phoneNumber: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '400',
    color: '#7A7886',
  },
  titleStyle: {
    color: '#4D4B57',
    fontSize: 16,
    fontWeight: '700',
  },
  logoutTitleStyle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF5B37',
    // textAlign: 'center',
    // alignSelf: 'center',
  },
  editButtonStyle: {
    width: 48,
    height: 27,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 15,
    // justifyContent: 'space-between',
  },
  editTitle: {
    color: '#7A7886',
  },

  iconBackStyle: {
    marginLeft: 21,
  },
});

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

const Profile = (props: Props) => {
  const [isEnabled, toggleSwitch] = useState(false);
  const {user} = useSelector((state: RootState) => state.user);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            style={styles.iconBackStyle}
            size={30}
            color="#4D4B57"
            onPress={() => {
              props.navigation.goBack();
            }}
          />
          <FastImage
            style={styles.image}
            {...{resizeMode: 'cover'}}
            source={user.details.image ? {uri: user.details.image} : userIcon}
          />
          <Button
            icon={<Icon name="edit-2" />}
            buttonStyle={styles.editButtonStyle}
            type="clear"
            title="Edit"
            titleStyle={styles.titleStyle}
          />
          <Text style={styles.nameText}>{user.credentials.username}</Text>
          <Text style={styles.phoneNumber}>
            {user.details.phoneNumber
              ? user.details.phoneNumber
              : 'No Phone Number'}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Personal Information"
            icon={<Icon name="arrow-right" size={30} color="#4D4B57" />}
            iconRight={true}
            onPress={() => {
              props.navigation.navigate('PersonalInfo', {
                username: user.credentials.username,
                email: user.credentials.email,
                phone: user.details.phoneNumber,
              });
            }}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonSingleContainer}
            titleStyle={styles.titleStyle}
          />
          <Button
            title="Change Password"
            icon={<Icon name="arrow-right" size={30} color="#4D4B57" />}
            iconRight={true}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonSingleContainer}
            titleStyle={styles.titleStyle}
            onPress={() => {
              props.navigation.navigate('ChangePassword', {
                id: user.credentials.id,
              });
            }}
          />
          <Button
            title="Change PIN"
            icon={<Icon name="arrow-right" size={30} color="#4D4B57" />}
            iconRight={true}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonSingleContainer}
            titleStyle={styles.titleStyle}
          />
          <Button
            title="Notification"
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonSingleContainer}
            titleStyle={styles.titleStyle}
            icon={
              <Switch
                trackColor={{
                  false: 'rgba(169, 169, 169, 0.4)',
                  true: '#6379F4',
                }}
                thumbColor={isEnabled ? 'white' : 'white'}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            }
            iconRight={true}
          />
          <Button
            title="Logout"
            buttonStyle={[styles.buttonStyle, {justifyContent: 'center'}]}
            containerStyle={styles.buttonSingleContainer}
            titleStyle={styles.logoutTitleStyle}
          />
        </View>
      </View>
    </>
  );
};

export default Profile;
