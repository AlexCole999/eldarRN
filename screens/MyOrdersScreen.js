import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet, ScrollView, LogBox } from 'react-native';
import axios from 'axios';
import localhosturl from './../localhoststring';
import { useNavigation } from '@react-navigation/native';

const MyOrdersScreen = ({ route }) => {

  const { adsenses, adsensesWithUserOrders, userData, refreshAdsenses } = route.params;
  const navigation = useNavigation();

  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state.']);

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
    <ScrollView style={styles.container}>
      <Text style={{ textAlign: 'center', fontWeight: 700, fontSize: 18 }}>Бронировали другие</Text>
      {adsenses.map((adsense) => (
        adsense.orders.length > 0 && (
          <View key={adsense._id} style={styles.adsenseContainer}>
            <Image
              source={{ uri: `${localhosturl}/${adsense?.user}/${adsense?.imagesList[0]}` }}
              style={styles.image}
            />
            <Text style={styles.address}>{adsense.address}</Text>
            <Text style={{ fontWeight: '500', textAlign: 'center', fontSize: 10 }}>+{adsense.phone}</Text>
            <View style={styles.infoContainer}>
              {adsense.orders
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Сортировка заказов
                .map((order) => (
                  <View key={order._id} style={styles.orderContainer}>
                    <Text style={styles.orderText}><Text style={styles.labelText}>Статус: </Text>
                      <Text style={{ ...styles.valueText, color: order.status == 'Ожидает подтверждения' ? 'orange' : 'green' }}>
                        {order.status}
                      </Text>
                    </Text>
                    <Text style={styles.orderText}><Text style={styles.labelText}>Имя и телефон:</Text> <Text style={styles.valueText}>{order.userName}, {order.userPhone}</Text></Text>
                    <Text style={styles.orderText}><Text style={styles.labelText}>Дата:</Text> <Text style={styles.valueText}>{new Date(order.date).toLocaleDateString()}{order.bookingTime ? `, ${order.bookingTime}:00` : null}</Text></Text>
                    <Text style={styles.orderText}><Text style={styles.labelText}>Длительность:</Text> <Text style={styles.valueText}>{order.duration}:00</Text></Text>
                    <Text style={styles.orderText}><Text style={styles.labelText}>Запрос отправлен:</Text> <Text style={styles.valueText}>{`${new Date(order.createdAt).toLocaleDateString()} ${new Date(order.createdAt).toLocaleTimeString()}`}</Text></Text>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={() => handleAcceptOrder(order._id)}
                      >
                        <Text style={styles.buttonText}>Подтвердить</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => handleDeleteOrder(order._id)}
                      >
                        <Text style={styles.buttonText}>Снять</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
            </View>
          </View>
        )
      ))}
      <Text style={{ textAlign: 'center', fontWeight: 700, fontSize: 18 }}>Бронировал я</Text>
      <View style={{ marginBottom: 20 }}>
        {adsensesWithUserOrders.map((adsense) => {
          // Фильтруем заказы, чтобы отобразить только те, в которых userPhone совпадает с user.phone
          const userOrders = adsense.orders.filter(order => order.userPhone === userData.phone);

          // Если нет подходящих заказов, не отображаем объявление
          if (userOrders.length === 0) {
            return null;
          }

          return (
            <View key={adsense._id} style={styles.adsenseContainer}>
              <Image
                source={{ uri: `${localhosturl}/${adsense.user}/${adsense.imagesList[0]}` }}
                style={styles.image}
              />
              <Text style={styles.address}>{adsense.address}</Text>
              <Text style={{ fontWeight: '500', textAlign: 'center', fontSize: 10 }}>+{adsense.phone}</Text>

              <View style={styles.infoContainer}>
                {userOrders
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Сортировка заказов
                  .map((order) => (
                    <View key={order._id} style={styles.orderContainer}>
                      <Text style={styles.orderText}>
                        <Text style={styles.labelText}>Статус: </Text>
                        <Text style={{ ...styles.valueText, color: order.status == 'Ожидает подтверждения' ? 'orange' : 'green' }}>
                          {order.status}
                        </Text>
                      </Text>
                      <Text style={styles.orderText}><Text style={styles.labelText}>Имя и телефон:</Text> <Text style={styles.valueText}>{order.userName}, {order.userPhone}</Text></Text>
                      <Text style={styles.orderText}><Text style={styles.labelText}>Дата:</Text> <Text style={styles.valueText}>{new Date(order.date).toLocaleDateString()}{order.bookingTime ? `, ${order.bookingTime}:00` : null}</Text></Text>
                      <Text style={styles.orderText}><Text style={styles.labelText}>Длительность:</Text> <Text style={styles.valueText}>{order.duration}:00</Text></Text>
                      <Text style={styles.orderText}><Text style={styles.labelText}>Запрос отправлен:</Text> <Text style={styles.valueText}>{`${new Date(order.createdAt).toLocaleDateString()} ${new Date(order.createdAt).toLocaleTimeString()}`}</Text></Text>
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity
                          style={styles.cancelButton}
                          onPress={() => handleDeleteOrder(order._id)}
                        >
                          <Text style={styles.buttonText}>Отменить бронирование</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
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
  },
});

export default MyOrdersScreen;
