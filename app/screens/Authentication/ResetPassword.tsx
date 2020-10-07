import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import FastImage from 'react-native-fast-image';
import {yupResolver} from '@hookform/resolvers';
import {object as yupObject, string as yupString, ref} from 'yup';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {updateUser} from '../../store/user/actions';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store';
import {AuthStackParamList} from '../../utils/types';
import styles from './ResetPasswordStyle';
import dialogStyle from '../../shared/dialogStyles';
import checkIcon from '../../assets/img/check.png';
import failedIcon from '../../assets/img/failed.png';
import waitingIcon from '../../assets/img/waiting.png';

type resetPassword = {
  email?: string;
  newPassword?: string;
  repeatPassword?: string;
};

const passwordValidation =
  'Password must contain at least 8 characters, and one number';

const validationSchema = yupObject().shape({
  email: yupString().email('Invalid email'),
  newPassword: yupString().matches(
    /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
    passwordValidation,
  ),
  repeatPassword: yupString().oneOf(
    [ref('newPassword'), undefined],
    'Password must match.',
  ),
});

const isPasswordShowedInit: {[key: string]: any} = {
  newPassword: false,
  repeatPassword: false,
};

type ResetPasswordRouteProps = RouteProp<AuthStackParamList, 'ResetPassword'>;

type Props = {
  navigation: StackNavigationProp<any, any>;
  route: ResetPasswordRouteProps;
};

export default function ResetPassword(props: Props) {
  const {control, handleSubmit, errors} = useForm<resetPassword>({
    resolver: yupResolver(validationSchema),
  });
  const {status} = useSelector((state: RootState) => state.session);
  const {isReset, id} = props.route.params;
  const [isPasswordShowed, setPasswordShowed] = useState(isPasswordShowedInit);
  const [isVisible, setDialogVisibility] = useState(false);
  const [email, setEmail] = useState('');
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
    if (isReset) {
      formData.append('email', email);
      formData.append('newPassword', data.newPassword);
      dispatch(updateUser(Number('null'), {userdata: formData}));
      setDialogVisibility(true);
    } else {
      formData.append('email', data.email);
      setEmail(data.email as string);
      dispatch(updateUser(Number('null'), {userdata: formData}));
      setDialogVisibility(true);
    }
  });
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
                  if (isReset) {
                    props.navigation.navigate('Login');
                  }
                }
              }}
              buttonStyle={dialogStyle.buttonDialog}
              title="Confirm"
            />
          ) : null}
        </DialogContent>
      </Dialog>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Zwallet</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.titleText}>Reset Password</Text>
          <Text style={styles.subTitleText}>
            {isReset
              ? 'Create and confirm your new password so you can login to Zwallet.'
              : 'Enter your Zwallet e-mail so we can send you a password reset link.'}
          </Text>
          {isReset ? (
            <>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <Input
                    secureTextEntry={!isPasswordShowed.newPassword}
                    leftIcon={<Icon name="lock" color="#6379F4" size={20} />}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    placeholder="Create new password"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={(values) => onChange(values)}
                    onBlur={onBlur}
                    editable={true}
                    errorStyle={styles.errorMessage}
                    errorMessage={errors.newPassword?.message}
                    keyboardType="default"
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
                  />
                )}
                name="newPassword"
                defaultValue=""
              />
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <Input
                    secureTextEntry={!isPasswordShowed.repeatPassword}
                    leftIcon={<Icon name="lock" color="#6379F4" size={20} />}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    placeholder="Repeat new password"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={(values) => onChange(values)}
                    onBlur={onBlur}
                    editable={true}
                    errorStyle={styles.errorMessage}
                    errorMessage={errors.repeatPassword?.message}
                    keyboardType="default"
                    rightIcon={
                      <Icon
                        onPress={() => {
                          toggleShowPassword('repeatPassword');
                        }}
                        name={
                          isPasswordShowed.repeatPassword ? 'eye' : 'eye-off'
                        }
                        color="#A9A9A9"
                        size={20}
                      />
                    }
                  />
                )}
                name="repeatPassword"
                defaultValue=""
              />
            </>
          ) : (
            <>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <Input
                    leftIcon={<Icon name="mail" color="#6379F4" size={20} />}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    placeholder="Enter your email"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={(values) => onChange(values)}
                    onBlur={onBlur}
                    editable={true}
                    errorStyle={styles.errorMessage}
                    errorMessage={errors.email?.message}
                  />
                )}
                name="email"
                defaultValue=""
              />
            </>
          )}
          <Button
            loadingProps={{size: 'large', color: 'white'}}
            buttonStyle={styles.loginButton}
            disabled={
              isReset
                ? Boolean(errors.newPassword?.message) ||
                  Boolean(errors.repeatPassword?.message)
                : Boolean(errors.email?.message)
            }
            loading={status.loading}
            title={isReset ? 'Reset Password' : 'Confirm'}
            onPress={onSubmit}
          />
        </View>
      </View>
    </>
  );
}
