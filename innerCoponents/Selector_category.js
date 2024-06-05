import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const SelectorCategory = ({ category, setCategory }) => {
  return (
    <View style={{
      marginBottom: 10, overflow: 'hidden', borderRadius: 10
    }}>
      <RNPickerSelect
        onValueChange={(value) => setCategory(value)}
        placeholder={{ label: 'Выберите категорию', value: null }}
        items={[
          { label: 'Эстетическая косметология', value: 'Эстетическая косметология' },
          { label: 'Аппаратная косметология', value: 'Аппаратная косметология' },
          { label: 'Инъекционная косметология', value: 'Инъекционная косметология' },
          { label: 'Депиляция, шугаринг', value: 'Депиляция, шугаринг' },
          { label: 'Перманентный макияж', value: 'Перманентный макияж' },
          { label: 'Лашмейкеры/Бровисты', value: 'Лашмейкеры/Бровисты' },
          { label: 'Стилисты по волосам', value: 'Стилисты по волосам' },
          { label: 'Визаж', value: 'Визаж' },
          { label: 'Барбершоп', value: 'Барбершоп' },
          { label: 'Ногтевой сервис', value: 'Ногтевой сервис' },
          { label: 'Массаж /Спа', value: 'Массаж /Спа' },
          { label: 'Тату/Пирсинг', value: 'Тату/Пирсинг' },
          { label: 'Коворкинг/Конференц залы', value: 'Коворкинг/Конференц залы' },
          { label: 'Фотостудия', value: 'Фотостудия' },
          { label: 'Рестораны/Банкетные Залы', value: 'Рестораны/Банкетные Залы' },
        ]}
        value={category}
        style={pickerSelectStyles}
      />
    </View>
  );
};

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
    color: 'black',
    backgroundColor: 'white'
  },
});

export default SelectorCategory;
