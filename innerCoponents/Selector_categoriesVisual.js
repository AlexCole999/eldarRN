import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import localhosturl from '../localhoststring';

const SelectorCategoryVisual = ({ setCategory }) => {
  const categories = [
    {
      name: 'Косметология',
      icon: 'cosmetologyIcon.png',
      subcategories: [
        { name: 'Эстетическая косметология', icon: 'subcategory.png' },
        { name: 'Аппаратная косметология', icon: 'subcategory.png' },
        { name: 'Инъекционная косметология', icon: 'subcategory.png' },
        { name: 'Депиляция, шугаринг', icon: 'subcategory.png' },
        { name: 'Перманентный макияж', icon: 'subcategory.png' }
      ]
    },
    {
      name: 'Лашмейкеры и Бровисты',
      icon: 'lashmaker.png'
    },
    {
      name: 'Стилисты',
      icon: 'stylists.png',
      subcategories: [
        { name: 'Стилисты по волосам', icon: 'stylistHair.png' },
        { name: 'Визаж', icon: 'visage.png' },
        { name: 'Барбершоп', icon: 'barber1.png' }
      ]
    },
    {
      name: 'Ногтевой сервис',
      icon: 'mails.png'
    },
    {
      name: 'Массаж и Спа',
      icon: 'massagaSpa.png'
    },
    {
      name: 'Тату и Пирсинг',
      icon: 'tatooPiercing.png'
    },
    {
      name: 'Коворкинг и Конферент залы',
      icon: 'coworking1.png'
    },
    {
      name: 'Фотостудия',
      icon: 'photostudy.png'
    },
    {
      name: 'Рестораны и Банкетные Залы',
      icon: 'restraunts.png'
    },
    {
      name: 'Прочее',
      icon: 'other.png'
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryPress = (category) => {
    if (category.subcategories) {
      setSelectedCategory(category);
    } else {
      setCategory(category.name);
    }
  };

  const handleSubcategoryPress = (subcategory) => {
    setCategory(subcategory.name);
    setSelectedCategory(null);
  };

  const renderCategory = (category, index) => (
    <View key={index} style={{ marginTop: 20 }}>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          padding: 12,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10
        }}
        onPress={() => handleCategoryPress(category)}
      >
        <Image
          source={{ uri: `${localhosturl}/categoryIcons/${category.icon || 'default.png'}` }}
          style={{ width: 40, height: 40 }}
        />
        <View style={{ maxWidth: '80%' }}>
          <Text>{category.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderSubcategory = (subcategory, index) => (
    <View key={index} style={{ marginTop: 20 }}>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          padding: 12,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10
        }}
        onPress={() => handleSubcategoryPress(subcategory)}
      >
        <Image
          source={{ uri: `${localhosturl}/categoryIcons/${subcategory.icon}` }}
          style={{ width: 40, height: 40 }}
        />
        <View style={{ maxWidth: '80%' }}>
          <Text>{subcategory.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={{ paddingHorizontal: 20, backgroundColor: '#f3f2f8' }}>
      <Text style={{ textAlign: 'center', paddingTop: 20, fontSize: 20, fontWeight: '800' }}>
        Выберите специализацию
      </Text>
      <View>
        <View style={{ marginVertical: 20 }}>
          {selectedCategory ? (
            <>
              {selectedCategory.subcategories.map((subcategory, index) => renderSubcategory(subcategory, index))}
              <TouchableOpacity style={{ marginTop: 20, backgroundColor: 'rgb(0, 191, 255)', padding: 10, borderRadius: 10, backgroundColor: 'rgb(0, 191, 255)', paddingVertical: 10, paddingHorizontal: 20, }}
                onPress={() => setSelectedCategory(null)}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', }}>
                  Назад
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            categories.map((category, index) => renderCategory(category, index))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default SelectorCategoryVisual;
