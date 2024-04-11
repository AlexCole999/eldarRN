import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image, Dimensions, FlatList, ScrollView, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

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

export default ProfileScreen;