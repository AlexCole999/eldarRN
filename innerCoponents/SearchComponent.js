import React from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, SafeAreaView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

import localhosturl from '../localhoststring';
import { useSelector, useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import { useNavigation } from '@react-navigation/native';
import filterSlice from '../storage/filterSlice';

import Filter from '../assets/Filter.png'
import Filter_active from '../assets/Filter_active.png'
import Filter_itemclose from '../assets/Filter_itemclose.png'

const screenWidth = Dimensions.get('window').width;

const SearchComponent = () => {

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const city = useSelector(state => state.filters.city);
  const district = useSelector(state => state.filters.district);
  const category = useSelector(state => state.filters.category);
  const subcategory = useSelector(state => state.filters.subcategory);
  const priceFrom = useSelector(state => state.filters.priceFrom);
  const priceTo = useSelector(state => state.filters.priceTo);
  const currency = useSelector(state => state.filters.currency);

  const route = useRoute();
  return (


    <View style={{ backgroundColor: 'rgba(0, 148, 255,1);', minHeight: 97, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 24 }}>
        <Text style={{ fontFamily: 'Manrope_600SemiBold', color: 'white', fontSize: 24, textAlign: 'left' }}>{route.name}</Text>
        <TouchableOpacity
          style={{ backgroundColor: 'rgba(0,140,255,0.3)', height: 27, width: 28 }}
          onPress={() => navigation.navigate('Фильтр')}
        >
          <Image
            source={city || district || category || subcategory || priceFrom || priceTo || currency ? Filter_active : Filter}
            style={{ width: '100%', height: '100%' }}
            resizeMode="stretch"  // Растягивает изображение до заданных размеров
          />
        </TouchableOpacity>
      </View>

      {
        <View style={{ flex: 1, paddingTop: 5, alignItems: 'start', flexDirection: 'column', paddingBottom: 20 }}>
          {/* <TouchableOpacity
              style={{ flexDirection: 'row', backgroundColor: 'rgba(0,140,255,0.3)', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, gap: 8, alignItems: 'center' }}
              onPress={() => navigation.navigate('Фильтр')}
            >
              <Image source={{ uri: `${localhosturl}/others/filterIcon1.png` }} style={styles.icon} />
            </TouchableOpacity> */}

          <View style={{ flexDirection: 'row', paddingVertical: 5, flexWrap: 'wrap', rowGap: 5, marginHorizontal: 20, paddingBottom: city || district || category || subcategory || priceFrom || priceTo || currency ? 24 : 0 }}>
            {
              city ?
                <View style={{ marginHorizontal: 3, backgroundColor: '#0080EB', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, alignItems: 'center' }}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }} onPress={() => { dispatch(filterSlice.actions.filterCity('')) }}>
                    <Text style={{ color: 'white', fontSize: 10 }}>{city}</Text>
                    <Image source={Filter_itemclose} style={{ height: 9, width: 8 }} resizeMode="stretch" />
                  </TouchableOpacity>
                </View>
                : null
            }
            {
              district ?
                <View style={{ marginHorizontal: 3, backgroundColor: '#0080EB', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, alignItems: 'center' }}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }} onPress={() => { dispatch(filterSlice.actions.filterDistrict('')) }}>
                    <Text style={{ color: 'white', fontSize: 10 }}>{district}</Text>
                    <Image source={Filter_itemclose} style={{ height: 9, width: 8 }} resizeMode="stretch" />
                  </TouchableOpacity>
                </View>
                : null
            }
            {
              category ?
                <View style={{ marginHorizontal: 3, backgroundColor: '#0080EB', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, alignItems: 'center' }}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }} onPress={() => { dispatch(filterSlice.actions.filterCategory('')) }}>
                    <Text style={{ color: 'white', fontSize: 10 }}>{category}</Text>
                    <Image source={Filter_itemclose} style={{ height: 9, width: 8 }} resizeMode="stretch" />
                  </TouchableOpacity>
                </View>
                : null
            }
            {
              subcategory ?
                <View style={{ marginHorizontal: 3, backgroundColor: '#0080EB', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, alignItems: 'center' }}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }} onPress={() => { dispatch(filterSlice.actions.filterSubcategory('')) }}>
                    <Text style={{ color: 'white', fontSize: 10 }}>{subcategory}</Text>
                    <Image source={Filter_itemclose} style={{ height: 9, width: 8 }} resizeMode="stretch" />
                  </TouchableOpacity>
                </View>
                : null
            }
            {
              priceFrom ?
                <View style={{ marginHorizontal: 3, backgroundColor: '#0080EB', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, alignItems: 'center' }}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }} onPress={() => { dispatch(filterSlice.actions.filterPriceFrom('')) }}>
                    <Text style={{ color: 'white', fontSize: 10 }}>От {priceFrom}</Text>
                    <Image source={Filter_itemclose} style={{ height: 9, width: 8 }} resizeMode="stretch" />
                  </TouchableOpacity>
                </View>
                : null
            }
            {
              priceTo ?
                <View style={{ marginHorizontal: 3, backgroundColor: '#0080EB', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, alignItems: 'center' }}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }} onPress={() => { dispatch(filterSlice.actions.filterPriceTo('')) }}>
                    <Text style={{ color: 'white', fontSize: 10 }}>До {priceTo}</Text>
                    <Image source={Filter_itemclose} style={{ height: 9, width: 8 }} resizeMode="stretch" />
                  </TouchableOpacity>
                </View>
                : null
            }
            {
              currency ?
                <View style={{ marginHorizontal: 3, backgroundColor: '#0080EB', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, alignItems: 'center' }}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }} onPress={() => { dispatch(filterSlice.actions.filterCurrency('')) }}>
                    <Text style={{ color: 'white', fontSize: 10 }}>Валюта: {currency}</Text>
                    <Image source={Filter_itemclose} style={{ height: 9, width: 8 }} resizeMode="stretch" />
                  </TouchableOpacity>
                </View>
                : null
            }
          </View>

        </View>

      }
      {/* <View style={{ width: screenWidth, height: 24, backgroundColor: 'rgb(0, 148, 255, 0.9)', borderBottomLeftRadius: 22, borderBottomRightRadius: 22, top: 73, left: 0, zIndex: -1, elevation: 0 }} /> */}
    </View>


  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    width: '85%',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
});

export default SearchComponent