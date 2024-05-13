import React from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, SafeAreaView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const screenWidth = Dimensions.get('window').width;

const SearchComponent = () => {
  const route = useRoute();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#007FFF', marginHorizontal: -16 }}>

      <ImageBackground
        source={{ uri: `http://192.168.1.102:3000/others/background.jpg` }}
        style={{ flex: 1, width: screenWidth, height: '100%', marginLeft: 0 }}
      >

        <SafeAreaView style={{ flex: 1, paddingTop: 15 }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 700, textAlign: 'center' }}>{route.name}</Text>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <View style={styles.searchContainer}>
              <Image source={{ uri: `http://192.168.1.102:3000/others/search.png` }} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder={'Город, категория или услуга'}
                placeholderTextColor={'rgba(255, 255, 255, 1)'}
              />
            </View>
          </View>
        </SafeAreaView>

        <StatusBar barStyle="light-content" backgroundColor="#74f8fa" />

      </ImageBackground>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
    width: '85%',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
});

export default SearchComponent