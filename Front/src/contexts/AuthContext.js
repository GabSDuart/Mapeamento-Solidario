import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null); // Armazena o token do usuário
  const [isLoading, setIsLoading] = useState(true); // Controla o estado de carregamento

  // Função para fazer login
  const login = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token); // Salva o token no AsyncStorage
      setUserToken(token); // Atualiza o estado do token
    } catch (error) {
      console.error('Erro ao salvar o token:', error);
    }
  };

  // Função para fazer logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Remove o token do AsyncStorage
      setUserToken(null); // Atualiza o estado do token
    } catch (error) {
      console.error('Erro ao remover o token:', error);
    }
  };

  // Verifica se o usuário já está logado ao carregar o app
  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken'); // Recupera o token
      setUserToken(token); // Atualiza o estado do token
    } catch (error) {
      console.error('Erro ao verificar o login:', error);
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  // Executa a verificação de login ao montar o componente
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};