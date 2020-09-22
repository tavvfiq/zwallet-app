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
  name: string;
  email: string;
  password: string;
};

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

const validationSchema = yupObject().shape({
  name: yupString().required(strings.nameRequired),
  email: yupString()
    .email(strings.invalidEmailFormat)
    .required(strings.emailRequired),
  password: yupString()
    .min(8, strings.passwordMinLength)
    .required(strings.passwordRequired)
    .matches(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/),
});

class RegisterForm extends Component<Props, object> {
  state = {
    showPassword: false,
  };

  toggleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  toLoginScreen = () => {
    this.props.navigation.navigate('Login');
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
        <Text style={styles.titleText}>Sign Up</Text>
        <Text style={styles.subTitleText}>
          Create your account to access Zwallet.
        </Text>
        <Input
          placeholder={strings.name}
          autoCapitalize="none"
          value={values.name}
          onChangeText={(value) => setFieldValue('name', value)}
          onBlur={() => setFieldTouched('name')}
          editable={!isSubmitting}
          errorStyle={styles.errorMessage}
          errorMessage={touched.name && errors.name ? errors.name : undefined}
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
          onPress={handleSubmit}
          disabled={isSubmitting || !isValid}
          loading={isSubmitting}
          loadingProps={{size: 'large', color: 'white'}}
          buttonStyle={styles.registerButton}
          title="Sign Up"
        />
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account? Let’s </Text>
          <Pressable onPress={this.toLoginScreen}>
            <Text style={styles.loginButton}>Login</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  render() {
    return (
      <Formik
        initialValues={{name: '', email: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={(values: FormValues, formikBag: FormikHelpers<FormValues>) =>
          this.handleSubmit(values, formikBag)
        }>
        {(formikBag: FormikProps<FormValues>) => this.renderForm(formikBag)}
      </Formik>
    );
  }
}

export default RegisterForm;
