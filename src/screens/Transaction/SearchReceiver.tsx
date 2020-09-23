import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FAFCFF',
    height,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 42,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4D4B57',
    marginLeft: 26,
  },
  searchContainer: {
    backgroundColor: '#FAFCFF',
    borderWidth: 0,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 25,
  },
  searchInput: {
    backgroundColor: 'rgba(58, 61, 66, 0.1)',
    borderRadius: 12,
    paddingLeft: 12,
  },
  input: {
    fontSize: 16,
    fontWeight: '400',
    color: '#4D4B57',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4D4B57',
    marginTop: 25,
    marginLeft: 16,
  },
});

const SearchReceiver = () => {
  const [value, setValue] = useState('');
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Icon name="arrow-left" color="#4D4B57" size={26} />
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
        />
        <Text style={styles.subTitle}>Quick Access</Text>
      </View>
    </>
  );
};

export default SearchReceiver;
