import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import CategoriesInnerComponent from '../innerCoponents/MainScreen_categories';

const MainScreen = () => {

  return (
    <ScrollView style={{ backgroundColor: '#f3f2f8' }}>
      <CategoriesInnerComponent />
    </ScrollView >
  );
};

export default MainScreen;
