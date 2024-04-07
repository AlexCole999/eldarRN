import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Dimensions, FlatList, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AdsensesScreen from './screens/AdsensesScreen'
import { Ionicons } from '@expo/vector-icons';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer >
      <Tab.Navigator>
        <Tab.Screen name="Adsenses" component={AdsensesScreen} />
        <Tab.Screen name="Screen2" component={AdsensesScreen} />
        <Tab.Screen name="Screen3" component={Screen3} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );

}

const Screen2 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Screen 2</Text>
  </View>
);

const Screen3 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Screen 3</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Button title="Open Profile Settings" onPress={() => { }} />
  </View>
);
const styles = StyleSheet.create({
  flatlist: {
    paddingTop: 55,
    paddingLeft: 25,
    paddingRight: 25
  },
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    minWidth: 100,
    color: "white"
  },
  text: {
    color: 'white',
    fontWeight: '800',
    textTransform: 'uppercase'
  },
  image: {
    width: 200,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  horiz: {
    padding: 25,
    display: 'flex'
  },
  text2: {
    flexDirection: 'column',
    rowGap: 15,
    marginLeft: 15
  }
});
