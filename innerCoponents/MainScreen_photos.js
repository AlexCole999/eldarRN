import React, { useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, Text, TextInput, View, Button, RefreshControl, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import localhosturl from './../localhoststring';
import { ScrollView } from 'react-native-gesture-handler';

const PhotosAdsensesInnerComponent = ({ newestAdsenses }) => {

  let [data, setData] = useState([])

  useEffect(() => {
    let result = newestAdsenses.map(x => { return { photo: x.imagesList[0], user: x.user } })
    setData(result)
  }, [newestAdsenses]);
  console.log(data)

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
      <Text style={{ fontSize: 16, paddingBottom: 10, fontWeight: 700 }}>Примеры интерьеров</Text>

      <View style={{ gap: 10 }}>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Image
            source={{ uri: `${localhosturl}/${data[0]?.user}/${data[0]?.photo}` }}
            style={{ width: 80, height: 90, borderRadius: 5, flexGrow: 1 }}
            resizeMode='stretch'
            imageStyle={{ borderRadius: 5, width: '100%', height: '100%' }}
          />
          <Image
            source={{ uri: `${localhosturl}/${data[1]?.user}/${data[1]?.photo}` }}
            style={{ width: 80, height: 90, borderRadius: 5, flexGrow: 1 }}
            resizeMode='stretch'
            imageStyle={{ borderRadius: 5, width: '100%', height: '100%' }}
          />
          <Image
            source={{ uri: `${localhosturl}/${data[5]?.user}/${data[5]?.photo}` }}
            style={{ width: 80, height: 90, borderRadius: 5, flexGrow: 1 }}
            resizeMode='stretch'
            imageStyle={{ borderRadius: 5, width: '100%', height: '100%' }}
          />
        </View>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Image
            source={{ uri: `${localhosturl}/${data[2]?.user}/${data[2]?.photo}` }}
            style={{ width: 80, height: 70, borderRadius: 5, flexGrow: 1 }}
            resizeMode='stretch'
            imageStyle={{ borderRadius: 5, width: '100%', height: '100%' }}
          />
          <Image
            source={{ uri: `${localhosturl}/${data[3]?.user}/${data[3]?.photo}` }}
            style={{ width: 80, height: 70, borderRadius: 5, flexGrow: 1 }}
            resizeMode='stretch'
            imageStyle={{ borderRadius: 5, width: '100%', height: '100%' }}
          />
          <Image
            source={{ uri: `${localhosturl}/${data[4]?.user}/${data[4]?.photo}` }}
            style={{ width: 80, height: 70, borderRadius: 5, flexGrow: 1 }}
            resizeMode='stretch'
            imageStyle={{ borderRadius: 5, width: '100%', height: '100%' }}
          />
        </View>

      </View>
    </View>
  );
};

export default PhotosAdsensesInnerComponent