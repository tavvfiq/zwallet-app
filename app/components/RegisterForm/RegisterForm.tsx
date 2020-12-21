import strings from './strings';
import styles from './styles';
import React, {Component} from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {Formik, FormikProps} from 'formik';
import {object as yupObject, string as yupString} from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../../store';
import {AppThunkDispatch} from '../../store/thunk';
import {register} from '../../store/user/actions';
import {registerType} from '../../utils/types';
import {NormalText, BoldText} from '../CustomText/CustomText';

//connecting state and dispatch
const mapState = (state: RootState) => ({
  system: state.system,
  user: state.session,
});

const mapDispatch = (dispatch: AppThunkDispatch) => {
  return {
    register: (data: registerType) => dispatch(register(data)),
  };
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  navigation: StackNavigationProp<any, any>;
  route?: RouteProp<any, any>;
};

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const validationSchema = yupObject().shape({
  username: yupString().required(strings.nameRequired),
  email: yupString()
    .email(strings.invalidEmailFormat)
    .required(strings.emailRequired),
  password: yupString()
    .required(strings.passwordRequired)
    .matches(
      /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
      strings.passwordMinLength,
    ),
});

class RegisterForm extends Component<Props, object> {
  state = {
    showPassword: false,
    msg: '',
  };

  toggleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  async waitLogin() {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.props.system.sessionIsValid) {
          resolve(true);
        } else {
          reject(false);
        }
      }, 1000);
    });
  }

  toLoginScreen = () => {
    this.props.navigation.navigate('Login');
  };

  handleSubmit = (values: FormValues) => {
    this.props.register(values);
    // this.waitLogin().then(() => {
    //   this.props.navigation.navigate('CreatePinScreen');
    // });
  };

  renderForm = ({
    values,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    isValid,
  }: FormikProps<FormValues>) => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Zwallet</Text>
      </View>
      <View
        style={[
          styles.formContainer,
          {flexDirection: 'column', justifyContent: 'space-between'},
        ]}>
        <View>
          <BoldText style={styles.titleText}>Sign Up</BoldText>
          <Text style={styles.subTitleText}>
            Create your account to access Zwallet.
          </Text>
          <Input
            placeholder={strings.name}
            autoCapitalize="words"
            value={values.username}
            onChangeText={(value) => setFieldValue('username', value)}
            onBlur={() => setFieldTouched('username')}
            editable={!this.props.user.status.loading}
            errorStyle={styles.errorMessage}
            errorMessage={
              touched.username && errors.username ? errors.username : undefined
            }
            leftIcon={<Icon name="user" color="#6379F4" size={20} />}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
          />
          <Input
            placeholder={strings.emailAddress}
            keyboardType="email-address"
            autoCapitalize="none"
            value={values.email}
            onChangeText={(value) => setFieldValue('email', value)}
            onBlur={() => setFieldTouched('email')}
            editable={!this.props.user.status.loading}
            errorStyle={styles.errorMessage}
            errorMessage={
              touched.email && errors.email ? errors.email : undefined
            }
            leftIcon={<Icon name="mail" color="#6379F4" size={20} />}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
          />
          <Input
            secureTextEntry={!this.state.showPassword}
            placeholder={strings.password}
            autoCapitalize="none"
            value={values.password}
            onChangeText={(value) => setFieldValue('password', value)}
            onBlur={() => setFieldTouched('password')}
            editable={!this.props.user.status.loading}
            errorStyle={styles.errorMessage}
            errorMessage={
              touched.password && errors.password ? errors.password : undefined
            }
            leftIcon={<Icon name="lock" color="#6379F4" size={20} />}
            rightIcon={
              <Icon
                onPress={this.toggleShowPassword}
                name={this.state.showPassword ? 'eye' : 'eye-off'}
                color="#A9A9A9"
                size={20}
              />
            }
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
          />
          <Text style={styles.errorMessageText}>
            {this.props.user.status.error ? this.props.user.status.msg : ''}
          </Text>
        </View>
        <View>
          <Button
            onPress={handleSubmit}
            disabled={this.props.user.status.loading || !isValid}
            loading={this.props.user.status.loading}
            loadingProps={{size: 'large', color: 'white'}}
            buttonStyle={[styles.registerButton, {marginTop: 0}]}
            title="Sign Up"
          />
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Already have an account? Let’s{' '}
            </Text>
            <Pressable onPress={this.toLoginScreen}>
              <Text style={styles.loginButton}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'white'}}>
        <Formik
          initialValues={{username: '', email: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={(values: FormValues) => this.handleSubmit(values)}>
          {(formikBag: FormikProps<FormValues>) => this.renderForm(formikBag)}
        </Formik>
      </ScrollView>
    );
  }
}

export default connector(RegisterForm);
