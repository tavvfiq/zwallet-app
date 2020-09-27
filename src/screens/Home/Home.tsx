import React from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';
import userIcon from '../../assets/img/user.png';
import UserCard from '../../components/UserCard/UserCard';
import styles from './styles';
import {UserTransactionData} from '../../utils/dummyData';
import {RootState} from '../../store';
import {useSelector} from 'react-redux';

const selectUser = (state: RootState) => state.user.user;

const Home = () => {
  const user = useSelector(selectUser);
  return (
    <>
      <View style={styles.homeContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.textAndImage}>
            <FastImage
              style={styles.profileImage}
              source={user.details.image ? {uri: user.details.image} : userIcon}
              {...{resizeMode: 'cover'}}
            />
            <View style={styles.textContainer}>
              <Text style={styles.helloText}>Hello,</Text>
              <Text style={styles.nameText}>{user.credentials.username}</Text>
            </View>
          </View>
          <Icon name="bell" size={21} style={styles.icon} />
        </View>
        <View style={styles.cardBalanceContainer}>
          <Text style={styles.childText}>Balance</Text>
          <Text style={styles.balanceText}>
            Rp{user.details.balance?.toLocaleString('id-ID')}
          </Text>
          <Text style={styles.childText}>
            {user.details.phoneNumber
              ? user.details.phoneNumber
              : 'No Phone Number'}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            icon={<Icon name="arrow-up" color="#608DE2" size={28} />}
            title="Transfer"
            titleStyle={styles.buttonText}
            buttonStyle={styles.buttonStyle}
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
          <Pressable style={styles.seeAllButton}>
            <Text style={styles.seeAllButtonText}>See all</Text>
          </Pressable>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.transactionHistoryList}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        {UserTransactionData.map((item) => {
          return <UserCard key={item.id} {...item} />;
        })}
      </ScrollView>
    </>
  );
};

export default Home;
