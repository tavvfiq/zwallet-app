import React from 'react';
import {Text, StyleSheet} from 'react-native';

type fontStyleProps = {
  style: {};
};

export const BoldText: React.FunctionComponent<fontStyleProps> = (props) => {
  return (
    <Text style={{...styles.boldFont, ...props.style}}>{props.children}</Text>
  );
};

export const NormalText: React.FunctionComponent<fontStyleProps> = (props) => {
  return (
    <Text style={{...styles.normalFont, ...props.style}}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  boldFont: {
    fontFamily: 'NunitoSans-Bold',
  },
  normalFont: {
    fontFamily: 'NunitoSans-Regular',
  },
});
