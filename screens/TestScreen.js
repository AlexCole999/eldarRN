import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';

const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedSlots, setBookedSlots] = useState({
    '2024-05-16': {
      8: true,
      9: true,
      13: true,
    }
  });
  const [order, setOrder] = useState({});

  const handleDurationSelection = (duration) => {
    setSelectedDuration(duration);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time === selectedTime ? null : time);
  };

  const handleBooking = () => {
    const newOrder = { ...order };
    newOrder[selectedDate] = { username: 'testuserred', date: selectedDate, hours: selectedDuration, startTime: selectedTime };
    setOrder(newOrder);
  };

  const screenHeight = Dimensions.get('window').height;

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
          <View>
            <Text style={styles.headerText}>Выберите длительность</Text>
            <View style={styles.durationContainer}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '1 День'].map((hours) => (
                <TouchableOpacity
                  key={hours}
                  style={[styles.durationButton, selectedDuration === hours && styles.selectedDurationButton]}
                  onPress={() => handleDurationSelection(hours)}
                >
                  <Text style={{ fontStyle: 'italic', color: selectedDuration == hours ? 'white' : 'black' }}>{hours} ч.</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        {selectedDuration && (
          <View>
            <Text style={styles.headerText}>Выберите время</Text>
            <View style={styles.timeContainer}>
              {Array.from({ length: 13 }, (_, i) => i + 8).map((hour) => (
                <TouchableOpacity
                  key={hour}
                  style={[
                    styles.timeButton,
                    bookedSlots[selectedDate]?.[hour] ? styles.bookedTimeButton :
                      selectedTime === hour ? styles.selectedTimeButton : {},
                  ]}
                  onPress={() => handleTimeSelection(hour)}
                >
                  <Text style={{ fontStyle: 'italic', color: selectedTime == hour ? 'white' : 'black' }}>{hour}:00</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        {selectedDate && selectedDuration && (
          <TouchableOpacity
            style={{ marginVertical: 10, backgroundColor: 'rgb(0, 191, 255)', padding: 10, borderRadius: 10, alignItems: 'center' }}
            onPress={() => { console.log(1) }}
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
    backgroundColor: '#f3f2f8',
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

export default BookingCalendar;
