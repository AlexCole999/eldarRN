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
      <Tab.Screen name="Главная" component={AdsensesScreen} />
      <Tab.Screen name="Добавить объявление" component={AddAdsenseScreen} />
      <Tab.Screen name="Мои записи" component={Screen3} />
      <Tab.Screen name="Профиль" component={ProfileScreen} />
    </Tab.Navigator>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

