import { StyleSheet, FlatList, TouchableOpacity, Image, Text, View, Linking } from 'react-native';
import localhosturl from './../localhoststring';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import StarRating from './../innerCoponents/StarRating';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';



const AdDetailsScreen = ({ route }) => {
  const { adId, adUser, adCity, adDistrict, adCategory, adPhone, adAddress, adWorkhours, adServiceParams, adImagesList, adDescription, adTestimonials } = route.params;
  let averageRating = adTestimonials.length ? adTestimonials.reduce((acc, obj) => acc + obj.rating, 0) / adTestimonials.length : 0
  const navigation = useNavigation();
  return (
    <ScrollView>
      <Image source={{ uri: `${localhosturl}/${adUser}/${adImagesList[0]}` }} style={{ width: '100%', height: 180, borderRadius: 0 }} />
      <View style={styles.container}>
        <View>
          <View >
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'space-between' }}>

              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>

                <TouchableOpacity onPress={() => { Linking.openURL(`tel:${adPhone}`); }}>
                  <Image
                    source={{ uri: `${localhosturl}/userIcons/userMail.png` }}
                    style={{ width: 45, height: 45 }}

                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { Linking.openURL(`tel:${adPhone}`); }}>
                  <Image
                    source={{ uri: `${localhosturl}/userIcons/userPhone6.png` }}
                    style={{ width: 50, height: 50 }}

                  />
                </TouchableOpacity>

              </View>

              <LinearGradient
                colors={['rgb(0, 191, 255)', 'rgb(135, 206, 250)']}
                start={[0, 0]}
                end={[1, 0]}
                style={{ height: 40, display: 'flex', justifyContent: 'center', paddingVertical: 5, paddingHorizontal: 35, borderRadius: 25 }}>
                <Text style={{ color: 'white', fontWeight: 700, fontSize: 12 }} >Записаться</Text>
              </LinearGradient>

            </View>
          </View>
        </View>



        <Text style={{ marginTop: 10, fontWeight: 700, fontSize: 16 }}>{adCity}, {adDistrict}</Text>
        <Text style={{ fontWeight: 700, fontSize: 14 }}>{adAddress}</Text>
        <Text style={{ marginTop: 2, color: 'grey', fontSize: 12 }}>{adWorkhours}</Text>
        <Text style={{ marginTop: 7, fontSize: 14, fontStyle: 'italic' }}>{adCategory}</Text>
        <View style={{ width: '100%', marginVertical: 10 }}>
          <Text style={{ fontWeight: 700, marginBottom: 10, fontSize: 16 }}>Описание</Text>
          <View style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white', borderRadius: 10 }}>
            <Text style={{ color: 'grey' }}>{adDescription}</Text>
          </View>
        </View>


        <View style={{ width: '100%', marginVertical: 10 }}>
          <Text style={{ fontWeight: 700, marginBottom: 10, fontSize: 16 }}>Услуги</Text>
          <View style={{ borderRadius: 10, backgroundColor: 'white' }}>
            {adServiceParams.map((x, i) =>
              <View key={i} style={{ paddingVertical: 10, paddingHorizontal: 20, borderBottomWidth: adServiceParams.length - 1 == i ? 0 : 1, borderColor: 'lightgrey', display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                  <Image
                    source={{ uri: `${localhosturl}/userIcons/serviceTimeIcon.png` }}
                    style={{ width: 20, height: 20 }}

                  />
                  <Text style={{ paddingLeft: 10 }}>Часов:{x.hours}</Text>
                </View>
                <Text style={{ fontStyle: 'italic', color: 'grey' }}>{x.price} UZS</Text>
              </View>
            )}
          </View>
        </View>

        <View style={{ width: '100%', marginVertical: 10 }}>
          <Text style={{ fontWeight: 700, marginBottom: 10, fontSize: 16 }}>Фотографии</Text>
          <FlatList
            style={{ paddingHorizontal: 20, paddingVertical: 20, backgroundColor: 'white', borderRadius: 10, width: '100%' }}
            data={adImagesList}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ paddingRight: 40 }}
                onPress={() => console.log(`${localhosturl}/${adUser}/${item}`)}>
                <Image source={{ uri: `${localhosturl}/${adUser}/${item}` }} style={{ width: 160, height: 160, borderRadius: 10 }} />
              </TouchableOpacity>
            )}
          />

        </View>


        <View style={{ width: '100%', marginVertical: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontWeight: 700, fontSize: 16 }}>Отзывы</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <Text style={{ fontSize: 12, fontStyle: 'italic' }}>Рейтинг: </Text>
              <StarRating rating={averageRating} size={10} />
              <Text style={{ fontSize: 8, fontStyle: 'italic' }}>{averageRating.toFixed(2)}</Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white', borderRadius: 10 }}>
            {adTestimonials.length
              ?
              <FlatList
                style={{ backgroundColor: 'white', borderRadius: 10, width: '100%' }}
                data={adTestimonials}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => console.log(item)} style={{ width: 200, justifyContent: 'flex-start', alignItems: 'center', paddingRight: 20 }}>
                    <View style={{ alignItems: 'center' }}>
                      <StarRating rating={item.rating} size={20} />
                      <Text style={{ color: 'grey', fontSize: 12, fontStyle: 'italic', textAlign: 'center', paddingTop: 4 }}>{item.text}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
              : <Text style={{ color: 'grey', fontWeight: 600 }}>У этого объявления пока нет отзывов</Text>}
          </View>
        </View>



        <TouchableOpacity onPress={() => {
          navigation.navigate('Оставить отзыв', {
            adId: adId
          })
          // console.log(1);
          // let text = '123123123';
          // let rating = 3.5
          // axios.post(`${localhosturl}/newAdsenseTestimonial`, { // Создаем новое объявление
          //   text, rating
          // })

        }}>
          <Text style={{ color: 'rgb(0, 191, 255)', textAlign: 'right' }}>Оставить отзыв</Text>
        </TouchableOpacity>



        <TouchableOpacity
          style={{
            marginVertical: 10,
            backgroundColor: 'rgb(0, 191, 255)', // светло-голубой фон
            padding: 10, // отступы
            borderRadius: 10, // радиус закругления углов
            alignItems: 'center', // центрирование по горизонтали
          }}
          onPress={() => { }}
        >
          <Text style={{ color: 'white', textTransform: 'uppercase', fontWeight: 600 }}>Забронировать</Text>
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
    backgroundColor: '#f3f2f8',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20
  },
})

export default AdDetailsScreen