import React from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, SafeAreaView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

import localhosturl from '../localhoststring';
import { useSelector, useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import { useNavigation } from '@react-navigation/native';
import filterSlice from '../storage/filterSlice';

const screenWidth = Dimensions.get('window').width;

const SearchComponent = ({ filtersVisible }) => {
  console.log(filtersVisible)
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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(0, 148, 255);', marginHorizontal: -16, flex: 1, width: screenWidth, height: '100%', }}>


      <SafeAreaView style={{ flex: 1, paddingHorizontal: 24 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 700, textAlign: 'left' }}>{route.name}</Text>
          <TouchableOpacity
            style={{ backgroundColor: 'rgba(0,140,255,0.3)', height: 28, width: 28 }}
            onPress={() => navigation.navigate('Фильтр')}
          >
            <Image source={{ uri: `${localhosturl}/others/filterIcon1.png` }} style={styles.icon} />
          </TouchableOpacity>
        </View>

        {filtersVisible ?
          <View style={{ flex: 1, paddingTop: 5, alignItems: 'center', flexDirection: 'column' }}>
            {/* <TouchableOpacity
              style={{ flexDirection: 'row', backgroundColor: 'rgba(0,140,255,0.3)', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, gap: 8, alignItems: 'center' }}
              onPress={() => navigation.navigate('Фильтр')}
            >
              <Image source={{ uri: `${localhosturl}/others/filterIcon1.png` }} style={styles.icon} />
            </TouchableOpacity> */}

            <View style={{ flexDirection: 'row', paddingVertical: 5, flexWrap: 'wrap', rowGap: 5, marginHorizontal: 20 }}>
              {
                city ?
                  <View style={{ marginHorizontal: 3, backgroundColor: 'rgba(0, 70, 255,0.2)', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, alignItems: 'center', }}              >
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }} onPress={() => { dispatch(filterSlice.actions.filterCity('')) }}>
                      <Text style={{ color: 'white', fontSize: 8 }}>{city}</Text>
                      <Image source={{ uri: `${localhosturl}/others/closeIcon.png` }} style={{ height: 5, width: 5, marginTop: 2 }} />
                    </TouchableOpacity>
                  </View>
                  : null
              }
              {
                district ?
                  <View style={{ marginHorizontal: 3, backgroundColor: 'rgba(0, 70, 255,0.2)', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, alignItems: 'center', }}              >
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }} onPress={() => { dispatch(filterSlice.actions.filterDistrict('')) }}>
                      <Text style={{ color: 'white', fontSize: 8 }}>{district}</Text>
                      <Image source={{ uri: `${localhosturl}/others/closeIcon.png` }} style={{ height: 5, width: 5, marginTop: 2 }} />
                    </TouchableOpacity>
                  </View>
                  : null
              }
              {
                category ?
                  <View style={{ marginHorizontal: 3, backgroundColor: 'rgba(0, 70, 255,0.2)', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, alignItems: 'center', }}              >
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }} onPress={() => { dispatch(filterSlice.actions.filterCategory('')) }}>
                      <Text style={{ color: 'white', fontSize: 8 }}>{category}</Text>
                      <Image source={{ uri: `${localhosturl}/others/closeIcon.png` }} style={{ height: 5, width: 5, marginTop: 2 }} />
                    </TouchableOpacity>
                  </View>
                  : null
              }
              {
                subcategory ?
                  <View style={{ marginHorizontal: 3, backgroundColor: 'rgba(0, 70, 255,0.2)', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, alignItems: 'center', }}              >
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }} onPress={() => { dispatch(filterSlice.actions.filterSubcategory('')) }}>
                      <Text style={{ color: 'white', fontSize: 8 }}>{subcategory}</Text>
                      <Image source={{ uri: `${localhosturl}/others/closeIcon.png` }} style={{ height: 5, width: 5, marginTop: 2 }} />
                    </TouchableOpacity>
                  </View>
                  : null
              }
              {
                priceFrom ?
                  <View style={{ marginHorizontal: 3, backgroundColor: 'rgba(0, 70, 255,0.2)', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, alignItems: 'center', }}              >
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }} onPress={() => { dispatch(filterSlice.actions.filterPriceFrom('')) }}>
                      <Text style={{ color: 'white', fontSize: 8 }}>От {priceFrom}</Text>
                      <Image source={{ uri: `${localhosturl}/others/closeIcon.png` }} style={{ height: 5, width: 5, marginTop: 2 }} />
                    </TouchableOpacity>
                  </View>
                  : null
              }
              {
                priceTo ?
                  <View style={{ marginHorizontal: 3, backgroundColor: 'rgba(0, 70, 255,0.2)', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, alignItems: 'center', }}              >
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }} onPress={() => { dispatch(filterSlice.actions.filterPriceTo('')) }}>
                      <Text style={{ color: 'white', fontSize: 8 }}>До {priceTo}</Text>
                      <Image source={{ uri: `${localhosturl}/others/closeIcon.png` }} style={{ height: 5, width: 5, marginTop: 2 }} />
                    </TouchableOpacity>
                  </View>
                  : null
              }
              {
                currency ?
                  <View style={{ marginHorizontal: 3, backgroundColor: 'rgba(0, 70, 255,0.2)', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, alignItems: 'center', }}              >
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }} onPress={() => { dispatch(filterSlice.actions.filterCurrency('')) }}>
                      <Text style={{ color: 'white', fontSize: 8 }}>Валюта: {currency}</Text>
                      <Image source={{ uri: `${localhosturl}/others/closeIcon.png` }} style={{ height: 5, width: 5, marginTop: 2 }} />
                    </TouchableOpacity>
                  </View>
                  : null
              }
            </View>

          </View>
          : null
        }
      </SafeAreaView>



    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
    width: '85%',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
});

export default SearchComponent