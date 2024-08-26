import React, { useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, Text, TextInput, View, Button, RefreshControl, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import localhosturl from './../localhoststring';
import { ScrollView } from 'react-native-gesture-handler';

const NewAdsensesInnerComponent = ({ newestAdsenses }) => {

  const screenWidth = Dimensions.get('window').width;

  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={{ display: 'flex', rowGap: 10, marginBottom: 40, marginLeft: 4, marginRight: 4, marginTop: 8, alignItems: 'flex-start' }}>
      <TouchableOpacity
        style={{ gap: 6, flexDirection: 'column', backgroundColor: 'white', padding: 8, paddingBottom: 8, borderRadius: 12, width: screenWidth * 0.36, elevation: 4, minHeight: 124 }}
        // onPress={() => { console.log(item) }}
        onPress={() => navigation.navigate('Детали объявления', {
          adId: item._id, adUser: item.user, adCity: item.city, adDistrict: item.district, adCategory: item.category, adPhone: item.phone, adAddress: item.address, adWorkhours: item.workhours, adServiceParams: item.servicesList, adImagesList: item.imagesList, adDescription: item.description, adTestimonials: item.testimonials
        })}
      >
        <Image
          source={{ uri: `${localhosturl}/${item?.user}/${item?.imagesList[0]}` }}
          style={{ width: '100%', height: 68, borderRadius: 8 }}
          resizeMode='cover'
        >
        </Image>
        <View style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'start', justifyContent: 'start', borderRadius: 5, gap: 10 }}>
          <Text style={{ color: 'black', fontWeight: 600, fontSize: 14, fontFamily: 'Roboto_500Medium', letterSpacing: 0.2 }}>{item?.category}</Text>
        </View>
      </TouchableOpacity >

    </View >
  );

  return (
    <View style={{ marginLeft: 18 }}>
      <Text style={{ fontSize: 24, fontFamily: 'Manrope_700Bold', color: '#333333', marginLeft: 6 }}>Недавно добавлены</Text>
      <FlatList
        data={newestAdsenses}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default NewAdsensesInnerComponent