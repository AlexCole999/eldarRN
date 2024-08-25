import React, { useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, Text, TextInput, View, Button, RefreshControl, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import localhosturl from '../localhoststring';
import { ScrollView } from 'react-native-gesture-handler';
import StarRating from './StarRating';
import main_star from '../assets/main_star.png';
const TopAdsensesInnerComponent = ({ topAdsenses }) => {

  const screenWidth = Dimensions.get('window').width;

  const navigation = useNavigation();

  // const renderItem = ({ item }) => (
  //   <View style={{ display: 'flex', rowGap: 10, marginRight: 10 }}>
  //     <TouchableOpacity
  //       style={{ gap: 10, flexDirection: 'row', backgroundColor: 'white', padding: 10, borderRadius: 10, width: screenWidth * 0.8 }}
  //       onPress={() => navigation.navigate('Детали объявления', {
  //         adId: item._id, adUser: item.user, adCity: item.city, adDistrict: item.district, adCategory: item.category, adPhone: item.phone, adAddress: item.address, adWorkhours: item.workhours, adServiceParams: item.servicesList, adImagesList: item.imagesList, adDescription: item.description, adTestimonials: item.testimonials
  //       })}
  //     >
  //       <ImageBackground
  //         source={{ uri: `${localhosturl}/${item.user}/${item.imagesList[0]}` }}
  //         style={{ width: '100%', height: 80, borderRadius: 5 }}
  //         resizeMode='cover'
  //         imageStyle={{ borderRadius: 5, width: '100%', height: '100%' }}
  //       >
  //         <View style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'start', justifyContent: 'center', borderRadius: 5, gap: 10 }}>
  //           <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
  //             {/* <StarRating rating={item.testimonials.reduce((sum, item) => sum + item.rating, 0) / item.testimonials.length} size={10} /> */}
  //             <Text style={{ fontSize: 8 }}>{(item.testimonials.reduce((sum, item) => sum + item.rating, 0) / item.testimonials.length).toFixed(2)}</Text>
  //           </View>

  //           <Text style={{ color: 'black', fontWeight: 700, fontSize: 12 }}>{item.category}</Text>
  //           <Text style={{ color: 'grey', fontSize: 12 }}>{item.address}</Text>
  //         </View>
  //       </ImageBackground>

  //     </TouchableOpacity >

  //   </View >
  // );

  return (
    <View style={{ marginLeft: 24, marginTop: 40, marginRight: 24 }}>

      <Text style={{ fontSize: 24, paddingBottom: 10, fontFamily: 'Manrope_700Bold', color: '#333333' }}>Топ объявления</Text>

      <TouchableOpacity
        style={{ backgroundColor: 'white', height: 80, borderRadius: 12, elevation: 4 }}
        onPress={() => navigation.navigate('Детали объявления', {
          adId: topAdsenses[0]._id, adUser: topAdsenses[0].user, adCity: topAdsenses[0].city, adDistrict: topAdsenses[0].district, adCategory: topAdsenses[0].category, adPhone: topAdsenses[0].phone, adAddress: topAdsenses[0].address, adWorkhours: topAdsenses[0].workhours, adServiceParams: topAdsenses[0].servicesList, adImagesList: topAdsenses[0].imagesList, adDescription: topAdsenses[0].description, adTestimonials: topAdsenses[0].testimonials
        })}
      >
        <ImageBackground
          source={{ uri: `${localhosturl}/${topAdsenses[0].user}/${topAdsenses[0].imagesList[0]}` }}
          style={{ width: '100%', height: 80, borderRadius: 12 }}
          resizeMode='cover'
          imageStyle={{ borderRadius: 12, width: '100%', height: 80 }}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', padding: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            </View>
            <View style={{ paddingBottom: 6, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Manrope_600SemiBold' }}>{topAdsenses[0].category}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Image
                  style={{ width: 12, height: 12, marginTop: 2 }}
                  source={main_star}
                />
                <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Manrope_700Bold' }}>{(topAdsenses[0].testimonials.reduce((sum, item) => sum + item.rating, 0) / topAdsenses[0].testimonials.length).toFixed(1)}</Text>
              </View>
            </View>
            <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Manrope_300Light' }}>{topAdsenses[0].address}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity >

      <TouchableOpacity
        style={{ backgroundColor: 'white', height: 80, borderRadius: 12, elevation: 4, marginTop: 8 }}
        onPress={() => navigation.navigate('Детали объявления', {
          adId: topAdsenses[1]._id, adUser: topAdsenses[1].user, adCity: topAdsenses[1].city, adDistrict: topAdsenses[1].district, adCategory: topAdsenses[1].category, adPhone: topAdsenses[1].phone, adAddress: topAdsenses[1].address, adWorkhours: topAdsenses[1].workhours, adServiceParams: topAdsenses[1].servicesList, adImagesList: topAdsenses[1].imagesList, adDescription: topAdsenses[1].description, adTestimonials: topAdsenses[1].testimonials
        })}
      >
        <ImageBackground
          source={{ uri: `${localhosturl}/${topAdsenses[1].user}/${topAdsenses[1].imagesList[0]}` }}
          style={{ width: '100%', height: 80, borderRadius: 12 }}
          resizeMode='cover'
          imageStyle={{ borderRadius: 12, width: '100%', height: 80 }}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', padding: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            </View>
            <View style={{ paddingBottom: 6, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Manrope_600SemiBold' }}>{topAdsenses[0].category}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Image
                  style={{ width: 12, height: 12, marginTop: 2 }}
                  source={main_star}
                />
                <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Manrope_700Bold' }}>{(topAdsenses[1].testimonials.reduce((sum, item) => sum + item.rating, 0) / topAdsenses[1].testimonials.length).toFixed(1)}</Text>
              </View>
            </View>
            <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Manrope_300Light' }}>{topAdsenses[1].address}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity >


    </View>
  );
};

export default TopAdsensesInnerComponent