import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Dimensions, FlatList, ScrollView } from 'react-native';


export default function App() {

  const { width } = Dimensions.get('window');

  const CustomButton = ({ title, onPress, color }) => {
    return (
      <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const [count, setCount] = useState(0);
  const [state, setState] = useState(0);
  const [picture, setPicture] = useState("https://randomfox.ca/images/9.jpg");
  const [data, setData] = useState([]);

  const handlePress = () => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
      .then(response => response.json())
      .then(json => { console.log(json); setState(json) })
    console.log('fox start');

    fetch(`https://randomfox.ca/floof/`)
      .then(response => response.json())
      .then(json => { console.log(json); setPicture(json.image) })


    fetch('http://192.168.1.102:3000/makerqst')
      .then(response => response.json())
      .then(data => { console.log(data), setData(data) })
  };
  return (

    <View style={styles.container}>

      <Text>!!!!!!!!!!!!!!+++++++++++++</Text>
      <Text>Count: {count}</Text>
      <Text>Id: {state?.id}</Text>
      <Text>Title: {state?.title}</Text>
      <CustomButton title="Increment" onPress={() => setCount(count + 1)} color="red" />
      <Button title="Decrement" onPress={() => setCount(count - 1)} />
      <Button title="Press me" onPress={handlePress} />
      <Button title="data" onPress={() => { console.log(data) }} />
      <Image
        style={[styles.image, { width: width * 0.9 }]}
        source={{ uri: picture }}
      />
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.id}-----{item.prize}</Text>
        }
      />
      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    minWidth: 100,
    color: "white"
  },
  text: {
    color: 'white',
    fontWeight: '800',
    textTransform: 'uppercase'
  },
  image: {
    width: 200,
    height: 350,
    resizeMode: 'cover',
    borderRadius: 20,
  },
});
