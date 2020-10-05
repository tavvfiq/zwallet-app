/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import userIcon from '../../assets/img/user.png';
import UserCard from '../../components/UserCard/UserCard';
import styles from './styles';
import {RootState} from '../../store';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';
import {getTransaction} from '../../store/transaction/actions';
import {isEmpty} from 'underscore';
import {changeStatusbarTheme} from '../../store/system/actions';
import {LocalNotification} from '../../services/NotificationService';

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

const selector = (state: RootState) => state;

const Home = (props: Props) => {
  const {user, transaction} = useSelector(selector);
  const dispatch = useDispatch();
  useEffect(() => {
    //TODO: store the recent transaction on local state and update when there is new transaction
    dispatch(
      getTransaction(`/transaction/${user.user.credentials.id}?page=1&limit=3`),
    );
  }, [dispatch, user.user.details.balance, user.user.credentials.id]);

  const changeTheme = React.useCallback(() => {
    dispatch(
      changeStatusbarTheme({
        backgroundColor: '#FAFCFF',
        barStyle: 'dark-content',
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    const eventListener = props.navigation.addListener('focus', () =>
      changeTheme(),
    );
    return () => {
      eventListener.remove();
    };
  }, []);

  return (
    <>
      <View style={styles.homeContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.textAndImage}>
            <Pressable
              onPress={() => {
                props.navigation.navigate('Profile');
              }}>
              <FastImage
                style={styles.profileImage}
                source={
                  user.user.details.image
                    ? {uri: user.user.details.image}
                    : userIcon
                }
                {...{resizeMode: 'cover'}}
              />
            </Pressable>

            <View style={styles.textContainer}>
              <Text style={styles.helloText}>Hello,</Text>
              <Text style={styles.nameText}>
                {user.user.credentials.username}
              </Text>
            </View>
          </View>
          <Icon name="bell" size={21} style={styles.icon} />
        </View>
        <View style={styles.cardBalanceContainer}>
          <Text style={styles.childText}>Balance</Text>
          <Text style={styles.balanceText}>
            Rp{user.user.details.balance?.toLocaleString('id-ID')}
          </Text>
          <Text style={styles.childText}>
            {user.user.details.phoneNumber
              ? user.user.details.phoneNumber
              : 'No Phone Number'}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            icon={<Icon name="arrow-up" color="#608DE2" size={28} />}
            title="Transfer"
            titleStyle={styles.buttonText}
            buttonStyle={styles.buttonStyle}
            onPress={() => {
              props.navigation.navigate('SearchReceiver');
            }}
          />
          <Button
            icon={<Icon name="plus" color="#608DE2" size={28} />}
            title="Top Up"
            titleStyle={styles.buttonText}
            buttonStyle={styles.buttonStyle}
          />
        </View>
        <View style={styles.subSectionContainer}>
          <Text style={styles.subSectionText}>Transaction History</Text>
          <Pressable
            onPress={() => {
              props.navigation.navigate('TransactionHistory', {
                id: user.user.credentials.id,
              });
            }}
            style={styles.seeAllButton}>
            <Text style={styles.seeAllButtonText}>See all</Text>
          </Pressable>
        </View>
        {isEmpty(transaction.transactions) ? (
          <Text
            style={[
              styles.subSectionText,
              {
                alignSelf: 'center',
                marginTop: 10,
                color: 'rgba(169, 169, 169, 0.8)',
              },
            ]}>
            No Transaction History
          </Text>
        ) : (
          <ScrollView
            contentContainerStyle={styles.transactionHistoryList}
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}>
            {transaction.transactions.slice(0, 3).map((item, index) => {
              return <UserCard key={index} {...item} />;
            })}
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default Home;
