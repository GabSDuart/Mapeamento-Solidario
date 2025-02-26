import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LoginScreen from './components/LoginScreen'; // Importando o LoginScreen

const App = () => {
  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;