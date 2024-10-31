import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { UrlTile, Marker, Callout } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Импорт AsyncStorage

import unselected_icon from '../assets/unselected_icon.png';
import selected_icon from '../assets/selected_icon.png'; // Добавляем иконку для выбранного языка

const LanguagesScreen = () => {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(null);

  // Загружаем язык из хранилища при первом рендере
  useEffect(() => {
    const loadLanguage = async () => {
      const lang = await AsyncStorage.getItem('language');
      if (lang) {
        i18n.changeLanguage(lang);
        setSelectedLang(lang);
      }
    };
    loadLanguage();
  }, []);

  // Сохраняем язык в хранилище и изменяем состояние
  const changeLanguage = async (lang) => {
    await AsyncStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
    setSelectedLang(lang);
  };

  return (
    <View style={{ flexGrow: 1, backgroundColor: '#F5FFFF' }}>
      <View style={{ paddingTop: 24, paddingHorizontal: 24, gap: 12 }}>

        <TouchableOpacity style={styles.item} onPress={() => changeLanguage('ru')} >
          <View>
            <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 14 }}>Русский</Text>
            <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 10 }}>Русский</Text>
          </View>
          <Image source={selectedLang === 'ru' ? selected_icon : unselected_icon} style={styles.image} />

        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => changeLanguage('en')} >
          <View>
            <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 14 }}>English</Text>
            <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 10 }}>Английский</Text>
          </View>
          <Image source={selectedLang === 'en' ? selected_icon : unselected_icon} style={styles.image} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => changeLanguage('uz')} >
          <View>
            <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 14 }}>O'zbek</Text>
            <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 10 }}>Узбекский</Text>
          </View>
          <Image source={selectedLang === 'uz' ? selected_icon : unselected_icon} style={styles.image} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => changeLanguage('ge')} >
          <View>
            <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 14 }}>ქართული</Text>
            <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 10 }}>Грузинский</Text>
          </View>
          <Image source={selectedLang === 'ge' ? selected_icon : unselected_icon} style={styles.image} />
        </TouchableOpacity>

      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    paddingLeft: 8,
    width: '100%',
    height: 44,
    borderRadius: 12,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 8
  }
});

export default LanguagesScreen;
