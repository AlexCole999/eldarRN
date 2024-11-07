import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker

import upload_icon from '../assets/upload_icon.png'
import trash_icon from '../assets/trash_icon.png'

const { width } = Dimensions.get('window'); // Получаем ширину экрана для адаптации ширины изображения

import { useTranslation } from 'react-i18next';

const SelectorImages = ({ images, setImages }) => {

  const { t, i18n } = useTranslation();

  const selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.75, // Качество изображения (от 0 до 1)
        allowsEditing: true, // Разрешить редактирование изображения перед выбором
        maxWidth: 650, // Максимальная ширина изображения
      });

      if (!result.cancelled) {
        setImages([...images, result.assets[0].uri]);
      }
    } catch (error) {
      console.error('Ошибка при выборе изображения:', error);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, color: '#333333', }}>{t('Фотографии')}</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.flatlist}
        data={[{ addButton: true }, ...images]} // Вставляем "кнопку" в начало массива данных
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          item.addButton ? (
            <TouchableOpacity
              style={{ ...styles.addButton, marginLeft: 2, marginTop: 2, position: 'relative' }}
              onPress={selectImage}
            >
              <View style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={upload_icon} style={{ width: 24, height: 24 }} />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{ ...styles.imageContainer, marginTop: 2 }}
              onPress={() => removeImage(index - 1)}
            >
              <Image source={{ uri: item }} style={styles.imageContainer} />
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 2, gap: 4 }}>
                <Image source={trash_icon} style={{ width: 12, height: 12 }} />
                <Text style={{ textAlign: 'center', fontSize: 12, fontFamily: 'Manrope_400Regular', color: 'grey' }}>Удалить</Text>
              </View>
            </TouchableOpacity>
          )
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0
  },
  flatlist: {
    paddingTop: 12,
    height: 120
  },
  addButton: {
    width: width * 0.38, // Ширина 38% от ширины экрана
    height: 73, // Высота кнопки
    backgroundColor: 'white', // светло-голубой фон
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8, // Отступ между кнопкой и следующей фотографией
    elevation: 4
  },
  addButtonText: {
    color: 'white',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  imageContainer: {
    width: width * 0.38, // Ширина 38% от ширины экрана
    height: 73, // Высота изображения
    marginRight: 8, // Отступ между фотографиями
    position: 'relative',
    elevation: 4,
    borderRadius: 12
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  removeImageButtonText: {
    color: 'white',
    fontSize: 12,
  }
});

export default SelectorImages;
