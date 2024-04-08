import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';

const AdsensesScreen = () => {
  const SearchComponent = () => {
    return (
      <View style={styles.componentContainer}>
        <Text style={styles.componentText}>Custom Search Component</Text>
      </View>
    );
  };

  const Buttons = () => {
    return (
      <View style={styles.componentContainer}>
        <Text style={styles.componentText}>Страница: {count}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setCount(count - 1)}>
            <Text style={styles.buttonText}>Предыдущие</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)}>
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
          <Text>{item.id}</Text>
          <Text>{item.name}</Text>
          <Text>{item.email}</Text>
        </View>
      );
    }
  };

  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.1.102:3000/users?page=${count}`)
      .then((x) => x.json())
      .then((data) => {
        const objects = data.map((item) => ({
          id: item._id,
          email: item.email,
          name: item.name,
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
    />
  );
};

export default AdsensesScreen;
