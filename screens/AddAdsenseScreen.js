import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, Button, StyleSheet, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const generateTimeItems = () => {
  let items = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      let label = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      let value = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      items.push({ label, value });
    }
  }
  return items;
};

const AddAdsenseScreen = () => {
  const [user, setUser] = useState('default');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [workhoursStart, setWorkhoursStart] = useState('');
  const [workhoursEnd, setWorkhoursEnd] = useState('');
  const [workhours, setWorkhours] = useState('');
  const [services, setServices] = useState('');
  const [serviceParams, setServiceParams] = useState([]);
  const [selectedHours, setSelectedHours] = useState(null);
  const [price, setPrice] = useState('');

  useEffect(() => {
    async function userCheckUp() {
      let userDataString = await AsyncStorage.getItem('userData');
      userDataString = JSON.parse(userDataString)
      console.log(userDataString)
      await setUser(userDataString.phone)
      console.log(user)
    }
    userCheckUp()
  }, [])


  const addServiceParam = () => {
    if (selectedHours && price) {
      const newServiceParams = [...serviceParams, { hours: selectedHours, price }];
      setServiceParams(newServiceParams);
      setSelectedHours(null);
      setPrice('');
    }
  };

  const submitAdsense = async () => {
    try {
      await axios.post('http://192.168.1.102:3000/adsenses', {
        user, category, city, phone, address, workhours, serviceParams
      });
      alert('dome')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      < View style={styles.container} >

        <RNPickerSelect
          onValueChange={(value) => setCity(value)}
          placeholder={{ label: 'Выберите город', value: null }}
          items={[
            { label: 'Ташкент', value: 'Ташкент' },
            { label: 'Ташкентская обл', value: 'Ташкентская обл' },
            { label: 'Самарканд', value: 'Самарканд' },
            { label: 'Наманган', value: 'Наманган' },
            { label: 'Андижан', value: 'Андижан' },
            { label: 'Фергана', value: 'Фергана' },
            { label: 'Бухара', value: 'Бухара' },
            { label: 'Хива', value: 'Хива' },
            { label: 'Ургенч', value: 'Ургенч' },
            { label: 'Нукус', value: 'Нукус' },
            { label: 'Карши', value: 'Карши' },
            { label: 'Гулистан', value: 'Гулистан' },
            { label: 'Джизак', value: 'Джизак' },
            { label: 'Термез', value: 'Термез' },
            { label: 'Шахрисабз', value: 'Шахрисабз' },
            { label: 'Сырдарья', value: 'Сырдарья' },
            // Add more cities as needed
          ]}
          value={city}
          style={pickerSelectStyles}
        />
        <RNPickerSelect
          onValueChange={(value) => setCategory(value)}
          placeholder={{ label: 'Выберите категорию', value: null }}
          items={[
            { label: 'Фитнес', value: 'Фитнес' },
            { label: 'Бани, сауны', value: 'Бани, сауны' },
            { label: 'Пирсинг', value: 'Пирсинг' },
            { label: 'Языковая школа', value: 'Языковая школа' },
            { label: 'Коворкинг', value: 'Коворкинг' },
            { label: 'Массаж', value: 'Массаж' },
            { label: 'Психология', value: 'Психология' },
            { label: 'Парикмахерские услуги', value: 'Парикмахерские услуги' },
            { label: 'Ногтевой сервис', value: 'Ногтевой сервис' },
            { label: 'Брови', value: 'Брови' },
            { label: 'Татуаж, тату', value: 'Татуаж, тату' },
            { label: 'СПА', value: 'СПА' },
            { label: 'Подология', value: 'Подология' },
            { label: 'Депиляция, эпиляция', value: 'Депиляция, эпиляция' },
            { label: 'Репетитор', value: 'Репетитор' },
            { label: 'Ресницы', value: 'Ресницы' },
            { label: 'Курсы', value: 'Курсы' },
            { label: 'Прочие', value: 'Прочие' },
            { label: 'Аренда', value: 'Аренда' },
            { label: 'Косметология, уход', value: 'Косметология, уход' },
            { label: 'Стоматология', value: 'Стоматология' },
            { label: 'Ветеринария', value: 'Ветеринария' },
            { label: 'Визаж', value: 'Визаж' },
            { label: 'Груминг', value: 'Груминг' },
            { label: 'Усы, борода', value: 'Усы, борода' },
            { label: 'Барбершоп', value: 'Барбершоп' },
          ]}
          value={category}
          style={pickerSelectStyles}
        />

        <RNPickerSelect
          onValueChange={(value) => { setWorkhoursStart(value); setWorkhours(`${value}-${workhoursEnd}`) }}
          placeholder={{ label: 'Начало рабочего дня', value: null }}
          items={generateTimeItems()}
          value={workhoursStart}
          style={pickerSelectStyles}
        />
        <RNPickerSelect
          onValueChange={(value) => { setWorkhoursEnd(value); setWorkhours(`${workhoursStart}-${value}`) }}
          placeholder={{ label: 'Конец рабочего дня', value: null }}
          items={generateTimeItems()}
          value={workhoursEnd}
          style={pickerSelectStyles}
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
          serviceParams.map((param, index) => (
            <View key={index} style={styles.serviceParam}>
              <Text>{param.hours} часа - {param.price}</Text>
            </View>
          ))
        }
        <RNPickerSelect
          onValueChange={(value) => setSelectedHours(value)}
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
          value={selectedHours}
          style={pickerSelectStyles}
        />
        <TextInput
          style={styles.input}
          placeholder="Введите цену"
          onChangeText={setPrice}
          value={price}
        />
        <Button title="Добавить параметр" onPress={addServiceParam} />
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