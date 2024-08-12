import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import localhosturl from './../localhoststring';
import axios from 'axios';
import starFill from '../assets/starFill.png'
import starNull from '../assets/starNull.png'

const Star = ({ filled, size }) => (
  <Image
    source={filled ? starFill : starNull}
    style={{ width: size, height: size }}
  />
);

const Rating = ({ size, onStarPress }) => {

  const [rating, setRating] = useState(0);

  const handleStarPress = (starIndex) => {
    setRating(starIndex + 1);
    onStarPress(starIndex + 1);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 16, color: 'rgb(51, 51, 51)', fontFamily: 'Manrope_600SemiBold', lineHeight: 22, letterSpacing: 0 }}>Ваша оценка</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: 'rgb(243, 203, 43)', fontSize: 16, paddingRight: 6, fontFamily: 'Montserrat_600SemiBold', fontSize: 18 }}>{rating + '.0'}</Text>
        {[...Array(5)].map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handleStarPress(index)} style={{ paddingLeft: 4 }}>
            <Star filled={index < rating} size={size} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const TestimonialScreen = ({ route }) => {

  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const { adId } = route.params;

  async function sendTestimonial() {
    if (reviewText.length < 5) {
      Alert.alert('Ошибка', 'Введите хотя бы 5 символов в текст отзыва');
      return;
    }
    if (rating === 0) {
      Alert.alert('Ошибка', 'Выберите рейтинг');
      return;
    }
    await axios.post(`${localhosturl}/newAdsenseTestimonial`, { adId, rating, text: reviewText })
      .then(x => console.log(x.data));
    setSubmitted(true);
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40, backgroundColor: 'white' }}>
      {!submitted && (
        <View style={{ height: '100%', justifyContent: 'space-between' }}>

          <View>
            <Rating size={22} onStarPress={setRating} />
            <Text style={{ paddingTop: 16, fontSize: 16, color: 'rgb(51, 51, 51)', fontFamily: 'Manrope_600SemiBold', lineHeight: 22, letterSpacing: 0 }}>Описание</Text>
            <TextInput
              style={{ fontSize: 14, fontFamily: 'Manrope_400Regular', elevation: 2, textAlignVertical: 'top', borderRadius: 10, height: 112, backgroundColor: 'white', paddingHorizontal: 8, paddingVertical: 10, marginTop: 4 }}
              placeholderTextColor='rgb(196, 196, 196)'
              multiline={true} placeholder="Введите, что Вы думаете об указанной услуге" onChangeText={setReviewText} value={reviewText} />
          </View>

          <View>
            <TouchableOpacity
              style={{ backgroundColor: 'rgb(0, 148, 255)', borderRadius: 12, alignItems: 'center', height: 36, alignItems: 'center', justifyContent: 'center' }}
              onPress={sendTestimonial}
            >
              <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Manrope_600SemiBold', letterSpacing: 0.5 }}>Отправить отзыв</Text>
            </TouchableOpacity>
          </View>

        </View>
      )}
      {submitted && (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ marginBottom: 10, fontSize: 16 }}>Спасибо за ваш отзыв!</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default TestimonialScreen;
