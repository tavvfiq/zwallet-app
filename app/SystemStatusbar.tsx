import React from 'react';
import {View, StyleSheet, Platform, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from './store';

const SystemStatusbar = (props: any) => {
  const {statusbarTheme} = useSelector((state: RootState) => state.system);
  return (
    <>
      <View
        style={[
          styles.statusBar,
          {backgroundColor: statusbarTheme.backgroundColor},
        ]}>
        <StatusBar
          translucent={true}
          backgroundColor={statusbarTheme.backgroundColor}
          barStyle={statusbarTheme.barStyle}
          {...props}
        />
      </View>
    </>
  );
};

// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const styles = StyleSheet.create({
  statusBar: {
    height: 20,
    // marginBottom: 20,
  },
});
export default SystemStatusbar;
