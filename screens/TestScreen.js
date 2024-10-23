import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { UrlTile, Marker, Callout } from 'react-native-maps';

const App = () => {
  const [markers, setMarkers] = useState([]); // Массив для хранения маркеров

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent; // Получаем координаты нажатия на карту
    const newMarker = {
      coordinate,
      id: Date.now() + Math.random(), // Генерируем уникальный id
    };
    setMarkers([...markers, newMarker]); // Добавляем новый маркер
  };

  const handleDeleteMarker = (id) => {
    setMarkers(markers.filter(marker => marker.id !== id)); // Удаляем маркер по id
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 41.33016,  // Координаты для центра карты
          longitude: 69.31343,
          latitudeDelta: 0.05, // Зум по вертикали
          longitudeDelta: 0.05, // Зум по горизонтали
        }}
        onPress={handleMapPress} // Добавляем обработчик нажатия на карту
      >
        {/* Используем UrlTile для тайлов OpenStreetMap */}
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19} // Максимальный уровень зума
        />
        {/* Отображаем маркеры на карте */}
        {markers.map((marker) => (
          <Marker
            key={marker.id} // Используем id как уникальный ключ для маркера
            coordinate={marker.coordinate} // Координаты маркера из массива
          >
            <Callout>
              <View style={styles.callout}>
                <Image
                  source={{ uri: 'https://placekitten.com/200/200' }} // Пример случайной фотографии
                  style={styles.image}
                />
                <Text>Координаты:</Text>
                <Text>Широта: {marker.coordinate.latitude}</Text>
                <Text>Долгота: {marker.coordinate.longitude}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteMarker(marker.id)} // Удаляем маркер по id
                >
                  <Text style={styles.deleteButtonText}>Удалить маркер</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  callout: {
    width: 200, // Ширина окна с описанием
    alignItems: 'center', // Центрируем содержимое
  },
  image: {
    width: 100, // Ширина изображения
    height: 100, // Высота изображения
    marginBottom: 10, // Отступ между изображением и текстом
  },
  deleteButton: {
    backgroundColor: '#ff4d4d', // Красный цвет кнопки удаления
    padding: 10, // Отступ внутри кнопки
    borderRadius: 5, // Закругленные углы
  },
  deleteButtonText: {
    color: 'white', // Цвет текста кнопки
  },
});

export default App;
