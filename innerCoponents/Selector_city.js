import React from 'react';
import { View, TextInput, ScrollView, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectorCity = ({ city, setCity }) => {
  console.log(city)
  return (
    <View style={{
      marginBottom: 10, overflow: 'hidden', borderRadius: 10
    }}>
      <Picker
        selectedValue={city}
        onValueChange={(value) => setCity(value)}
        style={pickerSelectStyles.picker}
      >
        <Picker.Item label="Выберите город" value={null} />
        <Picker.Item label="Ташкент" value="Ташкент" />
        <Picker.Item label="Ташкентская обл" value="Ташкентская обл" />
        <Picker.Item label="Самарканд" value="Самарканд" />
        <Picker.Item label="Наманган" value="Наманган" />
        <Picker.Item label="Андижан" value="Андижан" />
        <Picker.Item label="Фергана" value="Фергана" />
        <Picker.Item label="Бухара" value="Бухара" />
        <Picker.Item label="Хива" value="Хива" />
        <Picker.Item label="Ургенч" value="Ургенч" />
        <Picker.Item label="Нукус" value="Нукус" />
        <Picker.Item label="Карши" value="Карши" />
        <Picker.Item label="Гулистан" value="Гулистан" />
        <Picker.Item label="Джизак" value="Джизак" />
        <Picker.Item label="Термез" value="Термез" />
        <Picker.Item label="Шахрисабз" value="Шахрисабз" />
        <Picker.Item label="Сырдарья" value="Сырдарья" />
        {/* Добавьте больше городов по мере необходимости */}
      </Picker>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  picker: {
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5, // Радиус закругления углов
    backgroundColor: 'white'
  },
});

export default SelectorCity;

// import React from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { BoxShadow } from 'react-native-shadow';

// const SelectorCity = ({ city, setCity }) => {
//   console.log(city);

//   // Настройка параметров тени
//   const shadowOpt = {
//     width: 300, // Ширина контейнера
//     height: 50, // Высота контейнера
//     color: '#0A309B', // Цвет тени
//     border: 2, // Распространение тени (аналог spread в CSS)
//     radius: 12, // Закругление углов
//     opacity: 0.16, // Непрозрачность тени (16%)
//     x: 0, // Смещение по оси X
//     y: 2, // Смещение по оси Y
//     style: { marginBottom: 10 },
//   };

//   return (
//     <BoxShadow setting={shadowOpt}>
//       <View style={styles.container}>
//         <Text>123</Text>
//       </View>
//     </BoxShadow>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 0,
//     width: 300,
//     height: 50,
//     borderRadius: 12, // Закругление углов
//     backgroundColor: 'white', // Белый фон, чтобы тень была видна
//   },
// });

// const pickerSelectStyles = StyleSheet.create({
//   picker: {
//     height: 50,
//     width: 300,
//     borderColor: 'gray',
//     borderRadius: 12, // Закругление углов
//     backgroundColor: 'white',
//   },
// });

// export default SelectorCity;
