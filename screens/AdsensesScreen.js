import React, { useState, useEffect } from 'react';
import { FlatList, Text, TextInput, View, Button, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';

const AdsensesScreen = () => {
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

  const MapComponent = () => {
    return (
      <View style={styles.componentContainer}>
        <Text style={styles.componentText}>Custom Map Component</Text>
      </View>
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
        <View style={styles.itemContainer}>
          <Text>{item.category}</Text>
          <Text>{item.city}</Text>
          <Text>{item.phone}</Text>
          <Text>{item.address}</Text>
          <Text>{item.workhours}</Text>
          <Text>{item.services}</Text>
        </View>
      );
    }
  };

  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.1.102:3000/adsenses?page=${count}`)
      .then((x) => x.json())
      .then((data) => {
        const objects = data.map((item) => ({
          id: item._id,
          category: item.category,
          city: item.city,
          phone: item.phone,
          address: item.address,
          workhours: item.workhours,
          services: item.services,
        }));
        setData(objects);
      });
  }, [count]);

  const styles = StyleSheet.create({
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
    itemContainer: {
      alignItems: 'center',
      paddingVertical: 10,
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

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetch(`http://192.168.1.102:3000/adsenses?page=${count}`)
      .then((x) => x.json())
      .then((data) => {
        const objects = data.map((item) => ({
          id: item._id,
          category: item.category,
          city: item.city,
          phone: item.phone,
          address: item.address,
          workhours: item.workhours,
          services: item.services,
        }));
        setData(objects);
        setRefreshing(false);
      });
  };

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
