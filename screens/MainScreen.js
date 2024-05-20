import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import CategoriesInnerComponent from '../innerCoponents/MainScreen_categories';
import TopAdsensesInnerComponent from '../innerCoponents/MainScreen_tops';
import NewAdsensesInnerComponent from './../innerCoponents/MainScreen_news';
import PhotosAdsensesInnerComponent from './../innerCoponents/MainScreen_photos';
import axios from 'axios';
import localhosturl from './../localhoststring';

const MainScreen = () => {

  const [newestAdsenses, setNewestAdsenses] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let a = await axios.get(`${localhosturl}/adsensesMainScreen`);
        setNewestAdsenses(a.data.adsensesSortedByCreatedAt)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#f3f2f8' }}>
      <CategoriesInnerComponent />
      <TopAdsensesInnerComponent />
      <PhotosAdsensesInnerComponent newestAdsenses={newestAdsenses} />
      <NewAdsensesInnerComponent newestAdsenses={newestAdsenses} />
    </ScrollView >
  );
};

export default MainScreen;
