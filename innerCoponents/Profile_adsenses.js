import React, { useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, Text, TextInput, View, Button, RefreshControl, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import localhosturl from '../localhoststring';
import { ScrollView } from 'react-native-gesture-handler';
import StarRating from './StarRating';
import profile_adsenses_place from '../assets/profile_adsenses_place.png'
import profile_adsenses_phone from '../assets/profile_adsenses_phone.png'
import profile_adsenses_other from '../assets/profile_adsenses_other.png'

const ProfileAdsenses = ({ adsenses, userData, refreshAdsenses }) => {

  const navigation = useNavigation();

  const deleteAdsense = async (adId) => {
    Alert.alert(
      'Подтверждение удаления',
      'Вы уверены, что хотите удалить это объявление?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => deleteAd(adId),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );

    async function deleteAd(adId) {
      try {
        const response = await fetch(`${localhosturl}/deleteAdsense`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: adId }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Успешно удалено:', result);
          Alert.alert('Успех', 'Объявление успешно удалено');
          refreshAdsenses()
        } else {
          const errorData = await response.json();
          console.error('Ошибка при удалении:', errorData.message);
          Alert.alert('Ошибка', 'Ошибка при удалении объявления');
        }
      } catch (error) {
        console.error('Ошибка при соединении с сервером:', error);
        Alert.alert('Ошибка', 'Ошибка при соединении с сервером');
      }
    }
  }

  return (
    <View style={styles.adsContainer}>
      {adsenses.map(ad => (
        <TouchableOpacity key={ad._id}
          onPress={() => navigation.navigate('Детали объявления', {
            adId: ad._id, adUser: ad.user, adCity: ad.city, adDistrict: ad.district, adCategory: ad.category, adPhone: ad.phone, adAddress: ad.address, adWorkhours: ad.workhours, adServiceParams: ad.servicesList, adImagesList: ad.imagesList, adDescription: ad.description, adTestimonials: ad.testimonials
          })}
        >
          <View style={styles.adContainer}>

            <Image source={{ uri: `${localhosturl}/${userData?.phone}/${ad?.imagesList[0]}` }} style={styles.adImage} />

            <View style={styles.infoContainer}>

              <View style={{ maxWidth: '100%' }}>
                <Text style={{ ...styles.adText, fontFamily: 'Manrope_500Medium', fontSize: 16 }}>{ad.category}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Image source={profile_adsenses_place} style={{ width: 16, height: 16 }} />
                  <Text style={{ ...styles.adText, fontFamily: 'Manrope_400Regular', fontSize: 14, marginTop: 6 }}>г. {ad.city}, {ad.address}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Image source={profile_adsenses_phone} style={{ width: 16, height: 16 }} />
                  <Text style={{ ...styles.adText, fontFamily: 'Manrope_400Regular', fontSize: 14, marginTop: 6 }}>+ {ad?.phone.toString().replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Image source={profile_adsenses_other} style={{ width: 16, height: 16 }} />
                  <Text style={{ ...styles.adText, fontFamily: 'Manrope_400Regular', fontSize: 14, marginTop: 6 }}>Прочее</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
                  <Text style={{ ...styles.adText, fontFamily: 'Manrope_300Light', fontSize: 16 }}>Часы работы</Text>
                  <Text style={{ ...styles.adText, fontFamily: 'Manrope_500Medium', fontSize: 16 }}>{ad.workhours.replace(/:/g, '.').replace('-', ' - ')}</Text>
                </View>
                {ad.servicesList.map((service, index) => (
                  <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                    <Text style={{ ...styles.adText, fontFamily: 'Manrope_300Light', fontSize: 16 }}>Часы {service.hours}:</Text>
                    <Text style={{ ...styles.adText, fontFamily: 'Manrope_500Medium', fontSize: 16 }}>{service.price.toLocaleString('ru-RU')}</Text>
                  </View>
                ))}
              </View>
            </View>

          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, borderBottomWidth: 1, borderBottomColor: '#C4C4C4', paddingBottom: 24, gap: 20 }}>
            <TouchableOpacity style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#D63737', borderRadius: 12, height: 36, alignItems: 'center', justifyContent: 'center', flexGrow: 1 }} onPress={() => { deleteAdsense(ad._id) }}>
              <Text style={{ color: '#0094FF', fontFamily: 'Manrope_600SemiBold', fontSize: 16, letterSpacing: 0.5 }}>Удалить</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'rgba(0,148,255,0.5)', borderRadius: 12, height: 36, alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
              onPress={() => navigation.navigate('Изменить объявление', {
                adId: ad._id, adUser: ad.user, adCity: ad.city, adDistrict: ad.district, adCategory: ad.category, adPhone: ad.phone, adAddress: ad.address, adWorkhours: ad.workhours, adServiceParams: ad.servicesList, adImagesList: ad.imagesList, adDescription: ad.description, adTestimonials: ad.testimonials
              })}
            >
              <Text style={{ color: 'white', fontFamily: 'Manrope_600SemiBold', fontSize: 16, letterSpacing: 0.5 }}>Изменить</Text>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>

      ))}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5FFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    flexGrow: 1,
    marginVertical: 10,
    backgroundColor: 'rgb(0, 191, 255)', // светло-голубой фон
    padding: 10, // отступы
    borderRadius: 10, // радиус закругления углов
    alignItems: 'center', // центрирование по горизонтали
  },
  deleteButton: {
    flexGrow: 1,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'white',
    paddingLeft: 14,
    borderRadius: 10,
  },
  addButtonText: {
    fontWeight: '500',
    fontSize: 16,
  },
  sectionContainer: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingVertical: 10,
    paddingLeft: 14,
    borderRadius: 10,
  },
  sectionTitle: {
    borderBottomColor: '#ececec',
    borderBottomWidth: 1,
    paddingBottom: 7,
    fontWeight: '500',
    fontSize: 16,
  },
  sectionItem: {
    borderBottomColor: '#ececec',
    borderBottomWidth: 1,
    paddingVertical: 7,
    fontWeight: '500',
    fontSize: 16,
  },
  adsContainer: {
    paddingTop: 20,

  },
  userContainer: {
    backgroundColor: 'white',
    padding: 7,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  userImage: {
    width: 70,
    height: 70,
  },
  userName: {
    textTransform: 'capitalize',
    fontWeight: '700',
    letterSpacing: 0.2,
    fontFamily: 'Roboto',
    fontSize: 16,
  },
  userPhone: {
    color: 'grey',
    letterSpacing: 0.2,
    fontFamily: 'Roboto',
    fontSize: 14,
  },
  adContainer: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    elevation: 4
  },
  adText: {
    fontSize: 12,
    marginBottom: 2,
    maxWidth: '80%',
    color: '#333333',
  },
  adImage: {
    width: '100%',
    height: 134,
    resizeMode: 'cover',
    borderColor: 'lightgray',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  infoContainer: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginTop: -12,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  adButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
    height: 36
  },
});

export default ProfileAdsenses