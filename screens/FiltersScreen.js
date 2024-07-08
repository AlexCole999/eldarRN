
import { StyleSheet, Modal, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import filterSlice from '../storage/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const FiltersScreen = () => {
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
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Город</Text>
        <TouchableOpacity style={styles.sectionItem} onPress={() => setCityModalVisible(true)}>
          <Text>{localCity || 'Выберите город'}</Text>
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
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Район</Text>
          <TouchableOpacity style={styles.sectionItem} onPress={() => setDistrictModalVisible(true)}>
            <Text>{localDistrict || 'Выберите район'}</Text>
          </TouchableOpacity>
        </View>
      )}

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
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Категория</Text>
        <TouchableOpacity style={styles.sectionItem} onPress={() => setCategoryModalVisible(true)}>
          <Text>{localCategory || 'Выберите категорию'}</Text>
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
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Цена</Text>
        <TextInput
          style={styles.sectionItem}
          value={localPriceFrom}
          placeholder="От"
          keyboardType="numeric"
          onChangeText={text => setLocalPriceFrom(text)}
        />
        <TextInput
          style={styles.sectionItem}
          value={localPriceTo}
          placeholder="До"
          keyboardType="numeric"
          onChangeText={text => setLocalPriceTo(text)}
        />
        <TouchableOpacity style={styles.sectionItem} onPress={() => setCurrencyModalVisible(true)}>
          <Text>{localCurrency || 'Валюта'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => { applyFilters(); navigation.navigate('Каталог') }}>
        <Text style={{ ...styles.addButtonText, color: 'rgb(0, 191, 255)' }}>Применить</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.addButton} onPress={() => console.log(localCity, localDistrict, localCategory, localSubcategory, localPriceFrom, localPriceTo, localCurrency)}>
        <Text style={{ ...styles.addButtonText, color: 'rgb(0, 191, 255)' }}>Консоль</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={{ ...styles.addButton, marginBottom: 40 }} onPress={resetFilters}>
        <Text style={{ ...styles.addButtonText, color: 'red' }}>Сбросить фильтр</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f3f2f8',
    paddingHorizontal: 20,
    paddingVertical: 10
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
  }, modalContainer: {
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