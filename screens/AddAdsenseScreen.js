import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import SelectorCity from '../innerCoponents/Selector_city';
import SelectorCategory from './../innerCoponents/Selector_category';
import SelectorHours from '../innerCoponents/Selector_hours';
import SelectorServices from '../innerCoponents/Selector_services';
import SelectorImages from '../innerCoponents/Selector_images';
import SelectorDistrict from './../innerCoponents/Selector_district';
import localhosturl from './../localhoststring';
import Screen3 from '../innerCoponents/Selector_categoriesVisual';
import { Picker } from '@react-native-picker/picker';

const AddAdsenseScreen = () => {

  const navigation = useNavigation();

  const [stage, setStage] = useState(1);
  const [user, setUser] = useState('default');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [cityDistrict, setCityDistrict] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [workhoursStart, setWorkhoursStart] = useState('');
  const [workhoursEnd, setWorkhoursEnd] = useState('');
  const [workhours, setWorkhours] = useState('');
  const [servicesList, setServicesList] = useState([]);
  const [description, setDescription] = useState('');
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
        console.log(cityDistrict)
        let district = city == 'Ташкент' ? cityDistrict : null
        console.log(user, category, city, district, phone, address, workhours, servicesList, imagesList, description)
        axios.post(`${localhosturl}/newAdsense`, { // Создаем новое объявление
          user, category, city, district, phone, address, workhours, servicesList, imagesList, description
        })
          .then((response) => {

            setNewAdsenseStages(prevState => ({ ...prevState, created: true })); // показываем статус добавления объявления

            Alert.alert('Успешно', 'Объявление создано');

            console.log(response.data.adsenseId);
            navigation.navigate('Каталог');

          }).catch((error) => {
            console.error(error);
          });
      });

  };

  if (stage == 1) {
    return (
      <View style={{ ...styles.container, paddingHorizontal: 0 }}>
        <Screen3 category={category} setCategory={(item) => { setCategory(item); setStage(2) }} />
      </View>
    )
  }

  if (stage == 2) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginBottom: 20, fontSize: 20, fontWeight: 800 }}>Выберите город</Text>
        <View style={{
          marginBottom: 10, overflow: 'hidden', borderRadius: 10
        }}>
          <SelectorCity city={city} setCity={setCity} />
          <SelectorDistrict city={city} cityDistrict={cityDistrict} setCityDistrict={setCityDistrict} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ backgroundColor: 'rgb(0, 191, 255)', padding: 10, borderRadius: 10, backgroundColor: 'rgb(0, 191, 255)', paddingVertical: 10, paddingHorizontal: 20, }}
            onPress={() => setStage(stage => stage - 1)}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', }}>
              Назад
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: !(city && (city !== 'Ташкент' || cityDistrict)) ? 'lightgrey' : 'rgb(0, 191, 255)', padding: 10, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, }}
            disabled={!(city && (city !== 'Ташкент' || cityDistrict))}
            onPress={() => setStage(stage => stage + 1)}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', }}>
              Дальше
            </Text>
          </TouchableOpacity>
        </View>
      </View >
    )
  }


  if (stage == 3) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginBottom: 20, fontSize: 20, fontWeight: 800 }}>Добавьте информацию о работе</Text>
        <SelectorHours workhoursStart={workhoursStart} setWorkhoursStart={setWorkhoursStart} workhoursEnd={workhoursEnd} setWorkhoursEnd={setWorkhoursEnd} workhours={workhours} setWorkhours={setWorkhours} />

        <View style={{ flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 10, borderTopLeftRadius: 10, color: 'black', borderBottomLeftRadius: 10, width: '10%', backgroundColor: 'white', marginBottom: 10, fontSize: 16 }} >
            <Text style={{ color: 'grey', fontSize: 16 }}>+</Text>
          </View>
          <TextInput style={{ flexGrow: 1, borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: 'white', paddingHorizontal: 0, paddingVertical: 10, marginBottom: 10, fontSize: 16 }} placeholder="Телефон" onChangeText={setPhone} value={phone} />
        </View>

        <TextInput style={{ borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 10, marginBottom: 10, fontSize: 16 }} placeholder="Адрес" onChangeText={setAddress} value={address} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ backgroundColor: 'rgb(0, 191, 255)', padding: 10, borderRadius: 10, backgroundColor: 'rgb(0, 191, 255)', paddingVertical: 10, paddingHorizontal: 20, }}
            onPress={() => setStage(stage => stage - 1)}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', }}>
              Назад
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: !(phone && address && workhours) ? 'lightgrey' : 'rgb(0, 191, 255)', padding: 10, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, }}
            disabled={!(phone && address && workhours)}
            onPress={() => setStage(stage => stage + 1)}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', }}>
              Дальше
            </Text>
          </TouchableOpacity>
        </View>
      </View >
    )
  }

  if (stage == 4) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginBottom: 20, fontSize: 20, fontWeight: 800 }}>Добавьте услуги</Text>
        <SelectorServices servicesList={servicesList} setServicesList={setServicesList} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
          <TouchableOpacity style={{ backgroundColor: 'rgb(0, 191, 255)', padding: 10, borderRadius: 10, backgroundColor: 'rgb(0, 191, 255)', paddingVertical: 10, paddingHorizontal: 20, }}
            onPress={() => setStage(stage => stage - 1)}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', }}>
              Назад
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: !servicesList.length ? 'lightgrey' : 'rgb(0, 191, 255)', padding: 10, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, }}
            disabled={!servicesList.length}
            onPress={() => setStage(stage => stage + 1)}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', }}>
              Дальше
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  if (stage == 5) {
    return (
      <View style={styles.container}>
        <SelectorImages images={images} setImages={setImages} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
          <TouchableOpacity style={{ backgroundColor: 'rgb(0, 191, 255)', padding: 10, borderRadius: 10, backgroundColor: 'rgb(0, 191, 255)', paddingVertical: 10, paddingHorizontal: 20, }}
            onPress={() => setStage(stage => stage - 1)}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', }}>
              Назад
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: !images.length ? 'lightgrey' : 'rgb(0, 191, 255)', padding: 10, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, }}
            disabled={!images.length}
            onPress={() => setStage(stage => stage + 1)}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', }}>
              Дальше
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  if (stage == 6) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginBottom: 20, fontSize: 20, fontWeight: 800 }}>Добавьте описание</Text>
        <TextInput
          style={{
            textAlignVertical: 'top', borderRadius: 10, height: 120, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20, marginTop: 10, marginBottom: 10, fontSize: 16
          }}
          multiline={true} placeholder="Введите описание" onChangeText={setDescription} value={description} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ backgroundColor: 'rgb(0, 191, 255)', padding: 10, borderRadius: 10, backgroundColor: 'rgb(0, 191, 255)', paddingVertical: 10, paddingHorizontal: 20, }}
            onPress={() => setStage(stage => stage - 1)}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', }}>
              Назад
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: !description ? 'lightgreya' : 'rgb(0, 191, 255)', padding: 10, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, }}
            disabled={!description}
            onPress={() => setStage(stage => stage + 1)}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', }}>
              Дальше
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

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
        <SelectorImages images={images} setImages={setImages} />
        <TextInput
          style={{
            textAlignVertical: 'top', borderRadius: 10, height: 120, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20, marginTop: 10, marginBottom: 10, fontSize: 16
          }}
          multiline={true} placeholder="Введите описание" onChangeText={setDescription} value={description} />

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

      <TouchableOpacity style={styles.sendButton} onPress={() => { submitAdsense(); console.log(city, cityDistrict) }}>
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

export default AddAdsenseScreen;
