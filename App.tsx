/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import GlobalFont from 'react-native-global-font';

import UserCard from './src/components/UserCard/UserCard';

declare const global: {HermesInternal: null | {}};

const cardProps = {
  name: 'Taufiq Widi',
  image_path: '',
  transaction_name: 'Transfer',
  transaction_type: 'in',
  amount: 1150000,
};

const App = () => {
  useEffect(() => {
    let defaultFont = 'NunintoSans';
    GlobalFont.applyGlobal(defaultFont);
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <UserCard {...cardProps} />
    </>
  );
};

export default App;
