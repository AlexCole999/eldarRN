import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const SelectorServices = ({ servicesList, setServicesList }) => {
  const [showInputs, setShowInputs] = useState(false);
  const [newServiceHours, setNewServiceHours] = useState(null);
  const [newServicePrice, setNewServicePrice] = useState('');

  const addNewServiceParam = () => {
    if (newServiceHours && newServicePrice) {
      const newServicesList = [...servicesList, { hours: newServiceHours, price: newServicePrice }];
      setServicesList(newServicesList);
      setNewServiceHours(null);
      setNewServicePrice('');
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
              <Text style={styles.serviceTextRight}>Цена: {param.price}</Text>
            </View>
          </TouchableHighlight>
        ))
      }
      {showInputs && (
        <>
          <View style={{
            marginBottom: 10, overflow: 'hidden', borderRadius: 10
          }}>
            <RNPickerSelect
              onValueChange={(value) => setNewServiceHours(value)}
              placeholder={{ label: 'Часы новой услуги', value: null }}
              items={[
                { label: '1 час', value: 1 },
                { label: '2 часа', value: 2 },
                { label: '3 часа', value: 3 },
                { label: '4 часа', value: 4 },
                { label: '5 часов', value: 5 },
                { label: '6 часов', value: 6 },
                { label: '7 часов', value: 7 },
                { label: '8 часов', value: 8 },
                { label: '9 часов', value: 9 },
                { label: '10 часов', value: 10 },
                { label: '1 день', value: 24 },
              ]}
              value={newServiceHours}
              style={pickerSelectStyles}
            />
          </View>
          <TextInput
            style={{ borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 10, marginBottom: 10, fontSize: 16 }}
            placeholder="Цена новой услуги"
            onChangeText={setNewServicePrice}
            value={newServicePrice}
            keyboardType="numeric"
          />
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
  inputIOS: {
    height: 50,
    width: '100%',
    color: 'black',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  inputAndroid: {
    color: 'black',
    backgroundColor: 'white'
  },
});

export default SelectorServices;
