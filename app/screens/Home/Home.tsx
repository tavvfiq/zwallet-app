/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Image} from 'react-native-elements';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import _ioClient from 'socket.io-client';
import userIcon from '../../assets/img/user.png';
import UserCard from '../../components/UserCard/UserCard';
import styles from './styles';
import {RootState} from '../../store';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {getTransaction} from '../../store/transaction/actions';
import {getUser, logout} from '../../store/user/actions';
import {isEmpty} from 'underscore';
import {SOCKET_URL} from '../../utils/environment';
import {
  changeStatusbarTheme,
  setSystemSocket,
} from '../../store/system/actions';
import {LocalNotification} from '../../services/NotificationService';
import colorTheme from '../../shared/appColorTheme';

import {BoldText} from '../../components/CustomText/CustomText';

type Props = {
  navigation: StackNavigationProp<any, any>;
};

type SocketData = {
  title: string;
  message: string;
};

const selector = (state: RootState) => state;

const Home: React.FunctionComponent<Props> = (props) => {
  const {session, transaction} = useSelector(selector);
  const {socket, enableNotification, sessionIsValid} = useSelector(
    (state: RootState) => state.system,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    //TODO: store the recent transaction on local state and update when there is new transaction
    if (sessionIsValid && session.user.credentials.token) {
      dispatch(
        getTransaction(
          `/transaction/${session.user.credentials.id}?page=1&limit=3`,
        ),
      );
    } else {
      dispatch(logout());
      props.navigation.reset({
        index: 0,
        routes: [
          {
            name: 'AuthScreen',
          },
        ],
      });
    }
  }, [dispatch, session.user.details.balance, session.user.credentials.id]);

  const changeTheme = React.useCallback(() => {
    dispatch(
      changeStatusbarTheme({
        backgroundColor: '#FAFCFF',
        barStyle: 'dark-content',
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (socket !== null) return;
    const newSocket = _ioClient(SOCKET_URL, {
      query: {id: session.user.credentials.id},
    });
    dispatch(setSystemSocket(newSocket));
  }, []);

  //subscribe to socket event
  useEffect(() => {
    if (socket === null) return;
    socket?.on('transaction', ({title, message}: SocketData) => {
      dispatch(getUser(session.user.credentials.id as number));
      if (enableNotification) LocalNotification(title, message);
    });
    return () => {
      socket?.off('transaction');
    };
  }, [socket, enableNotification]);

  //change statusbar color
  useEffect(() => {
    const eventHandler = props.navigation.addListener('focus', () =>
      changeTheme(),
    );
    return () => eventHandler();
  }, []);

  return (
      <ScrollView
        contentContainerStyle={styles.transactionHistoryList}
        // contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        <View style={styles.homeContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.textAndImage}>
              <Pressable
                onPress={() => {
                  props.navigation.navigate('ProfileScreen', {
                    screen: 'Profile',
                  });
                }}>
                <Image
                  style={styles.profileImage}
                  source={
                    session.user.details.image
                      ? {uri: session.user.details.image}
                      : userIcon
                  }
                  PlaceholderContent={
                    <ActivityIndicator size="small" color={colorTheme.white} />
                  }
                />
              </Pressable>

              <View style={styles.textContainer}>
                <Text style={styles.helloText}>Hello,</Text>
                <BoldText style={styles.nameText}>
                  {session.user.credentials.username}
                </BoldText>
              </View>
            </View>
            <Icon name="bell" size={21} style={styles.icon} />
          </View>
          <View style={styles.cardBalanceContainer}>
            <Text style={styles.childText}>Balance</Text>
            <BoldText style={styles.balanceText}>
              Rp{Number(session.user.details.balance).toLocaleString('id-ID')}
            </BoldText>
            <Text style={styles.childText}>
              {session.user.details.phoneNumber
                ? session.user.details.phoneNumber
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
                props.navigation.navigate('TransactionScreen', {
                  screen: 'SearchReceiver',
                });
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
            <BoldText style={styles.subSectionText}>
              Transaction History
            </BoldText>
            <Pressable
              onPress={() => {
                props.navigation.navigate('TransactionScreen', {
                  screen: 'TransactionHistory',
                  params: {id: session.user.credentials.id},
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
            transaction.transactions.slice(0, 3).map((item, index) => {
              return <UserCard key={index} {...item} />;
            })
          )}
        </View>
      </ScrollView>
  );
};

export default Home;
