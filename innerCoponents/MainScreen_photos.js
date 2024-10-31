import React, { useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, Text, TextInput, View, Button, RefreshControl, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import localhosturl from './../localhoststring';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

const PhotosAdsensesInnerComponent = ({ newestAdsenses }) => {

  const { t, i18n } = useTranslation();

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
    <View style={{ gap: 8, marginBottom: 40 }}>
      <TouchableOpacity style={{ elevation: 4, backgroundColor: 'white', borderRadius: 12 }}>
        <Image
          source={{ uri: `${localhosturl}/${item[0]?.user}/${item[0]?.imagesList[0]}` }}
          style={{ width: (screenWidth - 52) / 2, height: 137, borderRadius: 12 }}
          resizeMode='cover'
        />
      </TouchableOpacity>
      <TouchableOpacity style={{ elevation: 4, backgroundColor: 'white', borderRadius: 12 }}>
        <Image
          source={{ uri: `${localhosturl}/${item[1]?.user}/${item[1]?.imagesList[0]}` }}
          style={{ width: (screenWidth - 52) / 2, height: 137, borderRadius: 12 }}
          resizeMode='cover'
        />
      </TouchableOpacity >
    </View>

  );

  return (
    <View style={{ paddingLeft: 24, paddingRight: 15, paddingTop: 40 }}>
      <Text style={{ fontSize: 24, paddingBottom: 10, fontFamily: 'Manrope_700Bold', color: '#333333' }}>{t('Примеры интерьеров')}</Text>

      <View style={{ gap: 8 }}>

        <FlatList
          contentContainerStyle={{ gap: 8 }}
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