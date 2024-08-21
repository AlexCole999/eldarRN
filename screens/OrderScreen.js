import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRoute } from '@react-navigation/native';
import localhosturl from './../localhoststring';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import time from '../assets/time.png'

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
            paddingVertical: 12,
            paddingRight: 25,
            paddingLeft: 25,
            borderRadius: 10,
            elevation: 4
          }}
          hideExtraDays={true}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#0094FF' }
          }}
          minDate={new Date().toISOString().split('T')[0]}
          renderArrow={(direction) => (
            <Ionicons
              name={direction === 'left' ? 'chevron-back' : 'chevron-forward'}
              size={18}
              color="black"
            />
          )}
          theme={{
            textDayFontFamily: 'Inter_400Regular',
            textMonthFontFamily: 'Inter_700Bold',
            textDayHeaderFontFamily: 'Inter_400Regular',
            textDayHeaderFontSize: 14,
            arrowColor: 'black',
            todayTextColor: 'black',
            selectedDayBackgroundColor: 'rgb(0, 191, 255)',
            selectedDayTextColor: '#ffffff',
          }}
        />
        {selectedDate && (
          <View style={{ width: '100%', marginTop: 24, marginBottom: 20 }}>
            <Text style={{ ...styles.headerText }}>Выберите длительность</Text>
            <View style={{ borderRadius: 10, backgroundColor: 'white', gap: 6 }}>
              {adServiceParams.map((x, i) =>
                <TouchableOpacity key={i} onPress={() => { setSelectedDuration(x.hours); console.log(x) }}>
                  <View style={{
                    backgroundColor: 'white',
                    borderRadius: 12,
                    paddingTop: 10,
                    paddingRight: 12,
                    paddingBottom: 10,
                    paddingLeft: 8,
                    borderColor: 'lightgrey',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    elevation: 4,
                    borderWidth: 1,
                    borderColor: x.hours == selectedDuration ? 'rgb(0, 191, 255)' : 'white'
                  }}>

                    <Text style={{
                      fontSize: 14,
                      color: 'grey',
                      color: 'black',
                      fontFamily: 'Manrope_400Regular'
                    }}>Цена: {x.price} {x.fiat}</Text>
                    <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 4 }}>
                      <Image
                        source={time}
                        style={{ width: 16, height: 16 }}

                      />
                      <Text style={{
                        fontSize: 14,
                        color: 'black',
                        fontFamily: 'Manrope_400Regular'
                      }}>Часов:
                      </Text>
                      <Text style={{ fontFamily: 'Manrope_500Medium' }}>{x.hours}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        {selectedDuration && (
          <View>
            <Text style={{ ...styles.headerText }}>Выберите время</Text>
            <View style={styles.timeContainer}>
              {Array.from({ length: endHour - startHour + 1 - selectedDuration }, (_, i) => i + startHour).map((hour) => (
                <TouchableOpacity
                  key={hour}
                  style={[styles.timeButton, selectedTime === hour ? styles.selectedTimeButton : {},]}
                  onPress={() => handleTimeSelection(hour)}
                >
                  <Text style={{ color: selectedTime === hour ? 'white' : 'black', fontFamily: 'Manrope_400Regular', fontSize: 14 }}>{hour.toString().padStart(2, '0')}.00</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        {selectedDate && selectedDuration && (
          <TouchableOpacity
            style={{
              marginTop: 36, backgroundColor: 'rgb(0, 148, 255)', paddingVertical: 10, borderRadius: 12, alignItems: 'center', fontFamily: 'Manrope_600SemiBold'
            }}
            onPress={newOrder}
          >
            <Text style={{ color: 'white', fontWeight: '600', fontFamily: 'Manrope_600SemiBold', fontSize: 16, letterSpacing: 1 }}>Забронировать</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 31,
    paddingRight: 22,
    paddingBottom: 40,
    paddingLeft: 26,
    backgroundColor: '#F5FFFF',
  },
  headerText: {
    textAlign: 'left',
    fontSize: 24,
    marginBottom: 12,
    fontFamily: 'Manrope_600SemiBold'
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
    borderRadius: 12,
    borderColor: 'gray',
    flexGrow: 1,
    elevation: 4
  },
  selectedDurationButton: {
    backgroundColor: '#0094FF',
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
    columnGap: 6,
  },
  timeButton: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    fontSize: 14,
    width: 54
  },
  selectedTimeButton: {
    backgroundColor: 'rgb(0, 191, 255)',
  },
  bookedTimeButton: {
    backgroundColor: 'red',
  },
  bookButton: {
    marginTop: 36,
    padding: 10,
    backgroundColor: 'blue',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default OrderScreen;
