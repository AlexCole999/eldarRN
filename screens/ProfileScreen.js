import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, FlatList, Text, TextInput, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [adsenses, setAdsenses] = useState([]);

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
              await axios.delete('http://192.168.1.102:3000/users');
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

  const handleCustom = async () => {

    let user = await AsyncStorage.getItem('userData');
    if (user) {
      try {
        let response = await axios.post('http://192.168.1.102:3000/getUserAdsenses', { user });
        console.log(response.data.adsenses);
        setAdsenses(response.data.adsenses); // Устанавливаем полученные объявления в состояние
      } catch (error) {
        console.error("Ошибка при получении объявлений:", error);
      }
    }
  }

  const handleRegistration = async () => {
    try {
      await axios.post('http://192.168.1.102:3000/registration', {
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
    handleCustom();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {userData ? (
        <View>
          <Text style={styles.title}>Имя: {userData?.name}</Text>
          <Text style={styles.title}>Телефон: {userData?.phone}</Text>
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
      <Text style={styles.title}>Мои объявления</Text>
      {adsenses.map(ad => (
        <View key={ad._id} style={styles.adContainer}>
          <FlatList
            data={ad.imagesList}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => console.log(`http://192.168.1.102:3000/`)}>
                <Image source={{ uri: `http://192.168.1.102:3000/${userData?.phone}/${item}` }} style={styles.adImage} />
              </TouchableOpacity>
            )}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.adText}>Город: {ad.city}</Text>
            <Text style={styles.adText}>Категория: {ad.category}</Text>
            <Text style={styles.adText}>Адрес: {ad.address}</Text>
            <Text style={styles.adText}>Телефон: {ad?.phone}</Text>
            <Text style={styles.adText}>Часы работы: {ad.workhours}</Text>
            {ad.servicesList.map(service => (
              <Text key={service.price} style={styles.adText}>
                Часы: {service.hours}, Цена: {service.price}
              </Text>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleClearDatabase}>
        <Text style={styles.buttonText}>Очистить базу данных</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCustom}>
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
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
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  adText: {
    fontSize: 16,
    marginBottom: 5,
  },
  adImage: {
    width: 290,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  infoContainer: {
    paddingHorizontal: 10,
  },
});

export default ProfileScreen;
