import React from 'react';
import {View, Text, Pressable, ActivityIndicator} from 'react-native';
import {Image} from 'react-native-elements';
import styles from './styles';
import userIcon from '../../assets/img/user.png';
import colorTheme from '../../shared/appColorTheme';
import {ContactDetail} from '../../store/user/types';
import {transactionDetail} from '../../store/transaction/types';

import {NormalText, BoldText} from '../CustomText/CustomText';

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
          <Image
            style={styles.image}
            source={props.image !== null ? {uri: props.image} : userIcon}
            {...{resizeMode: 'cover'}}
            PlaceholderContent={
              <ActivityIndicator size="small" color={colorTheme.white} />
            }
          />
          <View style={styles.textContainer}>
            <BoldText style={styles.nameText}>{props.username}</BoldText>
            <Text style={styles.childText}>
              {props.transaction_name
                ? props.transaction_name
                : props.phone_number
                ? props.phone_number
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
