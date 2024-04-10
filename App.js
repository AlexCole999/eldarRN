import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image, Dimensions, FlatList, ScrollView, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AdsensesScreen from './screens/AdsensesScreen'
import AddAdsenseScreen from './screens/AddAdsenseScreen'
import RNPickerSelect from 'react-native-picker-select';


const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer >
      <Tab.Navigator>
        <Tab.Screen name="Главная" component={AdsensesScreen} />
        <Tab.Screen name="Каталог" component={AddAdsenseScreen} />
        <Tab.Screen name="Мои записи" component={Screen3} />
        <Tab.Screen name="Профиль" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );

}

const AddAdsense = () => {
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [workhours, setWorkhours] = useState('');
  const [services, setServices] = useState('');

  const submitAdsense = async () => {
    try {
      await axios.post('http://192.168.1.102:3000/adsenses', {
        category, city, phone, workhours, services
      });
      alert('dome')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <RNPickerSelect
        onValueChange={(value) => setCategory(value)}
        items={[
          { label: 'Фитнес', value: 'Фитнес' },
          { label: 'Бани, сауны', value: 'Бани, сауны' },
          { label: 'Пирсинг', value: 'Пирсинг' },
          { label: 'Языковая школа', value: 'Языковая школа' },
          { label: 'Коворкинг', value: 'Коворкинг' },
          { label: 'Массаж', value: 'Массаж' },
          { label: 'Психология', value: 'Психология' },
          { label: 'Парикмахерские услуги', value: 'Парикмахерские услуги' },
          { label: 'Ногтевой сервис', value: 'Ногтевой сервис' },
          { label: 'Брови', value: 'Брови' },
          { label: 'Татуаж, тату', value: 'Татуаж, тату' },
          { label: 'СПА', value: 'СПА' },
          { label: 'Подология', value: 'Подология' },
          { label: 'Депиляция, эпиляция', value: 'Депиляция, эпиляция' },
          { label: 'Репетитор', value: 'Репетитор' },
          { label: 'Ресницы', value: 'Ресницы' },
          { label: 'Курсы', value: 'Курсы' },
          { label: 'Прочие', value: 'Прочие' },
          { label: 'Аренда', value: 'Аренда' },
          { label: 'Косметология, уход', value: 'Косметология, уход' },
          { label: 'Стоматология', value: 'Стоматология' },
          { label: 'Ветеринария', value: 'Ветеринария' },
          { label: 'Визаж', value: 'Визаж' },
          { label: 'Груминг', value: 'Груминг' },
          { label: 'Усы, борода', value: 'Усы, борода' },
          { label: 'Барбершоп', value: 'Барбершоп' },
        ]}
        value={category}
        style={{ inputIOS: { height: 50, width: 150, color: 'black' }, inputAndroid: { height: 50, width: 150, color: 'black' } }}
      />
      <TextInput placeholder="City" onChangeText={setCity} />
      <TextInput placeholder="Phone" onChangeText={setPhone} />
      <TextInput placeholder="Workhours" onChangeText={setWorkhours} />
      <TextInput placeholder="Services" onChangeText={setServices} />
      <Button title="Add Adsense" onPress={submitAdsense} />
    </View>
  );
};

const Screen3 = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleAddUser = async () => {
    if (!name || !email) {
      alert('Пожалуйста, введите имя и email пользователя');
      return;
    }
    try {
      await axios.post('http://192.168.1.102:3000/users', { name, email });
      alert('Пользователь успешно добавлен');
      setName('');
      setEmail('');
    } catch (error) {
      alert('Ошибка при добавлении пользователя');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добавить пользователя</Text>
      <TextInput
        placeholder="Имя"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddUser}>
        <Text style={styles.buttonText}>Добавить</Text>
      </TouchableOpacity>
    </View>
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

const ProfileScreen = () => {
  const handleClearDatabase = async () => {
    Alert.alert(
      'Подтверждение',
      'Вы уверены, что хотите очистить базу данных?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Очистить',
          onPress: async () => {
            try {
              await axios.delete('http://192.168.1.102:3000/users');
              alert('База данных успешно очищена');
            } catch (error) {
              alert('Ошибка при очистке базы данных');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity style={styles.button} onPress={handleClearDatabase}>
        <Text style={styles.buttonText}>Очистить базу данных</Text>
      </TouchableOpacity>
    </View>
  );
};
