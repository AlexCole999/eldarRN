import { StyleSheet, FlatList, TouchableOpacity, Image, Text, View, Linking } from 'react-native';
import localhosturl from './../localhoststring';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';



const AdDetailsScreen = ({ route }) => {
  const { adId, adUser, adCity, adDistrict, adCategory, adPhone, adAddress, adWorkhours, adServiceParams, adImagesList, adDescription } = route.params;

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
                    source={{ uri: `http://192.168.1.102:3000/userIcons/userMail.png` }}
                    style={{ width: 55, height: 55 }}

                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { Linking.openURL(`tel:${adPhone}`); }}>
                  <Image
                    source={{ uri: `http://192.168.1.102:3000/userIcons/userPhone6.png` }}
                    style={{ width: 60, height: 60 }}

                  />
                </TouchableOpacity>

              </View>

              <LinearGradient
                colors={['lightgreen', 'darkgreen']}
                start={[0, 0]}
                end={[1, 0]}
                style={{ height: 50, display: 'flex', justifyContent: 'center', paddingVertical: 5, paddingHorizontal: 35, borderRadius: 25 }}>
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
                    source={{ uri: `http://192.168.1.102:3000/userIcons/serviceTimeIcon.png` }}
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
        <TouchableOpacity
          style={{
            marginVertical: 10,
            backgroundColor: '#004d00', // светло-голубой фон
            padding: 10, // отступы
            borderRadius: 10, // радиус закругления углов
            alignItems: 'center', // центрирование по горизонтали
          }}
          onPress={() => { }}
        >
          <Text style={{ color: 'white', textTransform: 'uppercase' }}>Забронировать</Text>
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