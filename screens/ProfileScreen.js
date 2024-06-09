import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, FlatList, Text, TextInput, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import localhosturl from './../localhoststring';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [adsenses, setAdsenses] = useState([]);

  const navigation = useNavigation();

  const refreshAdsenses = async () => {

    let user = await AsyncStorage.getItem('userData');
    if (user) {
      try {
        let response = await axios.post(`${localhosturl}/getUserAdsenses`, { user });
        console.log("объявления обновлены");
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

  const deleteAdsense = async (adId) => {

    Alert.alert(
      'Подтверждение удаления',
      'Вы уверены, что хотите удалить это объявление?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => deleteAd(adId),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );

    async function deleteAd(adId) {
      try {
        const response = await fetch(`${localhosturl}/deleteAdsense`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: adId }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Успешно удалено:', result);
          Alert.alert('Успех', 'Объявление успешно удалено');
          await refreshAdsenses()
        } else {
          const errorData = await response.json();
          console.error('Ошибка при удалении:', errorData.message);
          Alert.alert('Ошибка', 'Ошибка при удалении объявления');
        }
      } catch (error) {
        console.error('Ошибка при соединении с сервером:', error);
        Alert.alert('Ошибка', 'Ошибка при соединении с сервером');
      }
    }

  }

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
        borderRadius: 10
      }}>
        <Text style={styles.title}>Мои объявления</Text>
        {adsenses.map(ad => (
          <TouchableOpacity key={ad._id}
            onPress={() => navigation.navigate('Детали объявления', {
              adId: ad._id, adUser: ad.user, adCity: ad.city, adDistrict: ad.district, adCategory: ad.category, adPhone: ad.phone, adAddress: ad.address, adWorkhours: ad.workhours, adServiceParams: ad.servicesList, adImagesList: ad.imagesList, adDescription: ad.description, adTestimonials: ad.testimonials
            })}
          >
            <View style={styles.adContainer}>
              <View style={styles.infoContainer}>
                <Image source={{ uri: `${localhosturl}/${userData?.phone}/${ad?.imagesList[0]}` }} style={styles.adImage} />
                <View style={{ maxWidth: '80%' }}>
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
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                <TouchableOpacity
                  style={styles.button}
                >
                  <Text style={{ color: 'white', textTransform: 'uppercase', fontWeight: 600 }}>Изменить</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.button, backgroundColor: 'red' }}
                  onPress={() => { deleteAdsense(ad._id) }}
                >
                  <Text style={{ color: 'white', textTransform: 'uppercase', fontWeight: 600 }}>Удалить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
    flexGrow: 1,
    marginVertical: 10,
    backgroundColor: 'rgb(0, 191, 255)', // светло-голубой фон
    padding: 10, // отступы
    borderRadius: 10, // радиус закругления углов
    alignItems: 'center', // центрирование по горизонтали
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
    fontSize: 12,
    marginBottom: 2,
    maxWidth: '80%',
    color: 'black'
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
    gap: 10
  },
});

export default ProfileScreen;
