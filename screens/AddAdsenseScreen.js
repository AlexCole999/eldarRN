import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import SelectorCity from '../innerCoponents/Selector_city';
import SelectorCategory from './../innerCoponents/Selector_category';
import SelectorHours from '../innerCoponents/Selector_hours';
import SelectorServices from '../innerCoponents/Selector_services';
import SelectorImages from '../innerCoponents/Selector_images';


const AddAdsenseScreen = () => {
  const [user, setUser] = useState('default');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [workhours, setWorkhours] = useState('');
  const [servicesList, setServicesList] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function userCheckUp() {
      let userDataString = await AsyncStorage.getItem('userData');
      userDataString = JSON.parse(userDataString);
      console.log(userDataString);
      await setUser(userDataString?.phone);
    }
    userCheckUp();
  }, []);



  const submitAdsense = async () => {
    try {
      let a = await axios.post('http://192.168.1.102:3000/newAdsense', {
        user, category, city, phone, address, workhours, servicesList
      });
      alert('done');
      console.log(a.data.adsenseId)
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImages = async () => {
    try {

      const userData = await AsyncStorage.getItem('userData');

      if (!userData) {
        Alert.alert('Вы не зарегистрированы', 'Чтобы опубликовать ваше объявление - пройдите регистрацию');
        throw new Error('Вы не зарегистрированы, пройдите регистрацию');
      }

      const formData = new FormData();
      formData.append('user', userData);

      for (const image of images) {
        let imageParsedLength = image.split('/').length;
        let imageName = image.split('/')[imageParsedLength - 1];
        formData.append('images', {
          uri: image,
          type: 'image/jpeg',
          name: imageName,
        });
      }

      let response = await axios.post('http://192.168.1.102:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Успешно', 'Изображения успешно загружены');
      console.log(response.data.paths);
    } catch (err) {
      if (err.message == 'Network Error') { Alert.alert('Плохой интернет', 'Попробуйте отправить еще раз'); }
      else Alert.alert('Ошибка', 'Ошибка при загрузке изображения');
      console.error('Ошибка при загрузке изображения:', err.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <SelectorCity city={city} setCity={setCity} />
        <SelectorCategory category={category} setCategory={setCategory} />
        <SelectorHours setWorkhours={setWorkhours} />
        <TextInput style={styles.input} placeholder="Телефон" onChangeText={setPhone} value={phone} />
        <TextInput style={styles.input} placeholder="Адрес" onChangeText={setAddress} value={address} />
        <SelectorServices servicesList={servicesList} setServicesList={setServicesList} />
        <SelectorImages images={images} setImages={setImages} />
        <TouchableOpacity style={styles.sendButton} onPress={uploadImages}>
          <Text style={styles.sendButtonText}>Custom</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.sendButton} onPress={submitAdsense}>
        <Text style={styles.sendButtonText}>Добавить объявление</Text>
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
    backgroundColor: 'green',
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

export default AddAdsenseScreen;
