import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectorServices = ({ servicesList, setServicesList }) => {
  const [showInputs, setShowInputs] = useState(false);
  const [newServiceHours, setNewServiceHours] = useState(null);
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceFiat, setNewServiceFiat] = useState('');

  const addNewServiceParam = () => {
    if (newServiceHours && newServicePrice && newServiceFiat) {
      const newServicesList = [...servicesList, { hours: newServiceHours, price: newServicePrice, fiat: newServiceFiat }];
      setServicesList(newServicesList);
      setNewServiceHours(null);
      setNewServicePrice('');
      setNewServiceFiat('');
      setShowInputs(false);
    }
  };

  const removeService = (indexToRemove) => {
    Alert.alert(
      'Удалить услугу',
      'Вы уверены, что хотите удалить эту услугу?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => {
            const updatedServicesList = servicesList.filter((_, index) => index !== indexToRemove);
            setServicesList(updatedServicesList);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ width: '100%' }}>
      {
        servicesList.map((param, index) => (
          <TouchableHighlight
            key={index}
            style={styles.serviceContainer}
            onPress={() => removeService(index)}
            underlayColor="#DDD"
          >
            <View style={styles.serviceParam}>
              <Text style={styles.serviceTextLeft}>Часов: {param.hours}</Text>
              <Text style={styles.serviceTextRight}>Цена: {param.price} {param.fiat}</Text>
            </View>
          </TouchableHighlight>
        ))
      }
      {showInputs && (
        <>
          <View style={{
            marginBottom: 10, overflow: 'hidden', borderRadius: 10
          }}>
            <Picker
              selectedValue={newServiceHours}
              onValueChange={(value) => setNewServiceHours(value)}
              style={pickerSelectStyles.picker}
            >
              <Picker.Item label="Часы новой услуги" value={null} />
              <Picker.Item label="1 час" value={1} />
              <Picker.Item label="2 часа" value={2} />
              <Picker.Item label="3 часа" value={3} />
              <Picker.Item label="4 часа" value={4} />
              <Picker.Item label="5 часов" value={5} />
              <Picker.Item label="6 часов" value={6} />
              <Picker.Item label="7 часов" value={7} />
              <Picker.Item label="8 часов" value={8} />
              <Picker.Item label="9 часов" value={9} />
              <Picker.Item label="10 часов" value={10} />
              <Picker.Item label="1 день" value={24} />
            </Picker>
          </View>
          <TextInput
            style={{ borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 10, marginBottom: 10, fontSize: 16 }}
            placeholder="Цена новой услуги"
            onChangeText={setNewServicePrice}
            value={newServicePrice}
            keyboardType="numeric"
          />
          <View style={{
            marginBottom: 10, overflow: 'hidden', borderRadius: 10
          }}>
            <Picker
              selectedValue={newServiceFiat}
              onValueChange={(value) => setNewServiceFiat(value)}
              style={pickerSelectStyles.picker}
            >
              <Picker.Item label="Валюта" value={null} />
              <Picker.Item label="UZS" value={"UZS"} />
              <Picker.Item label="USD" value={"USD"} />
            </Picker>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgb(0, 191, 255)', // светло-голубой фон
              padding: 10, // отступы
              borderRadius: 10, // радиус закругления углов
              alignItems: 'center', // центрирование по горизонтали
            }}
            onPress={addNewServiceParam}
          >
            <Text style={{ color: 'white', textTransform: 'uppercase' }}>Завершить добавление услуги</Text>
          </TouchableOpacity>
        </>
      )}
      {!showInputs && (
        <TouchableOpacity
          style={{
            backgroundColor: 'rgb(0, 191, 255)', // светло-голубой фон
            padding: 10, // отступы
            borderRadius: 10, // радиус закругления углов
            alignItems: 'center', // центрирование по горизонтали
          }}
          onPress={() => setShowInputs(true)}
        >
          <Text style={{ color: 'white', textTransform: 'uppercase' }}>Новая услуга +</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  serviceContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    marginBottom: 10,
  },
  serviceParam: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8
  },
  serviceTextLeft: {
    flex: 1,
    textAlign: 'left',
  },
  serviceTextRight: {
    flex: 1,
    textAlign: 'right',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  picker: {
    height: 50,
    width: '100%',
    color: 'black',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: 'white',
  },
});

export default SelectorServices;
