import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store';
import {getContact} from '../../store/user/actions';
import {styles} from './searchReceiverStyle';
import UserCard from '../../components/UserCard/UserCard';
import {NavigationScreenProp} from 'react-navigation';
import {changeStatusbarTheme} from '../../store/system/actions';

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

const selectUser = (state: RootState) => state.user;

const SearchReceiver = (props: Props) => {
  const [value, setValue] = useState('');
  const state = useSelector(selectUser);
  const dispatch = useDispatch();
  const trigGetContactWithSearch = () => {
    dispatch(
      getContact(
        `/user/contact/${state.user.credentials.id}?search=${value}&page=1&limit=5`,
      ),
    );
  };
  const trigGetContact = () => {
    if (
      state.pageInfo.nextPage !== '' &&
      state.pageInfo.nextPage !== undefined &&
      !state.status.loading
    ) {
      dispatch(getContact(state.pageInfo.nextPage));
    }
  };
  useEffect(() => {
    dispatch(
      getContact(
        `/user/contact/${state.user.credentials.id}?search=${value}&page=1&limit=5`,
      ),
    );
  }, []);

  const changeTheme = React.useCallback(() => {
    dispatch(
      changeStatusbarTheme({
        backgroundColor: '#FAFCFF',
        barStyle: 'dark-content',
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    props.navigation.addListener('focus', () => changeTheme());
  }, []);

  const onClickHandler = (id: number) => {
    props.navigation.navigate('Transfer', {id});
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Icon
            name="arrow-left"
            color="#4D4B57"
            size={30}
            onPress={() => {
              props.navigation.goBack();
            }}
          />
          <Text style={styles.headerText}>Find Receiver</Text>
        </View>
        <SearchBar
          platform="android"
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInput}
          inputStyle={styles.input}
          value={value}
          onChangeText={(text) => setValue(text)}
          placeholder="Search receiver here"
          underlineColorAndroid="transparent"
          onSubmitEditing={trigGetContactWithSearch}
          onCancel={trigGetContactWithSearch}
        />
        <Text style={styles.subTitle}>Quick Access</Text>
        <Text style={styles.subTitle}>All Contacts</Text>
        {state.contacts?.length !== 0 ? (
          <Text style={styles.childText}>
            {state.user.details.numOfContact} Contact(s) Found
          </Text>
        ) : value !== '' ? (
          <Text style={styles.childText}>
            No Contact with name {value} is found!
          </Text>
        ) : (
          <Text style={styles.childText}>
            {state.user.details.numOfContact} Contact(s) Found
          </Text>
        )}
        <FlatList
          data={state.contacts}
          renderItem={({item}) => (
            <UserCard key={item.id} {...item} onClick={onClickHandler} />
          )}
          keyExtractor={(item) => String(item.id)}
          onEndReached={trigGetContact}
          contentContainerStyle={styles.listStyle}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
        />
      </View>
    </>
  );
};

export default SearchReceiver;
