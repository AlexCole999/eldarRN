import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import CategoriesInnerComponent from '../innerCoponents/MainScreen_categories';
import TopAdsensesInnerComponent from '../innerCoponents/MainScreen_tops';
import NewAdsensesInnerComponent from './../innerCoponents/MainScreen_news';
import PhotosAdsensesInnerComponent from './../innerCoponents/MainScreen_photos';

const MainScreen = () => {

  return (
    <ScrollView style={{ backgroundColor: '#f3f2f8' }}>
      <CategoriesInnerComponent />
      <TopAdsensesInnerComponent />
      <PhotosAdsensesInnerComponent />
      <NewAdsensesInnerComponent />
    </ScrollView >
  );
};

export default MainScreen;
