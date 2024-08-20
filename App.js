import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Manrope_100Thin,
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  Manrope_900Black
} from '@expo-google-fonts/manrope';
import {
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from '@expo-google-fonts/montserrat';
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import LinearGradient from 'react-native-linear-gradient';
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
        tabBarIcon: ({ focused, size }) => {
          let iconPath;

          if (route.name === 'Главная') {
            iconPath = focused
              ? require('./assets/Home.png')
              : require('./assets/Home.png');
          } else if (route.name === 'Каталог') {
            iconPath = focused
              ? require('./assets/Catalog.png')
              : require('./assets/Catalog.png');
          } else if (route.name === 'Чат') {
            iconPath = focused
              ? require('./assets/Chat.png')
              : require('./assets/Chat.png');
          } else if (route.name === 'Профиль') {
            iconPath = focused
              ? require('./assets/Profile.png')
              : require('./assets/Profile.png');
          }

          return (
            <View>
              <Image
                source={iconPath}
                style={{
                  width: size,
                  height: size,
                  opacity: focused ? 1 : 0.5, // Прозрачность 50% если не активен
                }}
              />
            </View>
          );
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
        tabBarLabelStyle: {
          paddingTop: 0,  // Добавляет расстояние между иконкой и текстом
          fontSize: 14,
          fontWeight: 500
        },
        tabBarStyle: {
          backgroundColor: 'rgba(0, 148, 255,1);', // Задний фон
          opacity: 0.9,
          paddingTop: 20,             // padding сверху
          paddingLeft: 20,            // padding слева
          paddingRight: 20,           // padding справа
          paddingBottom: 40,           // padding снизу
          borderTopLeftRadius: 16,    // Радиус слева вверху
          borderTopRightRadius: 16,   // Радиус справа вверху
          height: 110,

        }
      })}
    >
      <Tab.Screen
        name="Главная"
        component={MainScreen}
        options={{
          headerShown: false, // Отключает отображение заголовка
        }}
      />
      <Tab.Screen
        name="Каталог"
        component={AdsensesScreen}
        // }}
        options={{
          headerShown: false, // Отключает отображение заголовка
        }}
      />
      <Tab.Screen
        name="Чат"
        component={AdsensesScreen}
        options={{
          headerTitle: () => <SearchComponent filtersVisible={true} />,
          headerStyle: {
            height: 74,
            backgroundColor: 'white',

          },
        }}
      />
      <Tab.Screen
        name="Профиль"
        component={ProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: 'rgba(0, 148, 255,0.9)', // Change this to your desired color
            borderBottomEndRadius: 24,
            borderBottomStartRadius: 24,
            height: 102
          },
          headerTintColor: '#fff', // Color of the header text and icons
          headerTitleStyle: {
            fontFamily: 'Manrope_600SemiBold',
            fontSize: 24
          },
          headerTitleAlign: 'center'
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {

  const [fontsLoaded] = useFonts({
    Manrope_100Thin,
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
    Manrope_900Black,
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  return (

    <Provider store={store}>

      <StatusBar barStyle="light-content" backgroundColor="rgba(0, 155, 255,1)" />

      <NavigationContainer style={{ backgroundColor: 'white' }}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: 'rgba(0, 148, 255, 0.9)',
              opacity: 0.9,
              height: 100,
              borderBottomLeftRadius: 24,
              borderBottomRightRadius: 24
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'Manrope_600SemiBold',
              fontSize: 22,
              letterSpacing: 1.5
            },
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="Добавить объявление" component={AddAdsenseScreen} />
          <Stack.Screen name="Изменить объявление" component={UpdateAdsenseScreen} />
          <Stack.Screen
            options={{
              headerTitle: () => (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '600', color: 'white', fontFamily: 'Manrope_700Bold' }}>
                    Детали{'\n'}объявления
                  </Text>
                </View>
              ),
              headerStyle: {
                backgroundColor: 'rgba(0, 148, 255, 0.9)', // Цвет фона заголовкаб
                height: 112
              },
              headerTintColor: 'white', // Цвет текста и иконок заголовка
              headerTitleAlign: 'center', // Выравнивание заголовка по центру
            }}
            name="Детали объявления" component={AdDetailsScreen} />
          <Stack.Screen name="Оставить отзыв" component={TestimonialScreen}
          // options={{
          //   headerTitle: () => (
          //     <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '600', color: 'white', fontFamily: 'Manrope_700Bold' }}>
          //       Оставить отзыв
          //     </Text>
          //   ),
          //   headerStyle: {
          //     backgroundColor: 'rgba(0, 148, 255, 1)', // Цвет фона заголовка
          //     height: 132,
          //   },
          //   headerTintColor: 'white', // Цвет текста и иконок заголовка
          //   headerTitleAlign: 'center', // Выравнивание заголовка по центру
          // }}
          />
          <Stack.Screen name="Забронировать" component={OrderScreen} />
          <Stack.Screen name="Мои брони" component={MyOrdersScreen} />
          <Stack.Screen name="Фильтр" component={FiltersScreen} />
        </Stack.Navigator>
      </NavigationContainer>


    </Provider >
  );
}
