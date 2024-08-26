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
        <View style={{ marginTop: 12 }}>
          <SelectorCategory category={category} setCategory={setCategory} />
        </View>
        <SelectorHours workhoursStart={workhoursStart} setWorkhoursStart={setWorkhoursStart} workhoursEnd={workhoursEnd} setWorkhoursEnd={setWorkhoursEnd} workhours={workhours} setWorkhours={setWorkhours} />
        <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, color: '#333333', }}>Телефон*</Text>

        <View style={{ flexDirection: 'row', marginTop: 4 }}>

          <View style={{ elevation: 4, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 10, color: 'black', borderBottomLeftRadius: 10, width: '10%', backgroundColor: 'white', marginBottom: 10, fontSize: 16 }} >
            <Text style={{ color: 'grey', fontSize: 16, color: '#C4C4C4' }}>+</Text>
          </View>

          <TextInput
            placeholderTextColor="#C4C4C4"
            style={{
              fontFamily: 'Manrope_500Medium', fontSize: 14, height: 42, elevation: 4, flexGrow: 1, borderTopRightRadius: 12, borderBottomRightRadius: 12, backgroundColor: 'white', paddingHorizontal: 8, paddingVertical: 12, marginBottom: 10, fontSize: 14
            }}
            placeholder="XXX XX XXX XX XX"
            onChangeText={setPhone}
            value={phone} />

        </View>

        <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, color: '#333333', }}>Адрес*</Text>

        <View style={{ marginTop: 4 }}>
          <TextInput
            placeholderTextColor="#C4C4C4"
            style={{
              fontFamily: 'Manrope_500Medium', fontSize: 14, height: 42, elevation: 4, borderRadius: 12, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 8, marginBottom: 10, fontSize: 16
            }}
            placeholder="Укажите адрес"
            onChangeText={setAddress}
            value={address} />
        </View>
        <SelectorServices servicesList={servicesList} setServicesList={setServicesList} horizontaldisplay={true} />

        <Text style={{ textAlign: 'start', marginTop: 0, marginBottom: 4, fontSize: 16, fontFamily: 'Manrope_600SemiBold', color: '#333333' }}>
          Описание
        </Text>
        <TextInput
          style={{
            textAlignVertical: 'top',
            borderRadius: 12,
            height: 140,
            backgroundColor: 'white',
            paddingHorizontal: 8,
            paddingVertical: 10,
            marginBottom: 10,
            fontSize: 14,
            fontFamily: 'Manrope_500Medium',
            color: '#1C4C4C',
            elevation: 4,
          }}
          multiline={true}
          placeholder="Введите описание вашей услуги"
          placeholderTextColor="#C4C4C4"
          onChangeText={setDescription}
          value={description}
        />
      </View>

      <View>
        <TouchableOpacity
          style={{ backgroundColor: 'rgb(0, 148, 255)', borderRadius: 12, alignItems: 'center', height: 36, alignItems: 'center', justifyContent: 'center', marginHorizontal: 24, marginBottom: 40 }}
          onPress={updateAdsense}
        >
          <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Manrope_600SemiBold', letterSpacing: 0.5 }}>Обновить объявление</Text>
        </TouchableOpacity>
      </View>

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
