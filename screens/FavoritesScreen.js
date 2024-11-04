import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Button, StyleSheet, RefreshControl, Alert, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import localhosturl from './../localhoststring';
import { useNavigation } from '@react-navigation/native';
import profile_adsenses_phone from '../assets/profile_adsenses_phone.png'

import favorites_null from '../assets/favorites_null.png';
import favorites_fill from '../assets/favorites_fill.png';

const FavoritesScreen = () => {

  const navigation = useNavigation();

  const [favoriteAdsenses, setFavoriteAdsenses] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // Состояние для отслеживания обновления экрана

  const fetchUserData = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      userData = JSON.parse(userData);
      let phone = userData.phone;

      const response = await axios.post(`${localhosturl}/getFavoriteAdsenses`, { phone });
      const favads = response.data.adsenses.map((item) => ({
        user: item.user,
        accType: item.accType,
        id: item._id,
        title: item.title,
        category: item.category,
        city: item.city,
        district: item?.district,
        phone: item.phone,
        address: item.address,
        workhours: item.workhours,
        servicesList: item.servicesList,
        imagesList: item.imagesList,
        description: item.description,
        instagram: item.instagram,
        telegram: item.telegram,
        whatsapp: item.whatsapp,
        testimonials: item.testimonials,
        orders: item.orders
      }));
      setFavoriteAdsenses(favads);
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  };

  const removeAdFromFavorites = async (adId) => {
    try {
      let user = await AsyncStorage.getItem('userData');
      let phone = JSON.parse(user).phone;

      const response = await axios.post(`${localhosturl}/removeAdsenseFromFavorite`, { id: adId, phone });
      Alert.alert('Удалено', response.data.message);

      // Обновляем список избранного после удаления
      await fetchUserData();
    } catch (error) {
      console.error("Ошибка при удалении из избранного:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserData(); // Обновляем данные при потягивании
    setRefreshing(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const Separator = () => {
    return (
      <View style={{ width: '100%', height: 1, backgroundColor: '#C4C4C4', marginVertical: 24 }}></View>
    )
  }

  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: '#F5FFFF', flex: 1, padding: 24 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {favoriteAdsenses.map((item, index) => (

        item.accType == 'Коворкинг'

          ?

          <View>

            <TouchableOpacity
              style={{ ...styles.itemContainer, elevation: 4 }}
              key={item.id}
              onPress={() => navigation.navigate('Детали объявления', {
                adId: item.id,
                adAccType: item.accType,
                adUser: item.user,
                adTitle: item.title,
                adCity: item.city,
                adDistrict: item.district,
                adCategory: item.category,
                adPhone: item.phone,
                adAddress: item.address,
                adInstagram: item.instagram,
                adTelegram: item.telegram,
                adWhatsapp: item.whatsapp,
                adWorkhours: item.workhours,
                adServiceParams: item.servicesList,
                adImagesList: item.imagesList,
                adDescription: item.description,
                adTestimonials: item.testimonials
              })}
            >
              <View style={styles.adContainer}>

                <Image source={{ uri: `${localhosturl}/${item.user}/${item?.imagesList[0]}` }} style={{ ...styles.adImage, position: 'relative' }} />

                <TouchableOpacity
                  style={{ width: 20, height: 19, position: 'absolute', top: 10, right: 10 }}
                  onPress={async () => {
                    await removeAdFromFavorites(item.id);
                  }}
                >
                  <Image
                    style={{ width: 20, height: 19 }}
                    source={favorites_fill}
                  />
                </TouchableOpacity>

                <View style={styles.infoContainer}>

                  <View style={{ maxWidth: '100%' }}>

                    <Text style={{ ...styles.adText, fontFamily: 'Manrope_500Medium', fontSize: 16 }}>{item.title}, {item.category}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Image source={profile_adsenses_phone} style={{ width: 16, height: 16 }} />
                      <Text style={{ ...styles.adText, fontFamily: 'Manrope_400Regular', fontSize: 14, marginTop: 6 }}>+ {item?.phone.toString().replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')}</Text>
                    </View>

                  </View>
                </View>

              </View>



            </TouchableOpacity>

            {
              favoriteAdsenses.length !== index + 1 ? <Separator /> : null
            }

          </View>

          :

          <View>

            <TouchableOpacity
              style={{ ...styles.itemContainer, elevation: 4 }}
              key={item.id}
              onPress={() => navigation.navigate('Детали объявления', {
                adId: item.id,
                adAccType: item.accType,
                adUser: item.user,
                adTitle: item.title,
                adCity: item.city,
                adDistrict: item.district,
                adCategory: item.category,
                adPhone: item.phone,
                adAddress: item.address,
                adInstagram: item.instagram,
                adTelegram: item.telegram,
                adWhatsapp: item.whatsapp,
                adWorkhours: item.workhours,
                adServiceParams: item.servicesList,
                adImagesList: item.imagesList,
                adDescription: item.description,
                adTestimonials: item.testimonials
              })}
            >
              <View style={{ ...styles.adContainer, padding: 10, flexDirection: 'row', gap: 8, alignItems: 'center' }}>

                <Image source={{ uri: `${localhosturl}/${item.user}/${item?.imagesList[0]}` }} style={{ width: 55, height: 55, position: 'relative', borderRadius: 50 }} />

                <View style={{ gap: 4 }}>
                  <Text style={{ fontSize: 14, fontFamily: 'Montserrat_600SemiBold' }}>{item.title}</Text>
                  <Text style={{ fontSize: 12, fontFamily: 'Montserrat_400Regular' }}>{item.category}</Text>
                  <Text style={{ fontSize: 12, fontFamily: 'Montserrat_400Regular' }}>Услуг: {item.servicesList.length}</Text>
                </View>

                <TouchableOpacity
                  style={{ width: 20, height: 19, position: 'absolute', top: 10, right: 10 }}
                  onPress={async () => {
                    await removeAdFromFavorites(item.id);
                  }}
                >
                  <Image
                    style={{ width: 20, height: 19 }}
                    source={favorites_fill}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            {
              favoriteAdsenses.length !== index + 1 ? <Separator /> : null
            }

          </View>

      ))}
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
    marginBottom: 0,
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

export default FavoritesScreen;
