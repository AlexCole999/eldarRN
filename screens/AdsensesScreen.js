import React, { useState, useRef, useEffect } from 'react';
import { FlatList, Image, Text, View, RefreshControl, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import localhosturl from './../localhoststring';
import StarRating from './../innerCoponents/StarRating';

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

  const fetchData = () => {
    fetch(`${localhosturl}/adsenses?page=${count}`)
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
    fetchData();
  }, [count]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => {
    if (item.id === 'buttons') {
      return <Buttons />;
    } else {
      return (
        <TouchableOpacity
          style={styles.itemContainer}
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
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.city}>{item.city}</Text>
              <Text style={styles.address}>{item.address}</Text>
              <View style={styles.ratingContainer}>
                <StarRating
                  rating={item.testimonials.length
                    ? item.testimonials.reduce((acc, obj) => acc + obj.rating, 0) / item.testimonials.length
                    : 0}
                  size={10}
                />
                <Text style={styles.ratingText}>
                  {item.testimonials.length
                    ? (item.testimonials.reduce((acc, obj) => acc + obj.rating, 0) / item.testimonials.length).toFixed(2)
                    : 0}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const Buttons = () => {
    return (
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          disabled={count < 2}
          style={[styles.button, count < 2 ? styles.disabledButton : null]}
          onPress={() => { setCount(count - 1); handleScrollToTop(); }}
        >
          <Text style={styles.buttonText}>Предыдущие</Text>
        </TouchableOpacity>
        <Text style={styles.componentText}>{count}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { setCount(count + 1); handleScrollToTop(); }}
        >
          <Text style={styles.buttonText}>Следующие</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    itemContainer: {
      width: (screenWidth - 60) * 0.5,
      marginLeft: 20,
      backgroundColor: 'white',
      borderRadius: 5,
    },
    image: {
      width: "100%",
      height: 160,
      borderRadius: 5,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    textContainer: {
      padding: 10,
    },
    category: {
      fontWeight: '700',
      fontSize: 14,
    },
    city: {
      fontSize: 12,
      color: 'grey',
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
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
    <View style={{ flex: 1, backgroundColor: '#f3f2f8', paddingTop: 20 }}>
      <FlatList
        ref={flatListRef}
        contentContainerStyle={{ paddingHorizontal: 0, gap: 20, paddingBottom: 20 }}
        data={[...data]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        numColumns={numColumns}
      />
      <Buttons />
    </View>
  );
};

export default AdsensesScreen;
