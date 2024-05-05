import React, { useState, useEffect } from 'react';
import { FlatList, Image, Text, TextInput, View, Button, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import localhosturl from './../localhoststring';

const Stack = createStackNavigator();

const AdsensesScreen = () => {

  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${localhosturl}/adsenses?page=${count}`)
      .then((x) => x.json())
      .then((data) => {
        console.log(data)
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

  const navigation = useNavigation();
  const SearchComponent = () => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
      // Здесь можно добавить логику для обработки поискового запроса
      console.log('Search for:', searchText);
    };

    return (
      <View style={styles.componentContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Искать</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Buttons = () => {
    return (
      <View style={styles.componentContainer}>
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

  const data1 = Array.from({ length: 6 }, (_, index) => ({ key: String(index) }));

  const MapComponent = () => {
    const renderItem = ({ item }) => (
      <View>
        <View style={styles.column}>
          <View style={styles.item}>
            <Text style={styles.category}>Category1</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.category}>Category2</Text>
          </View>
        </View>
      </View>
    );

    return (
      <FlatList
        data={data1}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        horizontal
      />
    );
  };

  const renderItem = ({ item }) => {
    if (item.type === 'search') {
      return <SearchComponent />;
    } else if (item.type === 'buttons') {
      return <Buttons />;
    } else if (item.type === 'map') {
      return <MapComponent />;
    } else {
      return (
        <TouchableOpacity
          key={item.id}
          onPress={() => navigation.navigate('Детали объявления', { adId: item.id, adUser: item.user, adCity: item.city, adCategory: item.category, adPhone: item.phone, adAddress: item.address, adWorkhours: item.workhours, adServiceParams: item.servicesList, adImagesList: item.imagesList })}
        >
          <View style={styles.itemContainer}>
            {<Image style={{ width: "90%", height: 300, borderRadius: 15 }} source={{ uri: `${localhosturl}/${item.user}/${item.imagesList[0]}` }} />}
            <Text>Пользователь: {item.user}</Text>
            <Text>Город: {item.city}</Text>
            <Text>Категория: {item.category}</Text>
            <Text>Контактный телефон: {item.phone}</Text>
            <Text>Адрес: {item.address}</Text>
            <Text>Часы работы: {item.workhours}</Text>
            {item.servicesList.map((x, i) =>
              < View key={i} style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text style={{ marginHorizontal: 20 }}>Услуга {i + 1}</Text>
                <Text style={{ marginHorizontal: 20 }}>Часы {x.hours}</Text>
                <Text style={{ marginHorizontal: 20 }}>Цена {x.price}</Text>
              </View>
            )
            }
          </View>
        </TouchableOpacity >
      );
    }
  };





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



  const styles = StyleSheet.create({
    componentContainer: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    column: {
      paddingHorizontal: 5,
    },
    item: {
      width: 250,
      height: 150,
      backgroundColor: 'gray',
      borderRadius: 10,
      marginBottom: 10,
      padding: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    category: {
      textAlign: 'center',
    },
    componentText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center'
    },
    itemContainer: {
      alignItems: 'center',
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    buttonsContainer: {
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
    componentContainer: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    componentText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center'
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    searchInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 10,
      marginRight: 10,
    },
    searchButton: {
      backgroundColor: 'blue',
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    searchButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

  return (
    <FlatList
      data={[
        { id: 'search', type: 'search' },
        { id: 'map', type: 'map' },
        ...data,
        { id: 'buttons', type: 'buttons' },
      ]}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    />
  );
};

export default AdsensesScreen;
