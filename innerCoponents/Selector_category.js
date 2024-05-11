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
          { label: 'Фитнес', value: 'Фитнес' },
          { label: 'Бани, сауны', value: 'Бани, сауны' },
          { label: 'Пирсинг', value: 'Пирсинг' },
          { label: 'Языковая школа', value: 'Языковая школа' },
          { label: 'Коворкинг', value: 'Коворкинг' },
          { label: 'Массаж', value: 'Массаж' },
          { label: 'Психология', value: 'Психология' },
          { label: 'Татуаж, тату', value: 'Татуаж, тату' },
          { label: 'СПА', value: 'СПА' },
          { label: 'Подология', value: 'Подология' },
          { label: 'Депиляция, эпиляция', value: 'Депиляция, эпиляция' },
          { label: 'Репетитор', value: 'Репетитор' },
          { label: 'Курсы', value: 'Курсы' },
          { label: 'Косметология, уход', value: 'Косметология, уход' },
          { label: 'Брови', value: 'Брови' },
          { label: 'Ресницы', value: 'Ресницы' },
          { label: 'Ногтевой сервис', value: 'Ногтевой сервис' },
          { label: 'Стоматология', value: 'Стоматология' },
          { label: 'Ветеринария', value: 'Ветеринария' },
          { label: 'Визаж', value: 'Визаж' },
          { label: 'Груминг', value: 'Груминг' },
          { label: 'Парикмахерские услуги', value: 'Парикмахерские услуги' },//
          { label: 'Усы, борода', value: 'Усы, борода' },
          { label: 'Барбершоп', value: 'Барбершоп' },
          { label: 'Прочие', value: 'Прочие' },
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
})

export default SelectorCategory;