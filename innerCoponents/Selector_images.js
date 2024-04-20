import React from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker

const SelectorImages = ({ images, setImages }) => {

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
      <Button title="Добавить изображение" onPress={selectImage} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.flatlist}
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.image} />
            <TouchableOpacity onPress={() => removeImage(index)} style={styles.removeImageButton}>
              <Text style={styles.removeImageButtonText}>Удалить</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10
  },
  flatlist: {
    paddingTop: 10
  },
  imageContainer: {
    margin: 5,
    position: 'relative',
  },
  image: {
    width: 125,
    height: 125,
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
  }
});

export default SelectorImages;
