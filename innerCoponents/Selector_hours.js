import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

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

const SelectorHours = ({ workhours, setWorkhours }) => {

  const [workhoursStart, setWorkhoursStart] = useState('');
  const [workhoursEnd, setWorkhoursEnd] = useState('');
  return (
    <>
      <RNPickerSelect
        onValueChange={(value) => { setWorkhoursStart(value); setWorkhours(`${value}-${workhoursEnd}`) }}
        placeholder={{ label: 'Начало рабочего дня', value: null }}
        items={generateTimeItems()}
        value={workhoursStart}
        style={pickerSelectStyles}
      />
      <RNPickerSelect
        onValueChange={(value) => { setWorkhoursEnd(value); setWorkhours(`${workhoursStart}-${value}`) }}
        placeholder={{ label: 'Конец рабочего дня', value: null }}
        items={generateTimeItems()}
        value={workhoursEnd}
        style={pickerSelectStyles}
      />
    </>
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

export default SelectorHours;
