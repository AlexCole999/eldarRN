import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import SelectorCity from '../innerCoponents/Selector_city';
import SelectorCategory from './../innerCoponents/Selector_category';
import SelectorHours from '../innerCoponents/Selector_hours';
import SelectorServices from '../innerCoponents/Selector_services';
import SelectorImages from '../innerCoponents/Selector_images';
import localhosturl from './../localhoststring';




const AddAdsenseScreen = () => {
  const [user, setUser] = useState('default');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [workhours, setWorkhours] = useState('');
  const [servicesList, setServicesList] = useState([]);
  const [images, setImages] = useState([]);

  const [newAdsenseStatusVisible, setNewAdsenseStatusVisible] = useState(false)
  const [newAdsenseStages, setNewAdsenseStages] = useState({ created: false, imagesUploaded: false })

  useEffect(() => {
    // async function userCheckUp() {
    //   let userDataString = await AsyncStorage.getItem('userData');
    //   userDataString = JSON.parse(userDataString);
    //   console.log(userDataString);
    //   if (userDataString?.phone){await setUser(userDataString?.phone)};
    // }
    // userCheckUp();
  }, []);



  const submitAdsense = async () => {

    const userData = await AsyncStorage.getItem('userData'); // Получаем пользователя из AsyncStorage

    if (!userData) {// Если пользователя нет - требуем регистрации
      Alert.alert('Вы не зарегистрированы', 'Чтобы опубликовать ваше объявление - пройдите регистрацию');
      throw new Error('Вы не зарегистрированы, пройдите регистрацию');
    }

    if (!phone || !city || !address || !workhours || images.length === 0) {
      Alert.alert('Некорректные данные', 'Пожалуйста, заполните все поля: телефон, город, адрес, часы работы и минимум одну фотографию');
      return;
    }



    setNewAdsenseStatusVisible(true); // Показываем статус отправок

    const formData = new FormData(); // Создаем форму
    formData.append('user', userData); // Добавляем туда пользователя из AsyncStorage

    for (const image of images) { // Добавляем картинки в форму
      let imageParsedLength = image.split('/').length;
      let imageName = image.split('/')[imageParsedLength - 1];
      formData.append('images', {
        uri: image,
        type: 'image/jpeg',
        name: imageName,
      });
    }

    axios.post(`${localhosturl}/upload`, formData, {// Загружаем фотографии
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(async (response) => {
        Alert.alert('Успешно', 'Изображения успешно загружены');
        setNewAdsenseStages(prevState => ({ ...prevState, imagesUploaded: true }));// показываем статус добавления фотографий
        let imagesList = response.data.paths;
        let user = await AsyncStorage.getItem('userData');
        user = JSON.parse(user)
        user = user.phone
        console.log(user)
        axios.post(`${localhosturl}/newAdsense`, { // Создаем новое объявление
          user, category, city, phone, address, workhours, servicesList, imagesList
        })
          .then((response) => {

            setNewAdsenseStages(prevState => ({ ...prevState, created: true })); // показываем статус добавления объявления

            Alert.alert('Успешно', 'Объявление создано');

            console.log(response.data.adsenseId);

          }).catch((error) => {
            console.error(error);
          });
      });

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
        <TouchableOpacity
          style={styles.sendButton}
          onPress={
            async () => {
              let some = await AsyncStorage.getItem('userData');
              some = JSON.parse(some)
              console.log(some.phone)
            }

          }>
          <Text
            style={styles.sendButtonText}
            onPress={async () => {
              const userData = await AsyncStorage.getItem('userData');
              console.log(userData)

              console.log(localhosturl)
            }}>
            Custom
          </Text>
        </TouchableOpacity>
        {
          newAdsenseStatusVisible ?
            <View style={{ paddingTop: 5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: newAdsenseStages.imagesUploaded ? 'rgba(0, 128, 0, 0.5)' : 'rgba(128, 128, 128, 0.5)',
                  marginRight: 5,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  {newAdsenseStages.imagesUploaded ? <Text style={{ color: 'white' }}>✓</Text> : null}
                </View>
                <Text>{newAdsenseStages.imagesUploaded ? 'Фотографии загружены' : 'Фотографии не загружены'}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>
                <View style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: newAdsenseStages.created ? 'rgba(0, 128, 0, 0.5)' : 'rgba(128, 128, 128, 0.5)',
                  marginRight: 5,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  {newAdsenseStages.created ? <Text style={{ color: 'white' }}>✓</Text> : null}
                </View>
                <Text>{newAdsenseStages.created ? 'Объявление добавлено' : 'Объявление не добавлено'}</Text>
              </View>
            </View>
            : null
        }
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
