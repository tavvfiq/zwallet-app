/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, Switch} from 'react-native';
import FastImage from 'react-native-fast-image';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import ImagePicker from 'react-native-image-picker';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {StackNavigationProp} from '@react-navigation/stack';
import userIcon from '../../assets/img/user.png';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store';
import {updateUser, logout} from '../../store/user/actions';
import {enableAppNotification} from '../../store/system/actions';
import checkIcon from '../../assets/img/check.png';
import failedIcon from '../../assets/img/failed.png';
import waitingIcon from '../../assets/img/waiting.png';
import logoutIcon from '../../assets/img/logout.png';
import {styles} from './profileStyles';
import dialogStyle from '../../shared/dialogStyles';

type Props = {
  navigation: StackNavigationProp<any, any>;
};

const options = {
  title: 'Select Profile Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Profile: React.FunctionComponent<Props> = (props) => {
  const {user, status} = useSelector((state: RootState) => state.session);
  const {enableNotification, sessionIsValid} = useSelector(
    (state: RootState) => state.system,
  );
  const [isLogOut, setLogOut] = useState(false);
  const dispatch = useDispatch();
  const [isDialogVisible, setVisible] = useState(false);

  // useEffect(() => {
  //   if (!sessionIsValid && user.credentials.token === '') {
  //     props.navigation.navigate('Login');
  //   }
  // }, [sessionIsValid, user.credentials.token, props.navigation]);

  const handleTouchOutside = () => {
    if (isLogOut) {
      setVisible(false);
      setLogOut(false);
    } else {
      setVisible(false);
    }
  };

  const handleAddPhoto = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        let formData = new FormData();
        formData.append('username', user.credentials.username);
        formData.append('image', {
          uri: `file://${response.path}`,
          name: response.fileName,
          type: response.type,
          size: response.fileSize,
        });
        dispatch(
          updateUser(user.credentials.id as number, {userdata: formData}),
        );
        setVisible(true);
      }
    });
  };
  return (
    <>
      <Dialog visible={isDialogVisible}>
        <DialogContent style={dialogStyle.container}>
          <FastImage
            style={dialogStyle.checkIconStyle}
            source={
              isLogOut
                ? logoutIcon
                : status.loading
                ? waitingIcon
                : status.error
                ? failedIcon
                : checkIcon
            }
            {...{resizeMode: 'cover'}}
          />
          <Text style={dialogStyle.textDialog}>
            {isLogOut ? 'Are you sure want to logout?' : status.msg}
          </Text>
          {!status.loading ? (
            <Button
              onPress={() => {
                if (isLogOut) {
                  setLogOut(false);
                  dispatch(logout());
                }
                setVisible(false);
              }}
              buttonStyle={
                isLogOut ? dialogStyle.cancelButton : dialogStyle.buttonDialog
              }
              title={isLogOut ? 'Logout' : 'Confirm'}
            />
          ) : null}
          {isLogOut ? (
            <Button
              onPress={() => {
                setVisible(false);
              }}
              buttonStyle={dialogStyle.buttonDialog}
              title="Cancel"
            />
          ) : null}
        </DialogContent>
      </Dialog>
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
            onPress={handleAddPhoto}
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
                id: user.credentials.id,
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
            onPress={() => {
              props.navigation.navigate('ChangePin', {
                id: user.credentials.id,
                pin: user.credentials.pin,
              });
            }}
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
                thumbColor={enableNotification ? 'white' : 'white'}
                onValueChange={(value) => {
                  dispatch(enableAppNotification(value));
                }}
                value={enableNotification}
              />
            }
            iconRight={true}
          />
          <Button
            title="Logout"
            buttonStyle={[styles.buttonStyle, {justifyContent: 'center'}]}
            containerStyle={styles.buttonSingleContainer}
            titleStyle={styles.logoutTitleStyle}
            onPress={() => {
              setLogOut(true);
              setVisible(true);
            }}
          />
        </View>
      </View>
    </>
  );
};

export default Profile;
