import React from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import userIcon from '../../assets/img/user.jpg';
import {CardProps} from './propsType';

const UserCard = (props: CardProps) => {
  return (
    <>
      <View style={styles.cardContainer}>
        <View style={styles.imageAndName}>
          <FastImage
            style={styles.image}
            source={
              props.image_path !== '' ? {uri: props.image_path} : userIcon
            }
            {...{resizeMode: 'cover'}}
          />
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{props.name}</Text>
            <Text style={styles.childText}>
              {props.transaction_name
                ? props.transaction_name
                : props.phone_number}
            </Text>
          </View>
        </View>
        <Text
          style={
            props.transaction_type === 'in'
              ? styles.amountTextIn
              : styles.amountTextOut
          }>
          {props.amount
            ? `${
                props.transaction_type === 'in' ? '+' : '-'
              }Rp${props.amount.toLocaleString('id-ID')}`
            : ''}
        </Text>
      </View>
    </>
  );
};

export default UserCard;
