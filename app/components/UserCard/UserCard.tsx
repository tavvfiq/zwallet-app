import React from 'react';
import {View, Text, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import userIcon from '../../assets/img/user.png';
// import {CardProps} from './propsType';
import {ContactDetail} from '../../store/user/types';
import {transactionDetail} from '../../store/transaction/types';

type CardProps = ContactDetail &
  transactionDetail & {
    onClick?: (id: number) => void;
  };

const UserCard = (props: CardProps) => {
  return (
    <>
      <Pressable
        onPress={() => {
          if (props.onClick) {
            props.onClick(props.id);
          }
        }}
        style={styles.cardContainer}>
        <View style={styles.imageAndName}>
          <FastImage
            style={styles.image}
            source={props.image !== null ? {uri: props.image} : userIcon}
            {...{resizeMode: 'cover'}}
          />
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{props.username}</Text>
            <Text style={styles.childText}>
              {props.transaction_name
                ? props.transaction_name
                : props.phoneNumber
                ? props.phoneNumber
                : 'No Phone Number'}
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
            ? `${props.transaction_type === 'in' ? '+' : '-'}Rp${Number(
                props.amount,
              ).toLocaleString('id-ID')}`
            : ''}
        </Text>
      </Pressable>
    </>
  );
};

export default UserCard;
