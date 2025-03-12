import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; // Importe a HomeScreen
import LoginScreen from './components/LoginScreen'; // Importe a LoginScreen
import MapaScreen from './screens/MapaScreen'; // Importe a MapaScreen (se já existir)

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // Oculta o cabeçalho na HomeScreen
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }} // Título da tela de Login
        />
        <Stack.Screen
          name="Mapa"
          component={MapaScreen}
          options={{ title: 'Mapa' }} // Título da tela do Mapa
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;