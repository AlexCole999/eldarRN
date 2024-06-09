import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, RefreshControl } from 'react-native-gesture-handler';
import MainScreenCategories from '../innerCoponents/MainScreen_categories';
import MainScreenTops from '../innerCoponents/MainScreen_tops';
import MainScreenNews from './../innerCoponents/MainScreen_news';
import MainScreenPhotos from './../innerCoponents/MainScreen_photos';
import axios from 'axios';
import localhosturl from './../localhoststring';

const MainScreen = () => {
  const [newestAdsenses, setNewestAdsenses] = useState([]);
  const [topAdsenses, setTopAdsenses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      let response = await axios.get(`${localhosturl}/adsensesMainScreen`);
      setNewestAdsenses(response.data.adsensesSortedByCreatedAt);
      setTopAdsenses(response.data.adsensesSortedByRating);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: '#f3f2f8' }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <MainScreenCategories />
      <MainScreenTops topAdsenses={topAdsenses} />
      <MainScreenPhotos newestAdsenses={newestAdsenses} />
      <MainScreenNews newestAdsenses={newestAdsenses} />
    </ScrollView>
  );
};

export default MainScreen;
