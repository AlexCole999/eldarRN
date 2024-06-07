import React, { useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, Text, TextInput, View, Button, RefreshControl, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import localhosturl from './../localhoststring';
import { ScrollView } from 'react-native-gesture-handler';

const PhotosAdsensesInnerComponent = ({ newestAdsenses }) => {

  let [data, setData] = useState([])

  useEffect(() => {

    function chunkArray(arr, chunkSize) {
      const result = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
      }
      return result;
    }
    // let result = newestAdsenses.map(x => { return { photo: x.imagesList[0], user: x.user } })
    // setData(result)
    setData(chunkArray(newestAdsenses, 2))
  }, [newestAdsenses]);

  const screenWidth = Dimensions.get('window').width;

  const renderItem = ({ item }) => (
    <View style={{ gap: 10 }}>
      <TouchableOpacity>
        <Image
          source={{ uri: `${localhosturl}/${item[0]?.user}/${item[0]?.imagesList[0]}` }}
          style={{ width: screenWidth * 0.43, height: 120, borderRadius: 5 }}
          resizeMode='cover'
          imageStyle={{ borderRadius: 5, width: 100, height: '100%' }}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={{ uri: `${localhosturl}/${item[1]?.user}/${item[1]?.imagesList[0]}` }}
          style={{ width: screenWidth * 0.43, height: 120, borderRadius: 5 }}
          resizeMode='cover'
          imageStyle={{ borderRadius: 5, width: '100%', height: '100%' }}
        />
      </TouchableOpacity >
    </View>

  );

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
      <Text style={{ fontSize: 16, paddingBottom: 10, fontWeight: 700 }}>Примеры интерьеров</Text>

      <View style={{ gap: 10 }}>

        <FlatList
          contentContainerStyle={{ gap: 10 }}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

      </View>
    </View>
  );
};

export default PhotosAdsensesInnerComponent