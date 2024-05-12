import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import CategoriesInnerComponent from '../innerCoponents/MainScreen_categories';
import SearchInnerComponent from '../innerCoponents/Search';

const MainScreen = () => {

  return (
    <ScrollView style={{ backgroundColor: '#f3f2f8' }}>
      <SearchInnerComponent />
      <CategoriesInnerComponent />
    </ScrollView >
  );
};

export default MainScreen;
