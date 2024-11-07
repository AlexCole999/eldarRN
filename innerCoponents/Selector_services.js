import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView, Alert, TouchableHighlight, Image } from 'react-native';
import arrow_down from '../assets/arrow_down.png'; // Убедитесь, что у вас есть это изображение
import { useTranslation } from 'react-i18next';

const generateHourItems = () => {

  const items = [];
  for (let hour = 1; hour <= 10; hour++) {
    let label;
    if (hour === 1) {
      label = '1 час';
    } else if (hour >= 2 && hour <= 4) {
      label = `${hour} часа`;
    } else {
      label = `${hour} часов`;
    }
    items.push({ label, value: hour.toString() });
  }
  items.push({ label: '24 часа', value: '24' });
  return items;
};

const SelectorServices = ({ servicesList, setServicesList, horizontaldisplay }) => {

  const { t, i18n } = useTranslation();

  const [showInputs, setShowInputs] = useState(false);
  const [newServiceHours, setNewServiceHours] = useState(null);
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceFiat, setNewServiceFiat] = useState('');
  const [hoursModalVisible, setHoursModalVisible] = useState(false);
  const [fiatModalVisible, setFiatModalVisible] = useState(false);

  const addNewServiceParam = () => {
    if (newServiceHours && newServicePrice && newServiceFiat) {
      const newServicesList = [...servicesList, { hours: newServiceHours, price: newServicePrice, fiat: newServiceFiat }];
      setServicesList(newServicesList);
      setNewServiceHours(null);
      setNewServicePrice('');
      setNewServiceFiat('');
      setShowInputs(false);
    }
  };

  const removeService = (indexToRemove) => {
    Alert.alert(
      'Удалить услугу',
      'Вы уверены, что хотите удалить эту услугу?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => {
            const updatedServicesList = servicesList.filter((_, index) => index !== indexToRemove);
            setServicesList(updatedServicesList);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleHourSelection = (value) => {
    setNewServiceHours(value);
    setHoursModalVisible(false);
  };

  const handleFiatSelection = (value) => {
    setNewServiceFiat(value);
    setFiatModalVisible(false);
  };

  return (
    <View style={{ width: '100%' }}>
      {!showInputs && (
        <View>
          <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, color: '#333333', marginBottom: 12 }}>{t('Добавьте услуги')}</Text>
          <TouchableOpacity
            // disabled=
            style={styles.addButton}
            onPress={() => setShowInputs(true)}
          >
            <Text style={styles.addButtonText}>{t('Новая услуга')}</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView
        style={{ maxHeight: 200, marginBottom: 0 }}
        horizontal={horizontaldisplay}
        showsHorizontalScrollIndicator={false}
      >
        {
          servicesList.map((param, index) => (
            <TouchableHighlight
              key={index}
              style={{ ...styles.serviceContainer }}
              onPress={() => removeService(index)}
              underlayColor="#DDD"
            >
              <View style={{ ...styles.serviceParam, elevation: 4, borderRadius: 12, flexDirection: 'column', paddingHorizontal: 10, paddingVertical: 8, marginLeft: 2, marginRight: 2, minWidth: horizontaldisplay ? 250 : null }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontFamily: 'Manrope_400Regular', fontSize: 14, color: '#333333' }}>{t('Длительность')}</Text>
                  <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 14, color: '#333333' }}>{param.hours} {param.hours === '1' ? 'час' : param.hours >= '2' && param.hours <= '4' ? 'часа' : 'часов'}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                  <Text style={{ fontFamily: 'Manrope_400Regular', fontSize: 14, color: '#333333' }}>{t('Стоимость')}</Text>
                  <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 14, color: '#333333' }}>{param.price} {param.fiat}</Text>
                </View>
                {/* <Text style={styles.serviceTextLeft}>Часов: {param.hours}</Text>
                <Text style={styles.serviceTextRight}>Цена: {param.price} {param.fiat}</Text> */}
              </View>
            </TouchableHighlight>
          ))
        }
      </ScrollView>
      {showInputs && (
        <>
          <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, color: '#333333', }}>{t('Длительность')}</Text>
          <TouchableOpacity
            style={{ ...styles.selector, marginTop: 4 }}
            onPress={() => setHoursModalVisible(true)}
          >
            <Text style={{ ...styles.selectorText, color: newServiceHours ? '#333333' : '#C4C4C4' }}>
              {newServiceHours ? `Часы: ${newServiceHours}` : t('Укажите длительность услуги')}
            </Text>
            <Image source={arrow_down} style={styles.arrowIcon} />
          </TouchableOpacity>

          <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, color: '#333333', marginTop: 12 }}>{t('Стоимость услуги')}</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>

            <View style={{ marginTop: 4, flexGrow: 1 }}>
              <TextInput
                placeholderTextColor="#C4C4C4"
                style={{
                  flexGrow: 1, fontFamily: 'Manrope_400Regular', fontSize: 14, height: 42, elevation: 4, borderRadius: 12, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 8, fontSize: 14
                }}
                placeholder={t("Цена")}
                onChangeText={setNewServicePrice}
                value={newServicePrice}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity
              style={{ ...styles.selector, flexGrow: 1, maxWidth: 146 }}
              onPress={() => setFiatModalVisible(true)}
            >
              <Text style={{ ...styles.selectorText, color: newServiceFiat ? '#333333' : '#C4C4C4' }}>
                {newServiceFiat ? newServiceFiat : t('Валюта')}
              </Text>
              <Image source={arrow_down} style={styles.arrowIcon} />
            </TouchableOpacity>

          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={addNewServiceParam}
          >
            <Text style={styles.submitButtonText}>{t('Завершить добавление услуги')}</Text>
          </TouchableOpacity>

          {/* Модальное окно для выбора часов */}
          <Modal
            visible={hoursModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setHoursModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                  {generateHourItems().map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      style={styles.itemButton}
                      onPress={() => handleHourSelection(item.value)}
                    >
                      <Text style={styles.itemText}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setHoursModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>{t('Закрыть')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Модальное окно для выбора валюты */}
          <Modal
            visible={fiatModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setFiatModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                  <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => handleFiatSelection("UZS")}
                  >
                    <Text style={styles.itemText}>UZS</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => handleFiatSelection("USD")}
                  >
                    <Text style={styles.itemText}>USD</Text>
                  </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setFiatModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>{t('Закрыть')}</Text>
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
  serviceContainer: {
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 5,
  },
  serviceParam: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8
  },
  serviceTextLeft: {
    flex: 1,
    textAlign: 'left',
  },
  serviceTextRight: {
    flex: 1,
    textAlign: 'right',
  },
  input: {
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 16
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
    borderRadius: 12
  },
  selectorText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: '#C4C4C4',
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
  submitButton: {
    backgroundColor: 'rgba(0, 148, 255,0.9)', // светло-голубой фон
    padding: 10, // отступы
    borderRadius: 12, // радиус закругления углов
    alignItems: 'center', // центрирование по горизонтали
    marginTop: 18
  },
  submitButtonText: {
    color: 'white',
    fontFamily: 'Manrope_500Medium',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: 'rgba(0, 148, 255,0.9)', // светло-голубой фон
    borderRadius: 12, // радиус закругления углов
    alignItems: 'center', // центрирование по горизонтали
    height: 36,
    justifyContent: 'center'
  },
  addButtonText: {
    color: 'white',
    fontFamily: 'Manrope_500Medium',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // полупрозрачный фон
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  itemButton: {
    padding: 15,
  },
  itemText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: 'rgba(0, 148, 255,0.9)', // светло-голубой фон
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontFamily: 'Manrope_500Medium',
    fontSize: 16,
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

export default SelectorServices;
