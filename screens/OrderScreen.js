import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRoute } from '@react-navigation/native';
import localhosturl from './../localhoststring';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const OrderScreen = ({ route }) => {

  const { adId, adServiceParams, adWorkhours } = route.params;

  const navigation = useNavigation();

  const timeRange = adWorkhours.split('-');
  const startHour = parseInt(timeRange[0].split(':')[0], 10);
  const endHour = parseInt(timeRange[1].split(':')[0], 10);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeSelection = (time) => {
    setSelectedTime(time === selectedTime ? null : time);
  };

  const screenHeight = Dimensions.get('window').height;

  const newOrder = async () => {
    try {
      let user = await AsyncStorage.getItem('userData');
      let date = selectedDate;
      let duration = selectedDuration;
      let bookingTime = selectedTime;
      let userPhone = JSON.parse(user).phone;
      let userName = JSON.parse(user).name;
      let createdAt = Date.now();

      let response = await axios.post(`${localhosturl}/newOrder`, {
        adId, date, duration, bookingTime, userPhone, userName, createdAt
      });

      if (response.data.message) {
        console.log(response.data)
        Alert.alert('Бронь зарегистрирована', 'Успешно забронировано');
        navigation.navigate('Профиль');
      }
    } catch (error) {
      console.error("Ошибка при создании заказа:", error);
      Alert.alert('Ошибка', 'Не удалось забронировать');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ minHeight: screenHeight }}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Выберите дату</Text>
        <Calendar
          style={{
            paddingBottom: 10,
            borderRadius: 10
          }}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: 'rgb(0, 191, 255)' }
          }}
          minDate={new Date().toISOString().split('T')[0]}
        />
        {selectedDate && (
          <View style={{ width: '100%', marginVertical: 10 }}>
            <Text style={{ fontWeight: 700, marginBottom: 10, fontSize: 16, textAlign: 'center' }}>Выберите длительность</Text>
            <View style={{ borderRadius: 10, backgroundColor: 'white' }}>
              {adServiceParams.map((x, i) =>
                <TouchableOpacity key={i} onPress={() => { setSelectedDuration(x.hours) }}>
                  <View style={{
                    backgroundColor: x.hours == selectedDuration ? 'rgb(0, 191, 255)' : 'white',
                    borderRadius: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderBottomWidth: adServiceParams.length - 1 == i ? 0 : 1,
                    borderColor: 'lightgrey',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                  }}>
                    <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>

                      <Image
                        source={{ uri: `${localhosturl}/userIcons/serviceTimeIcon.png` }}
                        style={{ width: 20, height: 20 }}

                      />
                      <Text style={{
                        paddingLeft: 10,
                        color: x.hours == selectedDuration ? 'white' : 'black',
                      }}>Часов:{x.hours}</Text>
                    </View>
                    <Text style={{
                      fontStyle: 'italic',
                      color: 'grey',
                      color: x.hours == selectedDuration ? 'white' : 'black',
                    }}>{x.price} {x?.fiat}</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        {selectedDuration && (
          <View>
            <Text style={styles.headerText}>Выберите время</Text>
            <View style={styles.timeContainer}>
              {Array.from({ length: endHour - startHour + 1 - selectedDuration }, (_, i) => i + startHour).map((hour) => (
                <TouchableOpacity
                  key={hour}
                  style={[styles.timeButton, selectedTime === hour ? styles.selectedTimeButton : {},]}
                  onPress={() => handleTimeSelection(hour)}
                >
                  <Text style={{ fontStyle: 'italic', color: selectedTime === hour ? 'white' : 'black' }}>{hour}:00</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        {selectedDate && selectedDuration && (
          <TouchableOpacity
            style={{ marginVertical: 10, backgroundColor: 'rgb(0, 191, 255)', padding: 10, borderRadius: 10, alignItems: 'center' }}
            onPress={newOrder}
          >
            <Text style={{ color: 'white', textTransform: 'uppercase', fontWeight: '600' }}>Забронировать</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: 'white',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  durationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    rowGap: 10,
    columnGap: 5
  },
  durationButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: 'gray',
    flexGrow: 1
  },
  selectedDurationButton: {
    backgroundColor: 'rgb(0, 191, 255)',
  },
  timeContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 5,
    justifyContent: 'space-between'
  },
  timeButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    flexGrow: 1
  },
  selectedTimeButton: {
    backgroundColor: 'rgb(0, 191, 255)',
  },
  bookedTimeButton: {
    backgroundColor: 'red',
  },
  bookButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'blue',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default OrderScreen;
