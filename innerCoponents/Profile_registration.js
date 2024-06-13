import React, { useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, Text, TextInput, View, Button, RefreshControl, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import localhosturl from '../localhoststring';
import { ScrollView } from 'react-native-gesture-handler';
import StarRating from './StarRating';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


axios
const ProfileRegistration = ({ name, setName, phone, setPhone, password, setPassword, userData, setUserData, refreshAdsenses }) => {

  const navigation = useNavigation();

  const validatedName = (name) => {
    return name.length >= 4
  }

  const validatedPhone = (phone) => {
    const regex = /^\d+$/;
    return regex.test(phone) && phone.length == 12;
  }

  const validatedPassword = (password) => {
    const regex = /^(?=.*\d.*\d)[A-Za-z\d]{10,}$/;
    return regex.test(password);
  }

  const handleRegistration = async () => {

    if (!validatedName(name)) {
      alert('Некорректное имя. Имя должно содержать только буквы и быть длиной не менее 2 символов.');
      return;
    }
    if (!validatedPhone(phone)) {
      alert('Некорректный телефон. Телефон должен состоять только из цифр и быть длиной 12 символов.');
      return;
    }
    if (!validatedPassword(password)) {
      alert('Некорректный пароль. Пароль должен содержать как минимум 2 цифры, только латинские буквы и цифры, длина не менее 10 символов.');
      return;
    }

    const newUserRegistration = async () => {
      try {
        let response = await axios.post(`${localhosturl}/registrationNewUser`, {
          name,
          phone,
          password
        });
        console.log(response.data.registrationResult)
        await setUserData({ name, phone });
        await AsyncStorage.setItem('userData', JSON.stringify({ name, phone }));
        Alert.alert('Регистрация успешна', 'Вы успешно зарегистрировали новый профиль');
        refreshAdsenses()
      } catch (error) {
        alert('Ошибка при регистрации');
        console.log(error)
      }
    }

    try {
      let response = await axios.post(`${localhosturl}/registrationCheck`, {
        name,
        phone,
        password
      });

      if (response.data.registrationConfirmation) {
        Alert.alert(
          'Регистрация',
          'Профиль не найден в базе. Зарегистрировать новый на введенные данные?',
          [
            {
              text: 'Отмена',
              style: 'cancel',
            },
            {
              text: 'Регистрация',
              onPress: newUserRegistration,
              style: 'destructive',
            },
          ],
          { cancelable: true }
        );
        return
      }

      if (!response.data.correctPassword) {
        Alert.alert('Неверный пароль', 'Пользователь с таким номером телефона найден в базе, но введенный вами пароль неверный');
      }

      if (response.data.correctPassword) {
        await setUserData({ name, phone });
        await AsyncStorage.setItem('userData', JSON.stringify({ name, phone }));
        Alert.alert('Вход', 'Вы успешно вошли в свой профиль');
        refreshAdsenses()
      }
    } catch (error) {
      alert('Ошибка при регистрации');
      console.log(error)
    }
  };

  return (
    <View>
      <Text style={styles.title}>Регистрация и вход</Text>
      <TextInput
        style={{
          borderRadius: 10,
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginBottom: 10,
          fontSize: 16,
          borderWidth: name ? (validatedName(name) ? 2 : 2) : 0,
          borderColor: name ? (validatedName(name) ? 'green' : 'red') : 'grey'
        }}
        placeholder="Имя"
        onChangeText={(name) => { validatedName(name); setName(name); }}
        value={name}
      />

      <TextInput
        style={{
          borderRadius: 10,
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginBottom: 10,
          fontSize: 16,
          borderWidth: phone ? (validatedPhone(phone) ? 2 : 2) : 0,
          borderColor: phone ? (validatedPhone(phone) ? 'green' : 'red') : 'grey'
        }}
        value={phone}
        onChangeText={(phone) => { validatedPhone(phone); setPhone(phone); }}
        placeholder="Телефон"
      />
      <TextInput
        style={{
          borderRadius: 10,
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginBottom: 10,
          fontSize: 16,
          borderWidth: password ? (validatedPassword(password) ? 2 : 2) : 0,
          borderColor: password ? (validatedPassword(password) ? 'green' : 'red') : 'grey'
        }}
        value={password}
        onChangeText={(password) => { validatedPassword(password); setPassword(password) }}
        placeholder="Пароль"
        secureTextEntry={false}
      />
      {name || phone || password ?
        <View>
          {validatedName(name) ? <Text style={{ color: 'green' }}>Имя введено корректно</Text> : <Text style={{ color: 'red' }}>Имя должно содержать минимум 4 символа</Text>}
          {validatedPhone(phone) ? <Text style={{ color: 'green' }}>Телефон введен корректно</Text> : <Text style={{ color: 'red' }}>Телефон должен содержать ровно 12 символов и состоять из цифр</Text>}
          {validatedPassword(password) ? <Text style={{ color: 'green' }}>Пароль введен корректно</Text> : <Text style={{ color: 'red' }}>Длина пароля минимум 10 символов, латиницей, минимум 2 цифры</Text>}
        </View>
        : null}

      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Зарегистрироваться или войти</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f3f2f8',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    flexGrow: 1,
    marginVertical: 10,
    backgroundColor: 'rgb(0, 191, 255)', // светло-голубой фон
    padding: 10, // отступы
    borderRadius: 10, // радиус закругления углов
    alignItems: 'center', // центрирование по горизонтали
  },
  deleteButton: {
    flexGrow: 1,
    marginVertical: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingVertical: 10,
    paddingLeft: 14,
    borderRadius: 10,
  },
  addButtonText: {
    fontWeight: '500',
    fontSize: 16,
  },
  sectionContainer: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingVertical: 10,
    paddingLeft: 14,
    borderRadius: 10,
  },
  sectionTitle: {
    borderBottomColor: '#ececec',
    borderBottomWidth: 1,
    paddingBottom: 7,
    fontWeight: '500',
    fontSize: 16,
  },
  sectionItem: {
    borderBottomColor: '#ececec',
    borderBottomWidth: 1,
    paddingVertical: 7,
    fontWeight: '500',
    fontSize: 16,
  },
  adsContainer: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingTop: 20,
    borderRadius: 10,
  },
  userContainer: {
    backgroundColor: 'white',
    padding: 7,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  userImage: {
    width: 70,
    height: 70,
  },
  userName: {
    textTransform: 'capitalize',
    fontWeight: '700',
    letterSpacing: 0.2,
    fontFamily: 'Roboto',
    fontSize: 16,
  },
  userPhone: {
    color: 'grey',
    letterSpacing: 0.2,
    fontFamily: 'Roboto',
    fontSize: 14,
  },
  adContainer: {
    padding: 10,
    marginBottom: 20,
  },
  adText: {
    fontSize: 12,
    marginBottom: 2,
    maxWidth: '80%',
    color: 'black',
  },
  adImage: {
    width: '50%',
    height: '100%',
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  infoContainer: {
    paddingHorizontal: 0,
    flexDirection: 'row',
    gap: 10,
  },
  adButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
});

export default ProfileRegistration