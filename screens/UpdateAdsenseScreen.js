import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import SelectorCity from '../innerCoponents/Selector_city';
import SelectorCategory from './../innerCoponents/Selector_category';
import SelectorHours from '../innerCoponents/Selector_hours';
import SelectorServices from '../innerCoponents/Selector_services';
import SelectorDistrict from './../innerCoponents/Selector_district';
import localhosturl from './../localhoststring';
import Screen3 from '../innerCoponents/Selector_categoriesVisual';

const UpdateAdsenseScreen = ({ route }) => {

  const navigation = useNavigation();

  const { adId, adCity, adDistrict, adCategory, adPhone, adAddress, adWorkhours, adServiceParams, adDescription, adTestimonials } = route.params;


  const [city, setCity] = useState(adCity);
  const [cityDistrict, setCityDistrict] = useState(adDistrict);
  const [category, setCategory] = useState(adCategory);
  const [phone, setPhone] = useState(adPhone);
  const [address, setAddress] = useState(adAddress);
  const [workhoursStart, setWorkhoursStart] = useState(adWorkhours.split('-')[0]);
  const [workhoursEnd, setWorkhoursEnd] = useState(adWorkhours.split('-')[1]);
  const [workhours, setWorkhours] = useState(adWorkhours);
  const [servicesList, setServicesList] = useState(adServiceParams);
  const [description, setDescription] = useState(adDescription);

  const updateAdsense = async () => {

    if (!phone || !city || !address || !workhours) {
      Alert.alert('Некорректные данные', 'Пожалуйста, заполните все поля: телефон, город, адрес, часы работы и минимум одну фотографию');
      return;
    }

    let id = adId
    let district = cityDistrict

    axios.post(`${localhosturl}/updateAdsense`, { id, category, city, district, phone, address, workhours, servicesList, description })
      .then((response) => {
        Alert.alert('Успешно', 'Объявление изменено');
        navigation.navigate('Профиль');
        console.log(response.data.data);
      }).catch((error) => { console.error(error); });
  };


  return (
    <ScrollView>
      <View style={styles.container}>
        <SelectorCity city={city} setCity={setCity} />
        <SelectorDistrict city={city} cityDistrict={cityDistrict} setCityDistrict={setCityDistrict} />
        <SelectorCategory category={category} setCategory={setCategory} />
        <SelectorHours workhoursStart={workhoursStart} setWorkhoursStart={setWorkhoursStart} workhoursEnd={workhoursEnd} setWorkhoursEnd={setWorkhoursEnd} workhours={workhours} setWorkhours={setWorkhours} />
        <TextInput style={{ borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 10, marginBottom: 10, fontSize: 16 }} placeholder="Телефон" onChangeText={setPhone} value={phone} />
        <TextInput style={{ borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 10, marginBottom: 10, fontSize: 16 }} placeholder="Адрес" onChangeText={setAddress} value={address} />
        <SelectorServices servicesList={servicesList} setServicesList={setServicesList} />
        <TextInput
          style={{
            textAlignVertical: 'top', borderRadius: 10, height: 120, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20, marginTop: 10, marginBottom: 10, fontSize: 16
          }}
          multiline={true} placeholder="Введите описание" onChangeText={setDescription} value={description} />
      </View>

      <TouchableOpacity style={styles.sendButton} onPress={updateAdsense}>
        <Text style={styles.sendButtonText}>Обновить объявление</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f3f2f8'
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  imagePickerButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    marginBottom: 10,
  },
  imagePickerButtonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  imageContainer: {
    margin: 5,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  removeImageButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  removeImageButtonText: {
    color: 'white',
    fontSize: 12,
  },
  sendButton: {
    marginTop: 35,
    backgroundColor: 'rgb(0, 191, 255)',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default UpdateAdsenseScreen;
