import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../contexts/AuthContext'; // Importe o contexto

const LoginScreen = ({ navigation }) => {
  const [usuario, setUsuario] = useState(''); // Armazena e-mail ou CPF
  const [senha, setSenha] = useState(''); // Armazena a senha
  const { login } = useContext(AuthContext); // Use a função de login do contexto

  // Função para validar o login
  const handleLogin = async () => {
    if (!usuario || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Validação básica de e-mail ou CPF
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario); // Verifica se é um e-mail válido
    const isCPF = /^\d{11}$/.test(usuario); // Verifica se é um CPF válido (11 dígitos)

    if (!isEmail && !isCPF) {
      Alert.alert('Erro', 'Por favor, insira um e-mail ou CPF válido.');
      return;
    }

    // Dados para enviar ao backend
    const dadosLogin = {
      email: isEmail ? usuario : null,
      cpf: isCPF ? usuario : null,
      senha: senha,
    };

    try {
      // Faz a chamada à API do backend
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosLogin),
      });

      const result = await response.json();

      if (response.ok) {
        login(result.token); // Salva o token no AsyncStorage e no estado
        navigation.navigate('Mapa'); // Navega para a tela do mapa após o login
      } else {
        Alert.alert('Erro', result.message || 'Credenciais inválidas.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Campo de Usuário (e-mail ou CPF) */}
      <TextInput
        style={styles.input}
        placeholder="E-mail ou CPF"
        value={usuario}
        onChangeText={setUsuario}
        keyboardType="email-address" // Teclado otimizado para e-mail
        autoCapitalize="none" // Evita letras maiúsculas automáticas
      />

      {/* Campo de Senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry // Oculta a senha
      />

      {/* Link para recuperar usuário/senha */}
      <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}>
        <Text style={styles.link}>Recuperar usuário ou senha</Text>
      </TouchableOpacity>

      {/* Botão de Entrar */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF', // Fundo branco
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Cor do texto
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  link: {
    color: '#1E90FF', // Cor azul para o link
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E90FF', // Cor azul escuro para o botão
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;