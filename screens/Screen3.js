import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const Screen3 = () => {

  const [images, setImages] = useState([]);

  const selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        multiple: true, // Разрешаем выбор нескольких файлов
      });
      if (!result.cancelled) {
        for (const photo of result.assets) {
          const manipulatedImage = await manipulateAsync(
            photo.uri,
            [{ resize: { width: 500 } }],
            { compress: 0.75, format: SaveFormat.JPEG }
          );
          setImages(prevImages => [...prevImages, manipulatedImage.uri]);
        }
      }
    } catch (err) {
      console.error('Ошибка при выборе изображения:', err);
    }
    console.log('pick')
  };

  const removeImage = (index) => {
    Alert.alert(
      'Удаление изображения',
      'Вы уверены, что хотите удалить изображение?',
      [
        {
          text: 'Да',
          onPress: () => {
            const newImages = images.filter((image, i) => i !== index);
            setImages(newImages);
          }
        },
        {
          text: 'Нет',
          onPress: () => console.log('Отмена удаления'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  const uploadImages = async () => {
    try {

      const userData = await AsyncStorage.getItem('userData');

      const formData = new FormData();
      formData.append('user', userData);

      for (const image of images) {
        let imageParsedLength = image.split('/').length;
        let imageName = image.split('/')[imageParsedLength - 1];
        formData.append('images', {
          uri: image,
          type: 'image/jpeg',
          name: imageName,
        });
      }

      let response = await axios.post('http://192.168.1.102:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Успешно', 'Изображения успешно загружены');
      console.log(response.data.paths);
    } catch (err) {
      if (err.message == 'Network Error') { Alert.alert('Плохой интернет', 'Попробуйте отправить еще раз'); }
      else Alert.alert('Ошибка', 'Ошибка при загрузке изображения');
      console.error('Ошибка при загрузке изображения:', err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScrollView horizontal style={styles.imageScrollView}>
        {images.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => removeImage(index)}>
            <Image source={{ uri: image }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={selectImage}>
          <Text style={styles.buttonText}>Добавить фото</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { opacity: images.length === 0 ? 0.5 : 1 }]}
          onPress={uploadImages}
          disabled={images.length === 0}
        >
          <Text style={styles.buttonText}>Загрузить</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  scrollView: {
    height: 125,
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Screen3;
