import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl, Image, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import localhosturl from '../localhoststring';

import profile_adsenses_phone from '../assets/profile_adsenses_phone.png'

const Registers_archive = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [archiveOrders, setArchiveOrders] = useState([]);
  const [adsenses, setAdsenses] = useState([]);


  const fetchUserData = async () => {
    try {
      let storedData = await AsyncStorage.getItem('userData');
      let parsedData = JSON.parse(storedData);
      let userPhone = parsedData?.phone || null;

      const archiveOrders = await axios.post(`${localhosturl}/getOrdersInArchive`, { userPhone });
      setArchiveOrders(archiveOrders?.data?.orders ? archiveOrders?.data?.orders : []);

      const adsenses = await axios.post(`${localhosturl}/getAdsensesById`, { adIds: archiveOrders.data.orders.map(item => item.adId) });
      setAdsenses(adsenses.data);
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchUserData();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const getAdDetails = (adId) => {
    const ad = adsenses.find(item => item._id === adId);
    return ad ? { imagesList: ad.imagesList, user: ad.user, title: ad.title, category: ad.category, idId: ad._id, serviceParams: ad.servicesList, workhours: ad.workhours, phone: ad.phone } : { imagesList: [], user: null, title: null, phone: null };
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
    >
      {archiveOrders.length > 0 ? (
        archiveOrders.map((order) => {
          const { imagesList, user, title, category, idId, serviceParams, workhours, phone } = getAdDetails(order.adId);

          return (
            <TouchableOpacity key={order._id} style={styles.orderContainer} onPress={() => { console.log(phone) }}>
              <View style={styles.adContainer}>
                <Image source={{ uri: `${localhosturl}/${user}/${imagesList[0]}` }} style={styles.adImage} />
                <View style={styles.infoContainer}>
                  <Text style={styles.adTitle}>{title}, {category}</Text>
                  <View style={styles.phoneContainer}>
                    <Image source={profile_adsenses_phone} style={styles.phoneIcon} />
                    <Text style={styles.adText}>+ {phone ? phone.toString().replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5') : null}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.repeatButton}
                  onPress={async () => {
                    let userData = await AsyncStorage.getItem('userData');
                    if (!userData) { Alert.alert('Требуется регистрация', 'Вы не зарегистрированы'); return }

                    let accType = JSON.parse(userData).accType;
                    if (accType == 'Клиент') { navigation.navigate('Забронировать', { adId: idId, adServiceParams: serviceParams, adWorkhours: workhours }) }
                    if (accType == 'Мастер') { Alert.alert('Неправильный тип аккаунта', 'Только клиенты могут бронировать заказы'); return }
                    if (accType == 'Коворкинг') { Alert.alert('Неправильный тип аккаунта', 'Только клиенты могут бронировать заказы'); return }

                  }}
                >
                  <Text style={styles.buttonText}>Повторить бронирование</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text style={styles.noOrdersText}>Нет архивных заказов.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5FFFF' },
  orderContainer: { paddingTop: 16, width: '100%', paddingHorizontal: 24 },
  adContainer: { marginBottom: 16, backgroundColor: 'white', borderRadius: 12, elevation: 4 },
  adImage: { width: '100%', height: 134, resizeMode: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  infoContainer: { padding: 10 },
  adTitle: { fontSize: 16, fontFamily: 'Manrope_600SemiBold' },
  phoneContainer: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  phoneIcon: { width: 16, height: 16 },
  adText: { fontSize: 14, fontFamily: 'Manrope_400Regular', color: '#333333', marginTop: 0 },
  buttonWrapper: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#C4C4C4', paddingBottom: 24 },
  repeatButton: { backgroundColor: 'white', borderWidth: 1, borderColor: '#0094FF', borderRadius: 12, height: 36, alignItems: 'center', justifyContent: 'center', flex: 1 },
  buttonText: { color: '#333333', fontFamily: 'Manrope_600SemiBold', fontSize: 16, letterSpacing: 0.5 },
  noOrdersText: { textAlign: 'center', color: 'gray', fontSize: 16, padding: 20 },
});

export default Registers_archive;