import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableHighlight, Alert } from 'react-native';
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
          <TextInput
            style={styles.input}
            placeholder="Цена новой услуги"
            onChangeText={setNewServicePrice}
            value={newServicePrice}
            keyboardType="numeric"
          />
          <Button title="Добавить услугу" onPress={addNewServiceParam} />
        </>
      )}
      {!showInputs && <Button title="Добавить услугу" onPress={() => setShowInputs(true)} />}
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
    backgroundColor: '#E3DDDD',
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
    height: 50,
    width: '100%',
    color: 'black',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default SelectorServices;
