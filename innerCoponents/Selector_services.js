import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const SelectorServices = ({ newServiceHours, setNewServiceHours, newServicePrice, setNewServicePrice, servicesList, setServicesList }) => {

  const addNewServiceParam = () => {
    if (newServiceHours && newServicePrice) {
      const newServicesList = [...servicesList, { hours: newServiceHours, price: newServicePrice }];
      setServicesList(newServicesList);
      setNewServiceHours(null);
      setNewServicePrice('');
    }
  };

  return (
    <View style={{ width: '100%' }}>
      {
        servicesList.map((param, index) => (
          <View key={index} style={styles.serviceParam}>
            <Text>Часов: {param.hours} Цена: {param.price}</Text>
          </View>
        ))
      }
      <RNPickerSelect
        onValueChange={(value) => setNewServiceHours(value)}
        placeholder={{ label: 'Выберите количество часов', value: null }}
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
        placeholder="Введите цену"
        onChangeText={setNewServicePrice}
        value={newServicePrice}
      />
      <Button title="Добавить услугу" onPress={addNewServiceParam} />
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 5, // Радиус закругления углов
  },
  inputAndroid: {
    height: 50,
    width: '100%',
    color: 'black',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5, // Радиус закругления углов
  },
})

export default SelectorServices;
