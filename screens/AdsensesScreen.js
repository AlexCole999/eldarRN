import React, { useState, useRef, useEffect } from 'react';
import { FlatList, Image, Text, View, RefreshControl, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import localhosturl from './../localhoststring';
import Catalog_star from '../assets/Catalog_star.png';
import favorites_null from '../assets/favorites_null.png';
import favorites_fill from '../assets/favorites_fill.png';
import { useSelector } from 'react-redux';
import SearchComponent from './../innerCoponents/SearchComponent';

import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AdsensesScreen = () => {
  const screenWidth = Dimensions.get('window').width;

  const flatListRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [refreshing, setRefreshing] = useState(false);
  const [favoriteAdsenses, setFavoriteAdsenses] = useState([]);

  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const handleScrollToTop = () => {
    if (flatListRef.current && data.length > 0) {
      flatListRef.current.scrollToIndex({ animated: true, index: 0, duration: 200 });
    }
  };

  const isAdInFavorites = (favoriteAdsenses, adId) => {
    return favoriteAdsenses.some(favAd => favAd.id === adId);
  };

  const title = useSelector(state => state.filters.title);
  const city = useSelector(state => state.filters.city);
  const district = useSelector(state => state.filters.district);
  const category = useSelector(state => state.filters.category);
  const subcategory = useSelector(state => state.filters.subcategory);
  const coworking = useSelector(state => state.filters.coworking);
  const priceFrom = useSelector(state => state.filters.priceFrom);
  const priceTo = useSelector(state => state.filters.priceTo);
  const currency = useSelector(state => state.filters.currency);

  const fetchUserData = async () => {
    try {

      let userData = await AsyncStorage.getItem('userData');
      userData = JSON.parse(userData)
      let phone = userData.phone

      await axios.post(`${localhosturl}/getFavoriteAdsenses`, {
        phone: phone
      })
        .then((data) => data.data)
        .then(data => {
          const favads = data.adsenses.map((item) => ({
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
          console.log(favoriteAdsenses)
        })

    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  };

  const addAdToFavorites = async (adId) => {
    try {
      let user = await AsyncStorage.getItem('userData');
      let phone = JSON.parse(user).phone;

      const response = await axios.post(`${localhosturl}/addAdsenseToFavorite`, { id: adId, phone });
      Alert.alert('Добавлено', response.data.message);

      // Обновляем список избранного после добавления
      await fetchUserData();
    } catch (error) {
      console.error("Ошибка при добавлении в избранное:", error);
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

  const fetchAdsenses = async () => {

    await fetchUserData()

    fetch(`${localhosturl}/adsenses?page=${count}&title=${title}&city=${city}&district=${district}&category=${category}&subcategory=${subcategory}&coworking=${coworking}&priceFrom=${priceFrom}&priceTo=${priceTo}&currency=${currency}`)
      .then((response) => response.json())
      .then((data) => {
        const objects = data.map((item) => ({
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
        setData(objects);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (count !== 1) { setCount(1) }
    fetchAdsenses();
  }, [title, city, district, category, subcategory, coworking, priceFrom, priceTo, currency]);

  useEffect(() => {
    fetchAdsenses();
  }, [count]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchAdsenses();
    setRefreshing(false);
  };

  const Buttons = () => {
    return (
      <View style={styles.buttonsContainer}>

        <TouchableOpacity
          style={{ backgroundColor: count < 2 ? 'lightgrey' : 'rgba(0, 148, 255, 0.5)', borderRadius: 12, flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36 }}
          disabled={count < 2}
          onPress={() => { setCount(count - 1); handleScrollToTop(); }}        >
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
            {t("Отмена")}
          </Text>
        </TouchableOpacity>

        <Text style={styles.componentText}>{count}</Text>

        <TouchableOpacity
          style={{ backgroundColor: 'rgba(0, 148, 255, 0.5)', borderRadius: 12, flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36 }}
          // disabled={}
          onPress={() => { setCount(count + 1); handleScrollToTop() }}        >
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
            {t("Далее")}
          </Text>
        </TouchableOpacity>

      </View>
    );
  };

  const styles = StyleSheet.create({
    itemContainer: {
      width: (screenWidth - 60) * 0.52,
      marginLeft: 0,
      backgroundColor: 'white',
      borderRadius: 12,
    },
    image: {
      width: "100%",
      height: 100,
      borderRadius: 8
    },
    textContainer: {
      paddingHorizontal: 8,
      paddingTop: 6,
      paddingBottom: 6
    },
    category: {
      fontFamily: 'Manrope_600SemiBold',
      fontSize: 12,
      color: '#333333'
    },
    city: {
      marginTop: 4,
      fontFamily: 'Manrope_500Medium',
      fontSize: 10,
      color: '#333333',
    },
    address: {
      fontSize: 12,
      color: 'grey',
    },
    ratingContainer: {
      flexDirection: 'row',
      gap: 5,
      paddingTop: 3,
      justifyContent: 'flex-start',
    },
    ratingText: {
      fontSize: 8,
      color: 'grey',
    },
    componentText: {
      fontSize: 12,
      fontWeight: 'bold',
      paddingHorizontal: 10,
      textAlign: 'center',
    },
    buttonsContainer: {
      paddingHorizontal: 20,
      paddingVertical: 40,
      paddingTop: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    },
    button: {
      backgroundColor: '#0c6694',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      flex: 1,
      marginHorizontal: 0,
    },
    disabledButton: {
      opacity: 0.5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 16,
    },
  });

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      style={{ flex: 0, backgroundColor: '#F5FFFF', paddingTop: 0, paddingLeft: 0, paddingTop: 24 }}>


      <SearchComponent />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 18, gap: 8, zIndex: 1, marginTop: -24 }}>
        {
          data.map(item => {
            return (
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
                <View>
                  <Image
                    style={{ ...styles.image, position: 'relative' }}
                    source={{ uri: `${localhosturl}/${item.user}/${item.imagesList[0]}` }}
                  />

                  <TouchableOpacity
                    style={{ width: 20, height: 19, position: 'absolute', top: 10, right: 10 }}
                    onPress={async () => {
                      if (isAdInFavorites(favoriteAdsenses, item.id)) {
                        await removeAdFromFavorites(item.id);
                      } else {
                        await addAdToFavorites(item.id);
                      }
                    }}
                  >
                    <Image
                      style={{ width: 20, height: 19 }}
                      source={isAdInFavorites(favoriteAdsenses, item.id) ? favorites_fill : favorites_null}
                    />
                  </TouchableOpacity>


                  <View style={styles.textContainer}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', minWidth: 36 }}>
                      <Text style={{ ...styles.category, minHeight: 34, maxWidth: '70%' }}>{item?.title ? item?.title : item?.category}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'start', gap: 4 }}>
                        <Image
                          style={{ width: 12, height: 12, marginTop: 2 }}
                          source={Catalog_star}
                        />
                        <Text style={{ color: '#747474', fontSize: 12, color: '#D3B331', fontFamily: 'Montserrat_600SemiBold' }}>
                          {
                            item.testimonials.length ?
                              (item.testimonials.reduce((accumulator, review) => { return accumulator + review.rating; }, 0) / item.testimonials.length).toFixed(1)
                              : '0.0'
                          }
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.city}>{item.city}</Text>
                    <Text style={{ ...styles.city, color: '#747474', marginTop: 2, fontFamily: 'Manrope_300Light', }}>{item.district}</Text>

                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>

      <Buttons />

    </ScrollView>
  );
};

export default AdsensesScreen;
