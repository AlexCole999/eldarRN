import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import arrow_down from '../assets/arrow_down.png';

const SelectorCategory = ({ category, setCategory }) => {

  const { t, i18n } = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [subModalVisible, setSubModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const categories = [
    {
      name: 'Косметология',
      icon: 'cosmetologyIcon.png',
      subcategories: [
        { name: 'Эстетическая косметология', icon: 'subcategory.png' },
        { name: 'Аппаратная косметология', icon: 'subcategory.png' },
        { name: 'Инъекционная косметология', icon: 'subcategory.png' },
        { name: 'Депиляция, шугаринг', icon: 'subcategory.png' },
        { name: 'Перманентный макияж', icon: 'subcategory.png' }
      ]
    },
    { name: 'Лашмейкеры и Бровисты', icon: 'lashmaker.png' },
    {
      name: 'Стилисты',
      icon: 'stylists.png',
      subcategories: [
        { name: 'Стилисты по волосам', icon: 'stylistHair.png' },
        { name: 'Визаж', icon: 'visage.png' },
        { name: 'Барбершоп', icon: 'barber1.png' }
      ]
    },
    { name: 'Ногтевой сервис', icon: 'mails.png' },
    { name: 'Массаж и Спа', icon: 'massagaSpa.png' },
    { name: 'Тату и Пирсинг', icon: 'tatooPiercing.png' },
    { name: 'Коворкинг и Конферент залы', icon: 'coworking1.png' },
    { name: 'Фотостудия', icon: 'photostudy.png' },
    { name: 'Рестораны и Банкетные Залы', icon: 'restraunts.png' },
    { name: 'Прочее', icon: 'other.png' }
  ];

  useEffect(() => {
    if (category) {
      // Ищем категорию и её родительскую категорию
      const foundCategory = categories.find(cat =>
        cat.subcategories
          ? cat.subcategories.some(sub => sub.name === category)
          : cat.name === category
      );

      if (foundCategory) {
        if (foundCategory.subcategories) {
          // Если категория имеет субкатегории, устанавливаем её как выбранную категорию
          setSelectedCategory(foundCategory);
          setSelectedSubcategory(category); // Устанавливаем выбранную субкатегорию
        } else {
          // Если категория не имеет субкатегорий
          setSelectedCategory(null);
          setSelectedSubcategory(null);
        }
      } else {
        setSelectedCategory(null);
        setSelectedSubcategory(null);
      }
    }
  }, [category]);

  const handleCategorySelection = (item) => {
    if (item.subcategories) {
      setSelectedCategory(item);
      setSelectedSubcategory(null); // Сброс подкатегории при выборе новой категории
      setSubModalVisible(true);
    } else {
      setCategory(item.name);
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setModalVisible(false);
    }
  };

  const handleSubcategorySelection = (subItem) => {
    setCategory(subItem.name);
    setSelectedSubcategory(subItem.name);
    setSubModalVisible(false);
    setModalVisible(false);
  };

  return (
    <View >
      <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, color: '#333333' }}>{t('Специализация')}</Text>

      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ ...styles.openButtonText, color: category ? '#333333' : '#C4C4C4' }}>
          {selectedCategory ? t(selectedCategory.name) : category || t('Выберите специализацию')}
        </Text>
        <Image source={arrow_down} style={styles.arrowIcon} />
      </TouchableOpacity>

      {selectedCategory && (
        <View>
          <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, paddingTop: 12, color: '#333333' }}>'{t('Вид деятельности')}'</Text>
          <TouchableOpacity
            style={styles.openButton}
            onPress={() => setSubModalVisible(true)}
          >
            <Text style={{ ...styles.openButtonText, color: category ? '#333333' : '#C4C4C4' }}>
              {t(selectedSubcategory) || t("Выберите вид деятельности")}
            </Text>
            <Image source={arrow_down} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {categories.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryButton}
                  onPress={() => handleCategorySelection(item)}
                >
                  <Text style={styles.categoryText}>{t(item.name)}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>{t('Закрыть')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {selectedCategory && (
        <Modal
          visible={subModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setSubModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {selectedCategory.subcategories.map((subItem, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.categoryButton}
                    onPress={() => handleSubcategorySelection(subItem)}
                  >
                    <Text style={styles.categoryText}>{t(subItem.name)}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSubModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>{t('Закрыть')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  categoryButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  categoryText: {
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

export default SelectorCategory;
