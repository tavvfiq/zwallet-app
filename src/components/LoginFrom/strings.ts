import LocalizedStrings from 'react-native-localization';

let strings = new LocalizedStrings({
  en: {
    emailAddress: 'Email address',
    password: 'Password',
    invalidEmailFormat:
      "A valid email can only contain latin letters, numbers, '@' and '.' with domain",
    emailRequired: 'An email address is required.',
    passwordRequired: 'A password is required.',
    passwordMinLength:
      'Password must contain at least 8 characters, and one number',
  },
});

export default strings;
