import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const generateTimeItems = () => {
  let items = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      let label = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      let value = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      items.push({ label, value });
    }
  }
  return items;
};

const SelectorHours = ({ workhoursStart, setWorkhoursStart, workhoursEnd, setWorkhoursEnd, workhours, setWorkhours }) => {

  return (
    <>
      <View style={{ marginBottom: 10, overflow: 'hidden', borderRadius: 10 }}>
        <Picker
          selectedValue={workhoursStart}
          onValueChange={(value) => { setWorkhoursStart(value); setWorkhours(`${value}-${workhoursEnd}`) }}
          style={pickerSelectStyles.picker}
        >
          <Picker.Item label="Начало рабочего дня" value={null} />
          {generateTimeItems().map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
      <View style={{ marginBottom: 10, overflow: 'hidden', borderRadius: 10 }}>
        <Picker
          selectedValue={workhoursEnd}
          onValueChange={(value) => { setWorkhoursEnd(value); setWorkhours(`${workhoursStart}-${value}`) }}
          style={pickerSelectStyles.picker}
        >
          <Picker.Item label="Конец рабочего дня" value={null} />
          {generateTimeItems().map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </>
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

export default SelectorHours;
