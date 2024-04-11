
import { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

export default Screen3;