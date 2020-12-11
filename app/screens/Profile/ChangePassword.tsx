/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {ProfileStackParamList} from '../../utils/types';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import FastImage from 'react-native-fast-image';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import checkIcon from '../../assets/img/check.png';
import failedIcon from '../../assets/img/failed.png';
import waitingIcon from '../../assets/img/waiting.png';
import {object as yupObject, string as yupString, ref} from 'yup';
import {updateUser} from '../../store/user/actions';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store';
import dialogStyle from '../../shared/dialogStyles';
import colorTheme from '../../shared/appColorTheme';

type ChangePasswordRouteProps = RouteProp<
  ProfileStackParamList,
  'ChangePassword'
>;

type Props = {
  navigation: StackNavigationProp<ProfileStackParamList, 'ChangePassword'>;
  route: ChangePasswordRouteProps;
};

const passwordValidation =
  'Password must contain at least 8 characters, and one number';

const validationSchema = yupObject().shape({
  currentPassword: yupString().required('Required'),
  newPassword: yupString()
    .required('Required')
    .notOneOf(
      [ref('currentPassword'), undefined],
      'Cannot be same with current password.',
    )
    .matches(
      /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
      passwordValidation,
    ),
  repeatPassword: yupString()
    .oneOf([ref('newPassword'), undefined], 'Password must match.')
    .required('Required'),
});

const isPasswordShowedInit: {[key: string]: any} = {
  currentPassword: false,
  newPassword: false,
  repeatPassword: false,
};

type formData = {
  currentPassword: string;
  newPassword: string;
  repeatPassword: string;
};

const ChangePassword = (props: Props) => {
  const {control, handleSubmit, errors} = useForm<formData>({
    resolver: yupResolver(validationSchema),
  });

  const {status} = useSelector((state: RootState) => state.session);
  const [isPasswordShowed, setPasswordShowed] = useState(isPasswordShowedInit);

  const [isVisible, setDialogVisibility] = useState(false);

  const dispatch = useDispatch();

  const toggleShowPassword = (what: string) => {
    const newState = {...isPasswordShowed};
    for (const key in isPasswordShowed) {
      if (key === what) {
        newState[key] = !isPasswordShowed[key];
      }
    }
    setPasswordShowed(newState);
  };

  const onSubmit = handleSubmit((data) => {
    let formData = new FormData();
    formData.append('password', data.currentPassword);
    formData.append('newPassword', data.newPassword);
    dispatch(updateUser(props.route.params?.id, {userdata: formData}));
    showDialog();
  });

  const showDialog = () => {
    setDialogVisibility(true);
  };

  return (
    <>
      <Dialog visible={isVisible}>
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
                setDialogVisibility(false);
                if (!status.error) {
                  props.navigation.navigate('Profile');
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
            size={30}
            onPress={() => {
              props.navigation.goBack();
            }}
          />
          <Text style={styles.headerText}>Change Password</Text>
        </View>
        <View
          style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.subHeaderText}>
              You must enter your current password and then type your new
              password twice.
            </Text>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <Input
                  secureTextEntry={!isPasswordShowed.currentPassword}
                  placeholder="Current Password"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={(values) => onChange(values)}
                  onBlur={onBlur}
                  editable={true}
                  errorStyle={styles.errorMessage}
                  errorMessage={errors.currentPassword?.message}
                  leftIcon={<Icon name="lock" color="#6379F4" size={20} />}
                  rightIcon={
                    <Icon
                      onPress={() => {
                        toggleShowPassword('currentPassword');
                      }}
                      name={
                        isPasswordShowed.currentPassword ? 'eye' : 'eye-off'
                      }
                      color="#A9A9A9"
                      size={20}
                    />
                  }
                  inputContainerStyle={[
                    styles.inputContainerStyle,
                    {marginTop: 54},
                  ]}
                  inputStyle={styles.inputStyle}
                />
              )}
              name="currentPassword"
              rules={{required: true}}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <Input
                  secureTextEntry={!isPasswordShowed.newPassword}
                  placeholder="New Password"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={(values) => onChange(values)}
                  onBlur={onBlur}
                  editable={true}
                  errorStyle={styles.errorMessage}
                  errorMessage={errors.newPassword?.message}
                  leftIcon={<Icon name="lock" color="#6379F4" size={20} />}
                  rightIcon={
                    <Icon
                      onPress={() => {
                        toggleShowPassword('newPassword');
                      }}
                      name={isPasswordShowed.newPassword ? 'eye' : 'eye-off'}
                      color="#A9A9A9"
                      size={20}
                    />
                  }
                  inputContainerStyle={styles.inputContainerStyle}
                  inputStyle={styles.inputStyle}
                />
              )}
              name="newPassword"
              rules={{required: true}}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <Input
                  secureTextEntry={!isPasswordShowed.repeatPassword}
                  placeholder="Repeat Password"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={(values) => onChange(values)}
                  onBlur={onBlur}
                  editable={true}
                  errorStyle={styles.errorMessage}
                  errorMessage={errors.repeatPassword?.message}
                  leftIcon={<Icon name="lock" color="#6379F4" size={20} />}
                  rightIcon={
                    <Icon
                      onPress={() => {
                        toggleShowPassword('repeatPassword');
                      }}
                      name={isPasswordShowed.repeatPassword ? 'eye' : 'eye-off'}
                      color="#A9A9A9"
                      size={20}
                    />
                  }
                  inputContainerStyle={styles.inputContainerStyle}
                  inputStyle={styles.inputStyle}
                />
              )}
              name="repeatPassword"
              rules={{required: true}}
              defaultValue=""
            />
          </View>
          <Button
            onPress={onSubmit}
            disabled={
              Boolean(errors.currentPassword?.message) ||
              Boolean(errors.newPassword?.message) ||
              Boolean(errors.repeatPassword?.message)
            }
            loading={status.loading}
            loadingProps={{size: 'large', color: 'white'}}
            buttonStyle={[styles.changePasswordButton, {marginTop: 0}]}
            title="Change Password"
          />
        </View>
      </View>
    </>
  );
};

export default ChangePassword;

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
  inputContainerStyle: {
    borderBottomColor: colorTheme.primary,
  },
  inputStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3A3D42',
  },
  errorMessage: {
    color: '#FF5B37',
  },
  changePasswordButton: {
    height: 57,
    borderRadius: 12,
    backgroundColor: colorTheme.primary,
    marginTop: 217,
    marginBottom: 30,
  },
});
