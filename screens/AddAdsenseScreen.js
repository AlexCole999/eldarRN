import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard'

import SelectorCity from '../innerCoponents/Selector_city';
import SelectorCategory from './../innerCoponents/Selector_category';
import SelectorHours from '../innerCoponents/Selector_hours';
import SelectorServices from '../innerCoponents/Selector_services';
import SelectorImages from '../innerCoponents/Selector_images';
import SelectorDistrict from './../innerCoponents/Selector_district';
import localhosturl from './../localhoststring';
import Screen3 from '../innerCoponents/Selector_categoriesVisual';
import { Picker } from '@react-native-picker/picker';
import plus from '../assets/plus.png'


const AddAdsenseScreen = () => {

  const navigation = useNavigation();

  const [stage, setStage] = useState(0);
  const [user, setUser] = useState('default');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [cityDistrict, setCityDistrict] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [workhoursStart, setWorkhoursStart] = useState('');
  const [workhoursEnd, setWorkhoursEnd] = useState('');
  const [workhours, setWorkhours] = useState('');
  const [servicesList, setServicesList] = useState([]);

  const [instagram, setInstagram] = useState('');
  const [telegram, setTelegram] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

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

    if (!title || !phone || !city || !address || !workhours || images.length === 0) {
      Alert.alert('Некорректные данные', 'Пожалуйста, заполните все поля: название, телефон, город, адрес, часы работы и минимум одну фотографию');
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
        console.log(user, title, category, city, district, phone, address, workhours, servicesList, imagesList, description, instagram, telegram, whatsapp)
        axios.post(`${localhosturl}/newAdsense`, { // Создаем новое объявление
          user, title, category, city, district, phone, address, workhours, servicesList, imagesList, description, instagram, telegram, whatsapp
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



  if (stage == 0) {
    return (
      <View style={{ ...styles.container, paddingHorizontal: 24 }}>

        <View>
          <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, color: '#333333', }}>Название</Text>

          <TextInput
            placeholderTextColor="#C4C4C4"
            style={{
              fontFamily: 'Manrope_500Medium', fontSize: 14, height: 42, elevation: 4, borderRadius: 12, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 8, marginTop: 4, fontSize: 14
            }}
            placeholder="Введите название"
            onChangeText={setTitle}
            value={title} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, gap: 20 }}>
          <TouchableOpacity
            style={{ backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0, 148, 255, 0.9)', flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36 }}
            onPress={() => setStage(stage => stage - 1)}
            disabled={true}
          >
            <Text style={{ color: 'rgba(0, 148, 255, 0.9)', fontSize: 16, fontWeight: '600', textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
              Отмена
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: !title ? 'lightgrey' : 'rgba(0, 148, 255, 0.5)', borderRadius: 12, flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36 }}
            disabled={!title}
            onPress={() => setStage(stage => stage + 1)}        >
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
              Далее
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  if (stage == 1) {
    return (
      <View style={{ ...styles.container, paddingHorizontal: 24 }}>

        <SelectorCategory category={category} setCategory={setCategory} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, gap: 20 }}>
          <TouchableOpacity
            style={{ backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0, 148, 255, 0.9)', flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36 }}
            onPress={() => setStage(stage => stage - 1)}
            disabled={false}
          >
            <Text style={{ color: 'rgba(0, 148, 255, 0.9)', fontSize: 16, fontWeight: '600', textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
              Отмена
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: !category ? 'lightgrey' : 'rgba(0, 148, 255, 0.5)', borderRadius: 12, flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36 }}
            disabled={!category}
            onPress={() => setStage(stage => stage + 1)}        >
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
              Далее
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  if (stage == 2) {
    return (
      <View style={{ ...styles.container, paddingHorizontal: 24 }}>

        <View>
          <SelectorCity city={city} setCity={setCity} />
          <SelectorDistrict city={city} cityDistrict={cityDistrict} setCityDistrict={setCityDistrict} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, gap: 20 }}>
          <TouchableOpacity
            style={{ backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0, 148, 255, 0.9)', flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36 }}
            onPress={() => setStage(stage => stage - 1)}
          >
            <Text style={{ color: 'rgba(0, 148, 255, 0.9)', fontSize: 16, fontWeight: '600', textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
              Отмена
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: !(city && (city !== 'Ташкент' || cityDistrict)) ? 'lightgrey' : 'rgba(0, 148, 255, 0.5)', borderRadius: 12, flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36 }}
            disabled={!(city && (city !== 'Ташкент' || cityDistrict))}
            onPress={() => setStage(stage => stage + 1)}        >
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
              Далее
            </Text>
          </TouchableOpacity>
        </View>

      </View >
    )
  }


  if (stage == 3) {
    return (
      <View style={{ ...styles.container, paddingHorizontal: 24 }}>

        <View>

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
                fontFamily: 'Manrope_500Medium', fontSize: 14, height: 42, elevation: 4, borderRadius: 12, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 8, marginBottom: 10, fontSize: 14
              }}
              placeholder="Укажите адрес"
              onChangeText={setAddress}
              value={address} />
          </View>

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 0, marginBottom: 24, gap: 20 }}>
          <TouchableOpacity
            style={{ backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0, 148, 255, 0.9)', flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36 }}
            onPress={() => setStage(stage => stage - 1)}
          >
            <Text style={{ color: 'rgba(0, 148, 255, 0.9)', fontSize: 16, fontWeight: '600', textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
              Отмена
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: !(phone && address && workhours) ? 'lightgrey' : 'rgba(0, 148, 255, 0.5)', borderRadius: 12, flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36 }}
            disabled={!(phone && address && workhours)}
            onPress={() => setStage(stage => stage + 1)}        >
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
              Далее
            </Text>
          </TouchableOpacity>
        </View>

      </View >
    )
  }

  if (stage == 4) {
    return (
      <View style={{ ...styles.container }}>

        <View>
          <SelectorServices servicesList={servicesList} setServicesList={setServicesList} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 0, marginBottom: 24, gap: 20 }}>
          <TouchableOpacity
            style={{ backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0, 148, 255, 0.9)', flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36 }}
            onPress={() => setStage(stage => stage - 1)}
          >
            <Text style={{ color: 'rgba(0, 148, 255, 0.9)', fontSize: 16, fontWeight: '600', textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
              Отмена
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: !(phone && address && workhours) ? 'lightgrey' : 'rgba(0, 148, 255, 0.5)', borderRadius: 12, flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36 }}
            disabled={!(phone && address && workhours)}
            onPress={() => setStage(stage => stage + 1)}        >
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
              Далее
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
      <View style={{ ...styles.container, paddingHorizontal: 24 }}>

        <View>

          <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, color: '#333333', }}>Instagram</Text>

          <View style={{ marginTop: 4 }}>
            <TextInput
              placeholderTextColor="#C4C4C4"
              style={{
                position: 'relative',
                fontFamily: 'Manrope_500Medium', fontSize: 14, height: 42, elevation: 4, borderRadius: 12, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 8, marginBottom: 10, fontSize: 14
              }}
              placeholder="https://www.instagram.com/username/"
              onChangeText={setInstagram}
              value={instagram} />
            <TouchableOpacity style={{ width: 18, height: 18, position: 'absolute', top: 12, right: 10 }}
              onPress={async () => {
                const text = await Clipboard.getStringAsync(); // Получаем текст из буфера обмена
                setInstagram(text); // Устанавливаем полученный текст в состояние
              }}
            >
              <Image source={plus} style={{ width: 18, height: 18 }} />
            </TouchableOpacity>

          </View>

          <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, color: '#333333', }}>Telegram</Text>

          <View style={{ marginTop: 4 }}>
            <TextInput
              placeholderTextColor="#C4C4C4"
              style={{
                position: 'relative',
                fontFamily: 'Manrope_500Medium', fontSize: 14, height: 42, elevation: 4, borderRadius: 12, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 8, marginBottom: 10, fontSize: 14
              }}
              placeholder="@username"
              onChangeText={setTelegram}
              value={telegram} />
            <TouchableOpacity style={{ width: 18, height: 18, position: 'absolute', top: 12, right: 10 }}
              onPress={async () => {
                const text = await Clipboard.getStringAsync(); // Получаем текст из буфера обмена
                setTelegram(text); // Устанавливаем полученный текст в состояние
              }}
            >
              <Image source={plus} style={{ width: 18, height: 18 }} />
            </TouchableOpacity>
          </View>

          <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, color: '#333333', }}>WhatsApp</Text>

          <View style={{ marginTop: 4 }}>
            <TextInput
              placeholderTextColor="#C4C4C4"
              style={{
                position: 'relative',
                fontFamily: 'Manrope_500Medium', fontSize: 14, height: 42, elevation: 4, borderRadius: 12, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 8, marginBottom: 10, fontSize: 14
              }}
              placeholder=" Номер формата + XXX XX XXX XX XX"
              onChangeText={setWhatsapp}
              value={whatsapp} />
            <TouchableOpacity style={{ width: 18, height: 18, position: 'absolute', top: 12, right: 10 }}
              onPress={async () => {
                const text = await Clipboard.getStringAsync(); // Получаем текст из буфера обмена
                setWhatsapp(text); // Устанавливаем полученный текст в состояние
              }}
            >
              <Image source={plus} style={{ width: 18, height: 18 }} />
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 0, marginBottom: 24, gap: 20 }}>
          <TouchableOpacity
            style={{ backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0, 148, 255, 0.9)', flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36 }}
            onPress={() => setStage(stage => stage - 1)}
          >
            <Text style={{ color: 'rgba(0, 148, 255, 0.9)', fontSize: 16, fontWeight: '600', textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
              Отмена
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: 'rgba(0, 148, 255, 0.5)', borderRadius: 12, flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36 }}
            disabled={null}
            onPress={() => setStage(stage => stage + 1)}        >
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
              Далее
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  if (stage == 7) {
    return (
      <View style={{ ...styles.container, paddingHorizontal: 24 }}>
        <View>
          <Text style={{ textAlign: 'start', marginBottom: 24, marginBottom: 4, fontSize: 16, fontFamily: 'Manrope_600SemiBold', color: '#333333' }}>
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

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 0, marginBottom: 24, gap: 20 }}>
          <TouchableOpacity
            style={{ backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0, 148, 255, 0.9)', flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36 }}
            onPress={() => setStage(stage => stage - 1)}
          >
            <Text style={{ color: 'rgba(0, 148, 255, 0.9)', fontSize: 16, fontWeight: '600', textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
              Отмена
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: !description ? 'lightgrey' : 'rgba(0, 148, 255, 0.5)', borderRadius: 12, flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36 }}
            disabled={!description}
            onPress={() => setStage(stage => stage + 1)}        >
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
              Далее
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  return (
    <ScrollView>
      <View style={styles.container}>

        <View>
          <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, color: '#333333', }}>Название</Text>

          <TextInput
            placeholderTextColor="#C4C4C4"
            style={{
              fontFamily: 'Manrope_500Medium', fontSize: 14, height: 42, elevation: 4, borderRadius: 12, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 8, marginTop: 4, fontSize: 14
            }}
            placeholder="Введите название"
            onChangeText={setTitle}
            value={title} />
        </View>

        <View style={{ marginTop: 12 }}>
          <SelectorCategory category={category} setCategory={setCategory} />
        </View>

        <View style={{ marginTop: 12 }}>
          <SelectorCity city={city} setCity={setCity} />
        </View>

        <SelectorDistrict city={city} cityDistrict={cityDistrict} setCityDistrict={setCityDistrict} />

        <View style={{ marginTop: 12 }}>
          <SelectorHours workhoursStart={workhoursStart} setWorkhoursStart={setWorkhoursStart} workhoursEnd={workhoursEnd} setWorkhoursEnd={setWorkhoursEnd} workhours={workhours} setWorkhours={setWorkhours} />
        </View>

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
              fontFamily: 'Manrope_500Medium', fontSize: 14, height: 42, elevation: 4, borderRadius: 12, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 8, marginBottom: 10, fontSize: 14
            }}
            placeholder="Укажите адрес"
            onChangeText={setAddress}
            value={address} />
        </View>

        <SelectorServices servicesList={servicesList} setServicesList={setServicesList} horizontaldisplay={true} />

        <View style={{ marginTop: 12 }}>

          <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, color: '#333333', }}>Instagram</Text>

          <View style={{ marginTop: 4 }}>
            <TextInput
              placeholderTextColor="#C4C4C4"
              style={{
                position: 'relative',
                fontFamily: 'Manrope_500Medium', fontSize: 14, height: 42, elevation: 4, borderRadius: 12, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 8, marginBottom: 10, fontSize: 14
              }}
              placeholder="Вставьте ссылку"
              onChangeText={setInstagram}
              value={instagram} />
            <TouchableOpacity style={{ width: 18, height: 18, position: 'absolute', top: 12, right: 10 }}
              onPress={async () => {
                const text = await Clipboard.getStringAsync(); // Получаем текст из буфера обмена
                setInstagram(text); // Устанавливаем полученный текст в состояние
              }}
            >
              <Image source={plus} style={{ width: 18, height: 18 }} />
            </TouchableOpacity>

          </View>

          <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, color: '#333333', }}>Telegram</Text>

          <View style={{ marginTop: 4 }}>
            <TextInput
              placeholderTextColor="#C4C4C4"
              style={{
                position: 'relative',
                fontFamily: 'Manrope_500Medium', fontSize: 14, height: 42, elevation: 4, borderRadius: 12, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 8, marginBottom: 10, fontSize: 14
              }}
              placeholder="Вставьте ссылку"
              onChangeText={setTelegram}
              value={telegram} />
            <TouchableOpacity style={{ width: 18, height: 18, position: 'absolute', top: 12, right: 10 }}
              onPress={async () => {
                const text = await Clipboard.getStringAsync(); // Получаем текст из буфера обмена
                setTelegram(text); // Устанавливаем полученный текст в состояние
              }}
            >
              <Image source={plus} style={{ width: 18, height: 18 }} />
            </TouchableOpacity>
          </View>

          <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, color: '#333333', }}>WhatsApp</Text>

          <View style={{ marginTop: 4 }}>
            <TextInput
              placeholderTextColor="#C4C4C4"
              style={{
                position: 'relative',
                fontFamily: 'Manrope_500Medium', fontSize: 14, height: 42, elevation: 4, borderRadius: 12, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 8, marginBottom: 10, fontSize: 14
              }}
              placeholder="Вставьте ссылку"
              onChangeText={setWhatsapp}
              value={whatsapp} />
            <TouchableOpacity style={{ width: 18, height: 18, position: 'absolute', top: 12, right: 10 }}
              onPress={async () => {
                const text = await Clipboard.getStringAsync(); // Получаем текст из буфера обмена
                setWhatsapp(text); // Устанавливаем полученный текст в состояние
              }}
            >
              <Image source={plus} style={{ width: 18, height: 18 }} />
            </TouchableOpacity>
          </View>

        </View>

        <Text style={{ textAlign: 'start', marginTop: 12, marginBottom: 4, fontSize: 16, fontFamily: 'Manrope_600SemiBold', color: '#333333' }}>
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

        <SelectorImages images={images} setImages={setImages} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 0, marginBottom: 24, gap: 20, marginTop: 9 }}>
          <TouchableOpacity
            style={{ backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0, 148, 255, 0.9)', flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36, minWidth: 146 }}
            onPress={() => setStage(stage => stage - 1)}
          >
            <Text style={{ color: 'rgba(0, 148, 255, 0.9)', fontSize: 16, fontWeight: '600', textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
              Отмена
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: !description ? 'lightgrey' : 'rgba(0, 148, 255, 1)', borderRadius: 12, flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36, minWidth: 146 }}
            disabled={!description}
            onPress={() => { submitAdsense(); console.log(city, cityDistrict) }}       >
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
              Cохранить
            </Text>
          </TouchableOpacity>
        </View>

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



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#F5FFFF',
    height: '100%'
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
