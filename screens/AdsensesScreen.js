import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, Button } from 'react-native';

const AdsensesScreen = () => {
  const SearchComponent = () => {
    return (
      <View>
        <Text>Custom Search Component</Text>
      </View>
    );
  };

  const Buttons = () => {
    return (
      <View
        style={{
          paddingTop: 30,
          paddingBottom: 90,
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'row'

        }}>
        <Text>Count:{count}</Text>
        <Button title="Increment" onPress={() => setCount(count + 1)} />
        <Button title="Decrement" onPress={() => setCount(count - 1)} />
      </View>
    );
  };

  const MapComponent = () => {
    return (
      <View>
        <Text>Custom Map Component</Text>
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
        <View style={{ alignItems: 'center' }}>
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
        const objects = data.map(item => ({
          id: item._id,
          email: item.email,
          name: item.name
        }));
        setData(objects)
      })
  }, [count]);
  return (
    <FlatList
      data={
        [
          { id: 'search', type: 'search' },
          { id: 'map', type: 'map' },
          ...data,
          { id: 'buttons', type: 'buttons' },
        ]
      }
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default AdsensesScreen;