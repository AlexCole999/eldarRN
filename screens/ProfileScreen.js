import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, FlatList, Text, TextInput, View, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native';
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
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const refreshAdsenses = async () => {
    setRefreshing(true);
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
    setRefreshing(false);
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
      refreshAdsenses()
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
          await refreshAdsenses();
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

  const profileQuit = () => {
    Alert.alert(
      'Подтверждение выхода',
      'Вы уверены, что хотите выйти из профиля?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => accountQuit(),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
    async function accountQuit() {
      await AsyncStorage.clear();
      setUserData(null);
      setAdsenses([]);
      Alert.alert('Выход', 'Вы успешно вышли из своего профиля');
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
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshAdsenses} />}
    >
      {userData ? (
        <View style={styles.userContainer}>
          <Image source={{ uri: `${localhosturl}/userIcons/user2.png` }} style={styles.userImage} />
          <View>
            <Text style={styles.userName}>{userData?.name}</Text>
            <Text style={styles.userPhone}>+{userData?.phone}</Text>
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Регистрация и вход</Text>
          <TextInput
            style={{ borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 10, marginBottom: 10, fontSize: 16 }}
            placeholder="Имя"
            onChangeText={setName}
            value={name}
          />

          <TextInput
            style={{ borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 10, marginBottom: 10, fontSize: 16 }}
            value={phone}
            onChangeText={setPhone}
            placeholder="Телефон"
          />
          <TextInput
            style={{ borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 10, marginBottom: 10, fontSize: 16 }}
            value={password}
            onChangeText={setPassword}
            placeholder="Пароль"
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleRegistration}>
            <Text style={styles.buttonText}>Зарегистрироваться или войти</Text>
          </TouchableOpacity>
        </View>
      )}

      {userData ?
        <>
          <TouchableOpacity style={styles.addButton} onPress={() => { navigation.navigate('Добавить объявление') }}>
            <Text style={styles.addButtonText}>Добавить объявление</Text>
          </TouchableOpacity>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Бонусы</Text>
            <Text style={styles.sectionItem}>Баланс</Text>
            <Text style={styles.sectionItem}>Скидки</Text>
            <Text style={styles.sectionItem}>Брони</Text>
            <Text style={{ ...styles.sectionItem, borderBottomWidth: 0, paddingBottom: 0 }}>Чаты</Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Поделиться приложением</Text>
            <Text style={styles.sectionItem}>Язык приложения</Text>
            <Text style={{ ...styles.sectionItem, borderBottomWidth: 0, paddingBottom: 0 }}>Служба поддержки</Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={{ ...styles.sectionItem, borderBottomWidth: 0, paddingVertical: 0 }}>Версия приложения 1.0.0</Text>
          </View>
        </>
        : null
      }

      {adsenses.length ?
        <View style={styles.adsContainer}>
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
                    <Text style={styles.adText}>Услуги:</Text>
                    {ad.servicesList.map((service, index) => (
                      <Text key={index} style={styles.adText}>Часы: {service.hours}, Цена: {service.price}</Text>
                    ))}
                  </View>
                </View>
                <View style={styles.adButtonsContainer}>
                  <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('Изменить объявление', {
                      adId: ad._id, adUser: ad.user, adCity: ad.city, adDistrict: ad.district, adCategory: ad.category, adPhone: ad.phone, adAddress: ad.address, adWorkhours: ad.workhours, adServiceParams: ad.servicesList, adImagesList: ad.imagesList, adDescription: ad.description, adTestimonials: ad.testimonials
                    })}
                  >
                    <Text style={styles.buttonText}>Изменить</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => { deleteAdsense(ad._id) }}>
                    <Text style={styles.buttonText}>Удалить</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        : null
      }

      {userData ?
        <TouchableOpacity style={{ ...styles.button, marginTop: 20 }} onPress={profileQuit}>
          <Text style={styles.buttonText}>Выйти из профиля</Text>
        </TouchableOpacity>
        : null
      }
    </ScrollView>
  );
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

export default ProfileScreen;
