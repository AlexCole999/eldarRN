import React, { useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, Text, TextInput, View, Button, RefreshControl, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import localhosturl from './../localhoststring';

const Stack = createStackNavigator();

const AdsensesScreen = () => {
  const screenWidth = Dimensions.get('window').width;

  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [numColumns, setNumColumns] = useState(2);

  useEffect(() => {
    fetch(`${localhosturl}/adsenses?page=${count}`)
      .then((x) => x.json())
      .then((data) => {
        const objects = data.map((item) => ({
          user: item.user,
          id: item._id,
          category: item.category,
          city: item.city,
          phone: item.phone,
          address: item.address,
          workhours: item.workhours,
          servicesList: item.servicesList,
          imagesList: item.imagesList
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
          phone: item.phone,
          address: item.address,
          workhours: item.workhours,
          services: item.services,
          servicesList: item.servicesList,
          imagesList: item.imagesList
        }));
        setData(objects);
        setRefreshing(false);
      });
  };

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    itemContainer: {
      width: (screenWidth - 60) * 0.5,
      marginLeft: 20,
      backgroundColor: 'white',
      borderRadius: 5,
    },
    componentText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center'
    },
    buttonsContainer: {
      paddingBottom: -100,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: 'blue',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 5,
      flex: 1,
      marginHorizontal: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 16,
    },
  });

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        key={item.id}
        onPress={() => navigation.navigate('Детали объявления', { adId: item.id, adUser: item.user, adCity: item.city, adCategory: item.category, adPhone: item.phone, adAddress: item.address, adWorkhours: item.workhours, adServiceParams: item.servicesList, adImagesList: item.imagesList })}
      >
        <View>
          <Image style={{ width: "100%", height: 160, borderRadius: 5, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} source={{ uri: `${localhosturl}/${item.user}/${item.imagesList[0]}` }} />
          {/* <Text>{item.user}</Text> */}
          <Text>{item.city}</Text>
          <Text>{item.category}</Text>
          <Text>{item.address}</Text>
          <Text>Телефон: {item.phone}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const Buttons = () => {
    return (
      <View style={{}}>
        <Text style={styles.componentText}>Страница: {count}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCount(count - 1)}>
            <Text style={styles.buttonText}>Предыдущие</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCount(count + 1)}>
            <Text style={styles.buttonText}>Следующие</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 0, gap: 20 }}
        data={data}
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
