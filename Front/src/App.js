import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MapaScreen from './screens/MapaScreen';
import AddPontoScreen from './screens/AddPontoScreen';
import EditPontoScreen from './screens/EditPontoScreen';
import * as Location from 'expo-location';
import axios from 'axios';

const Stack = createStackNavigator();

const AppLoading = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#1E90FF" />
  </View>
);

const sendLocationPeriodically = async (token) => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permissão de localização negada');
    return;
  }

  setInterval(async () => {
    let location = await Location.getCurrentPositionAsync({});
    try {
      await axios.post(
        'http://localhost:8080/api/tracker',
        { latitude: location.coords.latitude, longitude: location.coords.longitude },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Erro ao enviar localização:', error);
    }
  }, 5 * 60 * 1000); // a cada 5 minutos (ajustável)
};

const AppNavigator = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (userToken) {
      sendLocationPeriodically(userToken);
    }
  }, [userToken]);

  if (isLoading) return <AppLoading />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          <>
            <Stack.Screen name="Mapa" component={MapaScreen} options={{ title: 'Mapa' }} />
            <Stack.Screen name="AddPonto" component={AddPontoScreen} options={{ title: 'Cadastrar Ponto' }} />
            <Stack.Screen name="EditPonto" component={EditPontoScreen} options={{ title: 'Editar Ponto' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => (
  <AuthProvider>
    <AppNavigator />
  </AuthProvider>
);

export default App;
