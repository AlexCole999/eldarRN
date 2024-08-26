import React, { useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, Text, TextInput, View, Button, RefreshControl, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import localhosturl from './../localhoststring';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import filterSlice from '../storage/filterSlice';

import Filter from '../assets/Filter.png'
import Logo from '../assets/Logo.png'
import main_notifications from '../assets/main_notifications.png'
import { isNewBackTitleImplementation } from 'react-native-screens';

const categoriesList1 = [
  {
    name: 'Все',
    icon: 'categories_cosmetology.jpg'
  },
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
  },
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
  },
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
];

const categories = [
  {
    name: 'Косметология',
    icon: 'categories_cosmetology.jpg',
    subcategories: [
      { name: 'Эстетическая косметология', icon: 'categories_cosmetology.jpg' },
      { name: 'Аппаратная косметология', icon: 'categories_cosmetology.jpg' },
      { name: 'Инъекционная косметология', icon: 'categories_cosmetology.jpg' },
      { name: 'Депиляция, шугаринг', icon: 'categories_cosmetology.jpg' },
      { name: 'Перманентный макияж', icon: 'categories_cosmetology.jpg' }
    ]
  },
  { name: 'Лашмейкеры и Бровисты', icon: 'categories_lashmaker.jpg' },
  {
    name: 'Стилисты',
    icon: 'categories_stylist.jpg',
    subcategories: [
      { name: 'Стилисты по волосам', icon: 'categories_stylist.jpg' },
      { name: 'Визаж', icon: 'categories_stylist.jpg' },
      { name: 'Барбершоп', icon: 'categories_stylist.jpg' }
    ]
  },
  { name: 'Ногтевой сервис', icon: 'categories_nails.jpg' },
  { name: 'Массаж и Спа', icon: 'categories_massageAndSpa.jpg' },
  { name: 'Тату и Пирсинг', icon: 'categories_tattooAndPiercing.jpg' },
  { name: 'Коворкинг и Конферент залы', icon: 'categories_coworking.jpg' },
  { name: 'Фотостудия', icon: 'categories_photostudy.jpg' },
  { name: 'Рестораны и Банкетные Залы', icon: 'categories_bankets.jpg' },
  { name: 'Прочее', icon: 'categories_cosmetology.jpg' } // Используем иконку "Все"
];

const CategoriesInnerComponent = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  const [selectedCategory, setSelectedCategory] = useState('Все');

  const [selectedIndex, setSelectedIndex] = useState(null);

  const [showAll, setShowAll] = useState(false);

  let itemsToRender = [];

  const renderCategories = () => {


    if (selectedCategory === 'Все') {
      itemsToRender = categories.flatMap(category =>
        category.subcategories ? category.subcategories : [category]
      );
    } else {
      const selectedCat = categories.find(category => category.name === selectedCategory);
      itemsToRender = selectedCat?.subcategories || [selectedCat];
    }

    const itemsToShow = showAll ? itemsToRender : itemsToRender.slice(0, 6);

    return (
      <>
        {itemsToShow.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{ borderRadius: 12, padding: 8, backgroundColor: 'white', elevation: 4 }}
            onPress={() => { dispatch(filterSlice.actions.filterCategory(item.name)); navigation.navigate('Каталог') }}
          >
            <Image
              source={{ uri: `${localhosturl}/categoryPhotos/${item.icon}` }}
              style={{ width: 136, height: 100, borderRadius: 12 }}
              resizeMode='stretch'
            />
            <View style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'start', justifyContent: 'start', borderRadius: 5 }}>
              <Text style={{ color: '#333333', textAlign: 'left', paddingTop: 6, fontFamily: 'Manrope_500Medium', fontSize: 14, maxWidth: 130 }}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </>
    );
  };


  return (
    <View >

      <View style={{ backgroundColor: 'rgba(0, 148, 255,1);', minHeight: 232, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>

        <View style={{ paddingTop: 20, paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

          <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', paddingTop: 25 }}>
            <TouchableOpacity
              style={{ height: 32, width: 32 }}
            >
              <Image
                source={Logo}
                style={{ width: '100%', height: '100%' }}
                resizeMode="stretch"  // Растягивает изображение до заданных размеров
              />

            </TouchableOpacity>

            <Text style={{ fontFamily: 'Manrope_600SemiBold', color: 'white', fontSize: 24, textAlign: 'left' }}>Arenda Go</Text>

          </View>

          <View style={{ paddingTop: 25 }}>
            <TouchableOpacity
              style={{ height: 32, width: 32 }}
            >
              <Image
                source={main_notifications}
                style={{ width: '100%', height: '100%' }}
                resizeMode="stretch"  // Растягивает изображение до заданных размеров
              />

            </TouchableOpacity>
          </View>

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 31 }}>
          <Text style={{ fontFamily: 'Manrope_600SemiBold', color: 'white', fontSize: 24, textAlign: 'left' }}>Категории</Text>
        </View>

        <FlatList
          style={{ paddingLeft: 24, paddingTop: 24, paddingBottom: 40 }}
          data={categoriesList1}
          renderItem={({ item, index }) => {
            const isLastItem = index === categoriesList1.length - 1;
            const isSelected = selectedCategory === item.name;
            return (
              <TouchableOpacity
                style={{ height: 48, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', marginRight: !isLastItem ? 12 : 40, padding: 8, borderRadius: 12, gap: 6, opacity: isSelected ? 1 : 0.5 }}
                onPress={() => { setSelectedCategory(item.name); setShowAll(false) }}
              >
                <View style={{ height: 32, width: 32, borderRadius: 6 }}>
                  <Image
                    source={{ uri: `${localhosturl}/categoryPhotos/${item.icon}` }}
                    style={{ width: '100%', height: '100%', borderRadius: 6 }}
                    resizeMode="cover"
                  />
                </View>
                <Text style={{ fontFamily: 'Manrope_500Medium', color: '#333333', fontSize: 16 }}>{item.name}</Text>
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item, index) => index}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

      </View>

      <View style={{ paddingLeft: 24, marginTop: -24, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {renderCategories()}
      </View>

      {!showAll && itemsToRender.length > 6 && (
        <View
          style={{
            marginTop: 24,
            marginHorizontal: 24,
            borderRadius: 12,
            elevation: 4,
            height: 36
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderColor: 'rgba(0,148,255,0.9)',
              borderWidth: 1,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              height: 36
            }}
            onPress={() => setShowAll(true)}
          >
            <Text style={{ color: '#333333', fontFamily: 'Manrope_500Medium', fontSize: 16, paddingBottom: 2 }}>
              Показать больше
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View >
  );
};


export default CategoriesInnerComponent