import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, Button, StyleSheet, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SelectorCity from '../innerCoponents/Selector_city';
import SelectorCategory from './../innerCoponents/Selector_category';
import SelectorHours from '../innerCoponents/Selector_hours';
import SelectorServices from '../innerCoponents/Selector_services';

const AddAdsenseScreen = () => {
  const [user, setUser] = useState('default');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [workhoursStart, setWorkhoursStart] = useState('');
  const [workhoursEnd, setWorkhoursEnd] = useState('');
  const [workhours, setWorkhours] = useState('');

  const [servicesList, setServicesList] = useState([]);
  const [newServiceHours, setNewServiceHours] = useState(null);
  const [newServicePrice, setNewServicePrice] = useState('');

  useEffect(() => {
    async function userCheckUp() {
      let userDataString = await AsyncStorage.getItem('userData');
      userDataString = JSON.parse(userDataString)
      console.log(userDataString)
      await setUser(userDataString.phone)
    }
    userCheckUp()
  }, [])


  // const addNewServiceParam = () => {
  //   if (newServiceHours && newServicePrice) {
  //     const newServicesList = [...servicesList, { hours: newServiceHours, price: newServicePrice }];
  //     setServicesList(newServicesList);
  //     setNewServiceHours(null);
  //     setNewServicePrice('');
  //   }
  // };

  const submitAdsense = async () => {
    try {
      await axios.post('http://192.168.1.102:3000/adsenses', {
        user, category, city, phone, address, workhours, servicesList
      });
      alert('done')
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <ScrollView>
      < View style={styles.container} >

        <SelectorCity city={city} setCity={setCity} />
        <SelectorCategory category={category} setCategory={setCategory} />
        <SelectorHours
          workhoursStart={workhoursStart}
          setWorkhoursStart={setWorkhoursStart}
          workhoursEnd={workhoursEnd}
          setWorkhoursEnd={setWorkhoursEnd}
          workhours={workhours}
          setWorkhours={setWorkhours}
        />
        <TextInput
          style={styles.input}
          placeholder="Контактный телефон"
          onChangeText={setPhone}
          value={phone}
        />
        <TextInput
          style={styles.input}
          placeholder="Адрес"
          onChangeText={setAddress}
          value={address}
        />
        <SelectorServices
          newServiceHours={newServiceHours}
          setNewServiceHours={setNewServiceHours}
          newServicePrice={newServicePrice}
          setNewServicePrice={setNewServicePrice}
          servicesList={servicesList}
          setServicesList={setServicesList}
        />
        <Button title="Add Adsense" onPress={submitAdsense} />
      </View >
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  separator: {
    marginHorizontal: 5,
  },
});

export default AddAdsenseScreen;