import React from 'react';
import { Image, View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Manrope_300Light, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, } from '@expo-google-fonts/montserrat';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Roboto_500Medium } from '@expo-google-fonts/roboto';
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
import BonusesScreen from './screens/BonusesScreen';
import BalanceScreen from './screens/BalanceScreen';
import ActionsScreen from './screens/ActionsScreen';
import NotificationScreen from './screens/NotificationScreen';
import TestScreen from './screens/TestScreen';
import ProfileAdsenses from './innerCoponents/Profile_adsenses';
import Profile_orders_my from './innerCoponents/Profile_orders_my';
import Profile_orders_clients from './innerCoponents/Profile_orders_clients';



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
          } else if (route.name === 'Записи') {
            iconPath = focused
              ? require('./assets/orders.png')
              : require('./assets/orders.png');
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
          fontSize: 10,
          fontFamily: 'Manrope_600SemiBold',
          letterSpacing: 0.8
        },
        tabBarStyle: {
          backgroundColor: 'rgba(0, 148, 255,1);', // Задний фон
          opacity: 0.9,
          paddingTop: 8,             // padding сверху
          paddingLeft: 20,            // padding слева
          paddingRight: 20,           // padding справа
          paddingBottom: 8,           // padding снизу
          borderTopLeftRadius: 16,    // Радиус слева вверху
          borderTopRightRadius: 16,   // Радиус справа вверху
          height: 62,

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
        name="Записи"
        component={AdsensesScreen}
        // }}
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
        component={TestScreen}
        options={{
          headerShown: false, // Отключает отображение заголовка
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
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Inter_400Regular,
    Inter_700Bold,
    Roboto_500Medium
  });

  if (!fontsLoaded) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (

    <Provider store={store}>

      <StatusBar barStyle="light-content" backgroundColor="rgba(0, 155, 255,1)" />

      <NavigationContainer style={{ backgroundColor: 'white' }}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: 'rgba(0, 148, 255, 0.9)',
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
          <Stack.Screen name="Мои объявления" component={ProfileAdsenses} />
          <Stack.Screen name="Изменить объявление" component={UpdateAdsenseScreen} />
          <Stack.Screen name="Моя бронь" component={Profile_orders_my} />
          <Stack.Screen name="Бронь клиентов" component={Profile_orders_clients} />
          <Stack.Screen
            options={{
              headerTitle: () => (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '600', color: 'white', fontFamily: 'Manrope_700Bold', letterSpacing: 1 }}>
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
              headerShadowVisible: false
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
          <Stack.Screen name="Бронь" component={MyOrdersScreen} />
          <Stack.Screen name="Фильтр" component={FiltersScreen} />
          <Stack.Screen name="Бонусы" component={BonusesScreen} />
          <Stack.Screen name="Баланс" component={BalanceScreen} />
          <Stack.Screen name="Скидки" component={ActionsScreen} />
          <Stack.Screen name="Уведомления" component={NotificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>


    </Provider >
  );
}
