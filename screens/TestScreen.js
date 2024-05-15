import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import localhosturl from './../localhoststring';
import axios from 'axios';

const TestScreen = () => {

  async function requestData() {
    console.log(1);
    let some = await axios.get(`${localhosturl}/adsenseTestimonials`)
      .then(x => console.log(x.data))
      ;
  }

  return (
    <View
      style={{ backgroundColor: '#f3f2f8', flexGrow: 1 }}
    >
      <Text>
        123
      </Text>
      <TouchableOpacity onPress={requestData} style={{ backgroundColor: 'blue' }}>
        <Text >Request</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestScreen;
