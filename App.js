// App.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ToDoScreen from './src/Screen/ToDoScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <ToDoScreen />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
