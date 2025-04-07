import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api'; // importa API com JWT

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const token = response.data.token;

      if (token) {
        await AsyncStorage.setItem('userToken', token);
        login(token); // atualiza contexto
        navigation.navigate('Mapa');
      } else {
        Alert.alert('Erro', 'Token inválido.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Credenciais inválidas ou servidor indisponível.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acolhe+</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#FFF',
  },
  title: {
    fontSize: 32, fontWeight: 'bold', textAlign: 'center',
    marginBottom: 40, color: '#4CAF50',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1, borderColor: '#DDD', borderRadius: 8,
    padding: 15, marginBottom: 15, fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50', padding: 15,
    borderRadius: 8, alignItems: 'center',
  },
  buttonText: {
    color: '#FFF', fontSize: 18, fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 20, alignItems: 'center',
  },
  registerText: {
    color: '#4CAF50', fontSize: 16,
  },
});

export default LoginScreen;
