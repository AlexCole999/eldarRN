import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import CategoriesInnerComponent from '../innerCoponents/MainScreen_categories';
import SearchInnerComponent from '../innerCoponents/Search';

const MainScreen = () => {

  return (
    <ScrollView>
      <SearchInnerComponent />
      <CategoriesInnerComponent />
    </ScrollView >
  );
};

export default MainScreen;
