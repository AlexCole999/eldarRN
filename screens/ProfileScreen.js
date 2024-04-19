import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

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

  const handleCustom = () => {
    axios.post('http://192.168.1.102:3000/users', {
      name: 'тфьутфьу',
      phone: '898988989801'
    })
      .then(x => console.log(x.data))
      ;
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

  React.useEffect(() => {
    loadUserData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {userData ? (
        <View>
          <Text>Имя: {userData.name}</Text>
          <Text>Телефон: {userData.phone}</Text>
        </View>
      ) : (
        <View>
          <Text>Регистрация</Text>
          <TextInput
            style={styles.input} // Устанавливаем ширину 90% экрана
            value={name}
            onChangeText={setName}
            placeholder="Имя"
          />
          <TextInput
            style={styles.input} // Устанавливаем ширину 90% экрана
            value={phone}
            onChangeText={setPhone}
            placeholder="Телефон"
          />
          <TextInput
            style={styles.input} // Устанавливаем ширину 90% экрана
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
      <TouchableOpacity style={styles.button} onPress={handleClearDatabase}>
        <Text style={styles.buttonText}>Очистить базу данных</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCustom}>
        <Text style={styles.buttonText}>Custom</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await AsyncStorage.clear();
          setUserData(null);

        }}>
        <Text style={styles.buttonText}>Удалить AsyncStorage</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default ProfileScreen;
