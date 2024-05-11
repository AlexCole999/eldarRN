import React from 'react';
import { View, TextInput, ScrollView, Button, StyleSheet, Text } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

const SelectorDistrict = ({ district, setDistrict }) => {
  return (
    <View style={{
      marginBottom: 10, overflow: 'hidden', borderRadius: 10
    }}>
      <RNPickerSelect
        onValueChange={(value) => setDistrict(value)}
        placeholder={{ label: 'Выберите район', value: null }}
        items={[
          { label: 'Алмазарский', value: 'Алмазарский' },
          { label: 'Бектемирский', value: 'Бектемирский' },
          { label: 'Мирабадский', value: 'Мирабадский' },
          { label: 'Мирзо-Улугбекский', value: 'Мирзо-Улугбекский' },
          { label: 'Сергелийский', value: 'Сергелийский' },
          { label: 'Учтепинский', value: 'Учтепинский' },
          { label: 'Чиланзарский', value: 'Чиланзарский' },
          { label: 'Шайхантахурский', value: 'Шайхантахурский' },
          { label: 'Юнусабадский', value: 'Юнусабадский' },
          { label: 'Яккасарайский', value: 'Яккасарайский' },
        ]}
        value={district}
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

export default SelectorDistrict;