import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, Image } from 'react-native';
import arrow_down from '../assets/arrow_down.png'; // Убедитесь, что у вас есть это изображение

const generateTimeItems = () => {
  let items = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      let label = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      let value = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      items.push({ label, value });
    }
  }
  return items;
};

const SelectorHours = ({ workhoursStart, setWorkhoursStart, workhoursEnd, setWorkhoursEnd, workhours, setWorkhours }) => {
  const [startModalVisible, setStartModalVisible] = useState(false);
  const [endModalVisible, setEndModalVisible] = useState(false);

  const handleStartSelection = (value) => {
    setWorkhoursStart(value);
    setWorkhours(`${value}-${workhoursEnd}`);
    setStartModalVisible(false);
  };

  const handleEndSelection = (value) => {
    setWorkhoursEnd(value);
    setWorkhours(`${workhoursStart}-${value}`);
    setEndModalVisible(false);
  };

  return (
    <View>

      <Text style={styles.label}>Информация о работе</Text>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setStartModalVisible(true)}
        >
          <Text style={{ ...styles.selectorText, color: workhoursStart ? '#333333' : '#C4C4C4' }}>
            {workhoursStart || 'Начало\nрабочего дня'}
          </Text>
          <Image source={arrow_down} style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selector}
          onPress={() => setEndModalVisible(true)}
        >
          <Text style={{ ...styles.selectorText, color: workhoursEnd ? '#333333' : '#C4C4C4' }}>
            {workhoursEnd || 'Конец\nрабочего дня'}
          </Text>
          <Image source={arrow_down} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>

      {/* Модальное окно для выбора начала рабочего дня */}
      <Modal
        visible={startModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setStartModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {generateTimeItems().map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.itemButton}
                  onPress={() => handleStartSelection(item.value)}
                >
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setStartModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Модальное окно для выбора конца рабочего дня */}
      <Modal
        visible={endModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEndModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {generateTimeItems().map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.itemButton}
                  onPress={() => handleEndSelection(item.value)}
                >
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setEndModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 20,
    marginTop: 4
  },
  label: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: '#333333',
  },
  selector: {
    height: 42,
    backgroundColor: 'white',
    elevation: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    flexGrow: 1
  },
  selectorText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: '#C4C4C4',
    textAlign: 'start',
    lineHeight: 14
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  itemButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.3)',
  },
});

export default SelectorHours;
