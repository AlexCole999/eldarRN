import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdsensesScreen from './screens/AdsensesScreen';
import AddAdsenseScreen from './screens/AddAdsenseScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdDetailsScreen from './screens/AdDetailsScreen';
import MainScreen from './screens/MainScreen';
import SearchComponent from './innerCoponents/SearchComponent';
import TestimonialScreen from './screens/TestimonialScreen';
import OrderScreen from './screens/OrderScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import UpdateAdsenseScreen from './screens/UpdateAdsenseScreen';
import MyOrdersScreen from './screens/MyOrdersScreen';

import { Provider } from 'react-redux';
import store from './storage/store'
import FiltersScreen from './screens/FiltersScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Главная') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Каталог') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Профиль') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'TEST') {
            iconName = focused ? 'flask' : 'flask-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'rgb(0, 191, 255)',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Главная"
        component={MainScreen}
        options={{
          headerTitle: () => <SearchComponent filtersVisible={false} />,
          headerStyle: {
            height: 80,
            backgroundColor: '#f3f2f8',
          },
        }}
      />
      <Tab.Screen
        name="Каталог"
        component={AdsensesScreen}
        options={{
          headerTitle: () => <SearchComponent filtersVisible={true} />,
          headerStyle: {
            height: 170,
            backgroundColor: '#f3f2f8',
          },
        }}
      />
      <Tab.Screen
        name="Профиль"
        component={ProfileScreen}
        options={navigationOptions}
      />
    </Tab.Navigator>
  );
};

const navigationOptions = {
  headerStyle: {
    backgroundColor: '#f3f2f8',
  },
  headerTintColor: 'black',
  headerTitleStyle: {
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.2,
    fontFamily: 'Roboto',
  },
  headerTitleAlign: 'center',
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="Добавить объявление" component={AddAdsenseScreen} />
          <Stack.Screen name="Изменить объявление" component={UpdateAdsenseScreen} />
          <Stack.Screen name="Детали объявления" component={AdDetailsScreen} />
          <Stack.Screen name="Оставить отзыв" component={TestimonialScreen} />
          <Stack.Screen name="Забронировать" component={OrderScreen} />
          <Stack.Screen name="Мои брони" component={MyOrdersScreen} />
          <Stack.Screen name="Фильтр" component={FiltersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
