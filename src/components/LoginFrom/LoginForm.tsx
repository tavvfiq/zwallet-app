import strings from './strings';
import styles from './styles';
import React, {Component} from 'react';
import {View, Text, Pressable} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {Formik, FormikProps, FormikHelpers} from 'formik';
import {object as yupObject, string as yupString} from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import {NavigationScreenProp} from 'react-navigation';

type FormValues = {
  email: string;
  password: string;
};

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

const validationSchema = yupObject().shape({
  email: yupString()
    .email(strings.invalidEmailFormat)
    .required(strings.emailRequired),
  password: yupString()
    .min(8, strings.passwordMinLength)
    .required(strings.passwordRequired)
    .matches(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/),
});

class LoginForm extends Component<Props, object> {
  state = {
    showPassword: false,
  };

  toSignUpScreen = () => {
    this.props.navigation.navigate('SignUp');
  };

  toggleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleSubmit = (values: FormValues, formikBag: FormikHelpers<FormValues>) => {
    formikBag.setSubmitting(true);
  };

  renderForm = ({
    values,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    isSubmitting,
    isValid,
  }: FormikProps<FormValues>) => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Zwallet</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.titleText}>Login</Text>
        <Text style={styles.subTitleText}>
          Login to your existing account to access all the features in Zwallet.
        </Text>
        <Input
          placeholder={strings.emailAddress}
          keyboardType="email-address"
          autoCapitalize="none"
          value={values.email}
          onChangeText={(value) => setFieldValue('email', value)}
          onBlur={() => setFieldTouched('email')}
          editable={!isSubmitting}
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
          editable={!isSubmitting}
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
        />
        <Text style={styles.errorMessageText}></Text>
        <Button
          onPress={handleSubmit}
          disabled={isSubmitting || !isValid}
          loading={isSubmitting}
          loadingProps={{size: 'large', color: 'white'}}
          buttonStyle={styles.loginButton}
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
  );

  render() {
    return (
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={(values: FormValues, formikBag: FormikHelpers<FormValues>) =>
          this.handleSubmit(values, formikBag)
        }>
        {(formikBag: FormikProps<FormValues>) => this.renderForm(formikBag)}
      </Formik>
    );
  }
}

export default LoginForm;
