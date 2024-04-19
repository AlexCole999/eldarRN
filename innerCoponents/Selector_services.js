import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const SelectorServices = ({ newServiceHours, setNewServiceHours, setNewServicePrice, addNewServiceParam }) => {
  return (
    <View>
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
        value={price}
      />
      <Button title="Добавить параметр" onPress={addNewServiceParam} />
    </View>
  );
};

export default SelectorServices;
