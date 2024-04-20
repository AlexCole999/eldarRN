import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker

import SelectorCity from '../innerCoponents/Selector_city';
import SelectorCategory from './../innerCoponents/Selector_category';
import SelectorHours from '../innerCoponents/Selector_hours';
import SelectorServices from '../innerCoponents/Selector_services';

const AddAdsenseScreen = () => {
  const [user, setUser] = useState('default');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [workhours, setWorkhours] = useState('');
  const [servicesList, setServicesList] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function userCheckUp() {
      let userDataString = await AsyncStorage.getItem('userData');
      userDataString = JSON.parse(userDataString);
      console.log(userDataString);
      await setUser(userDataString.phone);
    }
    userCheckUp();
  }, []);

  const selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        multiple: true, // Allow multiple files selection
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
    console.log('pick');
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const submitAdsense = async () => {
    try {
      await axios.post('http://192.168.1.102:3000/adsenses', {
        user, category, city, phone, address, workhours, servicesList, images
      });
      alert('done');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <SelectorCity city={city} setCity={setCity} />
        <SelectorCategory category={category} setCategory={setCategory} />
        <SelectorHours setWorkhours={setWorkhours} />
        <TextInput style={styles.input} placeholder="Телефон" onChangeText={setPhone} value={phone} />
        <TextInput style={styles.input} placeholder="Адрес" onChangeText={setAddress} value={address} />
        <SelectorServices servicesList={servicesList} setServicesList={setServicesList} />

        <TouchableOpacity style={styles.imagePickerButton} onPress={selectImage}>
          <Text style={styles.imagePickerButtonText}>Выбрать изображение</Text>
        </TouchableOpacity>

        <View style={styles.imageList}>
          {images.map((imageUri, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: imageUri }} style={styles.image} />
              <TouchableOpacity onPress={() => removeImage(index)} style={styles.removeImageButton}>
                <Text style={styles.removeImageButtonText}>Удалить</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.sendButton} onPress={submitAdsense}>
        <Text style={styles.sendButtonText}>Добавить объявление</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  imagePickerButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    marginBottom: 10,
  },
  imagePickerButtonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  imageList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  imageContainer: {
    margin: 5,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
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
  },
  sendButton: {
    marginTop: 35,
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default AddAdsenseScreen;
