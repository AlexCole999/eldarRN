import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image, Dimensions, FlatList, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AdsensesScreen from './screens/AdsensesScreen'

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
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Open Profile Settings" onPress={() => { }} />
      <Button title="Go to Adsenses" onPress={() => navigation.navigate('Adsenses')} />
      <Button title="Go to Screen 2" onPress={() => navigation.navigate('Screen2')} />
      <Button title="Go to Screen 3" onPress={() => navigation.navigate('Screen3')} />
    </View>
  );

}
