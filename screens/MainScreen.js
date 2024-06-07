import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import MainScreenCategories from '../innerCoponents/MainScreen_categories';
import MainScreenTops from '../innerCoponents/MainScreen_tops';
import MainScreenNews from './../innerCoponents/MainScreen_news';
import MainScreenPhotos from './../innerCoponents/MainScreen_photos';
import axios from 'axios';
import localhosturl from './../localhoststring';

const MainScreen = () => {

  const [newestAdsenses, setNewestAdsenses] = useState([])
  const [topAdsenses, setTopAdsenses] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`${localhosturl}/adsensesMainScreen`);
        setNewestAdsenses(response.data.adsensesSortedByCreatedAt)
        setTopAdsenses(response.data.adsensesSortedByRating)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#f3f2f8' }}>
      <MainScreenCategories />
      <MainScreenTops topAdsenses={topAdsenses} />
      <MainScreenPhotos newestAdsenses={newestAdsenses} />
      <MainScreenNews newestAdsenses={newestAdsenses} />
    </ScrollView >
  );
};

export default MainScreen;
