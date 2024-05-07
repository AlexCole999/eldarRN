import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, ScrollView } from 'react-native';

const Screen3 = () => {
  const [currentScreen, setCurrentScreen] = useState('specialization');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [city, setCity] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleSpecializationClick = (specialization) => {
    setSelectedSpecialization(specialization);
    setCurrentScreen('information');
  };

  const handleNext = () => {
    // Можно добавить дополнительную логику, если нужно
    setCurrentScreen('result');
  };

  const services = [
    {
      name: 'Фитнес',
      icon: 'fitness.png',
      description: 'Тренажерные залы, спортивные секции'
    },
    {
      name: 'Бани, сауны',
      icon: 'baths.png',
      description: 'Бани, сауны, парные'
    },
    {
      name: 'Пирсинг',
      icon: 'piercing.png',
      description: 'Проколы ушей, носа, пупка и других частей тела'
    },
    {
      name: 'Языковая школа',
      icon: 'language-school.png',
      description: 'Обучение иностранным языкам'
    },
    {
      name: 'Коворкинг',
      icon: 'coworking.png',
      description: 'Общие офисные пространства'
    },
    {
      name: 'Массаж',
      icon: 'massage.png',
      description: 'Профессиональные массажные услуги'
    },
    {
      name: 'Психология',
      icon: 'psychology.png',
      description: 'Консультации психологов, психотерапия'
    },
    {
      name: 'Татуаж, тату',
      icon: 'tattoo.png',
      description: 'Постоянный макияж, татуировки'
    },
    {
      name: 'СПА',
      icon: 'spa.png',
      description: 'Спа-процедуры, массаж, уход за телом'
    },
    {
      name: 'Подология',
      icon: 'podiatry.png',
      description: 'Лечение заболеваний стопы, уход за ногтями'
    },
    {
      name: 'Депиляция, эпиляция',
      icon: 'waxing.png',
      description: 'Удаление волос с помощью воска, сахара или лазера'
    },
    {
      name: 'Репетитор',
      icon: 'tutoring.png',
      description: 'Частные уроки, подготовка к экзаменам'
    },

    {
      name: 'Курсы',
      icon: 'courses.png',
      description: 'Обучающие курсы по различным темам'
    },
    {
      name: 'Косметология, уход',
      icon: 'cosmetology.png',
      description: 'Процедуры по уходу за кожей лица и тела'
    },
    {
      name: 'Брови',
      icon: 'eyelashes.png',
      description: 'Коррекция и окрашивание бровей'
    },
    {
      name: 'Ресницы',
      icon: 'eyelashes.png',
      description: 'Наращивание и окрашивание ресниц'
    },

    {
      name: 'Ногтевой сервис',
      icon: 'nails.png',
      description: 'Маникюр, педикюр, наращивание ногтей'
    },
    {
      name: 'Стоматология',
      icon: 'dentistry.png',
      description: 'Стоматологические услуги, лечение зубов'
    },
    {
      name: 'Ветеринария',
      icon: 'veterinary.png',
      description: 'Услуги ветеринарного врача'
    },
    {
      name: 'Визаж',
      icon: 'makeup.png',
      description: 'Подготовка к мероприятиям, макияж'
    },
    {
      name: 'Груминг',
      icon: 'grooming.png',
      description: 'Уход за животными, стрижка и купание'
    },
    {
      name: 'Парикмахерские услуги',
      icon: 'haircut.png',
      description: 'Стрижки, укладки, окрашивание волос'
    },
    {
      name: 'Усы, борода',
      icon: 'beard.png',
      description: 'Стрижка, уход и окрашивание усов и бороды'
    },
    {
      name: 'Барбершоп',
      icon: 'barbershop.png',
      description: 'Мужская стрижка, бритье, уход за волосами'
    },
    {
      name: 'Прочие',
      icon: 'other.png',
      description: 'Прочие услуги, не вошедшие в основные категории'
    },
  ];

  return (
    <ScrollView style={{ paddingHorizontal: 20 }}>
      <Text style={{ textAlign: 'center', paddingTop: 20, fontSize: 20, fontWeight: 800 }}>Выберите специализацию</Text>
      {currentScreen === 'specialization' && (
        <View>
          <View style={{ marginVertical: 20 }}>
            {services.map((service, index) => (
              <View key={index} style={{ marginTop: 20 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'white',
                    padding: 12,
                    borderRadius: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10
                  }}
                  onPress={() => handleSpecializationClick(service.name)}>
                  <Image
                    source={{ uri: `http://192.168.1.102:3000/categoryIcons/${service.icon}` }}
                    style={{ width: 40, height: 40 }}
                  />
                  <View style={{ maxWidth: '80%' }}>
                    <Text>{service.name}</Text>
                    <Text style={{ color: 'grey', fontSize: 12 }}>{service.description}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>

        </View>

      )}
      {currentScreen === 'information' && (
        <View>
          <Text>Специализация: {selectedSpecialization}</Text>
          <TextInput
            placeholder="Город"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            placeholder="Название компании"
            value={companyName}
            onChangeText={setCompanyName}
          />
          {/* Другие поля ввода */}

          <Button title="Продолжить" onPress={handleNext} />
        </View>
      )}
      {/* Другие экраны */}
    </ScrollView>
  );
};

export default Screen3;
