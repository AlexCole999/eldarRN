import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectorCategory = ({ category, setCategory }) => {
  return (
    <View style={{ marginBottom: 10, overflow: 'hidden', borderRadius: 10 }}>
      <Picker
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
        style={pickerSelectStyles.picker}
      >
        <Picker.Item label="Выберите категорию" value={null} />
        <Picker.Item label="Эстетическая косметология" value="Эстетическая косметология" />
        <Picker.Item label="Аппаратная косметология" value="Аппаратная косметология" />
        <Picker.Item label="Инъекционная косметология" value="Инъекционная косметология" />
        <Picker.Item label="Депиляция, шугаринг" value="Депиляция, шугаринг" />
        <Picker.Item label="Перманентный макияж" value="Перманентный макияж" />
        <Picker.Item label="Лашмейкеры и Бровисты" value="Лашмейкеры и Бровисты" />
        <Picker.Item label="Стилисты по волосам" value="Стилисты по волосам" />
        <Picker.Item label="Визаж" value="Визаж" />
        <Picker.Item label="Барбершоп" value="Барбершоп" />
        <Picker.Item label="Ногтевой сервис" value="Ногтевой сервис" />
        <Picker.Item label="Массаж и Спа" value="Массаж и Спа" />
        <Picker.Item label="Тату и Пирсинг" value="Тату и Пирсинг" />
        <Picker.Item label="Коворкинг и Конферент залы" value="Коворкинг и Конферент залы" />
        <Picker.Item label="Фотостудия" value="Фотостудия" />
        <Picker.Item label="Рестораны и Банкетные Залы" value="Рестораны и Банкетные Залы" />
        <Picker.Item label="Прочее" value="Прочее" />
      </Picker>
    </View>
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
    borderRadius: 5,
    backgroundColor: 'white'
  },
});

export default SelectorCategory;
