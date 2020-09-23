import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import UserCard from '../../components/UserCard/UserCard';
import {UserTransactionData} from '../../utils/dummyData';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width,
    height: 98,
    backgroundColor: '#6379F4',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 42,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginLeft: 26,
  },
});

const TransactionHistory = () => {
  const [dateNow, setDateNow] = useState<Date | undefined>();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="arrow-left" color="white" size={26} />
          <Text style={styles.headerText}>History</Text>
        </View>
      </View>
    </>
  );
};

export default TransactionHistory;
