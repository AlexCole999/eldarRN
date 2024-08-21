import React from 'react';
import { Text, View, Image } from 'react-native';
import localhosturl from '../localhoststring';
import starFill from '../assets/starFill.png'
import starNull from '../assets/starNull.png'

const Star = ({ filled, size }) => (
  <View>
    {filled ? (
      <Image source={starFill} style={{ width: size, height: size }} />
    ) : (
      <Image source={starNull} style={{ width: size, height: size }} />
    )}
  </View>
);

const StarRating = ({ rating, size }) => {
  const roundedRating = Math.ceil(rating); // Округляем рейтинг в большую сторону
  const remainingStars = 5 - roundedRating;

  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[...Array(roundedRating)].map((_, index) => (
        <Star key={index} size={size} filled />
      ))}
      {[...Array(remainingStars)].map((_, index) => (
        <Star key={index + roundedRating} filled={false} size={size} />
      ))}
    </View>
  );
};

export default StarRating