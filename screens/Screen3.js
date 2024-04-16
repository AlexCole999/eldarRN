
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Button, Image, Alert, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator';

const Screen3 = () => {

  const [image, setImage] = useState(null);

  const selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
      });
      if (!result.cancelled) {
        const manipulatedImage = await manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 500 } }],
          { compress: 0.75, format: SaveFormat.JPEG }
        );
        console.log(manipulatedImage.uri)
        await setImage(manipulatedImage.uri)
      }
    } catch (err) {
      console.error('Ошибка при выборе изображения:', err);
    }
    console.log('pick')
  };

  const uploadImage = async () => {

    let imageParsedLength = image.split('/').length
    let imageName = image.split('/')[imageParsedLength - 1]

    try {
      let formData = new FormData();
      formData.append('image', {
        uri: image,
        type: 'image/jpeg', // или 'image/png'
        name: imageName,
      });

      let response = await axios.post('http://192.168.1.102:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', response.data.message.status);
      console.log(response.data.message.path)
    } catch (err) {
      console.error('Ошибка при загрузке изображения:', err);
      Alert.alert('Error', 'Ошибка при загрузке изображения');
    }
  };

  return (
    <View>
      {image && <Image source={{ uri: image }} style={{ width: 350, height: 500 }} />}
      <Button title="Выбрать изображение" onPress={selectImage} />
      <Button title="Загрузить изображение" onPress={uploadImage} disabled={!image} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Screen3;