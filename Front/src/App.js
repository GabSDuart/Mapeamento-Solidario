import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, AuthContext } from './contexts/AuthContext'; // Importe o AuthProvider e AuthContext
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MapaScreen from './screens/MapaScreen';
import AddPontoScreen from './screens/AddPontoScreen'; // Importe a tela de cadastro de pontos

const Stack = createStackNavigator();

// Componente para verificar o estado de carregamento
const AppLoading = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#1E90FF" />
  </View>
);

// Componente principal da navegação
const AppNavigator = () => {
  const { userToken, isLoading } = useContext(AuthContext); // Use o contexto de autenticação

  if (isLoading) {
    return <AppLoading />; // Exibe um indicador de carregamento enquanto verifica o login
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          // Telas acessíveis apenas para usuários logados
          <>
            <Stack.Screen
              name="Mapa"
              component={MapaScreen}
              options={{ title: 'Mapa' }}
            />
            <Stack.Screen
              name="AddPonto"
              component={AddPontoScreen}
              options={{ title: 'Cadastrar Ponto' }}
            />
          </>
        ) : (
          // Telas acessíveis para usuários não logados
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Componente principal do app
const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;