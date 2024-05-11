import React from 'react';
import { View, TextInput, ScrollView, Button, StyleSheet, Text } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

const SelectorCity = ({ city, setCity }) => {
  return (
    <View style={{
      marginBottom: 10, overflow: 'hidden', borderRadius: 10
    }}>
      <RNPickerSelect
        onValueChange={(value) => setCity(value)}
        placeholder={{ label: 'Выберите город', value: null }}
        items={[
          { label: 'Ташкент', value: 'Ташкент' },
          { label: 'Ташкентская обл', value: 'Ташкентская обл' },
          { label: 'Самарканд', value: 'Самарканд' },
          { label: 'Наманган', value: 'Наманган' },
          { label: 'Андижан', value: 'Андижан' },
          { label: 'Фергана', value: 'Фергана' },
          { label: 'Бухара', value: 'Бухара' },
          { label: 'Хива', value: 'Хива' },
          { label: 'Ургенч', value: 'Ургенч' },
          { label: 'Нукус', value: 'Нукус' },
          { label: 'Карши', value: 'Карши' },
          { label: 'Гулистан', value: 'Гулистан' },
          { label: 'Джизак', value: 'Джизак' },
          { label: 'Термез', value: 'Термез' },
          { label: 'Шахрисабз', value: 'Шахрисабз' },
          { label: 'Сырдарья', value: 'Сырдарья' },
          // Add more cities as needed
        ]}
        value={city}
        style={{ ...pickerSelectStyles }}
      />
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    width: '100%',
    color: 'black',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5, // Радиус закругления углов
  },
  inputAndroid: {
    color: 'black',
    backgroundColor: 'white'
  },
})

export default SelectorCity;