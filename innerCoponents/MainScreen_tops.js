import React, { useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, Text, TextInput, View, Button, RefreshControl, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import localhosturl from '../localhoststring';
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

const TopAdsensesInnerComponent = (props) => {

  const screenWidth = Dimensions.get('window').width;



  const renderItem = ({ item }) => (
    <View style={{ display: 'flex', rowGap: 10, marginRight: 10 }}>
      <TouchableOpacity
        style={{ gap: 10, flexDirection: 'row', backgroundColor: 'white', padding: 10, borderRadius: 10, width: screenWidth * 0.7 }}
        onPress={() => { console.log(item[0]) }}>
        <Image
          source={{ uri: `${localhosturl}/categoryPhotos/${item[0].icon}` }}
          style={{ width: 80, height: 70, borderRadius: 5 }}
          resizeMode='stretch'
          imageStyle={{ borderRadius: 5, width: '100%', height: '100%' }}
        >
        </Image>
        <View style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'start', justifyContent: 'start', borderRadius: 5 }}>
          <Text style={{ color: 'black' }}>{item[0]?.name}</Text>
        </View>
      </TouchableOpacity>

    </View>
  );

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
      <Text style={{ fontSize: 16, paddingBottom: 10, fontWeight: 700 }}>Топ объявления</Text>
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

export default TopAdsensesInnerComponent