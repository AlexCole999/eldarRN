import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, Image } from 'react-native';
import arrow_down from '../assets/arrow_down.png'; // Убедитесь, что у вас есть это изображение

const SelectorDistrict = ({ city, cityDistrict, setCityDistrict }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const districts = [
    "Алмазарский", "Бектемирский", "Мирабадский", "Мирзо-Улугбекский",
    "Сергелийский", "Учтепинский", "Чиланзарский", "Шайхантахурский",
    "Юнусабадский", "Яккасарайский"
  ];

  const handleDistrictSelection = (selectedDistrict) => {
    setCityDistrict(selectedDistrict);
    setModalVisible(false);
  };

  return (
    <View>
      {city === 'Ташкент' && (
        <>
          <Text style={styles.label}>Район</Text>

          <TouchableOpacity
            style={styles.openButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ ...styles.openButtonText, color: cityDistrict ? '#333333' : '#C4C4C4' }}>
              {cityDistrict || 'Выберите район'}
            </Text>
            <Image source={arrow_down} style={styles.arrowIcon} />
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                  {districts.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.districtButton}
                      onPress={() => handleDistrictSelection(item)}
                    >
                      <Text style={styles.districtText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Закрыть</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: '#333333',
    marginTop: 12
  },
  openButton: {
    height: 42,
    backgroundColor: 'white',
    elevation: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
  },
  openButtonText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: '#C4C4C4',
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
  districtButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  districtText: {
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

export default SelectorDistrict;
