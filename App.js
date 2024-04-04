import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';


export default function App() {
  const CustomButton = ({ title, onPress, color }) => {
    return (
      <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const [count, setCount] = useState(0);
  const [state, setState] = useState(0);

  const handlePress = () => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
      .then(response => response.json())
      .then(json => { console.log(json); setState(json) })
    console.log('222');
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

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  }
});
