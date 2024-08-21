import { StyleSheet, FlatList, TouchableOpacity, Image, Text, View, Linking, Alert } from 'react-native';
import localhosturl from './../localhoststring';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import StarRating from './../innerCoponents/StarRating';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import addetails_message from '../assets/addetails_message.png'
import addetails_phone from '../assets/addetails_phone.png'
import time from '../assets/time.png'
import profile_adsenses_place from '../assets/profile_adsenses_place.png'
import user from '../assets/user.png'

const AdDetailsScreen = ({ route }) => {
  const { adId, adUser, adCity, adDistrict, adCategory, adPhone, adAddress, adWorkhours, adServiceParams, adImagesList, adDescription, adTestimonials } = route.params;
  let averageRating = adTestimonials.length ? adTestimonials.reduce((acc, obj) => acc + obj.rating, 0) / adTestimonials.length : 0
  const navigation = useNavigation();
  console.log(route.params)

  const handleCall = () => {
    Alert.alert(
      'Подтверждение звонка',
      `Вы уверены, что хотите позвонить по номеру +${adPhone}?`,
      [
        {
          text: 'Отмена',
          style: 'cancel'
        },
        {
          text: 'Позвонить',
          onPress: () => {
            Linking.openURL(`tel:${adPhone}`);
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={{ backgroundColor: '#F5FFFF' }}>

      <View style={{ padding: 24, paddingTop: 0, backgroundColor: 'rgba(0, 148, 255, 0.9)', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
        <Image source={{ uri: `${localhosturl}/${adUser}/${adImagesList[0]}` }} style={{ width: '100%', height: 134, borderRadius: 12 }} />
      </View>

      <View style={{ marginHorizontal: 24, marginTop: 16, backgroundColor: 'white', padding: 8, borderRadius: 12, elevation: 4 }}>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16 }}>{adCategory}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 12, gap: 4, alignItems: 'center' }}>
          <Image source={profile_adsenses_place} style={{ width: 16, height: 16, fontFamily: 'Manrope_400Regular', fontSize: 14 }} />
          <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 14 }}>{adCity}, {adAddress}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 6, gap: 4, alignItems: 'center' }}>
          <Image source={time} style={{ width: 16, height: 16 }} />
          <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 14 }}>{adWorkhours.replace(/:/g, '.').replace('-', ' - ')}</Text>
        </View>

      </View>

      <View style={{ marginHorizontal: 24, marginTop: 24, flexDirection: 'row', gap: 12 }}>

        <View style={{ backgroundColor: 'white', borderRadius: 12, gap: 23, paddingVertical: 6, paddingLeft: 13, paddingRight: 8, flexDirection: 'row', justifyContent: 'space-between', elevation: 4 }}>
          <TouchableOpacity onPress={handleCall}>
            <Image
              source={addetails_message}
              style={{ width: 24, height: 24 }}

            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCall}>
            <Image
              source={addetails_phone}
              style={{ width: 25, height: 24 }}

            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ backgroundColor: '#0094FF', borderRadius: 12, flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => { navigation.navigate('Забронировать', { adId: adId, adServiceParams: adServiceParams, adWorkhours: adWorkhours }) }}
        >
          <Text style={{ color: 'white' }}>Забронировать</Text>
        </TouchableOpacity>

      </View>

      <View style={{ marginHorizontal: 24, marginTop: 24, gap: 8 }}>
        <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 24, color: 'rgb(51, 51, 51)' }}>Описание</Text>
        <View style={{ backgroundColor: 'white', borderRadius: 12, elevation: 4, minHeight: 92 }}>
          <Text style={{ color: '#C4C4C4', paddingVertical: 10, paddingHorizontal: 8 }}>{adDescription}</Text>
        </View>
      </View>

      <View style={{ marginHorizontal: 24, marginTop: 24, gap: 12 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 24, color: 'rgb(51, 51, 51)' }}>Услуги</Text>
          <Text style={{ fontFamily: 'Manrope_400Regular', fontSize: 16, color: 'rgb(123, 126, 127)', paddingTop: 2 }}> ({adServiceParams.length})</Text>
        </View>

        {adServiceParams.map((x, i) =>
          <View key={i} style={{ elevation: 4, paddingVertical: 10, paddingHorizontal: 8, borderColor: 'lightgrey', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: 'white', borderRadius: 12 }}>

            <Text style={{ color: '#333333', fontFamily: 'Montserrat_400Regular', fontSize: 14 }}>
              {x?.fiat} {x.price.toLocaleString('ru-RU')}
            </Text>

            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
              <Image source={time} style={{ width: 16, height: 16 }}
              />
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ paddingLeft: 4, color: '#333333', fontFamily: 'Montserrat_400Regular', fontSize: 14 }}>
                  Часов:
                </Text>
                <Text style={{ paddingLeft: 4, color: '#333333', fontFamily: 'Montserrat_500Medium', fontSize: 14 }}>
                  {x.hours}
                </Text>

              </View>
            </View>

          </View>
        )}
      </View>

      <View style={{ marginLeft: 24, marginTop: 24 }}>
        <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 24, color: 'rgb(51, 51, 51)' }}>Фотографии</Text>
        <FlatList
          style={{ paddingTop: 28, paddingBottom: 35, borderRadius: 12, width: '100%' }}
          data={adImagesList}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ paddingRight: 8, elevation: 4 }}
              onPress={() => console.log(`${localhosturl}/${adUser}/${item}`)}>
              <Image source={{ uri: `${localhosturl}/${adUser}/${item}` }} style={{ width: 138, height: 73, borderRadius: 12 }} />
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={{ paddingHorizontal: 24, paddingTop: 12, gap: 12, marginBottom: 24, backgroundColor: 'white' }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

          <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 24, color: 'rgb(51, 51, 51)' }}>Отзывы</Text>

          <View style={{ alignItems: 'center', gap: 4 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#333333', fontSize: 14, fontFamily: 'Montserrat_400Regular' }}>Рейтинг </Text>
              <Text style={{ color: '#F3CB2B', fontSize: 14, fontFamily: 'Montserrat_600SemiBold' }}>{averageRating.toFixed(1).toString()}</Text>
            </View>
            <StarRating rating={averageRating} size={12} />
          </View>

        </View>

        <View style={{ borderRadius: 10, minHeight: 102 }}>

          {
            adTestimonials.length
              ?
              <FlatList
                style={{ width: '100%' }}
                data={adTestimonials}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={{}}>
                    <TouchableOpacity style={{ padding: 6, paddingRight: 7, borderRadius: 8, backgroundColor: '#DCF1FF', width: 220, marginRight: 8, elevation: 2, minHeight: 98 }}>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                          <Image source={user} style={{ width: 32, height: 32 }} />
                          <Text style={{ color: '#333333', fontFamily: 'Manrope_300Light', fontSize: 8 }}>Пользователь</Text>
                        </View>

                        <StarRating rating={item.rating} size={12} />

                      </View>
                      <Text style={{ color: '#333333', fontSize: 12, paddingTop: 4 }}>{item.text}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              : <Text style={{ color: 'grey', fontWeight: 600 }}>У этого объявления пока нет отзывов</Text>
          }

        </View>

        <TouchableOpacity
          onPress={() => { navigation.navigate('Оставить отзыв', { adId: adId }) }}
          style={{ marginTop: 10, marginBottom: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(0, 148, 255,0.9)', padding: 8, borderRadius: 12 }}>
          <Text style={{ color: 'rgba(0, 148, 255,0.9)', fontFamily: 'Manrope_700Bold', fontSize: 16 }}>Оставить отзыв</Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: '',
    backgroundColor: 'white'
  },
})

export default AdDetailsScreen