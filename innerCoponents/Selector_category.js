import React from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const SelectorCategory = ({ category, setCategory }) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => setCategory(value)}
      placeholder={{ label: 'Выберите категорию', value: null }}
      items={[
        { label: 'Фитнес', value: 'Фитнес' },
        { label: 'Бани, сауны', value: 'Бани, сауны' },
        { label: 'Пирсинг', value: 'Пирсинг' },
        { label: 'Языковая школа', value: 'Языковая школа' },
        { label: 'Коворкинг', value: 'Коворкинг' },
        { label: 'Массаж', value: 'Массаж' },
        { label: 'Психология', value: 'Психология' },
        { label: 'Парикмахерские услуги', value: 'Парикмахерские услуги' },
        { label: 'Ногтевой сервис', value: 'Ногтевой сервис' },
        { label: 'Брови', value: 'Брови' },
        { label: 'Татуаж, тату', value: 'Татуаж, тату' },
        { label: 'СПА', value: 'СПА' },
        { label: 'Подология', value: 'Подология' },
        { label: 'Депиляция, эпиляция', value: 'Депиляция, эпиляция' },
        { label: 'Репетитор', value: 'Репетитор' },
        { label: 'Ресницы', value: 'Ресницы' },
        { label: 'Курсы', value: 'Курсы' },
        { label: 'Прочие', value: 'Прочие' },
        { label: 'Аренда', value: 'Аренда' },
        { label: 'Косметология, уход', value: 'Косметология, уход' },
        { label: 'Стоматология', value: 'Стоматология' },
        { label: 'Ветеринария', value: 'Ветеринария' },
        { label: 'Визаж', value: 'Визаж' },
        { label: 'Груминг', value: 'Груминг' },
        { label: 'Усы, борода', value: 'Усы, борода' },
        { label: 'Барбершоп', value: 'Барбершоп' },
      ]}
      value={category}
      style={pickerSelectStyles}
    />
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

export default SelectorCategory;