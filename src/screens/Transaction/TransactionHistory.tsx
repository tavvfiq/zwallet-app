import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, SectionList} from 'react-native';
import {NavigationScreenProp, NavigationRoute} from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store/index';
import {transactionDetail} from '../../store/transaction/types';
import {DateTime} from 'luxon';
import {getTransaction} from '../../store/transaction/actions';
import {Button} from 'react-native-elements';
import UserCard from '../../components/UserCard/UserCard';
import {isEmpty} from 'underscore';

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
  route: NavigationRoute;
};

type sectionListData = {
  title: string;
  data: transactionDetail[];
};

const compare = (
  a: transactionDetail,
  b: transactionDetail,
  sort: string,
): number => {
  if (sort === 'in') {
    if (a.transaction_type < b.transaction_type) {
      return 1;
    } else {
      return -1;
    }
  } else if (sort === 'out') {
    if (a.transaction_type > b.transaction_type) {
      return 1;
    } else {
      return -1;
    }
  } else {
    return 0;
  }
};

const sortTransactions = (
  transactions: transactionDetail[],
  sort: string,
): sectionListData[] => {
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

  const thisWeek = transactions.filter((transaction) => {
    return (
      DateTime.fromISO(transaction.date as string).toISODate() >=
        startOfTheWeek &&
      DateTime.fromISO(transaction.date as string).toISODate() <= endOfTheWeek
    );
  });
  const thisMonth = transactions.filter((transaction) => {
    return (
      !thisWeek.includes(transaction) &&
      DateTime.fromISO(transaction.date as string).toISODate() >=
        startOfTheMonth &&
      DateTime.fromISO(transaction.date as string).toISODate() <= endOfTheMonth
    );
  });
  const remainingTransaction = transactions.filter((transaction) => {
    return !thisWeek.includes(transaction) && !thisMonth.includes(transaction);
  });
  let sectionData: sectionListData[];
  //TODO: sort the transaction by type hang the program
  // try {
  //   sectionData = [
  //     {
  //       title: 'This Week',
  //       data: sort === '' ? thisWeek : thisWeek.sort((a) => compare(a, sort)),
  //     },
  //     {
  //       title: 'This Month',
  //       data: sort === '' ? thisMonth : thisMonth.sort((a) => compare(a, sort)),
  //     },
  //     {
  //       title: 'All History',
  //       data:
  //         sort === ''
  //           ? remainingTransaction
  //           : remainingTransaction.sort((a) => compare(a, sort)),
  //     },
  //   ];
  // } catch (err) {
  // console.log(err);
  // console.log(
  //   isEmpty(thisWeek),
  //   isEmpty(thisMonth),
  //   isEmpty(remainingTransaction),
  // );
  // console.log(thisWeek.sort((a, b) => compare(a, b, sort)));
  sectionData = [
    {
      title: 'This Week',
      data: thisWeek,
    },
    {
      title: 'This Month',
      data: thisMonth,
    },
    {
      title: 'All History',
      data: remainingTransaction,
    },
  ];
  // }
  return sectionData;
};

const buttonStateInit: {[key: string]: any} = {
  out: false,
  in: false,
  sort: '',
};

const transactionSelector = (state: RootState) => state;

const TransactionHistory = (props: Props) => {
  const {transaction} = useSelector(transactionSelector);
  const [buttonState, setButtonState] = useState(buttonStateInit);
  const dispatch = useDispatch();
  const toggleButton = (buttonKey: string) => {
    const newState = {...buttonState};
    for (const key in buttonState) {
      if (key === buttonKey) {
        newState[key] = !buttonState[key];
        if (newState.sort === buttonKey) {
          newState.sort = '';
        } else {
          newState.sort = buttonKey;
        }
      } else if (key !== 'sort') {
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
      getTransaction(`/transaction/${props.route.params?.id}?page=1&limit=10`),
    );
  }, [dispatch]);
  const sectionData = sortTransactions(
    transaction.transactions,
    buttonState.sort,
  );
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
