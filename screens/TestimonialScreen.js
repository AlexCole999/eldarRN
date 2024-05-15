import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import localhosturl from './../localhoststring';
import axios from 'axios';

const Star = ({ filled, size }) => (
  <Image
    source={{ uri: filled ? `${localhosturl}/others/star.png` : `${localhosturl}/others/starnull.png` }}
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
      <Text style={{ marginRight: 10, fontWeight: 400, fontSize: 16, color: 'grey' }}>Ваша оценка</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: 'grey', fontSize: 16, paddingRight: 4 }}>{rating}</Text>
        {[...Array(5)].map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
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
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingVertical: 20, backgroundColor: '#f3f2f8' }}>
      {!submitted && (
        <>
          <Rating size={30} onStarPress={setRating} />
          <TextInput
            style={{ textAlignVertical: 'top', borderRadius: 10, height: 120, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20, marginTop: 10, marginBottom: 10, fontSize: 16 }}
            multiline={true} placeholder="Напишите, что вы думаете об оказанной услуге" onChangeText={setReviewText} value={reviewText} />
          <TouchableOpacity
            style={{ marginVertical: 10, backgroundColor: 'rgb(0, 191, 255)', padding: 10, borderRadius: 10, alignItems: 'center' }}
            onPress={sendTestimonial}
          >
            <Text style={{ color: 'white', textTransform: 'uppercase', fontWeight: '600' }}>Отправить отзыв</Text>
          </TouchableOpacity>
        </>
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
