import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, SectionList} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store/index';
import {transactionDetail} from '../../store/transaction/types';
import {DateTime} from 'luxon';
import {getTransaction} from '../../store/transaction/actions';
import {Button} from 'react-native-elements';
import UserCard from '../../components/UserCard/UserCard';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FAFCFF',
    height,
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
  SectionHeaderStyle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#7A7886',
    marginTop: 30,
    marginLeft: 16,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 5,
    paddingBottom: 10,
  },
  buttonStyle: {
    width: 57,
    height: 57,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'space-evenly',
    elevation: 2,
  },
  buttonStyleClicked: {
    width: 57,
    height: 57,
    backgroundColor: '#6379F4',
    borderRadius: 10,
    justifyContent: 'space-evenly',
    elevation: 2,
  },
  buttonStyleFilter: {
    width: 189,
    height: 57,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'space-evenly',
  },
  buttonText: {
    color: '#6379F4',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionList: {
    paddingBottom: 5,
  },
  singleButtonContainer: {
    elevation: 2,
  },
});

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

type sectionListData = {
  title: string;
  data: transactionDetail[];
};

const compare = (transaction: transactionDetail, sort: string): number => {
  if (transaction.transaction_type !== sort) {
    return 1;
  } else {
    return -1;
  }
};

const sortTransactions = (
  transactions: transactionDetail[],
  sort: string,
): sectionListData[] => {
  let sectionData = [...transactions];
  const startOfTheWeek = DateTime.local().startOf('week').toISODate();
  const endOfTheWeek = DateTime.local()
    .startOf('week')
    .plus({days: 7})
    .toISODate();
  const startOfTheMonth = DateTime.local().startOf('month').toISODate();
  const endOfTheMonth = DateTime.local()
    .startOf('month')
    .plus({days: 30})
    .toISODate();

  const thisWeek = sectionData.filter((transaction) => {
    return (
      DateTime.fromISO(transaction.date as string).toISODate() >=
        startOfTheWeek &&
      DateTime.fromISO(transaction.date as string).toISODate() <= endOfTheWeek
    );
  });
  const thisMonth = sectionData.filter((transaction) => {
    return (
      !thisWeek.includes(transaction) &&
      DateTime.fromISO(transaction.date as string).toISODate() >=
        startOfTheMonth &&
      DateTime.fromISO(transaction.date as string).toISODate() <= endOfTheMonth
    );
  });
  const remainingTransaction = sectionData.filter((transaction) => {
    return !thisWeek.includes(transaction) && !thisMonth.includes(transaction);
  });

  return [
    {
      title: 'This Week',
      data: sort === '' ? thisWeek : thisWeek.sort((a) => compare(a, sort)),
    },
    {
      title: 'This Month',
      data: sort === '' ? thisMonth : thisMonth.sort((a) => compare(a, sort)),
    },
    {
      title: 'All History',
      data:
        sort === ''
          ? remainingTransaction
          : remainingTransaction.sort((a) => compare(a, sort)),
    },
  ];
};

const buttonStateInit: {[key: string]: boolean} = {
  out: false,
  in: false,
};

const userSelector = (state: RootState) => state.user;
const transactionSelector = (state: RootState) => state;

const TransactionHistory = (props: Props) => {
  const {user} = useSelector(userSelector);
  const {transaction} = useSelector(transactionSelector);
  const [sort, setSort] = useState('');
  const [buttonState, setButtonState] = useState(buttonStateInit);
  const dispatch = useDispatch();
  const toggleButton = (buttonKey: string) => {
    const newState = {...buttonState};
    for (const key in buttonState) {
      if (key === buttonKey) {
        newState[key] = !buttonState[key];
      } else {
        newState[key] = false;
      }
    }
    setButtonState(newState);
  };
  const trigGetHistory = () => {
    if (
      transaction.pageInfo.nextPage !== '' &&
      transaction.pageInfo.nextPage !== undefined &&
      !transaction.status.loading
    ) {
      dispatch(getTransaction(transaction.pageInfo.nextPage));
    }
  };
  useEffect(() => {
    dispatch(
      getTransaction(`/transaction/${user.credentials.id}?page=1&limit=5`),
    );
  }, [dispatch, user.credentials.id]);
  const sectionData = sortTransactions(transaction.transactions, sort);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon
            onPress={() => {
              props.navigation.goBack();
            }}
            name="arrow-left"
            color="white"
            size={26}
          />
          <Text style={styles.headerText}>History</Text>
        </View>
        <SectionList
          contentContainerStyle={styles.sectionList}
          showsVerticalScrollIndicator={false}
          sections={sectionData}
          renderSectionHeader={({section}) => (
            <Text style={styles.SectionHeaderStyle}> {section.title} </Text>
          )}
          renderItem={({item}) => (
            <UserCard key={item.transaction_id} {...item} />
          )}
          keyExtractor={(item) => String(item.transaction_id)}
          onEndReached={trigGetHistory}
          onEndReachedThreshold={0.2}
        />
        <View style={styles.buttonContainer}>
          <Button
            containerStyle={styles.singleButtonContainer}
            icon={
              <Icon
                name="arrow-up"
                color={buttonState.out ? 'white' : '#F74C3C'}
                size={28}
              />
            }
            buttonStyle={
              buttonState.out ? styles.buttonStyleClicked : styles.buttonStyle
            }
            onPress={() => {
              toggleButton('out');
              if (sort === 'out') {
                setSort('');
              } else {
                setSort('out');
              }
            }}
          />
          <Button
            containerStyle={styles.singleButtonContainer}
            icon={
              <Icon
                name="arrow-down"
                color={buttonState.in ? 'white' : '#00C06A'}
                size={28}
              />
            }
            buttonStyle={
              buttonState.in ? styles.buttonStyleClicked : styles.buttonStyle
            }
            onPress={() => {
              toggleButton('in');
              if (sort === 'in') {
                setSort('');
              } else {
                setSort('in');
              }
            }}
          />
          <Button
            containerStyle={styles.singleButtonContainer}
            title="Filter by Date"
            titleStyle={styles.buttonText}
            buttonStyle={styles.buttonStyleFilter}
          />
        </View>
      </View>
    </>
  );
};

export default TransactionHistory;
