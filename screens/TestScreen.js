import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import SearchComponent from './../innerCoponents/SearchComponent';

const TestScreen = () => {

  const screenHeight = Dimensions.get('window').height;

  return (
    <ScrollView contentContainerStyle={{ minHeight: screenHeight }}>
      <Text>123</Text>
      <SearchComponent />
    </ScrollView>
  );
};


export default TestScreen;
