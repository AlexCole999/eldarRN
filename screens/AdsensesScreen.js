import React, { useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, Text, TextInput, View, Button, RefreshControl, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import localhosturl from './../localhoststring';

const Stack = createStackNavigator();

const AdsensesScreen = () => {

  const screenWidth = Dimensions.get('window').width;

  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${localhosturl}/adsenses?page=${count}`)
      .then((x) => x.json())
      .then((data) => {
        console.log(data)
        const objects = data.map((item) => ({
          user: item.user,
          id: item._id,
          category: item.category,
          city: item.city,
          phone: item.phone,
          address: item.address,
          workhours: item.workhours,
          servicesList: item.servicesList,
          imagesList: item.imagesList
        }));
        setData(objects);
      });
  }, [count]);

  const navigation = useNavigation();

  const SearchComponent = () => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
      // Здесь можно добавить логику для обработки поискового запроса
      console.log('Search for:', searchText);
    };

    return (
      <View style={styles.componentContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Искать</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Buttons = () => {
    return (
      <View style={styles.componentContainer}>
        <Text style={styles.componentText}>Страница: {count}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCount(count - 1)}>
            <Text style={styles.buttonText}>Предыдущие</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCount(count + 1)}>
            <Text style={styles.buttonText}>Следующие</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const categoriesList = [
    [
      {
        name: 'Фитнес',
        icon: 'fitness.jpg'
      },
      {
        name: 'Бани, сауны',
        icon: 'baths.jpg'
      }
    ],
    [
      {
        name: 'Пирсинг',
        icon: 'piercing.jpg'
      },
      {
        name: 'Языковая школа',
        icon: 'language-school.jpg'
      }
    ],
    [
      {
        name: 'Коворкинг',
        icon: 'coworking.jpg'
      },
      {
        name: 'Массаж',
        icon: 'massage.jpg'
      }
    ],
    [
      {
        name: 'Психология',
        icon: 'psychology.jpg'
      },
      {
        name: 'Татуаж, тату',
        icon: 'tattoo.jpg'
      }
    ],
    [
      {
        name: 'СПА',
        icon: 'spa.jpg'
      },
      {
        name: 'Подология',
        icon: 'podiatry.jpg'
      }
    ],
    [
      {
        name: 'Депиляция, эпиляция',
        icon: 'waxing.jpg'
      },
      {
        name: 'Репетитор',
        icon: 'tutoring.jpg'
      }
    ],
    [
      {
        name: 'Курсы',
        icon: 'courses.jpg'
      },
      {
        name: 'Косметология, уход',
        icon: 'cosmetology.jpg'
      }
    ],
    [
      {
        name: 'Брови',
        icon: 'brows.jpg'
      },
      {
        name: 'Ресницы',
        icon: 'eyelashes.jpg'
      }
    ],
    [
      {
        name: 'Ногтевой сервис',
        icon: 'nails.jpg'
      },
      {
        name: 'Стоматология',
        icon: 'dentistry.jpg'
      }
    ],
    [
      {
        name: 'Ветеринария',
        icon: 'veterinary.jpg'
      },
      {
        name: 'Визаж',
        icon: 'makeup.jpg'
      }
    ],
    [
      {
        name: 'Груминг',
        icon: 'grooming.jpg'
      },
      {
        name: 'Парикмахерские услуги',
        icon: 'haircut.jpg'
      }
    ],
    [
      {
        name: 'Усы, борода',
        icon: 'beard.jpg'
      },
      {
        name: 'Барбершоп',
        icon: 'barbershop.jpg'
      }
    ],
    [
      {
        name: 'Прочие',
        icon: 'other.jpg'
      }
    ]
  ];


  const CategoriesComponent = () => {
    const renderItem = ({ item }) => (
      <View style={{ display: 'flex', rowGap: 10, marginRight: 10 }}>
        <TouchableOpacity onPress={() => { console.log(item[0]) }}>
          <ImageBackground
            source={{ uri: `${localhosturl}/categoryPhotos/${item[0].icon}` }}
            style={{ width: screenWidth * 0.45, height: 100, borderRadius: 5 }}
            resizeMode='stretch'
            imageStyle={{ borderRadius: 5, width: '100%', height: '100%' }}
          >
            <View style={{ backgroundColor: 'rgba(0,0,0, 0.30)', display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
              <Text style={{ color: 'white' }}>{item[0]?.name}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        {item[1]?.name
          ? <TouchableOpacity onPress={() => { console.log(item[1]) }}>
            <ImageBackground
              source={{ uri: `${localhosturl}/categoryPhotos/${item[1]?.icon}` }}
              style={{ width: screenWidth * 0.45, height: 100, borderRadius: 5 }}
              resizeMode='stretch'
              imageStyle={{ borderRadius: 5, width: '100%', height: '100%' }}
            >
              <View style={{ backgroundColor: 'rgba(0,0,0, 0.30)', display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                <Text style={{ color: 'white' }}>{item[1]?.name}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          : null}

      </View>
    );

    return (
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Text style={{ paddingBottom: 10, fontWeight: 700 }}>Категории</Text>
        <FlatList
          data={categoriesList}
          renderItem={renderItem}
          keyExtractor={(item) => item[0].name}
          horizontal
        />
      </View>
    );
  };

  const renderItem = ({ item }) => {
    if (item.type === 'search') {
      return <SearchComponent />;
    } else if (item.type === 'buttons') {
      return <Buttons />;
    } else if (item.type === 'map') {
      return <CategoriesComponent />;
    } else {
      return (
        <TouchableOpacity
          style={{ width: 200 }}
          key={item.id}
          onPress={() => navigation.navigate('Детали объявления', { adId: item.id, adUser: item.user, adCity: item.city, adCategory: item.category, adPhone: item.phone, adAddress: item.address, adWorkhours: item.workhours, adServiceParams: item.servicesList, adImagesList: item.imagesList })}
        >
          <View style={styles.itemContainer}>
            {<Image style={{ width: "90%", height: 300, borderRadius: 15 }} source={{ uri: `${localhosturl}/${item.user}/${item.imagesList[0]}` }} />}
            <Text>Пользователь: {item.user}</Text>
            <Text>Город: {item.city}</Text>
            <Text>Категория: {item.category}</Text>
            <Text>Контактный телефон: {item.phone}</Text>
            <Text>Адрес: {item.address}</Text>
            <Text>Часы работы: {item.workhours}</Text>
            {item.servicesList.map((x, i) =>
              < View key={i} style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text style={{ marginHorizontal: 20 }}>Услуга {i + 1}</Text>
                <Text style={{ marginHorizontal: 20 }}>Часы {x.hours}</Text>
                <Text style={{ marginHorizontal: 20 }}>Цена {x.price}</Text>
              </View>
            )
            }

          </View>
          <Text onPress={() => { console.log(item) }}>123</Text>

        </TouchableOpacity >
      );
    }
  };





  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetch(`${localhosturl}/adsenses?page=${count}`)
      .then((x) => x.json())
      .then((data) => {
        const objects = data.map((item) => ({
          user: item.user,
          id: item._id,
          category: item.category,
          city: item.city,
          phone: item.phone,
          address: item.address,
          workhours: item.workhours,
          services: item.services,
          servicesList: item.servicesList,
          imagesList: item.imagesList
        }));
        setData(objects);
        setRefreshing(false);
      });
  };



  const styles = StyleSheet.create({
    componentContainer: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    column: {
      paddingHorizontal: 5,
    },
    componentText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center'
    },
    itemContainer: {
      alignItems: 'center',
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: 'blue',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 5,
      flex: 1,
      marginHorizontal: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 16,
    },
    componentContainer: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    componentText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center'
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    searchInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 10,
      marginRight: 10,
    },
    searchButton: {
      backgroundColor: 'blue',
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    searchButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

  return (
    <FlatList
      data={[
        { id: 'search', type: 'search' },
        { id: 'map', type: 'map' },
        ...data,
        { id: 'buttons', type: 'buttons' },
      ]}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    />
  );
};

export default AdsensesScreen;
