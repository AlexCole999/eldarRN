import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, FlatList, Text, TextInput, View, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import localhosturl from './../localhoststring';
import { useNavigation } from '@react-navigation/native';
import ProfileAdsenses from '../innerCoponents/Profile_adsenses';
import ProfileRegistration from '../innerCoponents/Profile_registration';

import profile_arrow from '../assets/profile_arrow.png'
import profile_balance from '../assets/profile_balance.png'
import profile_bonuses from '../assets/profile_bonuses.png'
import profile_calendar from '../assets/profile_calendar.png'
import profile_language from '../assets/profile_language.png'
import profile_pencil from '../assets/profile_pencil.png'
import profile_percent from '../assets/profile_percent.png'
import profile_plus from '../assets/profile_plus.png'
import profile_ring from '../assets/profile_ring.png'
import profile_sendapp from '../assets/profile_sendapp.png'
import profile_support from '../assets/profile_support.png'

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [accType, setAccType] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [adsenses, setAdsenses] = useState([]);
  const [adsensesWithUserOrders, setAdsensesWithUserOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [newOrdersCount, setNewOrdersCount] = useState(false);

  const navigation = useNavigation();

  const refreshAdsenses = async () => {

    setRefreshing(true);

    let user = await AsyncStorage.getItem('userData');
    console.log(user)

    const countNewOrders = (adsenses) => {
      const pendingCount = adsenses.reduce((count, adsense) => {
        return count + adsense.orders.filter(order => order.status === "Ожидает подтверждения").length;
      }, 0);

      return pendingCount
    };

    console.log('refresh')

    const countUserOrders = (adsensesWithUserOrders, user) => {
      return adsensesWithUserOrders.reduce((acc, adsense) => {
        const userOrders = adsense.orders.filter(order => (order.userPhone === JSON.parse(user).phone && order.status == 'Ожидает подтверждения'));
        return acc + userOrders.length;
      }, 0);
    };


    if (user) {
      try {
        let response = await axios.post(`${localhosturl}/getUserAdsenses`, { user });
        let adsensesWithUserOrders = await axios.post(`${localhosturl}/getUserAdsensesWithHisOrders`, { user });

        setAdsenses(response.data.adsenses); // Устанавливаем полученные объявления в состояние
        setAdsensesWithUserOrders(adsensesWithUserOrders.data.adsenses); // Устанавливаем полученные объявления в состояние
        setNewOrdersCount(countNewOrders(response.data.adsenses) + countUserOrders(adsensesWithUserOrders.data.adsenses, user))
      } catch (error) {
        console.error("Ошибка при получении объявлений:", error);
      }
    }
    setRefreshing(false);

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
          text: 'Выйти',
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
      {userData
        ?
        (
          <TouchableOpacity style={styles.userContainer} onPress={profileQuit}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Image source={{ uri: `${localhosturl}/userIcons/user2.png` }} style={styles.userImage} />
              <View>
                <Text style={styles.userName}>{userData?.name}</Text>
                <Text style={styles.userPhone}>+ {userData?.phone}</Text>
              </View>
            </View>
            <View style={{ paddingBottom: 20 }}>
              <Image source={profile_pencil} style={{ width: 24, height: 24 }} />
            </View>
          </TouchableOpacity>
        )
        :
        <ProfileRegistration accType={accType} setAccType={setAccType} name={name} setName={setName} phone={phone} setPhone={setPhone} password={password} setPassword={setPassword} userData={userData} setUserData={setUserData} refreshAdsenses={refreshAdsenses} />
      }

      {userData ?
        <>
          <TouchableOpacity style={styles.addButton} onPress={() => {
            navigation.navigate('Мои объявления', { adsenses: adsenses, userData: userData, refreshAdsenses: refreshAdsenses })
          }}>
            <Text style={styles.addButtonText}>Мои объявления</Text>
            <Text style={{ color: '#0094FF', fontFamily: 'Manrope_600SemiBold', fontSize: 16, }}>{adsenses.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.addButton, marginTop: 6 }} onPress={() => { navigation.navigate('Добавить объявление', { adsenses: adsenses }) }}>
            <Text style={styles.addButtonText}>Добавить объявление</Text>
            <Image source={profile_plus} style={{ width: 18, height: 18 }} />
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.addButton, marginTop: 6 }} onPress={() => { navigation.navigate('Добавить объявление', { adsenses: adsenses }) }}>
            <Text style={styles.addButtonText}>Платные услуги</Text>
            <Image source={profile_arrow} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.addButton, marginTop: 24 }} onPress={() => { navigation.navigate('Бонусы') }}>
            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
              <Image source={profile_bonuses} style={{ width: 18, height: 18 }} />
              <Text style={styles.addButtonText}>Бонусы</Text>
            </View>
            <Image source={profile_arrow} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.addButton, marginTop: 6 }} onPress={() => { navigation.navigate('Баланс') }}>
            <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
              <Image source={profile_balance} style={{ width: 22, height: 19 }} />
              <Text style={styles.addButtonText}>Баланс</Text>
            </View>
            <Image source={profile_arrow} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.addButton, marginTop: 6 }} onPress={() => { navigation.navigate('Скидки') }}>
            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
              <Image source={profile_percent} style={{ width: 18, height: 18 }} />
              <Text style={styles.addButtonText}>Скидки</Text>
            </View>
            <Image source={profile_arrow} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.addButton, marginTop: 6 }} onPress={() => { navigation.navigate("Бронь", { adsenses: adsenses, adsensesWithUserOrders: adsensesWithUserOrders, userData: userData, refreshAdsenses: refreshAdsenses }) }}>
            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
              <Image source={profile_calendar} style={{ width: 18, height: 18 }} />
              <Text style={styles.addButtonText}>Бронь</Text>
            </View>
            <View style={{ backgroundColor: 'rgb(0, 148, 255)', paddingHorizontal: 12, paddingVertical: 2, borderRadius: 6 }}>
              <Text style={{ color: 'white', fontFamily: 'Manrope_500Medium', fontSize: 16, textAlign: 'center' }}>{newOrdersCount}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.addButton, marginTop: 6 }} onPress={() => { navigation.navigate('Уведомления') }}>
            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
              <Image source={profile_ring} style={{ width: 18, height: 18 }} />
              <Text style={styles.addButtonText}>Уведомления</Text>
            </View>
            <Text style={{ color: '#0094FF', fontFamily: 'Manrope_600SemiBold', fontSize: 16, }}>0</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.addButton, marginTop: 24 }} >
            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
              <Image source={profile_sendapp} style={{ width: 18, height: 18 }} />
              <Text style={styles.addButtonText}>Поделиться приложением</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.addButton, marginTop: 6 }} >
            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
              <Image source={profile_language} style={{ width: 18, height: 18 }} />
              <Text style={styles.addButtonText}>Язык приложения</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.addButton, marginTop: 6 }} >
            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
              <Image source={profile_support} style={{ width: 18, height: 18 }} />
              <Text style={styles.addButtonText}>Служба поддержки</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.addButton, marginTop: 24 }} >
            <Text style={styles.addButtonText}>Версия приложения</Text>
            <Text style={{ color: '#0094FF', fontFamily: 'Manrope_600SemiBold', fontSize: 16, }}>1.0.0</Text>
          </TouchableOpacity>
        </>
        : null
      }


      {/* {userData ?
        <TouchableOpacity style={{ ...styles.button, marginTop: 20 }} onPress={profileQuit}>
          <Text style={styles.buttonText}>Выйти из профиля</Text>
        </TouchableOpacity>
        : null
      } */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5FFFF',
    paddingHorizontal: 24,
    paddingVertical: 24,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 24,
    padding: 8,
    borderRadius: 12,
    elevation: 3
  },
  addButtonText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 16,
    color: '#333333'
  },
  sectionContainer: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingVertical: 10,
    paddingLeft: 14,
    borderRadius: 10
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
    padding: 8,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    elevation: 4
  },
  userImage: {
    width: 44,
    height: 44,
  },
  userName: {
    textTransform: 'capitalize',
    fontWeight: '700',
    letterSpacing: 0.2,
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
  },
  userPhone: {
    letterSpacing: 0.2,
    fontFamily: 'Manrope_500Medium',
    fontSize: 16,
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
