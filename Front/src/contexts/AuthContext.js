import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api'; // Importa a instância do axios

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Define o token global no axios
    } catch (error) {
      console.error('Erro ao salvar o token:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setUserToken(null);
      delete api.defaults.headers.common['Authorization']; // Remove o token global do axios
    } catch (error) {
      console.error('Erro ao remover o token:', error);
    }
  };

  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Redefine o token no axios ao abrir o app
      }
    } catch (error) {
      console.error('Erro ao verificar o login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
