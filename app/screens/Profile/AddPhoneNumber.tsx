/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Input, Button} from 'react-native-elements';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import FastImage from 'react-native-fast-image';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {ProfileStackParamList} from '../../utils/types';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import {object as yupObject, string as yupString} from 'yup';
import {updateUser} from '../../store/user/actions';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store';
import dialogStyle from '../../shared/dialogStyles';
import {styles} from './phoneNumberStyles';
import checkIcon from '../../assets/img/check.png';
import failedIcon from '../../assets/img/failed.png';
import waitingIcon from '../../assets/img/waiting.png';

type AddPhoneNumberRouteProps = RouteProp<
  ProfileStackParamList,
  'AddPhoneNumber'
>;
type Props = {
  navigation: StackNavigationProp<ProfileStackParamList, 'AddPhoneNumber'>;
  route: AddPhoneNumberRouteProps;
};

type form = {
  phoneNumber: string;
};

const validationSchema = yupObject().shape({
  phoneNumber: yupString()
    .required('Required')
    .max(15, 'Cannot more than 15 character')
    .min(11, 'must be at least 11 character')
    .matches(/\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/, 'Not a valid phone number'),
});

export default function AddPhoneNumber(props: Props) {
  const {control, handleSubmit, errors} = useForm<form>({
    resolver: yupResolver(validationSchema),
  });
  const [isVisible, setDialogVisiblity] = useState(false);
  const dispatch = useDispatch();
  const {status} = useSelector((state: RootState) => state.session);
  const onSubmit = handleSubmit(
    (data) => {
      let formData = new FormData();
      formData.append('phone_number', data.phoneNumber);
      dispatch(updateUser(props.route.params.id, {userdata: formData}));
      setDialogVisiblity(true);
    },
    (err) => {
      console.log(err);
    },
  );
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
                setDialogVisiblity(false);
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
          <Text style={styles.headerText}>Add Phone Number</Text>
        </View>
        <Text style={styles.subHeaderText}>
          Add at least one phone number for the transfer ID so you can start
          transfering your money to another user.
        </Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              onBlur={onBlur}
              value={value}
              onChangeText={(values) => onChange(values)}
              editable={true}
              errorStyle={styles.errorMessage}
              errorMessage={errors.phoneNumber?.message}
              leftIcon={<Icon name="phone" color="#6379F4" size={20} />}
              placeholder="Enter your phone number"
              inputContainerStyle={[
                styles.inputContainerStyle,
                {marginTop: 53},
              ]}
              inputStyle={styles.inputStyle}
              keyboardType="default"
            />
          )}
          name="phoneNumber"
          rules={{required: true}}
          defaultValue=""
        />
        <Button
          onPress={onSubmit}
          disabled={Boolean(errors.phoneNumber?.message)}
          loadingProps={{size: 'large', color: 'white'}}
          buttonStyle={styles.submitButton}
          title="Submit"
        />
      </View>
    </>
  );
}
