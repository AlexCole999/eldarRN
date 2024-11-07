import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import localhosturl from '../localhoststring';

const RegistersScreen = () => {

  const navigation = useNavigation();

  const [myOrdersCount, setMyOrdersCount] = useState(0)
  const [clientsOrdersCount, setClientsOrdersCount] = useState(0)
  const [archiveOrdersCount, setArchiveOrdersCount] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false); // Для отслеживания состояния обновления
  const [userIsRegistered, setUserIsRegistered] = useState(null)

  const fetchUserData = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      userData = JSON.parse(userData);
      setUserIsRegistered(userData)
      let userPhone = userData ? userData?.phone : null;

      const myOrders = await axios.post(`${localhosturl}/getOrdersIfUserIsClient`, { userPhone });
      setMyOrdersCount(myOrders?.data?.orders?.length ? myOrders?.data?.orders?.length : 0)

      const clientsOrders = await axios.post(`${localhosturl}/getOrdersIfUserIsOwner`, { userPhone });
      setClientsOrdersCount(clientsOrders?.data?.orders?.length ? clientsOrders?.data?.orders?.length : 0)

      const archiveOrders = await axios.post(`${localhosturl}/getOrdersInArchive`, { userPhone });
      setArchiveOrdersCount(archiveOrders?.data?.orders?.length ? archiveOrders?.data?.orders?.length : 0)

    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true); // Начинаем обновление
    await fetchUserData(); // Обновляем данные при потягивании
    setIsRefreshing(false); // Завершаем обновление
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    userIsRegistered
      ?
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => { navigation.navigate('Мои записи') }}
        >
          <View style={styles.addButtonTextContainer}>
            <Text style={styles.addButtonText}>Мои записи</Text>
          </View>
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>{myOrdersCount}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.addButton, marginTop: 8 }}
          onPress={() => { navigation.navigate('Записи клиентов') }}
        >
          <View style={styles.addButtonTextContainer}>
            <Text style={styles.addButtonText}>Записи клиентов</Text>
          </View>
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>{clientsOrdersCount}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.addButton, marginTop: 8 }}
          onPress={() => { navigation.navigate('Архив записей') }}
        >
          <View style={styles.addButtonTextContainer}>
            <Text style={styles.addButtonText}>Архив записей</Text>
          </View>
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>{archiveOrdersCount}</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
      :
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <Text>Вы не зарегистрированы</Text>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FFFF',
    flex: 1,
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 24,
    marginHorizontal: 24,
    marginBottom: 8,
    padding: 8,
    borderRadius: 12,
    elevation: 4,
  },
  addButtonTextContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  addButtonText: {
    fontWeight: '500',
    fontSize: 16,
  },
  notificationBadge: {
    backgroundColor: 'rgb(0, 148, 255)',
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 6,
  },
  notificationText: {
    color: 'white',
    fontFamily: 'Manrope_500Medium',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RegistersScreen;
