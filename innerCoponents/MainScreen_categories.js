import React, { useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, Text, TextInput, View, Button, RefreshControl, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import localhosturl from './../localhoststring';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

const categoriesList = [
  [
    {
      name: 'Косметология',
      icon: 'categories_cosmetology.jpg'
    },
    {
      name: 'Лашмейкеры и Бровисты',
      icon: 'categories_lashmaker.jpg'
    },
    {
      name: 'Стилисты',
      icon: 'categories_stylist.jpg'
    }
  ],
  [
    {
      name: 'Ногтевой сервис',
      icon: 'categories_nails.jpg'
    },
    {
      name: 'Массаж и Спа',
      icon: 'categories_massageAndSpa.jpg'
    },
    {
      name: 'Тату и Пирсинг',
      icon: 'categories_tattooAndPiercing.jpg'
    }
  ],
  [
    {
      name: 'Коворкинг и Конферент залы',
      icon: 'categories_coworking.jpg'
    },
    {
      name: 'Фотостудия',
      icon: 'categories_photostudy.jpg'
    },
    {
      name: 'Рестораны и Банкетные Залы',
      icon: 'categories_bankets.jpg'
    }
  ]
];

const CategoriesInnerComponent = () => {

  // const counterSlice = createSlice({
  //   name: 'counter',
  //   initialState: { value: '' },
  //   reducers: {
  //     filtercategory: (state, action) => {
  //       state.value = action.payload;
  //     },
  //   },
  // });

  // const { increment, decrement, filtercategory } = counterSlice.actions;

  // const dispatch = useDispatch();

  // const count = useSelector(state => state.counter.value);

  const navigation = useNavigation();

  const screenWidth = Dimensions.get('window').width;

  const renderItem = ({ item }) => (
    <View style={{ display: 'flex', rowGap: 10, marginRight: 10 }}>
      <TouchableOpacity
      // onPress={() => { dispatch(filtercategory(item[0]?.name)); navigation.navigate('Каталог') }}
      >
        <ImageBackground
          source={{ uri: `${localhosturl}/categoryPhotos/${item[0].icon}` }}
          style={{ width: screenWidth * 0.45, height: 100, borderRadius: 5 }}
          resizeMode='stretch'
          imageStyle={{ borderRadius: 5, width: '100%', height: '100%' }}
        >
          <View style={{ backgroundColor: 'rgba(0,0,0, 0.40)', display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
            <Text style={{ color: 'white', paddingHorizontal: 10, textAlign: 'center', fontWeight: 600 }}>{item[0]?.name}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      {item[1]?.name
        ? <TouchableOpacity
        // onPress={() => { dispatch(filtercategory(item[1]?.name)); navigation.navigate('Каталог') }}
        >
          <ImageBackground
            source={{ uri: `${localhosturl}/categoryPhotos/${item[1]?.icon}` }}
            style={{ width: screenWidth * 0.45, height: 100, borderRadius: 5 }}
            resizeMode='stretch'
            imageStyle={{ borderRadius: 5, width: '100%', height: '100%' }}
          >
            <View style={{ backgroundColor: 'rgba(0,0,0, 0.40)', display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
              <Text style={{ color: 'white', paddingHorizontal: 10, textAlign: 'center', fontWeight: 600 }}>{item[1]?.name}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        : null}
      {item[2]?.name
        ? <TouchableOpacity
        // onPress={() => { dispatch(filtercategory(item[2]?.name)); navigation.navigate('Каталог') }}
        >
          <ImageBackground
            source={{ uri: `${localhosturl}/categoryPhotos/${item[2]?.icon}` }}
            style={{ width: screenWidth * 0.45, height: 100, borderRadius: 5 }}
            resizeMode='stretch'
            imageStyle={{ borderRadius: 5, width: '100%', height: '100%' }}
          >
            <View style={{ backgroundColor: 'rgba(0,0,0, 0.40)', display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
              <Text style={{ color: 'white', paddingHorizontal: 10, textAlign: 'center', fontWeight: 600 }}>{item[2]?.name}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        : null}

    </View>
  );

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
      <Text style={{ fontSize: 16, paddingBottom: 10, fontWeight: 700 }}>Категории</Text>
      <FlatList
        data={categoriesList}
        renderItem={renderItem}
        keyExtractor={(item) => item[0].name}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoriesInnerComponent