import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
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
  const [workhours, setWorkhours] = useState('');

  const [servicesList, setServicesList] = useState([]);

  useEffect(() => {
    async function userCheckUp() {
      let userDataString = await AsyncStorage.getItem('userData');
      userDataString = JSON.parse(userDataString)
      console.log(userDataString)
      await setUser(userDataString.phone)
    }
    userCheckUp()
  }, [])

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
        <SelectorHours workhours={workhours} setWorkhours={setWorkhours} />
        <TextInput style={styles.input} placeholder="Телефон" onChangeText={setPhone} value={phone} />
        <TextInput style={styles.input} placeholder="Адрес" onChangeText={setAddress} value={address} />
        <SelectorServices servicesList={servicesList} setServicesList={setServicesList} />
        <TouchableOpacity style={styles.sendButton} onPress={submitAdsense}>
          <Text style={styles.sendButtonText}>Добавить объявление</Text>
        </TouchableOpacity>
      </View >
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
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
  sendButton: {
    marginTop: 15,
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default AddAdsenseScreen;