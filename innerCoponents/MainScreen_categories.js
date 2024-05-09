import React, { useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, Text, TextInput, View, Button, RefreshControl, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import localhosturl from './../localhoststring';
import { ScrollView } from 'react-native-gesture-handler';

const categoriesList = [
  [
    {
      name: 'Фитнес',
      icon: 'fitness.jpg'
    },
    {
      name: 'Бани, сауны',
      icon: 'baths.jpg'
    }
  ],
  [
    {
      name: 'Пирсинг',
      icon: 'piercing.jpg'
    },
    {
      name: 'Языковая школа',
      icon: 'language-school.jpg'
    }
  ],
  [
    {
      name: 'Коворкинг',
      icon: 'coworking.jpg'
    },
    {
      name: 'Массаж',
      icon: 'massage.jpg'
    }
  ],
  [
    {
      name: 'Психология',
      icon: 'psychology.jpg'
    },
    {
      name: 'Татуаж, тату',
      icon: 'tattoo.jpg'
    }
  ],
  [
    {
      name: 'СПА',
      icon: 'spa.jpg'
    },
    {
      name: 'Подология',
      icon: 'podiatry.jpg'
    }
  ],
  [
    {
      name: 'Депиляция, эпиляция',
      icon: 'waxing.jpg'
    },
    {
      name: 'Репетитор',
      icon: 'tutoring.jpg'
    }
  ],
  [
    {
      name: 'Курсы',
      icon: 'courses.jpg'
    },
    {
      name: 'Косметология, уход',
      icon: 'cosmetology.jpg'
    }
  ],
  [
    {
      name: 'Брови',
      icon: 'brows.jpg'
    },
    {
      name: 'Ресницы',
      icon: 'eyelashes.jpg'
    }
  ],
  [
    {
      name: 'Ногтевой сервис',
      icon: 'nails.jpg'
    },
    {
      name: 'Стоматология',
      icon: 'dentistry.jpg'
    }
  ],
  [
    {
      name: 'Ветеринария',
      icon: 'veterinary.jpg'
    },
    {
      name: 'Визаж',
      icon: 'makeup.jpg'
    }
  ],
  [
    {
      name: 'Груминг',
      icon: 'grooming.jpg'
    },
    {
      name: 'Парикмахерские услуги',
      icon: 'haircut.jpg'
    }
  ],
  [
    {
      name: 'Усы, борода',
      icon: 'beard.jpg'
    },
    {
      name: 'Барбершоп',
      icon: 'barbershop.jpg'
    }
  ],
  [
    {
      name: 'Прочие',
      icon: 'other.jpg'
    }
  ]
];

const CategoriesInnerComponent = () => {

  const screenWidth = Dimensions.get('window').width;

  const renderItem = ({ item }) => (
    <View style={{ display: 'flex', rowGap: 10, marginRight: 10 }}>
      <TouchableOpacity onPress={() => { console.log(item[0]) }}>
        <ImageBackground
          source={{ uri: `${localhosturl}/categoryPhotos/${item[0].icon}` }}
          style={{ width: screenWidth * 0.45, height: 100, borderRadius: 5 }}
          resizeMode='stretch'
          imageStyle={{ borderRadius: 5, width: '100%', height: '100%' }}
        >
          <View style={{ backgroundColor: 'rgba(0,0,0, 0.30)', display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>{item[0]?.name}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      {item[1]?.name
        ? <TouchableOpacity onPress={() => { console.log(item[1]) }}>
          <ImageBackground
            source={{ uri: `${localhosturl}/categoryPhotos/${item[1]?.icon}` }}
            style={{ width: screenWidth * 0.45, height: 100, borderRadius: 5 }}
            resizeMode='stretch'
            imageStyle={{ borderRadius: 5, width: '100%', height: '100%' }}
          >
            <View style={{ backgroundColor: 'rgba(0,0,0, 0.30)', display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
              <Text style={{ color: 'white' }}>{item[1]?.name}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        : null}

    </View>
  );

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
      <Text style={{ paddingBottom: 10, fontWeight: 700 }}>Категории</Text>
      <FlatList
        data={categoriesList}
        renderItem={renderItem}
        keyExtractor={(item) => item[0].name}
        horizontal
      />
    </View>
  );
};

export default CategoriesInnerComponent