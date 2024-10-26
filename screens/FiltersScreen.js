
import { StyleSheet, Modal, View, TouchableOpacity, Text, TextInput, Image, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import filterSlice from '../storage/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import arrow_down from '../assets/arrow_down.png'; // Убедитесь, что у вас есть это изображение
import check_fill from '../assets/check_fill.png'; // Убедитесь, что у вас есть это изображение
import check_null from '../assets/check_null.png'; // Убедитесь, что у вас есть это изображение


const FiltersScreen = () => {

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const dispatch = useDispatch();

  const { city, district, category, subcategory, priceFrom, priceTo, currency } = useSelector(state => state.filters);

  const navigation = useNavigation();

  // Локальные состояния для хранения выбранных значений
  const [localCity, setLocalCity] = useState(city);
  const [localDistrict, setLocalDistrict] = useState(district);
  const [localCategory, setLocalCategory] = useState(category);
  const [localSubcategory, setLocalSubcategory] = useState(subcategory);
  const [localPriceFrom, setLocalPriceFrom] = useState(priceFrom);
  const [localPriceTo, setLocalPriceTo] = useState(priceTo);
  const [localCurrency, setLocalCurrency] = useState(currency);

  const [isCityModalVisible, setCityModalVisible] = useState(false);
  const [isDistrictModalVisible, setDistrictModalVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isCurrencyModalVisible, setCurrencyModalVisible] = useState(false);


  // Обработчик для применения фильтров
  const applyFilters = () => {
    dispatch(filterSlice.actions.filterCity(localCity));
    dispatch(filterSlice.actions.filterDistrict(localCity == "Ташкент" ? localDistrict : ''));
    dispatch(filterSlice.actions.filterCategory(localCategory));
    dispatch(filterSlice.actions.filterSubcategory(localSubcategory));
    dispatch(filterSlice.actions.filterPriceFrom(localPriceFrom));
    dispatch(filterSlice.actions.filterPriceTo(localPriceTo));
    dispatch(filterSlice.actions.filterCurrency(localCurrency));
  };

  const resetFilters = () => {
    setLocalCity('');
    setLocalDistrict('');
    setLocalCategory('');
    setLocalSubcategory('');
    setLocalPriceFrom('');
    setLocalPriceTo('');
    setLocalCurrency('');
    dispatch(filterSlice.actions.deleteFilters());
  };

  return (
    <ScrollView style={styles.container}>

      <Modal
        transparent={true}
        visible={isCityModalVisible}
        onRequestClose={() => setCityModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {[
                { label: "Выберите город", value: '' },
                { label: "Ташкент", value: "Ташкент" },
                { label: "Ташкентская обл", value: "Ташкентская обл" },
                { label: "Самарканд", value: "Самарканд" },
                { label: "Наманган", value: "Наманган" },
                { label: "Андижан", value: "Андижан" },
                { label: "Фергана", value: "Фергана" },
                { label: "Бухара", value: "Бухара" },
                { label: "Хива", value: "Хива" },
                { label: "Ургенч", value: "Ургенч" },
                { label: "Нукус", value: "Нукус" },
                { label: "Карши", value: "Карши" },
                { label: "Гулистан", value: "Гулистан" },
                { label: "Джизак", value: "Джизак" },
                { label: "Термез", value: "Термез" },
                { label: "Шахрисабз", value: "Шахрисабз" },
                { label: "Сырдарья", value: "Сырдарья" },
              ].map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.modalItem}
                  onPress={() => {
                    setLocalCity(item.value);
                    setCityModalVisible(false);
                  }}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View style={{ marginHorizontal: 24, marginTop: 24 }}>
        <Text style={styles.label}>Город</Text>
        <TouchableOpacity
          style={{ ...styles.openButton }}
          onPress={() => setCityModalVisible(true)}
        >
          <Text style={{ ...styles.openButtonText, color: localCity ? '#333333' : '#C4C4C4' }}>
            {localCity || 'Выберите город'}
          </Text>
          <Image source={arrow_down} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>


      <Modal
        transparent={true}
        visible={isDistrictModalVisible}
        onRequestClose={() => setDistrictModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {[
                { label: "Выберите район", value: null },
                { label: "Алмазарский", value: "Алмазарский" },
                { label: "Бектемирский", value: "Бектемирский" },
                { label: "Мирабадский", value: "Мирабадский" },
                { label: "Мирзо-Улугбекский", value: "Мирзо-Улугбекский" },
                { label: "Сергелийский", value: "Сергелийский" },
                { label: "Учтепинский", value: "Учтепинский" },
                { label: "Чиланзарский", value: "Чиланзарский" },
                { label: "Шайхантахурский", value: "Шайхантахурский" },
                { label: "Юнусабадский", value: "Юнусабадский" },
                { label: "Яккасарайский", value: "Яккасарайский" },
              ].map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.modalItem}
                  onPress={() => {
                    setLocalDistrict(item.value);
                    setDistrictModalVisible(false);
                  }}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      {localCity === "Ташкент" && (
        <View style={{ marginHorizontal: 24, marginTop: 12 }}>
          <Text style={styles.label}>Район</Text>
          <TouchableOpacity
            style={{ ...styles.openButton }}
            onPress={() => setDistrictModalVisible(true)}
          >
            <Text style={{ ...styles.openButtonText, color: localDistrict ? '#333333' : '#C4C4C4' }}>
              {localDistrict || 'Выберите район'}
            </Text>
            <Image source={arrow_down} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      )}

      <View style={{ marginHorizontal: 24, marginTop: 12 }}>
        <Text style={styles.label}>Название</Text>
        <TextInput
          placeholderTextColor="#C4C4C4"
          style={{
            fontFamily: 'Manrope_500Medium', marginTop: 4, fontSize: 14, height: 42, elevation: 4, flexGrow: 1, borderRadius: 12, backgroundColor: 'white', paddingHorizontal: 8, paddingVertical: 13
          }}
          placeholder="Введите название"
          onChangeText={text => setLocalPriceFrom(text)}
          value={localPriceFrom} />
      </View>

      <Modal
        transparent={true}
        visible={isCategoryModalVisible}
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {[
                { label: "Выберите категорию", value: '' },
                { label: "Эстетическая косметология", value: "Эстетическая косметология" },
                { label: "Аппаратная косметология", value: "Аппаратная косметология" },
                { label: "Инъекционная косметология", value: "Инъекционная косметология" },
                { label: "Депиляция, шугаринг", value: "Депиляция, шугаринг" },
                { label: "Перманентный макияж", value: "Перманентный макияж" },
                { label: "Лашмейкеры и Бровисты", value: "Лашмейкеры и Бровисты" },
                { label: "Стилисты по волосам", value: "Стилисты по волосам" },
                { label: "Визаж", value: "Визаж" },
                { label: "Барбершоп", value: "Барбершоп" },
                { label: "Ногтевой сервис", value: "Ногтевой сервис" },
                { label: "Массаж и Спа", value: "Массаж и Спа" },
                { label: "Тату и Пирсинг", value: "Тату и Пирсинг" },
                { label: "Коворкинг и Конферент залы", value: "Коворкинг и Конферент залы" },
                { label: "Фотостудия", value: "Фотостудия" },
                { label: "Рестораны и Банкетные Залы", value: "Рестораны и Банкетные Залы" },
                { label: "Прочее", value: "Прочее" },
              ].map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.modalItem}
                  onPress={() => {
                    setLocalCategory(item.value);
                    setCategoryModalVisible(false);
                  }}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View style={{ marginHorizontal: 24, marginTop: 12 }}>

        <Text style={styles.label}>Категория</Text>

        <TouchableOpacity
          style={{ ...styles.openButton }}
          onPress={() => setCategoryModalVisible(true)}
        >
          <Text style={{ ...styles.openButtonText, color: localCategory ? '#333333' : '#C4C4C4' }}>
            {localCategory || 'Выберите категорию'}
          </Text>
          <Image source={arrow_down} style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.openButton, marginTop: 12 }}
          onPress={() => setCategoryModalVisible(true)}
        >
          <Text style={{ ...styles.openButtonText, color: '#333333', fontSize: 16 }}>
            Коворкинг
          </Text>
          <Image source={check_null} style={styles.arrowIcon} />
        </TouchableOpacity>



      </View>

      <Modal
        transparent={true}
        visible={isCurrencyModalVisible}
        onRequestClose={() => setCurrencyModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {[
                { label: "Валюта", value: '' },
                { label: "UZS", value: "UZS" },
                { label: "USD", value: "USD" },

              ].map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.modalItem}
                  onPress={() => {
                    setLocalCurrency(item.value);
                    setCurrencyModalVisible(false);
                  }}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View style={{ flexDirection: 'row', gap: 20, marginRight: 24 }}>

        <View style={{ flexGrow: 1 }}>
          <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, color: '#333333', marginLeft: 24, marginTop: 12 }}>Цена</Text>
          <View style={{ flexDirection: 'row', marginTop: 4, marginLeft: 24, gap: 4 }}>
            <TextInput
              placeholderTextColor="#C4C4C4"
              style={{
                fontFamily: 'Manrope_500Medium', fontSize: 12, height: 42, elevation: 4, flexGrow: 1, borderRadius: 12, backgroundColor: 'white', paddingHorizontal: 6, paddingVertical: 13, marginBottom: 10, minWidth: screenWidth * 0.19
              }}
              placeholder="От"
              onChangeText={text => setLocalPriceFrom(text)}
              value={localPriceFrom} />
            <TextInput
              placeholderTextColor="#C4C4C4"
              style={{
                fontFamily: 'Manrope_500Medium', fontSize: 12, height: 42, elevation: 4, flexGrow: 1, borderRadius: 12, backgroundColor: 'white', paddingHorizontal: 6, paddingVertical: 13, marginBottom: 10, minWidth: screenWidth * 0.19
              }}
              placeholder="До"
              onChangeText={text => setLocalPriceTo(text)}
              value={localPriceTo} />
          </View>
        </View>

        <View style={{ flexGrow: 1 }}>
          <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, color: '#333333', marginTop: 12 }}>Валюта</Text>
          <TouchableOpacity
            style={{ ...styles.openButton, paddingHorizontal: 6, paddingVertical: 13 }}
            onPress={() => setCurrencyModalVisible(true)}
          >
            <Text style={{ ...styles.openButtonText, color: localCurrency ? '#333333' : '#C4C4C4', fontSize: 12 }}>
              {localCurrency || 'Выберите валюту'}
            </Text>
            <Image source={arrow_down} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>

      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 0, gap: 20, marginHorizontal: 24, marginTop: 12 }}>
        <TouchableOpacity
          style={{ backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0, 148, 255, 0.9)', flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36 }}
          onPress={resetFilters}
        >
          <Text style={{ color: 'rgba(0, 148, 255, 0.9)', fontSize: 16, fontWeight: '600', textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
            Сбросить
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ backgroundColor: 'rgba(0, 148, 255, 1)', borderRadius: 12, flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: 36 }}
          onPress={() => { applyFilters(); navigation.navigate('Каталог') }}>
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontFamily: 'Manrope_600SemiBold' }}>
            Применить
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FFFF',
    height: '100%'
  },
  label: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: '#333333',
  },
  openButton: {
    height: 42,
    backgroundColor: 'white',
    elevation: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
  openButtonText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: '#C4C4C4',
  },
  sectionContainer: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    flexDirection: 'row', // добавлено для расположения текста слева и опции справа
    alignItems: 'center',
    justifyContent: 'space-between', // добавлено для выравнивания текста и опции по краям
  },
  sectionTitle: {
    fontWeight: '500',
    fontSize: 16,
  },
  picker: {
    flex: 1, // чтобы Picker занимал оставшееся пространство
    backgroundColor: 'white', // убираем фон, если есть
  },
  sectionItem: {
    paddingVertical: 7,
    fontWeight: '500',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingVertical: 10,
    paddingLeft: 14,
    borderRadius: 10,
  },
  addButtonText: {
    fontWeight: '500',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomColor: '#ececec',
    borderBottomWidth: 1,
  },
});

export default FiltersScreen