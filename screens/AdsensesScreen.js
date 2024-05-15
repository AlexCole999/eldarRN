import React, { useState, useRef, useEffect } from 'react';
import { FlatList, Image, ImageBackground, Text, TextInput, View, Button, RefreshControl, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import localhosturl from './../localhoststring';
import StarRating from './../innerCoponents/StarRating';

const Stack = createStackNavigator();

const AdsensesScreen = () => {
  const screenWidth = Dimensions.get('window').width;

  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [numColumns, setNumColumns] = useState(2);

  const handleScrollToTop = () => {
    flatListRef.scrollToIndex({ animated: true, index: 0, duration: 200 });
  };

  useEffect(() => {
    fetch(`${localhosturl}/adsenses?page=${count}`)
      .then((x) => x.json())
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
          testimonials: item.testimonials
        }));
        setData(objects);
      });
  }, [count]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetch(`${localhosturl}/adsenses?page=${count}`)
      .then((x) => x.json())
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
          services: item.services,
          servicesList: item.servicesList,
          imagesList: item.imagesList,
          description: item.description,
          testimonials: item.testimonials
        }));
        setData(objects);
        setRefreshing(false);
      });
  };

  const navigation = useNavigation();



  const renderItem = ({ item }) => {
    if (item.id === 'buttons') {
      return <Buttons />;
    }
    else return (
      <TouchableOpacity
        style={styles.itemContainer}
        key={item.id}
        onPress={() => navigation.navigate('Детали объявления', {
          adId: item.id, adUser: item.user, adCity: item.city, adDistrict: item.district, adCategory: item.category, adPhone: item.phone, adAddress: item.address, adWorkhours: item.workhours, adServiceParams: item.servicesList, adImagesList: item.imagesList, adDescription: item.description, adTestimonials: item.testimonials
        })}
      >
        <View>
          <Image style={{ width: "100%", height: 160, borderRadius: 5, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} source={{ uri: `${localhosturl}/${item.user}/${item.imagesList[0]}` }} />
          {/* <Text>{item.user}</Text> */}
          <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: 700, fontSize: 14 }}>{item.category}</Text>
            <Text style={{ fontSize: 12, color: 'grey' }}>{item.city}</Text>
            <Text style={{ fontSize: 12, color: 'grey' }}>{item.address}</Text>
            <View style={{ flexDirection: 'row', gap: 5, paddingTop: 3, justifyContent: 'flex-start' }}>
              <StarRating
                rating={item.testimonials.length
                  ? item.testimonials.reduce((acc, obj) => acc + obj.rating, 0) / item.testimonials.length
                  : 0}
                size={10}
              />
              <Text style={{ fontSize: 8, color: 'grey' }}>
                {item.testimonials.length
                  ? item.testimonials.reduce((acc, obj) => acc + obj.rating, 0) / item.testimonials.length
                  : 0}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };



  const Buttons = () => {
    return (
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          disabled={count < 2}
          style={{ ...styles.button, opacity: count < 2 ? 0.5 : null }}
          onPress={() => { setCount(count - 1); handleScrollToTop() }}>
          <Text style={styles.buttonText}>Предыдущие</Text>
        </TouchableOpacity>
        <Text style={styles.componentText}> {count}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { setCount(count + 1); handleScrollToTop() }}>
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
    componentText: {
      fontSize: 12,
      fontWeight: 'bold',
      paddingHorizontal: 10,
      textAlign: 'center'
    },
    buttonsContainer: {
      paddingHorizontal: 20,
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
        ref={(ref) => { flatListRef = ref; }}
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
        numColumns={numColumns} // Set number of columns
        key={numColumns}
      />
      <Buttons />
    </View>
  );

};



export default AdsensesScreen;
