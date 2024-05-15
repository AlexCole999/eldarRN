import React from 'react';
import { Text, View, Image } from 'react-native';
import localhosturl from '../localhoststring';


const Star = ({ filled, size }) => (
  <View>{
    filled
      ?
      < Image source={{ uri: `${localhosturl}/others/star.png` }}
        style={{ width: size, height: size }}
      />
      : < Image source={{ uri: `${localhosturl}/others/starnull.png` }}
        style={{ width: size, height: size }}
      />
  }</View>
);

const HalfStar = ({ size }) => (
  <Image
    source={{ uri: `${localhosturl}/others/starHalf.png` }}
    style={{ width: size, height: size }}
  />
);

const StarRating = ({ rating, size }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const remainingStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(filledStars)].map((_, index) => (
        <Star key={index} size={size} filled />
      ))}
      {hasHalfStar && <HalfStar size={size} />}
      {[...Array(remainingStars)].map((_, index) => (
        <Star key={index + filledStars + (hasHalfStar ? 1 : 0)} filled={false} size={size} />
      ))}
    </View>
  );
};

export default StarRating