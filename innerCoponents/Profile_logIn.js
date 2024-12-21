import React, { useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, Text, TextInput, View, Button, RefreshControl, StyleSheet, TouchableOpacity, Dimensions, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import localhosturl from '../localhoststring';
import { ScrollView } from 'react-native-gesture-handler';
import StarRating from './StarRating';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import arrow_down from '../assets/arrow_down.png'; // Убедитесь, что у вас есть это изображение
import showPass_icon from '../assets/showPass_icon.png'; // Убедитесь, что у вас есть это изображение
import check_null from '../assets/check_null.png'; // Убедитесь, что у вас есть это изображение
import check_fill from '../assets/check_fill.png'; // Убедитесь, что у вас есть это изображение
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../storage/store';

const ProfileLogIn = ({ setRegistration }) => {

  let dispatch = useDispatch();

  const navigation = useNavigation();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [personalDataAllowed, setPersonalDataAllowed] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const userData = useSelector((state) => state?.user?.user);

  const validatedPhone = (phone) => {
    const regex = /^\d+$/;
    return regex.test(phone) && phone.length == 12;
  }

  const validatedPassword = (password) => {
    const regex = /^(?=.*\d.*\d)[A-Za-z\d]{10,}$/;
    return regex.test(password);
  }

  // const handleRegistration = async () => {

  //   if (!personalDataAllowed) {
  //     alert('Поставьте галочку для согалсия на обработку персональных данных');
  //     return;
  //   }
  //   if (!validatedPhone(phone)) {
  //     alert('Некорректный телефон. Телефон должен состоять только из цифр и быть длиной 12 символов.');
  //     return;
  //   }
  //   if (!validatedPassword(password)) {
  //     alert('Некорректный пароль. Пароль должен содержать как минимум 2 цифры, только латинские буквы и цифры, длина не менее 10 символов.');
  //     return;
  //   }

  //   const newUserRegistration = async () => {
  //     try {
  //       let response = await axios.post(`${localhosturl}/registrationNewUser`, {
  //         accType,
  //         name,
  //         phone,
  //         password
  //       });
  //       console.log(response.data.registrationResult)
  //       await setUserData({ name, phone });
  //       await AsyncStorage.setItem('userData', JSON.stringify({ name, phone, accType }));
  //       Alert.alert('Регистрация успешна', 'Вы успешно зарегистрировали новый профиль');
  //       refreshAdsenses()
  //     } catch (error) {
  //       alert('Ошибка при регистрации');
  //       console.log(error)
  //     }
  //   }

  //   try {
  //     let response = await axios.post(`${localhosturl}/registrationCheck`, {
  //       name,
  //       phone,
  //       password
  //     });

  //     if (response.data.registrationConfirmation) {
  //       Alert.alert(
  //         'Регистрация',
  //         'Профиль не найден в базе. Зарегистрировать новый на введенные данные?',
  //         [
  //           {
  //             text: 'Отмена',
  //             style: 'cancel',
  //           },
  //           {
  //             text: 'Регистрация',
  //             onPress: newUserRegistration,
  //             style: 'destructive',
  //           },
  //         ],
  //         { cancelable: true }
  //       );
  //       return
  //     }

  //     if (!response.data.correctPassword) {
  //       Alert.alert('Неверный пароль', 'Пользователь с таким номером телефона найден в базе, но введенный вами пароль неверный');
  //     }

  //     if (response.data.correctPassword) {
  //       await setUserData({ name, phone, accType });
  //       await AsyncStorage.setItem('userData', JSON.stringify({ name, phone, accType }));
  //       Alert.alert('Вход', 'Вы успешно вошли в свой профиль');
  //       refreshAdsenses()
  //     }
  //   } catch (error) {
  //     alert('Ошибка при регистрации');
  //     console.log(error)
  //   }
  // };

  return (
    <View>

      <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, color: '#333333' }}>Телефон*</Text>

      <View style={{ marginTop: 4 }}>
        <TextInput
          placeholderTextColor="#C4C4C4"
          style={{
            borderWidth: phone ? (validatedPhone(phone) ? 1 : 1) : 0,
            borderColor: phone ? (validatedPhone(phone) ? 'green' : 'red') : 'grey',
            fontFamily: 'Manrope_500Medium', fontSize: 14, height: 42, elevation: 8, borderRadius: 12, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 8, marginBottom: 10
          }}
          value={phone}
          onChangeText={(phone) => { validatedPhone(phone); setPhone(phone); }}
          placeholder="Телефон, цифрами, без +"
        />
      </View>

      <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, color: '#333333', }}>Пароль*</Text>

      <View style={{ marginTop: 4, position: 'relative' }}>
        <TextInput
          placeholderTextColor="#C4C4C4"
          style={{
            borderWidth: password ? (validatedPassword(password) ? 1 : 1) : 0,
            borderColor: password ? (validatedPassword(password) ? 'green' : 'red') : 'grey',
            fontFamily: 'Manrope_500Medium',
            fontSize: 14,
            height: 42,
            elevation: 8,
            borderRadius: 12,
            backgroundColor: 'white',
            paddingHorizontal: 12,
            paddingVertical: 8,
            marginBottom: 10,
            paddingRight: 40 // пространство для кнопки
          }}
          value={password}
          onChangeText={(password) => { validatedPassword(password); setPassword(password) }}
          placeholder="Пароль"
          secureTextEntry={!showPassword} // изменяем видимость текста
        />

        {/* Кнопка для показа/скрытия пароля */}
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
            height: 22,
            width: 22,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text>{'👁️'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={{ ...styles.button, backgroundColor: (!validatedPhone(phone) || !validatedPassword(password) || !personalDataAllowed) ? 'lightgrey' : '#0094FF' }}
        onPress={async () => {
          try {
            let response = await axios.post(`${localhosturl}/userLogIn`, {
              phone,
              password
            });
            if (response.data.logInResult == true) {
              dispatch(setUser(response.data.user))
              console.log(response.data)
              Alert.alert('Регистрация успешна', 'Вы успешно вошли в профиль');
              await AsyncStorage.setItem('userData', JSON.stringify({ phone, password }));
            } else {
              Alert.alert('Ошибка входа', response.data.message);
            }
          } catch (error) {
            alert('Ошибка при входе');
            console.log(error)
          }
        }
          // handleRegistration
        }>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginHorizontal: '2%' }} onPress={() => { setPersonalDataAllowed(!personalDataAllowed) }}>
        <View style={{ flexDirection: 'row', marginTop: 4, gap: 10, width: '100%', justifyContent: 'center' }}>
          <Image source={personalDataAllowed ? check_fill : check_null} style={{ height: 16, width: 16 }} />
          <Text style={{ lineHeight: 15, fontFamily: 'Manrope_500Medium', textAlign: 'center', color: '#7B7B7B', fontSize: 12, letterSpacing: 0.5 }}>Нажимая на кнопку, вы даёте согласие на обработку персональных данных</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 8, alignItems: 'flex-end' }} onPress={() => setRegistration(true)}>
        <Text style={{ color: 'lightgrey' }}>Зарегистрироваться</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={{ marginTop: 8, alignItems: 'flex-end' }} onPress={() => console.log(userData)}>
        <Text style={{ color: 'lightgrey' }}>user</Text>
      </TouchableOpacity> */}

      {phone || password ?
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          {validatedPhone(phone) ? <Text style={{ color: '#0094FF' }}>Телефон введен корректно</Text> : <Text style={{ color: 'red' }}>Телефон должен содержать ровно 12 символов и состоять из цифр</Text>}
          {validatedPassword(password) ? <Text style={{ color: '#0094FF' }}>Пароль введен корректно</Text> : <Text style={{ color: 'red' }}>Длина пароля минимум 10 символов, латиницей, минимум 2 цифры</Text>}
        </View>
        : null}

    </View >
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
  label: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: '#333333',
  },
  openButtonText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: '#C4C4C4',
  },
  openButton: {
    height: 42,
    backgroundColor: 'white',
    elevation: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
  },
  arrowIcon: {
    width: 16,
    height: 16,
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
    marginTop: 14,
    backgroundColor: 'black', // светло-голубой фон
    padding: 10, // отступы
    borderRadius: 12, // радиус закругления углов
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
    color: 'white',
    fontSize: 18,
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16
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
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomColor: '#ececec',
    borderBottomWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  }
});

export default ProfileLogIn