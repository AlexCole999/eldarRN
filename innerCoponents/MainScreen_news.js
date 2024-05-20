import React, { useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, Text, TextInput, View, Button, RefreshControl, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import localhosturl from './../localhoststring';
import { ScrollView } from 'react-native-gesture-handler';

const NewAdsensesInnerComponent = ({ newestAdsenses }) => {

  const screenWidth = Dimensions.get('window').width;

  const renderItem = ({ item }) => (
    <View style={{ display: 'flex', rowGap: 10, marginRight: 10 }}>
      <TouchableOpacity
        style={{ gap: 10, flexDirection: 'row', backgroundColor: 'white', padding: 10, borderRadius: 10, width: screenWidth * 0.7 }}
        onPress={() => { console.log(item[0]) }}>
        <Image
          source={{ uri: `${localhosturl}/${item.user}/${item.imagesList[0]}` }}
          style={{ width: 80, height: 70, borderRadius: 5 }}
          resizeMode='stretch'
          imageStyle={{ borderRadius: 5, width: '100%', height: '100%' }}
        >
        </Image>
        <View style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'start', justifyContent: 'center', borderRadius: 5, gap: 10 }}>
          <Text style={{ color: 'black', fontWeight: 700 }}>{item.category}</Text>
          <Text style={{ color: 'grey', fontSize: 12 }}>{item.address}</Text>
        </View>
      </TouchableOpacity >

    </View >
  );

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
      <Text style={{ fontSize: 16, paddingBottom: 10, fontWeight: 700 }}>Недавние</Text>
      <FlatList
        data={newestAdsenses}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal
      />
    </View>
  );
};

export default NewAdsensesInnerComponent