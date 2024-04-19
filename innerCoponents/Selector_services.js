import React from 'react';
import { View, TextInput, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { pickerSelectStyles } from './styles'; // Подключите стили из вашего файла стилей

const SelectorServices = ({ selectedHours, setSelectedHours, setPrice, addServiceParam, submitAdsense }) => {
  return (
    <View>
      <RNPickerSelect
        onValueChange={(value) => setSelectedHours(value)}
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
        value={selectedHours}
        style={pickerSelectStyles}
      />
      <TextInput
        style={styles.input}
        placeholder="Введите цену"
        onChangeText={setPrice}
        value={price}
      />
      <Button title="Добавить параметр" onPress={addServiceParam} />
      <Button title="Add Adsense" onPress={submitAdsense} />
    </View>
  );
};

export default SelectorServices;
