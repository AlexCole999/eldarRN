import React, { useState, useRef, useEffect } from 'react';
import { FlatList, Image, Text, View, RefreshControl, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import localhosturl from './../localhoststring';
import Catalog_star from '../assets/Catalog_star.png';
import { useSelector } from 'react-redux';
import SearchComponent from './../innerCoponents/SearchComponent';

const AdsensesScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const flatListRef = useRef(null);
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const handleScrollToTop = () => {
    if (flatListRef.current && data.length > 0) {
      flatListRef.current.scrollToIndex({ animated: true, index: 0, duration: 200 });
    }
  };

  const city = useSelector(state => state.filters.city);
  const district = useSelector(state => state.filters.district);
  const category = useSelector(state => state.filters.category);
  const subcategory = useSelector(state => state.filters.subcategory);
  const priceFrom = useSelector(state => state.filters.priceFrom);
  const priceTo = useSelector(state => state.filters.priceTo);
  const currency = useSelector(state => state.filters.currency);

  console.log(category, city)

  const fetchData = () => {
    fetch(`${localhosturl}/adsenses?page=${count}&city=${city}&district=${district}&category=${category}&subcategory=${subcategory}&priceFrom=${priceFrom}&priceTo=${priceTo}&currency=${currency}`)
      .then((response) => response.json())
      .then((data) => {
        const objects = data.map((item) => ({
          user: item.user,
          id: item._id,
          category: item.category,
          city: item.city,
          district: item?.district,
          phone: item.phone,
          address: item.address,
          workhours: item.workhours,
          servicesList: item.servicesList,
          imagesList: item.imagesList,
          description: item.description,
          testimonials: item.testimonials,
          orders: item.orders
        }));
        setData(objects);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (count !== 1) { setCount(1) }
    fetchData();
  }, [city, district, category, subcategory, priceFrom, priceTo, currency]);

  useEffect(() => {
    fetchData();
  }, [count]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
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
            Назад
          </Text>
        </TouchableOpacity>

        <Text style={styles.componentText}>{count}</Text>

        <TouchableOpacity
          style={{ backgroundColor: 'rgba(0, 148, 255, 0.5)', borderRadius: 12, flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36 }}
          // disabled={}
          onPress={() => { setCount(count + 1); handleScrollToTop() }}        >
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
            Далее
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
                  adId: item.id, adUser: item.user, adCity: item.city, adDistrict: item.district, adCategory: item.category, adPhone: item.phone, adAddress: item.address, adWorkhours: item.workhours, adServiceParams: item.servicesList, adImagesList: item.imagesList, adDescription: item.description, adTestimonials: item.testimonials
                })}
              >
                <View>
                  <Image
                    style={styles.image}
                    source={{ uri: `${localhosturl}/${item.user}/${item.imagesList[0]}` }}
                  />
                  <View style={styles.textContainer}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', minWidth: 36 }}>
                      <Text style={{ ...styles.category, minHeight: 34, maxWidth: '70%' }}>{item.category}</Text>
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
