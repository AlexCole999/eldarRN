import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Button, Image, Alert, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator';

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
      const results = [];
      const paths = [];

      for (const image of images) {
        let imageParsedLength = image.split('/').length;
        let imageName = image.split('/')[imageParsedLength - 1];

        let formData = new FormData();
        formData.append('images', {
          uri: image,
          type: 'image/jpeg',
          name: imageName,
        });

        let response = await axios.post('http://192.168.1.102:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        results.push(response.data.message.status);
        paths.push(response.data.message.paths);
      }

      console.log(paths.join('\n'));
    } catch (err) {
      console.error('Ошибка при загрузке изображения:', err);
      Alert.alert('Error', 'Ошибка при загрузке изображения');
    }
    Alert.alert('Успешно', 'Изображения успешно загружены');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        {images.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => removeImage(index)}>
            <Image source={{ uri: image }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Выбрать изображения" onPress={selectImage} />
        <Button title="Загрузить изображения" onPress={uploadImages} disabled={images.length === 0} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  scrollView: {
    height: 120,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default Screen3;
