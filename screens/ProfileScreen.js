import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, FlatList, Text, TextInput, View, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import localhosturl from './../localhoststring';
import { useNavigation } from '@react-navigation/native';
import ProfileAdsenses from '../innerCoponents/Profile_adsenses';
import ProfileRegistration from '../innerCoponents/Profile_registration';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
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

    const countNewOrders = (adsenses) => {
      const pendingCount = adsenses.reduce((count, adsense) => {
        return count + adsense.orders.filter(order => order.status === "Ожидает подтверждения").length;
      }, 0);

      return pendingCount
    };


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
          <View style={styles.userContainer}>
            <Image source={{ uri: `${localhosturl}/userIcons/user2.png` }} style={styles.userImage} />
            <View>
              <Text style={styles.userName}>{userData?.name}</Text>
              <Text style={styles.userPhone}>+{userData?.phone}</Text>
            </View>
          </View>
        )
        :
        <ProfileRegistration name={name} setName={setName} phone={phone} setPhone={setPhone} password={password} setPassword={setPassword} userData={userData} setUserData={setUserData} refreshAdsenses={refreshAdsenses} />
      }

      {userData ?
        <>
          <TouchableOpacity style={styles.addButton} onPress={() => { navigation.navigate('Добавить объявление', { adsenses: adsenses }) }}>
            <Text style={styles.addButtonText}>Добавить объявление</Text>
          </TouchableOpacity>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Бонусы</Text>
            <Text style={styles.sectionItem}>Баланс</Text>
            <Text style={styles.sectionItem}>Скидки</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Мои брони", { adsenses: adsenses, adsensesWithUserOrders: adsensesWithUserOrders, userData: userData })} style={{
              flexDirection: 'row',
              borderBottomColor: '#ececec',
              borderBottomWidth: 1,
              justifyContent: 'space-between'
            }}>
              <Text style={{ ...styles.sectionItem, borderBottomWidth: 0 }}>Брони</Text>
              <View style={{ backgroundColor: 'rgb(0, 191, 255)' }}>
                <Text style={{ ...styles.sectionItem, borderBottomWidth: 0, paddingHorizontal: 20, color: 'white' }}>{newOrdersCount}</Text>
              </View>
            </TouchableOpacity>
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
        <ProfileAdsenses adsenses={adsenses} userData={userData} refreshAdsenses={refreshAdsenses} />
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
