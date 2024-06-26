import React, { useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, Text, TextInput, View, Button, RefreshControl, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import localhosturl from '../localhoststring';
import { ScrollView } from 'react-native-gesture-handler';
import StarRating from './StarRating';

const TopAdsensesInnerComponent = ({ topAdsenses }) => {

  const screenWidth = Dimensions.get('window').width;

  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={{ display: 'flex', rowGap: 10, marginRight: 10 }}>
      <TouchableOpacity
        style={{ gap: 10, flexDirection: 'row', backgroundColor: 'white', padding: 10, borderRadius: 10, width: screenWidth * 0.8 }}
        onPress={() => navigation.navigate('Детали объявления', {
          adId: item._id, adUser: item.user, adCity: item.city, adDistrict: item.district, adCategory: item.category, adPhone: item.phone, adAddress: item.address, adWorkhours: item.workhours, adServiceParams: item.servicesList, adImagesList: item.imagesList, adDescription: item.description, adTestimonials: item.testimonials
        })}
      >
        <Image
          source={{ uri: `${localhosturl}/${item.user}/${item.imagesList[0]}` }}
          style={{ width: 90, height: 80, borderRadius: 5 }}
          resizeMode='cover'
          imageStyle={{ borderRadius: 5, width: '100%', height: '100%' }}
        >
        </Image>
        <View style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'start', justifyContent: 'center', borderRadius: 5, gap: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <StarRating rating={item.testimonials.reduce((sum, item) => sum + item.rating, 0) / item.testimonials.length} size={10} />
            <Text style={{ fontSize: 8 }}>{(item.testimonials.reduce((sum, item) => sum + item.rating, 0) / item.testimonials.length).toFixed(2)}</Text>
          </View>

          <Text style={{ color: 'black', fontWeight: 700, fontSize: 12 }}>{item.category}</Text>
          <Text style={{ color: 'grey', fontSize: 12 }}>{item.address}</Text>
        </View>
      </TouchableOpacity >

    </View >
  );

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
      <Text style={{ fontSize: 16, paddingBottom: 10, fontWeight: 700 }}>Топ объявления</Text>
      <FlatList
        data={topAdsenses}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default TopAdsensesInnerComponent