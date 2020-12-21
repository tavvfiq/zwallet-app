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
import {login} from '../../store/user/actions';
import {changeStatusbarTheme} from '../../store/system/actions';
import {loginType} from '../../utils/types';
import {NormalText, BoldText} from '../CustomText/CustomText';

//connecting state and dispatch
const mapState = (state: RootState) => ({
  system: state.system,
  session: state.session,
});

const mapDispatch = (dispatch: AppThunkDispatch) => {
  return {
    login: (data: loginType) => dispatch(login(data)),
    changeTheme: (theme: {backgroundColor: string; barStyle: string}) =>
      dispatch(changeStatusbarTheme(theme)),
  };
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  navigation: StackNavigationProp<any, any>;
  route?: RouteProp<any, any>;
};

type FormValues = {
  email: string;
  password: string;
};

const validationSchema = yupObject().shape({
  email: yupString()
    .email(strings.invalidEmailFormat)
    .required(strings.emailRequired),
  password: yupString().required(strings.passwordRequired),
});

type State = {
  showPassword: boolean;
  msg: string;
};

class LoginForm extends Component<Props, State> {
  state = {
    showPassword: false,
    msg: '',
  };

  toSignUpScreen = () => {
    this.props.navigation.navigate('SignUp');
  };

  toggleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleSubmit = (values: FormValues) => {
    this.props.login(values);
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
        <BoldText style={styles.headerText}>Zwallet</BoldText>
      </View>
      <View
        style={[
          styles.formContainer,
          {flexDirection: 'column', justifyContent: 'space-between'},
        ]}>
        <View>
          <BoldText style={styles.titleText}>Login</BoldText>
          <NormalText style={styles.subTitleText}>
            Login to your existing account to access all the features in
            Zwallet.
          </NormalText>
          <Input
            placeholder={strings.emailAddress}
            keyboardType="email-address"
            autoCapitalize="none"
            value={values.email}
            onChangeText={(value) => setFieldValue('email', value)}
            onBlur={() => setFieldTouched('email')}
            editable={!this.props.session.status.loading}
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
            editable={!this.props.session.status.loading}
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
          <Button
            type="clear"
            title="Forgot password?"
            titleStyle={styles.forgotPassword}
            containerStyle={styles.forgotPasswordButton}
            onPress={() => {
              this.props.navigation.navigate('ResetPassword', {
                id: undefined,
                isReset: false,
              });
            }}
          />
          <Text style={styles.errorMessageText}>
            {this.props.session.status.error
              ? this.props.session.status.msg
              : ''}
          </Text>
        </View>
        <View>
          <Button
            onPress={handleSubmit}
            disabled={this.props.session.status.loading || !isValid}
            loading={this.props.session.status.loading}
            loadingProps={{size: 'large', color: 'white'}}
            buttonStyle={[styles.loginButton, {marginTop: 0}]}
            title="Login"
          />
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don’t have an account? Let’s </Text>
            <Pressable onPress={this.toSignUpScreen}>
              <Text style={styles.signUpButton}>Sign Up</Text>
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
          initialValues={{email: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={(values: FormValues) => this.handleSubmit(values)}>
          {(formikBag: FormikProps<FormValues>) => this.renderForm(formikBag)}
        </Formik>
      </ScrollView>
    );
  }
}

export default connector(LoginForm);
