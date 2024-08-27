import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet, ScrollView, LogBox, Dimensions } from 'react-native';
import axios from 'axios';
import localhosturl from './../localhoststring';
import { useNavigation } from '@react-navigation/native';

import profile_adsenses_place from '../assets/profile_adsenses_place.png'
import profile_adsenses_phone from '../assets/profile_adsenses_phone.png'
import profile_adsenses_other from '../assets/profile_adsenses_other.png'

const Profile_orders_my = ({ route }) => {

  const screenWidth = Dimensions.get('window').width;

  const navigation = useNavigation();

  const { adsensesWithUserOrders, userData, refreshAdsenses } = route.params;

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
    <ScrollView style={{ gap: 2, backgroundColor: '#F5FFFF' }}>
      <View>
        {
          adsensesWithUserOrders.map((adsense) => {
            // Фильтруем заказы, чтобы отобразить только те, в которых userPhone совпадает с user.phone
            const userOrders = adsense.orders.filter(order => order.userPhone === userData.phone);

            // Если нет подходящих заказов, не отображаем объявление
            if (userOrders.length === 0) {
              return null;
            }

            return (
              <TouchableOpacity key={adsense._id} style={{ paddingTop: 16, width: screenWidth, paddingHorizontal: 24 }} onPress={() => console.log(adsense)}>

                <View style={styles.adContainer}>

                  <Image source={{ uri: `${localhosturl}/${adsense.user}/${adsense?.imagesList[0]}` }} style={styles.adImage} />

                  <View style={styles.infoContainer}>

                    <View style={{ maxWidth: '100%' }}>

                      <Text style={{ ...styles.adText, fontFamily: 'Manrope_500Medium', fontSize: 16 }}>{adsense.category}</Text>

                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Image source={profile_adsenses_phone} style={{ width: 16, height: 16 }} />
                        <Text style={{ ...styles.adText, fontFamily: 'Manrope_400Regular', fontSize: 14, marginTop: 6 }}>+ {adsense?.phone.toString().replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')}</Text>
                      </View>

                      {
                        userOrders
                          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Сортировка заказов
                          .map((order) => (
                            <View key={order._id}>

                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, alignItems: 'center' }}>
                                <Text style={{ ...styles.adText, fontFamily: 'Manrope_300Light', fontSize: 16 }}>Статус</Text>
                                <Text style={{ ...styles.adText, fontFamily: 'Manrope_600SemiBold', fontSize: 14 }}>{order?.status}</Text>
                              </View>

                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, alignItems: 'center' }}>
                                <Text style={{ ...styles.adText, fontFamily: 'Manrope_300Light', fontSize: 16 }}>Дата/Время</Text>
                                <Text style={{ ...styles.adText, fontFamily: 'Manrope_600SemiBold', fontSize: 14 }}>{new Date(order?.date).toLocaleDateString()}{order?.bookingTime ? `/ ${order?.bookingTime}:00` : null}</Text>
                              </View>

                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, alignItems: 'center' }}>
                                <Text style={{ ...styles.adText, fontFamily: 'Manrope_300Light', fontSize: 16 }}>Длительность</Text>
                                <Text style={{ ...styles.adText, fontFamily: 'Manrope_600SemiBold', fontSize: 14 }}>{order?.duration} {order?.duration === '1' ? 'час' : order?.duration >= '2' && order?.duration <= '4' ? 'часа' : 'часов'}</Text>
                              </View>

                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, alignItems: 'center' }}>
                                <Text style={{ ...styles.adText, fontFamily: 'Manrope_300Light', fontSize: 16 }}>Дата запроса</Text>
                                <Text style={{ ...styles.adText, fontFamily: 'Manrope_600SemiBold', fontSize: 14 }}>{`${new Date(order.createdAt).toLocaleDateString()} / ${new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</Text>
                              </View>

                            </View>
                          ))
                      }
                    </View>
                  </View>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, borderBottomWidth: 1, borderBottomColor: '#C4C4C4', paddingBottom: 24, gap: 20 }}>
                  <TouchableOpacity style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#D63737', borderRadius: 12, height: 36, alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
                    onPress={() => { handleDeleteOrder(adsense.orders[0]._id) }}
                  >
                    <Text style={{ color: '#333333', fontFamily: 'Manrope_600SemiBold', fontSize: 16, letterSpacing: 0.5 }}>Отменить бронирование</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>









              // <View key={adsense._id} style={styles.adsenseContainer}>
              //   <Image
              //     source={{ uri: `${localhosturl}/${adsense.user}/${adsense.imagesList[0]}` }}
              //     style={styles.image}
              //   />
              //   <Text style={styles.address}>{adsense.address}</Text>
              //   <Text style={{ fontWeight: '500', textAlign: 'center', fontSize: 10 }}>+{adsense.phone}</Text>

              //   <View style={styles.infoContainer}>
              //     {userOrders
              //       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Сортировка заказов
              //       .map((order) => (
              //         <View key={order._id} style={styles.orderContainer}>
              //           <Text style={styles.orderText}>
              //             <Text style={styles.labelText}>Статус: </Text>
              //             <Text style={{ ...styles.valueText, color: order.status == 'Ожидает подтверждения' ? 'orange' : 'green' }}>
              //               {order.status}
              //             </Text>
              //           </Text>
              //           <Text style={styles.orderText}><Text style={styles.labelText}>Имя и телефон:</Text> <Text style={styles.valueText}>{order.userName}, {order.userPhone}</Text></Text>
              //           <Text style={styles.orderText}><Text style={styles.labelText}>Дата:</Text> <Text style={styles.valueText}>{new Date(order.date).toLocaleDateString()}{order.bookingTime ? `, ${order.bookingTime}:00` : null}</Text></Text>
              //           <Text style={styles.orderText}><Text style={styles.labelText}>Длительность:</Text> <Text style={styles.valueText}>{order.duration}:00</Text></Text>
              //           <Text style={styles.orderText}><Text style={styles.labelText}>Запрос отправлен:</Text> <Text style={styles.valueText}>{`${new Date(order.createdAt).toLocaleDateString()} ${new Date(order.createdAt).toLocaleTimeString()}`}</Text></Text>
              //           <View style={styles.buttonContainer}>
              //             <TouchableOpacity
              //               style={styles.cancelButton}
              //               onPress={() => handleDeleteOrder(order._id)}
              //             >
              //               <Text style={styles.buttonText}>Отменить бронирование</Text>
              //             </TouchableOpacity>
              //           </View>
              //         </View>
              //       ))}
              //   </View>
              // </View>
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
    paddingTop: 10,
    height: '100%'
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

export default Profile_orders_my