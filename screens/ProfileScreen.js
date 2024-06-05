import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, FlatList, Text, TextInput, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import localhosturl from './../localhoststring';
import user2 from '../assets/user2.png'
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [adsenses, setAdsenses] = useState([]);

  const navigation = useNavigation();

  const handleClearDatabase = async () => {
    Alert.alert(
      'Подтверждение',
      'Вы уверены, что хотите очистить базу данных?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Очистить',
          onPress: async () => {
            try {
              await axios.delete(`${localhosturl}/users`);
              alert('База данных успешно очищена');
            } catch (error) {
              alert('Ошибка при очистке базы данных');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const refreshAdsenses = async () => {

    let user = await AsyncStorage.getItem('userData');
    if (user) {
      try {
        let response = await axios.post(`${localhosturl}/getUserAdsenses`, { user });
        console.log(response.data.adsenses);
        setAdsenses(response.data.adsenses); // Устанавливаем полученные объявления в состояние
      } catch (error) {
        console.error("Ошибка при получении объявлений:", error);
      }
    }
  }

  const handleRegistration = async () => {
    try {
      await axios.post(`${localhosturl}/registration`, {
        name,
        phone,
        password
      });
      alert('Регистрация успешно завершена');
      await setUserData({ name, phone });
      await AsyncStorage.setItem('userData', JSON.stringify({ name, phone }));
      let userDataString = await AsyncStorage.getItem('userData');
      userDataString = JSON.parse(userDataString)
      console.log(userDataString)
    } catch (error) {
      alert('Ошибка при регистрации');
    }
  };

  const loadUserData = async () => {
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      setUserData(JSON.parse(userDataString));
    }
  };

  useEffect(() => {
    loadUserData();
    refreshAdsenses();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {userData ? (
        <View style={{
          backgroundColor: 'white',
          padding: 7,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5
        }}>
          <Image source={{ uri: `${localhosturl}/userIcons/user2.png` }}
            style={{ width: 70, height: 70 }}
          />
          <View>
            <Text style={{
              textTransform: 'capitalize',
              fontWeight: '700',
              letterSpacing: 0.2,
              fontFamily: 'Roboto',
              fontSize: 16
            }}>
              {userData?.name}
            </Text>
            <Text style={{
              color: 'grey',
              letterSpacing: 0.2,
              fontFamily: 'Roboto',
              fontSize: 14
            }}>
              +{userData?.phone}
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Регистрация</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Имя"
          />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Телефон"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Пароль"
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleRegistration}>
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={{
        backgroundColor: 'white',
        marginTop: 20,
        paddingVertical: 10,

        paddingLeft: 14,
        borderRadius: 10,
      }}
        onPress={() => {
          navigation.navigate('Добавить объявление')
        }}
      >
        <Text style={{
          fontWeight: 500,
          fontSize: 16,
        }}>
          Добавить объявление
        </Text>
      </TouchableOpacity>

      <View style={{
        backgroundColor: 'white',
        marginTop: 20,
        paddingVertical: 10,

        paddingLeft: 14,
        borderRadius: 10,
      }}>
        <Text style={{
          borderBottomColor: '#ececec',
          borderBottomWidth: 1,
          paddingBottom: 7,
          fontWeight: 500,
          fontSize: 16,
        }}>
          Бонусы
        </Text>
        <Text style={{
          borderBottomColor: '#ececec',
          borderBottomWidth: 1,
          paddingVertical: 7,
          fontWeight: 500,
          fontSize: 16,
        }}>Баланс</Text>
        <Text style={{
          borderBottomColor: '#ececec',
          borderBottomWidth: 1,
          paddingVertical: 7,
          fontWeight: 500,
          fontSize: 16,
        }}>Скидки</Text>
        <Text style={{
          borderBottomColor: '#ececec',
          borderBottomWidth: 1,
          paddingVertical: 7,
          fontWeight: 500,
          fontSize: 16,
        }}>Брони</Text>
        <Text style={{
          paddingTop: 7,
          fontSize: 16,
          fontWeight: 500,
        }}>Чаты</Text>
      </View>

      <View style={{
        backgroundColor: 'white',
        marginTop: 20,
        paddingVertical: 10,

        paddingLeft: 14,
        borderRadius: 10,
      }}>
        <Text style={{
          borderBottomColor: '#ececec',
          borderBottomWidth: 1,
          paddingBottom: 7,
          fontWeight: 500,
          fontSize: 16,
        }}>
          Поделиться приложением
        </Text>
        <Text style={{
          borderBottomColor: '#ececec',
          borderBottomWidth: 1,
          paddingVertical: 7,
          fontWeight: 500,
          fontSize: 16,
        }}>Язык приложения</Text>
        <Text style={{
          paddingTop: 7,
          fontWeight: 500,
          fontSize: 16,
        }}>Служба поддержки</Text>
      </View>

      <View style={{
        backgroundColor: 'white',
        marginTop: 20,
        paddingVertical: 10,

        paddingLeft: 14,
        borderRadius: 10,
      }}>
        <Text style={{
          fontWeight: 500,
          fontSize: 16,
        }}>
          Версия приложения 1.0.0
        </Text>
      </View>

      <View style={{
        backgroundColor: 'white',
        marginTop: 20,
        paddingTop: 20,
        borderRadius: 10,
      }}>
        <Text style={styles.title}>Мои объявления</Text>
        {adsenses.map(ad => (
          <View key={ad._id} style={styles.adContainer}>
            <View style={styles.infoContainer}>
              <Image source={{ uri: `${localhosturl}/${userData?.phone}/${ad?.imagesList[0]}` }} style={styles.adImage} />
              <Text style={styles.adText}>Город: {ad.city}</Text>
              <Text style={styles.adText}>Категория: {ad.category}</Text>
              <Text style={styles.adText}>Адрес: {ad.address}</Text>
              <Text style={styles.adText}>Телефон: {ad?.phone}</Text>
              <Text style={styles.adText}>Часы работы: {ad.workhours}</Text>
              {ad.servicesList.map((service, index) => (
                <Text key={index} style={styles.adText}>
                  Часы: {service.hours}, Цена: {service.price}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleClearDatabase}>
        <Text style={styles.buttonText}>Очистить базу данных</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={refreshAdsenses}>
        <Text style={styles.buttonText}>Обновить данные объявлений</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await AsyncStorage.clear();
          setUserData(null);
          setAdsenses([])
        }}>
        <Text style={styles.buttonText}>Удалить AsyncStorage</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f3f2f8',
    paddingHorizontal: 20,
    paddingTop: 10,
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
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  adContainer: {
    padding: 10,
    marginBottom: 20,
  },
  adText: {
    fontSize: 16,
    marginBottom: 5,
  },
  adImage: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  infoContainer: {
    paddingHorizontal: 0,
  },
});

export default ProfileScreen;
