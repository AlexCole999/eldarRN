import React from 'react';
import { View, TextInput, ScrollView, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectorDistrict = ({ city, cityDistrict, setCityDistrict }) => {
  return (
    city == 'Ташкент' ? <View style={{
      marginBottom: 10, overflow: 'hidden', borderRadius: 10
    }}>
      <Picker
        selectedValue={cityDistrict}
        onValueChange={(value) => setCityDistrict(value)}
        style={pickerSelectStyles.picker}
      >
        <Picker.Item label="Выберите район" value={null} />
        <Picker.Item label="Алмазарский" value="Алмазарский" />
        <Picker.Item label="Бектемирский" value="Бектемирский" />
        <Picker.Item label="Мирабадский" value="Мирабадский" />
        <Picker.Item label="Мирзо-Улугбекский" value="Мирзо-Улугбекский" />
        <Picker.Item label="Сергелийский" value="Сергелийский" />
        <Picker.Item label="Учтепинский" value="Учтепинский" />
        <Picker.Item label="Чиланзарский" value="Чиланзарский" />
        <Picker.Item label="Шайхантахурский" value="Шайхантахурский" />
        <Picker.Item label="Юнусабадский" value="Юнусабадский" />
        <Picker.Item label="Яккасарайский" value="Яккасарайский" />
        {/* Добавьте больше районов по мере необходимости */}
      </Picker>
    </View>
      : null
  );
};

const pickerSelectStyles = StyleSheet.create({
  picker: {
    height: 50,
    width: '100%',
    color: 'black',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5, // Радиус закругления углов
    backgroundColor: 'white'
  },
});

export default SelectorDistrict;