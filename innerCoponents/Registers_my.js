import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl, Image, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import localhosturl from '../localhoststring';

import profile_adsenses_place from '../assets/profile_adsenses_place.png'
import profile_adsenses_phone from '../assets/profile_adsenses_phone.png'
import profile_adsenses_other from '../assets/profile_adsenses_other.png'

const Registers_clients = () => {
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

      // Новый эндпоинт для получения заказов, где пользователь является клиентом
      const archiveOrders = await axios.post(`${localhosturl}/getOrdersIfUserIsClient`, { userPhone });
      setArchiveOrders(archiveOrders?.data?.orders ? archiveOrders?.data?.orders : []);

      const adsenses = await axios.post(`${localhosturl}/getAdsensesById`, { adIds: archiveOrders.data.orders.map(item => item.adId) });
      setAdsenses(adsenses.data);
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  };

  const terminateOrder = async (orderId) => {
    Alert.alert(
      'Подтверждение',
      'Вы уверены, что хотите снять бронь?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Подтвердить',
          onPress: async () => {
            try {
              const response = await axios.post(`${localhosturl}/terminateOrder`, { orderId });
              if (response.data.success) {
                fetchUserData();
              }
            } catch (error) {
              console.error("Ошибка при отмене заказа:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
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
    return ad ? { imagesList: ad.imagesList, user: ad.user, title: ad.title, category: ad.category, idId: ad._id, serviceParams: ad.servicesList, workhours: ad.workhours, phone: ad.phone, city: ad.city, address: ad.address } : { imagesList: [], user: '', title: '', phone: '', city: '', address: '', category: '' };
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
    >
      {archiveOrders.length > 0 ? (
        archiveOrders.map((order) => {
          const { imagesList, user, title, category, idId, serviceParams, workhours, phone, city, address } = getAdDetails(order.adId);

          return (
            <TouchableOpacity key={order._id} style={styles.orderContainer} onPress={() => { console.log(order) }}>
              <View style={styles.adContainer}>
                <Image source={{ uri: `${localhosturl}/${user}/${imagesList[0]}` }} style={styles.adImage} />
                <View style={styles.infoContainer}>
                  <Text style={styles.adTitle}>{title}</Text>
                  <View style={styles.phoneContainer}>
                    <Image source={profile_adsenses_place} style={styles.phoneIcon} />
                    <Text style={styles.adText}>{city}, {address}</Text>
                  </View>
                  <View style={styles.phoneContainer}>
                    <Image source={profile_adsenses_phone} style={styles.phoneIcon} />
                    <Text style={styles.adText}>+ {phone ? phone.toString().replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5') : null}</Text>
                  </View>
                  <View style={styles.phoneContainer}>
                    <Image source={profile_adsenses_other} style={styles.phoneIcon} />
                    <Text style={styles.adText}>{category}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Manrope_400Regular' }}>Статус</Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Manrope_600SemiBold' }}>{order.status == 'waiting for approve' ? 'Ожидает подтверждения' : order.status}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Manrope_400Regular' }}>Дата/Время</Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Manrope_600SemiBold' }}>{order.date ? order.date : ''} {order.bookingTime ? `/ ${order.bookingTime}:00` : ''}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Manrope_400Regular' }}>Длительность</Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Manrope_600SemiBold' }}>{order.duration ? order.duration : ''} час</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Manrope_400Regular' }}>Дата запроса</Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Manrope_600SemiBold' }}>{order.createdAt ? `${new Date(order.createdAt).toLocaleDateString()} / ${new Date(order.createdAt).toLocaleTimeString()}` : ''}</Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, borderBottomWidth: 1, borderBottomColor: '#C4C4C4', paddingBottom: 24, gap: 20 }}>
                <TouchableOpacity style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#D63737', borderRadius: 12, height: 36, alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
                  onPress={async () => { terminateOrder(order._id) }}>
                  <Text style={{ color: '#333333', fontFamily: 'Manrope_600SemiBold', fontSize: 16, letterSpacing: 0.5 }}>Отменить бронирование</Text>
                </TouchableOpacity>

              </View>

            </TouchableOpacity>
          );
        })
      ) : (
        <Text style={styles.noOrdersText}>Нет ваших заказов.</Text>
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
  adText: { fontSize: 14, fontFamily: 'Manrope_400Regular' },
  noOrdersText: { fontSize: 16, fontFamily: 'Manrope_400Regular', color: '#888', textAlign: 'center', marginTop: 30 },
});

export default Registers_clients;