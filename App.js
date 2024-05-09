import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image, Dimensions, FlatList, ScrollView, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AdsensesScreen from './screens/AdsensesScreen'
import AddAdsenseScreen from './screens/AddAdsenseScreen'
import ProfileScreen from './screens/ProfileScreen'
import Screen3 from './screens/Screen3';
import AdDetailsScreen from './screens/AdDetailsScreen';
import RNPickerSelect from 'react-native-picker-select';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Детали объявления" component={AdDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={navigationOptions} name="Главная"
        component={MainScreen} />
      <Tab.Screen
        options={navigationOptions}
        name="Каталог"
        component={AdsensesScreen} />
      <Tab.Screen
        options={navigationOptions}
        name="Добавить объявление"
        component={AddAdsenseScreen} />
      <Tab.Screen
        options={navigationOptions}
        name="Мои записи"
        component={Screen3} />
      <Tab.Screen
        options={navigationOptions}
        name="Профиль"
        component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const navigationOptions = {
  headerStyle: {
    backgroundColor: '#f3f2f8',
  },
  headerTintColor: 'black',
  headerTitleStyle: {
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: 0.2,
    fontFamily: 'Roboto'
  },
  headerTitleAlign: "center"
};

