import React, { useEffect, useState } from 'react';
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
import MyOrdersScreen from './screens/RegistersScreen';
import { Provider } from 'react-redux';
import store from './storage/store'
import FiltersScreen from './screens/FiltersScreen';
import BonusesScreen from './screens/BonusesScreen';
import BalanceScreen from './screens/BalanceScreen';
import ActionsScreen from './screens/ActionsScreen';
import NotificationScreen from './screens/NotificationScreen';
import TestScreen from './screens/MapScreen';
import ProfileAdsenses from './innerCoponents/Profile_adsenses';
import Profile_orders_my from './innerCoponents/Registers_my';
import Profile_orders_clients from './innerCoponents/Registers_clients';
import { useTranslation } from 'react-i18next';

import './i18n'
import LanguagesScreen from './screens/LanguagesScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavoritesScreen from './screens/FavoritesScreen';
import RegistersScreen from './screens/RegistersScreen';
import MapScreen from './screens/MapScreen';
import ChatsScreen from './screens/ChatsScreen';
import Registers_clients from './innerCoponents/Registers_clients';
import Registers_my from './innerCoponents/Registers_my';
import Registers_archive from './innerCoponents/Registers_archive';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {

  const { t, i18n } = useTranslation();

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
          paddingLeft: 10,            // padding слева
          paddingRight: 10,           // padding справа
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
          tabBarLabel: t("Главная")
        }}
      />
      <Tab.Screen
        name="Записи"
        component={RegistersScreen}
        // }}
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
          headerTitleAlign: 'center',
          tabBarLabel: t("Записи")
        }}
      />
      <Tab.Screen
        name="Каталог"
        component={AdsensesScreen}
        // }}
        options={{
          headerShown: false, // Отключает отображение заголовка
          tabBarLabel: t("Каталог"), // Динамически меняем текст вкладки в зависимости от перевода
        }}
      />
      <Tab.Screen
        name="Чат" // Используем одно и то же имя, чтобы сохранить идентичность маршрута
        component={ChatsScreen}
        options={{
          headerShown: false, // Отключает отображение заголовка
          tabBarLabel: t("Чат"), // Динамически меняем текст вкладки в зависимости от перевода
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
          tabBarLabel: t("Профиль"),
          headerTitleAlign: 'center'
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [languageInitialized, setLanguageInitialized] = useState(false);
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
    Roboto_500Medium,
  });

  const { t, i18n } = useTranslation(); // Вызываем useTranslation вне условий, чтобы избежать нарушений правил хуков

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language') || 'ru';
        if (storedLanguage) {
          await i18n.changeLanguage(storedLanguage);
        }
      } catch (error) {
        console.error("Ошибка при установке языка из AsyncStorage:", error);
      } finally {
        setLanguageInitialized(true); // Устанавливаем флаг, чтобы показать, что язык инициализирован
      }
    };

    initializeLanguage();
  }, []);

  if (!languageInitialized || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0, 155, 255,1)" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: 'rgba(0, 148, 255, 0.9)',
              height: 100,
              borderBottomLeftRadius: 24,
              borderBottomRightRadius: 24,
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'Manrope_600SemiBold',
              fontSize: 22,
              letterSpacing: 1.5,
            },
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="Добавить объявление" options={{ title: t('Добавить объявление') }} component={AddAdsenseScreen} />
          <Stack.Screen name="Мои объявления" component={ProfileAdsenses} />
          <Stack.Screen name="Изменить объявление" component={UpdateAdsenseScreen} />
          <Stack.Screen name="Мои записи" component={Registers_my} />
          <Stack.Screen name="Записи клиентов" component={Registers_clients} />
          <Stack.Screen name="Архив записей" component={Registers_archive} />
          <Stack.Screen
            options={{
              headerTitle: () => (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 22,
                      fontWeight: '600',
                      color: 'white',
                      fontFamily: 'Manrope_700Bold',
                      letterSpacing: 1,
                    }}
                  >
                    {t("Детали объявления")}
                  </Text>
                </View>
              ),
              headerStyle: {
                backgroundColor: 'rgba(0, 148, 255, 0.9)',
                height: 112,
              },
              headerTintColor: 'white',
              headerTitleAlign: 'center',
              headerShadowVisible: false,
            }}
            name="Детали объявления"
            component={AdDetailsScreen}
          />
          <Stack.Screen name="Оставить отзыв" component={TestimonialScreen} />
          <Stack.Screen options={{ headerTitle: t('Забронировать') }} name="Забронировать" component={OrderScreen} />
          <Stack.Screen options={{ headerTitle: t('Фильтр') }} name="Фильтр" component={FiltersScreen} />
          <Stack.Screen options={{ headerTitle: t('Бонусы') }} name="Бонусы" component={BonusesScreen} />
          <Stack.Screen options={{ headerTitle: t('Баланс') }} name="Баланс" component={BalanceScreen} />
          <Stack.Screen options={{ headerTitle: t('Скидки') }} name="Скидки" component={ActionsScreen} />
          <Stack.Screen options={{ headerTitle: t('Уведомления') }} name="Уведомления" component={NotificationScreen} />
          <Stack.Screen options={{ headerTitle: t('Избранное') }} name="Избранное" component={FavoritesScreen} />
          <Stack.Screen options={{ headerTitle: t('Язык приложения') }} name="Язык приложения" component={LanguagesScreen} />
          <Stack.Screen options={{ headerTitle: t('Карта') }} name="Карта" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}