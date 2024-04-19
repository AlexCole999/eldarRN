import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, Button, StyleSheet, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SelectorCity from '../innerCoponents/Selector_city';
import SelectorCategory from './../innerCoponents/Selector_category';
import SelectorHours from '../innerCoponents/Selector_hours';

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


  const addNewServiceParam = () => {
    if (newServiceHours && newServicePrice) {
      const newServicesList = [...servicesList, { hours: newServiceHours, price: newServicePrice }];
      setServicesList(newServicesList);
      setNewServiceHours(null);
      setNewServicePrice('');
    }
  };

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


        {
          servicesList.map((param, index) => (
            <View key={index} style={styles.serviceParam}>
              <Text>{param.hours} часа - {param.price}</Text>
            </View>
          ))
        }

        <RNPickerSelect
          onValueChange={(value) => setNewServiceHours(value)}
          placeholder={{ label: 'Выберите количество часов', value: null }}
          items={[
            { label: '1 час', value: 1 },
            { label: '2 часа', value: 2 },
            { label: '3 часа', value: 3 },
            { label: '4 часа', value: 4 },
            { label: '5 часов', value: 5 },
            { label: '6 часов', value: 6 },
            { label: '7 часов', value: 7 },
            { label: '8 часов', value: 8 },
            { label: '9 часов', value: 9 },
            { label: '10 часов', value: 10 },
            { label: '1 день', value: 24 },
          ]}
          value={newServiceHours}
          style={pickerSelectStyles}
        />
        <TextInput
          style={styles.input}
          placeholder="Введите цену"
          onChangeText={setNewServicePrice}
          value={newServicePrice}
        />
        <Button title="Добавить параметр" onPress={addNewServiceParam} />
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    width: '100%',
    color: 'black',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5, // Радиус закругления углов
  },
  inputAndroid: {
    height: 50,
    width: '100%',
    color: 'black',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5, // Радиус закругления углов
  },
})

export default AddAdsenseScreen;