
import { StyleSheet, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AdsensesScreen from './screens/AdsensesScreen'
import AddAdsenseScreen from './screens/AddAdsenseScreen'
import ProfileScreen from './screens/ProfileScreen'
import Screen3 from './innerCoponents/Selector_categoriesVisual';
import AdDetailsScreen from './screens/AdDetailsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import SearchComponent from './innerCoponents/SearchComponent';
import TestScreen from './screens/TestScreen';
import TestimonialScreen from './screens/TestimonialScreen';
import OrderScreen from './screens/OrderScreen';



const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Детали объявления" component={AdDetailsScreen} />
        <Stack.Screen name="Оставить отзыв" component={TestimonialScreen} />
        <Stack.Screen name="Забронировать" component={OrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerTitle: () => <SearchComponent />,
          headerStyle: {
            height: 140, // увеличиваем высоту шапки до 100 пикселейб
            backgroundColor: '#f3f2f8'
          },
        }} name="Главная"
        component={MainScreen} />
      <Tab.Screen
        options={{
          headerTitle: () => <SearchComponent />,
          headerStyle: {
            height: 140, // увеличиваем высоту шапки до 100 пикселейб
            backgroundColor: '#f3f2f8'
          },
        }}
        name="Каталог"
        component={AdsensesScreen} />
      <Tab.Screen
        options={navigationOptions}
        name="Добавить объявление"
        component={AddAdsenseScreen} />
      <Tab.Screen
        options={navigationOptions}
        name="Профиль"
        component={ProfileScreen} />
      <Tab.Screen
        options={navigationOptions}
        name="TEST"
        component={TestScreen} />
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

