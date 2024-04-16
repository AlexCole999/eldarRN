import { StyleSheet, Text, View } from 'react-native';


const AdDetailsScreen = ({ route }) => {
  const { adId, adUser, adCity, adCategory, adPhone, adAddress, adWorkhours, adServiceParams } = route.params;

  return (
    <View style={styles.container}>
      <Text>Пользователь: {adUser}</Text>
      <Text>Город: {adCity}</Text>
      <Text>Категория: {adCategory}</Text>
      <Text>Контактный телефон: {adPhone}</Text>
      <Text>Адрес: {adAddress}</Text>
      <Text>Часы работы: {adWorkhours}</Text>
      {adServiceParams.map((x, i) =>
        <View key={i} style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={{ marginHorizontal: 20 }}>Услуга {i + 1}</Text>
          <Text style={{ marginHorizontal: 20 }}>Часы {x.hours}</Text>
          <Text style={{ marginHorizontal: 20 }}>Цена {x.price}</Text>
        </View>
      )}
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
})

export default AdDetailsScreen