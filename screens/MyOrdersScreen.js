import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet, ScrollView, LogBox } from 'react-native';
import axios from 'axios';
import localhosturl from './../localhoststring';
import { useNavigation } from '@react-navigation/native';

import profile_adsenses_place from '../assets/profile_adsenses_place.png'
import profile_adsenses_phone from '../assets/profile_adsenses_phone.png'
import profile_adsenses_other from '../assets/profile_adsenses_other.png'

const MyOrdersScreen = ({ route }) => {

  const { adsenses, adsensesWithUserOrders, userData, refreshAdsenses } = route.params;
  const navigation = useNavigation();

  const [myOrdersCount, setMyOrdersCount] = useState(false);



  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state.']);

  const countUserOrders = (adsensesWithUserOrders, userData) => {
    return adsensesWithUserOrders.reduce((acc, adsense) => {
      const userOrders = adsense.orders.filter(order => (order.userPhone === userData.phone && order.status == 'Ожидает подтверждения'));
      return acc + userOrders.length;
    }, 0);
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      const response = await axios.post(`${localhosturl}/acceptOrder`, { orderId });

      if (response.status === 200) {
        Alert.alert("Бронь подтверждена", `Бронь подтверждена`);
        console.log(`Order ${orderId} accepted successfully`);
        refreshAdsenses()
        navigation.navigate('Профиль');
        // Дополнительная логика перенаправления пользователя или обновления интерфейса
      } else {
        Alert.alert("Ошибка", `Не удалось изменить статус заказа: ${response.data.message}`);
        console.error(`Failed to accept order ${orderId}: ${response.data.message}`);
      }
    } catch (error) {
      Alert.alert("Ошибка", "Произошла ошибка при изменении статуса заказа.");
      console.error(`Error accepting order ${orderId}:`, error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    // Логика отмены брони
    try {
      const response = await axios.post(`${localhosturl}/deleteOrder`, { id: orderId });

      if (response.status === 200) {
        Alert.alert("Бронь снята", `Бронь успешно отменена`);
        console.log(`Order ${orderId} cancelled successfully`);
        refreshAdsenses()

        navigation.navigate('Профиль');
      } else {
        Alert.alert("Ошибка", `Не удалось снять бронь: ${response.data.message}`);
        console.error(`Failed to cancel order ${orderId}: ${response.data.message}`);
      }
    } catch (error) {
      Alert.alert("Ошибка", "Произошла ошибка при снятии брони.");
      console.error(`Error cancelling order ${orderId}:`, error);
    }

  };

  return (
    <ScrollView style={{ backgroundColor: '#F5FFFF' }}>
      <TouchableOpacity style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 24,
        marginHorizontal: 24,
        marginBottom: 8,
        padding: 8,
        borderRadius: 12,
        elevation: 4
      }} onPress={() => { navigation.navigate('Моя бронь', { adsensesWithUserOrders: adsensesWithUserOrders, userData: userData, refreshAdsenses: refreshAdsenses }) }}>
        <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
          <Text style={styles.addButtonText}>Моя бронь</Text>
        </View>
        <View style={{ backgroundColor: 'rgb(0, 148, 255)', paddingHorizontal: 12, paddingVertical: 2, borderRadius: 6 }}>
          <Text style={{ color: 'white', fontFamily: 'Manrope_500Medium', fontSize: 16, textAlign: 'center' }}>{countUserOrders(adsensesWithUserOrders, userData)}</Text>
        </View>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10
  },
  adsenseContainer: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 20,
    padding: 0,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    padding: 10
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center'
  },
  orderContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f3f2f8',
    borderRadius: 10,
  },
  orderText: {
    fontSize: 12,
    color: 'gray',
  },
  labelText: {
    fontWeight: '700',
  },
  valueText: {
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 0,
    justifyContent: 'space-between',
  },
  confirmButton: {
    marginVertical: 10,
    backgroundColor: 'rgb(0, 191, 255)', // светло-голубой фон
    padding: 10, // отступы
    borderRadius: 10, // радиус закругления углов
    alignItems: 'center', // центрирование по горизонтали
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    marginVertical: 10,
    backgroundColor: 'red',
    padding: 10, // отступы
    borderRadius: 10, // радиус закругления углов
    alignItems: 'center', // центрирование по горизонтали
    flex: 1,
    marginRight: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12
  }, container: {
    flexGrow: 1,
    backgroundColor: '#F5FFFF',
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
    paddingTop: 20,

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
    marginBottom: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    elevation: 4
  },
  adText: {
    fontSize: 12,
    marginBottom: 2,
    maxWidth: '80%',
    color: '#333333',
  },
  adImage: {
    width: '100%',
    height: 134,
    resizeMode: 'cover',
    borderColor: 'lightgray',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  infoContainer: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginTop: -12,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  adButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
    height: 36
  },
});

export default MyOrdersScreen;
