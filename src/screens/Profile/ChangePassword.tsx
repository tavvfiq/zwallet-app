/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {NavigationScreenProp, NavigationRoute} from 'react-navigation';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import {object as yupObject, string as yupString, ref} from 'yup';

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
  inputContainerStyle: {
    borderBottomColor: '#6379F4',
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
    backgroundColor: '#6379F4',
    marginTop: 217,
    marginBottom: 30,
  },
});

type Props = {
  navigation: NavigationScreenProp<any, any>;
  route: NavigationRoute;
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
  const [isPasswordShowed, setPasswordShowed] = useState(isPasswordShowedInit);

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
    console.log(data);
  });

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
          <Text style={styles.headerText}>Change Password</Text>
        </View>
        <Text style={styles.subHeaderText}>
          You must enter your current password and then type your new password
          twice.
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
                  name={isPasswordShowed.currentPassword ? 'eye' : 'eye-off'}
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
        <Button
          onPress={onSubmit}
          disabled={
            Boolean(errors.currentPassword?.message) ||
            Boolean(errors.newPassword?.message) ||
            Boolean(errors.repeatPassword?.message)
          }
          loadingProps={{size: 'large', color: 'white'}}
          buttonStyle={styles.changePasswordButton}
          title="Change Password"
        />
      </View>
    </>
  );
};

export default ChangePassword;
